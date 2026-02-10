import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({
  name: "Base MCP",
  version: "1.0.0",
});

server.registerTool(
  "health",
  {
    description: "Returns API health status",
    inputSchema: { type: "object", properties: {} },
  },
  async () => ({
    content: [{ type: "text", text: "ok" }],
  })
);

export const mcpServer = server;