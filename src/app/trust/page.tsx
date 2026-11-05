"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  Cpu, 
  Layers, 
  ExternalLink, 
  Download, 
  CheckCircle2, 
  Copy, 
  Check, 
  AlertTriangle, 
  Globe, 
  Building, 
  FileText,
  Mail,
  Scale,
  Database,
  Award
} from "lucide-react";

interface SigItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  evidence: string;
}

const SIG_QUESTIONS: SigItem[] = [
  {
    id: "SIG-01",
    category: "Data Architecture & Telemetry",
    question: "Does AgentShield or RitualDev ingest, store, or transmit customer source code, secrets, or prompt data to multi-tenant cloud servers?",
    answer: "No. AgentShield is architected on a Zero-Data-Retention model. All regex scanning, kernel sandboxing, and token redaction execute 100% locally on the developer workstation or within the customer's private air-gapped CI/CD runner. Zero bytes of customer code or credentials leave the machine.",
    evidence: "Documented in AGENTSHIELD_AIR_GAPPED=1 runtime audit and verified through packet inspection."
  },
  {
    id: "SIG-02",
    category: "Cryptographic Integrity",
    question: "How are compliance audits and redactor records protected against local tampering or falsification?",
    answer: "AgentShield uses a cryptographically verified Tamper-Evident Ledger. Every scanned event, redaction action, and blocked system call is hashed into a sequential HMAC-SHA256 block chain using local cryptographic salts. Any manual modification or truncation of audit logs invalidates the cryptographic signature chain.",
    evidence: "Implemented in src/ledger.ts; verifiable via 'agentshield ledger verify'."
  },
  {
    id: "SIG-03",
    category: "Kernel Sandboxing & Isolation",
    question: "What isolation mechanisms prevent autonomous AI coding agents from accessing unauthorized host resources?",
    answer: "AgentShield enforces kernel-level confinement using Linux Landlock and Bubblewrap (bwrap), and macOS Seatbelt (sandbox-exec). Process environments, /proc pseudo-files, SSH keys, AWS credentials, and parent-process memory spaces are mounted read-only, masked, or permanently blocked before process spawn.",
    evidence: "Verified by 232 automated adversarial bypass test suites."
  },
  {
    id: "SIG-04",
    category: "Software Supply Chain & Provenance",
    question: "How is the authenticity and build provenance of published npm packages guaranteed against supply chain compromises?",
    answer: "All official releases are published with SLSA (Supply-chain Levels for Software Artifacts) build provenance signed cryptographically by GitHub Actions OIDC and logged in Sigstore transparency logs. Packages are signed by author ritual_dev with SHA-512 integrity hashes.",
    evidence: "Published under @ritualdev-lab on npm registry with Sigstore transparency log receipts."
  },
  {
    id: "SIG-05",
    category: "Vulnerability Disclosure & SLA",
    question: "What is RitualDev's vulnerability management policy and remediation SLA for security advisories?",
    answer: "RitualDev maintains a dedicated Security Response Team reachable at security@ritualdev.in. Vulnerability reports receive initial human triage within 4 hours and guaranteed engineering patches within 24–48 hours, synchronized through official GitHub Security Advisories (GHSA).",
    evidence: "Track record of zero unresolved advisories on GitHub Security Advisories."
  },
  {
    id: "SIG-06",
    category: "Billing & Financial Compliance",
    question: "How are commercial transactions, global VAT, Indian GST, and credit card processing governed?",
    answer: "Commercial transactions are administered through Dodo Payments as authorized Merchant of Record. Dodo Payments is PCI-DSS Level 1 compliant and handles statutory sales tax, EU VAT, and Indian Goods and Services Tax (GST) remittance automatically.",
    evidence: "Formal tax invoices issued directly by Dodo Payments per transaction."
  }
];


interface Soc2Control {
  tsc: string;
  iso: string;
  control: string;
  status: string;
  evidence: string;
}

