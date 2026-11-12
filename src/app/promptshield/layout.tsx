import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "PromptShield — In-Browser AI Data Loss Prevention Extension | RitualDev",
  description: "Manifest V3 browser extension preventing API keys, secrets, and customer PII from leaking into ChatGPT, Claude, and Gemini.",
  path: "/promptshield/",
});

export default PassthroughLayout;
