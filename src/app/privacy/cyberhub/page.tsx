import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail } from "lucide-react";

export const metadata = {
  title: "Privacy Policy for CyberHub — RitualDev",
  description: "Official Privacy Policy for CyberHub (com.cyberhub.offline) on Google Play."
};

export default function CyberHubPrivacyPage() {
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
        <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider mb-2">
          <span>ANDROID APP PRIVACY POLICY &middot; LAST UPDATED: JULY 31, 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy for CyberHub
        </h1>
        <div className="text-xs font-mono text-slate-400 mt-2">
          Package ID: <code className="text-brand-cyan">com.cyberhub.offline</code> &middot; Developer: RitualDev
        </div>
      </div>

      <div className="space-y-8 text-sm text-slate-300 leading-relaxed font-sans">
        
        <p>
          CyberHub (&quot;the App&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is an offline-first Android security, privacy, and device diagnostics companion developed by RitualDev. Your device safety and privacy are our top priorities.
        </p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Information Handling &amp; On-Device Analysis</h2>
          <p>
            CyberHub inspects installed applications, network configurations, and security flags entirely on your device. We do not transmit, log, or store device metrics, installed package lists, or vulnerability reports on any external servers. All diagnostics are processed in local volatile memory.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Required Permissions</h2>
          <p>
            CyberHub requests specific permissions strictly to perform device audits:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>
              <strong className="text-white">QUERY_ALL_PACKAGES:</strong> Used strictly to evaluate installed application risk scores and sensitive permission configurations locally on your phone.
            </li>
            <li>
              <strong className="text-white">ACCESS_NETWORK_STATE:</strong> Used to analyze active Wi-Fi and cellular interface states and encryption status locally.
            </li>
          </ul>
        </section>

        <section className="space-y-3 p-6 rounded-2xl glass-panel border border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-cyan" />
            <span>3. Contact Information</span>
          </h2>
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <div>Developer: <a href="mailto:developer@ritualdev.in" className="text-brand-cyan hover:underline">developer@ritualdev.in</a></div>
            <div>Website: <Link href="https://ritualdev.in" className="text-brand-cyan hover:underline">https://ritualdev.in</Link></div>
            <div>Data Deletion Instructions: <Link href="/delete-account/cyberhub" className="text-brand-green hover:underline">/delete-account/cyberhub</Link></div>
          </div>
        </section>

      </div>

    </div>
  );
}
