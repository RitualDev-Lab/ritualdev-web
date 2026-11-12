import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "MCPBuilderKit — Turnkey OpenAPI to MCP Server Scaffolder & Delivery | RitualDev",
  description: "Convert OpenAPI specifications into typed Model Context Protocol (MCP) servers with optional Dodo/Stripe paywalls.",
  path: "/mcp-builder/",
});

export default PassthroughLayout;
