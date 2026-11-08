import { Metadata } from "next";
import Link from "next/link";
import { 
  Shield, 
  Terminal, 
  Layers, 
  ArrowRight, 
  Zap, 
  Lock, 
  Cpu, 
  CheckCircle2, 
  ExternalLink 
} from "lucide-react";
import integrations from "@/data/integrations.json";

export const metadata: Metadata = {
  title: "AI Agent Security & Tooling Integrations | RitualDev",
  description: "Explore turnkey security guardrails, kernel sandboxes, and monetization middleware for Claude Code, LangGraph, Cursor, and Model Context Protocol (MCP).",
  alternates: {
    canonical: "https://ritualdev.in/integrations/"
  }
};

export default function IntegrationsDirectoryPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link href="/" className="hover:text-brand-neon">Home</Link>
        <span>/</span>
        <span className="text-brand-neon">Integrations</span>
      </div>

      {/* Header */}
      <div className="border-b border-slate-800 pb-12 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-brand-green/10 text-brand-neon border border-brand-green/30">
            <Layers className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Ecosystem Integrations</h1>
            <p className="text-slate-400 font-mono text-sm sm:text-base mt-1">
              Zero-leak runtime guardrails, kernel sandboxes &amp; monetization for modern AI agent stacks.
            </p>
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((item) => (
          <Link
            key={item.slug}
            href={`/integrations/${item.slug}`}
            className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-brand-neon/60 transition-all space-y-6 group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                  {item.category}
                </span>
                <span className="text-xs font-mono text-brand-neon font-bold">
                  {item.vendor}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white group-hover:text-brand-neon transition-colors">
                  {item.name}
                </h2>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  {item.tagline}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  Neutralized Threat Vectors:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {item.threats.slice(0, 2).map((threat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-400 shrink-0 font-bold">×</span>
                      <span className="line-clamp-1">{threat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">View Setup Guide &amp; Code</span>
              <span className="text-brand-neon font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Configure</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
