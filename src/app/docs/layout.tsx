import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "Documentation & Quickstarts — AgentShield, DBShield & SkillPrism | RitualDev",
  description: "Step-by-step setup guides for Claude Code PreToolUse hooks, Cursor/Windsurf rules, CI/CD PR gates, and kernel sandboxing.",
  path: "/docs/",
});

export default PassthroughLayout;
