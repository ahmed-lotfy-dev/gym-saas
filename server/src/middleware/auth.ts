import { Elysia } from "elysia";
import { auth } from "../auth";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { users, gyms } from "../db/schema";

export type UserRole = "super_admin" | "gym_admin" | "staff" | "trainer";

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  gymId: string | null;
  branchId: string | null;
}

declare module "elysia" {
  interface ElysiaContext {
    user?: AuthUser;
  }
}

export const authMiddleware = new Elysia({ name: "auth-middleware" })
  .derive(async ({ request }): Promise<{ user?: AuthUser }> => {
    try {
      const session = await auth.api.getSession({ headers: request.headers });

      if (!session?.user) {
        return {};
      }

      const userRecord = await db.query.users.findFirst({
        where: eq(users.email, session.user.email),
      });

      if (!userRecord) {
        return {};
      }

      return {
        user: {
          id: userRecord.id,
          email: userRecord.email,
          fullName: userRecord.fullName,
          role: userRecord.role as UserRole,
          gymId: userRecord.gymId,
          branchId: userRecord.branchId,
        },
      };
    } catch (error) {
      // Keep auth failures from bubbling as 500 on protected routes.
      console.error("Auth middleware error:", error);
      return {};
    }
  });

export const requireAuth = new Elysia({ name: "require-auth" })
  .use(authMiddleware)
  .onBeforeHandle(({ user, set }) => {
    if (!user) {
      set.status = 401;
      return { error: "Unauthorized" };
    }
  });

export const requireRole = (...roles: UserRole[]) =>
  new Elysia({ name: "require-role" })
    .use(requireAuth)
    .onBeforeHandle(({ user, set }) => {
      if (!user || !roles.includes(user.role)) {
        set.status = 403;
        return { error: "Forbidden: Insufficient permissions" };
      }
    });

export const requireSuperAdmin = requireRole("super_admin");
export const requireGymAdmin = requireRole("super_admin", "gym_admin");
export const requireStaff = requireRole("super_admin", "gym_admin", "staff");
export const requireTrainer = requireRole("super_admin", "gym_admin", "trainer");

export const requireGymAccess = new Elysia({ name: "require-gym-access" })
  .use(requireAuth)
  .onBeforeHandle(async ({ user, params, set }) => {
    if (!user) {
      set.status = 401;
      return { error: "Unauthorized" };
    }

    if (user.role === "super_admin") {
      return;
    }

    const gymId = params.gymId;
    if (!gymId || user.gymId !== gymId) {
      set.status = 403;
      return { error: "Forbidden: No access to this gym" };
    }
  });
