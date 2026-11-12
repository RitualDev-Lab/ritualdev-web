import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, Database, Lock, EyeOff, Terminal, CheckCircle2, FileCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy for DBShield — RitualDev",
  description: "Official Privacy Policy and Data Safety Disclosures for DBShield (CI/CD Database Migration Firewall & Schema Safety Gatekeeper). Zero Query Retention.",
  alternates: {
    canonical: "https://ritualdev.in/privacy/dbshield/",
  }
};

export default function DBShieldPrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Back Link */}
      <div className="mb-8">
        <Link href="/privacy" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO PRIVACY CENTER</span>
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-slate-800 pb-8 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>DEVSECOPS PRIVACY POLICY &middot; LAST UPDATED: NOVEMBER 7, 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Privacy Policy for DBShield
        </h1>
        <div className="text-xs font-mono text-slate-400 mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>Product: <code className="text-blue-400">DBShield CI/CD Action &amp; CLI</code></span>
          <span>&middot;</span>
          <span>Repository: <code className="text-slate-300">RitualDev-Lab/DBShield</code></span>
          <span>&middot;</span>
          <span>Category: <code className="text-brand-green">Database Security &amp; CI/CD Guardrails</code></span>
          <span>&middot;</span>
          <span>Developer: <code className="text-slate-300">RitualDev Studio</code></span>
        </div>
      </div>

      <div className="space-y-10 text-sm text-slate-300 leading-relaxed font-sans">
        
        {/* Executive Guarantee Card */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-blue-500/30">
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-blue-400" />
            <span>DevSecOps Privacy Mandate: 100% Ephemeral In-Runner SQL AST Parsing</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            DBShield inspects SQL DDL/DML migration scripts, schema diffs, and database pull requests directly within your private CI/CD execution runner (GitHub Actions, GitLab CI, or local Docker environments). DBShield operates under an absolute <strong>Zero Query Retention &amp; Zero Database Connection Credential Storage mandate</strong>. Your production database schemas, table names, and migration files are <strong>NEVER transmitted to RitualDev cloud servers or third parties</strong>.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            <span>1. What DBShield Processes in Your CI/CD Pipelines</span>
          </h2>
          <p>
            When DBShield runs as a GitHub Action or CLI tool in your build matrix, it inspects code strictly in ephemeral runner memory:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-blue-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>STATIC SQL AST PARSING</span>
              </div>
              <p className="text-slate-300">
                Parses PostgreSQL, MySQL, SQLite, and MongoDB migration files into an Abstract Syntax Tree (AST) to detect breaking schema changes (e.g., dropping columns without deprecation, unindexed foreign keys, table locks).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-brand-green flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>EPHEMERAL EXECUTION ONLY</span>
              </div>
              <p className="text-slate-300">
                All AST generation and policy evaluations execute directly on your CI/CD runner. When the GitHub Action workflow job completes, the runner environment is torn down and wiped.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-purple-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CREDENTIAL ISOLATION</span>
              </div>
              <p className="text-slate-300">
                DBShield never demands or records database master passwords. Shadow migration verifications run against temporary throwaway local container instances (e.g. Testcontainers) that exist solely during CI.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>COMPLIANCE POLICY EVALUATION</span>
              </div>
              <p className="text-slate-300">
                Evaluates your local <code className="text-slate-300">dbshield.yml</code> configuration for SOC 2 (CC6.1) and GDPR compliance without external network communication.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-rose-400" />
            <span>2. What We Never Collect or Transmit</span>
          </h2>
          <p>
            RitualDev enforces strict enterprise boundaries:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
            <li>We <strong>NEVER</strong> transmit your schema DDL files or SQL queries to external servers.</li>
            <li>We <strong>NEVER</strong> record actual database row contents or customer data.</li>
            <li>We <strong>NEVER</strong> store GitHub repository secrets, database connection URLs, or cloud tokens.</li>
            <li>We <strong>NEVER</strong> inject tracking telemetry or usage metrics into your CI build artifacts.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span>3. GitHub Marketplace &amp; CI Token Permissions</span>
          </h2>
          <p>
            When used as a GitHub Action (<code className="text-slate-300">RitualDev-Lab/DBShield@v0.2.1</code>), DBShield requires only standard GitHub Action workflow privileges:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
            <li><code className="text-slate-300">contents: read</code> &mdash; Needed to read SQL migration files in the checked-out repository.</li>
            <li><code className="text-slate-300">pull-requests: write</code> (Optional) &mdash; Needed only if you configure DBShield to post automated schema hazard comments directly on pull requests.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-brand-green" />
            <span>4. Enterprise Self-Hosting &amp; Air-Gapped Environments</span>
          </h2>
          <p>
            DBShield is architected for defense-in-depth and regulated industries (financial services, healthcare, government). DBShield can be deployed inside completely air-gapped, isolated on-premise Kubernetes clusters or private VPCs without internet access.
          </p>
        </section>

        {/* Section 5: Contact */}
        <section className="space-y-4 p-6 rounded-2xl glass-panel border border-slate-800 bg-slate-900/80">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-400" />
            <span>5. Contact &amp; Security Verification</span>
          </h2>
          <p className="text-xs text-slate-300">
            For security architecture reviews, SOC 2 compliance verification, or support:
          </p>
          <div className="text-xs font-mono text-slate-300 space-y-1.5 pt-2">
            <div>Security Team: <a href="mailto:security@ritualdev.in" className="text-blue-400 hover:underline">security@ritualdev.in</a></div>
            <div>GitHub Repository: <a href="https://github.com/RitualDev-Lab/DBShield" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline">https://github.com/RitualDev-Lab/DBShield</a></div>
            <div>Main Studio: <Link href="https://ritualdev.in" className="text-blue-400 hover:underline">https://ritualdev.in</Link></div>
          </div>
        </section>

      </div>

    </div>
  );
}
