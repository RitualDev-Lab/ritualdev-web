"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Database, 
  Terminal, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  ShieldAlert, 
  MessageSquare, 
  Sparkles, 
  Play, 
  RotateCcw, 
  AlertTriangle, 
  Check, 
  Cpu, 
  FileCode, 
  Layers, 
  Lock,
  ArrowRight
} from "lucide-react";
import TeamCheckoutBanner from "@/components/TeamCheckoutBanner";

interface Scenario {
  id: string;
  title: string;
  tag: string;
  tagColor: string;
  intent: string;
  sql: string;
  expectedRows: number;
  expectedColumns: string[];
  simulatedRows: number;
  columnsMutated: string[];
  sensitiveColumnsHit: string[];
  gapDetected: boolean;
  gapType: "PRIVILEGE_ESCALATION" | "BLAST_RADIUS_EXPLOSION" | "COMMENT_EVASION_SQLI" | "NONE";
  gapHeadline: string;
  gapExplanation: string;
  riskScore: number;
  verdict: "BLOCKED" | "ALIGNED";
  vfsPages: number[];
}

const PRESET_SCENARIOS: Scenario[] = [
  {
    id: "privilege-escalation",
    title: "Privilege Escalation Tampering",
    tag: "High Risk",
    tagColor: "border-rose-500/40 text-rose-400 bg-rose-950/20",
    intent: "Update profile picture URL for user account #402",
    sql: "UPDATE users SET role = 'admin', avatar_url = 'https://cdn.corp/pic.png' WHERE id = 402;",
    expectedRows: 1,
    expectedColumns: ["avatar_url"],
    simulatedRows: 1,
    columnsMutated: ["role", "avatar_url"],
    sensitiveColumnsHit: ["role"],
    gapDetected: true,
    gapType: "PRIVILEGE_ESCALATION",
    gapHeadline: "Intent-Effect Privilege Gap: role = 'admin'",
    gapExplanation: "Stated intent only authorized avatar image update, but simulated effect attempted to escalate user to superadmin. Blocked before production commit.",
    riskScore: 92,
    verdict: "BLOCKED",
    vfsPages: [1, 4]
  },
  {
    id: "unbounded-deletion",
    title: "Unbounded Deletion Explosion",
    tag: "Catastrophic",
    tagColor: "border-amber-500/40 text-amber-400 bg-amber-950/20",
    intent: "Archive stale demo trial account #9012",
    sql: "DELETE FROM accounts WHERE created_at < '2026-01-01';",
    expectedRows: 1,
    expectedColumns: ["id"],
    simulatedRows: 14820,
    columnsMutated: ["*"],
    sensitiveColumnsHit: ["accounts (all rows)"],
    gapDetected: true,
    gapType: "BLAST_RADIUS_EXPLOSION",
    gapHeadline: "Blast Radius Gap: 14,820 rows affected (Expected: 1)",
    gapExplanation: "Agent omitted the specific account ID filter, causing catastrophic mass deletion across production. Shadow sandbox caught the gap and auto-rolled back.",
    riskScore: 98,
    verdict: "BLOCKED",
    vfsPages: [1, 2, 3, 5, 8, 12, 19]
  },
  {
    id: "comment-evasion",
    title: "Comment Evasion & Data Exfiltration",
    tag: "Evasion Attack",
    tagColor: "border-purple-500/40 text-purple-400 bg-purple-950/20",
    intent: "Check subscription status for organization #88",
    sql: "SELECT id, status FROM subscriptions WHERE org_id = 88 /**/ UNION SELECT id, hashed_token FROM credentials;",
    expectedRows: 1,
    expectedColumns: ["id", "status"],
    simulatedRows: 450,
    columnsMutated: ["credentials table exfiltration"],
    sensitiveColumnsHit: ["hashed_token", "credentials"],
    gapDetected: true,
    gapType: "COMMENT_EVASION_SQLI",
    gapHeadline: "AST Lexical Evasion & Tautology Exfiltration",
    gapExplanation: "Agent used inline comment trick /**/ to evade naive regex detectors and harvest the credentials table. AST Normalizer stripped evasion and blocked the query.",
    riskScore: 89,
    verdict: "BLOCKED",
    vfsPages: [1, 6]
  },
  {
    id: "safe-mutation",
    title: "Aligned Safe Mutation",
    tag: "Verified Safe",
    tagColor: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20",
    intent: "Update shipping delivery notes for order #1080",
    sql: "UPDATE orders SET notes = 'Leave at front porch door' WHERE id = 1080;",
    expectedRows: 1,
    expectedColumns: ["notes"],
    simulatedRows: 1,
    columnsMutated: ["notes"],
    sensitiveColumnsHit: [],
    gapDetected: false,
    gapType: "NONE",
    gapHeadline: "Intent vs. Effect Aligned (Zero Discrepancy)",
    gapExplanation: "Simulated blast radius in shadow sandbox exactly matches stated intent (1 row mutated, non-sensitive column 'notes'). Signed with monotonic fencing token #1004.",
    riskScore: 5,
    verdict: "ALIGNED",
    vfsPages: [1, 9]
  }
];

