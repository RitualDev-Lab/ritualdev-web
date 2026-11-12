import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "Security Audit Order Confirmed — RitualDev",
  description: "Your RitualDev Security Audit order has been submitted.",
  path: "/audit/success/",
  noIndex: true,
  follow: true,
  canonicalOverride: "https://ritualdev.in/audit/",
});

export default PassthroughLayout;
