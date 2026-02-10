import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { auth } from "./auth";
import { mcpServer } from "./mcp";
import { env } from "./lib/env";

const app = new Elysia()
  .use(openapi({ path: "/docs", documentation: { info: { title: "API", version: "1.0.0" } } }))
  .use(cors({ origin: true, credentials: true }))
  .mount(auth.handler)
  .get("/health", () => ({ status: "ok" }))
  .get("/", () => "Elysia backend running")
  .use(mcpServer);

app.listen(env.PORT);