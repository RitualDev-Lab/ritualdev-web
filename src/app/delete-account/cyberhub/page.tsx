import Link from "next/link";
import { ArrowLeft, Trash2, Mail } from "lucide-react";

export const metadata = {
  title: "Data & Account Deletion — CyberHub",
  description: "Google Play compliant data deletion instructions for CyberHub."
};

export default function CyberHubDeletePage() {
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
          CyberHub &middot; <code className="text-amber-400">com.cyberhub.offline</code>
        </div>
      </div>

      <div className="space-y-8 text-sm text-slate-300 leading-relaxed font-sans">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">Offline Architecture &amp; Data Wipeout</h2>
          <p>
            CyberHub does not maintain cloud database servers or user registration systems. Diagnostics remain local in volatile system memory.
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-brand-green">
            Settings &gt; Wipe Security History
          </div>
        </section>

        <section className="space-y-3 p-6 rounded-2xl glass-panel border border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-400" />
            <span>Manual Deletion Request</span>
          </h2>
          <p className="text-xs text-slate-400">
            For manual deletion confirmation or email assistance:
          </p>
          <div className="text-xs font-mono text-slate-300">
            Email: <a href="mailto:developer@ritualdev.in?subject=CyberHub%20Data%20Deletion" className="text-amber-400 hover:underline">developer@ritualdev.in</a>
          </div>
        </section>

      </div>

    </div>
  );
}
