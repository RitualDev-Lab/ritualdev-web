import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Shield,
  Terminal,
  Server,
  HelpCircle,
} from "lucide-react";

type CellTone = "good" | "warn" | "bad";

interface ComparisonRow {
  feature: string;
  agentshield: { label: string; tone: CellTone };
  cloudSandboxes: { label: string; tone: CellTone };
  dockerOnly: { label: string; tone: CellTone };
  cloudGuardrails: { label: string; tone: CellTone };
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "Zero-Egress Air-Gapped Execution",
    agentshield: { label: "100% Local (No Code Leaves Host)", tone: "good" },
    cloudSandboxes: { label: "Uploads Repo to Cloud VMs", tone: "bad" },
    dockerOnly: { label: "Local Container Network", tone: "good" },
    cloudGuardrails: { label: "Sends Prompts to SaaS API", tone: "bad" },
  },
  {
    feature: "In-Memory & Env Secret Masking",
    agentshield: { label: "Native Hook + <1ms Redactor", tone: "good" },
    cloudSandboxes: { label: "Explicit Secret Injection Only", tone: "warn" },
    dockerOnly: { label: "Leaks Mounted .env / Env Vars", tone: "bad" },
    cloudGuardrails: { label: "Prompt Regex Only (Misses Disk)", tone: "warn" },
  },
  {
    feature: "OS Kernel Syscall / FS Containment",
    agentshield: { label: "Landlock + Bubblewrap / Seatbelt", tone: "good" },
    cloudSandboxes: { label: "Remote MicroVM Only", tone: "warn" },
    dockerOnly: { label: "Heavy Daemon + Socket Risks", tone: "warn" },
    cloudGuardrails: { label: "No OS / Filesystem Control", tone: "bad" },
  },
  {
    feature: "Database Mutation Wire Firewall",
    agentshield: { label: "DBShield Proxy + Dry-Run Token", tone: "good" },
    cloudSandboxes: { label: "Not Included", tone: "bad" },
    dockerOnly: { label: "Not Included", tone: "bad" },
    cloudGuardrails: { label: "Not Included", tone: "bad" },
  },
  {
    feature: "Claude Code, Cursor & Windsurf UX",
    agentshield: { label: "Drop-in CLI + IDE Sidebar", tone: "good" },
    cloudSandboxes: { label: "Replaces Local Dev Workflow", tone: "bad" },
    dockerOnly: { label: "Manual Compose Plumbing", tone: "warn" },
    cloudGuardrails: { label: "Proxy URL Override Required", tone: "warn" },
  },
  {
    feature: "Tamper-Evident Audit Chain & SIEM",
    agentshield: { label: "HMAC-SHA256 Ledger + CEF", tone: "good" },
    cloudSandboxes: { label: "Vendor Dashboard Logs", tone: "warn" },
    dockerOnly: { label: "No Cryptographic Audit Chain", tone: "bad" },
    cloudGuardrails: { label: "Third-Party Log Retention", tone: "warn" },
  },
  {
    feature: "Licensing & Developer Entry Cost",
    agentshield: { label: "$0 OSS Core · $19/seat Team", tone: "good" },
    cloudSandboxes: { label: "Per-Minute Compute Metering", tone: "warn" },
    dockerOnly: { label: "Per-Seat Desktop Licensing", tone: "warn" },
    cloudGuardrails: { label: "Enterprise Sales / Usage Fees", tone: "bad" },
  },
];

const OBJECTIONS = [
  {
    question: "Why not just run my coding agent inside a Docker container?",
    answer:
      "Standard Docker containers mount your project workspace, SSH agent sockets, or environment variables directly—meaning prompt injection inside a dependency or README can still read and curl secrets outward, or run DROP TABLE on dev DBs. AgentShield masks secrets at the boundary, enforces OS kernel containment (Landlock/bwrap/Seatbelt) in milliseconds without a heavy daemon, and adds DBShield SQL wire dry-runs.",
  },
  {
    question: "Does AgentShield slow down agents or phone home with source code?",
    answer:
      "No. Local scanning, secret redaction, and kernel sandboxing run deterministically on your CPU with sub-millisecond overhead and AGENTSHIELD_AIR_GAPPED=1 support. Zero source code or credentials ever leave your workstation or CI runner.",
  },
  {
    question: "What is free forever vs. what requires a paid Team or Enterprise license?",
    answer:
      "The core CLI runtime, kernel sandbox wrappers, local regex redactor, DBShield proxy engine, and HMAC-SHA256 local ledger are open-source and $0 forever. Paid plans ($19/seat Team CI/CD Gate, $29/mo Hosted Relay, $49/seat Enterprise Fleet, and $199 Private Compliance Pack) fund org-wide policy sync, PR SARIF blocking, Slack/Teams approval webhooks, Splunk/Datadog CEF streaming, SAML SSO, and SOC 2/ISO 27001 evidence kits.",
  },
  {
    question: "How quickly can an engineering team roll out AgentShield?",
    answer:
      "Individual engineers verify defense rules in under 30 seconds via npx @ritualdev-lab/agentshield demo or IDE extension install. Security teams needing rapid rollout can book the fixed-price $199 Pre-Launch Security Audit (2-hour SLA report) or deploy our private Terraform/Helm modules inside an existing AWS VPC.",
  },
];

