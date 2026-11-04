import Link from "next/link";
import { ArrowLeft, FileText, Mail } from "lucide-react";

export const metadata = {
  title: "Terms of Service — RitualDev",
  description: "Official Terms of Service for RitualDev websites, software, and applications."
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Back Link */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO RITUALDEV STUDIO</span>
        </Link>
      </div>

      <div className="border-b border-slate-800 pb-8 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
          <span>LEGAL TERMS &middot; LAST REVISED: JULY 31, 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <div className="text-xs font-mono text-slate-400 mt-2">
          RitualDev Studio &middot; ritualdev.in
        </div>
      </div>

      <div className="space-y-8 text-sm text-slate-300 leading-relaxed font-sans">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
          <p>
            By accessing RitualDev websites, downloading our Android applications from Google Play, or using our open-source software repositories, you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Permitted Use</h2>
          <p>
            You are granted a non-exclusive license to use our software for personal and business calculation, security inspection, and productivity workflows in accordance with applicable laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Open-Source Software Licensing</h2>
          <p>
            Our open-source projects (AgentShield, DBShield, SkillPrism, DevShelf, WebSecAuditor, MCPBuilderKit) are distributed under their respective permissive open-source licenses (MIT and Apache 2.0). You are free to inspect, modify, and run the software locally in compliance with those license terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Commercial Subscriptions &amp; Instant Digital Product Delivery</h2>
          <p>
            When purchasing a commercial software subscription or audit service (such as AgentShield Pro or WebSecAuditor), digital delivery occurs instantly upon successful payment confirmation:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400 text-xs font-mono">
            <li>Immediate on-screen dispatch of software license keys, CLI login commands, and desktop application download links via our Pro Delivery Portal (<code className="text-brand-green">/pricing/success</code>).</li>
            <li>Automated dispatch of transaction receipt, license credentials, and tax invoice to your checkout email.</li>
            <li>Access to priority hosted MCP proxies and private security scan endpoints commences immediately upon key activation.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">5. Refund &amp; Cancellation Policy</h2>
          <p>
            We stand behind our software and engineering quality. If you are unsatisfied with AgentShield Pro or any paid software tier:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400 text-xs">
            <li><strong className="text-white">7-Day No-Questions-Asked Refund:</strong> You may request a 100% full refund within 7 days of initial subscription purchase by emailing <a href="mailto:support@ritualdev.in" className="text-brand-green hover:underline">support@ritualdev.in</a> with your order reference.</li>
            <li><strong className="text-white">Self-Service Cancellation:</strong> Subscriptions can be cancelled at any time via the Dodo Payments customer billing portal link included in your confirmation receipt. No further recurring charges will be billed after cancellation.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">6. Data Protection &amp; DPDP Act 2023 Compliance</h2>
          <p>
            We process personal information in strict accordance with the Digital Personal Data Protection Act, 2023 (India) and applicable global regulations (GDPR, CCPA). For detailed information regarding our Data Fiduciary obligations and your statutory rights under Sections 11–14 of the DPDP Act, review our <Link href="/privacy/dpdp" className="text-brand-neon hover:underline font-bold">DPDP Act Statutory Disclosure</Link>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">7. Merchant of Record &amp; Tax Compliance</h2>
          <p>
            Commercial transactions are processed by Dodo Payments as the authorized Merchant of Record. Dodo Payments handles applicable sales tax, value-added tax (VAT), and Indian Goods and Services Tax (GST) computation and invoicing.
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-2xl glass-panel border border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-green" />
            <span>8. Contact &amp; Grievance Redressal</span>
          </h2>
          <p className="text-xs text-slate-400">
            For technical support, billing inquiries, or statutory grievances:
          </p>
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <div>Support: <a href="mailto:support@ritualdev.in" className="text-brand-neon hover:underline">support@ritualdev.in</a></div>
            <div>Grievance Officer: <a href="mailto:privacy@ritualdev.in" className="text-brand-green hover:underline">privacy@ritualdev.in</a></div>
            <div>Developer Studio: <a href="mailto:developer@ritualdev.com" className="text-brand-cyan hover:underline">developer@ritualdev.com</a></div>
          </div>
        </section>

      </div>

    </div>
  );
}
