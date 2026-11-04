"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Terminal, 
  FileCheck, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Sparkles, 
  ExternalLink,
  Code2,
  Bug,
  KeyRound,
  FileCode2,
  HelpCircle
} from "lucide-react";

export default function AuditPage() {
  const [productName, setProductName] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [launchDate, setLaunchDate] = useState("Product Hunt Launch This Week");
  const [packageTier, setPackageTier] = useState<"starter_199" | "pro_399">("starter_199");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim() || (!targetUrl.trim() && !repoUrl.trim())) {
      setErrorMsg("Please provide your contact email and either a target URL or GitHub repo.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const orderId = `AUDIT-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      try {
        const res = await fetch("/api/audit-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productName,
            targetUrl,
            repoUrl,
            contactEmail,
            launchDate,
            packageTier,
            notes,
            orderId,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.checkoutUrl) {
            window.location.href = data.checkoutUrl;
            return;
          }
        }
      } catch (_) {
        // Fallback for static export mode
      }

      // Direct Dodo Payments checkout fallback
      const checkoutUrl =
        packageTier === "pro_399"
          ? `https://checkout.dodopayments.com/buy/pdt_0NrFWnSQHfJhuHs4Y9Xmh?quantity=1&redirect_url=${encodeURIComponent(`https://ritualdev.in/audit/success/?id=${orderId}`)}`
          : `https://checkout.dodopayments.com/buy/pdt_0NrFWnRHHEI72iaB8AC9r?quantity=1&redirect_url=${encodeURIComponent(`https://ritualdev.in/audit/success/?id=${orderId}`)}`;

      window.location.href = checkoutUrl;
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to process order. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-4">
        <Link href="/" className="hover:text-brand-cyan transition-colors">Home</Link>
        <span>/</span>
        <span className="text-brand-cyan font-bold">Pre-Launch Security Audit</span>
      </div>

      {/* Hero Header */}
      <div className="space-y-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-brand-cyan border border-cyan-500/30 text-xs font-mono font-bold">
          <Clock className="w-3.5 h-3.5 animate-pulse" />
          <span>Guaranteed 2-Hour Delivery • Product Hunt &amp; Hacker News Special</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Pre-Launch AI Agent &amp; MCP <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-400 to-indigo-400">
            Penetration Test &amp; Security Audit
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-3xl mx-auto">
          Don’t let prompt injections, leaked OpenAI keys, or rogue agent tool execution ruin your Product Hunt launch day. Get a comprehensive, automated penetration audit and the official <b>AgentShield Verified Secure</b> badge in under 2 hours.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#order-form"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:opacity-95 transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Book 2-Hour Launch Audit ($199)</span>
          </a>
          <a
            href="#sample-findings"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-mono font-bold flex items-center gap-2 transition-colors"
          >
            <span>See Sample Audit Deliverables</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* The 4 Attack Vectors We Audit */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-bold">
            Comprehensive Attack Surface Coverage
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            What Our Automated Security Engines Test
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Powered by the open-source engines behind AgentShield and WebSecAuditor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center">
              <Bug className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Prompt Injection Traps</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We test for indirect prompt injections, system instruction overrides, and untrusted markdown renders that cause agents to hijack control.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">MCP Tool &amp; Shell Escape</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              AST parsing and Landlock boundary audits to ensure model-generated bash or Python calls cannot escape sandboxes or access sensitive host files.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Live Secret Hunting</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Shannon entropy scanner audits client bundles, git history, and API responses for leaked OpenAI, Anthropic, Stripe, or cloud provider tokens.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-brand-cyan flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">DAST &amp; Web Misconfig</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              OWASP Top 10 web scans checking CORS wildcards, permissive CSPs, SSL/TLS downgrade vulnerabilities, and SSRF in agent web scrapers.
            </p>
          </div>
        </div>
      </section>

      {/* Sample Deliverables Preview */}
      <section id="sample-findings" className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1 font-bold">
              Deliverables Package
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              What You Receive in Your Inbox Within 2 Hours
            </h2>
          </div>
          <span className="px-3 py-1 text-xs font-mono rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold shrink-0">
            100% Confidential • Delivered via Encrypted Link
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-brand-cyan font-bold flex items-center gap-2 text-sm">
              <FileCheck className="w-4 h-4" />
              <span>1. Executive HTML &amp; SARIF Report</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Self-contained interactive security dashboard with severity scoring, CVSS v3.1 vectors, and machine-readable OASIS SARIF v2.1.0 log.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
              ✓ Overall Score: 96 / 100 (Grade A+)<br />
              ✓ 0 Critical Vulnerabilities<br />
              ✓ 2 Informational Recommendations
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-purple-400 font-bold flex items-center gap-2 text-sm">
              <Code2 className="w-4 h-4" />
              <span>2. Unified Git Diff Fix Recipes</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              No vague generic security advice. We provide drop-in unified git diff patches showing the exact code fixes for any vulnerability discovered.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-emerald-400 font-mono">
              + app.use(helmet.contentSecurityPolicy());<br />
              {"+ agentshield.sandbox({ egress: 'blocked' });"}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-emerald-400 font-bold flex items-center gap-2 text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>3. "AgentShield Verified" Badge</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Official SVG badge linked to a cryptographic verification record that you can embed on your README, landing page, and Product Hunt maker kit.
            </p>
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-200 text-center font-bold">
              🛡️ AgentShield | Verified Secure (2026)
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-bold">
            Transparent Pricing
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Choose Your Pre-Launch Audit Package
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Starter Package */}
          <div 
            onClick={() => setPackageTier("starter_199")}
            className={`cursor-pointer rounded-3xl p-6 sm:p-8 border transition-all ${
              packageTier === "starter_199"
                ? "bg-slate-900/90 border-brand-cyan shadow-[0_0_30px_rgba(56,189,248,0.2)]"
                : "bg-slate-950 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-brand-cyan border border-cyan-500/30">
                Launch Sprint
              </span>
              <span className="text-xs font-mono text-slate-400">⚡ 2-Hour Delivery</span>
            </div>

            <div className="mt-4 mb-2">
              <span className="text-4xl font-extrabold text-white">$199</span>
              <span className="text-slate-400 text-xs font-mono ml-2">one-time</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Ideal for solo founders and indie makers preparing to launch on Product Hunt, Hacker News, or Twitter this week.
            </p>

            <ul className="space-y-2.5 text-xs font-mono text-slate-300 border-t border-slate-800 pt-5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Single Web Application or MCP Server Target</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full DAST, SAST &amp; Shannon Secret Scan</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Executive Interactive HTML Dashboard &amp; SARIF</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AgentShield Verified Secure SVG Badge Embed</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><b>1 Free Post-Fix Re-Scan</b> (within 14 days)</span>
              </li>
            </ul>
          </div>

          {/* Pro Package */}
          <div 
            onClick={() => setPackageTier("pro_399")}
            className={`cursor-pointer rounded-3xl p-6 sm:p-8 border transition-all ${
              packageTier === "pro_399"
                ? "bg-slate-900/90 border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.25)]"
                : "bg-slate-950 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                Full Agent Defense Suite
              </span>
              <span className="text-xs font-mono text-amber-400 font-bold">★ Most Comprehensive</span>
            </div>

            <div className="mt-4 mb-2">
              <span className="text-4xl font-extrabold text-white">$399</span>
              <span className="text-slate-400 text-xs font-mono ml-2">one-time</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              For venture-backed AI startups and high-concurrency agents requiring manual adversarial testing and compliance proof.
            </p>

            <ul className="space-y-2.5 text-xs font-mono text-slate-300 border-t border-slate-800 pt-5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dual Target: Web App <b>+</b> MCP Server / API</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Everything in Launch Sprint ($199)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Manual Adversarial Prompt Injection Testing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Signed PDF Security Compliance Certificate</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct Slack Bridge for 24hr Remediation Help</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><b>2 Free Post-Fix Re-Scans</b> (within 30 days)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Order Intake Form */}
      <section id="order-form" className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 max-w-4xl mx-auto space-y-6">
        <div>
          <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1 font-bold">
            Step 1 of 2: Register Target &amp; Proceed to Checkout
          </div>
          <h2 className="text-2xl font-bold text-white">
            Initiate Your 2-Hour Pre-Launch Security Audit
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Payment handled securely via Dodo Payments (Cards, Apple Pay, UPI). Instant receipt &amp; invoice issued.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleOrderSubmit} className="space-y-5 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold">Product / Company Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. PromptPilot AI"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold">Contact &amp; Delivery Email *</label>
              <input
                type="email"
                required
                placeholder="founder@company.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-cyan"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold">Live Target Web URL (DAST)</label>
              <input
                type="url"
                placeholder="https://app.yourproduct.com"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold">GitHub Repository URL (SAST &amp; MCP)</label>
              <input
                type="url"
                placeholder="https://github.com/org/repo (public or invited)"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-cyan"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold">Target Launch Timeline</label>
            <select
              value={launchDate}
              onChange={(e) => setLaunchDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-cyan"
            >
              <option value="Product Hunt Launch This Week">Product Hunt Launch This Week (Urgent 2-Hour SLA)</option>
              <option value="Hacker News Show HN Tomorrow">Hacker News Show HN Tomorrow</option>
              <option value="Enterprise Customer Pilot Review">Enterprise Customer Pilot Review</option>
              <option value="Routine Pre-Production Hardening">Routine Pre-Production Hardening</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold">Additional Notes or Secret Keys to Exclude (Optional)</label>
            <textarea
              rows={2}
              placeholder="Specify custom test credentials, staging headers, or specific MCP tool methods to scrutinize..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-cyan resize-none"
            />
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Selected Tier: <b>{packageTier === "starter_199" ? "$199 (Launch Sprint)" : "$399 (Full Defense Suite)"}</b></span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-500 hover:opacity-95 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.3)] disabled:opacity-50"
            >
              <span>{isSubmitting ? "Initiating Order..." : `Proceed to Secure Checkout (${packageTier === "starter_199" ? "$199" : "$399"})`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center">
          Frequently Answered Questions
        </h2>

        <div className="space-y-4 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-white font-bold flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-cyan" />
              <span>How does the 2-hour delivery guarantee work?</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Once your checkout is verified, our distributed automated runners in WebSecAuditor &amp; AgentShield immediately clone the target repo or initiate non-destructive DAST crawl pings. Our team verifies the finding output, compiles the executive dashboard and SVG badges, and delivers it directly to your email within 120 minutes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-white font-bold flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-cyan" />
              <span>Do you need access to private repositories?</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              For private GitHub repositories, you simply invite our automated auditor bot account (<code>@RitualDev-Lab-Auditor</code>) as a read-only collaborator. We execute the AST parsing and Shannon entropy scan entirely in ephemeral RAM without storing any proprietary code.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-white font-bold flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-cyan" />
              <span>What happens if critical vulnerabilities are discovered?</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              We provide the exact unified git diff patch to fix it. Once you apply the patch, use your <b>Free Re-scan credit</b> and we will re-audit your target within 1 hour to certify that your score is upgraded to Grade A+ before your launch goes live.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
