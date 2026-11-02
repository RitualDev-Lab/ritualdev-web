"use client";

import Link from "next/link";
import { 
  Lock, 
  Terminal, 
  ExternalLink,
  ShieldCheck,
  GitPullRequest,
  AlertTriangle,
  Code2
} from "lucide-react";

export default function WebSecAuditorPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
        <Link href="/" className="hover:text-rose-400">Home</Link>
        <span>/</span>
        <span className="text-rose-400">WebSecAuditor</span>
      </div>

      {/* Header */}
      <div className="border-b border-slate-800 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">WebSecAuditor</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/40 text-xs font-mono">
                AST Security Engine
              </span>
            </div>
            <p className="text-slate-400 text-sm sm:text-base font-mono mt-1">
              Static AST Taint Analysis &amp; Automated GitHub PR Security Bot
            </p>
          </div>
        </div>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          WebSecAuditor analyzes TypeScript, JavaScript, and Python codebases using Abstract Syntax Tree (AST) taint tracking. It detects hardcoded secrets, unsafe deserialization, SQL injections, and prototype pollution before malicious agent code is committed.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="https://github.com/RitualDev-Lab/web-sec-auditor"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Capabilities */}
      <section className="py-14 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-8">Key Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-rose-400">01 / AST TAINT TRACKING</div>
            <h3 className="text-lg font-bold text-white">Full Dataflow Graph</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Traces user-controlled inputs across function parameters, promise chains, and object destructuring into dangerous sinks (exec, eval, innerHTML, db.query).
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-rose-400">02 / PR REVIEW BOT</div>
            <h3 className="text-lg font-bold text-white">Turnkey GitHub Action</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Acts as an automated senior security engineer on pull requests. Comments directly with 1-click suggested diffs and blocks merges on critical CVSS violations.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-rose-400">03 / VERIFIED SECRET AUTO-REVOCATION</div>
            <h3 className="text-lg font-bold text-white">Live Cloud Validation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Actively verifies discovered AWS, OpenAI, Stripe, and GitHub tokens with zero false positives before triggering instant webhook revocation.
            </p>
          </div>
        </div>
      </section>

      {/* PR Bot Preview */}
      <section className="py-14">
        <h2 className="text-2xl font-bold text-white mb-6">GitHub PR Bot Action Preview</h2>
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 max-w-2xl bg-slate-950">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3 mb-4">
            <GitPullRequest className="w-5 h-5 text-rose-400" />
            <div className="text-xs font-mono text-slate-300">
              PR #42 &middot; <span className="text-white font-semibold">ritual-sec-bot</span> reviewed 2m ago
            </div>
          </div>
          <div className="text-xs font-mono space-y-2">
            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/40 text-rose-300">
              🚨 <strong>CRITICAL HIGH (CVSS 9.1):</strong> Unsanitized input flowed from <code>req.body.query</code> to <code>db.raw()</code> in <code>src/api/search.ts:44</code>.
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
              <span className="text-brand-green font-bold">Suggested Remediation:</span> Use parameterized query binding with <code>knex.raw(&quot;SELECT * FROM items WHERE name = ?&quot;, [query])</code>.
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
