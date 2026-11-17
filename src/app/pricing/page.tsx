"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Shield,
  ArrowRight,
  Lock,
  Server,
  Terminal,
  KeyRound,
  CreditCard,
  Wrench,
  Layers,
  Zap,
} from "lucide-react";
import { buildCloudOrPrivateCheckoutUrl, buildTeamProductCheckoutUrl } from "@/lib/checkout-urls.js";

export default function PricingPage() {
  const [githubUsername, setGithubUsername] = useState("");
  const [workEmail, setWorkEmail] = useState("");

  const openExternalCheckout = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-800 pb-4">
        <Link href="/" className="hover:text-brand-green">Home</Link>
        <span>/</span>
        <span className="text-brand-green font-bold">Unified Platform Pricing</span>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-neon text-xs font-mono">
          <CreditCard className="w-3.5 h-3.5" />
          <span>Dodo Payments Merchant of Record &middot; Instant Ed25519 License Keys</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          Simple, Transparent <span className="text-brand-neon">Agent Defense Pricing</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          Start free forever with our Apache-2.0 open-source local CLIs. Upgrade only when your engineering team needs hosted Slack/Teams approval relays, shared Redis token compaction, or air-gapped Private VPC deployment.
        </p>
      </div>

      {/* Optional Pre-fill Checkout Metadata */}
      <div className="max-w-2xl mx-auto glass-panel rounded-2xl p-5 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">
            Work Email (for Ed25519 License Delivery)
          </label>
          <input
            type="email"
            placeholder="engineer@company.com"
            value={workEmail}
            onChange={(e) => setWorkEmail(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-brand-neon"
          />
        </div>
        <div>
          <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">
            GitHub Username / Org (Optional)
          </label>
          <input
            type="text"
            placeholder="@acme-eng"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-brand-neon"
          />
        </div>
      </div>

      {/* 3 Core Unified Agent Defense Platform Tiers */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Tier 1: Community OSS */}
        <div className="glass-panel rounded-3xl p-8 border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 font-bold">
                Community OSS
              </span>
              <Terminal className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <div className="text-4xl font-black text-white font-mono">
                $0<span className="text-sm font-normal text-slate-400"> / forever</span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5 font-mono">
                Apache-2.0 / MIT &middot; Local Workstation Only
              </p>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Full local runtime protection for individual developers using Claude Code, Cursor, or Windsurf.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-300 pt-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
                <span>AgentShield OS kernel sandbox (Landlock, Seatbelt, AppContainer)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
                <span>DBShield local wire proxy &amp; lock-free dry-run rollbacks</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
                <span>SkillPrism local JIT context compactor CLI</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
                <span>Local tamper-evident audit ledger &amp; VS Code / Open VSX extension</span>
              </li>
            </ul>
          </div>
          <Link
            href="/docs"
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs font-bold text-center transition-colors"
          >
            npx @ritualdev-lab/agentshield init
          </Link>
        </div>

        {/* Tier 2: Team Gate + Relay (Recommended) */}
        <div className="glass-panel rounded-3xl p-8 border-2 border-brand-green/60 bg-emerald-950/15 flex flex-col justify-between space-y-6 relative shadow-[0_0_40px_rgba(0,245,155,0.08)]">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-neon text-slate-950 text-[11px] font-mono font-black uppercase tracking-wider">
            Most Popular for Teams
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-brand-green/15 border border-brand-green/40 text-xs font-mono text-brand-neon font-bold">
                Team Gate + Relay
              </span>
              <Shield className="w-5 h-5 text-brand-neon" />
            </div>
            <div>
              <div className="text-4xl font-black text-white font-mono">
                $29<span className="text-sm font-normal text-slate-400"> / seat / mo</span>
              </div>
              <p className="text-xs text-emerald-300 mt-1.5 font-mono">
                Offline-Verifiable Ed25519 License Key &middot; Cancel Anytime
              </p>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              Centralized CI/CD guardrails, team ChatOps database approvals, and org-wide browser DLP sync.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-200 pt-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
                <span>Everything in Community OSS, plus org policy URL sync</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
                <span>Managed Slack &amp; MS Teams interactive DB approval relay</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
                <span>Strict GitHub Actions / GitLab CI SARIF secret &amp; AST PR gates</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
                <span>PromptShield MV3 browser DLP policy sync across Chrome &amp; Edge</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
                <span>30-day cloud mutation audit trail &amp; priority email support</span>
              </li>
            </ul>
          </div>
          <button
            type="button"
            onClick={() =>
              openExternalCheckout(
                buildCloudOrPrivateCheckoutUrl({
                  tier: "team_relay_29",
                  customerEmail: workEmail,
                  githubUsername,
                })
              )
            }
            className="w-full py-3.5 px-4 rounded-xl bg-brand-neon hover:bg-emerald-400 text-slate-950 font-mono text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>Subscribe Team Gate ($29/mo)</span>
          </button>
        </div>

        {/* Tier 3: Enterprise Air-Gapped VPC */}
        <div className="glass-panel rounded-3xl p-8 border border-purple-500/40 bg-purple-950/10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/40 text-xs font-mono text-purple-300 font-bold">
                Enterprise VPC Fleet
              </span>
              <Lock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-4xl font-black text-white font-mono">
                $49<span className="text-sm font-normal text-slate-400"> / seat / mo</span>
              </div>
              <p className="text-xs text-purple-300 mt-1.5 font-mono">
                Or $25k–$50k/yr 60-Day Private VPC Pilot
              </p>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Dedicated air-gapped Kubernetes deployment with SSO, SIEM streaming, and custom SLAs.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-300 pt-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>Air-gapped Kubernetes Helm suite &amp; AWS/Azure/GCP Private VPC Terraform</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>Okta / Microsoft Entra ID SAML 2.0 &amp; OIDC SSO + 3-role RBAC</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>Splunk, Datadog &amp; Sentinel CEF SIEM log shipping</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>SIG Lite 2026 &amp; SOC 2 / ISO 27001 control alignment trust package</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>1-hour P0 response SLA &amp; private Slack Connect channel</span>
              </li>
            </ul>
          </div>
          <div className="space-y-2.5">
            <Link
              href="/enterprise/pilot"
              className="w-full py-3.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-black uppercase tracking-wider text-center block transition-colors"
            >
              Request 60-Day VPC Pilot
            </Link>
            <button
              type="button"
              onClick={() =>
                openExternalCheckout(
                  buildTeamProductCheckoutUrl({
                    tier: "agentshield_enterprise_49",
                    customerEmail: workEmail,
                    githubUsername,
                  })
                )
              }
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs font-semibold transition-colors"
            >
              Direct Seat Checkout ($49/seat/mo)
            </button>
          </div>
        </div>
      </section>

      {/* Managed Infrastructure Bundle: SkillPrism Redis Hub ($99/mo) */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/40 bg-cyan-950/15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-cyan font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Team Infrastructure Bundle &middot; Flat Monthly Rate</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            SkillPrism Managed Redis Hub + DBShield Team Relay — <span className="text-brand-cyan font-mono">$99/mo</span>
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Share compacted MCP tool receipts across your entire engineering organization (&lt;14ms P99 via 3-AZ Redis Sentinel) to cut prompt token costs by 98%+, bundled with OpenTelemetry FinOps dashboards and DBShield Slack approval routing.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
          <Link
            href="/finops-calculator"
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs font-bold text-center transition-colors"
          >
            Calculate Token ROI
          </Link>
          <button
            type="button"
            onClick={() =>
              openExternalCheckout(
                buildCloudOrPrivateCheckoutUrl({
                  tier: "team_hub_99",
                  customerEmail: workEmail,
                  githubUsername,
                })
              )
            }
            className="px-5 py-3 rounded-xl bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-mono text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Server className="w-4 h-4" />
            <span>Launch Team Hub ($99/mo)</span>
          </button>
        </div>
      </section>

      {/* Clean Secondary Ecosystem Banners */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold">
              <Layers className="w-4 h-4" />
              <span>DevShelf Ecosystem Sponsorships</span>
            </div>
            <h3 className="text-lg font-bold text-white">DevShelf Partner Placements (From $19/mo)</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Reach developers across 575+ verified web dossiers and <code className="text-slate-300">npx devshelf mcp</code> agent sessions with Launch Boosts ($19/30d), MCP Pro Pins ($49/mo), and Category Combos ($79/mo).
            </p>
          </div>
          <Link
            href="/partners"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-400 hover:text-white transition-colors"
          >
            <span>Explore Partner Tiers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold">
              <Wrench className="w-4 h-4" />
              <span>Productized Engineering &amp; Kits</span>
            </div>
            <h3 className="text-lg font-bold text-white">MCP Starter Kit ($49) &amp; DFY Builds ($199–$699)</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ship monetized MCP servers in 48 hours ($349–$699), book a 24-hour Pre-Launch AI Security Audit ($199–$399), or purchase the standalone <code className="text-slate-300">mcp-monetize</code> boilerplate ($49).
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-mono font-bold">
            <Link href="/mcp-builder" className="inline-flex items-center gap-1.5 text-purple-400 hover:text-white transition-colors">
              <span>MCP Builder &amp; Builds</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/audit" className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-white transition-colors">
              <span>Security Audits</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Billing & Licensing Assurance Strip */}
      <section className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div>
          <strong className="text-white">Global Tax-Compliant Billing:</strong> Powered by Dodo Payments (Credit Cards, Apple Pay, Google Pay, Indian UPI) with automated GST/VAT invoices. Recurring subscriptions include a 7-day refund window; see{" "}
          <Link href="/terms" className="text-brand-neon underline">Terms of Service</Link>.
        </div>
        <Link href="/device" className="text-brand-cyan hover:text-white shrink-0 font-bold">
          Activate CLI Device &rarr;
        </Link>
      </section>
    </div>
  );
}
