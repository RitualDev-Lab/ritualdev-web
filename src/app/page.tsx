import HomePageClient from "@/components/HomePageClient";
import { buildRouteMetadata } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "RitualDev — Autonomous AI Agent Defense, Sandboxing & Zero-Leak Studio",
  description:
    "Enterprise runtime secret defense, kernel sandboxing (Bubblewrap, Landlock, Seatbelt, AppContainer), database wire proxy, 96.7% token compaction, and 575+ verified developer tools.",
  path: "/",
});

export default function HomePage() {
  return <HomePageClient />;
}
