"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Shield, 
  Database, 
  Zap, 
  Terminal, 
  Code2, 
  Layers, 
  Heart, 
  ChevronDown, 
  Menu, 
  X, 
  ExternalLink,
  Cpu,
  Lock,
  Download
} from "lucide-react";

export default function Navbar() {
  const [suiteOpen, setSuiteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const suiteTools = [
    {
      name: "AgentShield",
      desc: "Zero-leak secret defense & kernel sandbox",
      href: "/agentshield",
      icon: Shield,
      badge: "Core"
    },
    {
      name: "DBShield",
      desc: "Database guardrail proxy & Slack approval bot",
      href: "/dbshield",
      icon: Database,
      badge: "Proxy"
    },
    {
      name: "SkillPrism",
      desc: "JIT context compactor & Redis VPC cache",
      href: "/skillprism",
      icon: Zap,
      badge: "96.7% Token Cut"
    },
    {
      name: "DevShelf",
      desc: "567+ verified developer tools & MCP catalog",
      href: "/devshelf",
      icon: Layers,
      badge: "Directory"
    },
    {
      name: "WebSecAuditor",
      desc: "AST taint tracker & GitHub PR security bot",
      href: "/web-sec-auditor",
      icon: Lock,
      badge: "Security"
    },
    {
      name: "MCPBuilderKit",
      desc: "OpenAPI-to-MCP converter & scaffolder",
      href: "/mcp-builder",
      icon: Code2,
      badge: "Toolkit"
    },
    {
      name: "Ritual Agent Defense",
      desc: "Unified extension for Cursor, VS Code, Windsurf",
      href: "/extension",
      icon: Cpu,
      badge: "Open VSX"
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl bg-slate-900 border border-brand-green/40 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-brand-neon group-hover:shadow-[0_0_15px_rgba(0,245,155,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 via-transparent to-brand-cyan/20 opacity-60"></div>
              {/* Android-inspired logo mark */}
              <div className="relative flex flex-col items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-neon mb-0.5 animate-pulse"></span>
                <span className="text-[13px] font-bold tracking-tighter text-white">RD</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-white group-hover:text-brand-neon transition-colors">
                  RitualDev
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-green/10 text-brand-neon border border-brand-green/30">
                  STUDIO
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider -mt-0.5">
                AGENT DEFENSE & OFFLINE APPS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            
            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setSuiteOpen(true)}
              onMouseLeave={() => setSuiteOpen(false)}
            >
              <button 
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
                onClick={() => setSuiteOpen(!suiteOpen)}
              >
                <span>AI Defense Suite</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${suiteOpen ? 'rotate-180 text-brand-neon' : 'text-slate-400'}`} />
              </button>

              {suiteOpen && (
                <div className="absolute top-full left-0 w-80 mt-1 py-2 rounded-2xl glass-panel shadow-2xl border border-slate-700/80 bg-slate-950/95 backdrop-blur-2xl">
                  <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/60 mb-1">
                    Enterprise Toolchain
                  </div>
                  {suiteTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.name}
                        href={tool.href}
                        onClick={() => setSuiteOpen(false)}
                        className="flex items-start gap-3 px-3 py-2.5 mx-1.5 rounded-xl hover:bg-slate-800/60 transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-700 group-hover:border-brand-neon/50 text-slate-300 group-hover:text-brand-neon transition-colors mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-100 group-hover:text-brand-neon transition-colors">
                              {tool.name}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              {tool.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {tool.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link 
              href="/devshelf" 
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors flex items-center gap-1.5"
            >
              <span>DevShelf</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30">
                567+
              </span>
            </Link>

            <Link 
              href="/pricing" 
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              Pricing
            </Link>

            <Link 
              href="/enterprise" 
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              Enterprise
            </Link>

            <Link 
              href="/apps" 
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              Android Apps
            </Link>

            <Link 
              href="/donate" 
              className="px-3 py-2 text-sm font-medium text-rose-300 hover:text-rose-200 rounded-lg hover:bg-rose-950/30 transition-colors flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>Donate</span>
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="https://open-vsx.org/extension/ritualdev-lab/ritual-agent-defense"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-900 border border-slate-700 hover:border-brand-cyan text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-brand-cyan" />
              <span>IDE Extension</span>
            </Link>

            <Link
              href="https://github.com/RitualDev-Lab"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-mono rounded-lg bg-brand-green/10 border border-brand-green/40 hover:bg-brand-green/20 text-brand-neon hover:text-white flex items-center gap-1.5 transition-all"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 bg-slate-950/95 backdrop-blur-2xl">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider px-2 pt-1">
            Defense Suite
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {suiteTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-medium text-slate-200 hover:text-brand-neon rounded-lg bg-slate-900/60 border border-slate-800"
              >
                {tool.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-slate-800/80 my-2 pt-2 space-y-1">
            <Link
              href="/devshelf"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-slate-200 hover:text-white rounded-lg hover:bg-slate-800"
            >
              DevShelf (567+ Directory)
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-slate-200 hover:text-white rounded-lg hover:bg-slate-800"
            >
              Pricing
            </Link>
            <Link
              href="/enterprise"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-slate-200 hover:text-white rounded-lg hover:bg-slate-800"
            >
              Enterprise Governance
            </Link>
            <Link
              href="/apps"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-slate-200 hover:text-white rounded-lg hover:bg-slate-800"
            >
              Android Apps Suite
            </Link>
            <Link
              href="/donate"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-rose-300 hover:text-white rounded-lg bg-rose-950/30 border border-rose-800/40"
            >
              Donate & Support RitualDev
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
