"use client";

import Link from "next/link";
import { 
  Code2, 
  Terminal, 
  ExternalLink,
  Sparkles,
  ArrowRight,
  Boxes
} from "lucide-react";

export default function MCPBuilderPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
        <Link href="/" className="hover:text-brand-green">Home</Link>
        <span>/</span>
        <span className="text-brand-green">MCPBuilderKit</span>
      </div>

      {/* Header */}
      <div className="border-b border-slate-800 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-brand-neon border border-emerald-500/30">
            <Code2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">MCPBuilderKit</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-brand-neon border border-emerald-500/40 text-xs font-mono">
                Model Context Protocol
              </span>
            </div>
            <p className="text-slate-400 text-sm sm:text-base font-mono mt-1">
              Production Scaffolding Engine &amp; OpenAPI-to-MCP Server Generator
            </p>
          </div>
        </div>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          Convert any REST API or OpenAPI v3.0 / v3.1 specification into a fully typed Model Context Protocol (MCP) server in seconds. Scaffold TypeScript or Python servers with built-in validation, Docker containerization, and schema conformance checking.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="https://github.com/RitualDev-Lab/mcp-builder-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* CLI Demo */}
      <section className="py-14 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-6">Generate MCP Servers from OpenAPI in 1 Command</h2>
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-3">
          <div>
            <span className="text-brand-neon">$</span> npx @ritualdev-lab/mcp-builder generate --spec https://api.stripe.com/v1/openapi.json --lang ts --output ./stripe-mcp
          </div>
          <div className="text-slate-400 pl-4 space-y-1">
            <div>[mcp-builder] Parsing OpenAPI v3.1 specification (182 operations)...</div>
            <div>[mcp-builder] Synthesizing typed Zod input/output schemas...</div>
            <div>[mcp-builder] Generating stdio &amp; SSE transport bridges...</div>
            <div className="text-brand-neon font-bold">[mcp-builder] Success! Generated MCP server in ./stripe-mcp</div>
          </div>
        </div>
      </section>

    </div>
  );
}
