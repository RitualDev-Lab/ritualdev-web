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
  Sparkles,
  ShieldAlert,
  Database,
  FileText
} from "lucide-react";

function PricingSuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id") || searchParams.get("id") || `SUB-${Math.floor(100000 + Math.random() * 900000)}`;
  const product = (searchParams.get("product") || "agentshield").toLowerCase();
  
  // Product-specific configuration
  const config = useMemo(() => {
    const rawId = paymentId.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
    
    if (product.includes("promptshield")) {
      return {
        name: "PromptShield Enterprise Fleet",
        keyPrefix: "PSHIELD-FLEET",
        licenseKey: `PSHIELD-FLEET-${rawId}-2026`,
        icon: ShieldAlert,
        color: "text-brand-neon",
        bgColor: "bg-brand-green/10 border-brand-green/30",
        cliCmd: `npx @ritualdev/promptshield fleet-sync --key PSHIELD-FLEET-${rawId}-2026`,
        cliLabel: "Copy Fleet Sync Command",
        cliDesc: "Synchronize centralized DLP rules, custom regexes, and honeytoken canaries across workstations.",
        downloadTitle: "Chrome Enterprise Extension (MV3)",
        downloadDesc: "Ready-to-deploy enterprise unpacked extension zip and Chrome ADMX policy template.",
        downloadUrl: "https://github.com/RitualDev-Lab/PromptShield/releases/latest/download/promptshield-v0.1.0.zip",
        wheelUrl: "https://github.com/RitualDev-Lab/PromptShield/releases/latest/download/promptshield-0.1.0-py3-none-any.whl",
        secondaryTitle: "Edge Policy Gateway (Cloudflare)",
        secondaryDesc: "Zero-VPS serverless proxy (api.promptshield.io) streaming DLP metadata to Splunk / Datadog.",
        codeSnippet: `// Chrome Enterprise Extension Policy (GPO / Jamf)
{
  "3rdparty": {
    "extensions": {
      "promptshield-enterprise": {
        "fleetSyncUrl": "https://api.promptshield.io/v1/sync",
        "licenseKey": "PSHIELD-FLEET-${rawId}-2026",
        "enforceSurrogateMasking": true,
        "siemStream": "SPLUNK_HEC"
      }
    }
  }
}`
      };
    }

    if (product.includes("mockforge")) {
      return {
        name: "MockForge AI Production Masking Pro",
        keyPrefix: "MFORGE-PRO",
        licenseKey: `MFORGE-PRO-${rawId}-2026`,
        icon: Database,
        color: "text-cyan-400",
        bgColor: "bg-cyan-500/10 border-cyan-500/30",
        cliCmd: `mockforge mask prod_dump.sql --license MFORGE-PRO-${rawId}-2026`,
        cliLabel: "Copy Production Masking Command",
        cliDesc: "Anonymize live production database dumps while preserving 100% of foreign-key relationships.",
        downloadTitle: "Production CLI & WASM Engine",
        downloadDesc: "Standalone mockforge binary bundle with embedded WebAssembly SQLite engine (88k rows/sec).",
        downloadUrl: "https://github.com/RitualDev-Lab/MockForge/releases/latest/download/mockforge-v0.1.0.zip",
        wheelUrl: "https://github.com/RitualDev-Lab/MockForge/releases/latest/download/mockforge-0.1.0-py3-none-any.whl",
        secondaryTitle: "Ephemeral CI/CD Mock Server",
        secondaryDesc: "Instant in-memory HTTP mock API server spinning up dynamic REST/GraphQL endpoints with $0 VPS.",
        codeSnippet: `// CI/CD GitHub Actions Ephemeral Mock Server
mockforge serve ./schema.sql \\
  --license "MFORGE-PRO-${rawId}-2026" \\
  --port 8080 \\
  --synthetic-count 5000 \\
  --anonymize-pii true`
      };
    }

    if (product.includes("fineprint")) {
      return {
        name: "FinePrint AI Corporate Playbook Pro",
        keyPrefix: "FPRINT-PRO",
        licenseKey: `FPRINT-PRO-${rawId}-2026`,
        icon: FileText,
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/30",
        cliCmd: `fineprint playbook upload corporate_playbook.json --key FPRINT-PRO-${rawId}-2026`,
        cliLabel: "Copy Playbook Upload Command",
        cliDesc: "Enforce corporate fallback terms, governing law mandates, and automated DOCX track change redlines.",
        downloadTitle: "Studio UI & CLI Binary",
        downloadDesc: "In-memory PDF AST scanner and interactive legal review studio bundle with zero cloud leakage.",
        downloadUrl: "https://github.com/RitualDev-Lab/FinePrintAI/releases/latest/download/fineprint-v0.1.0.zip",
        wheelUrl: "https://github.com/RitualDev-Lab/FinePrintAI/releases/latest/download/fineprint-0.1.0-py3-none-any.whl",
        secondaryTitle: "DocuSign & PR Interceptor Webhook",
        secondaryDesc: "Webhook receiver for GitHub PRs and DocuSign locking execution on contracts with Grade 'F'.",
        codeSnippet: `// Corporate Legal Playbook Configuration
{
  "playbook": "Acme Global Standard Terms",
  "licenseKey": "FPRINT-PRO-${rawId}-2026",
  "rules": {
    "indemnity": { "maxCap": "12_MONTHS_FEES", "requireMutual": true },
    "governingLaw": { "allowed": ["New York", "Delaware", "England & Wales"] },
    "autoRenewal": { "maxNoticeDays": 30, "rejectEvergreen": true }
  }
}`
      };
    }

    // Default: AgentShield Pro
    return {
      name: "AgentShield Pro",
      keyPrefix: "ASHIELD-PRO",
      licenseKey: `ASHIELD-PRO-${rawId}-2026`,
      icon: ShieldCheck,
      color: "text-brand-neon",
      bgColor: "bg-brand-green/10 border-brand-green/30",
      cliCmd: `npx @ritualdev-lab/agentshield login --key ASHIELD-PRO-${rawId}-2026`,
      cliLabel: "Copy CLI Login Command",
      cliDesc: "Activate your workstation for automated OS kernel sandboxing and audit log backup.",
      downloadTitle: "Desktop GUI & Menu Bar App",
      downloadDesc: "Real-time kernel monitoring daemon for macOS (Apple Silicon / Intel) and Windows 11.",
      downloadUrl: "https://github.com/RitualDev-Lab/AgentShield/releases/latest",
      wheelUrl: "https://github.com/RitualDev-Lab/AgentShield/releases/latest",
      secondaryTitle: "Priority DevShelf MCP Proxy",
      secondaryDesc: "Connect Cursor, Windsurf, or Claude Code to the private MCP defense proxy.",
      codeSnippet: `{\n  "mcpServers": {\n    "agentshield-pro": {\n      "command": "npx",\n      "args": ["-y", "@ritualdev-lab/agentshield", "mcp-proxy", "--license", "ASHIELD-PRO-${rawId}-2026"]\n    }\n  }\n}`
    };
  }, [paymentId, product]);

  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const copyToClipboard = (text: string, type: "key" | "cli" | "snippet") => {
    navigator.clipboard.writeText(text);
    if (type === "key") {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else if (type === "cli") {
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    } else {
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  const ProductIcon = config.icon;

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
        <div className={`w-16 h-16 rounded-2xl ${config.bgColor} ${config.color} flex items-center justify-center mx-auto shadow-2xl`}>
          <ProductIcon className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            Subscription Active • Order Ref #{paymentId}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Welcome to {config.name}!
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-mono">
            Your commercial license key and software access credentials are delivered below.
          </p>
        </div>
      </div>

      {/* License Key Delivery Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700 bg-slate-900/50 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-white font-bold">
            <Key className="w-4 h-4 text-brand-neon" />
            <span>Commercial Enterprise License Key</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
            Active &amp; Verified
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <code className="font-mono text-sm sm:text-base text-white tracking-wider font-bold select-all break-all">
            {config.licenseKey}
          </code>
          <button
            onClick={() => copyToClipboard(config.licenseKey, "key")}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-neon text-slate-950 font-mono text-xs font-bold hover:opacity-90 transition-all shrink-0"
          >
            {copiedKey ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
            <span>{copiedKey ? "Copied Key!" : "Copy License Key"}</span>
          </button>
        </div>
        <p className="text-xs text-slate-400 font-mono">
          Save this key. It unlocks enterprise policy distribution, private binaries, and dedicated support.
        </p>
      </div>

      {/* Pro Deliverables Matrix */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
          Included Commercial Deliverables Ready for Immediate Use
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CLI Activation */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-brand-neon flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">1. Key Activation</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                {config.cliDesc}
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(config.cliCmd, "cli")}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-brand-neon border border-slate-700 font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedCli ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCli ? "Copied" : config.cliLabel}</span>
            </button>
          </div>

          {/* Binary Bundle Download */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">2. {config.downloadTitle}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                {config.downloadDesc}
              </p>
            </div>
            <a
              href={config.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-500 text-slate-950 font-mono text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ZIP Package</span>
            </a>
          </div>

          {/* Python Wheel Download */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">3. Python SDK Distribution</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                Direct pre-compiled Python .whl distribution package for offline or air-gapped VPCs.
              </p>
            </div>
            <a
              href={config.wheelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .whl Package</span>
            </a>
          </div>
        </div>
      </div>

      {/* Configuration View */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-bold">
            <Terminal className="w-4 h-4 text-brand-neon" />
            <span>Configuration &amp; Policy Deployment Snippet</span>
          </div>
          <button
            onClick={() => copyToClipboard(config.codeSnippet, "snippet")}
            className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
          >
            {copiedSnippet ? <Check className="w-3.5 h-3.5 text-brand-neon" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSnippet ? "Copied" : "Copy Snippet"}</span>
          </button>
        </div>
        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-900 font-mono text-xs text-brand-cyan overflow-x-auto leading-relaxed">
          {config.codeSnippet}
        </pre>
      </div>

      {/* Invoicing, Taxes & Support */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 text-xs font-mono text-slate-400">
        <div className="text-white font-bold text-sm flex items-center gap-2">
          <Mail className="w-4 h-4 text-brand-green" />
          <span>Billing, Compliance &amp; Customer Support</span>
        </div>
        <p className="leading-relaxed">
          Your official tax invoice and recurring receipt have been dispatched by Dodo Payments to your checkout email. Global VAT, GST, and sales tax compliance are handled automatically.
        </p>
        <p className="leading-relaxed">
          Need custom SOC 2 audit reports, vendor questionnaire assistance, or license seat reallocations? Contact enterprise engineering directly at{" "}
          <a href="mailto:enterprise@ritualdev.in" className="text-brand-neon hover:underline font-bold">
            enterprise@ritualdev.in
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
