import Link from "next/link";
import { Shield, Lock, FileCheck, Mail, ArrowLeft, CheckCircle2, UserCheck, AlertCircle } from "lucide-react";

export const metadata = {
  title: "DPDP Act Compliance & Data Fiduciary Disclosure — RitualDev",
  description: "Official compliance statement under India's Digital Personal Data Protection Act, 2023 (DPDP Act 2023) and global privacy regulations (GDPR, CCPA)."
};

export default function DpdpCompliancePage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      
      {/* Back Link */}
      <div>
        <Link href="/privacy" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO PRIVACY CENTER</span>
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-slate-800 pb-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
          <Shield className="w-3.5 h-3.5" />
          <span>STATUTORY DISCLOSURE &middot; DPDP ACT, 2023 (INDIA) &amp; GDPR</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Digital Personal Data Protection (DPDP) Compliance
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          RitualDev Studio (&quot;RitualDev&quot;, &quot;ritualdev.in&quot;) operates as a **Data Fiduciary** under the provisions of the <b>Digital Personal Data Protection Act, 2023 (DPDP Act 2023, Act No. 22 of 2023, Government of India)</b>. This statutory notice outlines our obligations, your lawful rights as a **Data Principal**, and our strict zero-harvesting data architecture.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-neon font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>1. Data Fiduciary Status</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            RitualDev Studio determines the purpose and means of personal data processing in strict accordance with Section 4 and Section 6 of the DPDP Act.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan font-bold">
            <Lock className="w-4 h-4" />
            <span>2. Offline-First Architecture</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            All utilities and Android applications (including All-in-One Calculator Plus) execute calculations 100% locally on-device. Zero telemetry, biometric, or location data is gathered.
          </p>
        </div>
      </div>

      {/* Lawful Grounds for Processing */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-brand-green" />
          <span>Lawful Grounds for Processing (Section 4 &amp; 6)</span>
        </h2>
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>We process digital personal data solely on the following grounds:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li><strong className="text-white">Freely Given, Specific, Informed &amp; Unambiguous Consent:</strong> Collected prior to user account registration or newsletter dispatch.</li>
            <li><strong className="text-white">Contractual Fulfillment:</strong> Processing order references, license keys, and email communication to deliver requested Pro software tiers.</li>
            <li><strong className="text-white">Statutory &amp; Tax Compliance:</strong> Invoicing, GST / VAT reporting, and cross-border financial reconciliation securely administered via Dodo Payments.</li>
          </ul>
        </div>
      </section>

      {/* Rights of the Data Principal */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-brand-cyan" />
          <span>Statutory Rights of Data Principals (Sections 11–14)</span>
        </h2>
        
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <h3 className="font-bold text-white text-sm">Right to Access Information (Section 11)</h3>
            <p className="text-slate-400">
              You are entitled to request a comprehensive summary of personal data held about you and the identities of any Data Processors involved in technical fulfillment.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <h3 className="font-bold text-white text-sm">Right to Correction &amp; Erasure (Section 12)</h3>
            <p className="text-slate-400">
              You may update misleading or incomplete personal data, or demand complete, irreversible erasure from our operational databases via our automated portal at{" "}
              <Link href="/delete-account" className="text-brand-neon hover:underline font-bold">
                ritualdev.in/delete-account
              </Link>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <h3 className="font-bold text-white text-sm">Right of Grievance Redressal (Section 13)</h3>
            <p className="text-slate-400">
              You have the right to register complaints regarding data handling directly with our designated Grievance Officer, with guaranteed statutory response within 30 days.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <h3 className="font-bold text-white text-sm">Right to Nominate (Section 14)</h3>
            <p className="text-slate-400">
              You may nominate any individual to exercise your rights under the DPDP Act in the event of death or incapacity by lodging a formal notice with our Grievance Officer.
            </p>
          </div>
        </div>
      </section>

      {/* Protection of Children */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          <span>Protection of Children&apos;s Personal Data (Section 9)</span>
        </h2>
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            In strict compliance with Section 9 of the DPDP Act, 2023, RitualDev does not knowingly process digital personal data belonging to children under 18 years without verifiable parental or lawful guardian consent.
          </p>
          <p className="text-slate-400">
            Furthermore, we engage in zero tracking, behavioral profiling, or targeted algorithmic advertising directed at minors across all web portals and Google Play applications.
          </p>
        </div>
      </section>

      {/* Grievance Redressal Officer Contact */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-brand-green/30 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Mail className="w-4 h-4 text-brand-green" />
          <span>Designated Grievance Redressal Officer (Section 13 Disclosure)</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-mono">
          For any inquiry, consent withdrawal, or grievance concerning processing of digital personal data under the DPDP Act 2023, GDPR, or CCPA, contact:
        </p>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1.5 text-slate-200">
          <div><strong className="text-white">Officer Designation:</strong> Data Protection &amp; Grievance Officer</div>
          <div><strong className="text-white">Entity:</strong> RitualDev Studio (India)</div>
          <div><strong className="text-white">Grievance Email:</strong> <a href="mailto:security@ritualdev.in" className="text-brand-neon hover:underline font-bold">security@ritualdev.in</a></div>
          <div><strong className="text-white">Alternate Support:</strong> <a href="mailto:developer@ritualdev.in" className="text-brand-cyan hover:underline">developer@ritualdev.in</a></div>
          <div><strong className="text-white">Resolution Timeline:</strong> Preliminary acknowledgment within 24 hours; full statutory resolution within 7 business days.</div>
        </div>
      </section>

    </div>
  );
}
