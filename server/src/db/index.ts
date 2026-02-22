import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000,
});

pool.on("error", (err) => {
  console.error("Unexpected database pool error:", err);
});

export const db = drizzle(pool, { schema });

export async function pingDatabase(): Promise<boolean> {
  try {
    const result = await pool.query("SELECT 1");
    return result.rows.length > 0;
  } catch (error) {
    console.error("Database ping failed:", error);
    return false;
  }
}

export async function closeDatabase(): Promise<void> {
  await pool.end();
}