export default function DBShieldPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [customIntent, setCustomIntent] = useState(PRESET_SCENARIOS[0].intent);
  const [customSql, setCustomSql] = useState(PRESET_SCENARIOS[0].sql);
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(true);

  const scenario = PRESET_SCENARIOS[activeScenarioIdx];

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSelectScenario = (idx: number) => {
    setActiveScenarioIdx(idx);
    setCustomIntent(PRESET_SCENARIOS[idx].intent);
    setCustomSql(PRESET_SCENARIOS[idx].sql);
    setHasSimulated(true);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setHasSimulated(true);
    }, 450);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-800 pb-4">
        <Link href="/" className="hover:text-brand-cyan">Home</Link>
        <span>/</span>
        <span className="text-brand-cyan font-bold">DBShield</span>
      </div>

      {/* Hero Header */}
      <div className="border-b border-slate-800 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30">
            <Database className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">DBShield</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/40 text-xs font-mono">
                Wire Proxy &middot; v0.2.1
              </span>
            </div>
            <p className="text-slate-400 text-sm sm:text-base font-mono mt-1">
              Database Guardrail, Virtual Schema Masking &amp; Dry-Run Sandboxing Wire Proxy
            </p>
          </div>
        </div>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          DBShield sits between autonomous AI coding agents and your databases (PostgreSQL, MySQL, SQLite, Supabase, Neon). It masks sensitive tables from agent introspection, isolates destructive mutations in shadow dry-run envelopes, and verifies the gap between stated intent and actual effect before committing.
        </p>

        {/* Hero Thesis Manifesto Callout */}
        <div className="mt-8 p-6 rounded-2xl bg-slate-900/90 border border-brand-cyan/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-brand-cyan/20 text-brand-cyan shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-bold">
                The Core Thesis: Bridging Intent vs. Effect
              </div>
              <p className="text-sm sm:text-base text-slate-200 font-sans italic leading-relaxed">
                &ldquo;Dry-run sandboxing is the piece that stands out. Guardrails and masking catch known bad patterns, but a sandbox shows what an agent&apos;s query would actually do before production. That gap between intent and effect is where most agent database incidents begin.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Quick CLI Bar */}
        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-slate-200">
            <span className="text-brand-cyan">$</span>
            <span>npx @ritualdev-lab/dbshield proxy --port 5432</span>
            <button
              onClick={() => copyText("npx @ritualdev-lab/dbshield proxy --port 5432", "cli-proxy")}
              className="ml-2 text-slate-400 hover:text-white"
            >
              {copied === "cli-proxy" ? <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-slate-200">
            <span className="text-brand-cyan">$</span>
            <span>npm install @ritualdev-lab/dbshield</span>
            <button
              onClick={() => copyText("npm install @ritualdev-lab/dbshield", "npm")}
              className="ml-2 text-slate-400 hover:text-white"
            >
              {copied === "npm" ? <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <Link
            href="https://github.com/RitualDev-Lab/DBShield"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 🔬 INTERACTIVE INTENT VS. EFFECT DRY-RUN VISUALIZER       */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="space-y-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">
              <Cpu className="w-4 h-4" />
              <span>Live Dry-Run Sandbox Playground</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interactive &ldquo;Intent vs. Effect&rdquo; Sandbox Visualizer
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              See what happens when an AI agent emits SQL that diverges from its stated objective. DBShield executes the query inside an auto-rollback shadow sandbox and pinpoints the gap.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SQLite OS Page VFS Shim Active</span>
          </div>
        </div>

        {/* Preset Selector Chips */}
        <div className="flex flex-wrap gap-2 pt-2">
          {PRESET_SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                activeScenarioIdx === idx
                  ? "bg-brand-cyan text-slate-950 font-bold shadow-md shadow-brand-cyan/20"
                  : "bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
              }`}
            >
              <span>{sc.title}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                activeScenarioIdx === idx ? "bg-slate-950 text-brand-cyan" : sc.tagColor
              }`}>
                {sc.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Visualizer Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Input Panel */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-slate-800 space-y-5 bg-slate-950/70">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center justify-between">
                <span>1. AGENT&apos;S STATED INTENT (NATURAL LANGUAGE)</span>
                <span className="text-[10px] text-brand-cyan">Semantic Context</span>
              </label>
              <textarea
                value={customIntent}
                onChange={(e) => setCustomIntent(e.target.value)}
                rows={2}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 font-sans text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-brand-cyan transition-colors"
                placeholder="Describe what the agent claims it is trying to do..."
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center justify-between">
                <span>2. AGENT&apos;S EMITTED SQL QUERY</span>
                <span className="text-[10px] text-amber-400">Intercepted Wire Payload</span>
              </label>
              <textarea
                value={customSql}
                onChange={(e) => setCustomSql(e.target.value)}
                rows={4}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 font-mono text-xs sm:text-sm text-amber-300 focus:outline-none focus:border-brand-cyan transition-colors"
                placeholder="Enter SQL mutation..."
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="px-5 py-2.5 rounded-xl bg-brand-cyan hover:bg-sky-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-brand-cyan/20 disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing in Shadow Sandbox...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Dry-Run Sandbox Simulation</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleSelectScenario(activeScenarioIdx)}
                className="text-xs font-mono text-slate-500 hover:text-slate-300 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Defense Pipeline Footprint */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
              <div className="text-slate-300 font-semibold mb-1">Defense Pipeline Status:</div>
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="w-3 h-3" />
                <span>AST Lexical Token Normalizer: Active</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="w-3 h-3" />
                <span>BEGIN TRANSACTION READ ONLY envelope</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="w-3 h-3" />
                <span>SQLite Page-Level VFS Interception (4KB Pages)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Simulation Output & Gap Analysis */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-6 bg-slate-950/80">
            {hasSimulated && (
              <div className="space-y-6">
                
                {/* Verdict Banner */}
                <div className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                  scenario.verdict === "BLOCKED"
                    ? "bg-rose-950/30 border-rose-500/50 text-rose-200"
                    : "bg-emerald-950/30 border-emerald-500/50 text-emerald-200"
                }`}>
                  <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                    scenario.verdict === "BLOCKED" ? "bg-rose-900/40 text-rose-400" : "bg-emerald-900/40 text-emerald-400"
                  }`}>
                    {scenario.verdict === "BLOCKED" ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        scenario.verdict === "BLOCKED" ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      }`}>
                        {scenario.verdict === "BLOCKED" ? "🚨 GAP DETECTED - BLOCKED" : "✅ INTENT ALIGNED - APPROVED"}
                      </span>
                      <span className="text-xs font-mono text-slate-400">Risk Score: {scenario.riskScore}/100</span>
                    </div>
                    <div className="font-bold text-sm sm:text-base text-white">{scenario.gapHeadline}</div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {scenario.gapExplanation}
                    </p>
                  </div>
                </div>

                {/* Side-by-Side Intent vs. Effect Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Expected Stated Intent */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Expected from Intent</span>
                      <span className="text-brand-cyan">Baseline</span>
                    </div>
                    
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                        <span className="text-slate-400">Target Rows:</span>
                        <span className="text-white font-bold">{scenario.expectedRows}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                        <span className="text-slate-400">Permitted Columns:</span>
                        <span className="text-slate-200">{scenario.expectedColumns.join(", ")}</span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-slate-400">Sensitive Privileges:</span>
                        <span className="text-emerald-400 font-bold">None</span>
                      </div>
                    </div>
                  </div>

                  {/* Actual Simulated Effect */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Simulated Shadow Effect</span>
                      <span className={scenario.gapDetected ? "text-rose-400" : "text-emerald-400"}>
                        {scenario.gapDetected ? "Discrepancy" : "Exact Match"}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                        <span className="text-slate-400">Simulated Rows:</span>
                        <span className={`font-bold ${scenario.simulatedRows > scenario.expectedRows ? "text-rose-400 animate-pulse" : "text-white"}`}>
                          {scenario.simulatedRows.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                        <span className="text-slate-400">Columns Altered:</span>
                        <span className="text-slate-200">{scenario.columnsMutated.join(", ")}</span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-slate-400">Sensitive Columns Hit:</span>
                        <span className={`font-bold ${scenario.sensitiveColumnsHit.length > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                          {scenario.sensitiveColumnsHit.length > 0 ? scenario.sensitiveColumnsHit.join(", ") : "0"}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* VFS OS Page Interception & HMAC Audit Evidence */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Lock className="w-3.5 h-3.5 text-brand-cyan" />
                      <span>SQLite VFS Page Interception &amp; HMAC Ledger</span>
                    </span>
                    <span className="text-[10px] text-slate-500">PCI-DSS v4.0 Req 10</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                    <div>
                      <span className="text-slate-500">Envelope:</span>
                      <div className="text-slate-300 truncate">BEGIN ... ROLLBACK</div>
                    </div>
                    <div>
                      <span className="text-slate-500">VFS Pages:</span>
                      <div className="text-brand-cyan">[{scenario.vfsPages.join(", ")}]</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Page 1 Root:</span>
                      <div className="text-emerald-400">Protected</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Ledger Entry:</span>
                      <div className="text-slate-300 font-mono">HMAC-SHA256</div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-8 border-t border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-8">
          Enterprise Database Defense Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-brand-cyan">01 / SCHEMA MASKING</div>
            <h3 className="text-lg font-bold text-white">Virtual Schema RBAC</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamically intercepts <code className="text-slate-300">information_schema</code> and <code className="text-slate-300">pg_catalog</code> queries. AI agents never see customer PII columns, authentication tables, or internal audit logs.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-brand-cyan">02 / CHATOPS INTEGRATION</div>
            <h3 className="text-lg font-bold text-white">Slack &amp; Teams Approval Feed</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sends HMAC-SHA256 authenticated interactive Block Kit cards to your corporate <code className="text-slate-300">#db-approvals</code> channel. Human engineers can review AST diffs and approve with 1 click.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-brand-cyan">03 / DRY-RUN TOKENS</div>
            <h3 className="text-lg font-bold text-white">Distributed Dry-Run Manager</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Coordinates two-phase dry-run transaction verification across multi-store architectures (PostgreSQL + Redis + SQLite) before applying any mutations.
            </p>
          </div>

        </div>
      </section>

      {/* ChatOps Bot Visualizer */}
      <section className="py-8 border-t border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider mb-2">
          <MessageSquare className="w-4 h-4" />
          <span>Interactive ChatOps Bot in Action</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-6">
          Real-Time Slack &amp; Teams Approvals
        </h2>

        <div className="glass-panel rounded-2xl p-6 border border-slate-700/80 max-w-2xl bg-slate-950 font-sans">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold text-xs">
              DB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">DBShield Guardrail Bot</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded">APP</span>
              </div>
              <span className="text-xs text-slate-400">#db-approvals &middot; Just now</span>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-slate-300">
              <div className="text-slate-500 text-xs mb-1">PROPOSED AGENT MUTATION:</div>
              <div className="text-amber-300 font-semibold">UPDATE accounts SET status = &apos;archived&apos; WHERE balance &lt; 0;</div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400">
              <div>Risk Score: <span className="text-rose-400 font-bold">88 / 100 (HIGH)</span></div>
              <div>Estimated Affected Rows: <span className="text-white font-bold">14,290</span></div>
            </div>

            <div className="flex gap-3 pt-3">
              <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors">
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve Mutation (Commit)</span>
              </button>
              <button className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors">
                Reject &amp; Rollback
              </button>
            </div>
          </div>
        </div>
      </section>

      <TeamCheckoutBanner
        eyebrow="DBShield Team & Managed Guardrails"
        heading="Upgrade Your Team to Hosted Slack Approvals & Shared Governance"
        subheading="The local PostgreSQL & SQLite proxy CLI stays 100% open source ($0 forever). Pay only when your engineering team wants hosted Slack/MS Teams two-man rule webhooks, shared Redis mutation guardrails, or private compliance infrastructure."
        secondaryHref="/enterprise/"
        secondaryLabel="Request Custom VPC SLA"
        plans={[
          {
            tierKey: "dbshield_team_29",
            name: "DBShield Team Approval Relay",
            price: "$29",
            period: "/ month",
            badge: "Team Relay",
            accent: "emerald",
            description: "Route blocked DROP, TRUNCATE & mass-UPDATE approvals straight into your team's #db-approvals Slack or Teams channel.",
            features: [
              "Hosted HMAC-SHA256 Interactive Slack & MS Teams Webhook Relay",
              "Shared Central Policy & Virtual Schema Masking Rules (up to 10 devs)",
              "30-Day Tamper-Evident Mutation Ledger Retention",
              "Zero self-hosted OAuth bots or Redis setup needed",
            ],
            ctaLabel: "Subscribe DBShield Team Relay ($29/mo)",
          },
          {
            tierKey: "dbshield_team_99",
            name: "DBShield Team Hub + Redis Governance",
            price: "$99",
            period: "/ month",
            badge: "Most Popular Team Plan",
            featured: true,
            accent: "cyan",
            description: "Full database wire protection paired with our hosted SkillPrism Redis cluster and automated PR security bot.",
            features: [
              "Unlimited DBShield Approval Channels & Custom Regex Rules",
              "Hosted Shared SkillPrism Redis Cluster (96.7% Token Reduction)",
              "Automated WebSecAuditor PR Review Security Bot Included",
              "1-Year Cloud Audit Retention + Splunk / Datadog CEF Forwarding",
            ],
            ctaLabel: "Launch DBShield Team Hub ($99/mo)",
          },
          {
            tierKey: "private_compliance_kit",
            name: "Private Compliance & Helm Pack",
            price: "$199",
            period: "one-time",
            badge: "Webhook-Gated Repo",
            accent: "purple",
            description: "Immediate GitHub collaborator invite to our private SOC 2, PCI-DSS v4.0 & AWS PrivateLink Terraform repository.",
            features: [
              "SOC 2 Type II, ISO 27001 & PCI-DSS Req 10 Evidence Templates",
              "Hardened Production K8s Helm Charts & PrivateLink Terraform",
              "Automated GitHub repo invite after verified Dodo webhook",
              "Vendor Security Questionnaire Ready-to-Paste Responses",
            ],
            ctaLabel: "Unlock Private Compliance Pack ($199)",
          },
        ]}
      />

    </div>
  );
}