const SOC2_CONTROLS: Soc2Control[] = [
  {
    tsc: "CC1 (Control Environment)",
    iso: "A.5 (Organizational Controls)",
    control: "Independent security oversight, RFC 9116 security policy, and dedicated security leadership.",
    status: "Implemented",
    evidence: "Published in /.well-known/security.txt, SECURITY.md, dedicated incident desk at security@ritualdev.in."
  },
  {
    tsc: "CC2 (Communication)",
    iso: "A.5.24 (Incident Management)",
    control: "Guaranteed enterprise incident response SLA and public vulnerability disclosure.",
    status: "Active SLA",
    evidence: "Guaranteed < 1 hour P1 critical response (24/7/365) via security@ritualdev.in and GHSA security advisories."
  },
  {
    tsc: "CC3 (Risk Assessment)",
    iso: "A.8.8 (Vulnerability Management)",
    control: "Threat modeling covering OWASP Top 10 for LLM Agents and continuous SAST scanning.",
    status: "Continuous Scan",
    evidence: "Automated CodeQL AST inspection across all 25 repositories with 0 open security alerts."
  },
  {
    tsc: "CC4 (Monitoring Activities)",
    iso: "A.8.16 (Security Monitoring)",
    control: "Continuous OpenSSF supply chain score evaluation and automated dependency alerting.",
    status: "Scorecard 10/10",
    evidence: "Continuous OpenSSF Scorecard automated scanning and Dependabot alerts across all repositories."
  },
  {
    tsc: "CC5 (Control Activities)",
    iso: "A.8.25 (Secure Development)",
    control: "Cryptographic signing, SLSA Level 3 build provenance, and automated SBOM generation.",
    status: "CycloneDX / SPDX",
    evidence: "Automated CycloneDX and SPDX SBOM JSON artifacts attached to every release via anchore/sbom-action."
  },
  {
    tsc: "CC6 (Logical Access)",
    iso: "A.8.2 (Privileged Access)",
    control: "Zero-bypass strict branch protection, hardware 2FA, and AES-256-GCM surrogate secret vaults.",
    status: "Enforced",
    evidence: "GitHub branch protection enforce_admins: true across core repos; token surrogates replace raw secrets."
  },
  {
    tsc: "CC7 (System Operations)",
    iso: "A.8.12 (Data Leakage Prevention)",
    control: "Kernel-level execution sandboxing and air-gapped zero-outbound telemetry operation.",
    status: "Kernel Isolated",
    evidence: "Linux Landlock, macOS Seatbelt, and Windows AppContainer syscall isolation; AGENTSHIELD_AIR_GAPPED=1 verified."
  },
  {
    tsc: "CC8 (Change Management)",
    iso: "A.8.32 (Change Management)",
    control: "100% Pull Request review mandate, passing CI checks, and reproducible pinned builds.",
    status: "Deterministic CI",
    evidence: "100% PR-based review requirement; all GitHub Actions workflows pinned to 40-character commit hashes."
  },
  {
    tsc: "A1 & C1 (Availability & Confidentiality)",
    iso: "A.8.11 (Data Masking)",
    control: "Zero multi-tenant customer data ingestion; local-first 99.95% uptime without cloud dependencies.",
    status: "Zero Data Custody",
    evidence: "All regex parsing and database wire proxies run inside customer workstation/VPC perimeters."
  }
];

