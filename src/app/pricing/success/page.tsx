"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShieldCheck, Mail, ArrowRight, Cloud, KeyRound } from "lucide-react";
import { TEAM_PRODUCT_CONFIG } from "@/lib/checkout-urls.js";

function PricingSuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id") || searchParams.get("id") || "PENDING_WEBHOOK";
  const product = (searchParams.get("product") || "team_relay_29").toLowerCase();

  const isPrivateKit =
    product.includes("private") ||
    product.includes("compliance") ||
    product.includes("promptshield") ||
    product.includes("mockforge") ||
    product.includes("fineprint");
  const isMcpPack = product.includes("mcp_pack");
  const matchedCfg = TEAM_PRODUCT_CONFIG[product];
  const isTeamHub = product.includes("hub") || product.includes("99");

  const title =
    matchedCfg?.label ||
    (isPrivateKit
      ? "Private Enterprise Compliance & Deployment Kit"
      : isTeamHub
        ? "Hosted Team Hub + Shared Redis Cache"
        : "Hosted Team Relay Starter");

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-4">
        <Link href="/" className="hover:text-brand-green transition-colors">Home</Link>
        <span>/</span>
        <Link href="/pricing/" className="hover:text-brand-green transition-colors">Pricing</Link>
        <span>/</span>
        <span className="text-brand-neon font-bold">Provisioning Status</span>
      </div>

      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            Checkout Completed • Ref #{paymentId}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Thank You! Provisioning Queued
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-mono">
            Plan: <strong className="text-white">{title}</strong>
          </p>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-7 border border-slate-800 space-y-5 text-xs font-mono">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          {isPrivateKit ? (
            <KeyRound className="w-4 h-4 text-purple-400" />
          ) : (
            <Cloud className="w-4 h-4 text-brand-cyan" />
          )}
          <span>What Happens Next (Webhook-Verified Fulfillment)</span>
        </div>

        {isPrivateKit ? (
          <ul className="space-y-2.5 text-slate-300 leading-relaxed">
            <li>1. Dodo Payments verifies your transaction and dispatches a signed webhook event to RitualDev.</li>
            <li>2. If you included your GitHub username during checkout, a collaborator invitation to the private compliance repository is sent automatically.</li>
            <li>3. Did not add your GitHub username yet? Forward your Dodo receipt ID to <a href="mailto:hello@ritualdev.in" className="text-brand-neon underline">hello@ritualdev.in</a> and we will invite you within 2 hours.</li>
          </ul>
        ) : isMcpPack ? (
          <ul className="space-y-2.5 text-slate-300 leading-relaxed">
            <li>1. Dodo Payments verifies your transaction and emails your PDF GST/VAT receipt.</li>
            <li>2. Your signed download archive and repository access for the selected MCP Connector Pack are dispatched to your checkout email.</li>
            <li>3. Need custom API endpoints wrapped too? Forward your receipt to <a href="mailto:hello@ritualdev.in" className="text-brand-neon underline">hello@ritualdev.in</a> or visit <Link href="/mcp-builder/" className="text-brand-cyan underline">/mcp-builder</Link>.</li>
          </ul>
        ) : (
          <ul className="space-y-2.5 text-slate-300 leading-relaxed">
            <li>1. Dodo Payments dispatches a signed verification webhook to provision your Hosted Team / Governance tenant.</li>
            <li>2. Your tenant relay URL, Slack/Teams approval endpoint, policy token, or Redis connection snippet are emailed to your checkout email address.</li>
            <li>3. Meanwhile, install the open-source CLI anywhere without keys: <code className="text-brand-neon">npx @ritualdev-lab/agentshield init-claude</code></li>
          </ul>
        )}
      </div>

      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-brand-green shrink-0" />
          <span>Need priority Slack setup? Email <a href="mailto:hello@ritualdev.in" className="text-white underline font-bold">hello@ritualdev.in</a></span>
        </div>
        <Link href="/pricing/" className="inline-flex items-center gap-1.5 text-brand-cyan hover:text-white font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>View All Plans &amp; Products</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default function PricingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-mono text-slate-500">Loading provisioning status...</div>}>
      <PricingSuccessContent />
    </Suspense>
  );
}
