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

        <section className="space-y-3 p-6 rounded-2xl glass-panel border border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-green" />
            <span>4. Contact</span>
          </h2>
          <p className="text-xs text-slate-400">
            Questions regarding these Terms should be directed to:
          </p>
          <div className="text-xs font-mono text-slate-300">
            Email: <a href="mailto:developer@ritualdev.com" className="text-brand-green hover:underline">developer@ritualdev.com</a>
          </div>
        </section>

      </div>

    </div>
  );
}
