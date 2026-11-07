"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Shield,
  Database,
  Zap,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Server,
  Layers,
  Award,
  Search,
  Code2,
  Terminal,
} from "lucide-react";

export default function PartnersPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "databases" | "ai" | "devops">("all");

  const partnerTiers = [
    {
      name: "Category Spotlight Sponsor",
      price: "$499",
      period: "per month",
      desc: "For developer tools and infrastructure vendors seeking high-intent discovery across DevShelf directory and agent prompts.",
      badge: "Fast Track",
      color: "border-sky-500/30 text-sky-400",
      features: [
        "Verified Partner Badge across DevShelf web & CLI catalog",
        "Top-3 category placement in your domain (DevOps or Testing)",
        "Automated Zero-Paywall Audit & compliance certificate",
        "Programmatic indexing in /api/v1/registry/tools.json",
        "Monthly impression analytics & referral reporting",
        "Direct link to documentation and MCP server package",
      ],
      ctaText: "Apply for Spotlight ($499/mo)",
      ctaHref: "https://checkout.dodopayments.com/buy/pdt_0NpjONEJnu5OcWhncWF68?tier=partner_spotlight",
      popular: false,
    },
    {
      name: "Exclusive Category Leader",
      price: "$999",
      period: "per month",
      desc: "Dominant category placement for managed databases and AI infrastructure providers wanting primary agent recommendation.",
      badge: "Most Popular",
      color: "border-emerald-500/30 text-emerald-400",
      features: [
        "#1 Exclusive Pin at the top of your designated category",
        "Included in SkillPrism dynamic context discovery top-k tools",
        "Official MCP connector verification & security audit review",
        "Featured banner across ritualdev.in/devshelf and weekly newsletter",
        "Co-branded interactive playground integration demo",
        "Priority Slack/Discord channel with RitualDev core engineers",
      ],
      ctaText: "Claim Category Leader ($999/mo)",
      ctaHref: "https://checkout.dodopayments.com/buy/pdt_0NpjONEJnu5OcWhncWF68?tier=partner_leader",
      popular: true,
    },
    {
      name: "Ecosystem Premier Partner",
      price: "$1,499",
      period: "per month",
      desc: "Enterprise platform sponsorship for major cloud, database, or compute ecosystems requiring comprehensive agent mesh integration.",
      badge: "Premier Tier",
      color: "border-purple-500/30 text-purple-400",
      features: [
        "Global directory sitewide header sponsor & footer presence",
        "Native first-class connector bundled in mcp-builder-kit",
        "Zero-Paywall Gold Seal attestation published on trust portal",
        "Dedicated technical case study & interactive Compactor ROI demo",
        "Full programmatic indexing in LLM agent system prompts",
        "Custom enterprise webinar / launch event co-hosted by founders",
      ],
      ctaText: "Become Premier Partner ($1,499/mo)",
      ctaHref: "https://checkout.dodopayments.com/buy/pdt_0NpjONEJnu5OcWhncWF68?tier=partner_premier",
      popular: false,
    },
  ];

  const openCategoryPlacements = [
    {
      name: "Managed Databases & Storage",
      category: "databases",
      tier: "Category Leader Available",
      badge: "1 Exclusive Slot Open",
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      desc: "Prime placement and primary database recommendation for autonomous AI coding agents in Cursor, Claude Code, and Windsurf via DevShelf.",
      targetTech: "Postgres, Distributed SQL, Serverless Storage",
      ctaText: "Claim Database Category (#1)",
      ctaHref: "https://checkout.dodopayments.com/buy/pdt_0NpjONEJnu5OcWhncWF68?tier=partner_leader",
      previewMcp: "npx -y @your-company/mcp-server",
    },
    {
      name: "Vector & AI Infrastructure",
      category: "ai",
      tier: "Category Leader Available",
      badge: "1 Exclusive Slot Open",
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      desc: "Top retrieval and vector indexing partner spotlighted in SkillPrism dynamic context discovery, agent memory systems, and RAG architectures.",
      targetTech: "Vector Databases, Embeddings, Inference APIs",
      ctaText: "Claim AI Infra Category (#1)",
      ctaHref: "https://checkout.dodopayments.com/buy/pdt_0NpjONEJnu5OcWhncWF68?tier=partner_leader",
      previewMcp: "npx -y @your-vector-engine/mcp-server",
    },
    {
      name: "DevOps & Cloud Orchestration",
      category: "devops",
      tier: "Spotlight Available",
      badge: "2 Slots Open",
      badgeColor: "text-sky-400 bg-sky-500/10 border-sky-500/30",
      desc: "High-visibility placement across developer terminal environments, containerized deployment pipelines, and zero-telemetry local sandboxes.",
      targetTech: "Cloud Hosting, CI/CD, Container Registries",
      ctaText: "Claim DevOps Placement",
      ctaHref: "https://checkout.dodopayments.com/buy/pdt_0NpjONEJnu5OcWhncWF68?tier=partner_spotlight",
      previewMcp: "npx -y @your-platform/cli",
    },
  ];

  const filteredPlacements = selectedCategory === "all"
    ? openCategoryPlacements
    : openCategoryPlacements.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-sky-900/20 via-indigo-900/10 to-transparent pointer-events-none blur-3xl" />

      <div className="relative max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-mono uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> DevShelf Partner Placements
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Get Discovered by Thousands of Autonomous AI Coding Agents
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Position your developer tool, AI infrastructure, or database platform directly in front of engineers using Claude Code, Cursor, Windsurf, Devin, and Google Antigravity.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/api/v1/registry/tools.json"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 bg-slate-900/80 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-600 transition"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              Machine-Readable API: /api/v1/registry/tools.json
            </Link>
            <Link
              href="/trust"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 bg-slate-900/80 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-600 transition"
            >
              <Shield className="w-4 h-4 text-sky-400" />
              Zero-Paywall Audit Standards
            </Link>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partnerTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 flex flex-col justify-between transition-all duration-300 ${
                tier.popular
                  ? "bg-slate-900/90 border-emerald-500/40 shadow-2xl shadow-emerald-500/10 scale-105 z-10"
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
                  Recommended for Category Leaders
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded border ${tier.color}`}>
                      {tier.badge}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{tier.desc}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                  <span className="text-slate-400 text-sm font-medium">/{tier.period}</span>
                </div>

                <div className="border-t border-slate-800 pt-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                    Sponsorship Deliverables
                  </p>
                  <ul className="space-y-2.5">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href={tier.ctaHref}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition ${
                    tier.popular
                      ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                      : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                >
                  {tier.ctaText}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Automated Zero-Paywall Audit Guarantee */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 sm:p-10 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" /> Rigorous Quality Standard
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Contingent on Passing the Zero-Paywall Verification Audit
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                RitualDev protects engineering trust above all else. Every sponsored partner must pass our automated static analysis and sandboxing checks:
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <strong>Zero Hidden Paywalls:</strong> Tool must provide a genuinely usable free tier or local self-hosted open-source version.
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <strong>Zero Secret Exfiltration:</strong> No unverified phone-home telemetry of developer tokens or database contents.
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <strong>MCP Spec Compliance:</strong> Clean JSON-RPC 2.0 schema execution compatible with AgentShield and DBShield wire proxies.
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/80 font-mono text-xs text-slate-300 space-y-3">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span>ZERO_PAYWALL_AUDIT.LOG</span>
                <span className="text-emerald-400">STATUS: VERIFIED (10/10)</span>
              </div>
              <p className="text-emerald-400">
                [+] Ingesting MCP manifest from package registry...
              </p>
              <p className="text-slate-400">
                [+] Running eBPF sandbox tracing against tool initialization...
              </p>
              <p className="text-slate-400">
                [✓] 0 external telemetry connections attempted during boot.
              </p>
              <p className="text-slate-400">
                [✓] Local execution confirmed with AGENTSHIELD_AIR_GAPPED=1.
              </p>
              <p className="text-emerald-400">
                [SUCCESS] Cryptographic verification badge issued and pinned to DevShelf catalog.
              </p>
            </div>
          </div>
        </div>

        {/* Open Category Placements Showcase */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Available Category Placements</h2>
              <p className="text-slate-400 text-sm">Inaugural verified placement slots open for infrastructure and developer tool vendors</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "databases", "ai", "devops"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition ${
                    selectedCategory === cat
                      ? "bg-slate-700 text-white font-semibold"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPlacements.map((p) => (
              <div key={p.name} className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between space-y-4 hover:border-slate-700 transition">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{p.tier}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{p.name}</h3>
                    <p className="text-xs text-sky-400 font-mono mt-0.5">Target: {p.targetTech}</p>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
                  <div className="pt-1">
                    <div className="text-[11px] text-slate-500 font-mono mb-1">PREVIEW INTEGRATION:</div>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-xs font-mono text-slate-400">
                      {p.previewMcp}
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <a
                    href={p.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-bold transition"
                  >
                    {p.ctaText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center py-12 border-t border-slate-800 space-y-4">
          <h2 className="text-2xl font-bold text-white">Ready to Spotlight Your Infrastructure?</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Contact our engineering team to schedule your automated Zero-Paywall Verification Audit and secure your category placement.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <a
              href="mailto:partners@ritualdev.in"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition"
            >
              Contact Developer Relations: partners@ritualdev.in
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
