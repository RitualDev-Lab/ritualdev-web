import DonatePage from "../donate/page";
import { buildRouteMetadata } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "Sponsor RitualDev Lab | Dodo Payments & Open Source Grants",
  description:
    "Support zero-paywall developer tools, local-first OS engineering, and AI security. Instant Dodo Payments checkout, UPI, cards, and tax invoices.",
  path: "/sponsor/",
  noIndex: true,
  follow: true,
  canonicalOverride: "https://ritualdev.in/donate/",
});

export default DonatePage;
