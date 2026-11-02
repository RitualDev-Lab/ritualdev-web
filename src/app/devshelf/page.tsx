"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Layers, 
  Search, 
  ExternalLink, 
  Star, 
  Filter, 
  Code2, 
  Terminal, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import rawData from "@/data/devshelf.json";

interface Resource {
  name: string;
  repo?: string;
  category?: string;
  description?: string;
  language?: string;
  license?: string;
  featured?: boolean;
  statusTags?: string[];
  type?: string;
}

export default function DevShelfPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(36);

  const allResources: Resource[] = useMemo(() => {
    return (rawData.resources as Resource[]) || [];
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    allResources.forEach(r => {
      if (r.category) set.add(r.category);
    });
    return ["All", ...Array.from(set).sort()];
  }, [allResources]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return allResources.filter(r => {
      const matchesCat = selectedCategory === "All" || r.category === selectedCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        (r.description && r.description.toLowerCase().includes(q)) ||
        (r.category && r.category.toLowerCase().includes(q)) ||
        (r.language && r.language.toLowerCase().includes(q)) ||
        (r.repo && r.repo.toLowerCase().includes(q))
      );
    });
  }, [allResources, search, selectedCategory]);

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
        <Link href="/" className="hover:text-brand-cyan">Home</Link>
        <span>/</span>
        <span className="text-brand-cyan">DevShelf</span>
      </div>

      {/* Header */}
      <div className="border-b border-slate-800 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <Layers className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">DevShelf</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/40 text-xs font-mono">
                  {allResources.length} Verified Tools
                </span>
              </div>
              <p className="text-slate-400 text-sm sm:text-base font-mono mt-1">
                The Open-Source Community Directory for Verified Developer Tools &amp; MCP Servers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/api/v1/tools.json"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 text-brand-neon" />
              <span>REST API JSON</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="py-8 space-y-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search 567+ tools by name, tag, category, language..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-cyan/80 focus:ring-1 focus:ring-brand-cyan/80 transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-mono no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          {categories.slice(0, 10).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors shrink-0 ${
                selectedCategory === cat
                  ? "bg-purple-600/30 text-purple-300 border border-purple-500/50 font-bold"
                  : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs font-mono text-slate-500 mb-6">
        Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} matching resources
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.slice(0, visibleCount).map((tool, idx) => {
          const repoUrl = tool.repo ? `https://github.com/${tool.repo}` : null;
          return (
            <div
              key={`${tool.name}-${idx}`}
              className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-base text-white hover:text-purple-300 transition-colors">
                    {tool.name}
                  </h3>
                  {tool.featured && (
                    <span className="p-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30" title="Featured Tool">
                      <Star className="w-3 h-3 fill-amber-400" />
                    </span>
                  )}
                </div>

                <div className="text-[11px] font-mono text-purple-400/90 mb-2.5">
                  {tool.category || "Developer Tool"}
                </div>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {tool.description || "Open-source developer utility and toolkit."}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <div className="flex items-center gap-2">
                  {tool.language && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      {tool.language}
                    </span>
                  )}
                  {tool.license && (
                    <span className="text-slate-500">
                      {tool.license}
                    </span>
                  )}
                </div>

                {repoUrl && (
                  <Link
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {visibleCount < filtered.length && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisibleCount((prev) => prev + 36)}
            className="px-6 py-2.5 rounded-xl glass-panel text-white text-xs font-mono hover:border-purple-500/60 transition-colors"
          >
            Load More Tools ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}

    </div>
  );
}
