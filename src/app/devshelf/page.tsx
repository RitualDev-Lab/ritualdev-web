"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
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
  ArrowRight,
  X,
  Copy,
  Check,
  Share2,
  Shield,
  Server,
  BookOpen,
  Bookmark,
  CheckCircle2,
  Boxes
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
  section?: string;
  alternativeTo?: string;
  dockerCompose?: string;
  url?: string;
  auth?: string;
  freeTier?: string;
  cors?: string;
  rateLimit?: string;
  goodFirstIssues?: string;
  platform?: string;
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getInstallCommand(tool: Resource): { cmd: string; type: string } {
  const slug = toSlug(tool.name);
  const lang = (tool.language || "").toLowerCase();

  if (lang.includes("typescript") || lang.includes("javascript") || lang.includes("node")) {
    return { cmd: `npx ${slug}`, type: "npx" };
  }
  if (lang.includes("go")) {
    const repoClean = tool.repo?.replace("https://github.com/", "") || slug;
    return { cmd: `go install github.com/${repoClean}@latest`, type: "go" };
  }
  if (lang.includes("python")) {
    return { cmd: `pip install ${slug}`, type: "pip" };
  }
  if (lang.includes("rust")) {
    return { cmd: `cargo install ${slug}`, type: "cargo" };
  }
  if (tool.repo) {
    const cleanRepo = tool.repo.startsWith("http") ? tool.repo : `https://github.com/${tool.repo}`;
    return { cmd: `git clone ${cleanRepo}.git`, type: "git" };
  }
  return { cmd: `npm install -g ${slug}`, type: "npm" };
}

