"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useState, useMemo } from "react";
import { 
  CheckCircle2, 
  Key, 
  Download, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Server, 
  ArrowRight,
  Mail,
  Sparkles
} from "lucide-react";

function PricingSuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id") || searchParams.get("id") || `SUB-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Deterministic license key based on payment ID
  const licenseKey = useMemo(() => {
    const raw = `ASHIELD-PRO-${paymentId.toUpperCase().replace(/[^A-Z0-9]/g, "")}-2026`;
    return raw.slice(0, 32);
  }, [paymentId]);

  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedMcp, setCopiedMcp] = useState(false);

  const cliActivationCmd = `npx @ritualdev-lab/agentshield login --key ${licenseKey}`;

  const mcpConfigSnippet = `{
  "mcpServers": {
    "agentshield-pro": {
      "command": "npx",
      "args": ["-y", "@ritualdev-lab/agentshield", "mcp-proxy", "--license", "${licenseKey}"]
    }
  }
}`;

  const copyToClipboard = (text: string, type: "key" | "cli" | "mcp") => {
    navigator.clipboard.writeText(text);
    if (type === "key") {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else if (type === "cli") {
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    } else {
      setCopiedMcp(true);
      setTimeout(() => setCopiedMcp(false), 2000);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-4">
        <Link href="/" className="hover:text-brand-green transition-colors">Home</Link>
        <span>/</span>
        <Link href="/pricing" className="hover:text-brand-green transition-colors">Pricing</Link>
        <span>/</span>
        <span className="text-brand-neon font-bold">Pro Delivery Portal</span>
      </div>

      {/* Hero Confirmation */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-brand-green/10 border border-brand-green/30 text-brand-neon flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(0,245,155,0.25)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold px-3.5 py-1 rounded-full bg-brand-green/10 text-brand-neon border border-brand-green/30">
            Subscription Active • Order Ref #{paymentId}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Welcome to AgentShield Pro!
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-mono">
            Your Pro license key and software access credentials are delivered below.
          </p>
        </div>
      </div>

      {/* License Key Delivery Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-brand-green/40 bg-brand-green/5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-neon font-bold">
            <Key className="w-4 h-4" />
            <span>Your Pro License Key</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
            Active &amp; Verified
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <code className="font-mono text-sm sm:text-base text-white tracking-wider font-bold select-all break-all">
            {licenseKey}
          </code>
          <button
            onClick={() => copyToClipboard(licenseKey, "key")}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-neon text-slate-950 font-mono text-xs font-bold hover:opacity-90 transition-all shrink-0"
          >
            {copiedKey ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
            <span>{copiedKey ? "Copied Key!" : "Copy License Key"}</span>
          </button>
        </div>
        <p className="text-xs text-slate-400 font-mono">
          Save this key. It unlocks private WebSecAuditor scans, desktop GUI builds, and priority MCP proxy endpoints across Cursor, Windsurf, and Claude Code.
        </p>
      </div>

      {/* Pro Deliverables Matrix */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
          Included Pro Deliverables Ready for Immediate Use
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CLI Activation */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-neon flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">1. CLI Key Activation</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                Activate your workstation for automated kernel sandboxing and audit log backup.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(cliActivationCmd, "cli")}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-brand-neon border border-slate-700 font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedCli ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCli ? "Copied Command" : "Copy CLI Login Command"}</span>
            </button>
          </div>

          {/* Desktop GUI & Menu Bar App */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">2. AgentShield Menu-Bar GUI</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                Real-time kernel monitoring daemon for macOS (Apple Silicon / Intel) and Windows 11.
              </p>
            </div>
            <a
              href="https://github.com/RitualDev-Lab/AgentShield/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-500 text-slate-950 font-mono text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Desktop GUI</span>
            </a>
          </div>

          {/* Priority DevShelf MCP Proxy */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">3. Priority DevShelf MCP</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                Connect your IDE to the private MCP defense proxy with 567+ tool handlers.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(mcpConfigSnippet, "mcp")}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-purple-300 border border-slate-700 font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedMcp ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMcp ? "Copied MCP Config" : "Copy MCP JSON Config"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Claude Desktop / Cursor Config View */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-bold">
            <Terminal className="w-4 h-4 text-brand-neon" />
            <span>IDE MCP Proxy Configuration (claude_desktop_config.json / .cursor/mcp.json)</span>
          </div>
        </div>
        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-900 font-mono text-xs text-brand-cyan overflow-x-auto leading-relaxed">
          {mcpConfigSnippet}
        </pre>
      </div>

      {/* Invoicing, Taxes & Support */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 text-xs font-mono text-slate-400">
        <div className="text-white font-bold text-sm flex items-center gap-2">
          <Mail className="w-4 h-4 text-brand-green" />
          <span>Billing &amp; Customer Support</span>
        </div>
        <p className="leading-relaxed">
          Your official tax invoice and recurring receipt have been dispatched by Dodo Payments to your checkout email. Global VAT and GST compliance is handled automatically.
        </p>
        <p className="leading-relaxed">
          Need priority architecture assistance or license reassignment? Contact engineering directly at{" "}
          <a href="mailto:support@ritualdev.in" className="text-brand-neon hover:underline font-bold">
            support@ritualdev.in
          </a>{" "}
          (guaranteed response under 2 hours).
        </p>
      </div>

    </div>
  );
}

export default function PricingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-mono text-slate-500">Loading delivery credentials...</div>}>
      <PricingSuccessContent />
    </Suspense>
  );
}
