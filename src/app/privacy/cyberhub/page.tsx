import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, ShieldAlert, Lock, EyeOff, Terminal, Cpu, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy for CyberHub — RitualDev",
  description: "Official Privacy Policy and Data Safety Disclosures for CyberHub (Package ID: com.cyberhub.offline) on Google Play. Local Android Security Diagnostics."
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

      {/* Header */}
      <div className="border-b border-slate-800 pb-8 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-brand-cyan" />
          <span>ANDROID APP PRIVACY POLICY &middot; LAST UPDATED: NOVEMBER 7, 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Privacy Policy for CyberHub
        </h1>
        <div className="text-xs font-mono text-slate-400 mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>Application: <code className="text-brand-cyan">CyberHub</code></span>
          <span>&middot;</span>
          <span>Package ID: <code className="text-slate-300">com.cyberhub.offline</code></span>
          <span>&middot;</span>
          <span>Category: <code className="text-brand-green">Security &amp; Diagnostics</code></span>
          <span>&middot;</span>
          <span>Developer: <code className="text-slate-300">RitualDev Studio</code></span>
        </div>
      </div>

      <div className="space-y-10 text-sm text-slate-300 leading-relaxed font-sans">
        
        {/* Executive Guarantee Card */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-brand-cyan/30">
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-brand-cyan" />
            <span>Air-Gapped Security Mandate: Zero Cloud Diagnostic Uploads</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            CyberHub is an offline-first Android security audit, permission inspector, and network diagnostic companion. It evaluates installed application risk profiles, cryptographic cipher suites, and device security posture <strong>strictly inside your phone's local volatile memory</strong>. Your list of installed apps, Wi-Fi network names, and vulnerability scan results are <strong>NEVER transmitted to RitualDev servers or third-party cloud providers</strong>.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-brand-cyan" />
            <span>1. What CyberHub Analyzes On-Device</span>
          </h2>
          <p>
            To provide comprehensive cybersecurity posture analysis for personal Android devices, CyberHub performs the following on-device evaluations:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-brand-cyan flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>APPLICATION PERMISSION INSPECTION</span>
              </div>
              <p className="text-slate-300">
                Audits dangerous permissions (e.g., Camera, Microphone, Background Location, Accessibility Services, Device Administrator) requested by third-party apps. Computes risk scores locally.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-brand-green flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>NETWORK ENCRYPTION &amp; DNS AUDITING</span>
              </div>
              <p className="text-slate-300">
                Verifies Wi-Fi encryption protocols (WPA2/WPA3), evaluates DNS over HTTPS (DoH) configuration, and checks active loopback interfaces. Scans run completely offline without packet sniffing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>HARDWARE &amp; OS INTEGRITY FLAGS</span>
              </div>
              <p className="text-slate-300">
                Reads Android OS security patch levels, SELinux enforcement status, bootloader lock states, and USB debugging flags via standard Android framework APIs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-rose-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>OFFLINE CVE &amp; ADVISORY DATABASE</span>
              </div>
              <p className="text-slate-300">
                Matches your Android build number against an embedded offline security advisory database. No query is sent to external threat intelligence feeds.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-brand-cyan" />
            <span>2. Sensitive Android Permissions Scoping</span>
          </h2>
          <p>
            To perform security audits, CyberHub requests specific Android permissions strictly governed by Google Play policies:
          </p>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <code className="text-xs font-mono font-bold text-brand-cyan">android.permission.QUERY_ALL_PACKAGES</code>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Security Core Feature</span>
              </div>
              <p className="text-xs text-slate-300">
                CyberHub's core single purpose is to audit security permissions across all installed applications on your device. This permission is used exclusively to inspect package manifests, certificate fingerprints, and granted privileges on-device. The package inventory is never transmitted off your phone.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <code className="text-xs font-mono font-bold text-brand-green">android.permission.ACCESS_NETWORK_STATE</code>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Diagnostic Feature</span>
              </div>
              <p className="text-xs text-slate-300">
                Used to determine whether Wi-Fi or cellular interfaces are currently connected and whether current network routes enforce WPA encryption or captive portal interception.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-rose-400" />
            <span>3. Zero Telemetry &amp; Absolute Commercial Disinterest</span>
          </h2>
          <p>
            We do not monetize your security posture. CyberHub is constructed without commercial tracking code:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
            <li><strong>Zero Remote Servers:</strong> CyberHub does not maintain any backend telemetry ingestion server.</li>
            <li><strong>Zero Ad SDKs:</strong> No advertising banners, interstitials, or tracking cookies exist within the codebase.</li>
            <li><strong>Zero Data Brokerage:</strong> We never bundle, sell, or trade security vulnerability findings to threat intelligence brokers, advertisers, or third parties.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span>4. User Rights &amp; Complete Local Deletion</span>
          </h2>
          <p>
            All generated diagnostic audit logs reside within CyberHub's private application sandbox. When you want to clear your data:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
            <li><strong>In-App Purge:</strong> Tap &ldquo;Clear Audit Reports&rdquo; in settings to permanently flush all historical scan records from device memory.</li>
            <li><strong>OS Cleanup:</strong> Uninstalling the application via Android OS removes all cached audit logs immediately without leaving artifacts.</li>
          </ul>
        </section>

        {/* Section 5: Contact */}
        <section className="space-y-4 p-6 rounded-2xl glass-panel border border-slate-800 bg-slate-900/80">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-cyan" />
            <span>5. Contact &amp; Security Disclosures</span>
          </h2>
          <p className="text-xs text-slate-300">
            For technical vulnerability disclosures, verification questions, or support:
          </p>
          <div className="text-xs font-mono text-slate-300 space-y-1.5 pt-2">
            <div>Security Desk: <a href="mailto:security@ritualdev.in" className="text-brand-cyan hover:underline">security@ritualdev.in</a></div>
            <div>Developer Support: <a href="mailto:developer@ritualdev.in" className="text-brand-green hover:underline">developer@ritualdev.in</a></div>
            <div>Main Studio: <Link href="https://ritualdev.in" className="text-brand-cyan hover:underline">https://ritualdev.in</Link></div>
            <div>Data Deletion Instructions: <Link href="/delete-account/cyberhub" className="text-brand-green hover:underline">/delete-account/cyberhub</Link></div>
          </div>
        </section>

      </div>

    </div>
  );
}
