import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Package,
  ExternalLink,
  FileCheck,
  Lock,
  ArrowRight,
  GitBranch,
  Terminal,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About RitualDev — Independent AI Agent Defense Engineering Studio",
  description:
    "Meet RitualDev Studio founders Divyanshu Jethi & Sakshi Sharma, verify our published npm, PyPI, GitHub, and IDE registry artifacts, and review our security & compliance standards.",
  alternates: {
    canonical: "https://ritualdev.in/about/",
  },
};

const REGISTRIES = [
  {
    name: "GitHub Organization",
    identifier: "github.com/RitualDev-Lab",
    href: "https://github.com/RitualDev-Lab",
    detail: "Source repositories, release tags, and security advisories (GHSA).",
  },
  {
    name: "npm Registry (@ritualdev-lab)",
    identifier: "@ritualdev-lab/agentshield, dbshield, skillprism",
    href: "https://www.npmjs.com/org/ritualdev-lab",
    detail: "Published CLI packages with Sigstore / SLSA OIDC build provenance.",
  },
  {
    name: "PyPI Package Index",
    identifier: "agentshield-defense",
    href: "https://pypi.org/project/agentshield-defense/",
    detail: "Python runtime hooks and sandbox SDK for LangChain, CrewAI & custom agents.",
  },
  {
    name: "VS Code & Open VSX Extensions",
    identifier: "ritualdev.agentshield-defense",
    href: "https://marketplace.visualstudio.com/items?itemName=ritualdev.agentshield-defense",
    detail: "Live IDE sidebar for VS Code, Cursor, and Windsurf editors.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Back Link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO RITUALDEV STUDIO</span>
        </Link>
      </div>

      {/* Studio Header */}
      <section className="border-b border-slate-800 pb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-neon border border-brand-green/30 text-xs font-mono">
          <span>INDEPENDENT ENGINEERING STUDIO</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About RitualDev
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          RitualDev is an independent systems software studio founded by{" "}
          <strong>Divyanshu Jethi</strong> and <strong>Sakshi Sharma</strong>. We build zero-egress AI agent runtime defense suites, OS kernel sandboxes, database wire proxies, and privacy-first developer tooling.
        </p>
      </section>

      {/* Engineering Manifesto & Architecture Principles */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-neon uppercase tracking-wider">
            <Terminal className="w-4 h-4" />
            <span>Why We Built RitualDev</span>
          </div>
          <h2 className="text-xl font-bold text-white">Architectural Zero-Trust for AI Agents</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Autonomous coding agents need shell access, repository context, and local test databases to do real work—yet prompt injections or runaway migrations turn unrestricted access into immediate credential leaks and production outages.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Rather than shipping prompts to third-party cloud guardrails, RitualDev enforces security locally at the OS and wire boundary: Linux Landlock / Bubblewrap, macOS Seatbelt, Windows AppContainer, DBShield dry-run SQL proxies, and SkillPrism token compaction.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Verifiable Transparency</span>
          </div>
          <h2 className="text-xl font-bold text-white">Inspect Everything Before You Deploy</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Every core CLI engine is published on public package registries with inspectable code, HMAC-SHA256 tamper-evident audit ledgers (<code className="text-brand-neon">agentshield ledger verify</code>), and documented adversarial disclosures.
          </p>
          <div className="pt-2 flex flex-wrap gap-2.5 text-xs font-mono">
            <Link
              href="/trust/"
              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>SOC 2 &amp; Trust Portal</span>
            </Link>
            <Link
              href="/advisories/"
              className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Published CVEs</span>
            </Link>
            <Link
              href="/compare/"
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>Architecture Comparison</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Founders & Leadership */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Founders &amp; Engineering Leadership</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div>
              <h3 className="font-bold text-lg text-white">Divyanshu Jethi</h3>
              <div className="text-xs font-mono text-brand-neon mt-1">
                Co-Founder &amp; Principal Systems Engineer
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Leads low-level systems architecture across AgentShield Linux Landlock / Bubblewrap / macOS Seatbelt / Windows AppContainer isolation, DBShield Postgres/MySQL wire-protocol proxies, and CI/CD security tooling.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div>
              <h3 className="font-bold text-lg text-white">Sakshi Sharma</h3>
              <div className="text-xs font-mono text-brand-cyan mt-1">
                Co-Founder &amp; Product Architect
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Leads product design, developer UX across IDE extensions and the DevShelf open-source ecosystem, statutory compliance documentation, and offline-first privacy Android products.
            </p>
          </div>
        </div>
      </section>

      {/* Verifiable Public Registries */}
      <section className="space-y-4">
        <div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
            Independent Verification
          </div>
          <h2 className="text-2xl font-bold text-white">Public Package Registries &amp; Artifacts</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {REGISTRIES.map((reg) => (
            <a
              key={reg.name}
              href={reg.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-brand-cyan/50 transition-colors group flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-white group-hover:text-brand-cyan transition-colors flex items-center gap-2">
                    <Package className="w-4 h-4 text-brand-neon shrink-0" />
                    <span>{reg.name}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white shrink-0" />
                </div>
                <div className="text-xs font-mono text-slate-400 mt-1 break-all">
                  {reg.identifier}
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{reg.detail}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Governance, Legal & Direct Contact */}
      <section className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <GitBranch className="w-4 h-4" />
            <span>Direct Engineering &amp; Security Contact</span>
          </div>
          <h3 className="text-xl font-bold text-white">Procurement, Security Reports &amp; Support</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Commercial billing and VAT/GST compliance run through Dodo Payments (Merchant of Record). For enterprise VPC reviews, reach us directly—never an unmonitored form.
          </p>
          <div className="flex flex-wrap gap-4 pt-1 text-xs font-mono">
            <a
              href="mailto:developer@ritualdev.in"
              className="inline-flex items-center gap-1.5 text-brand-green hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>developer@ritualdev.in</span>
            </a>
            <a
              href="mailto:security@ritualdev.in"
              className="inline-flex items-center gap-1.5 text-red-300 hover:underline"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>security@ritualdev.in (4h triage SLA)</span>
            </a>
            <Link href="/sla/" className="text-slate-300 hover:text-white">
              Enterprise SLA Terms &rarr;
            </Link>
          </div>
        </div>

        <Link
          href="/pricing/"
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-green to-emerald-500 text-slate-950 font-bold text-xs font-mono hover:opacity-95 transition-opacity flex items-center gap-2 shrink-0"
        >
          <span>View Plans &amp; Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
