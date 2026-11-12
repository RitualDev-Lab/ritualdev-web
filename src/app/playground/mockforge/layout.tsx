import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "MockForge AI Interactive Schema & SQL Playground — RitualDev",
  description: "Run live schema-guided synthetic relational dataset generation right inside your browser.",
  path: "/playground/mockforge/",
});

export default PassthroughLayout;
