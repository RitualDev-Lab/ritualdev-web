import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, Lock, EyeOff, Server, Terminal, FileCheck, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy for PromptShield Enterprise — RitualDev",
  description: "Official Privacy Policy and Data Safety Disclosures for PromptShield Enterprise (Chrome Web Store ID: 14103720-7a50-4083-a104-3bc47559c09e). 100% Client-Side In-Browser AI DLP.",
  alternates: {
    canonical: "https://ritualdev.in/privacy/promptshield/",
  }
};

export default function PromptShieldPrivacyPage() {
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
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>CHROME EXTENSION PRIVACY POLICY &middot; LAST UPDATED: NOVEMBER 7, 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Privacy Policy for PromptShield Enterprise
        </h1>
        <div className="text-xs font-mono text-slate-400 mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>Extension: <code className="text-emerald-400">PromptShield Enterprise</code></span>
          <span>&middot;</span>
          <span>Publisher ID: <code className="text-slate-300">14103720-7a50-4083-a104-3bc47559c09e</code></span>
          <span>&middot;</span>
          <span>Version: <code className="text-cyan-400">0.1.0</code></span>
          <span>&middot;</span>
          <span>Developer: <code className="text-slate-300">RitualDev Studio</code></span>
        </div>
      </div>

      <div className="space-y-10 text-sm text-slate-300 leading-relaxed font-sans">
        
        {/* Executive Guarantee */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30">
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Executive Privacy Commitment: 100% In-Browser &amp; Zero-Knowledge</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            PromptShield is engineered under an absolute zero-knowledge security mandate. All real-time Data Loss Prevention (DLP) regex pattern scans, Shannon entropy measurements, and surrogate token replacements occur <strong>100% client-side inside your browser CPU using compiled WebAssembly</strong>. Your prompts, code snippets, database credentials, and proprietary conversations are <strong>NEVER transmitted to RitualDev servers, stored in remote databases, or shared with third parties</strong>.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-emerald-400" />
            <span>1. Information We Process &amp; What We Do NOT Collect</span>
          </h2>
          <p>
            PromptShield operates on your device to inspect text inputs within generative AI web interfaces. Here is how your data is treated:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>WHAT EXECUTES LOCALLY</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li>Real-time keystroke and paste event scanning across supported AI chat web inputs.</li>
                <li>Compiled WebAssembly regex matching against 60+ credential signatures (AWS, GCP, OpenAI, Stripe, etc.).</li>
                <li>Shannon entropy analysis (H &gt; 4.5) to catch high-entropy passwords and tokens.</li>
                <li>Surrogate token injection (replacing sensitive secrets with synthetic mock surrogates).</li>
                <li>AES-256-GCM encrypted local incident records stored in your browser's private storage.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-rose-400 font-bold flex items-center gap-1.5">
                <EyeOff className="w-3.5 h-3.5" />
                <span>WHAT WE NEVER COLLECT OR TRANSMIT</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li>We <strong>NEVER</strong> record or transmit your full prompt text or conversation history.</li>
                <li>We <strong>NEVER</strong> transmit unredacted API keys, passwords, or PII.</li>
                <li>We <strong>NEVER</strong> operate an LLM proxy server or intermediate man-in-the-middle gateway.</li>
                <li>We <strong>NEVER</strong> inject tracking cookies, Google Analytics, or third-party marketing SDKs.</li>
                <li>We <strong>NEVER</strong> harvest browsing history, search queries, or active browser tabs outside configured AI hosts.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span>2. Chrome Extension Permissions Justification</span>
          </h2>
          <p>
            PromptShield declares strictly the minimal required permissions under Google Chrome's Manifest V3 specification. Each permission is scoped exclusively to its single intended security purpose:
          </p>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <code className="text-xs font-mono font-bold text-emerald-400">storage</code>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Core Manifest Permission</span>
              </div>
              <p className="text-xs text-slate-300">
                Used strictly to persist user security preferences (e.g. selecting between <em>Surrogate Masking Mode</em>, <em>Strict Block Mode</em>, or <em>Silent Audit Mode</em>), custom entropy thresholds, and locally encrypted incident records on your device via <code className="text-slate-200">chrome.storage.local</code>. No data in storage is ever synchronized to external servers in Community Edition.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <code className="text-xs font-mono font-bold text-cyan-400">activeTab</code>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Interactive Action</span>
              </div>
              <p className="text-xs text-slate-300">
                Activated solely when the user clicks the PromptShield toolbar action icon. It verifies whether the currently active browser tab is a supported AI chat web interface and displays real-time interception statistics (e.g., active shield status, session threats blocked) for that tab.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <code className="text-xs font-mono font-bold text-purple-400">host_permissions</code>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Strict Domain Allowlist</span>
              </div>
              <p className="text-xs text-slate-300 mb-2">
                PromptShield deliberately avoids broad wildcard permissions (such as <code className="text-rose-400">&lt;all_urls&gt;</code>). Host permissions are strictly restricted to the specific generative AI interfaces where developers interact with LLMs:
              </p>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                {["chatgpt.com", "chat.openai.com", "claude.ai", "gemini.google.com", "chat.deepseek.com", "perplexity.ai", "copilot.microsoft.com", "chat.mistral.ai", "huggingface.co"].map((domain) => (
                  <span key={domain} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    https://{domain}/*
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                This enables our content script (<code className="text-slate-300">dist/content.js</code>) to mount the local Shadow DOM prompt firewall over input textareas, intercept Enter keystrokes and paste events, and display real-time warning HUDs.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-amber-400" />
            <span>3. Zero Remote Code Execution Policy</span>
          </h2>
          <p>
            PromptShield is 100% self-contained. All JavaScript execution logic, regex engines, UI components, and icons are packaged directly within the signed extension distribution (<code className="text-slate-200">dist/background.js</code> and <code className="text-slate-200">dist/content.js</code>). The extension:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
            <li>Does <strong>NOT</strong> load external scripts via remote <code className="text-slate-200">&lt;script&gt;</code> tags.</li>
            <li>Does <strong>NOT</strong> fetch or execute remote WebAssembly modules dynamically.</li>
            <li>Does <strong>NOT</strong> use <code className="text-slate-200">eval()</code> or <code className="text-slate-200">new Function()</code> to interpret string code.</li>
            <li>Adheres fully to Google Chrome's Manifest V3 security restrictions and Content Security Policy (CSP).</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            <span>4. Limited Use &amp; Regulatory Certifications</span>
          </h2>
          <p>
            In compliance with Google Chrome Web Store Developer Program Policies, RitualDev certifies:
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2 p-3 rounded-lg bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>No Data Selling:</strong> We do not sell, rent, monetize, or transfer user information to data brokers, ad networks, or commercial third parties.</span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Single Purpose Adherence:</strong> All processed data is utilized solely to facilitate client-side prompt data loss prevention and credential firewall functionality.</span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>No Creditworthiness Assessment:</strong> We do not use or transfer user data to evaluate creditworthiness, eligibility, or lending decisions.</span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Compliance Evidence:</strong> Incident audit logs can be exported directly by the user in cryptographically signed JSON or CSV formats for SOC 2 Type II (CC6.1/CC6.6), GDPR (Articles 32/33), and HIPAA (§ 164.312) regulatory verification.</span>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. User Control, Data Retention &amp; Deletion</h2>
          <p>
            You maintain absolute control over all data stored by PromptShield:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
            <li><strong>Instant Purge:</strong> Click &ldquo;Clear Audit History&rdquo; inside the extension Settings panel to permanently erase all locally stored encrypted violation records.</li>
            <li><strong>Zero Cloud Persistence:</strong> Because Community Edition stores zero data in the cloud, uninstalling PromptShield from Chrome immediately and irreversibly deletes all extension state and local storage from your hard drive.</li>
          </ul>
        </section>

        {/* Section 6: Contact & Inquiries */}
        <section className="space-y-4 p-6 rounded-2xl glass-panel border border-slate-800 bg-slate-900/80">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>6. Contact, Publisher &amp; Security Disclosures</span>
          </h2>
          <p className="text-xs text-slate-300">
            If you have questions regarding this Privacy Policy, wish to report a security vulnerability, or require enterprise compliance documentation:
          </p>
          <div className="text-xs font-mono text-slate-300 space-y-1.5 pt-2">
            <div>Security Team: <a href="mailto:security@ritualdev.in" className="text-emerald-400 hover:underline">security@ritualdev.in</a></div>
            <div>Developer Support: <a href="mailto:developer@ritualdev.in" className="text-emerald-400 hover:underline">developer@ritualdev.in</a></div>
            <div>Product Showcase: <Link href="/promptshield" className="text-emerald-400 hover:underline">https://ritualdev.in/promptshield</Link></div>
            <div>Main Studio: <Link href="https://ritualdev.in" className="text-emerald-400 hover:underline">https://ritualdev.in</Link></div>
            <div>Privacy Center: <Link href="/privacy" className="text-cyan-400 hover:underline">https://ritualdev.in/privacy</Link></div>
          </div>
        </section>

      </div>

    </div>
  );
}
