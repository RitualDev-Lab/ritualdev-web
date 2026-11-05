import Link from "next/link";
import { Trash2, ArrowRight, ShieldAlert, Mail } from "lucide-react";

export const metadata = {
  title: "Data & Account Deletion Requests — RitualDev",
  description: "Official Google Play Data Deletion compliance directory for RitualDev Android applications."
};

export default function DeleteAccountDirectoryPage() {
  const apps = [
    {
      name: "LifeOS",
      pkg: "com.lifeos.app.ai",
      tag: "ANDROID APP",
      desc: "In-app automated wipeout & email request procedures for LifeOS.",
      href: "/delete-account/lifeos"
    },
    {
      name: "All-in-One Calculator Plus",
      pkg: "com.allinone.calculator.plus",
      tag: "LOCAL-FIRST UTILITY",
      desc: "100% on-device data clearing instructions. Zero cloud account records to delete.",
      href: "/delete-account/all-in-one-calculator"
    },
    {
      name: "CyberHub",
      pkg: "com.cyberhub.offline",
      tag: "SECURITY UTILITY",
      desc: "Local-only inspection cache wipeout. Zero accounts, zero remote data stored.",
      href: "/delete-account/cyberhub"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
        <Link href="/" className="hover:text-amber-400">Home</Link>
        <span>/</span>
        <span className="text-amber-400">Account &amp; Data Deletion</span>
      </div>

      <div className="border-b border-slate-800 pb-10 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300 mb-4">
          <Trash2 className="w-3.5 h-3.5" />
          <span>GOOGLE PLAY DATA DELETION COMPLIANCE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Account &amp; Data Deletion Requests
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          In strict compliance with Google Play Store User Data policies, RitualDev provides transparent mechanisms, instructions, and timelines for permanent data wipeout across all published Android applications.
        </p>
      </div>

      <div className="space-y-6 mb-12">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Select Application Deletion Policy
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {apps.map((app) => (
            <Link
              key={app.name}
              href={app.href}
              className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {app.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    ({app.pkg})
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {app.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  {app.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold shrink-0">
                <span>View Procedure</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Direct Support Box */}
      <div className="glass-panel rounded-2xl p-8 border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Mail className="w-5 h-5 text-amber-400" />
          <span>Direct Support Deletion Requests</span>
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          For questions or manual data deletion assistance across any RitualDev Android product, email us directly with your device identifier or app details at:
        </p>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200">
          Official Deletion Channel: <a href="mailto:developer@ritualdev.in?subject=Data%20Deletion%20Request" className="text-amber-400 font-bold hover:underline">developer@ritualdev.in</a>
          <div className="text-slate-500 mt-1">Response Window: All requests processed within 48-72 hours.</div>
        </div>
      </div>

    </div>
  );
}
