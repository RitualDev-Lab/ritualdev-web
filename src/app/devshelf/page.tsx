"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
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
  Boxes,
  CreditCard,
  BadgeCheck,
  Globe,
  DollarSign,
  ArrowUp,
  Grid,
  ChevronDown,
  ChevronRight,
  Zap,
  HelpCircle,
  SlidersHorizontal
} from "lucide-react";
import {
  searchResources,
  highlightText,
  type AutoCategoryDetection,
  type Resource,
} from "@/lib/searchEngine";
import rawData from "@/data/devshelf.json";
import { DevShelfSkeletonGrid } from "@/components/Skeleton";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getInstallCommand(tool: Resource): { cmd: string; type: string } | null {
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
  return null;
}

// Live Dodo Payments Checkout Configuration
const DODO_PRODUCT_ID = "pdt_0NpjONGugY5QkrFDUaPva";
const DODO_BASE_URL = `https://checkout.dodopayments.com/buy/${DODO_PRODUCT_ID}`;

const SPONSOR_PACKAGES = [
  {
    id: "featuredSponsor",
    name: "Featured Tool Sponsor",
    priceUsd: 99,
    priceInr: 8300,
    tag: "Flagship / Pinned #1 Search Spot",
    desc: "Pinned #1 placement across all 567+ tool search results, gold 'Verified Sponsor' badge, weekly developer newsletter feature, and RSS feed inclusion.",
  },
  {
    id: "categoryTakeover",
    name: "Category Spotlight",
    priceUsd: 49,
    priceInr: 4100,
    tag: "Category Top",
    desc: "Pinned top #1 placement in your category + glowing verified star badge across 567+ dossiers.",
  },
  {
    id: "mcpPro",
    name: "MCP & AI Agent Recommended",
    priceUsd: 29,
    priceInr: 2400,
    tag: "High Intent",
    desc: "Priority recommendation inside npx devshelf-mcp AI sessions (Claude Code, Cursor, Windsurf).",
  },
];


function HighlightedText({ text, tokens }: { text?: string; tokens?: string[] }) {
  if (!text) return null;
  if (!tokens || tokens.length === 0) return <span>{text}</span>;
  const chunks = highlightText(text, tokens);
  return (
    <span>
      {chunks.map((chunk, i) =>
        chunk.isMatch ? (
          <mark
            key={i}
            className="bg-purple-500/30 text-purple-200 px-0.5 rounded font-semibold transition-colors"
          >
            {chunk.text}
          </mark>
        ) : (
          <span key={i}>{chunk.text}</span>
        )
      )}
    </span>
  );
}

