"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Code2, 
  Copy, 
  Check, 
  ExternalLink, 
  ArrowRight,
  Zap,
  Lock,
  Download,
  Search,
  Sparkles,
  Server
} from "lucide-react";

interface DocSection {
  id: string;
  title: string;
  category: "Quickstart" | "AgentShield" | "IDE Integrations" | "CI/CD & DevOps" | "Toolchain";
  description: string;
  codeSnippet: string;
  language: string;
  details: string[];
}

const DOC_SECTIONS: DocSection[] = [
  {
    id: "quickstart",
    title: "Quickstart in 60 Seconds",
    category: "Quickstart",
    description: "Inspect any shell command, file, or active AI coding session for leaked secrets with zero installation.",
    codeSnippet: `# 1. Scan a project file for exposed credentials\nnpx @ritualdev-lab/agentshield scan ./src/config.ts\n\n# 2. Execute any bash command in zero-leak Landlock / Seatbelt sandbox\nnpx @ritualdev-lab/agentshield exec "curl -H 'Authorization: Bearer sk-ant-...' https://api.corp"`,
    language: "bash",
    details: [
      "No global npm install required; runs instantly via npx.",
      "Automatically blocks /proc/self/environ, credential dumps, and ReDoS patterns.",
      "Produces deterministic ANSI terminal reports with latency benchmarks."
    ]
  },
  {
    id: "claude-code",
    title: "Claude Desktop & Claude Code PreToolUse Hook",
    category: "IDE Integrations",
    description: "Intercept every Bash and Tool execution in Claude Code before execution to prevent credential leakage into model context.",
    codeSnippet: `// 1. Generate turnkey hook config\nnpx @ritualdev-lab/agentshield init-claude\n\n// Added to ~/.claude/config.json:\n{\n  "hooks": {\n    "PreToolUse": "npx @ritualdev-lab/agentshield exec \\"\$TOOL_COMMAND\\""\n  }\n}`,
    language: "json",
    details: [
      "Automatically intercepts all child processes spawned by Claude Code.",
      "Redacts secrets from stdout/stderr before tokens return to the Claude LLM context window.",
      "Protects against prompt injection payloads attempting to cat .env or SSH keys."
    ]
  },
  {
    id: "cursor-windsurf",
    title: "Cursor & Windsurf IDE Rules",
    category: "IDE Integrations",
    description: "Enforce persistent zero-leak file watch and terminal protection across Cursor and Windsurf editors.",
    codeSnippet: `// 1. Auto-configure workspace settings\nnpx @ritualdev-lab/agentshield init-cursor\n\n// Writes to .cursor/settings.json or .vscode/settings.json:\n{\n  "agentshield.enforceSandbox": true,\n  "agentshield.maskStyle": "token",\n  "agentshield.blockEnviron": true\n}`,
    language: "json",
    details: [
      "Prevents Cursor Agent from indexing private keys, PEM certificates, and .env files.",
      "Guarantees that inline AI completions never leak proprietary API credentials.",
      "Integrates with the official Ritual Agent Defense extension on Open VSX."
    ]
  },
  {
    id: "ci-cd-gate",
    title: "CI/CD Anti-Leak PR Security Gate",
    category: "CI/CD & DevOps",
    description: "Audit pull request diffs in GitHub Actions with non-bypassable protection against self-neutering ignore patterns.",
    codeSnippet: `# .github/workflows/agentshield-gate.yml\nname: AgentShield PR Gate\non: [pull_request]\n\njobs:\n  audit:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n        with:\n          fetch-depth: 0\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n      - run: npx @ritualdev-lab/agentshield ci --base origin/\${{ github.base_ref }}`,
    language: "yaml",
    details: [
      "Evaluates unignorable files (.env, id_rsa, .aws/credentials) regardless of .agentshield.json overrides.",
      "Protects PR base branch from unauthorized .agentshield.json modifications (anti-self-neutering gate).",
      "Outputs standardized SARIF 2.1.0 for GitHub Code Scanning annotations."
    ]
  },
  {
    id: "devshelf-mcp",
    title: "DevShelf Terminal CLI & MCP Server",
    category: "Toolchain",
    description: "Connect Claude Desktop and Cursor directly to DevShelf's catalog of 569+ verified tools and free APIs.",
    codeSnippet: `// Add to claude_desktop_config.json:\n{\n  "mcpServers": {\n    "devshelf": {\n      "command": "npx",\n      "args": ["-y", "@ritualdev-lab/devshelf", "mcp"]\n    }\n  }\n}`,
    language: "json",
    details: [
      "Gives your AI agents real-time tool discovery across 8 developer categories.",
      "Supports instant search: 'find open-source database proxies with slack approvals'.",
      "Pure stdio transport with sub-millisecond local SQLite LRU caching."
    ]
  },
  {
    id: "skillprism-budget",
    title: "SkillPrism Context Window Compactor",
    category: "Toolchain",
    description: "Cut token spend by 96.7% using out-of-context BM25 indexing and dynamic semantic receipts.",
    codeSnippet: `# Start SkillPrism JIT Meta-Tool Harness proxy\nnpx @ritualdev-lab/skillprism proxy --port 4000\n\n# Benchmarking token compaction on massive API payloads\nnpx @ritualdev-lab/skillprism benchmark`,
    language: "bash",
    details: [
      "Reduces 500+ tool MCP toolsets (<210 token meta-tool zero-state).",
      "Dynamic TTL expiration automatically unloads unused tool schemas from context.",
      "Transparent inline JSON-RPC proxy compatible with all standard MCP clients."
    ]
  },
  {
    id: "mcp-scaffolding",
    title: "mcp-builder-kit OpenAPI to MCP Scaffolder",
    category: "Toolchain",
    description: "Convert any Swagger / OpenAPI 3.1 specification into production TypeScript or FastMCP Python servers in seconds.",
    codeSnippet: `# Convert OpenAPI specification into typed MCP tools\nnpx @ritualdev-lab/mcp-builder-kit from-openapi ./petstore.json --lang typescript\n\n# Launch local Visual Inspector testing studio\nnpx @ritualdev-lab/mcp-builder-kit ui --port 4100`,
    language: "bash",
    details: [
      "Generates production TypeScript with Zod schemas and Python FastMCP.",
      "Includes 1-click cloud deployment recipes for Cloudflare Workers, Cloud Run, and Docker.",
      "Built-in AgentShield security preflight check before packaging."
    ]
  },
  {
    id: "air-gapped-docker",
    title: "Air-Gapped & On-Prem Docker Deployment",
    category: "CI/CD & DevOps",
    description: "Deploy AgentShield inside restricted, air-gapped VPCs with 100% offline rule enforcement.",
    codeSnippet: `# Run standalone AgentShield daemon in air-gapped Docker container\ndocker run --rm -i \\\n  -v "\$(pwd):/workspace:ro" \\\n  -e AGENTSHIELD_AIR_GAPPED=1 \\\n  ghcr.io/ritualdev-lab/agentshield:v0.2.1 \\\n  agentshield scan /workspace`,
    language: "bash",
    details: [
      "Zero bytes of external telemetry or phone-home requests.",
      "Works with local LLMs (Ollama, vLLM, LocalAI) without internet access.",
      "Cryptographic HMAC audit ledger remains fully verifiable offline."
    ]
  },
  {
    id: "readme-badge",
    title: "README Telemetry & Verification Badge",
    category: "CI/CD & DevOps",
    description: "Display tamper-proof AgentShield verification on your GitHub / GitLab repository README.",
    codeSnippet: `<!-- Markdown for README.md -->\n[![Secured by AgentShield](https://ritualdev.in/badge/secured.svg)](https://ritualdev.in)\n\n<!-- HTML Embed -->\n<a href="https://ritualdev.in"><img src="https://ritualdev.in/badge/secured.svg" alt="Secured by AgentShield" /></a>`,
    language: "markdown",
    details: [
      "Served via global Cloudflare Edge CDN with zero tracking cookies or IP logging.",
      "Dynamic /api/v1/badge endpoint supports custom status labels and grades.",
      "Instant indicator for SOC 2 Type II, ISO 27001, and vendor risk assessors."
    ]
  },
  {
    id: "security-advisories",
    title: "Security Advisories & Zero-Leak CVE Fixes",
    category: "AgentShield",
    description: "Review coordinated vulnerability disclosures and verified mitigations for AI coding agent sandboxes.",
    codeSnippet: `# Verify mitigation for /proc/self/environ exfiltration (GHSA-92f2-4677-rmvh)\nnpx @ritualdev-lab/agentshield exec -- cat /proc/self/environ\n\n# Audit CI configuration for self-neutering ignore bypasses (GHSA-p3v4-5qw2-92rg)\nnpx @ritualdev-lab/agentshield ci --strict\n\n# Run linear-time ReDoS benchmark (GHSA-g5mq-fjr3-39qp)\nnpx @ritualdev-lab/agentshield test --dos-check`,
    language: "bash",
    details: [
      "Full public disclosure matrix available at /advisories with CVSS 3.1 vectors.",
      "Patched in AgentShield v0.2.0+ across npm, Homebrew, and Scoop distributions.",
      "24-hour patch SLA with safe harbor policy for ethical vulnerability research."
    ]
  }
];

