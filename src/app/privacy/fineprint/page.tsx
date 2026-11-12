import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, FileText, Lock, EyeOff, Terminal, Scale, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy for FinePrint AI — RitualDev",
  description: "Official Privacy Policy and Data Safety Disclosures for FinePrint AI (Legal Document & Terms of Service Risk Analyzer). 100% Confidential, Zero Document Retention.",
  alternates: {
    canonical: "https://ritualdev.in/privacy/fineprint/",
  }
};

export default function FinePrintPrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Back Link */}
      <div className="mb-8">
        <Link href="/privacy" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO PRIVACY CENTER</span>
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-slate-800 pb-8 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>LEGAL TECH PRIVACY POLICY &middot; LAST UPDATED: NOVEMBER 7, 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Privacy Policy for FinePrint AI
        </h1>
        <div className="text-xs font-mono text-slate-400 mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>Product: <code className="text-amber-400">FinePrint AI (Studio UI, CLI &amp; Python SDK)</code></span>
          <span>&middot;</span>
          <span>Repository: <code className="text-slate-300">RitualDev-Lab/FinePrintAI</code></span>
          <span>&middot;</span>
          <span>Category: <code className="text-brand-green">Legal Analysis &amp; Contract Guardrails</code></span>
          <span>&middot;</span>
          <span>Developer: <code className="text-slate-300">RitualDev Studio</code></span>
        </div>
      </div>

      <div className="space-y-10 text-sm text-slate-300 leading-relaxed font-sans">
        
        {/* Executive Guarantee Card */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/30">
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Absolute Legal Privilege Mandate: Zero Document Training Retention</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            FinePrint AI analyzes Terms of Service (ToS), Master Service Agreements (MSAs), End User License Agreements (EULAs), and vendor NDAs to detect predatory indemnity clauses, unilateral arbitration mandates, data harvesting waivers, and hidden liability traps. FinePrint AI is built under an absolute <strong>Zero Document Retention and Zero LLM Training Guarantee</strong>. Your contracts and legal agreements are <strong>NEVER stored on our servers, read by our engineers, or used to train third-party AI models</strong>.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <span>1. What FinePrint AI Evaluates</span>
          </h2>
          <p>
            When you inspect a legal agreement via the FinePrint Studio UI or CLI, analysis executes with strict memory isolation:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>EPHEMERAL CLAUSE EXTRACTION</span>
              </div>
              <p className="text-slate-300">
                Parses PDF, Markdown, and plaintext contracts into normalized semantic sections in local RAM. Analyzes clauses against our 40+ predatory legal pattern definitions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-brand-green flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ZERO TRAINING RETENTION</span>
              </div>
              <p className="text-slate-300">
                Any LLM inferences utilize zero-retention enterprise API endpoints with cryptographically enforced data boundary agreements. Your proprietary contracts are never ingested for model weight fine-tuning.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>LOCAL ON-PREMISE ENGINE</span>
              </div>
              <p className="text-slate-300">
                Enterprise teams can run FinePrint AI completely air-gapped on private VPCs using local open-weights models (Llama 3, Mistral) without sending a single byte over the public internet.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-purple-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CRYPTOGRAPHIC REPORT AUDITS</span>
              </div>
              <p className="text-slate-300">
                Risk scorecards and executive clause summaries are saved locally as markdown or PDF reports with client-side SHA-256 seals.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-rose-400" />
            <span>2. What We Never Collect or Monetize</span>
          </h2>
          <p>
            Legal confidentiality is protected by design:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
            <li>We <strong>NEVER</strong> retain uploaded contract PDFs or docx files in persistent cloud buckets.</li>
            <li>We <strong>NEVER</strong> log customer party names, signatory identities, or proprietary transaction values.</li>
            <li>We <strong>NEVER</strong> sell aggregate legal insights or contract clauses to marketing companies or data brokers.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-green" />
            <span>3. User Data Ownership &amp; Erasure</span>
          </h2>
          <p>
            You retain 100% legal ownership of your documents and generated risk audits:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
            <li>Closing your browser session or clearing the Studio UI immediately wipes all parsed text from browser memory.</li>
            <li>CLI and Python SDK outputs are written directly to your local file path and are completely under your file access control.</li>
          </ul>
        </section>

        {/* Section 4: Contact */}
        <section className="space-y-4 p-6 rounded-2xl glass-panel border border-slate-800 bg-slate-900/80">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-400" />
            <span>4. Contact &amp; Support</span>
          </h2>
          <div className="text-xs font-mono text-slate-300 space-y-1.5 pt-2">
            <div>Developer Support: <a href="mailto:developer@ritualdev.in" className="text-amber-400 hover:underline">developer@ritualdev.in</a></div>
            <div>Security Desk: <a href="mailto:security@ritualdev.in" className="text-brand-green hover:underline">security@ritualdev.in</a></div>
            <div>Product Showcase: <Link href="/fineprint" className="text-amber-400 hover:underline">https://ritualdev.in/fineprint</Link></div>
            <div>Main Studio: <Link href="https://ritualdev.in" className="text-amber-400 hover:underline">https://ritualdev.in</Link></div>
          </div>
        </section>

      </div>

    </div>
  );
}
