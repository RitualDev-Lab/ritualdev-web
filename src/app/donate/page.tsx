"use client";

import Link from "next/link";
import { 
  Heart, 
  Coffee, 
  Star, 
  ExternalLink, 
  Shield, 
  CheckCircle2, 
  Sparkles,
  Award
} from "lucide-react";

export default function DonatePage() {
  const donationTiers = [
    {
      name: "Coffee Backer",
      amount: "$5",
      type: "One-Time or Monthly",
      desc: "Fuel late-night kernel driver hacking and open-source documentation maintenance.",
      icon: Coffee,
      href: "https://github.com/sponsors/RitualDev-Lab?tier_id=5",
      badge: "Community"
    },
    {
      name: "Developer Patron",
      amount: "$15",
      type: "Monthly",
      desc: "Supports ongoing maintenance of our macOS Seatbelt and Windows AppContainer sandboxes.",
      icon: Heart,
      href: "https://github.com/sponsors/RitualDev-Lab?tier_id=15",
      badge: "Supporter"
    },
    {
      name: "Ecosystem Sponsor",
      amount: "$100",
      type: "Monthly",
      desc: "Helps sponsor Redis VPC testing infrastructure and multi-arch Docker image builds.",
      icon: Star,
      href: "https://github.com/sponsors/RitualDev-Lab?tier_id=100",
      badge: "Partner"
    },
    {
      name: "Verified DevShelf Partner",
      amount: "$500",
      type: "Monthly",
      desc: "For developer tool and API companies. Featured badge on the DevShelf directory and priority MCP indexing.",
      icon: Award,
      href: "https://github.com/sponsors/RitualDev-Lab?tier_id=500",
      badge: "Featured Partner"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
        <Link href="/" className="hover:text-rose-400">Home</Link>
        <span>/</span>
        <span className="text-rose-400">Donation &amp; Sponsorship</span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-950/40 border border-rose-800/50 text-xs font-mono text-rose-300 mb-4">
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          <span>OFFICIAL RITUALDEV DONATION PORTAL &middot; DONATION.RITUALDEV.IN</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Support Open-Source AI Defense &amp; Offline Systems
        </h1>
        <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
          RitualDev builds 100% offline-first software, kernel sandboxes, and developer tools with zero telemetry and zero cloud paywalls. Your sponsorship keeps our open-source tools independent, secure, and accessible to developers worldwide.
        </p>
      </div>

      {/* Tier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {donationTiers.map((tier) => {
          const Icon = tier.icon;
          return (
            <div
              key={tier.name}
              className="glass-panel glass-panel-hover rounded-3xl p-6 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-rose-300 border border-rose-900/40">
                    {tier.badge}
                  </span>
                </div>

                <div className="text-2xl font-extrabold text-white font-mono mb-1">
                  {tier.amount}
                </div>
                <div className="text-[11px] font-mono text-slate-400 mb-3">
                  {tier.type}
                </div>

                <h3 className="font-bold text-base text-slate-200 mb-2">
                  {tier.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {tier.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800/80">
                <Link
                  href={tier.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)]"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Sponsor via GitHub</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transparent Grant Allocation */}
      <div className="glass-panel rounded-3xl p-8 border border-slate-800 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-4">
          Where Your Sponsorship Dollars Go
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5">
            <div className="font-mono text-brand-neon font-bold">50% &middot; Core R&amp;D</div>
            <p className="text-slate-400 leading-relaxed">
              Funding Linux Landlock, macOS Seatbelt, and Windows AppContainer driver testing rigs.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5">
            <div className="font-mono text-brand-cyan font-bold">30% &middot; CI/CD &amp; Infrastructure</div>
            <p className="text-slate-400 leading-relaxed">
              Multi-architecture automated test runners, SLSA Level 3 attestations, and Cosign container signing.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5">
            <div className="font-mono text-purple-400 font-bold">20% &middot; Community &amp; Grants</div>
            <p className="text-slate-400 leading-relaxed">
              Bounties for open-source contributors authoring AST security rules and MCP server scaffolders.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
