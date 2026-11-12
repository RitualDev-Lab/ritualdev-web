import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "PromptShield In-Browser DLP Firewall Simulator — RitualDev",
  description: "Test real-time PII and credential redaction against raw developer prompts with zero backend calls.",
  path: "/playground/promptshield/",
});

export default PassthroughLayout;