function StatusBadge({ label, tone }: { label: string; tone: CellTone }) {
  const Icon = tone === "good" ? CheckCircle2 : tone === "warn" ? AlertCircle : XCircle;
  const cls =
    tone === "good"
      ? "text-emerald-300"
      : tone === "warn"
      ? "text-amber-300"
      : "text-slate-400";

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs ${cls}`}>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{label}</span>
    </span>
  );
}

export default function AgentShieldComparison({ compact = false }: { compact?: boolean }) {
  const rows = compact ? COMPARISON_ROWS.slice(0, 5) : COMPARISON_ROWS;
  const objections = compact ? OBJECTIONS.slice(0, 2) : OBJECTIONS;

  return (
    <div className="space-y-10">
      {/* Architecture Comparison Table */}
      <div className="glass-panel rounded-3xl border border-slate-700/80 overflow-hidden shadow-2xl">
        <div className="px-6 py-5 bg-slate-950/70 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-brand-neon uppercase tracking-wider mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Architecture Comparison Matrix</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              AgentShield vs. Cloud Sandboxes, Docker &amp; AI Firewalls
            </h3>
          </div>
          {compact && (
            <Link
              href="/compare/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-brand-cyan hover:text-white transition-colors shrink-0"
            >
              <span>Full Comparison &amp; FAQ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-xs font-mono uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-5">Security Capability</th>
                <th className="py-3.5 px-5 text-brand-neon bg-brand-green/5 border-x border-brand-green/20">
                  AgentShield (RitualDev)
                </th>
                <th className="py-3.5 px-5">Cloud Sandboxes (E2B / Modal)</th>
                <th className="py-3.5 px-5">Docker Containers Only</th>
                <th className="py-3.5 px-5">Cloud AI Guardrail APIs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-sm">
              {rows.map((row) => (
                <tr key={row.feature} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-5 font-medium text-slate-200">{row.feature}</td>
                  <td className="py-3.5 px-5 bg-brand-green/5 border-x border-brand-green/15 font-medium">
                    <StatusBadge {...row.agentshield} />
                  </td>
                  <td className="py-3.5 px-5">
                    <StatusBadge {...row.cloudSandboxes} />
                  </td>
                  <td className="py-3.5 px-5">
                    <StatusBadge {...row.dockerOnly} />
                  </td>
                  <td className="py-3.5 px-5">
                    <StatusBadge {...row.cloudGuardrails} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Objections & Enterprise Buying Path */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Common Engineering &amp; CISO Objections Answered</span>
          </div>
          {compact && (
            <Link
              href="/compare/#objections"
              className="text-xs font-mono text-slate-400 hover:text-brand-neon transition-colors"
            >
              Read all procurement FAQs &rarr;
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {objections.map((item) => (
            <div
              key={item.question}
              className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-colors space-y-2.5"
            >
              <h4 className="text-sm sm:text-base font-bold text-white">{item.question}</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dual Conversion Bar: Developer Self-Serve + Enterprise Rollout */}
      {!compact && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-brand-cyan/30 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider">
              Two Conversion Paths &middot; Zero Lock-In
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              Start Locally in 30 Seconds, or Standardize Across Your Organization
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Developers can run the OSS CLI sandbox with zero signup. Engineering leaders can unlock Team CI/CD Gates ($19/seat), book a fixed-price 2-hour Security Audit ($199), or deploy Private VPC infrastructure.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/agentshield/"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-100 text-xs font-mono font-bold transition-colors flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-brand-neon" />
              <span>Install Free OSS CLI</span>
            </Link>
            <Link
              href="/pricing/"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-emerald-500 text-slate-950 text-xs font-mono font-bold hover:opacity-95 transition-opacity flex items-center gap-2 shadow-[0_0_20px_rgba(61,220,132,0.25)]"
            >
              <Server className="w-4 h-4" />
              <span>See Team &amp; Fleet Pricing</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
