import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "MockForge AI — In-Browser Relational Test DB & DAG Synthesizer | RitualDev",
  description: "Generate realistic foreign-key consistent SQLite and DuckDB test datasets 100% locally in your browser.",
  path: "/mockforge/",
});

export default PassthroughLayout;
