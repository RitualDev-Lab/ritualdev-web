"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShieldAlert, 
  Terminal, 
  Lock, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  Cpu,
  Layers,
  FileCode,
  AlertTriangle,
  Download,
  Check,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Radio,
  Server
} from "lucide-react";

export default function PromptShieldPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [demoInput, setDemoInput] = useState("Here is our Stripe key: sk_test_51M0demo998877665544332211 and AWS AKIAIOSFODNN7EXAMPLE");
  const [isMasked, setIsMasked] = useState(false);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const getMaskedPrompt = (input: string) => {
    return input
      .replace(/sk_test_[a-zA-Z0-9]{20,}/g, "[REDACTED_STRIPE_SECRET_KEY]")
      .replace(/AKIA[0-9A-Z]{16}/g, "[REDACTED_AWS_ACCESS_KEY]");
  };

  const platforms = [
    { name: "OpenAI ChatGPT", domains: "chatgpt.com, chat.openai.com", badge: "Universal Hook" },
    { name: "Anthropic Claude", domains: "claude.ai", badge: "ProseMirror Observer" },
    { name: "Google Gemini", domains: "gemini.google.com", badge: "Shadow DOM Interceptor" },
    { name: "DeepSeek Chat", domains: "chat.deepseek.com", badge: "React State Binder" },
    { name: "Microsoft Copilot", domains: "copilot.microsoft.com", badge: "Isolation Hook" },
    { name: "Perplexity AI", domains: "perplexity.ai", badge: "Prompt Watcher" }
  ];

  const enterpriseFeatures = [
    {
      title: "Central Fleet Policy Sync",
      desc: "Push company-wide regex rules, project codenames, and forbidden IP signatures across 10,000+ workstations via api.promptshield.io with HMAC-SHA256 signatures.",
      icon: Radio
    },
    {
      title: "Real-Time SIEM & SOC Streaming",
      desc: "Turnkey telemetry exporters for Splunk HEC, Datadog Logs, and ArcSight / Microsoft Sentinel Common Event Format (CEF) with zero plaintext leakage.",
      icon: Server
    },
    {
      title: "Synthetic Canary Honeypots",
      desc: "Injects decoy API tokens and canary credentials into employee browser sessions to mathematically detect if third-party LLMs retain private customer data.",
      icon: Sparkles
    },
    {
      title: "Windows GPO & Jamf Deployments",
      desc: "Pre-configured Chrome Enterprise ExtensionInstallForcelist policies, Chromium master preferences, and Windows Registry .admx templates.",
      icon: Lock
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link href="/" className="hover:text-brand-neon">Home</Link>
        <span>/</span>
        <span className="text-brand-neon">PromptShield</span>
      </div>

      {/* Hero Header */}
      <div className="border-b border-slate-800 pb-12 space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-brand-green/10 text-brand-neon border border-brand-green/30 shadow-[0_0_30px_rgba(0,245,155,0.2)]">
            <ShieldAlert className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">PromptShield</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-green/10 text-brand-neon border border-brand-green/40 text-xs font-mono">
                v0.1.0 Released
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-mono">
                $0 VPS Runtimes
              </span>
            </div>
            <p className="text-slate-400 text-sm sm:text-base font-mono mt-1">
              Enterprise In-Browser AI Data Loss Prevention (DLP) &amp; Prompt Firewall
            </p>
          </div>
        </div>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          PromptShield stops API credentials, database URIs, employee PII, and project codenames from leaking into public AI chatbots (<strong>ChatGPT, Claude, Gemini, DeepSeek, Copilot, Perplexity</strong>). Evaluates prompts locally in volatile browser memory in &lt; 4ms with <strong>$0 recurring cloud compute cost</strong>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 items-center pt-2">
          <a
            href="https://github.com/RitualDev-Lab/PromptShield/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-neon text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(0,245,155,0.3)] hover:brightness-110 transition"
          >
            <Download className="w-4 h-4" />
            <span>Download Extension (v0.1.0)</span>
          </a>

          <a
            href="https://checkout.dodopayments.com/buy/pdt_0NrFSkF5XLgBppfQRxgXN?quantity=1&redirect_url=https%3A%2F%2Fritualdev.in%2Fpricing%2Fsuccess%3Fproduct%3Dpromptshield"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-brand-green/40 hover:border-brand-neon text-brand-neon font-bold text-sm transition"
          >
            <span>Upgrade to Enterprise Fleet ($49/mo)</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="https://github.com/RitualDev-Lab/PromptShield"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-mono text-sm transition"
          >
            <span>Public Repo &amp; Docs</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Quick CLI Row */}
        <div className="flex flex-wrap gap-3 pt-4">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">
            <span className="text-brand-neon">$</span>
            <span>pip install promptshield</span>
            <button onClick={() => copyText("pip install promptshield", "pip")} className="ml-2 text-slate-400 hover:text-white">
              {copied === "pip" ? <CheckCircle2 className="w-3.5 h-3.5 text-brand-neon" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">
            <span className="text-brand-neon">$</span>
            <span>npm install @ritualdev/promptshield</span>
            <button onClick={() => copyText("npm install @ritualdev/promptshield", "npm")} className="ml-2 text-slate-400 hover:text-white">
              {copied === "npm" ? <CheckCircle2 className="w-3.5 h-3.5 text-brand-neon" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Simulation / Live Sandbox */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-brand-neon" />
              <span>Interactive In-Browser DLP Simulator</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Type or paste secrets below. PromptShield evaluates regex signatures and Shannon entropy (<span className="font-mono text-brand-neon">H &gt; 4.5</span>) on CPU.
            </p>
          </div>
          <button
            onClick={() => setIsMasked(!isMasked)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs border border-slate-700 transition"
          >
            {isMasked ? "Show Raw Prompt" : "1-Click Redact & Sanitize"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400">Client Prompt Input (ChatGPT / Claude / Gemini)</label>
            <textarea
              value={demoInput}
              onChange={(e) => setDemoInput(e.target.value)}
              rows={4}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 font-mono text-xs text-slate-200 focus:outline-none focus:border-brand-neon/60 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400">PromptShield Inspected &amp; Surrogate-Redacted Prompt</label>
            <div className="w-full h-[96px] rounded-xl bg-slate-900 border border-slate-800 p-3 font-mono text-xs text-brand-neon overflow-y-auto">
              {isMasked ? getMaskedPrompt(demoInput) : demoInput}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-slate-400">
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span>Latency</span>
            <span className="text-brand-neon font-bold">&lt; 3.8 ms</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span>Cloud Compute Cost</span>
            <span className="text-brand-neon font-bold">$0.00 / mo</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span>Signatures Audited</span>
            <span className="text-white font-bold">60+ Rules + Shannon Entropy</span>
          </div>
        </div>
      </div>

      {/* Target Platforms Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Protected AI Chat Platforms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((p, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">{p.name}</span>
                <span className="px-2 py-0.5 rounded-md bg-brand-green/10 text-brand-neon border border-brand-green/20 text-[10px] font-mono">
                  {p.badge}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">{p.domains}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise Capabilities */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Enterprise Fleet Capabilities</h2>
            <p className="text-sm text-slate-400 mt-1">Available under the PromptShield Enterprise License for high-compliance engineering teams.</p>
          </div>
          <Link
            href="/enterprise"
            className="text-xs font-mono text-brand-neon hover:underline flex items-center gap-1"
          >
            <span>Learn about Enterprise Governance Suite</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enterpriseFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-green/10 text-brand-neon border border-brand-green/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{feat.title}</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-brand-green/30 text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Protect Your Company Prompts Today</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          Start for free on your personal laptop or deploy company-wide fleet policies with zero backend server overhead.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/RitualDev-Lab/PromptShield/releases/latest"
            className="px-6 py-3 rounded-xl bg-brand-neon text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(0,245,155,0.3)] hover:brightness-110 transition"
          >
            Download Free Community Release
          </a>
          <a
            href="https://checkout.dodopayments.com/buy/pdt_0NrFSkF5XLgBppfQRxgXN?quantity=1&redirect_url=https%3A%2F%2Fritualdev.in%2Fpricing%2Fsuccess%3Fproduct%3Dpromptshield"
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition"
          >
            Purchase Commercial Fleet Key ($49/mo)
          </a>
        </div>
      </div>

    </div>
  );
}
