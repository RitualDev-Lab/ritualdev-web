"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useState } from "react";
import { 
  CheckCircle2, 
  Download, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  Code2, 
  Key, 
  Database, 
  CreditCard,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from "lucide-react";

function DownloadContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id") || searchParams.get("id") || `KIT-${Math.floor(100000 + Math.random() * 900000)}`;
  const [copiedClone, setCopiedClone] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);

  const cloneCmd = `git clone https://github.com/RitualDev-Lab/mcp-monetize.git
cd mcp-monetize
pnpm install
cp .env.example .env`;

  const claudeConfigSnippet = `{
  "mcpServers": {
    "monetized-scraper": {
      "command": "node",
      "args": ["dist/examples/03-web-scraper-server.js"],
      "env": {
        "DODO_PAYMENTS_WEBHOOK_KEY": "whsec_your_webhook_key_here"
      }
    }
  }
}`;

  const copyToClipboard = (text: string, type: "clone" | "config") => {
    navigator.clipboard.writeText(text);
    if (type === "clone") {
      setCopiedClone(true);
      setTimeout(() => setCopiedClone(false), 2000);
    } else {
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 2000);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-4">
        <Link href="/" className="hover:text-brand-cyan transition-colors">Home</Link>
        <span>/</span>
        <Link href="/mcp-starter-kit" className="hover:text-brand-cyan transition-colors">MCP Starter Kit</Link>
        <span>/</span>
        <span className="text-emerald-400 font-bold">Download &amp; Quickstart</span>
      </div>

      {/* Hero Confirmation */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.25)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Order Reference #{paymentId} • License Activated
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Welcome to The MCP Monetization Kit
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-mono">
            Your full source code and production boilerplates are ready to download below.
          </p>
        </div>
      </div>

      {/* Main Download & Clone Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Direct ZIP Download */}
        <div className="glass-panel rounded-3xl p-6 border border-purple-500/30 bg-purple-950/10 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Direct Source Code (ZIP)</h2>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              Download the complete boilerplate package including all 3 production servers, SQLite/Redis adapters, and Dodo/Stripe webhook listeners.
            </p>
          </div>

          <a
            href="https://github.com/RitualDev-Lab/mcp-monetize/archive/refs/heads/main.zip"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download mcp-monetize.zip</span>
          </a>
        </div>

        {/* GitHub Clone Repo */}
        <div className="glass-panel rounded-3xl p-6 border border-cyan-500/30 bg-cyan-950/10 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
              <ExternalLink className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">GitHub Repository Access</h2>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              Fork or clone directly from the official RitualDev-Lab repository to stay updated with future protocol versions and SDK updates.
            </p>
          </div>

          <a
            href="https://github.com/RitualDev-Lab/mcp-monetize"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all"
          >
            <span>Open RitualDev-Lab/mcp-monetize</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Quickstart Command Block */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold">
            <Terminal className="w-4 h-4" />
            <span>5-Minute Quickstart Setup</span>
          </div>
          <button
            onClick={() => copyToClipboard(cloneCmd, "clone")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors"
          >
            {copiedClone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedClone ? "Copied" : "Copy Commands"}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-900 font-mono text-xs text-brand-cyan overflow-x-auto leading-relaxed">
          {cloneCmd}
        </pre>
      </div>

      {/* Included Production Servers */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
          3 Turnkey Server Implementations Included
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-purple-400 font-bold">1. Pay-Per-Query API</div>
            <p className="text-[11px] text-slate-400">
              <code>examples/01-weather-api-server.ts</code>
            </p>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Deducts credits per tool call with automatic quota recovery.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-pink-400 font-bold">2. Monthly SaaS Agent</div>
            <p className="text-[11px] text-slate-400">
              <code>examples/02-sql-agent-server.ts</code>
            </p>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Validates subscription status and enforces time-limited license keys.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-cyan-400 font-bold">3. Scraper + Webhooks</div>
            <p className="text-[11px] text-slate-400">
              <code>examples/03-web-scraper-server.ts</code>
            </p>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Handles incoming Stripe &amp; Dodo checkout webhooks to credit accounts.
            </p>
          </div>
        </div>
      </div>

      {/* Claude Desktop Configuration */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
            <Code2 className="w-4 h-4" />
            <span>Claude Desktop Config (claude_desktop_config.json)</span>
          </div>
          <button
            onClick={() => copyToClipboard(claudeConfigSnippet, "config")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors"
          >
            {copiedConfig ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedConfig ? "Copied" : "Copy JSON"}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-900 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
          {claudeConfigSnippet}
        </pre>
      </div>

      {/* Need Help / Enterprise Customization */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm font-bold text-white">Need Custom Implementation Support?</h3>
          <p className="text-xs text-slate-400 font-mono">
            Our engineering team can wire up your custom database or proprietary OpenAPI spec directly.
          </p>
        </div>
        <Link
          href="/mcp-builder"
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5"
        >
          <span>Explore Done-for-You MCP Server</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}

export default function McpStarterKitDownloadPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-mono text-slate-500">Loading starter kit downloads...</div>}>
      <DownloadContent />
    </Suspense>
  );
}
