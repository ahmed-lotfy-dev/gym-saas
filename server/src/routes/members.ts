import { Elysia, t } from "elysia";
import { db } from "../db";
import { members, subscriptions, subscriptionPlans } from "../db/schema";
import { eq, and, or, ilike, desc, count, sql, gte, lte } from "drizzle-orm";
import { requireGymAccess, requireStaff } from "../middleware/auth";

const gymIdParams = t.Object({
  gymId: t.String({ format: "uuid" }),
});

const gymAndMemberIdParams = t.Object({
  gymId: t.String({ format: "uuid" }),
  memberId: t.String({ format: "uuid" }),
});

const gymAndBarcodeParams = t.Object({
  gymId: t.String({ format: "uuid" }),
  barcode: t.String(),
});

const gymAndPlanIdParams = t.Object({
  gymId: t.String({ format: "uuid" }),
  planId: t.String({ format: "uuid" }),
});

const gymAndSubscriptionIdParams = t.Object({
  gymId: t.String({ format: "uuid" }),
  subscriptionId: t.String({ format: "uuid" }),
});

export const memberRoutes = new Elysia({ prefix: "/api/v1/gyms/:gymId/members", tags: ["Members"] })
  .use(requireStaff)
  .get("/", async ({ params, query }) => {
    const { page = "1", limit = "20", search, status } = query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let whereClause = eq(members.gymId, params.gymId);

    if (search) {
      whereClause = and(
        whereClause,
        or(
          ilike(members.fullName, `%${search}%`),
          ilike(members.phone, `%${search}%`),
          ilike(members.barcode, `%${search}%`)
        )
      )!;
    }

    const [total] = await db.select({ count: count() }).from(members).where(whereClause);

    const items = await db.query.members.findMany({
      where: whereClause,
      with: { subscriptions: { limit: 1, orderBy: [desc(subscriptions.createdAt)] } },
      limit: parseInt(limit),
      offset,
      orderBy: [desc(members.createdAt)],
    });

    return { items, total: total.count, page: parseInt(page), limit: parseInt(limit) };
  }, {
    params: gymIdParams,
    query: t.Object({
      page: t.Optional(t.String()),
      limit: t.Optional(t.String()),
      search: t.Optional(t.String()),
      status: t.Optional(t.String()),
    }),
    detail: { summary: "List members" },
  })
  .post("/", async ({ params, body }) => {
    const barcode = `GM${Date.now().toString(36).toUpperCase()}`;
    const [member] = await db.insert(members).values({ ...body, gymId: params.gymId, barcode }).returning();
    return member;
  }, {
    params: gymIdParams,
    body: t.Object({
      fullName: t.String(),
      phone: t.String(),
      email: t.Optional(t.String()),
      branchId: t.Optional(t.String()),
      idNumber: t.Optional(t.String()),
      dateOfBirth: t.Optional(t.String()),
      gender: t.Optional(t.Union([t.Literal("male"), t.Literal("female")])),
    }),
    detail: { summary: "Create member" },
  })
  .get("/:memberId", async ({ params }) => {
    return db.query.members.findFirst({
      where: eq(members.id, params.memberId),
      with: { subscriptions: { with: { plan: true } } },
    });
  }, {
    params: gymAndMemberIdParams,
    detail: { summary: "Get member" },
  })
  .put("/:memberId", async ({ params, body }) => {
    return db.update(members).set(body).where(eq(members.id, params.memberId)).returning();
  }, {
    params: gymAndMemberIdParams,
    body: t.Object({
      fullName: t.Optional(t.String()),
      phone: t.Optional(t.String()),
      email: t.Optional(t.String()),
      photoUrl: t.Optional(t.String()),
      isActive: t.Optional(t.Boolean()),
    }),
    detail: { summary: "Update member" },
  })
  .delete("/:memberId", async ({ params }) => {
    return db.delete(members).where(eq(members.id, params.memberId)).returning();
  }, {
    params: gymAndMemberIdParams,
    detail: { summary: "Delete member" },
  })
  .get("/by-barcode/:barcode", async ({ params }) => {
    const member = await db.query.members.findFirst({
      where: and(eq(members.barcode, params.barcode), eq(members.gymId, params.gymId)),
      with: { subscriptions: { where: eq(subscriptions.status, "active"), limit: 1 } },
    });

    if (!member) {
      return { found: false };
    }

    const activeSub = member.subscriptions[0];
    const daysRemaining = activeSub
      ? Math.ceil((new Date(activeSub.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : 0;

    return {
      found: true,
      member,
      subscription: activeSub,
      daysRemaining,
      canEnter: daysRemaining > 0,
    };
  }, {
    params: gymAndBarcodeParams,
    detail: { summary: "Get member by barcode" },
  });

export const subscriptionPlanRoutes = new Elysia({ prefix: "/api/v1/gyms/:gymId/subscription-plans", tags: ["Subscription Plans"] })
  .use(requireGymAccess)
  .get("/", async ({ params }) => {
    return db.query.subscriptionPlans.findMany({
      where: eq(subscriptionPlans.gymId, params.gymId),
    });
  }, {
    params: gymIdParams,
    detail: { summary: "List subscription plans" },
  })
  .post("/", async ({ params, body }) => {
    return db.insert(subscriptionPlans).values({ ...body, gymId: params.gymId }).returning();
  }, {
    params: gymIdParams,
    body: t.Object({
      name: t.String(),
      durationDays: t.Number(),
      price: t.String(),
      description: t.Optional(t.String()),
    }),
    detail: { summary: "Create subscription plan" },
  })
  .put("/:planId", async ({ params, body }) => {
    return db.update(subscriptionPlans).set(body).where(eq(subscriptionPlans.id, params.planId)).returning();
  }, {
    params: gymAndPlanIdParams,
    body: t.Object({
      name: t.Optional(t.String()),
      durationDays: t.Optional(t.Number()),
      price: t.Optional(t.String()),
      isActive: t.Optional(t.Boolean()),
    }),
    detail: { summary: "Update subscription plan" },
  })
  .delete("/:planId", async ({ params }) => {
    return db.delete(subscriptionPlans).where(eq(subscriptionPlans.id, params.planId)).returning();
  }, {
    params: gymAndPlanIdParams,
    detail: { summary: "Delete subscription plan" },
  });

export const subscriptionRoutes = new Elysia({ prefix: "/api/v1/gyms/:gymId/subscriptions", tags: ["Subscriptions"] })
  .use(requireStaff)
  .get("/", async ({ params, query }) => {
    const { status } = query;
    let whereClause = eq(subscriptions.gymId, params.gymId);

    if (status) {
      whereClause = and(whereClause, eq(subscriptions.status, status))!;
    }

    return db.query.subscriptions.findMany({
      where: whereClause,
      with: { member: true, plan: true },
      orderBy: [desc(subscriptions.createdAt)],
    });
  }, {
    params: gymIdParams,
    query: t.Object({ status: t.Optional(t.String()) }),
    detail: { summary: "List subscriptions" },
  })
  .post("/", async ({ params, body }) => {
    const plan = await db.query.subscriptionPlans.findFirst({
      where: eq(subscriptionPlans.id, body.planId),
    });

    if (!plan) throw new Error("Plan not found");

    const startDate = new Date(body.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + plan.durationDays);

    return db.insert(subscriptions).values({
      gymId: params.gymId,
      memberId: body.memberId,
      planId: body.planId,
      startDate: body.startDate,
      endDate: endDate.toISOString().split("T")[0],
      pricePaid: body.pricePaid,
      status: "active",
    }).returning();
  }, {
    params: gymIdParams,
    body: t.Object({
      memberId: t.String({ format: "uuid" }),
      planId: t.String({ format: "uuid" }),
      startDate: t.String(),
      pricePaid: t.Optional(t.String()),
    }),
    detail: { summary: "Create subscription" },
  })
  .put("/:subscriptionId/renew", async ({ params, body }) => {
    const sub = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.id, params.subscriptionId),
    });
    if (!sub) throw new Error("Subscription not found");

    const newEndDate = new Date(sub.endDate);
    newEndDate.setDate(newEndDate.getDate() + body.extendDays);

    return db.update(subscriptions)
      .set({ endDate: newEndDate.toISOString().split("T")[0], status: "active", isRenewal: true })
      .where(eq(subscriptions.id, params.subscriptionId))
      .returning();
  }, {
    params: gymAndSubscriptionIdParams,
    body: t.Object({ extendDays: t.Number() }),
    detail: { summary: "Renew subscription" },
  })
  .get("/expiring", async ({ params, query }) => {
    const days = parseInt(query.days ?? "7");
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + days);

    return db.query.subscriptions.findMany({
      where: and(
        eq(subscriptions.gymId, params.gymId),
        eq(subscriptions.status, "active"),
        lte(subscriptions.endDate, targetDate.toISOString().split("T")[0])
      ),
      with: { member: true, plan: true },
    });
  }, {
    params: gymIdParams,
    query: t.Object({ days: t.Optional(t.String()) }),
    detail: { summary: "Get expiring subscriptions" },
  });
