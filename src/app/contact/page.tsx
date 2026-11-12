import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Shield, LifeBuoy, Sparkles, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Official Contact & Support Channels — RitualDev",
  description: "Get in touch with the RitualDev team across dedicated developer, security, support, and enterprise email desks.",
  alternates: {
    canonical: "https://ritualdev.in/contact/",
  }
};

const CONTACT_DESKS = [
  {
    title: "Support & Customer Care",
    email: "support@ritualdev.in",
    icon: LifeBuoy,
    color: "text-brand-green",
    borderHover: "hover:border-brand-green/60",
    description: "For subscription management, license keys, refund requests, digital fulfillment, and Android app data deletion assistance.",
    sla: "Response SLA: < 24 hours"
  },
  {
    title: "Developer & Core Engineering",
    email: "developer@ritualdev.in",
    icon: Mail,
    color: "text-brand-cyan",
    borderHover: "hover:border-brand-cyan/60",
    description: "For SDK integrations, Python/Node package questions, CLI issues, MCP builder architecture, and open-source contributions.",
    sla: "Response SLA: < 24 hours"
  },
  {
    title: "Security & Vulnerability Disclosure",
    email: "security@ritualdev.in",
    icon: Shield,
    color: "text-purple-400",
    borderHover: "hover:border-purple-500/60",
    description: "For zero-day vulnerability disclosures, CVE coordination, Data Protection Officer (DPDP Act 2023 / GDPR) inquiries, and security audits.",
    sla: "Guaranteed SLA: < 12 hours"
  },
  {
    title: "General Inquiries & Enterprise",
    email: "hello@ritualdev.in",
    icon: MessageSquare,
    color: "text-amber-400",
    borderHover: "hover:border-amber-500/60",
    description: "For enterprise air-gapped VPC Helm pilots, custom redactor rules, founder communications, and media partnerships.",
    sla: "Response SLA: < 24 hours"
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      
      {/* Back Link */}
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO RITUALDEV STUDIO</span>
        </Link>
      </div>

      <div className="border-b border-slate-800 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-brand-green mb-4">
          <Sparkles className="w-3 h-3 text-brand-green" />
          <span>VERIFIED DIRECT COMMUNICATION CHANNELS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Contact &amp; Support Desks
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          Every inbox is monitored directly by our engineering and security team. Select the dedicated desk corresponding to your inquiry for the fastest turnaround.
        </p>
      </div>

      {/* 4 Official Desks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {CONTACT_DESKS.map((desk) => {
          const Icon = desk.icon;
          return (
            <div
              key={desk.email}
              className={`glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4 transition-all ${desk.borderHover}`}
            >
              <div className="space-y-3">
                <div className={`flex items-center gap-2.5 font-bold ${desk.color}`}>
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-base text-white">{desk.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {desk.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                <div className="text-xs font-mono text-slate-200">
                  <a
                    href={`mailto:${desk.email}`}
                    className={`font-bold hover:underline ${desk.color} text-sm`}
                  >
                    {desk.email}
                  </a>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {desk.sla}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Verified Channels & Badges */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800 text-xs font-mono text-slate-400 space-y-3">
        <div className="text-white font-bold text-sm">Official Distribution &amp; Identity Anchors:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
          <div>GitHub Organization: <Link href="https://github.com/RitualDev-Lab" target="_blank" className="text-brand-green hover:underline">RitualDev-Lab</Link></div>
          <div>PyPI Python SDK: <Link href="https://pypi.org/project/agentshield-defense/" target="_blank" className="text-brand-cyan hover:underline">agentshield-defense</Link></div>
          <div>VS Code Marketplace: <Link href="https://marketplace.visualstudio.com/items?itemName=ritualdev.agentshield-defense" target="_blank" className="text-brand-cyan hover:underline">ritualdev.agentshield-defense</Link></div>
          <div>Open VSX Namespace: <Link href="https://open-vsx.org/namespace/ritualdev-lab" target="_blank" className="text-brand-cyan hover:underline">ritualdev-lab</Link></div>
          <div>Docker Container (GHCR): <code className="text-slate-300">ghcr.io/ritualdev-lab/agentshield</code></div>
          <div>Data Deletion Form: <Link href="/delete-account" className="text-amber-400 hover:underline">/delete-account</Link></div>
        </div>
      </div>

    </div>
  );
}
