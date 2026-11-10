"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  Terminal,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  Code2,
  Bug,
  KeyRound,
  HelpCircle,
} from "lucide-react";
import { buildAuditCheckoutUrl } from "../../lib/checkout-urls.js";

export default function AuditPage() {
  const [productName, setProductName] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [launchDate, setLaunchDate] = useState("Product Hunt / Show HN Launch This Week");
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
        // Fallback if API route unreachable
      }

      const checkoutUrl = buildAuditCheckoutUrl({
        orderId,
        packageTier,
        productName,
        targetUrl,
        repoUrl,
        contactEmail,
      });
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
        <span className="text-brand-cyan font-bold">Pre-Launch Security &amp; Secret Audit</span>
      </div>

      {/* Hero Header */}
      <div className="space-y-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-brand-cyan border border-cyan-500/30 text-xs font-mono font-bold">
          <Clock className="w-3.5 h-3.5 animate-pulse" />
          <span>24-Hour Turnaround • Product Hunt, Show HN &amp; Vibe-Coded Launch Protection</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Pre-Launch Security &amp; <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-400 to-indigo-400">
            Secret Leak Audit
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-3xl mx-auto">
          Shipped fast with Cursor, Claude Code, or Lovable? Don&apos;t launch on Show HN or Product Hunt with leaked API keys, missing CORS/CSP headers, unguarded endpoints, or prompt injection flaws. Get concrete Git PR fixes and a verified launch dossier in &lt; 24 hours.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#order-form"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:opacity-95 transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Book Indie Launch Audit ($199)</span>
          </a>
          <a
            href="#sample-findings"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-mono font-bold flex items-center gap-2 transition-colors"
          >
            <span>See Concrete Deliverables</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* The 4 Attack Vectors We Audit */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-bold">
            What We Inspect
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            4 Launch-Day Killers Found in AI-Built Apps
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Powered by AgentShield, WebSecAuditor, and DBShield + manual security engineering review.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center">
              <Bug className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Prompt Injection</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Indirect prompt injection, system prompt extraction, and untrusted user input paths into LLM tool calls.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Auth &amp; Endpoint Gaps</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unauthenticated Next.js API routes, permissive CORS, missing security headers, and exposed admin paths.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Secret &amp; Env Leaks</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Shannon entropy scanning across git history, client JS bundles, and Supabase/Stripe/OpenAI key exposure.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-brand-cyan flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">OWASP &amp; SQL Taint</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Static AST taint tracking across ORM calls (Prisma, Drizzle, SQLAlchemy), unsafe evals, and command sinks.
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
              What You Receive Within 24 Hours
            </h2>
          </div>
          <span className="px-3 py-1 text-xs font-mono rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold shrink-0">
            100% Confidential • Actionable Patches
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-brand-cyan font-bold flex items-center gap-2 text-sm">
              <FileCheck className="w-4 h-4" />
              <span>1. Executive HTML &amp; SARIF Report</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Prioritized findings ranked by real exploitability plus OASIS SARIF v2.1.0 logs ready for GitHub Security.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
              ✓ Secret &amp; Env Leak Check<br />
              ✓ CORS / CSP / HSTS Headers<br />
              ✓ OWASP Top 10 SAST Results
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-purple-400 font-bold flex items-center gap-2 text-sm">
              <Code2 className="w-4 h-4" />
              <span>2. Ready-to-Merge Fix Diffs</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              No vague checklists. Exact code patches &amp; unified git diffs you can merge before launch day.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-emerald-400 font-mono">
              + &quot;Content-Security-Policy&quot;: ...<br />
              + requireAuthSession(req);
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-emerald-400 font-bold flex items-center gap-2 text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>3. Verified Badge + Free Re-Scan</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Once critical findings are patched, we re-run verification free and issue your README/site SVG badge.
            </p>
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-200 text-center font-bold">
              🛡️ AgentShield | Verified Secure
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-bold">
            Productized Security Tiers
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Choose Your Pre-Launch Audit Tier
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Starter Indie Audit */}
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
                Indie Launch Sprint
              </span>
              <span className="text-xs font-mono text-slate-400">⚡ &lt; 24h Delivery</span>
            </div>

            <div className="mt-4 mb-2">
              <span className="text-4xl font-extrabold text-white">$199</span>
              <span className="text-slate-400 text-xs font-mono ml-2">one-time per repo</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              For solo founders &amp; indie SaaS teams shipping on Product Hunt or Show HN who want peace of mind before traffic hits.
            </p>

            <ul className="space-y-2.5 text-xs font-mono text-slate-300 border-t border-slate-800 pt-5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1 Web App / SaaS URL + 1 GitHub Repository</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Secret &amp; Client-Bundle Key Leak Scan (Shannon Entropy)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Static AST Security Scan + Security Headers / CORS Check</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Executive HTML Report + SARIF 2.1.0 + PR Fix Snippets</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><b>1 Free Post-Fix Re-Scan</b> + Verified Badge</span>
              </li>
            </ul>
          </div>

          {/* Pro Full SaaS + MCP Defense Audit */}
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
                Full SaaS + MCP Audit
              </span>
              <span className="text-xs font-mono text-amber-400 font-bold">★ Startup Recommended</span>
            </div>

            <div className="mt-4 mb-2">
              <span className="text-4xl font-extrabold text-white">$399</span>
              <span className="text-slate-400 text-xs font-mono ml-2">one-time</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Hands-on manual + automated security review for AI startups running LLM agents, MCP servers, and production databases.
            </p>

            <ul className="space-y-2.5 text-xs font-mono text-slate-300 border-t border-slate-800 pt-5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Everything in Indie Launch Sprint ($199)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Manual Prompt Injection &amp; Tool-Escape Testing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Database / ORM Query Guardrail &amp; Auth Bypass Review</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Signed Audit Summary + Direct Remediation Walkthrough</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><b>2 Free Post-Fix Re-Scans</b> within 30 days</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs font-mono text-slate-400 pt-2">
          Need multi-service enterprise architecture / SOC 2 VPC assessment ($1,500+)?{" "}
          <Link href="/enterprise" className="text-brand-cyan hover:underline font-bold">
            Request an Enterprise Review →
          </Link>
        </div>
      </section>

      {/* Order Intake Form */}
      <section id="order-form" className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 max-w-4xl mx-auto space-y-6">
        <div>
          <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1 font-bold">
            Step 1 of 2: Register Target &amp; Proceed to Checkout
          </div>
          <h2 className="text-2xl font-bold text-white">
            Initiate Your Pre-Launch Security Audit
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Payment handled securely via Dodo Payments (Cards, Apple Pay, Google Pay, UPI). Automatic invoice issued.
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
                placeholder="e.g. PromptPilot AI / Acme Corp"
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
              <label className="text-slate-300 font-bold">Live Target Web URL</label>
              <input
                type="url"
                placeholder="https://app.yourproduct.com"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold">GitHub Repository URL</label>
              <input
                type="url"
                placeholder="https://github.com/org/repo (public or private invite)"
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
              <option value="Product Hunt / Show HN Launch This Week">Product Hunt / Show HN Launch This Week (&lt; 24h SLA)</option>
              <option value="Already Live / Post-Launch Hardening">Already Live / Post-Launch Hardening</option>
              <option value="Enterprise Customer Pilot Review">Enterprise Customer Pilot Review</option>
              <option value="Routine Pre-Production Hardening">Routine Pre-Production Hardening</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold">Additional Notes (Optional)</label>
            <textarea
              rows={2}
              placeholder="Specify endpoints, auth flows, or specific MCP tools you want us to focus on..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-cyan resize-none"
            />
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Selected Tier: <b>{packageTier === "starter_199" ? "$199 (Indie Launch Sprint)" : "$399 (Full SaaS + MCP Audit)"}</b></span>
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
              <span>How does the 24-hour delivery guarantee work?</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Once checkout completes, we run automated SAST, secret entropy scanning, and non-destructive security header/endpoint checks on your target, manually review high-risk sinks, and email your HTML dashboard, SARIF log, and concrete fix diffs within 24 hours.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-white font-bold flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-cyan" />
              <span>Do you need access to private repositories?</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              For private repos, you can grant temporary read-only access or test exclusively against a staging URL / PR snapshot. Source files are purged immediately after report delivery.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-white font-bold flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-cyan" />
              <span>What happens if critical vulnerabilities are discovered?</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              We provide exact patch code to fix each finding. Once you apply the fixes, redeem your free re-scan credit so we can verify remediation and issue your Verified Secure badge.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
