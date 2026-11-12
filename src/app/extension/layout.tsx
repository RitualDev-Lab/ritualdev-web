import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "Ritual Agent Defense IDE Extension (VS Code, Cursor, Windsurf) | RitualDev",
  description: "Install the AgentShield IDE sidebar from VS Code Marketplace or Open VSX for live sandbox status and approval controls.",
  path: "/extension/",
});

export default PassthroughLayout;
