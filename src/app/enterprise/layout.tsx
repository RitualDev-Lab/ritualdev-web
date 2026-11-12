import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "Enterprise Private VPC & Governance Suite — RitualDev",
  description: "Air-gapped AWS VPC Terraform & Helm deployments, SAML/OIDC SSO, Splunk/Datadog CEF streaming, and SOC 2 compliance packs.",
  path: "/enterprise/",
});

export default PassthroughLayout;
