import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "MCP Starter Kit Download Portal — RitualDev",
  description: "Download and activate your MCP Monetization Starter Kit license.",
  path: "/mcp-starter-kit/download/",
  noIndex: true,
  follow: true,
  canonicalOverride: "https://ritualdev.in/mcp-starter-kit/",
});

export default PassthroughLayout;
