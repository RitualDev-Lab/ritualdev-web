"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, CheckCircle2, Lock, Server, Cloud, Terminal, ArrowRight, FileText, Check, Sparkles, Building, Mail, User, HelpCircle } from "lucide-react";

export default function EnterprisePilotPage() {
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [cloudProvider, setCloudProvider] = useState("aws");
  const [agentCount, setAgentCount] = useState("50-250");
  const [pilotTier, setPilotTier] = useState<"team_vpc" | "enterprise_airgap">("enterprise_airgap");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-800 pb-4">
        <Link href="/" className="hover:text-emerald-400">Home</Link>
        <span>/</span>
        <Link href="/enterprise" className="hover:text-emerald-400">Enterprise</Link>
        <span>/</span>
        <span className="text-emerald-400 font-bold">Private VPC Pilot Program</span>
      </div>

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Shield className="w-3.5 h-3.5" />
          <span>60-Day Commercial Pilot SOW • $25k–$50k/yr Annual Conversion</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          Enterprise Private VPC <span className="text-emerald-400">Pilot Program</span>
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
          Deploy RitualDev's unified governance suite (AgentShield, DBShield, SkillPrism, and Poly Cloud Cache) in your dedicated, air-gapped VPC with guaranteed sub-0.10ms P99 latency and complete data sovereignty.
        </p>
      </div>

      {/* Pilot Tiers Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tier 1: Team VPC */}
        <div
          onClick={() => setPilotTier("team_vpc")}
          className={`p-8 rounded-2xl border cursor-pointer transition space-y-6 ${
            pilotTier === "team_vpc"
              ? "border-emerald-500/60 bg-slate-900/80 shadow-2xl ring-1 ring-emerald-500/40"
              : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-300">
              Team VPC Pilot
            </span>
            <span className="text-2xl font-black text-white font-mono">$25,000<span className="text-sm font-normal text-slate-400"> / yr</span></span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Dedicated VPC Single-Tenant Cluster</h3>
            <p className="text-sm text-slate-400">
              For fast-scaling engineering teams standardizing on Claude Code, Cursor, and Windsurf autonomous agents.
            </p>
          </div>

          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Up to 100 concurrent autonomous agents</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>AgentShield eBPF kernel isolation (&lt;0.10ms P99)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>DBShield wire proxy with instant rollback</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>SkillPrism 98% prompt token compaction</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>99.9% uptime SLA with Slack support channel</span>
            </li>
          </ul>
        </div>

        {/* Tier 2: Enterprise Air-Gap */}
        <div
          onClick={() => setPilotTier("enterprise_airgap")}
          className={`p-8 rounded-2xl border cursor-pointer transition space-y-6 relative overflow-hidden ${
            pilotTier === "enterprise_airgap"
              ? "border-emerald-500/60 bg-gradient-to-b from-emerald-950/20 to-slate-900/80 shadow-2xl ring-1 ring-emerald-500/40"
              : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
          }`}
        >
          <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-bl-lg font-mono">
            RECOMMENDED
          </div>

          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Enterprise Air-Gapped VPC
            </span>
            <span className="text-2xl font-black text-white font-mono">$50,000<span className="text-sm font-normal text-slate-400"> / yr</span></span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Zero-Trust Air-Gapped Private Infrastructure</h3>
            <p className="text-sm text-slate-300">
              For regulated fintech, healthcare, and enterprise defense environments requiring strict on-premise or private GKE/EKS air-gaps.
            </p>
          </div>

          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Unlimited concurrent autonomous agents</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Air-gapped Kubernetes Helm deployment (`ritual-agent-governance`)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>AWS PrivateLink / GCP PSC / Azure Private Endpoints</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full SOC 2 Type II, ISO 27001, and SIG Lite 2026 Trust Kit</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>24/7 designated solutions architect &amp; custom SIEM integration</span>
            </li>
          </ul>
        </div>
      </div>

      {/* SOW & Pilot Agreement Terms Summary */}
      <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
          <FileText className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">60-Day Commercial Pilot Term Sheet (SOW)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-2">
            <h4 className="font-bold text-white font-mono">1. Deployment &amp; Kickoff (Day 1–7)</h4>
            <p className="text-slate-400 leading-relaxed">
              Dedicated Solutions Architect delivers Terraform modules and Helm values. Production cluster live within 2 business days.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white font-mono">2. SLA Verification (Day 8–45)</h4>
            <p className="text-slate-400 leading-relaxed">
              Empirical verification of &lt;0.10ms P99 overhead, 100% rollback on SQL mutations, and 98%+ prompt token compaction.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white font-mono">3. Conversion Credit (Day 46–60)</h4>
            <p className="text-slate-400 leading-relaxed">
              100% of pilot fees are credited toward your Annual Master Services Agreement (MSA) upon conversion.
            </p>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="p-8 sm:p-10 rounded-2xl border border-slate-800 bg-slate-950/80 max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Request Pilot Agreement &amp; Trust Package</h2>
          <p className="text-slate-400 text-sm">
            Receive the pre-signed SOW, Mutual NDA, and SOC 2 Type II trust package in your inbox within 15 minutes.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Pilot Application Received</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Thank you, {fullName}. Our enterprise solutions team has dispatched the 60-day Pilot SOW and Trust Package to <span className="text-emerald-400 font-mono">{workEmail}</span>.
            </p>
            <div className="pt-2">
              <span className="text-xs font-mono text-slate-400">Designated Architect: enterprise@ritualdev.in</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 uppercase">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 uppercase">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 uppercase">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="Acme Financial"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 uppercase">Target Cloud Infrastructure</label>
                <select
                  value={cloudProvider}
                  onChange={(e) => setCloudProvider(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 font-mono"
                >
                  <option value="aws">AWS (PrivateLink / EKS)</option>
                  <option value="gcp">Google Cloud (Private Service Connect / GKE)</option>
                  <option value="azure">Azure (Private Endpoint / AKS)</option>
                  <option value="onprem">On-Premises Air-Gapped Kubernetes</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase">Active Autonomous AI Agents in Production</label>
              <select
                value={agentCount}
                onChange={(e) => setAgentCount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 font-mono"
              >
                <option value="10-50">10 – 50 Agents (Early Production)</option>
                <option value="50-250">50 – 250 Agents (Scaling Fleet)</option>
                <option value="250+">250+ Agents (Enterprise Standard)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm uppercase tracking-wider transition shadow-xl flex items-center justify-center gap-2"
            >
              <span>Submit Pilot Application &amp; Download SOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
