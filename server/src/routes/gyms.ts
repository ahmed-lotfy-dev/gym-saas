import { Elysia, t } from "elysia";
import { db } from "../db";
import { gyms, branches, users, gymSettings, taxConfig } from "../db/schema";
import { eq, desc, count, sql, and, gte, lte } from "drizzle-orm";
import { requireSuperAdmin, requireGymAccess, requireGymAdmin } from "../middleware/auth";

export const gymRoutes = new Elysia({ prefix: "/api/v1/gyms", tags: ["Gyms"] })
  .use(requireSuperAdmin)
  .get("/", async () => {
    return db.query.gyms.findMany({
      with: { branches: true },
      orderBy: [desc(gyms.createdAt)],
    });
  }, {
    detail: { summary: "List all gyms (Super Admin)" },
  })
  .post("/", async ({ body }) => {
    const [gym] = await db.insert(gyms).values(body).returning();
    await db.insert(gymSettings).values({ gymId: gym.id });
    await db.insert(taxConfig).values({ gymId: gym.id });
    return gym;
  }, {
    body: t.Object({
      name: t.String(),
      address: t.Optional(t.String()),
      phone: t.Optional(t.String()),
      email: t.Optional(t.String()),
      currency: t.Optional(t.String()),
    }),
    detail: { summary: "Create a new gym" },
  })
  .get("/:gymId", async ({ params }) => {
    return db.query.gyms.findFirst({
      where: eq(gyms.id, params.gymId),
      with: { branches: true },
    });
  }, {
    detail: { summary: "Get gym by ID" },
  })
  .put("/:gymId", async ({ params, body }) => {
    return db.update(gyms).set(body).where(eq(gyms.id, params.gymId)).returning();
  }, {
    body: t.Object({
      name: t.Optional(t.String()),
      address: t.Optional(t.String()),
      phone: t.Optional(t.String()),
      email: t.Optional(t.String()),
      logoUrl: t.Optional(t.String()),
      isActive: t.Optional(t.Boolean()),
    }),
    detail: { summary: "Update gym" },
  })
  .delete("/:gymId", async ({ params }) => {
    return db.delete(gyms).where(eq(gyms.id, params.gymId)).returning();
  }, {
    detail: { summary: "Delete gym" },
  });

export const branchRoutes = new Elysia({ prefix: "/api/v1/gyms/:gymId/branches", tags: ["Branches"] })
  .use(requireGymAccess)
  .get("/", async ({ params }) => {
    return db.query.branches.findMany({
      where: eq(branches.gymId, params.gymId),
    });
  }, {
    detail: { summary: "List branches" },
  })
  .post("/", async ({ params, body }) => {
    return db.insert(branches).values({ ...body, gymId: params.gymId }).returning();
  }, {
    body: t.Object({
      name: t.String(),
      address: t.Optional(t.String()),
      phone: t.Optional(t.String()),
    }),
    detail: { summary: "Create branch" },
  })
  .get("/:branchId", async ({ params }) => {
    return db.query.branches.findFirst({
      where: eq(branches.id, params.branchId),
    });
  }, {
    detail: { summary: "Get branch" },
  })
  .put("/:branchId", async ({ params, body }) => {
    return db.update(branches).set(body).where(eq(branches.id, params.branchId)).returning();
  }, {
    body: t.Object({
      name: t.Optional(t.String()),
      address: t.Optional(t.String()),
      phone: t.Optional(t.String()),
      isActive: t.Optional(t.Boolean()),
    }),
    detail: { summary: "Update branch" },
  })
  .delete("/:branchId", async ({ params }) => {
    return db.delete(branches).where(eq(branches.id, params.branchId)).returning();
  }, {
    detail: { summary: "Delete branch" },
  });

export const dashboardRoutes = new Elysia({ prefix: "/api/v1/gyms/:gymId/dashboard", tags: ["Dashboard"] })
  .use(requireGymAccess)
  .get("/", async ({ params }) => {
    const gymId = params.gymId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [memberCount] = await db.select({ count: count() }).from(members).where(eq(members.gymId, gymId));
    
    const [todayAttendance] = await db
      .select({ count: count() })
      .from(attendance)
      .where(and(eq(attendance.gymId, gymId), gte(attendance.checkIn, today)));

    const [branchCount] = await db
      .select({ count: count() })
      .from(branches)
      .where(eq(branches.gymId, gymId));

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const [monthlyRevenue] = await db
      .select({ total: sql<string>`COALESCE(SUM(amount), 0)` })
      .from(payments)
      .where(and(eq(payments.gymId, gymId), gte(payments.createdAt, startOfMonth)));

    return {
      totalMembers: memberCount?.count ?? 0,
      todayAttendance: todayAttendance?.count ?? 0,
      totalBranches: branchCount?.count ?? 0,
      monthlyRevenue: monthlyRevenue?.total ?? "0",
    };
  }, {
    detail: { summary: "Get gym dashboard stats" },
  });

import { members, subscriptions, attendance, payments } from "../db/schema";
