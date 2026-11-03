import { Metadata } from "next";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Server, 
  Terminal, 
  Lock, 
  ExternalLink,
  Layers,
  Search
} from "lucide-react";
import competitors from "@/data/competitors.json";

export const metadata: Metadata = {
  title: "Open-Source Alternatives to Proprietary Developer Tools | DevShelf",
  description: "Browse verified open-source, self-hostable alternatives to Postman, Datadog, ngrok, Docker Desktop, GitHub Copilot, Firebase, and Auth0. Zero vendor lock-in, zero telemetry.",
  alternates: {
    canonical: "https://ritualdev.in/alternatives/",
  },
  openGraph: {
    title: "Open-Source Alternatives to Proprietary Developer Tools | DevShelf",
    description: "Verified self-hostable alternatives to Postman, Datadog, ngrok, Docker Desktop, and more.",
    url: "https://ritualdev.in/alternatives/",
    siteName: "RitualDev DevShelf",
    type: "website",
  },
};

export default function AlternativesIndexPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why switch to open-source developer tool alternatives?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Open-source developer alternatives allow teams to avoid unpredictable SaaS price hikes, eliminate telemetry leaks, retain full data sovereignty inside their own VPC, and self-host via Docker without user-seat limits.",
        },
      },
      {
        "@type": "Question",
        name: "What are the most popular open-source developer alternatives in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Top open-source replacements include Hoppscotch and Bruno for Postman, SigNoz and GlitchTip for Datadog, Bore and Cloudflare Tunnels for ngrok, Podman for Docker Desktop, and Ollama and vLLM for GitHub Copilot.",
        },
      },
      {
        "@type": "Question",
        name: "Are the open-source alternatives on DevShelf verified?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, every tool on DevShelf is manually audited for active maintenance, permissive licensing (MIT, Apache 2.0, AGPL), Docker compose reproducibility, and zero mandatory cloud accounts.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Zero-Paywall Software Directory</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Open-Source Alternatives to <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
            Proprietary SaaS
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Say goodbye to cloud lock-in, mandatory accounts, per-seat price hikes, and corporate telemetry. Discover battle-tested, self-hostable open-source software with full feature comparison matrices.
        </p>

        {/* Value Proposition Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            <Lock className="w-3.5 h-3.5 text-brand-neon" />
            <span>Zero Telemetry / Air-Gapped</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            <Server className="w-3.5 h-3.5 text-brand-cyan" />
            <span>1-Click Docker Self-Hosting</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>Permissive Open Licenses</span>
          </span>
        </div>
      </div>

      {/* Grid of Competitors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {competitors.map((comp) => (
          <Link
            key={comp.slug}
            href={`/alternatives/${comp.slug}/`}
            className="glass-panel glass-panel-hover rounded-3xl p-6 border border-slate-800 flex flex-col justify-between group transition-all"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  {comp.category}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {comp.monthlySearches} queries/mo
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                {comp.name} Alternatives
              </h2>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {comp.tagline}
              </p>

              {/* Top Open-Source Replacements */}
              <div className="space-y-1.5 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Top Open-Source Replacements:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {comp.recommendedSlugs.map((slug) => (
                    <span
                      key={slug}
                      className="text-xs font-mono px-2 py-0.5 rounded-lg bg-slate-900 text-brand-cyan border border-slate-800 capitalize"
                    >
                      {slug}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer CTA */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-purple-400 group-hover:text-purple-300">
              <span>View Comparison Matrix</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      {/* Direct Search DevShelf CTA */}
      <div className="glass-panel rounded-3xl p-8 border border-slate-800 text-center max-w-2xl mx-auto space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto">
          <Layers className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white">
          Looking for a specific open-source tool?
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          DevShelf indexes 565+ verified developer tools, CLI utilities, and MCP servers with instant search, Docker Compose recipes, and license filters.
        </p>
        <Link
          href="/devshelf/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-mono transition-colors shadow-[0_0_20px_rgba(168,85,247,0.3)]"
        >
          <Search className="w-4 h-4" />
          <span>Search DevShelf Directory (565+ Tools)</span>
        </Link>
      </div>
    </div>
  );
}
