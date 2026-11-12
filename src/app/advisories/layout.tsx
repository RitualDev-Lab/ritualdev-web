import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "Security Advisories & CVEs — AgentShield | RitualDev",
  description: "Published GitHub Security Advisories (GHSA), CVE disclosures, severity ratings, and verified mitigations for RitualDev runtimes.",
  path: "/advisories/",
});

export default PassthroughLayout;
