"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Shield, 
  Terminal, 
  Lock, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  Cpu,
  Layers,
  FileCode,
  AlertTriangle
} from "lucide-react";

export default function AgentShieldPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sandboxProfiles = [
    {
      os: "Linux Kernel",
      tech: "Bubblewrap (bwrap) + Landlock LSM",
      desc: "Unprivileged user namespaces, read-only rootfs mounts, isolated network namespaces, and strict PID namespace confinement.",
      badge: "Production Hardened"
    },
    {
      os: "macOS Darwin",
      tech: "Apple Seatbelt (sandbox-exec)",
      desc: "Scheme-based sandbox profiles restricting file-read, file-write, sysctl inspection, and outbound mach-lookup messaging.",
      badge: "Native Darwin"
    },
    {
      os: "Windows NT",
      tech: "LowBox / AppContainer Isolation",
      desc: "Windows AppContainer low-integrity execution token, restricted process tokens, and firewall capability filtering.",
      badge: "Native Win32"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
        <Link href="/" className="hover:text-brand-neon">Home</Link>
        <span>/</span>
        <span className="text-brand-neon">AgentShield</span>
      </div>

      {/* Hero Header */}
      <div className="border-b border-slate-800 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-brand-green/10 text-brand-neon border border-brand-green/30">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">AgentShield</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-green/10 text-brand-neon border border-brand-green/40 text-xs font-mono">
                v1.2.0 Stable
              </span>
            </div>
            <p className="text-slate-400 text-sm sm:text-base font-mono mt-1">
              Zero-Leak Secret Defense &amp; Kernel Sandbox for Autonomous AI Coding Agents
            </p>
          </div>
        </div>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          AgentShield wraps your AI agent processes (Claude Code, Cursor, Windsurf, Codex, Antigravity) inside OS-level kernel sandboxes. It traps unauthorized syscalls, redacts environment secrets in volatile memory, and blocks credential exfiltration with strict CIDR egress filtering.
        </p>

        {/* Quick CLI Bar */}
        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-slate-200">
            <span className="text-brand-neon">$</span>
            <span>brew install agentshield</span>
            <button
              onClick={() => copyText("brew install agentshield", "brew")}
              className="ml-2 text-slate-400 hover:text-white"
            >
              {copied === "brew" ? <CheckCircle2 className="w-3.5 h-3.5 text-brand-neon" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-slate-200">
            <span className="text-brand-neon">$</span>
            <span>npm install -g @ritualdev-lab/agentshield</span>
            <button
              onClick={() => copyText("npm install -g @ritualdev-lab/agentshield", "npm")}
              className="ml-2 text-slate-400 hover:text-white"
            >
              {copied === "npm" ? <CheckCircle2 className="w-3.5 h-3.5 text-brand-neon" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <Link
            href="https://github.com/RitualDev-Lab/AgentShield"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Cross-Platform Kernel Architecture */}
      <section className="py-14 border-b border-slate-800">
        <div className="mb-8">
          <div className="text-xs font-mono text-brand-neon uppercase tracking-wider mb-1">
            Zero-Trust Isolation
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Native Kernel Sandboxing Across All Three Operating Systems
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sandboxProfiles.map((profile) => (
            <div key={profile.os} className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-brand-neon">{profile.os}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {profile.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{profile.tech}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {profile.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Terminal Sandbox Execution Demo */}
      <section className="py-14 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-6">
          Wrapping Agent Executables in 1 Second
        </h2>

        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-3">
          <div className="text-slate-500 pb-2 border-b border-slate-800">
            # Run Claude Code or Cursor through AgentShield kernel sandbox with egress lockdown
          </div>
          <div>
            <span className="text-brand-neon">$</span> agentshield exec --network allow-git-only --profile strict -- claude
          </div>
          <div className="text-slate-400 pl-4 space-y-1">
            <div>[agentshield] Initializing Landlock LSM file sandbox...</div>
            <div>[agentshield] Mounting read-only system rootfs (isolate /etc, /var/log)...</div>
            <div>[agentshield] Generating synthetic decoy canary for ~/.aws/credentials...</div>
            <div>[agentshield] Active Egress CIDR: 140.82.112.0/20 (GitHub), 104.18.0.0/16 (Cloudflare)</div>
            <div className="text-brand-neon font-bold">[agentshield] Sandbox locked. Spawning agent PID 48191...</div>
          </div>
        </div>
      </section>

      {/* Pricing Pill */}
      <div className="pt-14 text-center">
        <div className="glass-panel rounded-2xl p-8 max-w-2xl mx-auto border border-brand-green/30">
          <h3 className="text-xl font-bold text-white">Upgrade to AgentShield Pro</h3>
          <p className="text-xs text-slate-400 mt-2">
            Includes native macOS/Windows menu-bar GUI, cloud audit log backup, and centralized policy sync.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/pricing"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-emerald-500 text-slate-950 font-bold text-xs"
            >
              View Pricing ($15 / mo)
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