export default function DevShelfPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [quickFilter, setQuickFilter] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(36);
  const [selectedTool, setSelectedTool] = useState<Resource | null>(null);
  const [activeTab, setActiveTab] = useState<"quick-install" | "docker" | "badge">("quick-install");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const allResources: Resource[] = useMemo(() => {
    return (rawData.resources as Resource[]) || [];
  }, []);

  const copyToClipboard = useCallback((text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(text);
      setToastMessage(`Copied ${label} to clipboard!`);
      setTimeout(() => {
        setCopiedText(null);
        setToastMessage(null);
      }, 2500);
    }
  }, []);

  const openToolModal = useCallback((tool: Resource) => {
    setSelectedTool(tool);
    setActiveTab(tool.dockerCompose ? "docker" : "quick-install");
    window.history.replaceState(null, "", `#${toSlug(tool.name)}`);
  }, []);

  const closeToolModal = useCallback(() => {
    setSelectedTool(null);
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }, []);

  // Listen for URL hash changes and keyboard Escape
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash) {
        const found = allResources.find((r) => toSlug(r.name) === hash);
        if (found) {
          setSelectedTool(found);
          setActiveTab(found.dockerCompose ? "docker" : "quick-install");
        }
      } else {
        setSelectedTool(null);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeToolModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [allResources, closeToolModal]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    allResources.forEach((r) => {
      if (r.category) set.add(r.category);
    });
    return ["All", ...Array.from(set).sort()];
  }, [allResources]);

  // Counts for quick filter pills
  const counts = useMemo(() => {
    let featured = 0;
    let alternatives = 0;
    let docker = 0;
    let noCard = 0;
    let ai = 0;

    allResources.forEach((r) => {
      if (r.featured) featured++;
      if (r.alternativeTo) alternatives++;
      if (r.dockerCompose) docker++;
      if (r.statusTags?.some((t) => t.toLowerCase().includes("no card"))) noCard++;
      if (r.type === "ai" || r.category?.toLowerCase().includes("ai") || r.category?.toLowerCase().includes("mcp")) ai++;
    });

    return { featured, alternatives, docker, noCard, ai };
  }, [allResources]);

  // Filtered resources
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return allResources.filter((r) => {
      // Category filter
      if (selectedCategory !== "All" && r.category !== selectedCategory) {
        return false;
      }

      // Quick filter
      if (quickFilter === "featured" && !r.featured) return false;
      if (quickFilter === "alternatives" && !r.alternativeTo) return false;
      if (quickFilter === "docker" && !r.dockerCompose) return false;
      if (quickFilter === "no-card" && !r.statusTags?.some((t) => t.toLowerCase().includes("no card"))) return false;
      if (quickFilter === "ai" && !(r.type === "ai" || r.category?.toLowerCase().includes("ai") || r.category?.toLowerCase().includes("mcp"))) return false;

      // Text query search
      if (!q) return true;

      return (
        r.name.toLowerCase().includes(q) ||
        (r.description && r.description.toLowerCase().includes(q)) ||
        (r.category && r.category.toLowerCase().includes(q)) ||
        (r.alternativeTo && r.alternativeTo.toLowerCase().includes(q)) ||
        (r.language && r.language.toLowerCase().includes(q)) ||
        (r.repo && r.repo.toLowerCase().includes(q)) ||
        (r.license && r.license.toLowerCase().includes(q)) ||
        (r.statusTags && r.statusTags.some((tag) => tag.toLowerCase().includes(q)))
      );
    });
  }, [allResources, search, selectedCategory, quickFilter]);

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 border border-brand-cyan/60 text-white text-xs font-mono shadow-2xl shadow-brand-cyan/20 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
        <Link href="/" className="hover:text-brand-cyan transition-colors">Home</Link>
        <span>/</span>
        <span className="text-brand-cyan">DevShelf</span>
      </div>

      {/* Header Banner */}
      <div className="border-b border-slate-800 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30 shrink-0">
              <Layers className="w-8 h-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">DevShelf</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
                  {allResources.length} Verified Tools
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 text-xs font-mono">
                  Zero Paywall
                </span>
              </div>
              <p className="text-slate-400 text-sm sm:text-base font-mono mt-1.5">
                The Community Directory for 565+ Open-Source Developer Tools, Free APIs &amp; MCP Servers
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-brand-neon" />
              <span>npx devshelf search</span>
            </div>
            <Link
              href="/api/v1/tools.json"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 text-brand-cyan" />
              <span>REST API</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Search & Multi-Facet Filters */}
      <div className="py-8 space-y-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search 565+ tools by name, description, alternative to (e.g. 'Postman', 'Datadog', 'Sentry')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-cyan/80 focus:ring-1 focus:ring-brand-cyan/80 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-white"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Category Dropdown for Mobile / Direct selection */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono focus:outline-none focus:border-purple-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Categories" : c}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 mr-1" />
          
          <button
            onClick={() => setQuickFilter("all")}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors shrink-0 ${
              quickFilter === "all"
                ? "bg-purple-600/30 text-purple-300 border border-purple-500/50 font-bold"
                : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            All Tools ({allResources.length})
          </button>

          <button
            onClick={() => setQuickFilter(quickFilter === "featured" ? "all" : "featured")}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors shrink-0 flex items-center gap-1.5 ${
              quickFilter === "featured"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold"
                : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Star className="w-3 h-3 text-amber-400" />
            <span>Featured ({counts.featured})</span>
          </button>

          <button
            onClick={() => setQuickFilter(quickFilter === "alternatives" ? "all" : "alternatives")}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors shrink-0 flex items-center gap-1.5 ${
              quickFilter === "alternatives"
                ? "bg-purple-600/30 text-purple-300 border border-purple-500/50 font-bold"
                : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Open-Source Alternatives ({counts.alternatives})</span>
          </button>

          <button
            onClick={() => setQuickFilter(quickFilter === "docker" ? "all" : "docker")}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors shrink-0 flex items-center gap-1.5 ${
              quickFilter === "docker"
                ? "bg-blue-600/20 text-blue-300 border border-blue-500/50 font-bold"
                : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Server className="w-3 h-3 text-blue-400" />
            <span>Self-Hostable Docker ({counts.docker})</span>
          </button>

          <button
            onClick={() => setQuickFilter(quickFilter === "no-card" ? "all" : "no-card")}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors shrink-0 flex items-center gap-1.5 ${
              quickFilter === "no-card"
                ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/50 font-bold"
                : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>No Card Required ({counts.noCard})</span>
          </button>

          <button
            onClick={() => setQuickFilter(quickFilter === "ai" ? "all" : "ai")}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors shrink-0 flex items-center gap-1.5 ${
              quickFilter === "ai"
                ? "bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/50 font-bold"
                : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Boxes className="w-3 h-3 text-brand-cyan" />
            <span>AI &amp; MCP ({counts.ai})</span>
          </button>
        </div>

        {/* Category Horizontal Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-mono no-scrollbar pt-1">
          {categories.slice(0, 12).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                selectedCategory === cat
                  ? "bg-slate-800 text-white border border-slate-600 font-bold"
                  : "bg-slate-900/40 text-slate-500 hover:text-slate-300 border border-slate-800/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Sponsor Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-500 mb-6">
        <div>
          Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} matching resources
          {search && <span className="text-purple-400 ml-1.5">for &quot;{search}&quot;</span>}
        </div>
        <div className="text-slate-400">
          Click any tool card to view full capabilities &amp; install snippets
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.slice(0, visibleCount).map((tool, idx) => {
          const repoUrl = tool.repo ? (tool.repo.startsWith("http") ? tool.repo : `https://github.com/${tool.repo}`) : null;
          const install = getInstallCommand(tool);

          return (
            <div
              key={`${tool.name}-${idx}`}
              onClick={() => openToolModal(tool)}
              className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800 flex flex-col justify-between cursor-pointer group transition-all"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                    <span>{tool.name}</span>
                  </h3>
                  {tool.featured && (
                    <span className="p-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0" title="Featured Tool">
                      <Star className="w-3 h-3 fill-amber-400" />
                    </span>
                  )}
                </div>

                {/* Category & Alternative tag */}
                <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                  <span className="text-[11px] font-mono text-purple-400/90">
                    {tool.category || "Developer Tool"}
                  </span>

                  {tool.dockerCompose && (
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30 text-[10px] font-mono">
                      🐳 Docker
                    </span>
                  )}
                </div>

                {/* Alternative to Callout if exists */}
                {tool.alternativeTo && (
                  <div className="mb-3 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/25 text-[11px] font-mono text-purple-300 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-purple-400 shrink-0" />
                    <span className="truncate">Alt to: <strong className="text-white">{tool.alternativeTo}</strong></span>
                  </div>
                )}

                {/* Description */}
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {tool.description || "Open-source developer utility and toolkit."}
                </p>

                {/* Status Tags */}
                {tool.statusTags && tool.statusTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tool.statusTags.slice(0, 2).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-300 border border-slate-800 text-[10px] font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                    {tool.statusTags.length > 2 && (
                      <span className="text-[10px] font-mono text-slate-500 self-center">
                        +{tool.statusTags.length - 2} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom specs & Quick Copy */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <div className="flex items-center gap-1.5">
                  {tool.language && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 truncate max-w-[100px]">
                      {tool.language}
                    </span>
                  )}
                  {tool.license && (
                    <span className="text-slate-500 hidden sm:inline">
                      {tool.license}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(install.cmd, `${tool.name} install command`);
                    }}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-brand-cyan border border-slate-800 transition-colors"
                    title={`Copy install command: ${install.cmd}`}
                  >
                    {copiedText === install.cmd ? (
                      <Check className="w-3.5 h-3.5 text-brand-neon" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <span className="text-purple-400 group-hover:text-purple-300 flex items-center gap-0.5 text-xs font-semibold">
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="py-20 text-center glass-panel rounded-3xl border border-slate-800">
          <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No developer tools matched your search</h3>
          <p className="text-slate-400 text-xs font-mono mb-4">
            Try adjusting your search query, or clear selected category filters.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
              setQuickFilter("all");
            }}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-mono font-bold hover:bg-purple-500 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

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

      {/* ========================================================================= */}
      {/* INTERACTIVE TOOL DETAIL MODAL & DEEP EXPLAINER                           */}
      {/* ========================================================================= */}
      {selectedTool && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={closeToolModal}
        >
          <div
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#090D17] border border-slate-700/80 shadow-2xl p-6 sm:p-8 space-y-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Top Bar: Title & Action Controls */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {selectedTool.name}
                  </h2>

                  {selectedTool.featured && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/40 text-xs font-mono font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>Featured Partner</span>
                    </span>
                  )}

                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/40 text-xs font-mono">
                    {selectedTool.category || "Developer Tool"}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                  {selectedTool.language && (
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      {selectedTool.language}
                    </span>
                  )}
                  {selectedTool.license && (
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      License: {selectedTool.license}
                    </span>
                  )}
                  {selectedTool.section && (
                    <span className="text-slate-500">
                      • {selectedTool.section}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/devshelf#${toSlug(selectedTool.name)}`;
                    copyToClipboard(shareUrl, `${selectedTool.name} link`);
                  }}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                  title="Share tool link"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={closeToolModal}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                  title="Close modal (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Alternative To Spotlight Banner */}
            {selectedTool.alternativeTo && (
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-start sm:items-center gap-3">
                <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
                <div className="text-xs font-mono">
                  <span className="text-purple-400 font-bold uppercase tracking-wider block sm:inline mr-2">
                    Open-Source Alternative:
                  </span>
                  <span className="text-white font-bold">
                    Replaces {selectedTool.alternativeTo}
                  </span>
                  <span className="text-slate-400 block sm:inline sm:ml-2">
                    (Self-hostable, zero telemetry, no vendor lock-in)
                  </span>
                </div>
              </div>
            )}

            {/* What this tool does: Detailed Explanation */}
            <div>
              <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-brand-cyan" />
                <span>What It Does &amp; Core Purpose</span>
              </h4>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
                {selectedTool.description}
              </p>
            </div>

            {/* Capability & Status Badges */}
            {selectedTool.statusTags && selectedTool.statusTags.length > 0 && (
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-brand-neon" />
                  <span>Verified Capabilities &amp; Traits</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTool.statusTags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-xl bg-slate-900 text-slate-200 border border-slate-700/80 text-xs font-mono flex items-center gap-1.5"
                    >
                      <Check className="w-3 h-3 text-brand-neon" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Install, Docker Compose & README Badge Tabs */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab("quick-install")}
                  className={`pb-2 px-1 transition-colors border-b-2 flex items-center gap-1.5 ${
                    activeTab === "quick-install"
                      ? "border-brand-cyan text-brand-cyan font-bold"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Quick Install &amp; Run</span>
                </button>

                {selectedTool.dockerCompose && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("docker")}
                    className={`pb-2 px-1 transition-colors border-b-2 flex items-center gap-1.5 ${
                      activeTab === "docker"
                        ? "border-blue-400 text-blue-300 font-bold"
                        : "border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    <Server className="w-3.5 h-3.5" />
                    <span>Docker Compose</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setActiveTab("badge")}
                  className={`pb-2 px-1 transition-colors border-b-2 flex items-center gap-1.5 ${
                    activeTab === "badge"
                      ? "border-purple-400 text-purple-300 font-bold"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>GitHub README Badge</span>
                </button>
              </div>

              {/* Quick Install Tab Content */}
              {activeTab === "quick-install" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/60 border border-slate-800 font-mono text-xs text-white">
                    <span className="text-brand-neon mr-2">$</span>
                    <span className="flex-1 truncate">{getInstallCommand(selectedTool).cmd}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(getInstallCommand(selectedTool).cmd, "install command")}
                      className="ml-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Copy install command"
                    >
                      {copiedText === getInstallCommand(selectedTool).cmd ? (
                        <Check className="w-4 h-4 text-brand-neon" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {selectedTool.repo && (
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/60 border border-slate-800 font-mono text-xs text-slate-300">
                      <span className="text-slate-500 mr-2">$</span>
                      <span className="flex-1 truncate">
                        git clone {selectedTool.repo.startsWith("http") ? selectedTool.repo : `https://github.com/${selectedTool.repo}`}.git
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const url = selectedTool.repo?.startsWith("http") ? selectedTool.repo : `https://github.com/${selectedTool.repo}`;
                          copyToClipboard(`git clone ${url}.git`, "git clone command");
                        }}
                        className="ml-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Copy git clone"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Docker Compose Tab Content */}
              {activeTab === "docker" && selectedTool.dockerCompose && (
                <div className="space-y-2">
                  <div className="relative p-4 rounded-2xl bg-black/80 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-56">
                    <div className="absolute top-3 right-3">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(selectedTool.dockerCompose || "", "docker-compose.yml")}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono flex items-center gap-1.5 transition-colors border border-slate-700"
                      >
                        {copiedText === selectedTool.dockerCompose ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-brand-neon" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy YAML</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-emerald-400 font-mono text-[11px] leading-relaxed">
                      {selectedTool.dockerCompose}
                    </pre>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400">
                    💡 Save as <code className="text-brand-cyan">docker-compose.yml</code> and start with <code className="text-brand-cyan">docker compose up -d</code>
                  </p>
                </div>
              )}

              {/* GitHub Badge Tab Content */}
              {activeTab === "badge" && (
                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-3 text-xs font-mono">
                  <p className="text-slate-300">
                    Maintainer of <strong>{selectedTool.name}</strong>? Embed the verified DevShelf badge in your GitHub README:
                  </p>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="px-2 py-0.5 rounded bg-purple-600/30 text-purple-300 border border-purple-500/50 text-[10px]">
                      PREVIEW
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-bold">
                      DevShelf Verified
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
                    <span className="truncate pr-2">
                      {`[![Listed on DevShelf](https://ritualdev.in/api/badge/devshelf.svg)](https://ritualdev.in/devshelf#${toSlug(selectedTool.name)})`}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const snippet = `[![Listed on DevShelf](https://ritualdev.in/api/badge/devshelf.svg)](https://ritualdev.in/devshelf#${toSlug(selectedTool.name)})`;
                        copyToClipboard(snippet, "README badge markdown");
                      }}
                      className="px-3 py-1 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-500 transition-colors shrink-0"
                    >
                      Copy Markdown
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Specifications Matrix Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block mb-1">Free Tier</span>
                <span className="text-white font-bold truncate block">
                  {selectedTool.freeTier || "100% Free / OSS"}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block mb-1">Authentication</span>
                <span className="text-white font-bold truncate block">
                  {selectedTool.auth || "No Auth / Zero Token"}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block mb-1">Self-Hostable</span>
                <span className="text-white font-bold truncate block">
                  {selectedTool.dockerCompose ? "Yes (Docker)" : "Native / CLI"}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block mb-1">License</span>
                <span className="text-white font-bold truncate block">
                  {selectedTool.license || "Open Source"}
                </span>
              </div>
            </div>

            {/* External Links & Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex flex-wrap items-center gap-2">
                {selectedTool.repo && (
                  <Link
                    href={selectedTool.repo.startsWith("http") ? selectedTool.repo : `https://github.com/${selectedTool.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-500 transition-colors flex items-center gap-2"
                  >
                    <span>View GitHub Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                )}

                {selectedTool.url && (
                  <Link
                    href={selectedTool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors flex items-center gap-2"
                  >
                    <span>Official Website / Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                )}

                {selectedTool.goodFirstIssues && (
                  <Link
                    href={selectedTool.goodFirstIssues}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5"
                  >
                    <span>Good First Issues</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>

              <button
                type="button"
                onClick={closeToolModal}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors ml-auto"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
