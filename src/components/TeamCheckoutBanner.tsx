"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, CreditCard, Lock } from "lucide-react";
import { buildTeamProductCheckoutUrl, type TeamProductTierId } from "@/lib/checkout-urls.js";

export interface TeamCheckoutPlan {
  tierKey: TeamProductTierId;
  name: string;
  price: string;
  period: string;
  badge: string;
  description: string;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
  accent?: "cyan" | "emerald" | "purple" | "amber" | "rose";
}

interface TeamCheckoutBannerProps {
  eyebrow: string;
  heading: string;
  subheading: string;
  plans: TeamCheckoutPlan[];
  secondaryHref?: string;
  secondaryLabel?: string;
}

const ACCENT_MAP: Record<
  NonNullable<TeamCheckoutPlan["accent"]>,
  { border: string; badge: string; check: string; button: string }
> = {
  cyan: {
    border: "border-brand-cyan/50 shadow-[0_0_25px_rgba(56,189,248,0.12)]",
    badge: "bg-cyan-500/10 text-brand-cyan border-cyan-500/30",
    check: "text-brand-cyan",
    button: "bg-gradient-to-r from-brand-cyan to-blue-500 text-slate-950 hover:opacity-95",
  },
  emerald: {
    border: "border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.12)]",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    check: "text-brand-neon",
    button: "bg-gradient-to-r from-brand-green to-emerald-500 text-slate-950 hover:opacity-95",
  },
  purple: {
    border: "border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.12)]",
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    check: "text-purple-400",
    button: "bg-purple-600 hover:bg-purple-500 text-white",
  },
  amber: {
    border: "border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.12)]",
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    check: "text-amber-400",
    button: "bg-amber-400 hover:bg-amber-300 text-slate-950",
  },
  rose: {
    border: "border-rose-500/50 shadow-[0_0_25px_rgba(244,63,94,0.12)]",
    badge: "bg-rose-500/10 text-rose-300 border-rose-500/30",
    check: "text-rose-400",
    button: "bg-rose-500 hover:bg-rose-400 text-white",
  },
};

export default function TeamCheckoutBanner({
  eyebrow,
  heading,
  subheading,
  plans,
  secondaryHref = "/pricing/",
  secondaryLabel = "Compare All Plans & Products",
}: TeamCheckoutBannerProps) {
  const [workEmail, setWorkEmail] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [companyName, setCompanyName] = useState("");

  const launchCheckout = (tierKey: TeamProductTierId) => {
    const url = buildTeamProductCheckoutUrl({
      tier: tierKey,
      customerEmail: workEmail,
      githubUsername,
      companyName,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-10 border-t border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-neon uppercase tracking-wider">
            <CreditCard className="w-3.5 h-3.5" />
            <span>{eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {heading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
            {subheading}
          </p>
        </div>

        <Link
          href={secondaryHref}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-mono text-slate-200 hover:text-white transition shrink-0 self-start sm:self-auto"
        >
          <span>{secondaryLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Optional Pre-fill Inputs */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">Work Email (for Tenant &amp; Invoice)</label>
          <input
            type="email"
            value={workEmail}
            onChange={(e) => setWorkEmail(e.target.value)}
            placeholder="team@company.com"
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
          />
        </div>
        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">Team / Company Name (Optional)</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Acme Engineering"
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
          />
        </div>
        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">GitHub Handle (for Repo / Org Invites)</label>
          <input
            type="text"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            placeholder="octocat"
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
          />
        </div>
      </div>

      {/* Plans Grid */}
      <div
        className={`grid grid-cols-1 ${
          plans.length >= 4
            ? "md:grid-cols-2 xl:grid-cols-4"
            : plans.length === 3
              ? "md:grid-cols-3"
              : "md:grid-cols-2"
        } gap-5`}
      >
        {plans.map((plan) => {
          const style = ACCENT_MAP[plan.accent || (plan.featured ? "cyan" : "emerald")];
          return (
            <div
              key={plan.tierKey}
              className={`glass-panel rounded-3xl p-6 border flex flex-col justify-between relative ${
                plan.featured ? style.border : "border-slate-800"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${style.badge}`}>
                    {plan.badge}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white">{plan.name}</h3>
                <div className="my-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">{plan.price}</span>
                  <span className="text-xs text-slate-400 ml-1.5 font-mono">{plan.period}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-5">{plan.description}</p>
                <ul className="space-y-2 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${style.check}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => launchCheckout(plan.tierKey)}
                className={`mt-6 w-full py-3 px-4 rounded-xl font-bold text-xs font-mono flex items-center justify-center gap-2 transition ${
                  plan.featured
                    ? style.button
                    : "bg-slate-900 border border-slate-700 text-white hover:bg-slate-800"
                }`}
              >
                <span>{plan.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
        <Lock className="w-3.5 h-3.5 text-brand-neon shrink-0" />
        <span>
          CLI stays 100% open source ($0 forever). Payments processed via Dodo Payments (Cards, Apple Pay, Google Pay, UPI &amp; GST invoices) with automated webhook provisioning at <code className="text-slate-300">/api/webhooks/dodo</code>.
        </span>
      </div>
    </section>
  );
}
