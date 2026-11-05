"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Check, 
  Shield, 
  Database, 
  Zap, 
  Server, 
  ArrowRight,
  ExternalLink,
  Sparkles,
  Cpu,
  Layers,
  Lock,
  Download,
  Building,
  CreditCard,
  FileCheck
} from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const selfServiceProducts = [
    {
      name: "AgentShield Pro",
      category: "Autonomous Agent Runtime Defense",
      price: billingCycle === "monthly" ? "$15" : "$12",
      period: "per seat / month",
      billingNote: billingCycle === "annual" ? "billed annually ($144/yr)" : "billed monthly",
      desc: "For autonomous agent engineers running Claude Code, Cursor, Windsurf, or Devin requiring runtime secret defense and OS kernel isolation.",
      badge: "Flagship Defense",
      color: "brand-green",
      icon: Shield,
      features: [
        "Everything in Community Core (100% Offline CLI)",
        "OS Kernel Sandboxing (Bubblewrap, Seatbelt, AppContainer)",
        "Native macOS & Windows Menu-Bar Real-Time GUI",
        "Synthetic Honeytoken Canaries for AWS/SSH/Env",
        "Encrypted Tamper-Evident Audit Ledger Backup",
        "WebSecAuditor Automated GitHub PR Review Bot",
        "Commercial License for Proprietary Codebases"
      ],
      ctaText: "Get AgentShield Pro ($15/mo)",
      ctaHref: "https://checkout.dodopayments.com/buy/pdt_0NrFSkF5XLgBppfQRxgXN?quantity=1&redirect_url=https%3A%2F%2Fritualdev.in%2Fpricing%2Fsuccess",
      popular: true
    },
    {
      name: "DBShield Pro",
      category: "Database Mutation Guardrail",
      price: billingCycle === "monthly" ? "$15" : "$12",
      period: "per seat / month",
      billingNote: billingCycle === "annual" ? "billed annually ($144/yr)" : "billed monthly",
      desc: "For backend and platform engineers allowing autonomous agents to query and mutate PostgreSQL, MySQL, and SQLite databases safely.",
      badge: "Zero-Downtime Guard",
      color: "brand-cyan",
      icon: Database,
      features: [
        "Raw Wire-Level Protocol Interception (Port 5432 / 3306)",
        "Zero-Commit Two-Phase Dry-Run Transactions",
        "Interactive Approval Cards in Slack & Microsoft Teams",
        "Virtual Schema Masking (PII / Sensitive Columns Hidden)",
        "Automated DROP TABLE & Destructive Mutation Blocks",
        "Dual CLI Binaries (dbshield & dbs) with Zero Egress",
        "Commercial DB Proxy Deployment License"
      ],
      ctaText: "Get DBShield Pro ($15/mo)",
      ctaHref: "https://checkout.dodopayments.com/buy/pdt_0NrFSkF5XLgBppfQRxgXN?quantity=1&redirect_url=https%3A%2F%2Fritualdev.in%2Fpricing%2Fsuccess",
      popular: false
    },
    {
      name: "MCP Monetization Starter Kit",
      category: "Turn Any Tool into Paid MCP Server",
      price: "$49",
      period: "one-time payment",
      billingNote: "lifetime license & source code",
      desc: "Production-ready boilerplate and developer kit to convert any API, Python script, or CLI into a monetized Model Context Protocol server.",
      badge: "Developer Digital Kit",
      color: "amber-400",
      icon: Cpu,
      features: [
        "Complete TypeScript & Python MCP Server Scaffolding",
        "Dodo Payments API Billing Middleware Integrated",
        "Automated Cryptographic License Key Generator",
        "Token Usage Limiter & Rate Limiting Gateways",
        "Docker & Cloudflare Workers Air-Gapped Templates",
        "Full Source Code & Commercial Resale Rights",
        "Instant ZIP Repository Download + Continuous Updates"
      ],
      ctaText: "Buy MCP Starter Kit ($49)",
      ctaHref: "https://checkout.dodopayments.com/buy/pdt_0NrFSmrXT8zU2u5BKGJ7y?quantity=1&redirect_url=https%3A%2F%2Fritualdev.in%2Fpricing%2Fsuccess",
      popular: false
    }
  ];

  const enterpriseTiers = [
    {
      name: "Team Cluster",
      price: "$99",
      period: "per month base",
      desc: "For engineering teams (5–50 devs) running autonomous coding fleets at scale.",
      badge: "Shared VPC Hub",
      features: [
        "Includes 5 seats of AgentShield Pro & DBShield Pro",
        "Shared Team SkillPrism Redis VPC Hub (96.7% Token Savings)",
        "Staging DBShield Proxy with Central Slack #db-approvals Bot",
        "Continuous Automated PR Security Bot on GitHub Org",
        "Centralized Enterprise Security Policies (.agentshield.json)",
        "Automated Monthly Invoicing via Dodo Payments (Tax / GST)"
      ],
      ctaText: "Deploy Team Hub ($99/mo)",
      ctaHref: "https://checkout.dodopayments.com/buy/pdt_0NrFSmrXT8zU2u5BKGJ7y?quantity=1&redirect_url=https%3A%2F%2Fritualdev.in%2Fpricing%2Fsuccess",
      popular: false
    },
    {
      name: "Air-Gapped Private VPC",
      price: "$35k – $75k",
      period: "annual contract",
      desc: "For Fortune 500 enterprises, regulated banking, and healthcare environments.",
      badge: "Strict Air-Gapped",
      features: [
        "Private AWS VPC / Azure VNet / Helm Kubernetes Deployment",
        "100% Air-Gapped Mode (AGENTSHIELD_AIR_GAPPED=1 verified)",
        "SOC 2 Type II & ISO 27001 Cryptographic Audit Package",
        "Centralized Fleet Telemetry Dashboard for 5,000+ Developer Machines",
        "Native SIEM Connectors (Splunk, Datadog, AWS CloudWatch)",
        "Guaranteed < 1 hour P1 Emergency SLA & Dedicated Solutions Architect"
      ],
      ctaText: "Contact Enterprise Solutions",
      ctaHref: "/enterprise",
      popular: true
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-800 pb-4">
        <Link href="/" className="hover:text-brand-green">Home</Link>
        <span>/</span>
        <span className="text-brand-green font-bold">Pricing &amp; Commercial Subscriptions</span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-brand-green/30 text-xs font-mono text-brand-neon">
          <CreditCard className="w-3.5 h-3.5" />
          <span>Self-Service Billing Powered by Dodo Payments</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Invest in Security. Slash Token Bills.
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          From individual developer subscriptions to private air-gapped enterprise VPC clusters. Instant checkout with automated global sales tax and Indian GST compliance.
        </p>

        {/* Billing Cycle Switch */}
        <div className="pt-2 flex items-center justify-center gap-3 font-mono text-xs">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-xl transition-all ${
              billingCycle === "monthly"
                ? "bg-brand-neon text-slate-950 font-bold shadow-md"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              billingCycle === "annual"
                ? "bg-brand-neon text-slate-950 font-bold shadow-md"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <span>Annual Billing</span>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-950 text-brand-neon text-[10px] font-bold">20% OFF</span>
          </button>
        </div>
      </div>

      {/* Section 1: Self-Service Developer Offerings */}
      <div className="space-y-6">
        <div>
          <div className="text-xs font-mono text-brand-neon uppercase tracking-wider mb-1">
            Individual Developer &amp; Starter Kit Engine
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Self-Service Pro Subscriptions &amp; Developer Kits
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Instant digital fulfillment. Pay via credit card, Apple Pay, Google Pay, or UPI with automatic tax invoicing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {selfServiceProducts.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className={`glass-panel rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                  p.popular
                    ? "border-brand-green/60 shadow-[0_0_30px_rgba(61,220,132,0.15)] relative"
                    : "border-slate-800"
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-neon text-slate-950 font-mono font-bold text-[10px] tracking-wider uppercase shadow-md">
                    {p.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700 text-brand-green">
                      <Icon className="w-5 h-5" />
                    </div>
                    {!p.popular && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                    {p.category}
                  </div>
                  <h3 className="font-bold text-xl text-white">{p.name}</h3>

                  <div className="my-4">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">{p.price}</span>
                    <span className="text-xs text-slate-400 ml-1.5 font-mono">/ {p.period}</span>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">{p.billingNote}</div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {p.desc}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
                    {p.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800/60">
                  <a
                    href={p.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all font-mono ${
                      p.popular
                        ? "bg-gradient-to-r from-brand-green to-emerald-500 text-slate-950 hover:opacity-95 shadow-[0_0_15px_rgba(61,220,132,0.3)]"
                        : "bg-slate-900 border border-slate-700 text-white hover:bg-slate-800"
                    }`}
                  >
                    <span>{p.ctaText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Team & Enterprise Private VPC Offerings */}
      <div className="space-y-6 pt-8 border-t border-slate-800/80">
        <div>
          <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">
            Enterprise Fleet &amp; Regulated Environments
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Team Clusters &amp; Private Air-Gapped VPC
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Engineered for corporate security officers (CISOs), high-volume engineering teams, and strict regulatory compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {enterpriseTiers.map((tier) => (
            <div
              key={tier.name}
              className={`glass-panel rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                tier.popular
                  ? "border-brand-cyan/60 shadow-[0_0_30px_rgba(56,189,248,0.15)] relative"
                  : "border-slate-800"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-2xl text-white">{tier.name}</h3>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 text-brand-cyan border border-brand-cyan/40">
                    {tier.badge}
                  </span>
                </div>

                <div className="my-4">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">{tier.price}</span>
                  <span className="text-xs text-slate-400 ml-1.5 font-mono">/ {tier.period}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {tier.desc}
                </p>

                <div className="space-y-3 pt-4 border-t border-slate-800/80">
                  {tier.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <Check className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/60">
                <Link
                  href={tier.ctaHref}
                  target={tier.ctaHref.startsWith("http") ? "_blank" : undefined}
                  rel={tier.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all font-mono ${
                    tier.popular
                      ? "bg-gradient-to-r from-brand-cyan to-blue-500 text-slate-950 hover:opacity-95 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                      : "bg-slate-900 border border-slate-700 text-white hover:bg-slate-800"
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  {tier.ctaHref.startsWith("http") ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dodo Payments Trust & Merchant of Record Notice */}
      <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
        <div className="space-y-1">
          <div className="text-white font-bold text-sm flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-neon" />
            <span>Authorized Merchant of Record &amp; Tax Compliance</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Commercial transactions are administered through Dodo Payments Inc. Automatic EU VAT, global sales tax, and Indian Goods and Services Tax (GST) compliant formal tax invoices issued on every transaction.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/trust"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-bold transition-colors"
          >
            Review Security &amp; Trust Center
          </Link>
        </div>
      </div>

    </div>
  );
}
