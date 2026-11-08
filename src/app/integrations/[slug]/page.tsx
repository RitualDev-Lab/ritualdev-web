import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Shield, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  Code2, 
  ExternalLink, 
  ArrowLeft, 
  Layers, 
  Lock, 
  Sparkles, 
  Zap,
  ArrowRight
} from "lucide-react";
import integrations from "@/data/integrations.json";

export async function generateStaticParams() {
  return integrations.map((item) => ({
    slug: item.slug
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = integrations.find((i) => i.slug === slug);

  if (!item) {
    return {
      title: "Integration Not Found | RitualDev",
      description: "The requested agent integration could not be found."
    };
  }

  const title = `${item.name} Security & Guardrail Integration | RitualDev`;
  const description = `${item.tagline} Protect against prompt injection, credential exfiltration, and unauthorized bash commands with RitualDev defense runtimes.`;
  const canonicalUrl = `https://ritualdev.in/integrations/${slug}/`;

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
      siteName: "RitualDev Studio",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    }
  };
}

export default async function IntegrationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = integrations.find((i) => i.slug === slug);

  if (!item) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `${item.name} Integration for RitualDev`,
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Linux, macOS, Windows",
    "description": item.tagline,
    "url": `https://ritualdev.in/integrations/${item.slug}/`,
    "author": {
      "@type": "Organization",
      "name": "RitualDev Studio",
      "url": "https://ritualdev.in"
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* JSON-LD Rich Snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link href="/" className="hover:text-brand-neon">Home</Link>
        <span>/</span>
        <Link href="/integrations" className="hover:text-brand-neon">Integrations</Link>
        <span>/</span>
        <span className="text-brand-neon">{item.name}</span>
      </div>

      {/* Hero Header */}
      <div className="border-b border-slate-800 pb-12 space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
            {item.category}
          </span>
          <span className="text-xs font-mono text-brand-neon font-bold">
            Provider: {item.vendor}
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {item.name} Defense &amp; Guardrails
          </h1>
          <p className="text-slate-400 font-mono text-base sm:text-lg mt-2 max-w-4xl leading-relaxed">
            {item.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href={item.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-neon text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(0,245,155,0.3)] hover:brightness-110 transition"
          >
            <span>View Starter Repo &amp; Code</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <Link
            href="/integrations"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-mono text-sm transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Integrations</span>
          </Link>
        </div>
      </div>

      {/* Comparison / Threat Mitigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Threats */}
        <div className="p-8 rounded-3xl bg-red-950/20 border border-red-900/40 space-y-4">
          <h2 className="text-xl font-bold text-red-300 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span>Vulnerability &amp; Operational Risks</span>
          </h2>
          <p className="text-xs text-slate-400">
            Unshielded {item.name} agents operate with full user agency, exposing enterprise environments to:
          </p>
          <ul className="space-y-3 pt-2">
            {item.threats.map((threat, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs text-slate-200">
                <span className="p-1 rounded bg-red-500/20 text-red-400 shrink-0 font-mono text-[10px] font-bold">
                  FAIL
                </span>
                <span className="leading-relaxed">{threat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions */}
        <div className="p-8 rounded-3xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
          <h2 className="text-xl font-bold text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-brand-neon" />
            <span>RitualDev Defense Architecture</span>
          </h2>
          <p className="text-xs text-slate-400">
            Enforcing zero-trust runtime sandboxes and wire proxies neutralizes these vectors without slowing down development:
          </p>
          <ul className="space-y-3 pt-2">
            {item.solutions.map((sol, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs text-slate-200">
                <span className="p-1 rounded bg-emerald-500/20 text-brand-neon shrink-0 font-mono text-[10px] font-bold">
                  PASS
                </span>
                <span className="leading-relaxed">{sol}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Implementation Code Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-brand-neon" />
            <span>1-Click Configuration &amp; Setup</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Install the defense package and copy the reference configuration into your project root.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-xs font-mono text-slate-400 block mb-1">1. Terminal Installation</span>
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 font-mono text-xs text-brand-neon">
              <code>{item.quickstart.install}</code>
            </div>
          </div>

          <div>
            <span className="text-xs font-mono text-slate-400 block mb-1">2. Runtime Integration Code</span>
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre className="text-slate-200">{item.quickstart.config}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Deploy Production AI Agent Defense
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          Start with the free open-source CLI starter kit, or explore air-gapped private VPC Helm deployments for enterprise teams.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={item.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-brand-neon text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(0,245,155,0.3)] hover:brightness-110 transition"
          >
            Clone {item.name} Starter Template
          </a>
          <Link
            href="/enterprise"
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition"
          >
            Contact Enterprise VPC Architects
          </Link>
        </div>
      </div>

    </div>
  );
}
