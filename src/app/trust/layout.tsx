import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "Trust Center, SIG Lite & SOC 2 Compliance Portal — RitualDev",
  description: "Review SIG Lite vendor risk answers, SOC 2 / ISO 27001 controls, India DPDP Act 2023 notices, and SLSA provenance.",
  path: "/trust/",
});

export default PassthroughLayout;
