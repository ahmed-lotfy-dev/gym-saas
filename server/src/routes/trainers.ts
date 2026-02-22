import { Elysia, t } from "elysia";
import { db } from "../db";
import { trainers, trainerClients, trainerSessions, trainerNotes, members, users } from "../db/schema";
import { eq, and, desc, count } from "drizzle-orm";
import { requireGymAccess, requireAuth } from "../middleware/auth";

export const trainerRoutes = new Elysia({ prefix: "/api/v1/gyms/:gymId/trainers", tags: ["Trainers"] })
  .use(requireGymAccess)
  .get("/", async ({ params }) => {
    return db.query.trainers.findMany({
      where: eq(trainers.gymId, params.gymId),
      with: { user: true },
    });
  }, {
    detail: { summary: "List trainers" },
  })
  .post("/", async ({ params, body }) => {
    return db.insert(trainers).values({ ...body, gymId: params.gymId }).returning();
  }, {
    body: t.Object({
      userId: t.String(),
      specialty: t.Optional(t.String()),
      bio: t.Optional(t.String()),
      commissionRate: t.Optional(t.String()),
    }),
    detail: { summary: "Create trainer" },
  })
  .get("/:trainerId", async ({ params }) => {
    return db.query.trainers.findFirst({
      where: eq(trainers.id, params.trainerId),
      with: { user: true },
    });
  }, {
    detail: { summary: "Get trainer" },
  })
  .put("/:trainerId", async ({ params, body }) => {
    return db.update(trainers).set(body).where(eq(trainers.id, params.trainerId)).returning();
  }, {
    body: t.Object({
      specialty: t.Optional(t.String()),
      bio: t.Optional(t.String()),
      commissionRate: t.Optional(t.String()),
      isActive: t.Optional(t.Boolean()),
    }),
    detail: { summary: "Update trainer" },
  })
  .delete("/:trainerId", async ({ params }) => {
    return db.delete(trainers).where(eq(trainers.id, params.trainerId)).returning();
  }, {
    detail: { summary: "Delete trainer" },
  });

export const trainerClientRoutes = new Elysia({ prefix: "/api/v1/trainers/:trainerId", tags: ["Trainer Clients"] })
  .use(requireAuth)
  .get("/clients", async ({ params, user }) => {
    if (user?.role !== "super_admin" && user?.role !== "gym_admin") {
      const trainer = await db.query.trainers.findFirst({
        where: eq(trainers.userId, user?.id),
      });
      if (trainer?.id !== params.trainerId) {
        return [];
      }
    }

    return db.query.trainerClients.findMany({
      where: eq(trainerClients.trainerId, params.trainerId),
      with: { member: true },
    });
  }, {
    detail: { summary: "Get trainer's clients" },
  })
  .post("/clients", async ({ params, body }) => {
    return db.insert(trainerClients).values({
      trainerId: params.trainerId,
      memberId: body.memberId,
      totalSessions: body.totalSessions,
      remainingSessions: body.totalSessions,
      startDate: body.startDate,
      endDate: body.endDate,
    }).returning();
  }, {
    body: t.Object({
      memberId: t.String(),
      totalSessions: t.Number(),
      startDate: t.String(),
      endDate: t.String(),
    }),
    detail: { summary: "Add client to trainer" },
  })
  .post("/clients/:clientId/sessions", async ({ params, body }) => {
    const client = await db.query.trainerClients.findFirst({
      where: eq(trainerClients.id, params.clientId),
    });

    if (!client || client.remainingSessions <= 0) {
      throw new Error("No remaining sessions");
    }

    await db.update(trainerClients)
      .set({ remainingSessions: client.remainingSessions - 1 })
      .where(eq(trainerClients.id, params.clientId));

    return db.insert(trainerSessions).values({
      trainerClientId: params.clientId,
      sessionDate: body.sessionDate ?? new Date().toISOString().split("T")[0],
      notes: body.notes,
    }).returning();
  }, {
    body: t.Object({
      sessionDate: t.Optional(t.String()),
      notes: t.Optional(t.String()),
    }),
    detail: { summary: "Log training session" },
  })
  .get("/sessions", async ({ params }) => {
    return db.query.trainerSessions.findMany({
      where: eq(trainerClients.trainerId, params.trainerId),
      with: { trainerClient: { with: { member: true } } },
      orderBy: [desc(trainerSessions.createdAt)],
    });
  }, {
    detail: { summary: "Get trainer sessions" },
  })
  .post("/clients/:clientId/notes", async ({ params, body }) => {
    return db.insert(trainerNotes).values({
      trainerClientId: params.clientId,
      note: body.note,
    }).returning();
  }, {
    body: t.Object({ note: t.String() }),
    detail: { summary: "Add client note" },
  });
