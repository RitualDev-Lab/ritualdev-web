import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowRight, Server, FileCheck, Lock } from "lucide-react";
import AgentShieldComparison from "@/components/AgentShieldComparison";

export const metadata: Metadata = {
  title: "AgentShield vs. Cloud Sandboxes (E2B / Modal), Docker & AI Firewalls | RitualDev",
  description:
    "Side-by-side comparison of RitualDev AgentShield local OS kernel sandboxing against cloud ephemeral sandboxes, Docker containers, and SaaS AI firewall APIs.",
  alternates: {
    canonical: "https://ritualdev.in/compare/",
  },
  openGraph: {
    title: "AgentShield Architecture Comparison & CISO Objections Guide",
    description:
      "Compare local zero-egress kernel defense (Landlock, Bubblewrap, Seatbelt) vs. cloud sandboxes, Docker, and SaaS guardrails.",
    url: "https://ritualdev.in/compare/",
    siteName: "RitualDev",
    type: "website",
  },
};

export default function ComparePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does AgentShield compare to Docker containers for running AI coding agents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Docker containers isolate processes at the container namespace layer, but typically mount workspace files and host environment secrets without SQL wire inspection or secret masking. AgentShield adds OS-level kernel containment via Landlock/Bubblewrap/Seatbelt without daemon overhead, strips credentials before LLM prompts or stderr leaks, and guards database writes through DBShield.",
        },
      },
      {
        "@type": "Question",
        name: "How does AgentShield differ from cloud sandboxes like E2B or Modal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cloud sandboxes send source code and tasks to remote microVMs billed per compute minute, changing the developer workflow. AgentShield protects Claude Code, Cursor, Windsurf, and CI runners directly inside the developer workstation or private air-gapped runner with sub-millisecond redaction latency and zero external egress.",
        },
      },
      {
        "@type": "Question",
        name: "When should an engineering team upgrade from AgentShield OSS ($0) to paid plans?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The local CLI runtime is open-source and free forever. Teams upgrade to Team CI/CD Gate ($19/seat/mo), Hosted Relay ($29/mo), or Enterprise Fleet ($49/seat/mo) when they need centralized organization policy URLs, PR SARIF blocking, Slack or MS Teams human approval relays, Splunk/Datadog CEF streaming, SAML SSO, and SOC 2 evidence kits.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb & Hero */}
      <section className="space-y-6 text-center max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-brand-neon transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/agentshield/" className="hover:text-brand-neon transition-colors">
            AgentShield
          </Link>
          <span>/</span>
          <span className="text-slate-200">Compare</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-neon text-xs font-mono">
          <Shield className="w-3.5 h-3.5" />
          <span>COMPETITIVE &amp; ARCHITECTURAL BENCHMARK</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Why Teams Choose Local{" "}
          <span className="gradient-text-neon">Kernel Defense</span> Over Cloud Proxies
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          Evaluate how RitualDev AgentShield stacks up against cloud microVM sandboxes (E2B / Modal), vanilla Docker containers, and outbound AI guardrail APIs across latency, air-gapped sovereignty, database safety, and total cost.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/pricing/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-green to-emerald-500 text-slate-950 font-bold text-sm hover:opacity-95 transition-opacity flex items-center gap-2 shadow-[0_0_20px_rgba(61,220,132,0.25)]"
          >
            <span>Compare Plans &amp; Pricing ($0 – $49/seat)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/trust/"
            className="px-5 py-3 rounded-xl glass-panel border border-slate-700 text-slate-200 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
          >
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>Trust &amp; SOC 2 Evidence</span>
          </Link>
          <Link
            href="/enterprise/"
            className="px-5 py-3 rounded-xl glass-panel border border-slate-700 text-slate-200 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Server className="w-4 h-4 text-brand-cyan" />
            <span>Private VPC Topology</span>
          </Link>
        </div>
      </section>

      {/* Main Comparison Matrix + Objections */}
      <section id="objections">
        <AgentShieldComparison />
      </section>

      {/* Decision Playbook */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-emerald-500/30 space-y-3">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
            Choose AgentShield When
          </div>
          <h2 className="text-lg font-bold text-white">Agents Run Near Real Code &amp; Secrets</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Your engineers use Claude Code, Cursor, Windsurf, or CI runners locally or in a private VPC and cannot afford source code egress, slow remote VMs, or unguarded database/credential exposure.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
          <div className="text-xs font-mono text-amber-300 uppercase tracking-wider">
            Choose Cloud MicroVMs When
          </div>
          <h2 className="text-lg font-bold text-white">Untrusted Multi-Tenant Code Exec</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Your SaaS product runs arbitrary end-user generated scripts inside hosted browser playgrounds where complete hardware virtualization separation per anonymous tenant is required.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 space-y-3">
          <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider">
            Need Self-Hosted Alternatives?
          </div>
          <h2 className="text-lg font-bold text-white">DevShelf OSS Software Matrix</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Looking to replace proprietary SaaS dev tools like Postman, Datadog, or ngrok with self-hosted open source? Explore our verified alternatives catalog.
          </p>
          <Link
            href="/alternatives/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-cyan hover:text-white transition-colors pt-1"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Open DevShelf Alternatives &rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
