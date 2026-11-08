"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  FileText, 
  Terminal, 
  Scale, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Cpu, 
  Layers, 
  FileCode, 
  Download, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Server, 
  Zap, 
  AlertOctagon, 
  FileSearch, 
  PenTool,
  ShieldAlert
} from "lucide-react";

export default function FinePrintPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);

  const presets = [
    {
      title: "Uncapped Indemnification Trap",
      clause: "Vendor shall defend, indemnify, and hold harmless Client from and against any and all claims, losses, damages, liabilities, and expenses arising out of or related to any breach of this Agreement without limitation or monetary cap.",
      grade: "Grade F (High Risk)",
      rule: "Rule #14: Asymmetric Uncapped Indemnity",
      rationale: "Exposes vendor to catastrophic unlimited liability for indirect third-party claims.",
      redline: "Vendor shall defend, indemnify, and hold harmless Client from and against direct claims, losses, and damages arising out of Vendor's gross negligence or willful misconduct, provided that Vendor's aggregate liability under this Section shall not exceed the total fees paid by Client in the preceding twelve (12) months."
    },
    {
      title: "120-Day Evergreen Auto-Renewal",
      clause: "This Agreement shall automatically renew for successive two (2) year terms unless Client provides written notice of termination at least one hundred twenty (120) days prior to the expiration of the then-current term.",
      grade: "Grade D (Medium Risk)",
      rule: "Rule #28: Evergreen Auto-Renewal Trap",
      rationale: "Unusually long 120-day notice window creates accidental lock-in and budget surprises.",
      redline: "This Agreement shall renew for successive one (1) year terms only upon mutual written agreement of both parties, or upon thirty (30) days advance written non-renewal notice prior to the end of the term."
    },
    {
      title: "Broad IP Work-for-Hire Trap",
      clause: "All inventions, improvements, software toolkits, background frameworks, and deliverables created during the term shall be deemed 'work made for hire' and sole property of Client upon inception.",
      grade: "Grade F (Critical Risk)",
      rule: "Rule #07: Background Pre-Existing IP Forfeiture",
      rationale: "Stripping vendor of pre-existing software toolkits and core frameworks violates basic open-source and SaaS operational norms.",
      redline: "Deliverables specifically custom-built for Client shall be owned by Client upon full payment; provided, however, that Vendor retains all right, title, and interest in and to its pre-existing tools, libraries, and background IP, granting Client a non-exclusive, perpetual license thereto."
    }
  ];

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const currentPreset = presets[selectedPresetIndex];

  const enterpriseFeatures = [
    {
      title: "Corporate Legal Playbook Customizer",
      desc: "Upload your company's standard fallback terms and non-negotiables. FinePrint AI automatically scores incoming vendor agreements against your unique corporate playbook.",
      icon: Scale
    },
    {
      title: "Bulk Legacy Contract Auditing",
      desc: "Batch scan thousands of legacy NDAs, MSAs, and commercial leases stored across Google Drive, Dropbox, or AWS S3 to uncover latent liabilities and expiring renewal dates.",
      icon: FileSearch
    },
    {
      title: "DocuSign & PandaDoc Webhook Interceptor",
      desc: "Intercepts contracts before final e-signature. If a document scores a Grade 'F' (Unacceptable), the execution workflow is automatically locked until legal counsel signs off.",
      icon: PenTool
    },
    {
      title: "Zero-Cloud In-Memory Processing",
      desc: "PDF AST parsing and semantic clause chunking occur in local volatile memory. Non-public legal agreements are never uploaded to persistent cloud storage.",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link href="/" className="hover:text-brand-neon">Home</Link>
        <span>/</span>
        <span className="text-amber-400">FinePrint AI</span>
      </div>

      {/* Hero Header */}
      <div className="border-b border-slate-800 pb-12 space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            <FileText className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">FinePrint AI</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/40 text-xs font-mono">
                v0.1.0 Released
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-mono">
                60+ Legal Signatures
              </span>
            </div>
            <p className="text-slate-400 text-sm sm:text-base font-mono mt-1">
              In-Memory Contract, Lease &amp; NDA Scanner &amp; Redline Synthesizer
            </p>
          </div>
        </div>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          FinePrint AI scans commercial contracts, leases, NDAs, and SaaS terms to grade risk from <strong>A (Acceptable)</strong> to <strong>F (Unacceptable)</strong> and synthesize attorney-grade redline amendments in seconds. Built with an <strong>in-memory PDF AST parser</strong>, <strong>60+ legal rules</strong>, and <strong>Gemini 1.5 Flash</strong> with zero persistent cloud leakage ($0 VPS).
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 items-center pt-2">
          <a
            href="https://github.com/RitualDev-Lab/FinePrintAI/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:brightness-110 transition"
          >
            <Download className="w-4 h-4" />
            <span>Download Release v0.1.0</span>
          </a>

          <a
            href="https://checkout.dodopayments.com/buy/pdt_0NrFSkF5XLgBppfQRxgXN?quantity=1&redirect_url=https%3A%2F%2Fritualdev.in%2Fpricing%2Fsuccess%3Fproduct%3Dfineprint"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-amber-500/40 hover:border-amber-400 text-amber-400 font-bold text-sm transition"
          >
            <span>Upgrade to Corporate Playbook Pro ($79/mo)</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="https://github.com/RitualDev-Lab/FinePrintAI"
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
            <span className="text-amber-400">$</span>
            <span>pip install fineprint-ai</span>
            <button onClick={() => copyText("pip install fineprint-ai", "pip")} className="ml-2 text-slate-400 hover:text-white">
              {copied === "pip" ? <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">
            <span className="text-amber-400">$</span>
            <span>npm install -g @ritualdev/fineprint</span>
            <button onClick={() => copyText("npm install -g @ritualdev/fineprint", "npm")} className="ml-2 text-slate-400 hover:text-white">
              {copied === "npm" ? <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Simulation / Live Sandbox */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              <span>Interactive In-Memory Clause Auditor &amp; Redline Simulator</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select a toxic contract clause below to inspect the detected rule hazard and attorney-grade redline amendment.
            </p>
          </div>
          <button
            onClick={() => copyText(currentPreset.redline, "redline-copy")}
            className="px-3.5 py-2 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 font-mono text-xs border border-amber-500/30 flex items-center gap-1.5 transition"
          >
            {copied === "redline-copy" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied === "redline-copy" ? "Copied Redline" : "Copy Redline Amendment"}</span>
          </button>
        </div>

        {/* Preset Clause Buttons */}
        <div className="flex items-center gap-2 flex-wrap border-b border-slate-800 pb-3">
          {presets.map((p, idx) => (
            <button
              key={p.title}
              onClick={() => setSelectedPresetIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                selectedPresetIndex === idx
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Incoming Vendor Clause</span>
              <span className="text-red-400 font-bold px-2 py-0.5 rounded bg-red-950/60 border border-red-900">
                {currentPreset.grade}
              </span>
            </div>
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-red-300/90 overflow-y-auto h-[160px] leading-relaxed">
              <p>{currentPreset.clause}</p>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <span className="text-amber-400 font-semibold">{currentPreset.rule}:</span> {currentPreset.rationale}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">FinePrint AI Synthesized Redline Amendment</span>
              <span className="text-brand-neon font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-900">
                Grade A (Standard Protected)
              </span>
            </div>
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-brand-neon overflow-y-auto h-[160px] leading-relaxed">
              <p>{currentPreset.redline}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono text-slate-400">
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span>Scan Latency</span>
            <span className="text-amber-400 font-bold">&lt; 1.2 sec</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span>Memory Mode</span>
            <span className="text-amber-400 font-bold">100% Ephemeral In-Memory</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span>Cloud Retention</span>
            <span className="text-white font-bold">$0.00 / Zero Storage</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span>Audited Signatures</span>
            <span className="text-brand-neon font-bold">60+ Legal Risk Rules</span>
          </div>
        </div>
      </div>

      {/* Enterprise Capabilities */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Enterprise Legal Operations &amp; Playbooks</h2>
          <p className="text-sm text-slate-400 mt-1">Institutional contract intelligence for high-volume corporate procurement.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enterpriseFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
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
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Protect Your Company from Asymmetric Contracts</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          Never sign an agreement without running FinePrint AI. Scan contracts locally or automate review via DocuSign webhooks.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/RitualDev-Lab/FinePrintAI/releases/latest"
            className="px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:brightness-110 transition"
          >
            Download Free Community CLI
          </a>
          <a
            href="https://checkout.dodopayments.com/buy/pdt_0NrFSkF5XLgBppfQRxgXN?quantity=1&redirect_url=https%3A%2F%2Fritualdev.in%2Fpricing%2Fsuccess%3Fproduct%3Dfineprint"
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition"
          >
            Deploy Corporate Playbook Pro ($79/mo)
          </a>
        </div>
      </div>

    </div>
  );
}
