import { pingDatabase, db } from "../db";
import { subscriptions, notifications } from "../db/schema";
import { eq, and, gte, lte } from "drizzle-orm";

const SUPABASE_PAUSE_THRESHOLD_DAYS = 7;
const SAFETY_MARGIN_DAYS = 2;
const DEFAULT_KEEP_ALIVE_DAYS = SUPABASE_PAUSE_THRESHOLD_DAYS - SAFETY_MARGIN_DAYS;

const KEEP_ALIVE_INTERVAL_MINUTES = parseInt(
  process.env.KEEP_ALIVE_INTERVAL_MINUTES ?? String(DEFAULT_KEEP_ALIVE_DAYS * 24 * 60),
  10
);
const EXPIRY_CHECK_INTERVAL_MINUTES = parseInt(
  process.env.EXPIRY_CHECK_INTERVAL_MINUTES ?? "60",
  10
);

const KEEP_ALIVE_INTERVAL = KEEP_ALIVE_INTERVAL_MINUTES * 60 * 1000;
const EXPIRY_CHECK_INTERVAL = EXPIRY_CHECK_INTERVAL_MINUTES * 60 * 1000;

let keepAliveTimer: Timer | null = null;
let expiryCheckTimer: Timer | null = null;

export function startScheduler(): void {
  const keepAliveDays = KEEP_ALIVE_INTERVAL_MINUTES / 60 / 24;
  
  console.log(`⏰ Starting scheduler...`);
  console.log(`   Supabase pause threshold: ${SUPABASE_PAUSE_THRESHOLD_DAYS} days`);
  console.log(`   Keep-alive interval: ${keepAliveDays.toFixed(1)} days (${KEEP_ALIVE_INTERVAL_MINUTES} minutes)`);
  console.log(`   Safety margin: ${SAFETY_MARGIN_DAYS} days before pause`);
  console.log(`   Expiry check interval: ${EXPIRY_CHECK_INTERVAL_MINUTES} minutes`);

  keepAliveTimer = setInterval(async () => {
    const alive = await pingDatabase();
    if (alive) {
      console.log("📡 Database keep-alive ping successful");
    } else {
      console.error("📡 Database keep-alive ping failed");
    }
  }, KEEP_ALIVE_INTERVAL);

  expiryCheckTimer = setInterval(async () => {
    await checkExpiringSubscriptions();
  }, EXPIRY_CHECK_INTERVAL);

  pingDatabase().then((alive) => {
    console.log(`📡 Initial database connection: ${alive ? "OK" : "FAILED"}`);
  });
}

export function stopScheduler(): void {
  if (keepAliveTimer) {
    clearInterval(keepAliveTimer);
    keepAliveTimer = null;
  }
  if (expiryCheckTimer) {
    clearInterval(expiryCheckTimer);
    expiryCheckTimer = null;
  }
  console.log("⏰ Scheduler stopped");
}

async function checkExpiringSubscriptions(): Promise<void> {
  try {
    const today = new Date();
    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);

    const todayStr = today.toISOString().split("T")[0];
    const futureStr = threeDaysFromNow.toISOString().split("T")[0];

    const expiring = await db
      .select()
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.status, "active"),
          gte(subscriptions.endDate, todayStr),
          lte(subscriptions.endDate, futureStr)
        )
      );

    console.log(`📋 Found ${expiring.length} expiring subscriptions`);

    for (const sub of expiring) {
      const existing = await db.query.notifications.findFirst({
        where: and(
          eq(notifications.memberId, sub.memberId),
          eq(notifications.type, "expiry_alert"),
          gte(notifications.sentAt, today)
        ),
      });

      if (!existing) {
        await db.insert(notifications).values({
          gymId: sub.gymId,
          memberId: sub.memberId,
          type: "expiry_alert",
          message: `Your subscription expires on ${sub.endDate}`,
          isRead: false,
        });
        console.log(`🔔 Created expiry notification for member ${sub.memberId}`);
      }
    }
  } catch (error) {
    console.error("Error checking expiring subscriptions:", error);
  }
}

export { checkExpiringSubscriptions };
