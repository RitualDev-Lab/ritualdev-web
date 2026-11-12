import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "WebSecAuditor — Static AST Taint Analysis & GitHub PR Gate | RitualDev",
  description: "Automated static AST taint scanner and pull-request remediation bot catching security flaws before merge.",
  path: "/web-sec-auditor/",
});

export default PassthroughLayout;
