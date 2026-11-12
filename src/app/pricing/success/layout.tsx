import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "Order Activation & Delivery Portal — RitualDev",
  description: "Access your RitualDev checkout confirmation, CLI setup instructions, and repository invite details.",
  path: "/pricing/success/",
  noIndex: true,
  follow: true,
  canonicalOverride: "https://ritualdev.in/pricing/",
});

export default PassthroughLayout;
