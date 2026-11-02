"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Database, 
  Terminal, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  ShieldAlert,
  MessageSquare,
  Sparkles,
  GitPullRequest
} from "lucide-react";

export default function DBShieldPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
        <Link href="/" className="hover:text-brand-cyan">Home</Link>
        <span>/</span>
        <span className="text-brand-cyan">DBShield</span>
      </div>

      {/* Hero Header */}
      <div className="border-b border-slate-800 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30">
            <Database className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">DBShield</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/40 text-xs font-mono">
                Wire Proxy &middot; v1.1.0
              </span>
            </div>
            <p className="text-slate-400 text-sm sm:text-base font-mono mt-1">
              Database Guardrail, Virtual Schema Masking &amp; Live Wire Proxy for Autonomous AI Agents
            </p>
          </div>
        </div>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          DBShield sits between autonomous AI coding agents and your databases (PostgreSQL, MySQL, SQLite, Supabase, Neon). It masks sensitive tables from agent introspection, isolates destructive mutations in dry-run transactions, and routes high-risk queries to your Slack or Teams channel with interactive 1-click approvals.
        </p>

        {/* Quick CLI Bar */}
        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-slate-200">
            <span className="text-brand-cyan">$</span>
            <span>brew install dbshield</span>
            <button
              onClick={() => copyText("brew install dbshield", "brew")}
              className="ml-2 text-slate-400 hover:text-white"
            >
              {copied === "brew" ? <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-slate-200">
            <span className="text-brand-cyan">$</span>
            <span>dbshield proxy --upstream postgres://user:pass@localhost:5432/main</span>
            <button
              onClick={() => copyText("dbshield proxy --upstream postgres://user:pass@localhost:5432/main", "proxy")}
              className="ml-2 text-slate-400 hover:text-white"
            >
              {copied === "proxy" ? <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <Link
            href="https://github.com/RitualDev-Lab/DBShield"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Feature Grid */}
      <section className="py-14 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-8">
          Enterprise Database Defense Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-brand-cyan">01 / SCHEMA MASKING</div>
            <h3 className="text-lg font-bold text-white">Virtual Schema RBAC</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamically intercepts <code className="text-slate-300">information_schema</code> and <code className="text-slate-300">pg_catalog</code> queries. AI agents never see customer PII columns, authentication tables, or internal audit logs.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-brand-cyan">02 / CHATOPS INTEGRATION</div>
            <h3 className="text-lg font-bold text-white">Slack &amp; Teams Approval Feed</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sends HMAC-SHA256 authenticated interactive Block Kit cards to your corporate <code className="text-slate-300">#db-approvals</code> channel. Human engineers can review AST diffs and approve with 1 click.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-brand-cyan">03 / DRY-RUN TOKENS</div>
            <h3 className="text-lg font-bold text-white">Distributed Dry-Run Manager</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Coordinates two-phase dry-run transaction verification across multi-store architectures (PostgreSQL + Redis + SQLite) before applying any mutations.
            </p>
          </div>

        </div>
      </section>

      {/* ChatOps Bot Visualizer */}
      <section className="py-14">
        <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider mb-2">
          <MessageSquare className="w-4 h-4" />
          <span>Interactive ChatOps Bot in Action</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-6">
          Real-Time Slack &amp; Teams Approvals
        </h2>

        <div className="glass-panel rounded-2xl p-6 border border-slate-700/80 max-w-2xl bg-slate-950 font-sans">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold text-xs">
              DB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">DBShield Guardrail Bot</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded">APP</span>
              </div>
              <span className="text-xs text-slate-400">#db-approvals &middot; Just now</span>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-slate-300">
              <div className="text-slate-500 text-xs mb-1">PROPOSED AGENT MUTATION:</div>
              <div className="text-amber-300 font-semibold">UPDATE accounts SET status = &apos;archived&apos; WHERE balance &lt; 0;</div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400">
              <div>Risk Score: <span className="text-rose-400 font-bold">88 / 100 (HIGH)</span></div>
              <div>Estimated Affected Rows: <span className="text-white font-bold">14,290</span></div>
            </div>

            <div className="flex gap-3 pt-3">
              <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors">
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve Mutation (Commit)</span>
              </button>
              <button className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors">
                Reject &amp; Rollback
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
