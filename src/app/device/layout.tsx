import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "CLI & IDE Device Authorization — RitualDev",
  description: "Authorize your developer CLI or IDE session via RFC 8628 device flow.",
  path: "/device/",
  noIndex: true,
  follow: false,
});

export default PassthroughLayout;
