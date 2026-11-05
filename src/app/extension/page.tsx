"use client";

import Link from "next/link";
import { 
  Cpu, 
  Terminal, 
  Download, 
  ExternalLink,
  Shield, 
  Database, 
  Zap, 
  CheckCircle2,
  Copy
} from "lucide-react";

export default function ExtensionPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
        <Link href="/" className="hover:text-brand-cyan">Home</Link>
        <span>/</span>
        <span className="text-brand-cyan">Ritual Agent Defense</span>
      </div>

      {/* Header */}
      <div className="border-b border-slate-800 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Cpu className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Ritual Agent Defense</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/40 text-xs font-mono">
                Open VSX &middot; v0.1.0
              </span>
            </div>
            <p className="text-slate-400 text-sm sm:text-base font-mono mt-1">
              Unified AI Agent Runtime Defense &amp; Kernel Sandbox for Cursor, VS Code, and Windsurf
            </p>
          </div>
        </div>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          The official IDE extension bringing real-time kernel sandbox telemetry, DBShield wire proxy mutation approval queue, and SkillPrism token savings visualizer directly into your editor&apos;s status bar and sidebar.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=ritualdev.agentshield-defense"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            <Download className="w-4 h-4" />
            <span>Install in VS Code (Marketplace)</span>
          </Link>

          <Link
            href="https://open-vsx.org/extension/ritualdev-lab/agentshield-defense"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          >
            <Cpu className="w-4 h-4" />
            <span>Install in Cursor &amp; Windsurf (Open VSX)</span>
          </Link>

          <Link
            href="https://github.com/RitualDev-Lab/agentshield-vscode"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Feature Showcase */}
      <section className="py-14 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-8">Integrated Editor Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-brand-green/10 text-brand-neon border border-brand-green/30 w-fit">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Live Status Bar Indicator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Monitors active AgentShield kernel sandbox profile (Bubblewrap/Seatbelt/AppContainer) and displays network egress status in real-time.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 w-fit">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">1-Click Mutation Approval</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Side panel feeds incoming agent database mutations and high-risk terminal commands. Review SQL diffs and approve with 1 click without leaving your editor.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 w-fit">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Token Savings Visualizer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tracks context compaction savings per LLM turn, displaying cumulative dollar savings across Claude Code and Cursor prompts.
            </p>
          </div>
        </div>
      </section>

      {/* Terminal Command */}
      <section className="py-14">
        <h2 className="text-2xl font-bold text-white mb-6">Install via Terminal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-2">
            <div className="text-xs text-slate-400">VS Code:</div>
            <div>
              <span className="text-brand-neon">$</span> code --install-extension ritualdev.agentshield-defense
            </div>
          </div>
          <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-2">
            <div className="text-xs text-slate-400">Cursor / Windsurf / VSCodium:</div>
            <div>
              <span className="text-brand-neon">$</span> cursor --install-extension ritualdev-lab.agentshield-defense
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
