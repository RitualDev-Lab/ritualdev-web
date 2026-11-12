import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "DBShield — Database Wire Proxy & AI SQL Guardrails | RitualDev",
  description: "Air-gapped PostgreSQL, MySQL, and SQLite wire proxy trapping destructive agent SQL mutations with two-man Slack & Teams approvals.",
  path: "/dbshield/",
});

export default PassthroughLayout;
