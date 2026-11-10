"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Code2,
  Terminal,
  ExternalLink,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Clock,
  CreditCard,
  Lock,
  Layers,
} from "lucide-react";
import { buildMcpCheckoutUrl } from "../../lib/checkout-urls.js";

function McpOrderSuccessBanner() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  const orderId = searchParams.get("id");
  const tier = searchParams.get("tier");

  if (!isSuccess) return null;

  return (
    <div className="p-6 rounded-3xl bg-emerald-950/40 border border-emerald-500/40 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4" />
          <span>Order Confirmed • 48-Hour MCP Engineering Sprint Queued</span>
        </div>
        <h2 className="text-lg font-bold text-white">
          Thank you! Reference {orderId ? `#${orderId}` : "Registered"}
          {tier === "pro_699" ? " (Monetized & Cloud MCP)" : " (Standard Connector)"}
        </h2>
        <p className="text-xs text-slate-300 font-mono">
          We received your checkout and API details. You will receive your working prototype &amp; private GitHub repository invite within 24–48 hours. Need faster kickoff? Email{" "}
          <a href="mailto:hello@ritualdev.in" className="text-emerald-400 underline">
            hello@ritualdev.in
          </a>{" "}
          with your order reference.
        </p>
      </div>
    </div>
  );
}

