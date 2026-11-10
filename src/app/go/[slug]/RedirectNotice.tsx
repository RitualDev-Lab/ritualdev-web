"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Sparkles, ShieldCheck } from "lucide-react";

interface RedirectNoticeProps {
  toolName: string;
  url: string;
  perkTitle: string;
  perkDescription: string;
  ctaText?: string;
  badge?: string;
}

export default function RedirectNotice({
  toolName,
  url,
  perkTitle,
  perkDescription,
  ctaText,
  badge,
}: RedirectNoticeProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.replace(url);
    }, 650);
    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 max-w-lg w-full text-center space-y-6 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{badge || "Verified Developer Partner"}</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Connecting to {toolName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {perkDescription}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-xs font-mono text-purple-200">
          <span className="text-purple-400 font-bold block mb-1">VERIFIED PERK / FREE TIER</span>
          <span className="text-sm font-bold text-white">{perkTitle}</span>
        </div>

        <div className="space-y-3">
          <a
            href={url}
            rel="noopener noreferrer sponsored"
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <span>{ctaText || `Continue to ${toolName}`}</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <Link
            href="/devshelf/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors pt-1"
          >
            <span>← Back to DevShelf Catalog</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Partner affiliate disclosure: supports zero-paywall open-source tooling.</span>
        </div>
      </div>
    </div>
  );
}
