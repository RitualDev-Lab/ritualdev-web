"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Zap, 
  Terminal, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  Coins,
  Server,
  TrendingDown,
  Layers
} from "lucide-react";
import TeamCheckoutBanner from "@/components/TeamCheckoutBanner";

export default function SkillPrismPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [teamSize, setTeamSize] = useState(15);
  const [turnsPerDay, setTurnsPerDay] = useState(40);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Pricing math: assume 60k tokens unoptimized vs 2k tokens with SkillPrism @ $3/M tokens
  const unoptimizedTokensPerMonth = teamSize * turnsPerDay * 60000 * 22; // 22 working days
  const optimizedTokensPerMonth = teamSize * turnsPerDay * 2000 * 22;
  const tokenSavings = unoptimizedTokensPerMonth - optimizedTokensPerMonth;
  const dollarSavingsPerMonth = (tokenSavings / 1000000) * 3.0;

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
        <Link href="/" className="hover:text-amber-400">Home</Link>
        <span>/</span>
        <span className="text-amber-400">SkillPrism</span>
      </div>

      {/* Hero Header */}
      <div className="border-b border-slate-800 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Zap className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">SkillPrism</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/40 text-xs font-mono">
                96.7% Token Reduction
              </span>
            </div>
            <p className="text-slate-400 text-sm sm:text-base font-mono mt-1">
              Progressive Skill Disclosure &amp; Context Compaction Engine for Autonomous AI Agents
            </p>
          </div>
        </div>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          SkillPrism solves the massive token bloat caused by injecting hundreds of tool schemas into LLM prompts. By replacing static system prompt dumping with Just-In-Time semantic receipts and shared Redis VPC caching, SkillPrism reduces tool invocation token cost by over 96%.
        </p>

        {/* Quick CLI Bar */}
        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-slate-200">
            <span className="text-amber-400">$</span>
            <span>npm install -g @ritualdev-lab/skillprism</span>
            <button
              onClick={() => copyText("npm install -g @ritualdev-lab/skillprism", "npm")}
              className="ml-2 text-slate-400 hover:text-white"
            >
              {copied === "npm" ? <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <Link
            href="https://github.com/RitualDev-Lab/SkillPrism"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Interactive Savings Calculator */}
      <section className="py-14 border-b border-slate-800">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
            <Coins className="w-4 h-4" />
            <span>Interactive ROI Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Calculate Your Engineering Team&apos;s LLM Savings
          </h2>
        </div>

        <div className="glass-panel rounded-3xl p-8 border border-slate-700/80 max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-2">
                Team Size (Engineers Using AI Agents): <span className="text-white font-bold">{teamSize}</span>
              </label>
              <input
                type="range"
                min="1"
                max="150"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-2">
                AI Coding Invocations / Dev / Day: <span className="text-white font-bold">{turnsPerDay}</span>
              </label>
              <input
                type="range"
                min="5"
                max="100"
                value={turnsPerDay}
                onChange={(e) => setTurnsPerDay(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Result Banner */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-brand-green/30 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">Estimated Monthly LLM Savings</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-neon font-mono">
                ${Math.round(dollarSavingsPerMonth).toLocaleString()} <span className="text-xs font-normal text-slate-400">/ mo</span>
              </div>
              <div className="text-xs text-slate-500 font-mono mt-1">
                Saved ~{(tokenSavings / 1000000).toFixed(1)} Million Tokens / month
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Context Compression:</span>
                <span className="text-brand-neon font-bold">96.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">P99 Query Latency:</span>
                <span className="text-white font-bold">&lt; 14ms (Redis)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Deployment:</span>
                <span className="text-white font-bold">Private Helm / Docker</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Redis VPC Hub Architecture */}
      <section className="py-14">
        <h2 className="text-2xl font-bold text-white mb-6">
          Shared Team Redis VPC Cluster
        </h2>
        <p className="text-slate-400 text-sm max-w-3xl leading-relaxed mb-6">
          Instead of having every developer repeatedly download and parse tool schemas in Cursor or Claude Code, SkillPrism Hub runs as a centralized Redis VPC cluster inside your team network.
        </p>

        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-2">
          <div className="text-slate-500"># Deploy the high-availability Redis VPC cluster with 1 command</div>
          <div>
            <span className="text-amber-400">$</span> docker compose -f docker-compose.redis-vpc.yml up -d
          </div>
          <div className="text-slate-500 pt-2"># Or deploy via Helm into your Kubernetes cluster</div>
          <div>
            <span className="text-amber-400">$</span> helm install skillprism-hub ./helm/skillprism-hub -n ai-governance
          </div>
        </div>
      </section>

      <TeamCheckoutBanner
        eyebrow="SkillPrism Team Redis VPC & Hosting"
        heading="Deploy Managed Team Token Caching Without Hosting Redis Yourself"
        subheading="The SkillPrism local CLI & progressive compactor stay 100% open source ($0 forever). Upgrade to a dedicated managed Redis VPC pool shared across every developer IDE."
        secondaryHref="/pricing/"
        secondaryLabel="Compare All Cloud Plans"
        plans={[
          {
            tierKey: "team_relay_29",
            name: "Policy & Usage Sync Starter",
            price: "$29",
            period: "/ month",
            badge: "Team Starter",
            accent: "emerald",
            description: "Centralized skill index distribution & team policy sync for Cursor, Claude Code & Windsurf.",
            features: [
              "Hosted Policy & Tool Manifest Sync URL (Up to 10 Devs)",
              "Paired AgentShield & DBShield Approval Webhook Relay",
              "30-Day Audit Telemetry & Token Savings Reporting",
            ],
            ctaLabel: "Start Team Sync ($29/mo)",
          },
          {
            tierKey: "skillprism_team_99",
            name: "Hosted Team Redis VPC Cluster",
            price: "$99",
            period: "/ month",
            badge: "Hosted Redis Pool",
            featured: true,
            accent: "amber",
            description: "Skip running Redis HA clusters. Get a managed ultra-low-latency Redis cache shared across your engineering team.",
            features: [
              "Dedicated Shared SkillPrism Redis Token Cache Cluster (<14ms P99)",
              "Includes Unlimited DBShield Approval Channels",
              "Automated WebSecAuditor PR Security Bot",
              "Priority Slack Channel with RitualDev Engineers",
            ],
            ctaLabel: "Launch Hosted Redis Cluster ($99/mo)",
          },
          {
            tierKey: "private_compliance_kit",
            name: "Self-Hosted Helm & Compliance Kit",
            price: "$199",
            period: "one-time",
            badge: "Private GitHub Repo",
            accent: "purple",
            description: "Production Kubernetes Helm charts, Redis VPC Terraform modules, and SOC 2 evidence unlocked via webhook.",
            features: [
              "Hardened K8s Helm Values & AWS PrivateLink Terraform",
              "SOC 2, ISO 27001 & EU AI Act Compliance Bundle",
              "Instant GitHub collaborator invite on checkout",
            ],
            ctaLabel: "Unlock Private Helm Kit ($199)",
          },
        ]}
      />

    </div>
  );
}
