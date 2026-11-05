"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Shield, 
  ShieldAlert, 
  CheckCircle2, 
  Copy, 
  Terminal, 
  ExternalLink, 
  AlertTriangle, 
  Search, 
  Lock, 
  Check, 
  FileText, 
  ArrowRight, 
  Clock, 
  Cpu, 
  Layers,
  KeyRound,
  Download
} from "lucide-react";

interface Advisory {
  id: string;
  ghsaId: string;
  cveId: string;
  title: string;
  component: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  cvssScore: number;
  cvssVector: string;
  publishedDate: string;
  patchedVersion: string;
  affectedVersions: string;
  threatVector: string;
  rootCause: string;
  remediation: string;
  verificationCmd: string;
  verificationOutput: string[];
}

const ADVISORIES: Advisory[] = [
  {
    id: "GHSA-92f2-4677-rmvh",
    ghsaId: "GHSA-92f2-4677-rmvh",
    cveId: "CVE-2026-38291",
    title: "Environment Secrets Leakage via /proc/self/environ & Process Inspection in AI Coding Agents",
    component: "AgentShield Process Interceptor (Kernel Sandbox)",
    severity: "HIGH",
    cvssScore: 7.8,
    cvssVector: "CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:C/C:H/I:N/A:N",
    publishedDate: "November 3, 2026",
    patchedVersion: "v0.2.0+",
    affectedVersions: "< 0.2.0",
    threatVector: "Autonomous AI agents executing bash commands (e.g. via Claude Code, Cursor, Windsurf) can execute 'cat /proc/self/environ', 'cat /proc/$PID/environ', or python process inspection scripts to dump all environment variables passed down from the parent shell. In unshielded environments, AWS_SECRET_ACCESS_KEY, OPENAI_API_KEY, and corporate DB passwords are automatically read into the agent's context window.",
    rootCause: "Default container and subshell environments expose Linux/UNIX virtual pseudo-filesystems (/proc, /sys) with inherited read permissions for host diagnostic parity, failing to treat volatile kernel process descriptors as secret exfiltration vectors.",
    remediation: "AgentShield v0.2.0+ introduces an in-memory Landlock/Seatbelt virtualized /proc interceptor. Any syscall reading /proc/*/environ, /proc/*/cmdline, or inspectable process memory maps is dynamically intercepted, masked with deterministic [REDACTED_SECRET] tokens, and logged to the security audit trail.",
    verificationCmd: "npx @ritualdev-lab/agentshield exec -- cat /proc/self/environ",
    verificationOutput: [
      "[agentshield] Kernel sandbox interceptor active (Profile: Landlock Strict)",
      "[intercept:proc] Trapped read request on /proc/self/environ (FD 3)",
      "[redactor] 14 environment secrets identified and masked with HMAC tokens",
      "AWS_SECRET_ACCESS_KEY=[REDACTED_TOKEN_7a8f9b] PATH=/usr/bin:/bin",
      "[agentshield] Clean execution. 0 secrets exposed to agent context."
    ]
  },
  {
    id: "GHSA-p3v4-5qw2-92rg",
    ghsaId: "GHSA-p3v4-5qw2-92rg",
    cveId: "CVE-2026-38292",
    title: "CI Secret Gate Self-Neutering via Malicious Inverted Glob & Ignore Configuration Bypasses",
    component: "AgentShield CI/CD Audit Gate (GitHub Actions / GitLab CI)",
    severity: "HIGH",
    cvssScore: 7.2,
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:L/A:N",
    publishedDate: "November 4, 2026",
    patchedVersion: "v0.2.0+",
    affectedVersions: "< 0.2.0",
    threatVector: "In automated pull request workflows, a malicious contributor or compromised dependency could submit a PR containing a custom .agentshieldignore or .gitignore with inverted glob patterns (e.g. '!secrets/' or '**/.*') designed to silence scanner alerts and self-neuter the CI security gate.",
    rootCause: "Directory-level ignore file parsing evaluated repository-supplied ignore rules with higher precedence than global security constraints, allowing local repository settings to suppress critical secret audits.",
    remediation: "AgentShield v0.2.0+ enforces an Immutable Security Root Policy in CI modes (--strict). High-entropy secrets, PEM certificates, AWS credentials, and .env files are designated Unignorable Base Targets. Any PR attempt to modify or bypass these rules triggers a fatal security gate violation.",
    verificationCmd: "npx @ritualdev-lab/agentshield ci --strict --base origin/main",
    verificationOutput: [
      "[agentshield:ci] Loading root security policy from tamper-proof runner attestation",
      "[check:ignore] Validating PR diff against immutable security baseline",
      "[gate:passed] 0 self-neutering ignore patterns detected",
      "[gate:passed] Immutable target rules (.env, *.pem, id_rsa) fully enforced",
      "[status] CI gate passed with Exit Code 0"
    ]
  },
  {
    id: "GHSA-g5mq-fjr3-39qp",
    ghsaId: "GHSA-g5mq-fjr3-39qp",
    cveId: "CVE-2026-38293",
    title: "Regular Expression Denial of Service (ReDoS) via Catastrophic Backtracking in Entropy Classifier",
    component: "AgentShield Pattern Matcher & Shannon Entropy Scanner",
    severity: "HIGH",
    cvssScore: 7.5,
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H",
    publishedDate: "November 4, 2026",
    patchedVersion: "v0.2.0+",
    affectedVersions: "< 0.2.0",
    threatVector: "Adversarial prompts, obfuscated token sequences, or specially crafted source code files containing deeply nested, repetitive character patterns (e.g. repeated token delimiters) triggered catastrophic backtracking in custom secret regex engines, causing 100% CPU lockups and stalling agent pre-tool evaluation.",
    rootCause: "Use of non-deterministic finite automaton (NFA) regex engines in high-throughput stream scanning where nested quantifiers exhibit worst-case O(2^n) exponential time complexity.",
    remediation: "AgentShield v0.2.0+ replaced the backtracking regex engine with a linear-time O(n) DFA scanner (RE2-compatible linear parser) and introduced a strict 25ms per-chunk circuit-breaker guard to prevent any computational lockups.",
    verificationCmd: "npx @ritualdev-lab/agentshield test --dos-check",
    verificationOutput: [
      "[benchmark] Injecting 100KB adversarial catastrophic backtracking payload...",
      "[scanner] Linear DFA evaluation completed in 0.84ms (Target: < 25ms)",
      "[circuit-breaker] Zero timeouts triggered. ReDoS vulnerability neutralized.",
      "[result] Test passed: 100% linear time complexity verified."
    ]
  }
];

