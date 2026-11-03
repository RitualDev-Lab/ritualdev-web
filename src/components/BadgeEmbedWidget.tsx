"use client";

import { useState } from "react";
import { Check, Copy, Code, ShieldCheck } from "lucide-react";

interface BadgeEmbedWidgetProps {
  slug: string;
  toolName: string;
}

export default function BadgeEmbedWidget({ slug, toolName }: BadgeEmbedWidgetProps) {
  const [copiedType, setCopiedType] = useState<"markdown" | "html" | null>(null);

  const badgeUrl = `https://ritualdev.in/badge/verified.svg`;
  const toolPageUrl = `https://ritualdev.in/devshelf/${slug}/`;

  const markdownSnippet = `[![DevShelf Verified](${badgeUrl})](${toolPageUrl})`;
  const htmlSnippet = `<a href="${toolPageUrl}"><img src="${badgeUrl}" alt="DevShelf Verified - ${toolName}" /></a>`;

  const copyToClipboard = (text: string, type: "markdown" | "html") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-neon" />
            <span>Embed Badge on GitHub (Backlink Generator)</span>
          </h2>
          <p className="text-xs text-slate-400">
            Showcase that <strong className="text-slate-200">{toolName}</strong> is verified in the DevShelf directory. Add this badge to your README.
          </p>
        </div>

        {/* Live SVG Badge Preview */}
        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/badge/verified.svg"
            alt="DevShelf Verified Badge"
            className="h-6 w-auto"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
        {/* Markdown Snippet */}
        <div className="p-3.5 rounded-2xl bg-black/70 border border-slate-800 space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1">
              <Code className="w-3 h-3 text-brand-cyan" />
              <span>Markdown (for GitHub README.md)</span>
            </span>
            <button
              onClick={() => copyToClipboard(markdownSnippet, "markdown")}
              className="text-brand-neon hover:text-white flex items-center gap-1 transition-colors text-[11px]"
            >
              {copiedType === "markdown" ? (
                <>
                  <Check className="w-3 h-3 text-brand-neon" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <code className="text-slate-300 break-all select-all block text-[11px] bg-slate-950/60 p-2 rounded-lg border border-slate-900">
            {markdownSnippet}
          </code>
        </div>

        {/* HTML Snippet */}
        <div className="p-3.5 rounded-2xl bg-black/70 border border-slate-800 space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1">
              <Code className="w-3 h-3 text-purple-400" />
              <span>HTML Tag</span>
            </span>
            <button
              onClick={() => copyToClipboard(htmlSnippet, "html")}
              className="text-purple-300 hover:text-white flex items-center gap-1 transition-colors text-[11px]"
            >
              {copiedType === "html" ? (
                <>
                  <Check className="w-3 h-3 text-brand-neon" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <code className="text-slate-300 break-all select-all block text-[11px] bg-slate-950/60 p-2 rounded-lg border border-slate-900">
            {htmlSnippet}
          </code>
        </div>
      </div>
    </div>
  );
}
