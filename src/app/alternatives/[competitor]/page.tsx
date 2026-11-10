import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Sparkles, 
  ArrowLeft, 
  Check, 
  X, 
  ExternalLink, 
  Terminal, 
  Server, 
  Layers, 
  ShieldAlert, 
  HelpCircle,
  Star,
  ShieldCheck,
  CheckCircle2,
  Code2
} from "lucide-react";
import rawData from "@/data/devshelf.json";
import competitors from "@/data/competitors.json";
import { findPartnerForTool, getCloudHostingPartners } from "@/lib/affiliates";

interface Competitor {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  monthlySearches: string;
  painPoints: string[];
  matrixCriteria: {
    feature: string;
    competitor: string;
    openSource: string;
  }[];
  recommendedSlugs: string[];
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function generateStaticParams() {
  return competitors.map((c) => ({
    competitor: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>;
}): Promise<Metadata> {
  const { competitor } = await params;
  const comp = competitors.find((c) => c.slug === competitor);

  if (!comp) {
    return {
      title: "Comparison Not Found | DevShelf",
      description: "The requested software comparison could not be found.",
    };
  }

  const title = `Best Open Source ${comp.name} Alternatives in 2026 (Free & Self-Hosted) | DevShelf`;
  const description = `Discover verified open-source, self-hostable alternatives to ${comp.name}. Compare features, Docker Compose configurations, licenses, and privacy trade-offs with our comparison matrix.`;
  const canonicalUrl = `https://ritualdev.in/alternatives/${competitor}/`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "RitualDev DevShelf",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CompetitorComparisonPage({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  const { competitor } = await params;
  const comp = competitors.find((c) => c.slug === competitor);

  if (!comp) {
    notFound();
  }

  const allTools = (rawData.resources as Array<{
    name: string;
    repo?: string;
    category?: string;
    description?: string;
    language?: string;
    license?: string;
    featured?: boolean;
    statusTags?: string[];
    alternativeTo?: string;
    dockerCompose?: string;
    url?: string;
    freeTier?: string;
  }>) || [];

  // Find matching alternative tools in DevShelf
  const matchedTools = allTools.filter((t) => {
    const slug = toSlug(t.name);
    // Check if explicitly recommended or if alternativeTo mentions competitor
    const isRecommended = comp.recommendedSlugs.includes(slug);
    const mentionsComp = t.alternativeTo?.toLowerCase().includes(comp.name.toLowerCase());
    return isRecommended || mentionsComp;
  });

  const pageUrl = `https://ritualdev.in/alternatives/${comp.slug}/`;

  // Schema.org BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ritualdev.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Alternatives",
        item: "https://ritualdev.in/alternatives/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${comp.name} Alternatives`,
        item: pageUrl,
      },
    ],
  };

  // Schema.org FAQPage JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Why are developers looking for open-source ${comp.name} alternatives?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Developers are switching away from ${comp.name} due to ${comp.painPoints.join(" ")} Open-source alternatives provide self-hostable control with zero vendor lock-in.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I self-host an alternative to ${comp.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, tools such as ${comp.recommendedSlugs.join(", ")} offer official Docker Compose specifications and native binaries that can be deployed on any VPS, cloud server, or air-gapped internal network.`,
        },
      },
      {
        "@type": "Question",
        name: `Are these ${comp.name} replacements free for enterprise use?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The featured alternatives are licensed under permissive open-source licenses (such as MIT and Apache 2.0) with zero per-user seat fees or telemetry restrictions.`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/alternatives/" className="hover:text-purple-400 transition-colors">Alternatives</Link>
          <span>/</span>
          <span className="text-purple-300 font-bold">{comp.name}</span>
        </div>

        <Link
          href="/alternatives/"
          className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Alternatives</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/40">
            {comp.category}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
            {comp.monthlySearches} Monthly Developer Searches
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Verified Open-Source
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Best Open-Source <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
            {comp.name} Alternatives
          </span>{" "}
          in 2026
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          {comp.tagline} Compare verified, self-hostable open-source alternatives that protect your privacy, eliminate vendor lock-in, and give you complete data sovereignty.
        </p>
      </div>

      {/* Pain Points / Migration Reasons */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider font-bold">
          <ShieldAlert className="w-4 h-4" />
          <span>Why Developers Are Leaving {comp.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {comp.painPoints.map((pain, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-slate-300 flex items-start gap-2.5"
            >
              <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{pain}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison Matrix Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-purple-400" />
              <span>Feature Comparison Matrix: {comp.name} vs. Open Source</span>
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Side-by-side trade-off analysis across licensing, telemetry, self-hosting, and pricing.
            </p>
          </div>
        </div>

        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80">
                  <th className="py-4 px-6 text-slate-300 font-bold uppercase tracking-wider">Feature / Capability</th>
                  <th className="py-4 px-6 text-rose-400 font-bold uppercase tracking-wider">{comp.name} (Proprietary)</th>
                  <th className="py-4 px-6 text-emerald-400 font-bold uppercase tracking-wider">Open-Source Equivalents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {comp.matrixCriteria.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-200">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-6 text-slate-400 flex items-center gap-2">
                      <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{row.competitor}</span>
                    </td>
                    <td className="py-3.5 px-6 text-emerald-300 font-semibold">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{row.openSource}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Featured Open-Source Replacement Cards */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-neon" />
            <span>Top Open-Source Replacements for {comp.name}</span>
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Verified developer tools from DevShelf with one-click install commands and Docker setups.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {matchedTools.map((tool) => {
            const slug = toSlug(tool.name);
            const repoClean = tool.repo ? (tool.repo.startsWith("http") ? tool.repo : `https://github.com/${tool.repo}`) : null;
            const partnerOffer = findPartnerForTool(tool);

            return (
              <div
                key={slug}
                className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="text-2xl font-bold text-white">
                        {tool.name}
                      </h3>
                      {tool.featured && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/40 text-[10px] font-mono flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>Featured</span>
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/40 text-[10px] font-mono">
                        {tool.category || comp.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800 text-[10px] font-mono">
                        License: {tool.license || "Open Source"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                      {tool.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {partnerOffer && (
                      <Link
                        href={`/go/${partnerOffer.slug}/`}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors"
                      >
                        <span>{partnerOffer.ctaText || `Claim ${partnerOffer.toolName} Offer`}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                    <Link
                      href={`/devshelf/${slug}/`}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-mono transition-colors"
                    >
                      <span>Full DevShelf Specs</span>
                    </Link>
                    {repoClean && (
                      <Link
                        href={repoClean}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Docker Compose or Quick Install Snippet */}
                {tool.dockerCompose ? (
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-brand-cyan" />
                      <span>Self-Hostable Docker Compose Spec</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-black/80 border border-slate-800 overflow-x-auto">
                      <pre className="text-emerald-400 font-mono text-xs leading-relaxed">
                        {tool.dockerCompose}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-black/70 border border-slate-800 font-mono text-xs text-slate-200 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-brand-neon shrink-0" />
                    <span className="text-brand-neon">$</span>
                    <span>npx {slug}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Self-Host Cloud Infrastructure Bounties */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 bg-emerald-950/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
              Developer Infrastructure Partners
            </div>
            <h2 className="text-xl font-bold text-white">
              Deploy Self-Hosted {comp.name} Alternatives With Free Cloud Credits
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Supports zero-paywall open-source tooling
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {getCloudHostingPartners().map((partner) => (
            <Link
              key={partner.slug}
              href={`/go/${partner.slug}/`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 flex flex-col justify-between gap-3 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                    {partner.toolName}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shrink-0">
                    {partner.badge || "Free Credit"}
                  </span>
                </div>
                <p className="text-xs font-mono text-emerald-400 font-bold mb-1">
                  {partner.perkTitle}
                </p>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {partner.perkDescription}
                </p>
              </div>
              <span className="text-xs font-mono text-white font-bold flex items-center gap-1">
                <span>{partner.ctaText || "Claim Credits"}</span>
                <ExternalLink className="w-3 h-3 text-emerald-400" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-purple-400" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="space-y-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <h3 className="font-bold text-white">Why are developers leaving {comp.name}?</h3>
            <p className="text-slate-400 leading-relaxed">
              Teams are switching to open-source alternatives because of {comp.painPoints.join(" ")} Open-source tools eliminate corporate telemetry and maintain full functionality offline.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <h3 className="font-bold text-white">Can I self-host these {comp.name} alternatives?</h3>
            <p className="text-slate-400 leading-relaxed">
              Yes, all recommended open-source equivalents support self-hosting on your own VPS or Kubernetes cluster via Docker Compose, Helm charts, or standalone binaries.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <h3 className="font-bold text-white">Are there user-seat limits or surprise bills?</h3>
            <p className="text-slate-400 leading-relaxed">
              No. Permissive open-source licenses (MIT, Apache 2.0, AGPL) have zero per-user seat pricing, allowing your entire engineering organization to collaborate with zero SaaS licensing fees.
            </p>
          </div>
        </div>
      </div>

      {/* Directory Back CTA */}
      <div className="pt-6 text-center border-t border-slate-800">
        <Link
          href="/alternatives/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-xs font-mono font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-purple-400" />
          <span>Browse All Alternative Comparison Hubs</span>
        </Link>
      </div>
    </div>
  );
}
