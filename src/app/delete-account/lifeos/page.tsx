import Link from "next/link";
import { ArrowLeft, Trash2, Mail } from "lucide-react";

export const metadata = {
  title: "Data & Account Deletion — LifeOS",
  description: "Google Play compliant data deletion instructions for LifeOS."
};

export default function LifeOSDeletePage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      <div className="mb-8">
        <Link href="/delete-account" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO DELETION DIRECTORY</span>
        </Link>
      </div>

      <div className="border-b border-slate-800 pb-8 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
          <span>GOOGLE PLAY DATA DELETION POLICY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Account &amp; Data Deletion Request
        </h1>
        <div className="text-xs font-mono text-slate-400 mt-2">
          LifeOS &middot; <code className="text-amber-400">com.lifeos.app.ai</code>
        </div>
      </div>

      <div className="space-y-8 text-sm text-slate-300 leading-relaxed font-sans">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">In-App Deletion &amp; Local SQLite Wipe</h2>
          <p>
            LifeOS stores all habits, streaks, and RPG profiles locally in your device&apos;s sandboxed database. To wipe your data permanently:
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-brand-green">
            Navigate to: LifeOS &gt; Profile &gt; Data Management &gt; Delete All Records
          </div>
        </section>

        <section className="space-y-3 p-6 rounded-2xl glass-panel border border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-400" />
            <span>Email Deletion Support</span>
          </h2>
          <p className="text-xs text-slate-400">
            For manual support or to confirm complete deletion:
          </p>
          <div className="text-xs font-mono text-slate-300">
            Email: <a href="mailto:developer@ritualdev.in?subject=LifeOS%20Data%20Deletion" className="text-amber-400 hover:underline">developer@ritualdev.in</a>
          </div>
        </section>

      </div>

    </div>
  );
}
