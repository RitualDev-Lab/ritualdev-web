import Link from "next/link";
import { Shield, Database, Cpu, Layers, BookOpen, Wrench, ArrowRight, ExternalLink, Terminal, Lock } from "lucide-react";

export const metadata = {
  title: "Active Projects & Open-Source Repositories — RitualDev",
  description: "Canonical repository directory for RitualDev's Enterprise AI Agent Security Platform (AgentShield, DBShield, SkillPrism) and DevShelf developer directory.",
  alternates: {
    canonical: "https://ritualdev.in/projects/",
  },
};

const CORE_PROJECTS = [
  {
    name: "AgentShield",
    slug: "agentshield",
    category: "Core Defense Platform (Flagship)",
    license: "Apache-2.0",
    repoUrl: "https://github.com/RitualDev-Lab/AgentShield",
    docsPath: "/agentshield",
    installCmd: "npx @ritualdev-lab/agentshield exec -- <cmd>",
    description: "Sub-millisecond OS kernel confinement (Landlock, Bubblewrap, macOS Seatbelt, Windows AppContainer), linear-time DFA secret redaction, and tamper-evident audit ledgers for autonomous coding agents.",
    icon: Shield,
  },
  {
    name: "DBShield",
    slug: "dbshield",
    category: "Core Defense Platform",
    license: "Apache-2.0",
    repoUrl: "https://github.com/RitualDev-Lab/DBShield",
    docsPath: "/dbshield",
    installCmd: "npx @ritualdev-lab/dbshield proxy",
    description: "Wire-level SQL defense proxy enforcing Virtual Schema RBAC masking, detached lock-free dry-run rollbacks, and HMAC-signed Slack/MS Teams human approvals.",
    icon: Database,
  },
  {
    name: "SkillPrism",
    slug: "skillprism",
    category: "Core Defense Platform",
    license: "Apache-2.0",
    repoUrl: "https://github.com/RitualDev-Lab/SkillPrism",
    docsPath: "/skillprism",
    installCmd: "npx @ritualdev-lab/skillprism init",
    description: "Just-In-Time (JIT) semantic MCP tool compaction stacked with native prompt caching for 98%+ prompt token reduction and OpenTelemetry FinOps metrics.",
    icon: Cpu,
  },
  {
    name: "DevShelf",
    slug: "devshelf",
    category: "Community & Distribution Engine",
    license: "MIT",
    repoUrl: "https://github.com/RitualDev-Lab/DevShelf",
    docsPath: "/devshelf",
    installCmd: "npx @ritualdev-lab/devshelf install <tool-slug>",
    description: "Zero-paywall developer tool directory indexing 575+ verified APIs, open-source tools, and MCP servers with automated daily health checks and a 1-click MCP installer.",
    icon: BookOpen,
  },
  {
    name: "MCP Builder Kit & mcp-monetize",
    slug: "mcp-builder-kit",
    category: "MCP Ecosystem Tooling",
    license: "MIT",
    repoUrl: "https://github.com/RitualDev-Lab/mcp-builder-kit",
    docsPath: "/mcp-builder",
    installCmd: "npx @ritualdev-lab/mcp-builder-kit init",
    description: "OpenAPI 3.1 to Model Context Protocol scaffolder (TypeScript Zod & Python FastMCP) paired with edge-accelerated billing clearinghouse middleware.",
    icon: Wrench,
  },
  {
    name: "Enterprise Governance Suite",
    slug: "enterprise-governance-suite",
    category: "Enterprise Deployment IaC",
    license: "Apache-2.0",
    repoUrl: "https://github.com/RitualDev-Lab/enterprise-governance-suite",
    docsPath: "/enterprise",
    installCmd: "helm install ritual-agent-governance ./helm/ritual-agent-governance",
    description: "Turnkey air-gapped Kubernetes Helm umbrella charts and multi-cloud Private VPC Terraform modules (AWS PrivateLink, Azure Private Endpoints, GCP GKE Private Cluster).",
    icon: Layers,
  },
];

export default function ProjectsDirectoryPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-14">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-800 pb-4">
        <Link href="/" className="hover:text-brand-neon transition-colors">Home</Link>
        <span>/</span>
        <span className="text-brand-neon font-bold">Projects &amp; Repositories</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Lock className="w-3.5 h-3.5" />
          <span>Canonical RitualDev-Lab Engineering Portfolio</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          Active Projects &amp; <span className="text-brand-neon">Open-Source Stack</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          RitualDev focuses engineering investment on local-first runtime security, wire-protocol governance, and context compaction for autonomous AI coding agents, paired with DevShelf as our open-source developer discovery engine.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CORE_PROJECTS.map((project) => {
          const Icon = project.icon;
          return (
            <div
              key={project.slug}
              className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800 hover:border-brand-neon/40 transition-colors flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-brand-neon">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{project.name}</h2>
                      <span className="text-[11px] font-mono text-slate-400">{project.category}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-[11px] font-mono text-emerald-300 shrink-0">
                    {project.license}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 flex items-center gap-2 overflow-x-auto">
                  <Terminal className="w-3.5 h-3.5 text-brand-neon shrink-0" />
                  <code>{project.installCmd}</code>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-mono">
                <Link
                  href={project.docsPath}
                  className="text-brand-neon hover:text-white font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Product Docs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Benchmarks & Trust Footer CTA */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">Inspect Security Architecture &amp; Reproducible Benchmarks</h3>
          <p className="text-sm text-slate-400">
            Verify our 500-vector Agent Security Benchmark suite, Top 100 MCP Security Report, and Zero-Data-Retention Trust Center.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link
            href="/benchmarks"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold transition-colors"
          >
            View Benchmarks
          </Link>
          <Link
            href="/trust"
            className="px-4 py-2.5 rounded-xl bg-brand-neon text-slate-950 hover:bg-emerald-400 text-xs font-mono font-bold transition-colors"
          >
            Trust Center
          </Link>
        </div>
      </div>
    </div>
  );
}
