import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "Sponsor & Support Open-Source Security — RitualDev",
  description: "Support independent open-source AI agent security tooling via Dodo Payments (cards, Apple Pay, and UPI).",
  path: "/donate/",
});

export default PassthroughLayout;
