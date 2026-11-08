"use client";

import { useState, useMemo } from "react";
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
  Server,
  Zap
} from "lucide-react";

export default function PromptShieldPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [demoInput, setDemoInput] = useState("Here is our Stripe key: sk_mock_stripe_key_demo998877 and AWS AKIAIOSFODNN7EXAMPLE for user john.doe@acme.corp (SSN: 123-45-6789)");
  const [isMasked, setIsMasked] = useState(true);

  const presets = [
    {
      label: "Stripe & AWS Keys",
      payload: "Deploy config: STRIPE_SECRET=sk_mock_stripe_sec_key_demo998877 and AWS_KEY=AKIAIOSFODNN7EXAMPLE to us-east-1."
    },
    {
      label: "Postgres Prod URI",
      payload: "Connect to production cluster: postgresql://admin_user:demo_masked_pw@db-prod.internal.corp:5432/finance_ledger"
    },
    {
      label: "Patient Healthcare PII",
      payload: "Patient Name: Eleanor Vance, DOB: 1984-07-12, SSN: 456-78-9012, Diagnosis: Acute Hypertension, Rx: Lisinopril 20mg."
    },
    {
      label: "OpenAI + JWT Token",
      payload: "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.signature and AI_SECRET=sk-mock-demo-key-12345"
    }
  ];

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Shannon Entropy calculation on prompt text
  const entropy = useMemo(() => {
    if (!demoInput || demoInput.length === 0) return 0;
    const freq: { [key: string]: number } = {};
    for (const char of demoInput) {
      freq[char] = (freq[char] || 0) + 1;
    }
    let h = 0;
    for (const char in freq) {
      const p = freq[char] / demoInput.length;
      h -= p * Math.log2(p);
    }
    return Math.round(h * 100) / 100;
  }, [demoInput]);

  const { maskedText, redactionCount } = useMemo(() => {
    let count = 0;
    let result = demoInput;

    const rules = [
      { regex: /sk_(?:live|test|mock)_[a-zA-Z0-9_-]{10,}/g, replacement: "[REDACTED_STRIPE_KEY]" },
      { regex: /AKIA[0-9A-Z]{16}/g, replacement: "[REDACTED_AWS_ACCESS_KEY]" },
      { regex: /sk-[a-zA-Z0-9_-]{10,}/g, replacement: "[REDACTED_AI_API_KEY]" },
      { regex: /postgresql:\/\/[^@\s]+@[^\/\s]+\/[^\s]+/g, replacement: "postgresql://[REDACTED_CREDENTIALS]@[REDACTED_HOST]/[DATABASE]" },
      { regex: /\b\d{3}-\d{2}-\d{4}\b/g, replacement: "[REDACTED_SSN]" },
      { regex: /eyJ[a-zA-Z0-9_-]+\.eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/g, replacement: "[REDACTED_JWT_AUTH_TOKEN]" },
      { regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, replacement: "[REDACTED_EMAIL_PII]" }
    ];

    rules.forEach(({ regex, replacement }) => {
      const matches = result.match(regex);
      if (matches) {
        count += matches.length;
        result = result.replace(regex, replacement);
      }
    });

    return { maskedText: result, redactionCount: count };
  }, [demoInput]);

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
              Zero-signup live sandbox. Click a preset payload or paste your own secret text below to test real-time CPU evaluation.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMasked(!isMasked)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs border border-slate-700 transition"
            >
              {isMasked ? "Show Raw Prompt" : "1-Click Redact & Sanitize"}
            </button>
            <button
              onClick={() => copyText(isMasked ? maskedText : demoInput, "output-copy")}
              className="px-3 py-2 rounded-xl bg-brand-green/10 text-brand-neon hover:bg-brand-green/20 font-mono text-xs border border-brand-green/30 flex items-center gap-1.5 transition"
            >
              {copied === "output-copy" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied === "output-copy" ? "Copied" : "Copy Output"}</span>
            </button>
          </div>
        </div>

        {/* Clickable Preset Quick-Pills */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
            <Zap className="w-3 h-3 text-brand-neon" /> Presets:
          </span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setDemoInput(preset.payload);
                setIsMasked(true);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-mono text-[11px] transition"
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Client Prompt Input (ChatGPT / Claude / Gemini)</span>
              <span className="text-amber-400 font-bold">Entropy: H={entropy}</span>
            </div>
            <textarea
              value={demoInput}
              onChange={(e) => setDemoInput(e.target.value)}
              rows={5}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 font-mono text-xs text-slate-200 focus:outline-none focus:border-brand-neon/60 resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>PromptShield Inspected &amp; Surrogate-Redacted Prompt</span>
              <span className="text-brand-neon font-bold">{redactionCount} {redactionCount === 1 ? "secret" : "secrets"} neutralized</span>
            </div>
            <div className="w-full h-[120px] rounded-xl bg-slate-900 border border-slate-800 p-3 font-mono text-xs text-brand-neon overflow-y-auto leading-relaxed">
              {isMasked ? maskedText : demoInput}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono text-slate-400">
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span>Latency</span>
            <span className="text-brand-neon font-bold">&lt; 1.8 ms</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span>Cloud Compute Cost</span>
            <span className="text-brand-neon font-bold">$0.00 / mo</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span>Shannon Entropy</span>
            <span className="text-amber-400 font-bold">H &gt; 4.5 Filtered</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span>Signatures Audited</span>
            <span className="text-white font-bold">60+ Rule Engine</span>
          </div>
        </div>
      </div>

      {/* Target Platforms Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Protected AI Chat Platforms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((plat) => (
            <div key={plat.name} className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{plat.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-green/10 text-brand-neon border border-brand-green/30">
                  {plat.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">{plat.domains}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise Capabilities */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Enterprise Fleet Governance &amp; SIEM Sinks</h2>
          <p className="text-sm text-slate-400 mt-1">Deploy across thousands of corporate workstations with centralized compliance controls.</p>
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
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Stop Accidental AI Leaks Today</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          Install PromptShield on Chromium-based browsers or integrate PromptShield-Core into your internal developer proxy fleets.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/RitualDev-Lab/PromptShield/releases/latest"
            className="px-6 py-3 rounded-xl bg-brand-neon text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(0,245,155,0.3)] hover:brightness-110 transition"
          >
            Download Free Community Extension
          </a>
          <a
            href="https://checkout.dodopayments.com/buy/pdt_0NrFSkF5XLgBppfQRxgXN?quantity=1&redirect_url=https%3A%2F%2Fritualdev.in%2Fpricing%2Fsuccess%3Fproduct%3Dpromptshield"
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition"
          >
            Deploy Enterprise Fleet ($49/mo)
          </a>
        </div>
      </div>

    </div>
  );
}
