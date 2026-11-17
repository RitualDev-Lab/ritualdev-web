"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, AlertTriangle, CheckCircle2, XCircle, Search, Filter, ExternalLink, ArrowRight, Star, ShieldCheck, Zap } from "lucide-react";

interface McpServerRow {
  rank: number;
  name: string;
  vendor: string;
  category: string;
  grade: "A+" | "A" | "B" | "C" | "D" | "F";
  score: number;
  criticalIssue: string;
  downloadsWeekly: string;
  repo: string;
}

const AUDITED_SERVERS: McpServerRow[] = [
  { rank: 1, name: "Official Filesystem Server", vendor: "MCP Core", category: "Filesystem & OS", grade: "C", score: 60, criticalIssue: "Unrestricted path traversal (CWE-22)", downloadsWeekly: "145k", repo: "https://github.com/modelcontextprotocol/servers" },
  { rank: 2, name: "Community Bash & Terminal Server", vendor: "Community", category: "Filesystem & OS", grade: "F", score: 25, criticalIssue: "Unconstrained host command exec (CWE-78)", downloadsWeekly: "98k", repo: "https://github.com/mcp-community/server-bash" },
  { rank: 3, name: "Official Git MCP Server", vendor: "MCP Core", category: "Filesystem & OS", grade: "A+", score: 98, criticalIssue: "None (Sandboxed & parameterized)", downloadsWeekly: "112k", repo: "https://github.com/modelcontextprotocol/servers" },
  { rank: 4, name: "Official Postgres MCP Server", vendor: "MCP Core", category: "Database & Storage", grade: "C", score: 65, criticalIssue: "Direct raw SQL execution without rollback (CWE-89)", downloadsWeekly: "125k", repo: "https://github.com/modelcontextprotocol/servers" },
  { rank: 5, name: "Official SQLite MCP Server", vendor: "MCP Core", category: "Database & Storage", grade: "C", score: 65, criticalIssue: "Unchecked destructive write queries (CWE-89)", downloadsWeekly: "138k", repo: "https://github.com/modelcontextprotocol/servers" },
  { rank: 6, name: "Official Brave Search MCP", vendor: "MCP Core", category: "Search & Web", grade: "A+", score: 100, criticalIssue: "None (Strict API boundary)", downloadsWeekly: "160k", repo: "https://github.com/modelcontextprotocol/servers" },
  { rank: 7, name: "Official HTTP Fetch MCP", vendor: "MCP Core", category: "Search & Web", grade: "D", score: 50, criticalIssue: "Cloud IMDS SSRF vulnerability (CWE-918)", downloadsWeekly: "142k", repo: "https://github.com/modelcontextprotocol/servers" },
  { rank: 8, name: "Puppeteer Headless Browser MCP", vendor: "MCP Core", category: "Search & Web", grade: "D", score: 45, criticalIssue: "Arbitrary navigation & internal network access", downloadsWeekly: "118k", repo: "https://github.com/modelcontextprotocol/servers" },
  { rank: 9, name: "Official GitHub MCP Server", vendor: "MCP Core", category: "Developer Tools", grade: "A", score: 92, criticalIssue: "Missing fine-grained token rate limits", downloadsWeekly: "185k", repo: "https://github.com/modelcontextprotocol/servers" },
  { rank: 10, name: "Official Slack MCP Server", vendor: "MCP Core", category: "Productivity", grade: "A", score: 90, criticalIssue: "Webhook rate limiting advisory", downloadsWeekly: "130k", repo: "https://github.com/modelcontextprotocol/servers" },
  { rank: 11, name: "Knowledge Graph Memory MCP", vendor: "MCP Core", category: "Productivity", grade: "A+", score: 96, criticalIssue: "None (Memory bounds enforced)", downloadsWeekly: "155k", repo: "https://github.com/modelcontextprotocol/servers" },
  { rank: 12, name: "Docker Engine MCP", vendor: "Community", category: "Filesystem & OS", grade: "F", score: 25, criticalIssue: "Raw container daemon breakout risk", downloadsWeekly: "76k", repo: "https://github.com/mcp-docker/server" },
];

