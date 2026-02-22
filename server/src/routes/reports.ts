import { Elysia, t } from "elysia";
import { db } from "../db";
import { members, subscriptions, attendance, payments, trainers, trainerClients, branches } from "../db/schema";
import { eq, and, gte, lte, desc, count, sql } from "drizzle-orm";
import { requireGymAdmin } from "../middleware/auth";

export const reportRoutes = new Elysia({ prefix: "/api/v1/gyms/:gymId/reports", tags: ["Reports"] })
  .use(requireGymAdmin)
  .get("/attendance", async ({ params, query }) => {
    const { from, to, branchId } = query;
    let whereClause = eq(attendance.gymId, params.gymId);

    if (from) {
      whereClause = and(whereClause, gte(attendance.checkIn, new Date(from)))!;
    }
    if (to) {
      whereClause = and(whereClause, lte(attendance.checkIn, new Date(to)))!;
    }
    if (branchId) {
      whereClause = and(whereClause, eq(attendance.branchId, branchId))!;
    }

    const records = await db.query.attendance.findMany({
      where: whereClause,
      with: { member: true, branch: true },
      orderBy: [desc(attendance.checkIn)],
    });

    const [summary] = await db
      .select({
        totalCheckins: count(),
        uniqueMembers: sql<string>`COUNT(DISTINCT member_id)`,
      })
      .from(attendance)
      .where(whereClause);

    return { records, summary };
  }, {
    query: t.Object({
      from: t.Optional(t.String()),
      to: t.Optional(t.String()),
      branchId: t.Optional(t.String()),
    }),
    detail: { summary: "Attendance report" },
  })
  .get("/revenue", async ({ params, query }) => {
    const { from, to, groupBy = "day" } = query;
    let whereClause = eq(payments.gymId, params.gymId);

    if (from) {
      whereClause = and(whereClause, gte(payments.createdAt, new Date(from)))!;
    }
    if (to) {
      whereClause = and(whereClause, lte(payments.createdAt, new Date(to)))!;
    }

    const payments_list = await db.query.payments.findMany({
      where: whereClause,
      with: { member: true },
      orderBy: [desc(payments.createdAt)],
    });

    const [summary] = await db
      .select({
        totalAmount: sql<string>`COALESCE(SUM(amount), 0)`,
        totalVat: sql<string>`COALESCE(SUM(vat_amount), 0)`,
        count: count(),
      })
      .from(payments)
      .where(whereClause);

    const byMethod = await db
      .select({
        method: payments.paymentMethod,
        total: sql<string>`COALESCE(SUM(amount), 0)`,
        count: count(),
      })
      .from(payments)
      .where(whereClause)
      .groupBy(payments.paymentMethod);

    return { payments: payments_list, summary, byMethod };
  }, {
    query: t.Object({
      from: t.Optional(t.String()),
      to: t.Optional(t.String()),
      groupBy: t.Optional(t.String()),
    }),
    detail: { summary: "Revenue report" },
  })
  .get("/members", async ({ params }) => {
    const [total] = await db
      .select({ count: count() })
      .from(members)
      .where(eq(members.gymId, params.gymId));

    const [active] = await db
      .select({ count: count() })
      .from(subscriptions)
      .where(and(eq(subscriptions.gymId, params.gymId), eq(subscriptions.status, "active")));

    const [expired] = await db
      .select({ count: count() })
      .from(subscriptions)
      .where(and(eq(subscriptions.gymId, params.gymId), eq(subscriptions.status, "expired")));

    const byBranch = await db
      .select({
        branchId: members.branchId,
        count: count(),
      })
      .from(members)
      .where(eq(members.gymId, params.gymId))
      .groupBy(members.branchId);

    return { total: total.count, active: active.count, expired: expired.count, byBranch };
  }, {
    detail: { summary: "Members report" },
  })
  .get("/subscriptions", async ({ params, query }) => {
    const { from, to, status } = query;
    let whereClause = eq(subscriptions.gymId, params.gymId);

    if (from) {
      whereClause = and(whereClause, gte(subscriptions.startDate, new Date(from)))!;
    }
    if (to) {
      whereClause = and(whereClause, lte(subscriptions.startDate, new Date(to)))!;
    }
    if (status) {
      whereClause = and(whereClause, eq(subscriptions.status, status))!;
    }

    const records = await db.query.subscriptions.findMany({
      where: whereClause,
      with: { member: true, plan: true },
      orderBy: [desc(subscriptions.createdAt)],
    });

    const [summary] = await db
      .select({
        totalRevenue: sql<string>`COALESCE(SUM(price_paid), 0)`,
        count: count(),
      })
      .from(subscriptions)
      .where(whereClause);

    return { records, summary };
  }, {
    query: t.Object({
      from: t.Optional(t.String()),
      to: t.Optional(t.String()),
      status: t.Optional(t.String()),
    }),
    detail: { summary: "Subscriptions report" },
  })
  .get("/trainers", async ({ params }) => {
    const trainerList = await db.query.trainers.findMany({
      where: eq(trainers.gymId, params.gymId),
      with: {
        user: true,
        trainerClients: {
          with: { member: true },
        },
      },
    });

    const stats = await Promise.all(
      trainerList.map(async (trainer) => {
        const [sessions] = await db
          .select({ count: count() })
          .from(trainerSessions)
          .innerJoin(trainerClients, eq(trainerSessions.trainerClientId, trainerClients.id))
          .where(eq(trainerClients.trainerId, trainer.id));

        return {
          trainerId: trainer.id,
          trainerName: trainer.user.fullName,
          clientCount: trainer.trainerClients.length,
          totalSessions: sessions.count,
        };
      })
    );

    return stats;
  }, {
    detail: { summary: "Trainers report" },
  });
