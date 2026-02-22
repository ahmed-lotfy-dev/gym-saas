import { Elysia, t } from "elysia";
import { db } from "../db";
import { attendance, members, subscriptions } from "../db/schema";
import { eq, and, gte, desc, count, sql } from "drizzle-orm";
import { requireStaff } from "../middleware/auth";

const attendanceIdParams = t.Object({
  attendanceId: t.String({ format: "uuid" }),
});

const gymIdParams = t.Object({
  gymId: t.String({ format: "uuid" }),
});

export const attendanceRoutes = new Elysia({ prefix: "/api/v1/attendance", tags: ["Attendance"] })
  .post("/scan", async ({ body, user }) => {
    const member = await db.query.members.findFirst({
      where: eq(members.barcode, body.barcode),
      with: {
        subscriptions: {
          where: eq(subscriptions.status, "active"),
          limit: 1,
        },
      },
    });

    if (!member) {
      return { success: false, message: "Member not found" };
    }

    const activeSub = member.subscriptions[0];
    if (!activeSub) {
      return { success: false, message: "No active subscription", member };
    }

    const daysRemaining = Math.ceil(
      (new Date(activeSub.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    if (daysRemaining <= 0) {
      return { success: false, message: "Subscription expired", member, daysRemaining };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingCheckin = await db.query.attendance.findFirst({
      where: and(
        eq(attendance.memberId, member.id),
        gte(attendance.checkIn, today)
      ),
    });

    if (existingCheckin && !existingCheckin.checkOut) {
      return { success: false, message: "Already checked in", member, daysRemaining };
    }

    const [record] = await db.insert(attendance).values({
      gymId: member.gymId,
      branchId: body.branchId ?? member.branchId,
      memberId: member.id,
      scannedBy: user?.id,
      checkIn: new Date(),
      deviceId: body.deviceId,
    }).returning();

    return {
      success: true,
      message: "Welcome!",
      member,
      daysRemaining,
      checkInTime: record.checkIn,
    };
  }, {
    body: t.Object({
      barcode: t.String(),
      branchId: t.Optional(t.String()),
      deviceId: t.Optional(t.String()),
    }),
    detail: { summary: "Scan barcode for attendance" },
  })
  .post("/:attendanceId/checkout", async ({ params }) => {
    return db.update(attendance)
      .set({ checkOut: new Date() })
      .where(eq(attendance.id, params.attendanceId))
      .returning();
  }, {
    params: attendanceIdParams,
    detail: { summary: "Check out" },
  });

export const gymAttendanceRoutes = new Elysia({ prefix: "/api/v1/gyms/:gymId/attendance", tags: ["Attendance"] })
  .use(requireStaff)
  .get("/today", async ({ params, query }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return db.query.attendance.findMany({
      where: and(
        eq(attendance.gymId, params.gymId),
        gte(attendance.checkIn, today),
        query.branchId ? eq(attendance.branchId, query.branchId) : undefined!
      ),
      with: { member: true },
      orderBy: [desc(attendance.checkIn)],
    });
  }, {
    params: gymIdParams,
    query: t.Object({ branchId: t.Optional(t.String()) }),
    detail: { summary: "Get today's attendance" },
  })
  .get("/", async ({ params, query }) => {
    const { from, to, page = "1", limit = "50" } = query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let whereClause = eq(attendance.gymId, params.gymId);

    if (from && to) {
      whereClause = and(whereClause, gte(attendance.checkIn, new Date(from)))!;
    }

    const items = await db.query.attendance.findMany({
      where: whereClause,
      with: { member: true },
      limit: parseInt(limit),
      offset,
      orderBy: [desc(attendance.checkIn)],
    });

    return items;
  }, {
    params: gymIdParams,
    query: t.Object({
      from: t.Optional(t.String()),
      to: t.Optional(t.String()),
      page: t.Optional(t.String()),
      limit: t.Optional(t.String()),
    }),
    detail: { summary: "List attendance records" },
  });
