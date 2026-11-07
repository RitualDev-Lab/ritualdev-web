import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, Database, Lock, EyeOff, Terminal, Cpu, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy for MockForge AI — RitualDev",
  description: "Official Privacy Policy and Data Safety Disclosures for MockForge AI (Schema-Guided Synthetic Data Generator & WASM CLI). 100% On-Device, Zero Cloud Exfiltration."
};

export default function MockForgePrivacyPage() {
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
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>DEVELOPER PLATFORM PRIVACY POLICY &middot; LAST UPDATED: NOVEMBER 7, 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Privacy Policy for MockForge AI
        </h1>
        <div className="text-xs font-mono text-slate-400 mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>Product: <code className="text-cyan-400">MockForge AI (CLI, WASM &amp; Python SDK)</code></span>
          <span>&middot;</span>
          <span>Repository: <code className="text-slate-300">RitualDev-Lab/MockForge</code></span>
          <span>&middot;</span>
          <span>Category: <code className="text-brand-green">Synthetic Data &amp; Test Automation</code></span>
          <span>&middot;</span>
          <span>Developer: <code className="text-slate-300">RitualDev Studio</code></span>
        </div>
      </div>

      <div className="space-y-10 text-sm text-slate-300 leading-relaxed font-sans">
        
        {/* Executive Guarantee Card */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/30">
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>Differential Privacy Mandate: 100% Local Synthetic Generation</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            MockForge AI transforms complex JSON schemas, OpenAPI specifications, and relational database schemas into millions of statistically valid, realistic mock records. All generation algorithms execute <strong>100% client-side inside your browser or terminal via WebAssembly and Python</strong>. Your schemas, business rules, entity models, and generated synthetic payloads <strong>NEVER leave your local environment</strong>.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>1. What MockForge Processes Locally</span>
          </h2>
          <p>
            MockForge AI operates on your hardware without remote computational offloading:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SCHEMA PARSING &amp; VALIDATION</span>
              </div>
              <p className="text-slate-300">
                Inspects JSON Schema, OpenAPI 3.0/3.1 specs, TypeScript interfaces, and SQL DDL directly in volatile memory to establish relational graph constraints.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-brand-green flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>DIFFERENTIAL PRIVACY GENERATOR</span>
              </div>
              <p className="text-slate-300">
                Produces synthetic names, addresses, credit cards (Luhn-compliant), and company data using deterministic pseudo-random seeds. Zero real customer PII is utilized or harvested.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-purple-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>STANDALONE COMPILED WASM</span>
              </div>
              <p className="text-slate-300">
                The core generation kernel compiles directly to WebAssembly (WASM), providing native-speed generation without calling external LLM APIs or cloud servers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>STREAMING OUTPUTS</span>
              </div>
              <p className="text-slate-300">
                Emits generated NDJSON, CSV, SQL insert statements, or Parquet chunks directly to your local terminal stdout, file system, or test runner.
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
            Your proprietary business logic and test data models are strictly confidential:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
            <li>We <strong>NEVER</strong> transmit your database schemas or API definitions to RitualDev.</li>
            <li>We <strong>NEVER</strong> inspect, upload, or retain generated synthetic data files.</li>
            <li>We <strong>NEVER</strong> require an internet connection for CLI or local SDK operation.</li>
            <li>We <strong>NEVER</strong> bundle hidden analytics, telemetry pings, or machine fingerprinting in NPM or PyPI packages.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span>3. Distribution Channels &amp; Package Verification</span>
          </h2>
          <p>
            MockForge AI is published transparently across official developer registries with cryptographic SHA-256 provenance hashes:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
            <li><strong>NPM:</strong> <code className="text-slate-200">@ritualdev/mockforge</code></li>
            <li><strong>PyPI:</strong> <code className="text-slate-200">mockforge</code></li>
            <li><strong>GitHub Action:</strong> <code className="text-slate-200">RitualDev-Lab/MockForge@v0.1.0</code></li>
          </ul>
        </section>

        {/* Section 4: Contact */}
        <section className="space-y-4 p-6 rounded-2xl glass-panel border border-slate-800 bg-slate-900/80">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>4. Contact &amp; Support</span>
          </h2>
          <div className="text-xs font-mono text-slate-300 space-y-1.5 pt-2">
            <div>Developer Support: <a href="mailto:developer@ritualdev.in" className="text-cyan-400 hover:underline">developer@ritualdev.in</a></div>
            <div>Security Desk: <a href="mailto:security@ritualdev.in" className="text-brand-green hover:underline">security@ritualdev.in</a></div>
            <div>Product Showcase: <Link href="/mockforge" className="text-cyan-400 hover:underline">https://ritualdev.in/mockforge</Link></div>
            <div>Main Studio: <Link href="https://ritualdev.in" className="text-cyan-400 hover:underline">https://ritualdev.in</Link></div>
          </div>
        </section>

      </div>

    </div>
  );
}