export default function MCPBuilderPage() {
  const [companyName, setCompanyName] = useState("");
  const [apiDocsUrl, setApiDocsUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [tier, setTier] = useState<"standard_349" | "pro_699">("standard_349");
  const [preferredTransport, setPreferredTransport] = useState("stdio + sse");
  const [includeMonetization, setIncludeMonetization] = useState(true);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim() || (!apiDocsUrl.trim() && !notes.trim())) {
      setErrorMsg("Please provide your contact email and API documentation / OpenAPI link.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const orderId = `MCP-SVC-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      try {
        const res = await fetch("/api/mcp-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyName,
            apiDocsUrl,
            contactEmail,
            tier,
            preferredTransport,
            includeMonetization,
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

      const checkoutUrl = buildMcpCheckoutUrl({
        orderId,
        tier,
        companyName,
        apiDocsUrl,
        contactEmail,
        preferredTransport,
        includeMonetization,
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
        <span className="text-brand-cyan font-bold">Done-For-You MCP Server (48h)</span>
      </div>

      <Suspense fallback={null}>
        <McpOrderSuccessBanner />
      </Suspense>

      {/* Hero Header */}
      <div className="space-y-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
          <Clock className="w-3.5 h-3.5 animate-pulse" />
          <span>Done-For-You Engineering • 48-Hour Turnaround SLA</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Official MCP Server Built <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            For Your SaaS or API in 48 Hours
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-3xl mx-auto">
          Let developers and customers use your product directly inside <b>Claude Desktop</b>, <b>Cursor</b>, and <b>Windsurf</b>. We wrap your API, configure auth, test JSON-RPC tool calls, and ship your production MCP server + registry listings in under 48 hours.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#order-form"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:opacity-95 transition-all"
          >
            <Boxes className="w-4 h-4" />
            <span>Commission Your MCP Server ($349)</span>
          </a>
          <a
            href="#cli-open-source"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-mono font-bold flex items-center gap-2 transition-colors"
          >
            <span>Explore Open-Source CLI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* What We Deliver in 48 Hours */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
            Turnkey Deliverables
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Everything Included in Your 48-Hour MCP Package
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Typed Zod Tools &amp; Schemas</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synthesized directly from your OpenAPI 3.1 specification, Postman collection, or REST endpoints with strict parameter validation and robust error handling.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-brand-cyan flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Auth &amp; Optional Paywalls</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              API key, Bearer, or OAuth header wiring — plus optional <code>mcp-monetize</code> middleware so you can charge Claude &amp; Cursor users per call or monthly.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Packaged &amp; Registry Ready</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tested inside Claude Desktop and Cursor with turnkey <code>claude_desktop_config.json</code>, Dockerfile, npm binary scaffold, and DevShelf listing.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section id="service-packages" className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
            Transparent Fixed Pricing
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Choose Your Done-for-You MCP Server Tier
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Standard Tier */}
          <div
            onClick={() => setTier("standard_349")}
            className={`cursor-pointer rounded-3xl p-6 sm:p-8 border transition-all ${
              tier === "standard_349"
                ? "bg-slate-900/90 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.25)]"
                : "bg-slate-950 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Standard Connector
              </span>
              <span className="text-xs font-mono text-slate-400">⚡ 48-Hour Delivery</span>
            </div>

            <div className="mt-4 mb-2">
              <span className="text-4xl font-extrabold text-white">$349</span>
              <span className="text-slate-400 text-xs font-mono ml-2">one-time</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Ideal for SaaS startups, public APIs, and dev tools needing an official Claude Desktop &amp; Cursor connector.
            </p>

            <ul className="space-y-2.5 text-xs font-mono text-slate-300 border-t border-slate-800 pt-5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Up to 6 Strongly Typed MCP Tools</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>API Key &amp; Environment Variable Authentication</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Standard stdio Transport (Claude &amp; Cursor tested)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Smithery / DevShelf Registry Submission PR Included</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Full Source Code Ownership (MIT License)</span>
              </li>
            </ul>
          </div>

          {/* Pro Tier */}
          <div
            onClick={() => setTier("pro_699")}
            className={`cursor-pointer rounded-3xl p-6 sm:p-8 border transition-all ${
              tier === "pro_699"
                ? "bg-slate-900/90 border-cyan-400 shadow-[0_0_30px_rgba(56,189,248,0.25)]"
                : "bg-slate-950 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Monetized &amp; Cloud MCP
              </span>
              <span className="text-xs font-mono text-amber-400 font-bold">★ Most Popular</span>
            </div>

            <div className="mt-4 mb-2">
              <span className="text-4xl font-extrabold text-white">$699</span>
              <span className="text-slate-400 text-xs font-mono ml-2">one-time</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              For teams that want remote SSE hosting, OAuth/API auth, and optional Dodo/Stripe paywalls per tool call.
            </p>

            <ul className="space-y-2.5 text-xs font-mono text-slate-300 border-t border-slate-800 pt-5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Up to 18 Strongly Typed MCP Tools</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dual Transport: <b>stdio</b> (Desktop) <b>+ SSE</b> (Remote Cloud)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><b>mcp-monetize Billing Integration</b> (Dodo &amp; Stripe)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Turnkey Dockerfile + Railway / Render Cloud Setup</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2 Free Tool Revisions within 30 days</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Order Intake Form */}
      <section id="order-form" className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 max-w-4xl mx-auto space-y-6">
        <div>
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1 font-bold">
            Step 1 of 2: Submit API Spec &amp; Checkout
          </div>
          <h2 className="text-2xl font-bold text-white">
            Commission Your Custom MCP Server
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            We review your API specification immediately and deliver your tested repository in under 48 hours.
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
                placeholder="e.g. Acme API"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold">Delivery &amp; Notification Email *</label>
              <input
                type="email"
                required
                placeholder="founder@acme.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold">API Documentation URL or OpenAPI 3.1 JSON / YAML Link *</label>
            <input
              type="url"
              required
              placeholder="https://api.acme.com/openapi.json or docs URL"
              value={apiDocsUrl}
              onChange={(e) => setApiDocsUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold">Transport Architecture</label>
              <select
                value={preferredTransport}
                onChange={(e) => setPreferredTransport(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="stdio + sse">stdio (Local Claude/Cursor) + SSE (Remote Web)</option>
                <option value="stdio only">stdio Only (Local Desktop CLI)</option>
                <option value="sse only">SSE Only (Hosted Cloud Microservice)</option>
              </select>
            </div>

            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="text-slate-300 font-bold flex items-center gap-2 cursor-pointer pb-3">
                <input
                  type="checkbox"
                  checked={includeMonetization}
                  onChange={(e) => setIncludeMonetization(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-emerald-400 w-4 h-4"
                />
                <span>Include <code>mcp-monetize</code> Billing Middleware</span>
              </label>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold">Additional Method Priorities or Authentication Notes (Optional)</label>
            <textarea
              rows={2}
              placeholder="Mention the top 3-5 endpoints you want prioritized, custom auth tokens, or special headers..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400 resize-none"
            />
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Selected Tier: <b>{tier === "standard_349" ? "$349 (Standard 48h)" : "$699 (Monetized & Cloud)"}</b></span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-95 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50"
            >
              <span>{isSubmitting ? "Initiating Order..." : `Proceed to Secure Checkout (${tier === "standard_349" ? "$349" : "$699"})`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </section>

      {/* Open-Source Self-Scaffold CLI Section */}
      <section id="cli-open-source" className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <span>Prefer to Build It Yourself? Use our Open-Source CLI</span>
          </h2>
          <Link
            href="https://github.com/RitualDev-Lab/mcp-builder-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
        <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-3 overflow-x-auto">
          <div className="text-slate-500"># 1. Convert an OpenAPI spec into a typed MCP server locally</div>
          <div>
            <span className="text-emerald-400">$</span> npx @ritualdev-lab/mcp-builder-kit from-openapi ./openapi.json --lang typescript
          </div>
          <div className="text-slate-500 pt-2"># 2. Or scaffold an MCP project interactively &amp; wire billing middleware</div>
          <div>
            <span className="text-emerald-400">$</span> npx @ritualdev-lab/mcp-builder-kit init my-api-mcp --lang typescript --transport both
          </div>
          <div className="text-slate-500 pt-2"># 3. Open-source payment middleware reference:</div>
          <div>
            <span className="text-emerald-400">$</span> git clone https://github.com/RitualDev-Lab/mcp-monetize.git
          </div>
        </div>
      </section>
    </div>
  );
}
