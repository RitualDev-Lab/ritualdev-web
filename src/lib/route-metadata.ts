import type { Metadata } from "next";
import type { ReactNode } from "react";

export interface RouteMetadataOptions {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  follow?: boolean;
  canonicalOverride?: string;
}

/**
 * Builds consistent per-route Metadata with an explicit canonical URL so pages
 * never inherit the root canonical or fall into duplicate-canonical exclusions.
 */
export function buildRouteMetadata({
  title,
  description,
  path,
  noIndex = false,
  follow = !noIndex,
  canonicalOverride,
}: RouteMetadataOptions): Metadata {
  const normalized = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
  const canonical = canonicalOverride ?? `https://ritualdev.in${normalized}`;
  return {
    title,
    description,
    alternates: { canonical },
    ...(noIndex ? { robots: { index: false, follow } } : {}),
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "RitualDev",
      type: "website",
    },
  };
}

export function PassthroughLayout({ children }: { children: ReactNode }) {
  return children;
}