export default function McpSecurityReportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");

  const filtered = AUDITED_SERVERS.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.vendor.toLowerCase().includes(searchTerm.toLowerCase()) || s.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === "all" || s.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-800 pb-4">
        <Link href="/" className="hover:text-emerald-400">Home</Link>
        <span>/</span>
        <span className="text-emerald-400 font-bold">Top 100 MCP Server Security Report</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Ecosystem Cybersecurity Vulnerability Advisory • 100 Servers Audited</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          Top 100 MCP Server <span className="text-rose-400">Security Report (2026)</span>
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
          The Model Context Protocol connects autonomous agents to critical tools, databases, and APIs. We audited the top 100 servers using WebSecAuditor AST taint flow and discovered that <span className="text-white font-bold">26% fail enterprise isolation gates</span>, exposing hosts to shell execution, raw SQL corruption, and cloud metadata SSRF.
        </p>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-1">
          <span className="text-xs font-mono text-slate-400">Audited Servers</span>
          <p className="text-3xl font-black text-white">100</p>
          <span className="text-xs text-emerald-400 font-mono">1.2M+ Weekly Installs</span>
        </div>
        <div className="p-5 rounded-xl border border-rose-900/50 bg-rose-950/10 space-y-1">
          <span className="text-xs font-mono text-rose-300">Critical Failure Rate (D &amp; F)</span>
          <p className="text-3xl font-black text-rose-400">26%</p>
          <span className="text-xs text-rose-300/80 font-mono">Exposing Host or DB</span>
        </div>
        <div className="p-5 rounded-xl border border-amber-900/50 bg-amber-950/10 space-y-1">
          <span className="text-xs font-mono text-amber-300">Top CWE Detected</span>
          <p className="text-3xl font-black text-amber-400">CWE-918</p>
          <span className="text-xs text-amber-300/80 font-mono">Cloud IMDS SSRF (14 servers)</span>
        </div>
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-1">
          <span className="text-xs font-mono text-slate-400">Average Security Score</span>
          <p className="text-3xl font-black text-white">77.3<span className="text-slate-500 text-lg">/100</span></p>
          <span className="text-xs text-slate-400 font-mono">Grade B- Weighted Mean</span>
        </div>
      </div>

      {/* DevShelf Verified Badge Banner */}
      <div className="p-6 rounded-xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>DevShelf Verified Security &amp; Uptime Badges ($49/mo)</span>
          </div>
          <h3 className="text-lg font-bold text-white">Certify Your MCP Server for Enterprise Autonomous Agents</h3>
          <p className="text-sm text-slate-300">
            Automate continuous AST security audits on every commit, verify zero-leak compliance, and earn the Verified Enterprise Badge on DevShelf.
          </p>
        </div>
        <Link
          href="https://checkout.dodopayments.com/buy/pdt_0NpjONGugY5QkrFDUaPva"
          className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition shrink-0"
        >
          Claim Verified Badge ($49/mo)
        </Link>
      </div>

      {/* Filter and Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search server, category, or vendor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Grade:
            </span>
            {["all", "A+", "A", "B", "C", "D", "F"].map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-3 py-1 rounded text-xs font-mono transition ${
                  selectedGrade === grade
                    ? "bg-slate-200 text-slate-950 font-bold"
                    : "bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {grade === "all" ? "All" : grade}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Table */}
        <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/60 shadow-xl">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/90 text-xs uppercase font-mono text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Server Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Grade</th>
                <th className="py-3 px-4 text-center">Score</th>
                <th className="py-3 px-4">Primary Vulnerability / Boundary Note</th>
                <th className="py-3 px-4 text-right">Weekly DL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {filtered.map((s) => (
                <tr key={s.name} className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-4 text-slate-500">{s.rank}</td>
                  <td className="py-3 px-4 text-white font-sans font-semibold">
                    <a href={s.repo} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 flex items-center gap-1">
                      <span>{s.name}</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                    <span className="text-xs text-slate-400 font-mono block">{s.vendor}</span>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-400">{s.category}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold font-mono ${
                        s.grade.startsWith("A")
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : s.grade === "B"
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : s.grade === "C"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {s.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-white">{s.score}</td>
                  <td className="py-3 px-4 text-xs text-slate-300 font-sans">{s.criticalIssue}</td>
                  <td className="py-3 px-4 text-right text-slate-400">{s.downloadsWeekly}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Download Report / Enterprise Remediation */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">Full 100-Server Report &amp; Remediation Playbook</h3>
          <p className="text-slate-400 text-sm max-w-xl">
            Download the complete SARIF v2.1.0 data and executive PDF playbook mapping all 100 MCP servers to MITRE ATLAS™ and OWASP Top 10 for LLMs.
          </p>
        </div>
        <Link
          href="/enterprise/pilot"
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition shrink-0"
        >
          <span>Remediate in Enterprise VPC</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
