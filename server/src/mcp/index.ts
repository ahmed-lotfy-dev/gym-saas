import { mcp } from "elysia-mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const mcpPlugin = mcp({
  serverInfo: {
    name: "Base MCP",
    version: "1.0.0",
  },
  capabilities: {
    tools: {},
    resources: {},
    prompts: {},
    logging: {},
  },
  setupServer: async (server: McpServer) => {
    server.registerTool(
      "health",
      {
        description: "Returns API health status",
        inputSchema: z.object({}),
      },
      async () => ({
        content: [{ type: "text", text: "ok" }],
      })
    );
  },
});