export default function DevShelfPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [quickFilter, setQuickFilter] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(36);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "categorized">("grid");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSyntaxModalOpen, setIsSyntaxModalOpen] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const searchRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q") || params.get("search");
      if (q) setSearch(q);
      const cat = params.get("cat") || params.get("category");
      if (cat) setSelectedCategory(cat);
      const filter = params.get("filter");
      if (filter) setQuickFilter(filter);
    }
  }, []);

  // Synchronize search query, category, and quick filter with browser URL
  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (search.trim()) url.searchParams.set("q", search.trim());
    else url.searchParams.delete("q");

    if (selectedCategory && selectedCategory !== "All") url.searchParams.set("cat", selectedCategory);
    else url.searchParams.delete("cat");

    if (quickFilter && quickFilter !== "all") url.searchParams.set("filter", quickFilter);
    else url.searchParams.delete("filter");

    window.history.replaceState(null, "", url.toString());
  }, [search, selectedCategory, quickFilter, isMounted]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 36);
      setIsLoadingMore(false);
    }, 350);
  };
  
  // Modals state
  const [selectedTool, setSelectedTool] = useState<Resource | null>(null);
  const selectedInstall = selectedTool && getInstallCommand(selectedTool);
  const [activeTab, setActiveTab] = useState<"quick-install" | "docker" | "badge">("quick-install");
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);

  // Badge generator state
  const [badgeToolName, setBadgeToolName] = useState("DevShelf");
  const [badgeStyle, setBadgeStyle] = useState<"verified" | "devshelf" | "zero-paywall">("verified");

  // Sponsor form state
  const [sponsorToolName, setSponsorToolName] = useState("");
  const [sponsorToolUrl, setSponsorToolUrl] = useState("");
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorEmail, setSponsorEmail] = useState("");
  const [sponsorCategory, setSponsorCategory] = useState("Developer Tools");
  const [selectedPackageId, setSelectedPackageId] = useState("featuredSponsor");
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [sponsorError, setSponsorError] = useState("");

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
    setBadgeToolName(tool.name);
    window.history.replaceState(null, "", `#${toSlug(tool.name)}`);
  }, []);

  const closeToolModal = useCallback(() => {
    setSelectedTool(null);
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }, []);

    // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Listen for URL hash changes and keyboard Escape
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash) {
        if (hash === "sponsor") {
          setIsSponsorModalOpen(true);
          return;
        }
        if (hash === "badge") {
          setIsBadgeModalOpen(true);
          return;
        }
        const found = allResources.find((r) => toSlug(r.name) === hash);
        if (found) {
          setSelectedTool(found);
          setActiveTab(found.dockerCompose ? "docker" : "quick-install");
          setBadgeToolName(found.name);
        }
      } else {
        setSelectedTool(null);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search input on / or Cmd+K / Ctrl+K
      if ((e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }

      if (e.key === "Escape") {
        if (document.activeElement === searchRef.current) {
          searchRef.current?.blur();
        }
        closeToolModal();
        setIsSponsorModalOpen(false);
        setIsBadgeModalOpen(false);
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

  // Filtered and ranked resources using multi-technique search engine & auto-categorization
  const {
    results: filtered,
    crossCategoryCount: crossCategoryMatches,
    detectedCategory,
    scoredResults,
    availableCategoriesInResults,
  } = useMemo(() => {
    return searchResources(allResources, search, {
      selectedCategory,
      quickFilter,
      enableFuzzy: true,
    });
  }, [allResources, search, selectedCategory, quickFilter]);

  // Token map for keyword highlighting
  const toolTokensMap = useMemo(() => {
    const map = new Map<string, string[]>();
    scoredResults.forEach((s) => {
      if (s.matchedTokens && s.matchedTokens.length > 0) {
        map.set(s.tool.name, s.matchedTokens);
      }
    });
    return map;
  }, [scoredResults]);

  // Grouped results for "Group by Category" view
  const groupedByCategory = useMemo(() => {
    const groups: Record<string, Resource[]> = {};
    filtered.forEach((tool) => {
      const cat = tool.category || "Developer Tools";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(tool);
    });
    return Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
  }, [filtered]);

  // Handle Dodo Payments Sponsor Checkout
  const handleSponsorCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setSponsorError("");

    if (!sponsorToolName.trim()) {
      setSponsorError("Please enter your Tool Name.");
      return;
    }
    if (!sponsorToolUrl.trim()) {
      setSponsorError("Please enter your Tool URL or GitHub Repo.");
      return;
    }

    const pkg = SPONSOR_PACKAGES.find((p) => p.id === selectedPackageId) || SPONSOR_PACKAGES[0];
    const amount = currency === "INR" ? pkg.priceInr : pkg.priceUsd;

    const dodoParams = new URLSearchParams();
    dodoParams.set("name", sponsorName || sponsorToolName);
    dodoParams.set("fullName", sponsorName || sponsorToolName);
    if (sponsorEmail) {
      dodoParams.set("email", sponsorEmail);
      dodoParams.set("customer_email", sponsorEmail);
    }
    dodoParams.set("paymentAmount", String(amount));
    dodoParams.set("amount", String(amount));
    dodoParams.set("paymentCurrency", currency);
    dodoParams.set("currency", currency);
    dodoParams.set("singlePage", "true");
    dodoParams.set("product_type", "digital");
    dodoParams.set("shipping_required", "false");
    dodoParams.set("redirect_url", `${window.location.origin}/devshelf?sponsor=success`);
    dodoParams.set("metadata_toolName", sponsorToolName);
    dodoParams.set("metadata_toolUrl", sponsorToolUrl);
    dodoParams.set("metadata_package", pkg.id);
    dodoParams.set("metadata_category", sponsorCategory);

    const checkoutUrl = `${DODO_BASE_URL}?${dodoParams.toString()}`;
    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    setIsSponsorModalOpen(false);
    copyToClipboard(checkoutUrl, "Dodo Payments checkout URL");
  };

  // Badge Generator outputs
  const badgeSlug = toSlug(badgeToolName || "devshelf");
  const badgeTargetUrl = badgeToolName && badgeToolName !== "DevShelf"
    ? `https://ritualdev.in/devshelf#${badgeSlug}`
    : `https://ritualdev.in/devshelf`;
  const badgeImageUrl = `https://ritualdev.in/api/badge/${badgeStyle}.svg`;
  const badgeMarkdown = `[![${badgeToolName} on DevShelf](${badgeImageUrl})](${badgeTargetUrl})`;
  const badgeHtml = `<a href="${badgeTargetUrl}"><img src="${badgeImageUrl}" alt="${badgeToolName} on DevShelf" /></a>`;

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "DevShelf - The Crowdsourced Zero-Paywall Developer Directory",
            description: "Discover 575+ verified open-source developer tools, free APIs, AI agents, and MCP servers.",
            url: "https://ritualdev.in/devshelf/",
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: allResources.length,
              itemListElement: allResources.slice(0, 30).map((tool, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                name: tool.name,
                url: `https://ritualdev.in/devshelf/${toSlug(tool.name)}/`,
                description: tool.description,
              })),
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is DevShelf?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "DevShelf is an open-source, zero-paywall directory of 575+ verified developer tools, free APIs, AI agents, and MCP servers created and maintained by RitualDev-Lab.",
                },
              },
              {
                "@type": "Question",
                name: "How do I find free open-source alternatives to Postman, Datadog, or Copilot?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "DevShelf curates self-hostable open-source alternatives with zero telemetry and generous free tiers. You can use the 'Open-Source Alternatives' filter or search directly for tools like Postman, Datadog, or Sentry.",
                },
              },
              {
                "@type": "Question",
                name: "Can I self-host DevShelf tools locally or with Docker?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, over 50+ tools in DevShelf include pre-configured Docker Compose recipes and 1-click CLI install commands.",
                },
              },
              {
                "@type": "Question",
                name: "How do I install or use DevShelf from the terminal?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can run 'npx devshelf search <query>' or 'npx devshelf explain <tool>' directly from your terminal, or launch the interactive TUI with 'npx devshelf'.",
                },
              },
              {
                "@type": "Question",
                name: "How do I submit an open-source tool to DevShelf?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Maintainers can submit tools via GitHub Pull Request to RitualDev-Lab/DevShelf. Approved tools receive a verified badge and permanent listing.",
                },
              },
            ],
          }),
        }}
      />
      
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
                The Community Directory for 575+ Open-Source Developer Tools, Free APIs &amp; MCP Servers
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsBadgeModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5 text-purple-400" />
              <span>Embed Badge</span>
            </button>

            <button
              onClick={() => setIsSponsorModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-purple-600/20"
            >
              <Star className="w-3.5 h-3.5 fill-white" />
              <span>Feature Your Tool</span>
            </button>

            <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 hidden lg:flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-brand-neon" />
              <span>npx devshelf search</span>
            </div>

            <Link
              href="/api/v1/tools.json"
              target="_blank"
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 text-brand-cyan" />
              <span>REST API</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured / Sponsor CTA Banner (Monetization Engine) */}
      <div className="mt-8 glass-panel p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/30 via-slate-900/70 to-purple-950/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/40 text-[11px] font-mono font-bold flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>Sponsor / Feature Tool</span>
            </span>
            <span className="text-xs font-mono text-slate-400">Reach 10,000+ Software Engineers &amp; AI Agents</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            Want top spotlight for your open-source tool, API, or MCP server?
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Get a permanent verified badge, category #1 placement, and visibility in Claude Code / Cursor AI sessions.
          </p>
        </div>

        <button
          onClick={() => setIsSponsorModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold transition-all shrink-0 shadow-lg shadow-purple-600/30 flex items-center gap-2"
        >
          <span>Feature Your Tool ($99/mo)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Search & Multi-Facet Filters */}
      <div className="py-8 space-y-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div ref={searchContainerRef} className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              ref={searchRef}
              type="text"
              placeholder={`Search ${allResources.length}+ zero-paywall tools, APIs, AI agents (e.g. 'Akii', 'Postman', 'Docker')...`}
              value={search}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => {
                setSearch(e.target.value);
                setIsSearchFocused(true);
              }}
              className="w-full pl-11 pr-32 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-cyan/80 focus:ring-1 focus:ring-brand-cyan/80 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setIsSearchFocused(false);
                    searchRef.current?.focus();
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
                  title="Clear search (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsSyntaxModalOpen(true)}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-purple-300 border border-slate-700 text-[10px] font-mono flex items-center gap-1 transition-colors"
                title="View search syntax tips & techniques"
              >
                <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">Syntax</span>
              </button>
              {!search && (
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-slate-800/80 rounded border border-slate-700 select-none">
                  ⌘K /
                </kbd>
              )}
            </div>

            {/* Instant Autocomplete Suggestions Dropdown */}
            {isSearchFocused && search.trim().length >= 1 && (
              <div className="absolute left-0 right-0 top-full mt-2 z-40 p-3.5 rounded-2xl bg-slate-900/98 backdrop-blur-xl border border-slate-700/80 shadow-2xl shadow-purple-950/50 space-y-3 animate-fade-in text-xs font-mono">
                {/* Top Matching Tools */}
                {scoredResults.length > 0 ? (
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Top Matches ({scoredResults.length} tools found)</span>
                      <span>Click to view details</span>
                    </div>
                    <div className="space-y-1.5">
                      {scoredResults.slice(0, 4).map(({ tool, isFuzzyMatch }) => (
                        <div
                          key={tool.name}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            openToolModal(tool);
                            setIsSearchFocused(false);
                          }}
                          className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-purple-950/50 hover:border-purple-500/40 border border-slate-800 flex items-center justify-between cursor-pointer transition-all group"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="font-bold text-white group-hover:text-purple-300 truncate">
                              <HighlightedText text={tool.name} tokens={toolTokensMap.get(tool.name)} />
                            </span>
                            {isFuzzyMatch && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 text-[9px] border border-amber-500/30 shrink-0">
                                typo match
                              </span>
                            )}
                            <span className="text-[10px] text-purple-400 truncate hidden sm:inline">
                              • {tool.category || "Tool"}
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-transform shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-400 py-1">
                    No direct matches for &quot;{search}&quot;. Try power syntax like <code className="text-purple-300">cat:ai</code>, <code className="text-purple-300">is:docker</code>, or <code className="text-purple-300">is:free</code>.
                  </div>
                )}

                {/* Auto-Categorized Category Match */}
                {detectedCategory && (
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-brand-cyan">
                      <Zap className="w-3.5 h-3.5 text-brand-neon" />
                      <span>Category Intent: <strong>{detectedCategory.detectedCategory}</strong></span>
                    </div>
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setSelectedCategory(detectedCategory.detectedCategory);
                        setIsSearchFocused(false);
                      }}
                      className="text-xs text-brand-cyan hover:underline font-bold"
                    >
                      Filter ({detectedCategory.confidence}%) →
                    </button>
                  </div>
                )}

                {/* Suggested Queries */}
                <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-500">Suggested:</span>
                  {[
                    search.toLowerCase().includes("docker") ? "docker compose" : "is:docker",
                    search.toLowerCase().includes("ai") ? "ai mcp agent" : "cat:ai",
                    search.toLowerCase().includes("postman") ? "alt:postman" : "lang:python",
                    "is:free",
                  ].map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setSearch(sug);
                        setIsSearchFocused(false);
                        searchRef.current?.focus();
                      }}
                      className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] transition-colors"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

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

        {/* Popular Quick-Search Suggestions */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono text-slate-400 no-scrollbar pt-0.5">
          <span className="text-slate-500 shrink-0 flex items-center gap-1 mr-1">
            <Sparkles className="w-3 h-3 text-purple-400" /> Quick Search:
          </span>
          {[
            { label: "Akii", query: "Akii" },
            { label: "Claude Code", query: "Claude Code" },
            { label: "Postman Alternative", query: "Postman" },
            { label: "Local LLM", query: "Local LLM" },
            { label: "Docker Compose", query: "Docker" },
            { label: "Postgres", query: "Postgres" },
            { label: "Zero Telemetry", query: "Zero Telemetry" },
            { label: "MCP Server", query: "MCP" },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setSearch(item.query);
                setSelectedCategory("All");
                setQuickFilter("all");
                searchRef.current?.focus();
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-purple-950/40 text-slate-400 hover:text-purple-300 border border-slate-800 hover:border-purple-500/40 whitespace-nowrap transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Real-time Auto-Categorized Query Intent */}
        {detectedCategory && selectedCategory !== detectedCategory.detectedCategory && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-brand-cyan/10 via-purple-950/40 to-brand-cyan/5 border border-brand-cyan/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-brand-cyan">
              <Zap className="w-4 h-4 text-brand-neon shrink-0 animate-pulse" />
              <span>
                Auto-Categorized Intent: <strong>{detectedCategory.detectedCategory}</strong>
                <span className="text-slate-400 text-[11px] ml-1.5 hidden sm:inline">
                  ({detectedCategory.confidence}% confidence • {detectedCategory.explanation})
                </span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory(detectedCategory.detectedCategory);
                searchRef.current?.focus();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-brand-cyan/20 hover:bg-brand-cyan/30 text-brand-cyan hover:text-white border border-brand-cyan/40 font-bold transition-all text-xs whitespace-nowrap self-start sm:self-auto"
            >
              Filter to {detectedCategory.detectedCategory} →
            </button>
          </div>
        )}

        {/* Dynamic Category Chips for Current Search */}
        {search && availableCategoriesInResults.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono text-slate-400 no-scrollbar pt-1">
            <span className="text-slate-500 shrink-0 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3 text-purple-400" /> Categories in Results:
            </span>
            {availableCategoriesInResults.slice(0, 6).map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedCategory(c.name)}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 text-[11px] ${
                  selectedCategory === c.name
                    ? "bg-purple-600 text-white font-bold"
                    : "bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700"
                }`}
              >
                <span>{c.name}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-purple-300 text-[10px] font-bold">
                  {c.count}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Cross-Category Search Match Banner */}
        {crossCategoryMatches > 0 && filtered.length === 0 && (
          <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-purple-200">
            <div className="flex items-center gap-2">
              <span className="text-base">💡</span>
              <span>
                Found <strong>{crossCategoryMatches}</strong> matching {crossCategoryMatches === 1 ? "tool" : "tools"} for &quot;<strong>{search}</strong>&quot; outside current category &quot;<strong>{selectedCategory}</strong>&quot;.
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setQuickFilter("all");
              }}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors whitespace-nowrap shrink-0"
            >
              Show all results ({crossCategoryMatches}) →
            </button>
          </div>
        )}

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

      {/* Results Count, View Toggle & Auto-Categorization */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-500 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span>
            Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} matching resources
            {search && <span className="text-purple-400 ml-1.5">for &quot;{search}&quot;</span>}
          </span>
          {detectedCategory && (
            <span className="px-2 py-0.5 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 text-[10px]">
              Intent: {detectedCategory.detectedCategory}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle: Grid vs Group by Category */}
          <div className="flex items-center gap-1 p-0.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px]">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                viewMode === "grid"
                  ? "bg-purple-600/30 text-purple-300 font-bold border border-purple-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("categorized")}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                viewMode === "categorized"
                  ? "bg-purple-600/30 text-purple-300 font-bold border border-purple-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>By Category ({groupedByCategory.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tools Display: Grid or Grouped by Auto-Detected Category */}
      {!isMounted ? (
        <DevShelfSkeletonGrid count={9} />
      ) : viewMode === "categorized" ? (
        <div className="space-y-8">
          {groupedByCategory.map(([catName, catTools]) => {
            const isCollapsed = collapsedCategories[catName];
            return (
              <div key={catName} className="space-y-4">
                <div
                  onClick={() =>
                    setCollapsedCategories((prev) => ({
                      ...prev,
                      [catName]: !prev[catName],
                    }))
                  }
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    {isCollapsed ? (
                      <ChevronRight className="w-4 h-4 text-purple-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-purple-400" />
                    )}
                    <h2 className="text-base font-bold text-white flex items-center gap-2.5">
                      <span>{catName}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-mono">
                        {catTools.length} {catTools.length === 1 ? "tool" : "tools"}
                      </span>
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {isCollapsed ? "Click to expand" : "Click to collapse"}
                  </span>
                </div>

                {!isCollapsed && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {catTools.map((tool, idx) => {
                      const install = getInstallCommand(tool);
                      const matchedTokens = toolTokensMap.get(tool.name);

                      return (
                        <div
                          key={`${catName}-${tool.name}-${idx}`}
                          onClick={() => openToolModal(tool)}
                          className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800 flex flex-col justify-between cursor-pointer group transition-all"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                                <HighlightedText text={tool.name} tokens={matchedTokens} />
                              </h3>
                              {tool.featured && (
                                <span className="p-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0" title="Featured Tool">
                                  <Star className="w-3 h-3 fill-amber-400" />
                                </span>
                              )}
                            </div>

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

                            {tool.alternativeTo && (
                              <div className="mb-3 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/25 text-[11px] font-mono text-purple-300 flex items-center gap-1.5">
                                <Sparkles className="w-3 h-3 text-purple-400 shrink-0" />
                                <span className="truncate">
                                  Alt to: <strong className="text-white"><HighlightedText text={tool.alternativeTo} tokens={matchedTokens} /></strong>
                                </span>
                              </div>
                            )}

                            <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                              <HighlightedText text={tool.description || "Open-source developer utility and toolkit."} tokens={matchedTokens} />
                            </p>

                            {tool.statusTags && tool.statusTags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {tool.statusTags.slice(0, 2).map((tag, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-300 border border-slate-800 text-[10px] font-mono"
                                  >
                                    <HighlightedText text={tag} tokens={matchedTokens} />
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
                              {install && (
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
                              )}

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
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.slice(0, visibleCount).map((tool, idx) => {
              const install = getInstallCommand(tool);
              const matchedTokens = toolTokensMap.get(tool.name);

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
                        <HighlightedText text={tool.name} tokens={matchedTokens} />
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
                        <span className="truncate">
                          Alt to: <strong className="text-white"><HighlightedText text={tool.alternativeTo} tokens={matchedTokens} /></strong>
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      <HighlightedText text={tool.description || "Open-source developer utility and toolkit."} tokens={matchedTokens} />
                    </p>

                    {/* Status Tags */}
                    {tool.statusTags && tool.statusTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {tool.statusTags.slice(0, 2).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-300 border border-slate-800 text-[10px] font-mono"
                          >
                            <HighlightedText text={tag} tokens={matchedTokens} />
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
                      {install && (
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
                      )}

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
          {isLoadingMore && (
            <div className="mt-5">
              <DevShelfSkeletonGrid count={6} />
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="py-20 text-center glass-panel rounded-3xl border border-slate-800">
          <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No developer tools matched your search</h3>
          <p className="text-slate-400 text-xs font-mono mb-4 max-w-md mx-auto">
            {crossCategoryMatches > 0
              ? `We found ${crossCategoryMatches} tools matching "${search}" in other categories. Click below to view them.`
              : "Try adjusting your search query, searching by alternative (e.g. 'Postman'), or resetting filters."}
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {crossCategoryMatches > 0 && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setQuickFilter("all");
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-mono font-bold hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/30"
              >
                Show All {crossCategoryMatches} Matching Tools
              </button>
            )}
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setQuickFilter("all");
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-mono font-bold hover:bg-slate-700 transition-colors border border-slate-700"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

      {/* Load More & Back to Top */}
      {visibleCount < filtered.length && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-12">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-6 py-3 rounded-xl glass-panel text-white text-xs font-mono hover:border-purple-500/60 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isLoadingMore ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                <span>Loading Next Batch...</span>
              </>
            ) : (
              <span>Load More Tools ({filtered.length - visibleCount} remaining)</span>
            )}
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/60 text-slate-300 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5"
            title="Jump back to top of directory"
          >
            <ArrowUp className="w-3.5 h-3.5 text-purple-400" />
            <span>Back to Top</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. INTERACTIVE TOOL DETAIL MODAL & DEEP EXPLAINER                         */}
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
                  <span>{selectedInstall ? "Quick Install & Run" : "Getting started"}</span>
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
                  {selectedInstall ? (
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/60 border border-slate-800 font-mono text-xs text-white">
                      <span className="text-brand-neon mr-2">$</span>
                      <span className="flex-1 truncate">{selectedInstall.cmd}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(selectedInstall.cmd, "install command")}
                        className="ml-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Copy install command"
                      >
                        {copiedText === selectedInstall.cmd ? (
                          <Check className="w-4 h-4 text-brand-neon" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ) : selectedTool.url ? (
                    <a href={selectedTool.url} target="_blank" rel="noopener noreferrer" className="text-brand-cyan underline">
                      Visit the official site for setup instructions
                    </a>
                  ) : (
                    <p>No installation instructions are listed.</p>
                  )}
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
                    <img
                      src={`https://ritualdev.in/api/badge/verified.svg`}
                      alt="DevShelf Verified Badge"
                      className="h-5"
                    />
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
                  {selectedTool.freeTier || selectedTool.freeTierCost || (selectedTool.rateLimit ? "See usage limits" : "Not listed")}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block mb-1">Authentication</span>
                <span className="text-white font-bold truncate block">
                  {selectedTool.auth || "Not listed"}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block mb-1">Self-Hostable</span>
                <span className="text-white font-bold truncate block">
                  {selectedTool.dockerCompose ? "Yes (Docker)" : selectedTool.statusTags?.includes("Self-Hostable") ? "Yes" : "Not listed"}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block mb-1">License</span>
                <span className="text-white font-bold truncate block">
                  {selectedTool.license || "Not listed"}
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

      {/* ========================================================================= */}
      {/* 2. SELF-SERVE DODO PAYMENTS SPONSORSHIP CHECKOUT MODAL                   */}
      {/* ========================================================================= */}
      {isSponsorModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setIsSponsorModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#090D17] border border-purple-500/50 shadow-2xl p-6 sm:p-8 space-y-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <Star className="w-4 h-4 fill-amber-400" />
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Feature Your Developer Tool
                  </h2>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Instant activation across 575+ web dossiers &amp; npx devshelf-mcp AI sessions.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsSponsorModalOpen(false)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center justify-between text-xs font-mono p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">Select Billing Currency:</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCurrency("USD")}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    currency === "USD" ? "bg-purple-600 text-white font-bold" : "text-slate-400 hover:text-white"
                  }`}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("INR")}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    currency === "INR" ? "bg-purple-600 text-white font-bold" : "text-slate-400 hover:text-white"
                  }`}
                >
                  INR (₹)
                </button>
              </div>
            </div>

            {/* Packages Selector */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Select Sponsorship Package
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SPONSOR_PACKAGES.map((pkg) => {
                  const isSelected = selectedPackageId === pkg.id;
                  const price = currency === "INR" ? `₹${pkg.priceInr}` : `$${pkg.priceUsd}`;

                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-900/30 ring-1 ring-purple-500"
                          : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-purple-300 border border-slate-700">
                            {pkg.tag}
                          </span>
                          <span className="text-sm font-bold text-white font-mono">{price}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white mb-1.5">{pkg.name}</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                          {pkg.desc}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px] font-mono text-purple-400">
                        <Check className="w-3 h-3" />
                        <span>Instant Activation</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSponsorCheckout} className="space-y-4 text-xs font-mono">
              {sponsorError && (
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-red-300">
                  {sponsorError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-slate-400">Tool / Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MyDevTool"
                    value={sponsorToolName}
                    onChange={(e) => setSponsorToolName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400">Tool URL / GitHub Repo *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/..."
                    value={sponsorToolUrl}
                    onChange={(e) => setSponsorToolUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-slate-400">Your Name (or Company)</label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Chen"
                    value={sponsorName}
                    onChange={(e) => setSponsorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400">Email (for Dodo PDF Invoice)</label>
                  <input
                    type="email"
                    placeholder="alex@example.com"
                    value={sponsorEmail}
                    onChange={(e) => setSponsorEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400">Target Category</label>
                <select
                  value={sponsorCategory}
                  onChange={(e) => setSponsorCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="AI Agents & Local LLMs">AI Agents &amp; Local LLMs</option>
                  <option value="Security & Defense">Security &amp; Defense</option>
                  <option value="Developer Productivity & CLI">Developer Productivity &amp; CLI</option>
                  <option value="Database & Cloud">Database &amp; Cloud</option>
                  <option value="Testing & QA Automations">Testing &amp; QA Automations</option>
                  <option value="Public Free APIs">Public Free APIs</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-3">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl font-bold font-mono text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>
                    Proceed to Dodo Checkout (
                    {currency === "INR"
                      ? `₹${(SPONSOR_PACKAGES.find((p) => p.id === selectedPackageId) || SPONSOR_PACKAGES[0]).priceInr}`
                      : `$${(SPONSOR_PACKAGES.find((p) => p.id === selectedPackageId) || SPONSOR_PACKAGES[0]).priceUsd}`}
                    )
                  </span>
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500">
                  <span>🔒 Secured by Dodo Payments</span>
                  <span>•</span>
                  <span>Global Tax &amp; GST Handled</span>
                  <span>•</span>
                  <span>Instant PDF Invoice</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE GITHUB README BADGE GENERATOR MODAL                         */}
      {/* ========================================================================= */}
      {isBadgeModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setIsBadgeModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#090D17] border border-slate-700/80 shadow-2xl p-6 sm:p-8 space-y-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30">
                    <Bookmark className="w-4 h-4" />
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    DevShelf README Badge Generator
                  </h2>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Showcase that your open-source project is verified on DevShelf.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsBadgeModalOpen(false)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-slate-400">Your Tool or Repository Name</label>
                <input
                  type="text"
                  placeholder="e.g. AgentShield or MyTool"
                  value={badgeToolName}
                  onChange={(e) => setBadgeToolName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400">Choose Badge Style</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setBadgeStyle("verified")}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      badgeStyle === "verified"
                        ? "bg-purple-600/30 text-purple-300 border-purple-500 font-bold"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Verified Badge
                  </button>

                  <button
                    type="button"
                    onClick={() => setBadgeStyle("devshelf")}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      badgeStyle === "devshelf"
                        ? "bg-purple-600/30 text-purple-300 border-purple-500 font-bold"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Listed on DevShelf
                  </button>

                  <button
                    type="button"
                    onClick={() => setBadgeStyle("zero-paywall")}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      badgeStyle === "zero-paywall"
                        ? "bg-purple-600/30 text-purple-300 border-purple-500 font-bold"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Zero Paywall
                  </button>
                </div>
              </div>

              {/* Live Preview */}
              <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 block">
                  Live SVG Badge Preview
                </span>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center">
                  <img
                    src={badgeImageUrl}
                    alt={`${badgeToolName} badge preview`}
                    className="h-6"
                  />
                </div>
              </div>

              {/* Copy Code: Markdown */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Markdown (for GitHub README.md)</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(badgeMarkdown, "Markdown badge")}
                    className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-bold"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Markdown</span>
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-black/80 border border-slate-800 text-slate-300 break-all">
                  {badgeMarkdown}
                </div>
              </div>

              {/* Copy Code: HTML */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-slate-400">
                  <span>HTML (for Website or Docs)</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(badgeHtml, "HTML badge")}
                    className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-bold"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy HTML</span>
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-black/80 border border-slate-800 text-slate-300 break-all">
                  {badgeHtml}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Syntax & Techniques Modal */}
      {isSyntaxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white font-mono space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-base font-bold text-white">
                <Zap className="w-4 h-4 text-brand-neon" />
                <span>Search Techniques &amp; Power Syntax</span>
              </div>
              <button
                type="button"
                onClick={() => setIsSyntaxModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              DevShelf features a multi-technique search engine designed for rapid developer discovery. Mix and match any of these patterns:
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 space-y-1">
                <div className="text-purple-300 font-bold flex items-center gap-2">
                  <span>1. Multi-Token &amp; Word-by-Word</span>
                  <code className="text-[10px] bg-purple-500/20 text-purple-200 px-1.5 py-0.5 rounded">docker postgres</code>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Matches keywords in any order across tool name, description, tags, and languages.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 space-y-1">
                <div className="text-purple-300 font-bold flex items-center gap-2">
                  <span>2. Typo-Tolerance &amp; Fuzzy Search</span>
                  <code className="text-[10px] bg-purple-500/20 text-purple-200 px-1.5 py-0.5 rounded">posgres</code>
                  <span className="text-slate-500 text-[10px]">→ finds PostgreSQL</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Automatic Levenshtein typo-correction (e.g. <code className="text-white">dockr</code>, <code className="text-white">claud</code>, <code className="text-white">kubernets</code>).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 space-y-1">
                <div className="text-purple-300 font-bold flex items-center gap-2">
                  <span>3. Synonym &amp; Acronym Expansion</span>
                  <code className="text-[10px] bg-purple-500/20 text-purple-200 px-1.5 py-0.5 rounded">k8s</code>
                  <span className="text-slate-500 text-[10px]">→ finds Kubernetes</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Maps <code className="text-white">db</code> → Database, <code className="text-white">ai</code> → LLM/Agent, <code className="text-white">auth</code> → Authentication.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 space-y-1.5">
                <div className="text-purple-300 font-bold">4. Power Operators</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <code className="px-1.5 py-0.5 rounded bg-slate-800 text-brand-cyan">is:docker</code>
                    <span className="text-slate-400">Self-hostable tools</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <code className="px-1.5 py-0.5 rounded bg-slate-800 text-brand-cyan">is:featured</code>
                    <span className="text-slate-400">Featured spotlights</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <code className="px-1.5 py-0.5 rounded bg-slate-800 text-brand-cyan">is:free</code>
                    <span className="text-slate-400">No card required</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <code className="px-1.5 py-0.5 rounded bg-slate-800 text-brand-cyan">cat:ai</code>
                    <span className="text-slate-400">Filter category</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <code className="px-1.5 py-0.5 rounded bg-slate-800 text-brand-cyan">lang:rust</code>
                    <span className="text-slate-400">Filter language</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <code className="px-1.5 py-0.5 rounded bg-slate-800 text-brand-cyan">alt:postman</code>
                    <span className="text-slate-400">Alternative to</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <code className="px-1.5 py-0.5 rounded bg-slate-800 text-brand-cyan">-paid</code>
                    <span className="text-slate-400">Exclude term</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <code className="px-1.5 py-0.5 rounded bg-slate-800 text-brand-cyan">&quot;exact phrase&quot;</code>
                    <span className="text-slate-400">Exact match</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsSyntaxModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors"
              >
                Got it, let&apos;s search!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
