import Link from "next/link";
import { 
  Smartphone, 
  ArrowRight, 
  ShieldCheck, 
  Calculator, 
  Lock, 
  Zap, 
  ExternalLink, 
  CheckCircle2, 
  Shield, 
  Mail, 
  Building2, 
  FileText 
} from "lucide-react";

export const metadata = {
  title: "Android Applications & Mobile Suite — RitualDev Studio",
  description: "Tactile, 100% offline-first Android applications and Kotlin Multiplatform engines by RitualDev. Decoupled consumer suite.",
  alternates: {
    canonical: "https://ritualdev.in/apps/",
  }
};

export default function AppsPage() {
  const apps = [
    {
      name: "All-in-One Calculator Plus",
      pkg: "com.allinone.calculator.plus",
      tagline: "Flagship Tactical Calculation Suite",
      badge: "170+ Math & Finance Engines",
      desc: "Complete mathematical, financial, unit conversion, and health calculation suite. Features 100% offline execution, zero telemetry SDKs, zero background network permissions, and battery-optimized Kotlin core.",
      icon: Calculator,
      color: "brand-green",
      policy: "/privacy/all-in-one-calculator",
      deletion: "/delete-account/all-in-one-calculator",
      detailHref: "/apps/all-in-one-calculator",
      features: [
        "170+ Offline Calculation & Conversion Tools",
        "Financial Loan, Mortgages, EMI, & Tax Calculators",
        "Zero Internet Permission Requested (<uses-permission android:name=\"none\"/>)",
        "Zero Analytics, Crashlytics, or Ad Tracking SDKs"
      ]
    },
    {
      name: "CyberHub",
      pkg: "com.cyberhub.offline",
      tagline: "Volatile Memory Security Companion",
      badge: "Local-First Diagnostics",
      desc: "On-device Android permission inspector, APK vulnerability auditor, and network diagnostics companion. Evaluates runtime permissions and tracker exposure strictly in volatile memory.",
      icon: Lock,
      color: "brand-cyan",
      policy: "/privacy/cyberhub",
      deletion: "/delete-account/cyberhub",
      features: [
        "On-Device App Vulnerability & Permission Scoring",
        "Third-Party Ad & Tracker SDK Detector",
        "Evaluations Run 100% in RAM with Immediate Purge",
        "Zero Cloud Sync or Device Identifiers Logged"
      ]
    },
    {
      name: "LifeOS",
      pkg: "com.lifeos.app.ai",
      tagline: "Gamified Local-First Productivity RPG",
      badge: "Encrypted SQLite",
      desc: "RPG habit tracking, task quests, and daily productivity gamification. Employs hardware-encrypted local SQLite storage (Android Keystore) with absolute zero AI training retention.",
      icon: Zap,
      color: "purple-400",
      policy: "/privacy/lifeos",
      deletion: "/delete-account/lifeos",
      features: [
        "Gamified Habit Quests, Streaks & RPG Rewards",
        "Hardware-Backed Encrypted SQLite Database",
        "Zero AI Model Ingestion or Habit Data Profiling",
        "One-Click Local Export & Complete DB Purge"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-brand-green">Enterprise Gateway</Link>
          <span>/</span>
          <span className="text-brand-green font-bold">Mobile Applications Hub (mobile.ritualdev.in)</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-slate-500">
          <span>Subdomain:</span>
          <code className="text-brand-cyan">mobile.ritualdev.in</code>
        </div>
      </div>

      {/* Hero & Domain Decoupling Notice */}
      <div className="border-b border-slate-800 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-brand-green/10 text-brand-green border border-brand-green/30">
            <Smartphone className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs font-mono text-brand-neon uppercase tracking-wider mb-1">
              RitualDev Studio Lineage &middot; Consumer Utilities
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Consumer Mobile Applications
            </h1>
          </div>
        </div>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          Every mobile application built by RitualDev operates on the strict principle of hardware ownership: computations are performed locally, databases remain sandboxed on your device, and zero personal telemetry is transmitted.
        </p>

        {/* Enterprise Segmentation Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3 text-slate-300">
            <ShieldCheck className="w-5 h-5 text-brand-neon shrink-0" />
            <span>Looking for Enterprise AI Agent Sandboxing &amp; Governance? Visit the corporate infrastructure portal at <strong className="text-white">ritualdev.in</strong></span>
          </div>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-brand-neon border border-brand-green/30 font-bold shrink-0 flex items-center gap-1.5 transition-colors"
          >
            <span>B2B Enterprise Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Mobile Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <div
              key={app.name}
              className="glass-panel rounded-3xl p-7 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-brand-green">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-900 text-brand-neon border border-slate-800">
                    {app.badge}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
                  {app.tagline}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {app.name}
                </h3>
                <div className="text-xs font-mono text-slate-500 mb-4">
                  {app.pkg}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {app.desc}
                </p>

                <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-800/80">
                  {app.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-400">
                  <Link href={app.policy} className="hover:text-brand-green underline transition-colors">
                    Privacy Policy
                  </Link>
                  <span>&middot;</span>
                  <Link href={app.deletion} className="hover:text-rose-400 underline transition-colors">
                    Data Deletion
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Kotlin Multiplatform (KMP) SDK Licensing for Enterprise */}
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-brand-cyan/40 text-xs font-mono text-brand-cyan">
              <Building2 className="w-3.5 h-3.5" />
              <span>COMMERCIAL SDK LICENSING &middot; KOTLIN MULTIPLATFORM</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              License the All-in-One Math &amp; Financial Engine for Your App
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Our 170+ audited calculation engines (mortgages, compound interest, health metrics, unit conversions) are compiled as pure Kotlin Multiplatform (KMP) artifacts ready for direct integration into iOS, Android, and Web applications.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="mailto:support@ritualdev.in?subject=KMP%20SDK%20Licensing%20Inquiry"
              className="px-5 py-2.5 rounded-xl bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Inquire SDK Licensing</span>
            </a>
            <Link
              href="/privacy/all-in-one-calculator"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs font-bold border border-slate-700 transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>View Privacy Specs</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Google Play Compliance & Support Contact */}
      <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono">
        <div className="space-y-1">
          <div className="text-white font-bold flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-green" />
            <span>Google Play Store Compliance &amp; Consumer Privacy Notice</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            In strict compliance with Google Play Store User Data Policies, Indian DPDP Act 2023, and GDPR, all mobile applications process data on-device without background data transmission.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="mailto:support@ritualdev.in"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-bold transition-colors"
          >
            Contact support@ritualdev.in
          </a>
        </div>
      </div>

    </div>
  );
}
