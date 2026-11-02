"use client";

import Link from "next/link";
import { 
  Server, 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  Cpu, 
  Layers, 
  Terminal, 
  ExternalLink,
  Mail
} from "lucide-react";

export default function EnterprisePage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
        <Link href="/" className="hover:text-brand-cyan">Home</Link>
        <span>/</span>
        <span className="text-brand-cyan">Enterprise Governance</span>
      </div>

      {/* Header */}
      <div className="border-b border-slate-800 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-brand-cyan border border-cyan-500/30">
            <Server className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Enterprise Governance Suite</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-brand-cyan border border-cyan-500/40 text-xs font-mono">
                Fortune 500 Ready
              </span>
            </div>
            <p className="text-slate-400 text-sm sm:text-base font-mono mt-1">
              Private VPC Terraform Modules, Helm Charts &amp; Air-Gapped Compliance Suite
            </p>
          </div>
        </div>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          Enable 5,000+ software engineers across your organization to leverage autonomous AI coding tools without compromising proprietary IP, breaching SOC 2 / ISO 27001 data compliance, or risking destructive database corruption.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <Link
            href="mailto:developer@ritualdev.com?subject=Enterprise%20Governance%20Suite%20Inquiry"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)]"
          >
            <Mail className="w-4 h-4" />
            <span>Request Enterprise Demo &amp; Architecture Review</span>
          </Link>

          <Link
            href="https://github.com/RitualDev-Lab/enterprise-governance-suite"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* 3 Pillars */}
      <section className="py-14 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-8">Air-Gapped Infrastructure Architecture</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-brand-cyan">PILLAR 01 / TERRAFORM AWS VPC</div>
            <h3 className="text-lg font-bold text-white">Private VPC Deployment</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deploys with standard Terraform into your own AWS VPC or Azure VNet. All AI agent telemetry, PII filters, and embeddings remain strictly within your perimeter.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-brand-cyan">PILLAR 02 / ZERO PHONE-HOMES</div>
            <h3 className="text-lg font-bold text-white">100% Air-Gapped Mode</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Runs offline with Kubernetes NetworkPolicies that drop all egress traffic. Fully compatible with internal LLM inference runtimes (vLLM, Ollama) and private artifact registries.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-brand-cyan">PILLAR 03 / SOC 2 AUDITING</div>
            <h3 className="text-lg font-bold text-white">Automated Compliance PDFs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bundles immutable cryptographic logs, PII masking proofs, and dry-run commit trails into verifiable audit PDFs for internal compliance officers and external auditors.
            </p>
          </div>
        </div>
      </section>

      {/* Helm & Terraform Install Box */}
      <section className="py-14">
        <h2 className="text-2xl font-bold text-white mb-6">Deploying the Governance Suite</h2>
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-3">
          <div className="text-slate-500"># Deploy umbrella Helm chart with air-gap enforcement</div>
          <div>
            <span className="text-brand-cyan">$</span> helm install ritual-defense ./helm/ritual-agent-governance --set airgap.enabled=true
          </div>
          <div className="text-slate-500 pt-2"># Generate cryptographic SOC 2 audit PDF</div>
          <div>
            <span className="text-brand-cyan">$</span> agentshield report --compliance soc2 --output audit-report.pdf
          </div>
        </div>
      </section>

    </div>
  );
}
