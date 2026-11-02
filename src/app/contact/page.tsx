import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Contact & Support — RitualDev",
  description: "Get in touch with the RitualDev team for support, enterprise inquiries, and data requests."
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Back Link */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO RITUALDEV STUDIO</span>
        </Link>
      </div>

      <div className="border-b border-slate-800 pb-10 mb-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Contact &amp; Support
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          Have questions about our AI Agent Defense Suite, need enterprise VPC deployment guidance, or require Google Play data support? Reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-brand-green font-bold">
            <Mail className="w-5 h-5" />
            <span>General &amp; Technical Inquiries</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            For code contributions, security reports, bug advisories, and developer support.
          </p>
          <div className="pt-2 text-xs font-mono text-slate-200">
            Email: <a href="mailto:developer@ritualdev.com" className="text-brand-green hover:underline">developer@ritualdev.com</a>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-brand-cyan font-bold">
            <MessageSquare className="w-5 h-5" />
            <span>Enterprise &amp; Sales</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            For private VPC architectures, Terraform/Helm custom deployment, and SOC 2 audits.
          </p>
          <div className="pt-2 text-xs font-mono text-slate-200">
            Email: <a href="mailto:developer@ritualdev.com?subject=Enterprise%20Inquiry" className="text-brand-cyan hover:underline">developer@ritualdev.com</a>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 rounded-2xl glass-panel border border-slate-800 text-xs font-mono text-slate-400 space-y-2">
        <div className="text-white font-bold">Official Channels:</div>
        <div>GitHub Organization: <Link href="https://github.com/RitualDev-Lab" target="_blank" className="text-brand-green hover:underline">https://github.com/RitualDev-Lab</Link></div>
        <div>Open VSX Publisher: <Link href="https://open-vsx.org/namespace/ritualdev-lab" target="_blank" className="text-brand-cyan hover:underline">ritualdev-lab</Link></div>
        <div>Data Deletion Form: <Link href="/delete-account" className="text-amber-400 hover:underline">/delete-account</Link></div>
      </div>

    </div>
  );
}
