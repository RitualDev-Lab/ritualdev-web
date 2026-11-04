import Link from "next/link";
import { Shield, Heart, Terminal, ExternalLink, Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Studio Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-brand-green/40 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-neon"></span>
              </div>
              <span className="font-bold text-lg text-white tracking-tight">RitualDev</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-green/10 text-brand-neon border border-brand-green/30">
                100% OFFLINE-FIRST
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Independent engineering studio building air-gapped AI agent runtime defense, kernel sandboxing, database wire proxies, and offline Android applications with zero telemetry.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse"></span>
              <span>All nodes air-gapped · Cloudflare Pages secured</span>
            </div>
            <div className="pt-2 text-xs text-slate-500 font-mono">
              Founded by <span className="text-slate-300 font-medium">Divyanshu Jethi</span> &amp; <span className="text-slate-300 font-medium">Sakshi Sharma</span>.
            </div>
          </div>

          {/* AI Defense Suite */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-4">
              AI Defense Suite
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/agentshield" className="hover:text-brand-neon transition-colors">
                  AgentShield (Kernel Sandbox)
                </Link>
              </li>
              <li>
                <Link href="/dbshield" className="hover:text-brand-neon transition-colors">
                  DBShield (Database Wire Proxy)
                </Link>
              </li>
              <li>
                <Link href="/skillprism" className="hover:text-brand-neon transition-colors">
                  SkillPrism (Token Compactor)
                </Link>
              </li>
              <li>
                <Link href="/web-sec-auditor" className="hover:text-brand-neon transition-colors">
                  WebSecAuditor (AST Security)
                </Link>
              </li>
              <li>
                <Link href="/audit" className="hover:text-brand-neon transition-colors flex items-center gap-1.5">
                  <span>Pre-Launch AI Security Audit</span>
                  <span className="text-[10px] font-mono px-1 py-0.2 bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 rounded">2h SLA</span>
                </Link>
              </li>
              <li>
                <Link href="/mcp-builder" className="hover:text-brand-neon transition-colors">
                  MCPBuilderKit (Scaffolder &amp; Services)
                </Link>
              </li>
              <li>
                <Link href="/mcp-starter-kit" className="hover:text-purple-300 transition-colors flex items-center gap-1.5">
                  <span>MCP Monetization Starter Kit</span>
                  <span className="text-[10px] font-mono px-1 py-0.2 bg-purple-950/60 text-purple-300 border border-purple-800/40 rounded">$49</span>
                </Link>
              </li>
              <li>
                <Link href="/extension" className="hover:text-brand-neon transition-colors flex items-center gap-1.5">
                  <span>IDE Extension</span>
                  <span className="text-[10px] font-mono px-1 py-0.2 bg-slate-800 text-brand-cyan rounded">Open VSX</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem & DevTools */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Ecosystem &amp; Apps
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/devshelf" className="hover:text-brand-cyan transition-colors">
                  DevShelf (567+ Tools &amp; MCPs)
                </Link>
              </li>
              <li>
                <Link href="/alternatives" className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
                  <span>Open-Source Alternatives</span>
                  <span className="text-[10px] font-mono px-1 py-0.2 bg-purple-950/60 text-purple-300 border border-purple-800/40 rounded">Matrix</span>
                </Link>
              </li>
              <li>
                <Link href="/feed.xml" className="hover:text-amber-400 transition-colors flex items-center gap-1.5" target="_blank">
                  <span>DevShelf RSS Feed</span>
                  <span className="text-[10px] font-mono px-1 py-0.2 bg-amber-950/60 text-amber-300 border border-amber-800/40 rounded">XML</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-brand-cyan transition-colors">
                  Pricing &amp; Dodo Payments
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="hover:text-brand-cyan transition-colors">
                  Enterprise Private VPC
                </Link>
              </li>
              <li>
                <Link href="/apps" className="hover:text-brand-cyan transition-colors">
                  All Android Applications
                </Link>
              </li>
              <li>
                <Link href="/apps/all-in-one-calculator" className="hover:text-brand-cyan transition-colors">
                  All-in-One Calculator Plus
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-rose-400 transition-colors flex items-center gap-1 text-rose-300">
                  <Heart className="w-3.5 h-3.5 fill-rose-400" />
                  <span>Sponsorship &amp; Backers</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Google Play Legal & Policies */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Play Store Compliance
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-slate-200 transition-colors">
                  Privacy Policies Center
                </Link>
              </li>
              <li>
                <Link href="/privacy/all-in-one-calculator" className="hover:text-slate-200 transition-colors">
                  Calculator Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy/cyberhub" className="hover:text-slate-200 transition-colors">
                  CyberHub Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy/lifeos" className="hover:text-slate-200 transition-colors">
                  LifeOS Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/delete-account" className="hover:text-amber-400 transition-colors text-slate-300">
                  Account &amp; Data Deletion
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-200 transition-colors">
                  Support &amp; Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} RitualDev Studio. Independent Engineering. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/RitualDev-Lab" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
              GitHub
            </Link>
            <span>&middot;</span>
            <Link href="https://open-vsx.org/extension/ritualdev-lab/ritual-agent-defense" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
              Open VSX
            </Link>
            <span>&middot;</span>
            <Link href="/api/v1/tools.json" className="hover:text-slate-300 transition-colors">
              API
            </Link>
            <span>&middot;</span>
            <span className="text-slate-400">developer@ritualdev.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
