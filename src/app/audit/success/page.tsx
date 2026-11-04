"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useState } from "react";
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Copy, 
  Check, 
  FileCheck, 
  Mail, 
  ArrowRight,
  ExternalLink
} from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || `AUDIT-${Math.floor(10000 + Math.random() * 90000)}`;
  const [copied, setCopied] = useState(false);

  const badgeMarkdown = `[![AgentShield Verified Secure](https://ritualdev.in/badge/audit.svg)](https://ritualdev.in/audit)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(badgeMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10 text-center">
      
      {/* Success Icon */}
      <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.25)]">
        <ShieldCheck className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Order #{orderId} • Payment Confirmed
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Your Pre-Launch Audit is Underway!
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-mono">
          Our automated AST shell and DAST vulnerability engines have started inspecting your target. Your full executive report and SARIF log will be delivered via email within <b>2 hours</b>.
        </p>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left font-mono text-xs">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="text-brand-cyan font-bold flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>Turnaround SLA</span>
          </div>
          <div className="text-lg font-bold text-white">&lt; 120 Minutes</div>
          <p className="text-[11px] text-slate-400">Guaranteed delivery to your contact email.</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="text-purple-400 font-bold flex items-center gap-1.5">
            <FileCheck className="w-4 h-4" />
            <span>Executive Report</span>
          </div>
          <div className="text-lg font-bold text-white">HTML + SARIF</div>
          <p className="text-[11px] text-slate-400">Interactive dashboard &amp; git diff patches.</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="text-emerald-400 font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Post-Fix Re-Scan</span>
          </div>
          <div className="text-lg font-bold text-white">100% Free</div>
          <p className="text-[11px] text-slate-400">Re-verify your Grade A+ once patches are applied.</p>
        </div>
      </div>

      {/* Live Badge Preview & Embed */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 text-left space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <span>Official "AgentShield Verified" Embed Badge</span>
          </h2>
          <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
            Live Preview
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
          {/* Live SVG Badge */}
          <img 
            src={`/api/v1/badge/audit?id=${orderId}&grade=A%2B`} 
            alt="AgentShield Verified Secure" 
            className="h-7"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Embed Markdown in README.md or Landing Page:</span>
            <button
              onClick={handleCopy}
              className="text-brand-cyan hover:underline flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Markdown"}</span>
            </button>
          </div>
          <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto">
            {badgeMarkdown}
          </pre>
        </div>
      </div>

      {/* Immediate Support & Escalation */}
      <div className="text-xs font-mono text-slate-400 space-y-2">
        <p>
          Need to add credentials, invite our bot, or ask an urgent question before launch?
        </p>
        <p>
          Reach our principal security team directly at{" "}
          <a href="mailto:security@ritualdev.in" className="text-brand-cyan hover:underline font-bold">
            security@ritualdev.in
          </a>{" "}
          (mention <b>#{orderId}</b>).
        </p>
      </div>

      <div className="pt-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition"
        >
          <span>← Return to RitualDev Homepage</span>
        </Link>
      </div>

    </div>
  );
}

export default function AuditSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen text-center py-20 font-mono text-slate-400">Loading order status...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