export default function DocsPage() {
  const [selectedDocId, setSelectedDocId] = useState<string>("quickstart");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Filtered sections based on search query
  const filteredDocs = DOC_SECTIONS.filter((doc) => {
    const q = searchQuery.toLowerCase();
    return (
      doc.title.toLowerCase().includes(q) ||
      doc.description.toLowerCase().includes(q) ||
      doc.category.toLowerCase().includes(q)
    );
  });

  const activeDoc = DOC_SECTIONS.find((d) => d.id === selectedDocId) || DOC_SECTIONS[0];

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 font-mono">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400 border-b border-slate-800/80 pb-4">
        <Link href="/" className="hover:text-brand-green transition-colors">Home</Link>
        <span>/</span>
        <span className="text-brand-neon font-bold">Documentation Engine</span>
      </div>

      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-800/80">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-neon border border-brand-green/30 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>RitualDev Unified Documentation • v0.2.1 / v1.2.3</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Developer Documentation
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Step-by-step guides for Claude Desktop, Cursor, CI/CD pipelines, MCP servers, and air-gapped VPC defense.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, tools, rules..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-brand-neon text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Main Documentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-bold px-1">
            Topics &amp; Guides ({filteredDocs.length})
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredDocs.map((doc) => {
              const isSelected = doc.id === activeDoc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all text-xs space-y-1 ${
                    isSelected
                      ? "bg-slate-900 border-brand-neon text-white shadow-[0_0_15px_rgba(0,245,155,0.15)] ring-1 ring-brand-neon"
                      : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-bold text-brand-cyan">{doc.category}</span>
                    <span className="uppercase">{doc.language}</span>
                  </div>
                  <div className="font-bold line-clamp-1">{doc.title}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          
          <div className="space-y-2">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-brand-green/10 text-brand-neon border border-brand-green/30">
              {activeDoc.category}
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {activeDoc.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeDoc.description}
            </p>
          </div>

          {/* Code Viewer */}
          <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950">
            <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-bold uppercase text-[11px]">
                {activeDoc.language} Code Snippet
              </span>
              <button
                onClick={() => copyCode(activeDoc.codeSnippet)}
                className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors font-bold text-xs"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
              </button>
            </div>
            <pre className="p-4 text-xs text-brand-cyan overflow-x-auto leading-relaxed select-all">
              {activeDoc.codeSnippet}
            </pre>
          </div>

          {/* Details / Best Practices List */}
          <div className="space-y-3 pt-2">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              Key Technical Capabilities &amp; Behavior:
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeDoc.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-brand-neon font-bold shrink-0">✓</span>
                  <span className="leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Interactive Callout */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs pt-4">
            <div>
              <div className="font-bold text-white">Want to test this live in the simulator?</div>
              <p className="text-slate-400 text-[11px]">Run commands without installing anything in the Adversarial Playground.</p>
            </div>
            <Link
              href="/playground"
              className="px-4 py-2 rounded-xl bg-brand-neon text-slate-950 font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Open Playground</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
