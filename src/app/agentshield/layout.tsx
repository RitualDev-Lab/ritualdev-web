import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "AgentShield — Zero-Leak Secret Defense & OS Kernel Sandbox | RitualDev",
  description: "Zero-leak secret defense and OS kernel sandboxing (Bubblewrap, Landlock, Seatbelt, AppContainer) for Claude Code, Cursor, and Windsurf.",
  path: "/agentshield/",
});

export default PassthroughLayout;
