"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Shield,
  ArrowRight,
  Lock,
  Server,
  Cloud,
  Terminal,
  Star,
  KeyRound,
  CreditCard,
  Wrench,
  Database,
  Layers,
  Heart,
  Boxes,
  Zap,
} from "lucide-react";
import { buildCloudOrPrivateCheckoutUrl, buildTeamProductCheckoutUrl } from "@/lib/checkout-urls.js";

export default function PricingPage() {
  const [githubUsername, setGithubUsername] = useState("");
  const [workEmail, setWorkEmail] = useState("");

  const launchCheckout = (tier: "team_relay_29" | "team_hub_99" | "private_compliance_kit") => {
    const url = buildCloudOrPrivateCheckoutUrl({
      tier,
      customerEmail: workEmail,
      githubUsername,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-800 pb-4">
        <Link href="/" className="hover:text-brand-green">Home</Link>
        <span>/</span>
        <span className="text-brand-green font-bold">Open-Source Core &amp; Hosted Cloud Plans</span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-brand-green/30 text-xs font-mono text-brand-neon">
          <CreditCard className="w-3.5 h-3.5" />
          <span>Zero CLI Paywalls • Pay Only for Hosted Cloud Infra, Private Compliance &amp; Engineering Sprints</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Free Local Defense. Paid Managed Relay.
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          We never lock local CLI features behind a license key. AgentShield, DBShield, and SkillPrism CLIs are 100% open source. Upgrade when your team wants hosted approval relays, managed Redis token caching, webhook-gated compliance kits, or 48-hour Done-For-You delivery.
        </p>
      </div>

      {/* Free Open-Source Flagship Callout */}
      <div className="glass-panel rounded-3xl p-7 sm:p-8 border border-brand-green/40 bg-emerald-950/15 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-brand-green/15 text-brand-neon border border-brand-green/30 text-xs font-mono font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>FLAGSHIP OSS CORE • $0 FOREVER (APACHE 2.0)</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            AgentShield CLI &amp; Local Agent Sandbox
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Block `.env` leaks, neutralize obfuscated shell evasions, and wrap Claude Code / Cursor / Windsurf completely locally in &lt;1ms. Run the interactive 10-second demo right in your terminal:
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-brand-neon overflow-x-auto">
            $ npx @ritualdev-lab/agentshield demo
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 font-mono text-xs">
          <a
            href="https://github.com/RitualDev-Lab/AgentShield"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition"
          >
            <Star className="w-4 h-4 fill-slate-950" />
            <span>Star AgentShield on GitHub</span>
          </a>
          <Link
            href="/agentshield/"
            className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition"
          >
            <span>Explore AgentShield Docs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Section 1: What Cannot Be Git Cloned (Hosted Cloud Relay & Webhook-Gated Kits) */}
      <div className="space-y-6">
        <div>
          <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">
            Managed Infrastructure &amp; Private Repositories
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Hosted Team Relay &amp; Webhook-Verified Compliance Kits
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Save engineering days hosting Redis clusters, Slack approval bots, or assembling SOC 2 evidence. Provisioned automatically upon Dodo webhook confirmation.
          </p>
        </div>

        {/* Optional Provisioning Inputs */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="space-y-1">
            <label className="text-slate-300 font-bold">Work Email (for Managed Relay &amp; Receipt)</label>
            <input
              type="email"
              value={workEmail}
              onChange={(e) => setWorkEmail(e.target.value)}
              placeholder="engineering@company.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-cyan"
            />
          </div>
          <div className="space-y-1">
            <label className="text-slate-300 font-bold">GitHub Handle (required for Private Compliance Kit invite)</label>
            <input
              type="text"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              placeholder="e.g. octocat"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-cyan"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hosted Relay Starter $29/mo */}
          <div className="glass-panel rounded-3xl p-7 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700 text-brand-green">
                  <Cloud className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                  Hosted Relay
                </span>
              </div>
              <h3 className="font-bold text-xl text-white">Hosted Team Relay</h3>
              <div className="my-4">
                <span className="text-4xl font-extrabold text-white font-mono">$29</span>
                <span className="text-xs text-slate-400 ml-1.5 font-mono">/ month</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Skip running webhook servers. Route DBShield &amp; AgentShield destructive command approvals straight to your team&apos;s Slack or Microsoft Teams.
              </p>
              <ul className="space-y-2.5 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
                  <span>Hosted Slack &amp; MS Teams Two-Man Approval Webhook Relay</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
                  <span>Managed Central Policy Distribution URL (Up to 10 developers)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
                  <span>30-Day Hosted Tamper-Evident Audit Ledger Retention</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
                  <span>Zero self-hosted Redis or OAuth webhook setup required</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => launchCheckout("team_relay_29")}
              className="mt-8 w-full py-3 rounded-xl bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 font-bold text-xs font-mono flex items-center justify-center gap-2 transition"
            >
              <span>Subscribe Hosted Relay ($29/mo)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Hosted Team Hub + Redis $99/mo */}
          <div className="glass-panel rounded-3xl p-7 border border-brand-cyan/60 shadow-[0_0_30px_rgba(56,189,248,0.15)] relative flex flex-col justify-between">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-cyan text-slate-950 font-mono font-bold text-[10px] tracking-wider uppercase">
              Hosted Infra Bundle
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700 text-brand-cyan">
                  <Server className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-brand-cyan border border-cyan-500/30">
                  Team Hub + Redis
                </span>
              </div>
              <h3 className="font-bold text-xl text-white">Hosted Team Hub + Cache</h3>
              <div className="my-4">
                <span className="text-4xl font-extrabold text-white font-mono">$99</span>
                <span className="text-xs text-slate-400 ml-1.5 font-mono">/ month</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Everything in Hosted Relay plus a dedicated hosted SkillPrism Redis cache pool so your entire team shares compacted tool context &amp; DB guardrails.
              </p>
              <ul className="space-y-2.5 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                  <span>Hosted Shared SkillPrism Redis Token Cache Cluster</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                  <span>Unlimited DBShield Approval Channels &amp; Custom Regex Rules</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                  <span>1-Year Cloud Audit Retention + Splunk / Datadog Forwarding</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                  <span>Priority Slack Support with RitualDev Engineers</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => launchCheckout("team_hub_99")}
              className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-500 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 hover:opacity-95 transition"
            >
              <span>Launch Hosted Team Hub ($99/mo)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Private Compliance Kit $199 One-Time */}
          <div className="glass-panel rounded-3xl p-7 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700 text-purple-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  Webhook-Gated Repo
                </span>
              </div>
              <h3 className="font-bold text-xl text-white">Private Compliance Pack</h3>
              <div className="my-4">
                <span className="text-4xl font-extrabold text-white font-mono">$199</span>
                <span className="text-xs text-slate-400 ml-1.5 font-mono">/ one-time</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Automated GitHub collaborator invite to our private compliance &amp; hardened infrastructure repo — unlocked exclusively after Dodo webhook payment verification.
              </p>
              <ul className="space-y-2.5 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>SOC 2 Type II, ISO 27001 &amp; EU AI Act Auditor Evidence Templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Production AWS PrivateLink Terraform + Hardened K8s Helm Values</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Vendor Security Questionnaire Ready-to-Paste Answers</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Webhook-gated private GitHub invite upon verified purchase</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => launchCheckout("private_compliance_kit")}
              className="mt-8 w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-mono flex items-center justify-center gap-2 transition"
            >
              <span>Unlock Private Compliance Repo ($199)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: Done-For-You Engineering Sprints */}
      <div className="space-y-6 pt-8 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-brand-green uppercase tracking-wider mb-1">
              Done-For-You Engineering Outcomes
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Need Us to Build or Audit It For You?
            </h2>
          </div>
          <Link
            href="/partners/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-sky-500/40 bg-sky-950/40 text-xs font-mono text-sky-300 hover:text-white hover:bg-sky-900/50 transition self-start sm:self-auto"
          >
            <span>DevShelf Indie Spotlights ($9 – $49 Launch Boost)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Wrench className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400">48h Delivery</span>
              </div>
              <h3 className="text-lg font-bold text-white">Official MCP Server Build</h3>
              <div className="text-2xl font-extrabold text-white font-mono my-2">$349 – $699</div>
              <p className="text-xs text-slate-400">
                We wrap your OpenAPI / SaaS endpoints into a tested Claude &amp; Cursor MCP server with auth, optional paywalls, and Smithery/DevShelf PRs.
              </p>
            </div>
            <Link
              href="/mcp-builder/"
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-1.5 hover:bg-emerald-400 transition"
            >
              <span>Commission MCP Server</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Shield className="w-5 h-5 text-brand-cyan" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-brand-cyan">&lt; 24h Report</span>
              </div>
              <h3 className="text-lg font-bold text-white">Pre-Launch Security &amp; Secret Audit</h3>
              <div className="text-2xl font-extrabold text-white font-mono my-2">$199 – $399</div>
              <p className="text-xs text-slate-400">
                SAST, Shannon secret check, HTTP headers, and prompt-injection review with copy-paste Git PR fixes before your launch hits Product Hunt or HN.
              </p>
            </div>
            <Link
              href="/audit/"
              className="w-full py-2.5 px-3 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-1.5 hover:opacity-95 transition"
            >
              <span>Book Security Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Lock className="w-5 h-5 text-purple-400" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-purple-300">Private VPC</span>
              </div>
              <h3 className="text-lg font-bold text-white">Air-Gapped Enterprise SLA</h3>
              <div className="text-2xl font-extrabold text-white font-mono my-2">Custom Annual</div>
              <p className="text-xs text-slate-400">
                Dedicated AWS PrivateLink Terraform, Kubernetes DaemonSets, Okta/Entra SAML SSO, and 24/7 P1 engineering support.
              </p>
            </div>
            <Link
              href="/enterprise/"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs font-mono flex items-center justify-center gap-1.5 transition"
            >
              <span>Request Architecture Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Section 3: Complete All-Product Revenue & Billing Directory */}
      <div className="space-y-6 pt-8 border-t border-slate-800/80">
        <div>
          <div className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-1">
            All RitualDev Lab Earning &amp; Self-Serve Payment Channels
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Every Paid Tier &amp; Checkout Across the Suite
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Jump directly to checkout or tool configuration for DevShelf spotlights, DBShield Team, AgentShield Fleet, SkillPrism Redis, WebSecAuditor, MCP Packs, Pro Tools, and Partner Affiliates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 font-mono text-xs">
          {/* 1. DevShelf Spotlights */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sky-400">
                <Layers className="w-4 h-4" />
                <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30">$9 &ndash; $79/mo</span>
              </div>
              <h3 className="text-sm font-bold text-white font-sans">DevShelf Feature Your Tool</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Starter ($9), Launch Spotlight ($19), Category Exclusive ($39/mo), MCP Pro ($49/mo), Category Combo Pack ($79/mo) &amp; Custom Sponsor.
              </p>
            </div>
            <Link
              href="/partners/"
              className="w-full py-2.5 px-3 rounded-xl bg-sky-500 text-slate-950 font-bold flex items-center justify-center gap-1.5 hover:bg-sky-400 transition"
            >
              <span>Reserve DevShelf Slot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2. DBShield Team */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-brand-cyan">
                <Database className="w-4 h-4" />
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">$29 &ndash; $99/mo</span>
              </div>
              <h3 className="text-sm font-bold text-white font-sans">DBShield Team Guardrails</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Hosted Slack/MS Teams #db-approvals relay ($29/mo) &amp; DBShield Team Hub + Shared Redis ($99/mo).
              </p>
            </div>
            <div className="space-y-2">
              <a
                href={buildTeamProductCheckoutUrl({ tier: "dbshield_team_99", customerEmail: workEmail, githubUsername })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-brand-cyan text-slate-950 font-bold flex items-center justify-center gap-1.5 hover:opacity-95 transition"
              >
                <span>DBShield Team ($99/mo)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <Link href="/dbshield/" className="block text-center text-[11px] text-slate-400 hover:text-white">
                Explore DBShield Sandbox &amp; $29/mo Relay &rarr;
              </Link>
            </div>
          </div>

          {/* 3. AgentShield & WebSecAuditor Team/Fleet */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-brand-neon">
                <Shield className="w-4 h-4" />
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">$19 &ndash; $49/seat</span>
              </div>
              <h3 className="text-sm font-bold text-white font-sans">AgentShield &amp; WebSec Team</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Team CI/CD PR Gate on private repos ($19/seat/mo) or Enterprise Fleet with SIEM + SAML SSO ($49/seat/mo).
              </p>
            </div>
            <div className="space-y-2">
              <a
                href={buildTeamProductCheckoutUrl({ tier: "agentshield_team_19", customerEmail: workEmail, githubUsername })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-brand-neon text-slate-950 font-bold flex items-center justify-center gap-1.5 hover:opacity-95 transition"
              >
                <span>Team CI/CD Gate ($19/seat)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={buildTeamProductCheckoutUrl({ tier: "agentshield_enterprise_49", customerEmail: workEmail, githubUsername })}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-[11px] text-purple-300 hover:text-white"
              >
                Enterprise Fleet ($49/seat/mo) &rarr;
              </a>
            </div>
          </div>

          {/* 4. SkillPrism Team Redis */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-amber-400">
                <Zap className="w-4 h-4" />
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">$99/mo Hosted</span>
              </div>
              <h3 className="text-sm font-bold text-white font-sans">SkillPrism Team Redis VPC</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Managed shared Redis token compaction cluster cutting Claude Code &amp; Cursor tool prompt cost by 96.7%.
              </p>
            </div>
            <div className="space-y-2">
              <a
                href={buildTeamProductCheckoutUrl({ tier: "skillprism_team_99", customerEmail: workEmail, githubUsername })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-amber-400 text-slate-950 font-bold flex items-center justify-center gap-1.5 hover:bg-amber-300 transition"
              >
                <span>Hosted Redis Hub ($99/mo)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <Link href="/skillprism/" className="block text-center text-[11px] text-slate-400 hover:text-white">
                Calculate Team Token ROI &rarr;
              </Link>
            </div>
          </div>

          {/* 5. MCP Starter Kit & Packs */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-purple-400">
                <Boxes className="w-4 h-4" />
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30">$39 &ndash; $99 Once</span>
              </div>
              <h3 className="text-sm font-bold text-white font-sans">MCP Kits &amp; Connector Packs</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                MCP Monetization Starter Kit ($49), Fintech ($39), Database ($49), DevOps ($49), All-Access ($99) &amp; Turnkey ($500+).
              </p>
            </div>
            <div className="space-y-2">
              <a
                href={buildTeamProductCheckoutUrl({ tier: "mcp_starter_49", customerEmail: workEmail, githubUsername })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center gap-1.5 hover:bg-purple-500 transition"
              >
                <span>MCP Starter Kit ($49)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <Link href="/mcp-starter-kit/" className="block text-center text-[11px] text-slate-400 hover:text-white">
                View Connector Packs ($39&ndash;$99) &rarr;
              </Link>
            </div>
          </div>

          {/* 6. Desktop & Browser Pro Suite */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-pink-400">
                <Server className="w-4 h-4" />
                <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/30">Pro Suite</span>
              </div>
              <h3 className="text-sm font-bold text-white font-sans">PromptShield, MockForge &amp; FinePrint</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Commercial Pro license for browser DLP firewall, production DB masking &amp; legal contract redlines.
              </p>
            </div>
            <div className="space-y-2">
              <a
                href={buildTeamProductCheckoutUrl({ tier: "ritual_pro_15", customerEmail: workEmail, githubUsername })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold flex items-center justify-center gap-1.5 transition"
              >
                <span>Ritual Pro License ($15/mo)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <div className="text-center text-[11px] text-slate-400">
                <Link href="/promptshield/" className="hover:text-white">PromptShield</Link> &middot;{" "}
                <Link href="/mockforge/" className="hover:text-white">MockForge</Link> &middot;{" "}
                <Link href="/fineprint/" className="hover:text-white">FinePrint</Link>
              </div>
            </div>
          </div>

          {/* 7. Affiliates & Partner Perks */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-emerald-400">
                <Terminal className="w-4 h-4" />
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">Rev-Share / Bounties</span>
              </div>
              <h3 className="text-sm font-bold text-white font-sans">Developer Cloud Affiliate Hub</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Tracked <code className="text-slate-300">/go/*</code> links for DigitalOcean ($200 credit), Railway, PostHog, Cloudflare, Hetzner, Neon &amp; Sentry.
              </p>
            </div>
            <Link
              href="/devshelf/"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold flex items-center justify-center gap-1.5 hover:bg-slate-800 transition"
            >
              <span>Browse DevShelf &amp; /go Links</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 8. Donations & Grants */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-rose-400">
                <Heart className="w-4 h-4" />
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30">$1+ / &#8377;10+</span>
              </div>
              <h3 className="text-sm font-bold text-white font-sans">Grants, Bounties &amp; Donations</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Flexible one-time or recurring open-source patronage via Dodo Payments (Cards, Apple Pay &amp; Indian UPI).
              </p>
            </div>
            <Link
              href="/donate/"
              className="w-full py-2.5 px-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 font-bold flex items-center justify-center gap-1.5 hover:bg-rose-500/25 transition"
            >
              <span>Sponsor / Donate Any Amount</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Dodo Payments Merchant of Record Notice */}
      <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
        <div className="space-y-1">
          <div className="text-white font-bold text-sm flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-neon" />
            <span>Webhook-Verified Provisioning &amp; Dodo Payments</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            All payments are processed by Dodo Payments (Merchant of Record with automated global tax &amp; Indian GST invoices). Hosted relays and private repo access are provisioned strictly upon verified webhook events at <code className="text-slate-300">/api/webhooks/dodo</code>.
          </p>
        </div>
        <Link
          href="/trust/"
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-bold transition-colors shrink-0"
        >
          Review Security &amp; Trust Center
        </Link>
      </div>
    </div>
  );
}
