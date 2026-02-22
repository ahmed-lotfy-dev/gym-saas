import { Elysia, t } from "elysia";
import { db } from "../db";
import { users, gyms, branches, gymSettings, taxConfig } from "../db/schema";
import { eq } from "drizzle-orm";
import { requireGymAccess, requireGymAdmin } from "../middleware/auth";

export const settingsRoutes = new Elysia({ prefix: "/api/v1/gyms/:gymId/settings", tags: ["Settings"] })
  .use(requireGymAdmin)
  .get("/", async ({ params }) => {
    const settings = await db.query.gymSettings.findFirst({
      where: eq(gymSettings.gymId, params.gymId),
    });

    const tax = await db.query.taxConfig.findFirst({
      where: eq(taxConfig.gymId, params.gymId),
    });

    return { ...settings, tax };
  }, {
    detail: { summary: "Get gym settings" },
  })
  .put("/", async ({ params, body }) => {
    await db.update(gymSettings)
      .set(body)
      .where(eq(gymSettings.gymId, params.gymId));

    return db.query.gymSettings.findFirst({
      where: eq(gymSettings.gymId, params.gymId),
    });
  }, {
    body: t.Object({
      alertDaysBeforeExpiry: t.Optional(t.Number()),
      receiptFooter: t.Optional(t.String()),
      enableOnlineRegistration: t.Optional(t.Boolean()),
      enableMembershipFreeze: t.Optional(t.Boolean()),
      enableOnlineFreezeRequest: t.Optional(t.Boolean()),
      enableSelfCancellation: t.Optional(t.Boolean()),
      enableReferralSystem: t.Optional(t.Boolean()),
      enableGuestPasses: t.Optional(t.Boolean()),
      enableClassBooking: t.Optional(t.Boolean()),
      enableOnlinePayments: t.Optional(t.Boolean()),
      enableAutoRenewal: t.Optional(t.Boolean()),
      enableTrainerCommission: t.Optional(t.Boolean()),
      enableBirthdayRewards: t.Optional(t.Boolean()),
      enableWaitlist: t.Optional(t.Boolean()),
      enableCheckOut: t.Optional(t.Boolean()),
      enableVisitLimits: t.Optional(t.Boolean()),
      enableTimeRestrictions: t.Optional(t.Boolean()),
    }),
    detail: { summary: "Update gym settings" },
  });

export const userRoutes = new Elysia({ prefix: "/api/v1/gyms/:gymId/users", tags: ["Users"] })
  .use(requireGymAdmin)
  .get("/", async ({ params }) => {
    return db.query.users.findMany({
      where: eq(users.gymId, params.gymId),
      with: { branch: true },
    });
  }, {
    detail: { summary: "List gym users" },
  })
  .post("/", async ({ params, body }) => {
    const passwordHash = await Bun.password.hash(body.password, { algorithm: "bcrypt", cost: 12 });
    return db.insert(users).values({
      ...body,
      gymId: params.gymId,
      passwordHash,
    }).returning();
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
      fullName: t.String(),
      phone: t.Optional(t.String()),
      role: t.Union([
        t.Literal("gym_admin"),
        t.Literal("staff"),
        t.Literal("trainer"),
      ]),
      branchId: t.Optional(t.String()),
    }),
    detail: { summary: "Create user" },
  })
  .get("/:userId", async ({ params }) => {
    return db.query.users.findFirst({
      where: eq(users.id, params.userId),
      with: { branch: true },
    });
  }, {
    detail: { summary: "Get user" },
  })
  .put("/:userId", async ({ params, body }) => {
    return db.update(users).set(body).where(eq(users.id, params.userId)).returning();
  }, {
    body: t.Object({
      fullName: t.Optional(t.String()),
      phone: t.Optional(t.String()),
      branchId: t.Optional(t.String()),
      isActive: t.Optional(t.Boolean()),
    }),
    detail: { summary: "Update user" },
  })
  .delete("/:userId", async ({ params }) => {
    return db.delete(users).where(eq(users.id, params.userId)).returning();
  }, {
    detail: { summary: "Delete user" },
  });
