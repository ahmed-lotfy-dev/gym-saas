import { Elysia, t } from "elysia";
import { db } from "../db";
import { gyms, branches, users, gymSettings, taxConfig } from "../db/schema";
import { eq, desc, count, sql, and, gte, lte } from "drizzle-orm";
import { requireGymAccess } from "../middleware/auth";

// Validation layer is temporarily disabled per request.
// const uuidParams = t.Object({
//   gymId: t.String({
//     format: "uuid",
//     default: "7dd186a6-f33e-4f7e-8758-e083df5f2d0f",
//     description: "Gym UUID. Replace with a real gym ID from POST /api/v1/gyms",
//   }),
// });
//
// const gymAndBranchUuidParams = t.Object({
//   gymId: t.String({
//     format: "uuid",
//     default: "7dd186a6-f33e-4f7e-8758-e083df5f2d0f",
//     description: "Gym UUID",
//   }),
//   branchId: t.String({
//     format: "uuid",
//     default: "11111111-1111-1111-1111-111111111111",
//     description: "Branch UUID",
//   }),
// });

const createGymBody = t.Partial(
  t.Object({
    name: t.String({ minLength: 1, default: "Downtown Gym" }),
    address: t.String({ default: "Cairo, Egypt" }),
    phone: t.String({ default: "+201001112223" }),
    email: t.String({ default: "admin@downtowngym.com" }),
    currency: t.String({ default: "EGP" }),
  }),
  {
    examples: [
      {
        name: "Downtown Gym",
        address: "Cairo, Egypt",
        phone: "+201001112223",
        email: "admin@downtowngym.com",
        currency: "EGP",
      },
    ],
  }
);

export const gymRoutes = new Elysia({ prefix: "/api/v1/gyms", tags: ["Gyms"] })
  // TODO(security): restore gym ownership/super-admin authorization checks after testing.
  .get("/", async () => {
    return db.query.gyms.findMany({
      with: { branches: true },
      orderBy: [desc(gyms.createdAt)],
    });
  }, {
    detail: {
      summary: "List gyms",
      description:
        "Testing mode: currently returns all gyms without auth guard. Intended production access: gym owner (gym_admin) for own gym; super admin only via explicit support workflow.",
    },
  })
  .post("/", async ({ body }) => {
    const [gym] = await db.insert(gyms).values(body).returning();
    await db.insert(gymSettings).values({ gymId: gym.id });
    await db.insert(taxConfig).values({ gymId: gym.id });
    return gym;
  }, {
    body: createGymBody,
    detail: {
      summary: "Create a new gym",
      description:
        "Testing mode. Name cannot be empty. Intended production access should be restricted and audited.",
    },
  })
  .get("/:gymId", async ({ params }) => {
    return db.query.gyms.findFirst({
      where: eq(gyms.id, params.gymId),
      with: { branches: true },
    });
  }, {
    // params: uuidParams,
    detail: {
      summary: "Get gym by ID",
      description:
        "Testing mode route. Intended production access: gym owner for assigned gym; support access should be explicit and auditable.",
    },
  })
  .put("/:gymId", async ({ params, body }) => {
    return db.update(gyms).set(body).where(eq(gyms.id, params.gymId)).returning();
  }, {
    // params: uuidParams,
    body: t.Object({
      name: t.Optional(t.String({ minLength: 1, default: "Downtown Gym" })),
      address: t.Optional(t.String({ default: "Cairo, Egypt" })),
      phone: t.Optional(t.String({ default: "+201001112223" })),
      email: t.Optional(t.String({ default: "admin@downtowngym.com" })),
      logoUrl: t.Optional(t.String({ default: "https://example.com/logo.png" })),
      isActive: t.Optional(t.Boolean()),
    }),
    detail: {
      summary: "Update gym",
      description: "Testing mode route. Intended production access: gym owner for assigned gym.",
    },
  })
  .delete("/:gymId", async ({ params }) => {
    return db.delete(gyms).where(eq(gyms.id, params.gymId)).returning();
  }, {
    // params: uuidParams,
    detail: {
      summary: "Delete gym",
      description: "Testing mode route. Intended production access should be restricted and audited.",
    },
  });

export const branchRoutes = new Elysia({ prefix: "/api/v1/gyms/:gymId/branches", tags: ["Branches"] })
  .use(requireGymAccess)
  .get("/", async ({ params }) => {
    return db.query.branches.findMany({
      where: eq(branches.gymId, params.gymId),
    });
  }, {
    // params: uuidParams,
    detail: { summary: "List branches" },
  })
  .post("/", async ({ params, body }) => {
    return db.insert(branches).values({ ...body, gymId: params.gymId }).returning();
  }, {
    // params: uuidParams,
    body: t.Partial(t.Object({
      name: t.String({ minLength: 1, default: "Main Branch" }),
      address: t.String({ default: "Nasr City, Cairo" }),
      phone: t.String({ default: "+201001112224" }),
    })),
    detail: {
      summary: "Create branch",
      description: "Use a real gymId UUID. Branch name cannot be empty.",
    },
  })
  .get("/:branchId", async ({ params }) => {
    return db.query.branches.findFirst({
      where: eq(branches.id, params.branchId),
    });
  }, {
    // params: gymAndBranchUuidParams,
    detail: { summary: "Get branch" },
  })
  .put("/:branchId", async ({ params, body }) => {
    return db.update(branches).set(body).where(eq(branches.id, params.branchId)).returning();
  }, {
    // params: gymAndBranchUuidParams,
    body: t.Object({
      name: t.Optional(t.String({ minLength: 1, default: "Main Branch" })),
      address: t.Optional(t.String({ default: "Nasr City, Cairo" })),
      phone: t.Optional(t.String({ default: "+201001112224" })),
      isActive: t.Optional(t.Boolean()),
    }),
    detail: { summary: "Update branch" },
  })
  .delete("/:branchId", async ({ params }) => {
    return db.delete(branches).where(eq(branches.id, params.branchId)).returning();
  }, {
    // params: gymAndBranchUuidParams,
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
    // params: uuidParams,
    detail: {
      summary: "Get gym dashboard stats",
      description: "Super admin can access any gym dashboard. Gym admin can access only their assigned gym.",
    },
  });

import { members, subscriptions, attendance, payments } from "../db/schema";
