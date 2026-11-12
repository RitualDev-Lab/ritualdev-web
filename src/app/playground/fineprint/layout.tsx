import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "FinePrint AI Live Contract Scanner Playground — RitualDev",
  description: "Interactive in-browser legal clause analyzer for contracts, NDAs, and leases.",
  path: "/playground/fineprint/",
});

export default PassthroughLayout;
