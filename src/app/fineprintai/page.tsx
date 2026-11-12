import FinePrintPage from "../fineprint/page";
import { buildRouteMetadata } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "FinePrint AI — Local Contract & NDA Redline Scanner | RitualDev",
  description:
    "100% client-side in-browser legal contract, lease, and NDA scanner with zero server uploads.",
  path: "/fineprintai/",
  noIndex: true,
  follow: true,
  canonicalOverride: "https://ritualdev.in/fineprint/",
});

export default FinePrintPage;
