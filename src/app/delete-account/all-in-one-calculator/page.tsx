import Link from "next/link";
import { ArrowLeft, Trash2, Mail } from "lucide-react";

export const metadata = {
  title: "Data & Account Deletion — All-in-One Calculator",
  description: "Google Play compliant data deletion instructions for All-in-One Calculator."
};

export default function CalculatorDeletePage() {
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
          All-in-One Calculator &middot; <code className="text-amber-400">com.allinone.calculator.plus</code>
        </div>
      </div>

      <div className="space-y-8 text-sm text-slate-300 leading-relaxed font-sans">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">How Your Data is Handled and Deleted</h2>
          <p>
            All-in-One Calculator is built around an <strong>offline-first philosophy</strong>. The app does not require account registration, cloud sign-in, or server profile creation. Therefore, no user account or personal profile is stored on remote servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Local Device Data Deletion</h2>
          <p>
            All calculation history, pinned tools, and saved preferences are stored locally on your device. You can immediately wipe all stored calculation data inside the app by going to:
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-brand-green">
            App Settings &gt; Clear Calculation History &amp; Data
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Complete App Uninstallation</h2>
          <p>
            Uninstalling All-in-One Calculator immediately purges all application files, calculation databases, and preference cache from your device storage through Android&apos;s OS sandboxing.
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-2xl glass-panel border border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-400" />
            <span>Manual Deletion Request &amp; Contact</span>
          </h2>
          <p className="text-xs text-slate-400">
            If you have contacted our support team and wish to verify that your email correspondence or inquiries are deleted, please send a deletion request to:
          </p>
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <div>Email: <a href="mailto:developer@ritualdev.com?subject=Calculator%20Deletion%20Verification" className="text-amber-400 hover:underline">developer@ritualdev.com</a></div>
            <div>Response Window: All requests are acknowledged and processed within 48-72 hours.</div>
          </div>
        </section>

      </div>

    </div>
  );
}
