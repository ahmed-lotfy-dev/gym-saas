import { Elysia, t } from "elysia";
import { db } from "../db";
import { payments, members, subscriptions } from "../db/schema";
import { eq, and, gte, desc, count, sql } from "drizzle-orm";
import { requireGymAdmin } from "../middleware/auth";

const gymIdParams = t.Object({
  gymId: t.String({ format: "uuid" }),
});

const gymAndPaymentIdParams = t.Object({
  gymId: t.String({ format: "uuid" }),
  paymentId: t.String({ format: "uuid" }),
});

export const paymentRoutes = new Elysia({ prefix: "/api/v1/gyms/:gymId/payments", tags: ["Payments"] })
  .use(requireGymAdmin)
  .get("/", async ({ params, query }) => {
    const { page = "1", limit = "20", memberId } = query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let whereClause = eq(payments.gymId, params.gymId);
    if (memberId) {
      whereClause = and(whereClause, eq(payments.memberId, memberId))!;
    }

    const [total] = await db.select({ count: count() }).from(payments).where(whereClause);

    const items = await db.query.payments.findMany({
      where: whereClause,
      with: { member: true, subscription: true },
      limit: parseInt(limit),
      offset,
      orderBy: [desc(payments.createdAt)],
    });

    return { items, total: total.count, page: parseInt(page), limit: parseInt(limit) };
  }, {
    params: gymIdParams,
    query: t.Object({
      page: t.Optional(t.String()),
      limit: t.Optional(t.String()),
      memberId: t.Optional(t.String({ format: "uuid" })),
    }),
    detail: { summary: "List payments" },
  })
  .post("/", async ({ params, body, user }) => {
    return db.insert(payments).values({
      gymId: params.gymId,
      memberId: body.memberId,
      subscriptionId: body.subscriptionId,
      amount: body.amount,
      vatAmount: body.vatAmount ?? "0",
      paymentMethod: body.paymentMethod,
      referenceNumber: body.referenceNumber,
      notes: body.notes,
      recordedBy: user?.id,
    }).returning();
  }, {
    params: gymIdParams,
    body: t.Object({
      memberId: t.String({ format: "uuid" }),
      subscriptionId: t.Optional(t.String({ format: "uuid" })),
      amount: t.String(),
      vatAmount: t.Optional(t.String()),
      paymentMethod: t.Union([
        t.Literal("cash"), t.Literal("bank_transfer"), t.Literal("visa"),
        t.Literal("instapay"), t.Literal("vodafone_cash"), t.Literal("mada"), t.Literal("knet"),
      ]),
      referenceNumber: t.Optional(t.String()),
      notes: t.Optional(t.String()),
    }),
    detail: { summary: "Create payment" },
  })
  .get("/summary", async ({ params, query }) => {
    const { from, to } = query;
    let whereClause = eq(payments.gymId, params.gymId);

    if (from && to) {
      whereClause = and(
        whereClause,
        gte(payments.createdAt, new Date(from))
      )!;
    }

    const [result] = await db
      .select({
        totalAmount: sql<string>`COALESCE(SUM(amount), 0)`,
        totalVat: sql<string>`COALESCE(SUM(vat_amount), 0)`,
        count: count(),
      })
      .from(payments)
      .where(whereClause);

    return result;
  }, {
    params: gymIdParams,
    query: t.Object({ from: t.Optional(t.String()), to: t.Optional(t.String()) }),
    detail: { summary: "Payment summary" },
  })
  .get("/daily", async ({ params, query }) => {
    const date = query.date ?? new Date().toISOString().split("T")[0];
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return db.query.payments.findMany({
      where: and(
        eq(payments.gymId, params.gymId),
        gte(payments.createdAt, start)
      ),
      with: { member: true },
      orderBy: [desc(payments.createdAt)],
    });
  }, {
    params: gymIdParams,
    query: t.Object({ date: t.Optional(t.String()) }),
    detail: { summary: "Daily payments" },
  })
  .get("/:paymentId", async ({ params }) => {
    return db.query.payments.findFirst({
      where: eq(payments.id, params.paymentId),
      with: { member: true, subscription: true },
    });
  }, {
    params: gymAndPaymentIdParams,
    detail: { summary: "Get payment" },
  });
