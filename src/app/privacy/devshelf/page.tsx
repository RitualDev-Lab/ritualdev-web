import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, BookOpen, Lock, EyeOff, Globe, CheckCircle2, Server } from "lucide-react";

export const metadata = {
  title: "Privacy Policy for DevShelf — RitualDev",
  description: "Official Privacy Policy and Data Safety Disclosures for DevShelf (Open-Source Developer Tools & AI Agent Registry). Zero Tracking, 100% Transparent."
};

export default function DevShelfPrivacyPage() {
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
          <span>OPEN-SOURCE REGISTRY PRIVACY POLICY &middot; LAST UPDATED: NOVEMBER 7, 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Privacy Policy for DevShelf
        </h1>
        <div className="text-xs font-mono text-slate-400 mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>Platform: <code className="text-emerald-400">DevShelf Catalog &amp; Programmatic API</code></span>
          <span>&middot;</span>
          <span>Portal: <code className="text-slate-300">devshelf.ritualdev.in</code></span>
          <span>&middot;</span>
          <span>Category: <code className="text-cyan-400">Developer Tooling &amp; AI Registries</code></span>
          <span>&middot;</span>
          <span>Developer: <code className="text-slate-300">RitualDev Studio</code></span>
        </div>
      </div>

      <div className="space-y-10 text-sm text-slate-300 leading-relaxed font-sans">
        
        {/* Executive Guarantee Card */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30">
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Open Registry Privacy Mandate: Zero Personal Tracking &amp; Public Metadata</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            DevShelf is an open-source catalog, discovery engine, and programmatic REST registry for developer tools, AI agent skills, MCP servers, and automation frameworks. DevShelf is built to be browsed and consumed via automated agents and human developers alike <strong>with zero tracking cookies, zero account walls, and zero behavioral surveillance</strong>.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" />
            <span>1. What DevShelf Stores &amp; Distributes</span>
          </h2>
          <p>
            DevShelf acts solely as an index of publicly available software packages, MCP plugins, and GitHub repositories:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>PUBLIC SOFTWARE METADATA</span>
              </div>
              <p className="text-slate-300">
                Tool names, GitHub repository URLs, open-source licenses (MIT, Apache 2.0), tags, stargazers, and verified release tags. No private code is ever indexed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>PROGRAMMATIC REST API &amp; RSS FEEDS</span>
              </div>
              <p className="text-slate-300">
                JSON catalog feeds, RSS XML, and Atom feeds are served statically from Cloudflare's global edge without authenticating or tracking consumers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-purple-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>AUTOMATED COMMUNITY INGESTION</span>
              </div>
              <p className="text-slate-300">
                Tool submissions are reviewed via public GitHub pull requests on <code className="text-slate-200">RitualDev-Lab/DevShelf</code>. All contributor attribution is transparently visible on Git commits.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>STATIC CDN BADGES</span>
              </div>
              <p className="text-slate-300">
                SVG verification badges rendered by DevShelf are served with aggressive caching headers. No client tracking or IP logging is retained.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-rose-400" />
            <span>2. What We Never Collect</span>
          </h2>
          <p>
            DevShelf rejects tracking mechanisms:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
            <li><strong>No Tracking Cookies:</strong> DevShelf uses zero tracking, marketing, or advertising cookies.</li>
            <li><strong>No User Profiling:</strong> We do not log search queries, user browsing paths, or agent inspection histories.</li>
            <li><strong>No Paywalls or Mandatory Accounts:</strong> Developers and AI coding agents can query the entire registry anonymously without registering accounts.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-cyan-400" />
            <span>3. Edge Caching &amp; Minimal Network Telemetry</span>
          </h2>
          <p>
            DevShelf is hosted on Cloudflare Pages. Cloudflare may process transient network connection metadata (IP address, user agent, TLS cipher) strictly to mitigate DDoS attacks and protect the catalog from malicious abuse. These logs are ephemeral and not linked to individual identities.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>4. Contributor Rights &amp; Listing Removal</span>
          </h2>
          <p>
            If you are a maintainer of an open-source project indexed on DevShelf and wish to update its metadata or request delisting:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
            <li>Submit a pull request to edit <code className="text-slate-200">data/ai-tools.json</code> on GitHub.</li>
            <li>Or email <a href="mailto:developer@ritualdev.in" className="text-emerald-400 hover:underline">developer@ritualdev.in</a> with your repository link for immediate manual removal.</li>
          </ul>
        </section>

        {/* Section 5: Contact */}
        <section className="space-y-4 p-6 rounded-2xl glass-panel border border-slate-800 bg-slate-900/80">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>5. Contact &amp; Registry Maintainers</span>
          </h2>
          <div className="text-xs font-mono text-slate-300 space-y-1.5 pt-2">
            <div>Registry Desk: <a href="mailto:developer@ritualdev.in" className="text-emerald-400 hover:underline">developer@ritualdev.in</a></div>
            <div>GitHub Repository: <a href="https://github.com/RitualDev-Lab/DevShelf" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline">https://github.com/RitualDev-Lab/DevShelf</a></div>
            <div>Public Portal: <a href="https://devshelf.ritualdev.in" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">https://devshelf.ritualdev.in</a></div>
            <div>Main Studio: <Link href="https://ritualdev.in" className="text-emerald-400 hover:underline">https://ritualdev.in</Link></div>
          </div>
        </section>

      </div>

    </div>
  );
}
