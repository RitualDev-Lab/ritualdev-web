import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail } from "lucide-react";

export const metadata = {
  title: "Privacy Policy for All-in-One Calculator — RitualDev",
  description: "Official Privacy Policy for All-in-One Calculator (com.allinone.calculator.plus) on Google Play."
};

export default function CalculatorPrivacyPage() {
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
        <div className="flex items-center gap-2 text-xs font-mono text-brand-green uppercase tracking-wider mb-2">
          <span>ANDROID APP PRIVACY POLICY &middot; LAST UPDATED: JULY 31, 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy for All-in-One Calculator
        </h1>
        <div className="text-xs font-mono text-slate-400 mt-2">
          Package ID: <code className="text-brand-green">com.allinone.calculator.plus</code> &middot; Developer: RitualDev
        </div>
      </div>

      <div className="space-y-8 text-sm text-slate-300 leading-relaxed font-sans">
        
        <p>
          This Privacy Policy describes how All-in-One Calculator (&quot;the App&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) handles your information. All-in-One Calculator is an independent Android application developed by RitualDev designed to perform 170+ calculations with a privacy-first, offline-first architecture.
        </p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Information Collection and Local Storage</h2>
          <p>
            All-in-One Calculator operates <strong>100% offline</strong> on your device. We do not collect, store, transmit, or monetize any of your financial inputs, mathematical equations, health data, unit conversions, or calculation history. All calculations and saved tools remain stored locally on your device.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Device Permissions</h2>
          <p>
            All-in-One Calculator requires minimal device permissions to operate:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>
              <strong className="text-white">INTERNET (Optional Currency Exchange):</strong> Used strictly to fetch live currency conversion rates if requested. No personal data or user metrics are transmitted.
            </li>
            <li>
              <strong className="text-white">READ/WRITE EXTERNAL STORAGE (Optional PDF Export):</strong> Used strictly when you explicitly choose to export calculation reports or financial schedules to your device files.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Data Retention &amp; Deletion</h2>
          <p>
            Because All-in-One Calculator stores data locally, you retain complete ownership and control:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>
              <strong className="text-white">Clear App Data:</strong> You can wipe calculation history and saved presets via App Settings &gt; Clear History.
            </li>
            <li>
              <strong className="text-white">Uninstallation:</strong> Uninstalling the application completely removes all locally stored app data.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Third-Party Tracking &amp; Analytics</h2>
          <p>
            The App does not contain ad-tracking SDKs, third-party analytics libraries, or telemetry frameworks.
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-2xl glass-panel border border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-green" />
            <span>5. Contact Us</span>
          </h2>
          <p className="text-xs text-slate-400">
            If you have any questions regarding this Privacy Policy, please contact us at:
          </p>
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <div>Developer: <a href="mailto:developer@ritualdev.com" className="text-brand-green hover:underline">developer@ritualdev.com</a></div>
            <div>Website: <Link href="https://ritualdev.in" className="text-brand-green hover:underline">https://ritualdev.in</Link></div>
            <div>Data Deletion Instructions: <Link href="/delete-account/all-in-one-calculator" className="text-brand-cyan hover:underline">/delete-account/all-in-one-calculator</Link></div>
          </div>
        </section>

      </div>

    </div>
  );
}
