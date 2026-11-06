"use client";

import { useState } from "react";
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
  PenTool
} from "lucide-react";

export default function FinePrintPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const riskCategories = [
    {
      name: "Indemnification",
      risk: "Uncapped indemnification for third-party IP or breach without reciprocity.",
      fix: "Mutual indemnity capped at 12 months total fees paid."
    },
    {
      name: "Liability Caps",
      risk: "Vendor liability capped at $100 while client bears unlimited consequential damages.",
      fix: "Mutual 1x–2x contract value aggregate liability cap."
    },
    {
      name: "IP Assignment",
      risk: "Broad work-for-hire provisions transferring client background IP and toolkits.",
      fix: "Explicit retention of background IP with standard limited license."
    },
    {
      name: "Termination & Renewal",
      risk: "Sneaky 120-day automatic evergreen renewals with early termination penalties.",
      fix: "30-day non-renewal notice window and prorated refunds upon termination."
    },
    {
      name: "Non-Compete & Solicitation",
      risk: "Overbroad worldwide non-compete clauses blocking ordinary engineering hiring.",
      fix: "Limited non-solicitation restricted to project key personnel only."
    },
    {
      name: "Governing Law & Disputes",
      risk: "Mandatory litigation in remote offshore jurisdictions (Cayman / BVI).",
      fix: "Neutral state governing law (New York / Delaware / UK Commercial Court)."
    }
  ];

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
        <span className="text-brand-neon">FinePrint AI</span>
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
            <span>pip install fineprint</span>
            <button onClick={() => copyText("pip install fineprint", "pip")} className="ml-2 text-slate-400 hover:text-white">
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

      {/* 60+ Legal Risk Categories Grid */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Key Risk Categories Inspected</h2>
          <p className="text-sm text-slate-400 mt-1">FinePrint AI evaluates clauses across 6 non-negotiable legal categories to generate executive scorecards and line-by-line redlines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {riskCategories.map((rc, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">{rc.name}</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono">
                  Inspected
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <p className="text-red-400"><strong className="text-red-300">Common Trap:</strong> {rc.risk}</p>
                <p className="text-brand-neon"><strong className="text-emerald-300">FinePrint Redline:</strong> {rc.fix}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise Capabilities */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Enterprise Legal Tech &amp; Contract Ops</h2>
          <p className="text-sm text-slate-400 mt-1">Empower in-house general counsel and procurement teams to accelerate deal velocity without missing high-risk liabilities.</p>
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
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Never Sign an Unaudited Contract Again</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          Scan any PDF, DOCX, or markdown lease or agreement in seconds. Export clean redlines ready to send back to counterparty counsel.
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
            Purchase Corporate Playbook Pro ($79/mo)
          </a>
        </div>
      </div>

    </div>
  );
}
