"use client";

import Link from "next/link";
import { 
  Check, 
  Shield, 
  Zap, 
  Server, 
  ArrowRight,
  ExternalLink,
  Sparkles
} from "lucide-react";

export default function PricingPage() {
  const tiers = [
    {
      name: "Community Core",
      price: "$0",
      period: "forever",
      desc: "For solo developers and open-source contributors running local AI coding agents.",
      badge: "Open Source",
      features: [
        "100% Offline-First CLI Tools",
        "AgentShield OS Kernel Sandboxing (Bubblewrap, Seatbelt, AppContainer)",
        "Local DBShield SQLite & PostgreSQL Proxy",
        "Local SkillPrism Context Compaction",
        "DevShelf 567+ Tool Directory Access",
        "MIT / Apache 2.0 Open Source License"
      ],
      ctaText: "Install Free CLI",
      ctaHref: "/#install",
      popular: false
    },
    {
      name: "Pro Individual",
      price: "$15",
      period: "per month",
      desc: "For power developers and independent AI software engineers wanting cloud backups and GUI tools.",
      badge: "Most Popular",
      features: [
        "Everything in Community Core",
        "Native macOS & Windows Menu-Bar GUI",
        "Encrypted Cloud Backup of Audit Logs",
        "Priority Hosted DevShelf MCP Endpoints",
        "Automated Schema Drift Alerts",
        "Unlimited Private WebSecAuditor Scans",
        "Dodo Payments Powered (Global Tax & GST Handled)"
      ],
      ctaText: "Upgrade to Pro ($15/mo)",
      ctaHref: "https://checkout.dodopayments.com/buy/pdt_0NpjONGugY5QkrFDUaPva?quantity=1&redirect_url=https%3A%2F%2Fritualdev.in%2Fpricing%2Fsuccess",
      popular: true
    },
    {
      name: "Team Cluster",
      price: "$99",
      period: "per month / base",
      desc: "For engineering teams (5–50 devs) running Cursor, Windsurf, or Claude Code at scale.",
      badge: "Team Savings",
      features: [
        "Everything in Pro Individual",
        "Shared Team SkillPrism Redis VPC Hub (Saves ~96.7% Token Bills)",
        "DBShield Staging Proxy with Slack & Teams 1-Click Approval Bots",
        "Continuous PR Security Bot (WebSecAuditor GitHub App)",
        "Centralized Team Security Policies",
        "Dodo Payments Automated Team Invoicing"
      ],
      ctaText: "Deploy Team Hub ($99/mo)",
      ctaHref: "https://checkout.dodopayments.com/buy/pdt_0NpjONGugY5QkrFDUaPva?quantity=2&redirect_url=https%3A%2F%2Fritualdev.in%2Fpricing%2Fsuccess",
      popular: false
    },
    {
      name: "Enterprise Governance",
      price: "Custom",
      period: "annual contract",
      desc: "For Fortune 500 companies and regulated banking/healthcare environments with strict compliance.",
      badge: "Air-Gapped",
      features: [
        "On-Premise Private VPC Deployment (Terraform AWS / Helm K8s)",
        "100% Air-Gapped Mode (Zero Outbound Phone-Home Calls)",
        "SOC 2 / ISO 27001 Cryptographic Audit PDF Generator",
        "Central Fleet Control Dashboard for 5,000+ Developer Machines",
        "Native SIEM Connectors (Splunk, Datadog, AWS CloudWatch)",
        "99.99% Uptime SLA & Dedicated Solutions Engineer"
      ],
      ctaText: "Contact Enterprise Sales",
      ctaHref: "/enterprise",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
        <Link href="/" className="hover:text-brand-green">Home</Link>
        <span>/</span>
        <span className="text-brand-green">Pricing</span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-xs font-mono text-brand-neon uppercase tracking-wider mb-2">
          Transparent, Developer-Friendly Pricing
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Invest in Security. Save on Tokens.
        </h1>
        <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
          From free open-source CLIs to Fortune 500 air-gapped VPC clusters. Secure checkout powered by Dodo Payments with automated global sales tax and Indian GST compliance.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
              tier.popular
                ? "border-brand-green/50 shadow-[0_0_30px_rgba(61,220,132,0.15)] relative"
                : "border-slate-800"
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-neon text-slate-950 font-mono font-bold text-[10px] tracking-wider uppercase shadow-md">
                {tier.badge}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-white">{tier.name}</h3>
                {!tier.popular && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {tier.badge}
                  </span>
                )}
              </div>

              <div className="my-4">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">{tier.price}</span>
                <span className="text-xs text-slate-400 ml-1.5 font-mono">/ {tier.period}</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {tier.desc}
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                {tier.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
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
                className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  tier.popular
                    ? "bg-gradient-to-r from-brand-green to-emerald-500 text-slate-950 hover:opacity-95 shadow-[0_0_15px_rgba(61,220,132,0.3)]"
                    : "bg-slate-900 border border-slate-700 text-white hover:bg-slate-800"
                }`}
              >
                <span>{tier.ctaText}</span>
                {tier.ctaHref.startsWith("http") ? <ExternalLink className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Dodo Payments Trust Banner */}
      <div className="mt-16 text-center text-xs font-mono text-slate-500">
        Payments processed securely via Dodo Payments. Automatic VAT, GST, and global remittance handling.
      </div>

    </div>
  );
}
