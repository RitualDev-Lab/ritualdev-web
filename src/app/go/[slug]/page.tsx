import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActivePartners, getPartnerBySlug } from "@/lib/affiliates";
import RedirectNotice from "./RedirectNotice";

export async function generateStaticParams() {
  return getActivePartners().map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);

  if (!partner) {
    return {
      title: "Partner Offer Not Found | DevShelf",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `Connecting to ${partner.toolName} (${partner.perkTitle}) | DevShelf`,
    description: partner.perkDescription,
    robots: { index: false, follow: true },
    alternates: {
      canonical: partner.url,
    },
  };
}

export default async function GoRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);

  if (!partner) {
    notFound();
  }

  return (
    <RedirectNotice
      toolName={partner.toolName}
      url={partner.url}
      perkTitle={partner.perkTitle}
      perkDescription={partner.perkDescription}
      ctaText={partner.ctaText}
      badge={partner.badge}
    />
  );
}