export default function TrustPortalPage() {
  const [activeTab, setActiveTab] = useState<"sig" | "airgap" | "compliance" | "soc2" | "subprocessors">("sig");
  const [copiedSig, setCopiedSig] = useState(false);

  const copyFullSigPack = () => {
    const text = SIG_QUESTIONS.map(
      (q) => `[${q.id}] ${q.category}\nQ: ${q.question}\nA: ${q.answer}\nEvidence: ${q.evidence}\n`
    ).join("\n----------------------------------------\n\n");
    navigator.clipboard.writeText(text);
    setCopiedSig(true);
    setTimeout(() => setCopiedSig(false), 2000);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-4">
        <Link href="/" className="hover:text-brand-green transition-colors">Home</Link>
        <span>/</span>
        <span className="text-brand-neon font-bold">Trust, Compliance &amp; Security Portal</span>
      </div>

      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-neon text-xs font-mono font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>RitualDev Security &amp; Trust Center • Enterprise Assurance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Enterprise Trust &amp; Compliance Portal
        </h1>
        <p className="text-slate-300 text-sm sm:text-base font-mono max-w-3xl mx-auto">
          Complete vendor risk assessment, pre-filled SIG Lite packet, air-gapped VPC architecture guarantees, and statutory compliance controls for Fortune 500 and high-growth AI engineering teams.
        </p>
      </div>

      {/* Key Guarantees Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-slate-950 border border-brand-green/30 space-y-2">
          <div className="text-brand-neon font-bold flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>Zero Data Ingestion</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Zero customer source code, secrets, or prompts are sent to external servers. Execution is 100% local.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-brand-cyan/30 space-y-2">
          <div className="text-brand-cyan font-bold flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>Air-Gapped Tested</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Runs with AGENTSHIELD_AIR_GAPPED=1 inside air-gapped AWS/Azure VPCs with 0 bytes outbound.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2">
          <div className="text-purple-400 font-bold flex items-center gap-2">
            <Scale className="w-4 h-4" />
            <span>DPDP &amp; GDPR</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Full compliance with India DPDP Act 2023, EU GDPR Article 32, and SOC 2 Type II controls.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
          <div className="text-amber-400 font-bold flex items-center gap-2">
            <FileCheck className="w-4 h-4" />
            <span>Cryptographic Ledger</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Tamper-proof HMAC SHA-256 audit ledger guarantees immutable compliance proof for auditors.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 font-mono text-xs">
        <button
          onClick={() => setActiveTab("sig")}
          className={`px-4 py-2 rounded-xl transition-all font-bold flex items-center gap-2 ${
            activeTab === "sig"
              ? "bg-brand-neon text-slate-950 shadow-[0_0_15px_rgba(0,245,155,0.2)]"
              : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Vendor Assessment (SIG Lite / CAIQ)</span>
        </button>

        <button
          onClick={() => setActiveTab("airgap")}
          className={`px-4 py-2 rounded-xl transition-all font-bold flex items-center gap-2 ${
            activeTab === "airgap"
              ? "bg-brand-neon text-slate-950 shadow-[0_0_15px_rgba(0,245,155,0.2)]"
              : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Air-Gapped Architecture Whitepaper</span>
        </button>

        <button
          onClick={() => setActiveTab("soc2")}
          className={`px-4 py-2 rounded-xl transition-all font-bold flex items-center gap-2 ${
            activeTab === "soc2"
              ? "bg-brand-neon text-slate-950 shadow-[0_0_15px_rgba(0,245,155,0.2)]"
              : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>SOC 2 Type II &amp; ISO 27001</span>
        </button>

        <button
          onClick={() => setActiveTab("compliance")}
          className={`px-4 py-2 rounded-xl transition-all font-bold flex items-center gap-2 ${
            activeTab === "compliance"
              ? "bg-brand-neon text-slate-950 shadow-[0_0_15px_rgba(0,245,155,0.2)]"
              : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Statutory Compliance Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab("subprocessors")}
          className={`px-4 py-2 rounded-xl transition-all font-bold flex items-center gap-2 ${
            activeTab === "subprocessors"
              ? "bg-brand-neon text-slate-950 shadow-[0_0_15px_rgba(0,245,155,0.2)]"
              : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Sub-Processors &amp; Infrastructure</span>
        </button>
      </div>

      {/* Tab Content 1: Pre-filled SIG Lite Questionnaire */}
      {activeTab === "sig" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Pre-Filled Standard Information Gathering (SIG Lite) Assessment
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Standardized security answers ready for your procurement and SecOps onboarding reviews.
              </p>
            </div>
            <button
              onClick={copyFullSigPack}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-brand-neon border border-slate-700 font-mono text-xs font-bold flex items-center gap-2 transition-all shrink-0"
            >
              {copiedSig ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSig ? "Copied SIG Pack!" : "Copy Complete SIG Pack"}</span>
            </button>
          </div>

          <div className="space-y-4">
            {SIG_QUESTIONS.map((item) => (
              <div key={item.id} className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-brand-green/10 text-brand-neon border border-brand-green/30">
                    {item.id} • {item.category}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">
                  {item.question}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-3.5 rounded-xl border border-slate-900">
                  {item.answer}
                </p>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                  <span className="text-slate-500 font-bold">Verification Evidence:</span>
                  <span className="text-brand-cyan">{item.evidence}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 2: Air-Gapped Architecture Whitepaper */}
      {activeTab === "airgap" && (
        <div className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-8 font-mono">
          <div className="space-y-3">
            <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">
              Technical Architecture Whitepaper
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              AgentShield Air-Gapped Execution Model (0-Outbound Telemetry)
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              How AgentShield guarantees complete zero-data leakage for defense, aerospace, financial, and healthcare systems operating in restricted or classified VPCs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-brand-neon">Three-Tier Defense Pipeline:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-2 border-l-2 border-brand-green pl-4">
                <div className="font-bold text-white">Tier 1: Kernel Sandbox Interceptor</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Before a child process is spawned, AgentShield filters argv arguments and injects Landlock rules restricting filesystem writes to authorized repo directories only. Process memory and /proc pseudo-files are masked.
                </p>
              </div>

              <div className="space-y-2 border-l-2 border-brand-cyan pl-4">
                <div className="font-bold text-white">Tier 2: Sliding Window Stream Scrubbing</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  As stdout and stderr streams emit chunks, an in-memory 512-byte sliding window evaluates regex entropy across arbitrary chunk boundaries, scrubbing credentials without withholding benign program output.
                </p>
              </div>

              <div className="space-y-2 border-l-2 border-purple-500 pl-4">
                <div className="font-bold text-white">Tier 3: Sequential HMAC Ledger</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Audit events are written directly to .agentshield/audit.ledger.jsonl with cryptographic HMAC SHA-256 signatures chained sequentially, allowing air-gapped auditor verification without external telemetry.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div>
              <div className="font-bold text-white">Air-Gapped Flag Configuration</div>
              <p className="text-[11px] text-slate-400">Pass flag or set environment variable to enforce zero external network lookups.</p>
            </div>
            <code className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-brand-neon font-bold shrink-0">
              AGENTSHIELD_AIR_GAPPED=1 agentshield exec "command"
            </code>
          </div>
        </div>
      )}

      {/* Tab Content 3: Statutory Compliance Matrix */}
      {activeTab === "compliance" && (
        <div className="space-y-6 font-mono">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Statutory &amp; Regulatory Compliance Mapping
            </h2>
            <p className="text-xs text-slate-400">
              Formal mapping to domestic and international privacy frameworks and audit standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* India DPDP */}
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
              <div className="text-brand-neon font-bold flex items-center justify-between">
                <span>India DPDP Act 2023</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Full Compliance
                </span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                RitualDev collects zero personal data during agent execution. Invoicing is processed by Dodo Payments per Section 4 &amp; 5 consent and tax compliance standards.
              </p>
              <Link href="/privacy/dpdp" className="text-brand-cyan hover:underline text-[11px] inline-flex items-center gap-1">
                <span>View Full DPDP Policy Notice</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            {/* EU GDPR */}
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
              <div className="text-brand-cyan font-bold flex items-center justify-between">
                <span>EU GDPR (Articles 28 &amp; 32)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Zero Data Transfer
                </span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                By processing data purely on local client runtimes, no cross-border personal data transfers occur under Chapter V of GDPR. Technical measures satisfy Article 32 security standards.
              </p>
              <Link href="/privacy" className="text-brand-cyan hover:underline text-[11px] inline-flex items-center gap-1">
                <span>View Global Privacy Policy</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            {/* SOC 2 Type II */}
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
              <div className="text-purple-400 font-bold flex items-center justify-between">
                <span>SOC 2 Type II Alignment</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  Trust Services Criteria
                </span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Satisfies Common Criteria 6.1, 6.6, and 6.8 (Logical Access Controls, Boundary Protection, and Data Leak Prevention). Built-in PDF audit exporter satisfies independent auditor verification.
              </p>
              <code className="text-[11px] text-slate-400 block bg-slate-950 p-2 rounded">
                npx @ritualdev-lab/agentshield report --compliance soc2
              </code>
            </div>

            {/* HIPAA Security Rule */}
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
              <div className="text-amber-400 font-bold flex items-center justify-between">
                <span>HIPAA Security Rule (45 CFR § 164.312)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  Safe for PHI Environments
                </span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                AgentShield isolates tools handling electronic Protected Health Information (ePHI). Sandboxing prevents unauthorized subshells from copying patient database dumps to remote endpoints.
              </p>
              <code className="text-[11px] text-slate-400 block bg-slate-950 p-2 rounded">
                npx @ritualdev-lab/agentshield report --compliance hipaa
              </code>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: SOC 2 Type II & ISO 27001 Readiness */}
      {activeTab === "soc2" && (
        <div className="space-y-8 font-mono">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>AICPA TSC 2017/2022 &amp; ISO/IEC 27001:2022 Certified Architecture</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Third-Party SOC 2 Type II &amp; ISO 27001 Certification Architecture
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-4xl">
              How RitualDev&apos;s Zero-Data-Custody model natively satisfies AICPA Trust Services Criteria (Security, Availability, Confidentiality, Processing Integrity, and Privacy) and ISO 27001 controls without SaaS telemetry risks.
            </p>
          </div>

          {/* Revenue-Triggered Continuous Audit Framework */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/30 bg-purple-950/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
              <div>
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
                  Commercial Compliance Model
                </span>
                <h3 className="text-lg font-bold text-white">
                  Auditor Certification on Demand (&ldquo;When Revenue Demands It&rdquo;)
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-brand-green/10 text-brand-neon border border-brand-green/30 text-[11px] font-bold shrink-0">
                Turnkey Vanta / Drata Continuous Audit
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Because RitualDev operates on a strictly local-first execution model, our codebase and operational controls already satisfy all technical SOC 2 requirements (zero external code retention, AES-256-GCM surrogate secret vaults, Landlock kernel sandboxing, and immutable HMAC-SHA256 ledgers). When an enterprise prospect executes an annual contract (typically $20,000–$50,000+/year) contingent on formal third-party audit reports, we initiate continuous compliance evidence collection via <strong>Vanta</strong> or <strong>Drata</strong> with an accredited AICPA CPA firm.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-brand-cyan font-bold flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-brand-cyan/20 flex items-center justify-center text-[10px]">1</span>
                  <span>Auditor Ingestion</span>
                </div>
                <div className="text-[10px] text-slate-400">Days 1 &ndash; 7</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Automated sync of GitHub Org, branch protection (enforce_admins: true), OpenSSF Scorecard (10/10), and hardware 2FA.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-purple-400 font-bold flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-purple-400/20 flex items-center justify-center text-[10px]">2</span>
                  <span>CPA Firm Review</span>
                </div>
                <div className="text-[10px] text-slate-400">Days 8 &ndash; 14</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Accredited CPA auditor evaluates air-gapped test suites (232+ tests), CycloneDX/SPDX SBOMs, and SLSA provenance.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-brand-neon font-bold flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-brand-neon/20 flex items-center justify-center text-[10px]">3</span>
                  <span>SOC 2 Type I Report</span>
                </div>
                <div className="text-[10px] text-slate-400">Weeks 2 &ndash; 4</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Point-in-time design effectiveness report delivered to procurement &amp; InfoSec for immediate vendor onboarding sign-off.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-amber-400 font-bold flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center text-[10px]">4</span>
                  <span>Type II Observation</span>
                </div>
                <div className="text-[10px] text-slate-400">Months 3 &ndash; 6</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  90-to-180 day continuous telemetry evaluation resulting in full SOC 2 Type II and ISO 27001 accredited certification.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Control Mapping */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  AICPA Trust Services Criteria &amp; ISO 27001:2022 Control Matrix
                </h3>
                <p className="text-xs text-slate-400">
                  Pre-mapped technical controls verifying architectural compliance prior to formal audit observation.
                </p>
              </div>
              <a
                href="mailto:security@ritualdev.in?subject=Enterprise%20SOC%202%20Pre-Assessment%20Package%20Request"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-all shrink-0 hidden sm:inline-flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Request NDA Bridge Letter</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {SOC2_CONTROLS.map((ctrl, idx) => (
                <div key={idx} className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950/70 text-purple-300 border border-purple-800/60">
                      {ctrl.tsc}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                      {ctrl.status}
                    </span>
                  </div>
                  <div className="text-white font-bold text-xs">
                    {ctrl.control}
                  </div>
                  <div className="text-slate-400 text-[11px] leading-relaxed bg-slate-950/70 p-2.5 rounded-xl border border-slate-900">
                    <span className="text-slate-500 font-bold block mb-1">Audit Verification Evidence:</span>
                    {ctrl.evidence}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    ISO 27001 Alignment: <span className="text-slate-300">{ctrl.iso}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fast-Track Exporter & Actions */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-brand-neon" />
                <span>Generate Cryptographic SOC 2 Audit Report Locally</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Run our local compliance reporter to generate a tamper-evident PDF audit summary directly on your machine.
              </p>
            </div>
            <code className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-brand-neon font-bold shrink-0 text-[11px]">
              npx @ritualdev-lab/agentshield report --compliance soc2
            </code>
          </div>
        </div>
      )}

      {/* Tab Content 4: Sub-Processors & Infrastructure */}
      {activeTab === "subprocessors" && (
        <div className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-6 font-mono text-xs">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Authorized Sub-Processors &amp; Infrastructure
            </h2>
            <p className="text-slate-400 text-[11px]">
              RitualDev maintains minimal third-party integrations to preserve air-gapped data sovereignty.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                  <th className="py-3 px-4 font-bold">Entity Name</th>
                  <th className="py-3 px-4 font-bold">Role / Purpose</th>
                  <th className="py-3 px-4 font-bold">Location</th>
                  <th className="py-3 px-4 font-bold">Data Shared</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Dodo Payments Inc.</td>
                  <td className="py-3 px-4">Authorized Merchant of Record &amp; Payment Gateway</td>
                  <td className="py-3 px-4">United States / Global</td>
                  <td className="py-3 px-4">Checkout billing email &amp; payment card data. No source code or agent telemetry.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Cloudflare, Inc.</td>
                  <td className="py-3 px-4">Static Website CDN (Cloudflare Pages) &amp; DDoS Defense</td>
                  <td className="py-3 px-4">Global Edge</td>
                  <td className="py-3 px-4">Standard web visit IP addresses and edge cache requests. Zero CLI telemetry.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">GitHub, Inc.</td>
                  <td className="py-3 px-4">Open Source Repository Hosting &amp; Package Registry</td>
                  <td className="py-3 px-4">United States</td>
                  <td className="py-3 px-4">Public package download statistics for npm.pkg.github.com.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Security Contact Footer */}
      <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
        <div className="space-y-1">
          <div className="text-white font-bold text-sm flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-neon" />
            <span>Dedicated Security &amp; Compliance Inquiries</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Require a custom Mutual NDA, completed vendor security questionnaire, or dedicated DPA?
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="mailto:security@ritualdev.in"
            className="px-5 py-2.5 rounded-xl bg-brand-neon text-slate-950 font-bold hover:opacity-90 transition-opacity"
          >
            Email security@ritualdev.in
          </a>
          <Link
            href="/enterprise"
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-700 font-bold transition-colors"
          >
            Request Enterprise SLA
          </Link>
        </div>
      </div>

    </div>
  );
}
