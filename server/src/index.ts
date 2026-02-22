import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { auth } from "./auth";
import { logger } from "./middleware/logger";
import { csrfProtection } from "./middleware/csrf";
import { securityHeaders } from "./middleware/security-headers";
import { trustedOrigins, env } from "./lib/env";
import { startScheduler, stopScheduler } from "./lib/scheduler";
import { closeDatabase } from "./db";

import { gymRoutes, branchRoutes, dashboardRoutes } from "./routes/gyms";
import { memberRoutes, subscriptionPlanRoutes, subscriptionRoutes } from "./routes/members";
import { attendanceRoutes, gymAttendanceRoutes } from "./routes/attendance";
import { paymentRoutes } from "./routes/payments";
import { trainerRoutes, trainerClientRoutes } from "./routes/trainers";
import { reportRoutes } from "./routes/reports";
import { settingsRoutes, userRoutes } from "./routes/settings";

const app = new Elysia()
  .use(logger)
  .use(securityHeaders)
  .use(
    openapi({
      path: "/docs",
      documentation: {
        info: {
          title: "Gym SaaS API",
          version: "1.0.0",
          description: "Multi-gym SaaS platform API for managing gyms, members, subscriptions, attendance, and trainers.",
        },
        servers: [
          { url: "http://localhost:3001", description: "Development server" },
        ],
        tags: [
          { name: "Gyms", description: "Gym management endpoints" },
          { name: "Branches", description: "Branch management endpoints" },
          { name: "Members", description: "Member management endpoints" },
          { name: "Subscriptions", description: "Subscription management endpoints" },
          { name: "Subscription Plans", description: "Subscription plan endpoints" },
          { name: "Attendance", description: "Attendance and barcode scanning endpoints" },
          { name: "Payments", description: "Payment management endpoints" },
          { name: "Trainers", description: "Trainer management endpoints" },
          { name: "Trainer Clients", description: "Trainer-client relationship endpoints" },
          { name: "Reports", description: "Analytics and reporting endpoints" },
          { name: "Settings", description: "Gym settings and configuration endpoints" },
          { name: "Dashboard", description: "Dashboard statistics endpoints" },
        ],
      },
    })
  )
  .use(
    cors({
      origin: (request) => {
        const origin = request.headers.get("origin");
        if (!origin) return true;
        return trustedOrigins.includes(origin);
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "Cookie", "Accept", "X-CSRF-Token"],
    })
  )
  .use(csrfProtection)
  .mount("/api/auth", auth.handler)
  .get("/health", () => ({ status: "ok", timestamp: new Date().toISOString() }))
  .get("/", () => "Gym SaaS API - Visit /docs for documentation")
  .use(gymRoutes)
  .use(branchRoutes)
  .use(dashboardRoutes)
  .use(memberRoutes)
  .use(subscriptionPlanRoutes)
  .use(subscriptionRoutes)
  .use(attendanceRoutes)
  .use(gymAttendanceRoutes)
  .use(paymentRoutes)
  .use(trainerRoutes)
  .use(trainerClientRoutes)
  .use(reportRoutes)
  .use(settingsRoutes)
  .use(userRoutes)
  .onError(({ code, error, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
      return { error: "Not Found" };
    }
    if (code === "VALIDATION") {
      set.status = 400;
      return { error: "Validation Error", details: error.message };
    }
    console.error("Server error:", error);
    set.status = 500;
    return { error: "Internal Server Error" };
  });

app.listen(env.PORT);

startScheduler();

process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  stopScheduler();
  await closeDatabase();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  stopScheduler();
  await closeDatabase();
  process.exit(0);
});

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
console.log(`📚 API Documentation: http://localhost:${env.PORT}/docs`);
