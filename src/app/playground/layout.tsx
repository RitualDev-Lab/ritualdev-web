import { buildRouteMetadata, PassthroughLayout } from "@/lib/route-metadata";

export const metadata = buildRouteMetadata({
  title: "Adversarial AI Security Playground Simulator — RitualDev",
  description: "Test live prompt injection, /proc/self/environ attacks, and <1ms secret redaction directly inside your browser.",
  path: "/playground/",
});

export default PassthroughLayout;
