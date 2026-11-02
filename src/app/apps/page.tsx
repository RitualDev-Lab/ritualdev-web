import Link from "next/link";
import { Smartphone, ArrowRight, ShieldCheck, Calculator, Lock, Zap } from "lucide-react";

export const metadata = {
  title: "Android Applications — RitualDev Studio",
  description: "High-performance, 100% offline Android applications built by RitualDev."
};

export default function AppsPage() {
  const apps = [
    {
      name: "All-in-One Calculator Plus",
      pkg: "com.allinone.calculator.plus",
      desc: "Flagship calculation suite with 170+ math, finance, unit conversion, and health tools. 100% offline, zero cloud harvesting.",
      icon: Calculator,
      color: "brand-green",
      policy: "/privacy/all-in-one-calculator",
      deletion: "/delete-account/all-in-one-calculator",
      detailHref: "/apps/all-in-one-calculator"
    },
    {
      name: "CyberHub",
      pkg: "com.cyberhub.offline",
      desc: "Device security inspector, sensitive permission auditor, and network diagnostics companion.",
      icon: Lock,
      color: "brand-cyan",
      policy: "/privacy/cyberhub",
      deletion: "/delete-account/cyberhub"
    },
    {
      name: "LifeOS",
      pkg: "com.lifeos.app.ai",
      desc: "Gamified local-first productivity system integrating habits, streaks, and RPG task rewards with private SQLite storage.",
      icon: Zap,
      color: "purple-400",
      policy: "/privacy/lifeos",
      deletion: "/delete-account/lifeos"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
        <Link href="/" className="hover:text-brand-green">Home</Link>
        <span>/</span>
        <span className="text-brand-green">Android Applications</span>
      </div>

      <div className="border-b border-slate-800 pb-12 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-brand-green/10 text-brand-green border border-brand-green/30">
            <Smartphone className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Android Applications</h1>
            <p className="text-slate-400 text-sm sm:text-base font-mono mt-1">
              Production Offline Utilities &amp; Diagnostics for Android
            </p>
          </div>
        </div>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          Every mobile application built by RitualDev operates on the strict principle of hardware ownership: computations are performed locally, databases remain sandboxed on your device, and zero personal telemetry is transmitted.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <div
              key={app.name}
              className="glass-panel rounded-3xl p-7 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-brand-green">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    Offline
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                  {app.name}
                </h3>
                <div className="text-xs font-mono text-slate-500 mb-3">
                  {app.pkg}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {app.desc}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <Link href={app.policy} className="text-slate-400 hover:text-white underline">
                    Privacy Policy
                  </Link>
                  <Link href={app.deletion} className="text-slate-400 hover:text-white underline">
                    Data Deletion
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
