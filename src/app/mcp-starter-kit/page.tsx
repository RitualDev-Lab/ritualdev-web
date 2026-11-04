"use client";

import Link from "next/link";
import { 
  CreditCard, 
  Code2, 
  Boxes, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Terminal, 
  FileCode2, 
  Database, 
  Sparkles,
  Lock
} from "lucide-react";

export default function McpStarterKitPage() {
  const checkoutUrl = "https://checkout.dodopayments.com/buy/pdt_0NpjONGugY5QkrFDUaPva?quantity=1&redirect_url=https%3A%2F%2Fritualdev.in%2Fmcp-starter-kit%2Fdownload";

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-4">
        <Link href="/" className="hover:text-brand-cyan transition-colors">Home</Link>
        <span>/</span>
        <span className="text-brand-cyan font-bold">The Ultimate MCP Monetization Starter Kit</span>
      </div>

      {/* Hero Header */}
      <div className="space-y-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch Special: Save 50% Today • Instant Codebase Download</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          The Ultimate Model Context Protocol <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            Monetization Starter Kit
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-3xl mx-auto">
          Start charging Claude Desktop, Cursor, and Windsurf users for invoking your MCP tools. A production-ready TypeScript boilerplate with Dodo Payments &amp; Stripe webhooks, SQLite / Redis storage, and 3 working servers.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={checkoutUrl}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs font-mono flex items-center gap-2 shadow-[0_0_30px_rgba(217,70,239,0.35)] hover:opacity-95 transition-all text-sm"
          >
            <CreditCard className="w-4 h-4" />
            <span>Get the Starter Kit for $49 (One-Time)</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
          <a
            href="https://github.com/RitualDev-Lab/mcp-monetize"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-mono font-bold flex items-center gap-2 transition-colors text-sm"
          >
            <span>View Open-Source Core on GitHub</span>
          </a>
        </div>
      </div>

      {/* What's In The Box */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono text-purple-400 uppercase tracking-wider font-bold">
            Full Production Codebase Included
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Everything You Need to Monetize Your MCP Server
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">mcp-monetize Middleware</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              3-line wrapper for any <code>@modelcontextprotocol/sdk</code> tool. Manages complimentary quotas, per-query credits, and monthly subscriptions.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Turnkey Dodo &amp; Stripe Webhooks</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Express, Fastify &amp; Next.js webhook listeners. Instantly validates customer payments, replenishes credits, or sets active subscription flags.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-brand-cyan flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">SQLite &amp; Upstash Redis Storage</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero-setup persistence adapters. Run locally on desktop using Node.js 22 built-in SQLite, or scale in the cloud with serverless Upstash Redis.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Working Production Servers */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <div className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-1 font-bold">
              Complete Reference Architectures
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              3 Working Production MCP Servers Ready to Fork
            </h2>
          </div>
          <span className="px-3 py-1 text-xs font-mono rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 font-bold shrink-0">
            Copy • Customize • Launch
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-white font-bold text-sm">1. Weather API Server</div>
            <div className="text-brand-cyan font-bold">Pay-Per-Call Model ($5 / 500 Calls)</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Grants 3 complimentary weather forecasts, then returns an interactive paywall with customer prefilled Dodo checkout link.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-white font-bold text-sm">2. SQL Agent Server</div>
            <div className="text-purple-400 font-bold">Monthly Subscription ($19/mo)</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Connects to PostgreSQL/SQLite. Subscribed users execute unlimited queries; unauthenticated users hit the paywall.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-white font-bold text-sm">3. Web Scraper Server</div>
            <div className="text-pink-400 font-bold">Usage Credits ($0.02 / URL)</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              High-concurrency scraping server with real-time webhook listeners replenishing customer credits upon Stripe checkout.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing CTA Box */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-purple-500/30 max-w-3xl mx-auto text-center space-y-6 bg-gradient-to-b from-purple-950/20 to-slate-950">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
            Commercial Starter Kit License
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get Instant Access to the Full Boilerplate
          </h2>
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className="text-5xl font-extrabold text-white">$49</span>
          <span className="text-slate-400 text-xs font-mono">one-time payment • lifetime updates</span>
        </div>

        <ul className="max-w-md mx-auto text-left space-y-2 text-xs font-mono text-slate-300">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Full TypeScript Source Code &amp; Documentation</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Dodo Payments &amp; Stripe Webhook Fulfillment Engines</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>SQLite &amp; Upstash Redis Storage Adapters</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>3 Complete Production Server Examples</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Commercial License (Build unlimited commercial MCPs)</span>
          </li>
        </ul>

        <div className="pt-2">
          <a
            href={checkoutUrl}
            className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:opacity-95 text-white font-bold text-xs font-mono inline-flex items-center justify-center gap-2 shadow-[0_0_35px_rgba(217,70,239,0.35)] text-sm"
          >
            <span>Complete Order &amp; Download Kit ($49)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="text-[11px] font-mono text-slate-400 flex items-center justify-center gap-1.5 pt-1">
          <Lock className="w-3.5 h-3.5 text-purple-400" />
          <span>Instant code delivery. Global tax and invoice handled via Dodo Payments.</span>
        </div>
      </section>

    </div>
  );
}
