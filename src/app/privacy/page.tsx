import Link from "next/link";
import { Shield, Smartphone, ArrowRight, Lock, Database, Code2, Scale, Terminal } from "lucide-react";

export const metadata = {
  title: "Privacy Center & Policies — RitualDev",
  description: "Official Privacy Center and Application Data Safety Policies for RitualDev products and developer tools.",
  alternates: {
    canonical: "https://ritualdev.in/privacy/",
  }
};

export default function PrivacyCenterPage() {
  const mobilePolicies = [
    {
      name: "All-in-One Calculator Plus",
      pkg: "com.allinone.calculator.plus",
      tag: "FLAGSHIP UTILITY",
      desc: "170+ calculators and conversions. 100% offline mathematical processing, zero data harvesting or selling.",
      href: "/privacy/all-in-one-calculator"
    },
    {
      name: "CyberHub",
      pkg: "com.cyberhub.offline",
      tag: "SECURITY COMPANION",
      desc: "Android device permission inspector and network diagnostics. Local-only inspection with zero cloud logging or tracking.",
      href: "/privacy/cyberhub"
    },
    {
      name: "LifeOS",
      pkg: "com.lifeos.app.ai",
      tag: "PRODUCTIVITY RPG",
      desc: "Gamified local-first productivity system. On-device SQLite storage, zero AI training retention.",
      href: "/privacy/lifeos"
    }
  ];

  const devSecOpsPolicies = [
    {
      name: "PromptShield Enterprise",
      pkg: "14103720-7a50-4083-a104-3bc47559c09e",
      tag: "CHROME EXTENSION DLP",
      desc: "Zero-knowledge in-browser prompt firewall and secret scanner for GenAI tools. 100% client-side, zero cloud telemetry.",
      href: "/privacy/promptshield"
    },
    {
      name: "DBShield",
      pkg: "RitualDev-Lab/DBShield",
      tag: "CI/CD DATABASE FIREWALL",
      desc: "Static SQL AST migration analyzer and schema drift gatekeeper. Ephemeral CI runner execution, zero query retention.",
      href: "/privacy/dbshield"
    },
    {
      name: "DevShelf",
      pkg: "devshelf.ritualdev.in",
      tag: "OPEN REGISTRY & API",
      desc: "Open-source developer tools and AI agent skill registry. Public metadata distribution, zero user tracking.",
      href: "/privacy/devshelf"
    },
    {
      name: "MockForge AI",
      pkg: "@ritualdev/mockforge",
      tag: "SYNTHETIC DATA WASM",
      desc: "Schema-guided synthetic data generator and WASM CLI. 100% on-device generation, differential privacy guarantees.",
      href: "/privacy/mockforge"
    },
    {
      name: "FinePrint AI",
      pkg: "@ritualdev/fineprint",
      tag: "LEGAL AI & CONTRACT AUDIT",
      desc: "Terms of Service and contract risk analyzer. Memory-isolated parsing, zero document retention for LLM training.",
      href: "/privacy/fineprint"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
        <Link href="/" className="hover:text-brand-green">Home</Link>
        <span>/</span>
        <span className="text-brand-green">Privacy Center</span>
      </div>

      <div className="border-b border-slate-800 pb-10 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 mb-4">
          <Shield className="w-3.5 h-3.5 text-brand-green" />
          <span>RITUALDEV PRIVACY CENTER &middot; GLOBAL COMPLIANCE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Privacy Policies &amp; Data Safety
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          At RitualDev, we engineer software around an uncompromising offline-first, privacy-first architecture. When software can execute calculations, inspect code, and process tasks locally on your device without transmitting personal records to third-party cloud servers, we believe it must.
        </p>
      </div>

      {/* Statutory DPDP & Global Compliance Banner */}
      <div className="mb-10 p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
              STATUTORY COMPLIANCE
            </span>
            <span className="text-xs font-mono text-slate-400">DPDP Act, 2023 (India) &amp; GDPR</span>
          </div>
          <h2 className="text-lg font-bold text-white">Digital Personal Data Protection (DPDP) Notice</h2>
          <p className="text-xs text-slate-400 max-w-xl">
            RitualDev operates as a Data Fiduciary with full Data Principal statutory protections (Sections 11–14), on-device compute, and designated Grievance Officer redressal.
          </p>
        </div>
        <Link
          href="/privacy/dpdp"
          className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-mono text-xs font-bold hover:bg-emerald-400 transition-colors shrink-0 flex items-center gap-1.5"
        >
          <span>View Statutory Disclosure</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Developer Security & AI Platform Policies */}
      <div className="space-y-6 mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-brand-green" />
            <span>Developer Security &amp; AI Platform Policies</span>
          </h2>
          <span className="text-xs font-mono text-slate-500">5 Products</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {devSecOpsPolicies.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/30">
                    {tool.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    ({tool.pkg})
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-brand-green transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  {tool.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-brand-green font-semibold shrink-0">
                <span>View Full Policy</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Application Policies */}
      <div className="space-y-6 mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span>Android Mobile Application Policies</span>
          </h2>
          <span className="text-xs font-mono text-slate-500">3 Apps</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {mobilePolicies.map((app) => (
            <Link
              key={app.name}
              href={app.href}
              className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/30">
                    {app.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    ({app.pkg})
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {app.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  {app.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold shrink-0">
                <span>View Full Policy</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Studio Data Safety Guarantee */}
      <div className="glass-panel rounded-2xl p-8 border border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-white">
          Studio Data Safety Guarantee
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="space-y-1.5">
            <div className="font-mono text-brand-green font-bold">01 / LOCAL COMPUTE</div>
            <p className="text-slate-400 leading-relaxed">
              Mathematical computations, unit conversions, SQL AST parsing, and document indices never leave your local hardware environment.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="font-mono text-brand-cyan font-bold">02 / ZERO MONETIZATION</div>
            <p className="text-slate-400 leading-relaxed">
              We do not sell personal data, maintain tracking profiles, or share device logs with commercial data brokers.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="font-mono text-purple-400 font-bold">03 / IMMEDIATE DELETION</div>
            <p className="text-slate-400 leading-relaxed">
              Users retain complete rights to delete local application files or request permanent data deletion at any time.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-xs font-mono text-slate-400">
          Contact for Privacy Inquiries: <a href="mailto:developer@ritualdev.in" className="text-brand-green hover:underline">developer@ritualdev.in</a>
        </div>
      </div>

    </div>
  );
}