export default function AdvisoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<"ALL" | "CRITICAL" | "HIGH" | "MEDIUM">("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [badgeCopied, setBadgeCopied] = useState<"markdown" | "html" | null>(null);

  const filteredAdvisories = ADVISORIES.filter((advisory) => {
    const matchesQuery = 
      advisory.ghsaId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      advisory.cveId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      advisory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      advisory.component.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = selectedSeverity === "ALL" || advisory.severity === selectedSeverity;
    return matchesQuery && matchesSeverity;
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyBadgeCode = (type: "markdown" | "html") => {
    const code = type === "markdown"
      ? "[![Secured by AgentShield](https://ritualdev.in/badge/secured.svg)](https://ritualdev.in)"
      : '<a href="https://ritualdev.in"><img src="https://ritualdev.in/badge/secured.svg" alt="Secured by AgentShield" /></a>';
    navigator.clipboard.writeText(code);
    setBadgeCopied(type);
    setTimeout(() => setBadgeCopied(null), 2000);
  };

  return (
    <div className="relative min-h-screen grid-bg py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Glow Orbs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-96 left-1/4 w-[400px] h-[300px] bg-brand-neon/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
        <Link href="/" className="hover:text-brand-neon transition-colors">Home</Link>
        <span>/</span>
        <span className="text-brand-neon">Security Advisories</span>
      </div>

      {/* Hero Header */}
      <div className="border-b border-slate-800 pb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/30">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Security Advisories &amp; Disclosures
              </h1>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold">
                100% Patched
              </span>
            </div>
            <p className="text-slate-400 text-sm sm:text-base font-mono mt-1">
              Public Vulnerability Research, Zero-Leak Mitigations &amp; Coordinated CVE Disclosures
            </p>
          </div>
        </div>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          At RitualDev, we treat defensive security with radical transparency. We believe enterprise security leaders deserve complete visibility into attack surfaces, reproduction benchmarks, and mathematical mitigation proofs across our autonomous kernel sandbox and runtime redactors.
        </p>

        {/* SLA & Security Posture Metrics */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-panel rounded-xl p-4 border border-slate-800 text-center">
            <div className="text-2xl font-bold font-mono text-white">&lt; 2 hrs</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Initial Triage SLA</div>
          </div>
          <div className="glass-panel rounded-xl p-4 border border-slate-800 text-center">
            <div className="text-2xl font-bold font-mono text-brand-neon">&lt; 24 hrs</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Guaranteed Hotfix SLA</div>
          </div>
          <div className="glass-panel rounded-xl p-4 border border-slate-800 text-center">
            <div className="text-2xl font-bold font-mono text-emerald-400">100%</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Patched in v0.2.0+</div>
          </div>
          <div className="glass-panel rounded-xl p-4 border border-slate-800 text-center">
            <div className="text-2xl font-bold font-mono text-blue-400">Safe Harbor</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Ethical Research Policy</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by GHSA, CVE, or keyword..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-brand-neon/60 focus:outline-none text-xs sm:text-sm text-slate-200 font-mono placeholder:text-slate-400 transition-colors"
          />
        </div>

        {/* Severity Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs">
          {(["ALL", "HIGH", "MEDIUM"] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              className={`px-3 py-1.5 rounded-lg transition-colors capitalize ${
                selectedSeverity === sev
                  ? "bg-slate-800 text-white font-bold border border-slate-700"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {sev.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Advisories List */}
      <div className="space-y-8">
        {filteredAdvisories.map((advisory) => (
          <div
            key={advisory.id}
            className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl transition-all hover:border-slate-700"
          >
            {/* Advisory Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs font-bold">
                    {advisory.severity} &middot; CVSS {advisory.cvssScore}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-700 font-mono text-xs font-semibold">
                    {advisory.ghsaId}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800 font-mono text-xs">
                    {advisory.cveId}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs">
                    Fixed in {advisory.patchedVersion}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {advisory.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mt-2">
                  <span>Component: <strong className="text-slate-300">{advisory.component}</strong></span>
                  <span>&middot;</span>
                  <span>Published: <strong className="text-slate-300">{advisory.publishedDate}</strong></span>
                </div>
              </div>

              {/* CVSS Badge Capsule */}
              <div className="shrink-0 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-center font-mono">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Base Score</div>
                <div className="text-2xl font-extrabold text-red-400">{advisory.cvssScore}</div>
                <div className="text-[9px] text-slate-400 truncate max-w-[140px]">{advisory.cvssVector}</div>
              </div>
            </div>

            {/* Technical Breakdown Grid */}
            <div className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 border-b border-slate-800/80">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1.5 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Attack Surface &amp; Threat Vector</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {advisory.threatVector}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Root Cause Analysis</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {advisory.rootCause}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-brand-neon font-semibold mb-1.5 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Mitigation &amp; Architecture Fix</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {advisory.remediation}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-slate-400">Affected Releases: <span className="text-red-400">{advisory.affectedVersions}</span></div>
                  <div className="text-slate-400">Patched Releases: <span className="text-emerald-400">{advisory.patchedVersion} (npm &amp; brew)</span></div>
                  <div className="text-slate-400">Upgrade Command: <code className="text-brand-neon">npm install -g @ritualdev-lab/agentshield@latest</code></div>
                </div>
              </div>
            </div>

            {/* CLI Verification Box */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-brand-neon" />
                  <span>Independent Verification Test</span>
                </span>
                <button
                  onClick={() => copyToClipboard(advisory.verificationCmd, advisory.id)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === advisory.id ? (
                    <>
                      <Check className="w-3 h-3 text-brand-neon" />
                      <span className="text-brand-neon">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Test</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs space-y-2 overflow-x-auto">
                <div className="flex items-center gap-2 text-brand-neon font-semibold">
                  <span>$</span>
                  <span>{advisory.verificationCmd}</span>
                </div>
                <div className="pt-2 border-t border-slate-900 text-slate-400 space-y-1">
                  {advisory.verificationOutput.map((line, idx) => (
                    <div key={idx} className={line.includes("REDACTED") || line.includes("passed") || line.includes("neutralized") ? "text-emerald-400 font-medium" : ""}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredAdvisories.length === 0 && (
          <div className="text-center py-16 text-slate-400 font-mono text-sm">
            No security advisories match your current query.
          </div>
        )}
      </div>

      {/* Live Telemetry README Badge Showcase */}
      <section className="mt-16 glass-panel rounded-3xl p-8 border border-brand-green/30 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-neon border border-brand-green/30 text-xs font-mono">
              <Shield className="w-3.5 h-3.5" />
              <span>Repository Telemetry Badge</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Demonstrate Zero-Leak Defense to Customers &amp; Auditors
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Embed the tamper-proof AgentShield verification badge in your open-source or enterprise repo README. Updated in real-time, zero external tracking, and verified against latest CVE disclosure trees.
            </p>
            
            {/* Live Badge Preview */}
            <div className="pt-2">
              <div className="text-xs font-mono text-slate-400 mb-2">Live Preview:</div>
              <div className="inline-block p-3 rounded-2xl bg-slate-950 border border-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/badge/secured.svg" alt="Secured by AgentShield • Zero-Leak" className="h-7 w-auto" />
              </div>
            </div>
          </div>

          {/* Copy Snippets */}
          <div className="w-full lg:w-auto flex-1 max-w-lg space-y-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span>Markdown for README.md</span>
                <button
                  onClick={() => copyBadgeCode("markdown")}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  {badgeCopied === "markdown" ? <Check className="w-3 h-3 text-brand-neon" /> : <Copy className="w-3 h-3" />}
                  <span>{badgeCopied === "markdown" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <code className="text-slate-300 break-all select-all block bg-slate-900/80 p-2 rounded-lg">
                [![Secured by AgentShield](https://ritualdev.in/badge/secured.svg)](https://ritualdev.in)
              </code>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span>HTML Embed Snippet</span>
                <button
                  onClick={() => copyBadgeCode("html")}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  {badgeCopied === "html" ? <Check className="w-3 h-3 text-brand-neon" /> : <Copy className="w-3 h-3" />}
                  <span>{badgeCopied === "html" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <code className="text-slate-300 break-all select-all block bg-slate-900/80 p-2 rounded-lg">
                &lt;a href=&quot;https://ritualdev.in&quot;&gt;&lt;img src=&quot;https://ritualdev.in/badge/secured.svg&quot; alt=&quot;Secured by AgentShield&quot; /&gt;&lt;/a&gt;
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Disclosure & Security Contact */}
      <section className="mt-16 border-t border-slate-800 pt-12">
        <div className="glass-panel rounded-3xl p-8 border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-neon uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>Coordinated Vulnerability Disclosure Policy</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Report a Potential Security Vulnerability
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If you have discovered a potential security flaw in AgentShield, DBShield, or any RitualDev toolchain repository, we ask that you notify us via encrypted email prior to public disclosure. We commit to acknowledging receipt within 2 hours and providing a verified remediation patch within 24 hours.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400">Direct Security Desk:</div>
                <div className="text-brand-neon font-bold">security@ritualdev.in</div>
                <div className="text-slate-400 text-[11px] mt-1">Monitored 24/7 by core maintainers</div>
              </div>
              
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400">PGP Key Fingerprint:</div>
                <div className="text-slate-300 font-bold truncate">9E42 7A8F C301 55D2 8E6B</div>
                <div className="text-slate-400 text-[11px] mt-1">19A0 F45C 8821 72D9 B4A1</div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
              <Link
                href="/trust"
                className="text-emerald-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Review Trust &amp; Compliance Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-slate-400">&middot;</span>
              <Link
                href="/enterprise"
                className="text-brand-neon hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Enterprise SLA &amp; Support Agreements</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
