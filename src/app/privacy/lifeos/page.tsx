import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail } from "lucide-react";

export const metadata = {
  title: "Privacy Policy for LifeOS — RitualDev",
  description: "Official Privacy Policy for LifeOS (com.lifeos.app.ai) on Google Play."
};

export default function LifeOSPrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Back Link */}
      <div className="mb-8">
        <Link href="/privacy" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO PRIVACY CENTER</span>
        </Link>
      </div>

      <div className="border-b border-slate-800 pb-8 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider mb-2">
          <span>ANDROID APP PRIVACY POLICY &middot; LAST UPDATED: JULY 31, 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy for LifeOS
        </h1>
        <div className="text-xs font-mono text-slate-400 mt-2">
          Package ID: <code className="text-purple-400">com.lifeos.app.ai</code> &middot; Developer: RitualDev
        </div>
      </div>

      <div className="space-y-8 text-sm text-slate-300 leading-relaxed font-sans">
        
        <p>
          LifeOS (<code className="text-purple-300">com.lifeos.app.ai</code>) is a gamified local-first productivity system developed by RitualDev. It integrates habit tracking, daily task RPG mechanics, and on-device machine intelligence.
        </p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. On-Device SQLite &amp; Zero AI Training Retention</h2>
          <p>
            All habit logs, journal reflections, and task completion records are stored in a private, encrypted SQLite database on your local Android device. Any AI assistant features execute strictly with zero data retention for training.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Data Ownership &amp; Export</h2>
          <p>
            You own your habit data. LifeOS provides one-click export into standard JSON and CSV formats. No lock-in, no proprietary barriers.
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-2xl glass-panel border border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-purple-400" />
            <span>3. Contact &amp; Inquiries</span>
          </h2>
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <div>Developer: <a href="mailto:developer@ritualdev.com" className="text-purple-400 hover:underline">developer@ritualdev.com</a></div>
            <div>Website: <Link href="https://ritualdev.in" className="text-purple-400 hover:underline">https://ritualdev.in</Link></div>
            <div>Data Deletion Instructions: <Link href="/delete-account/lifeos" className="text-brand-green hover:underline">/delete-account/lifeos</Link></div>
          </div>
        </section>

      </div>

    </div>
  );
}
