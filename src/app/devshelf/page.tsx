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
  Boxes,
  CreditCard,
  BadgeCheck,
  Globe,
  DollarSign
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
    id: "categoryTakeover",
    name: "Category Spotlight",
    priceUsd: 39,
    priceInr: 3299,
    tag: "Most Popular",
    desc: "Pinned top #1 placement in your category + glowing verified star badge across 565+ dossiers.",
  },
  {
    id: "mcpPro",
    name: "MCP & AI Agent Pro",
    priceUsd: 49,
    priceInr: 4199,
    tag: "High Intent",
    desc: "Priority recommendation inside npx devshelf-mcp AI sessions (Claude Code, Cursor, Windsurf).",
  },
  {
    id: "starter",
    name: "Starter Backer",
    priceUsd: 9,
    priceInr: 749,
    tag: "Founding Backer",
    desc: "Permanent verified backer status on the Wall of Patrons + catalog dossier backlink.",
  },
];

export default function DevShelfPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [quickFilter, setQuickFilter] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(36);
  
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
  const [selectedPackageId, setSelectedPackageId] = useState("categoryTakeover");
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
      if (e.key === "Escape") {
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

  // Filtered resources
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return allResources.filter((r) => {
      if (selectedCategory !== "All" && r.category !== selectedCategory) {
        return false;
      }

      if (quickFilter === "featured" && !r.featured) return false;
      if (quickFilter === "alternatives" && !r.alternativeTo) return false;
      if (quickFilter === "docker" && !r.dockerCompose) return false;
      if (quickFilter === "no-card" && !r.statusTags?.some((t) => t.toLowerCase().includes("no card"))) return false;
      if (quickFilter === "ai" && !(r.type === "ai" || r.category?.toLowerCase().includes("ai") || r.category?.toLowerCase().includes("mcp"))) return false;

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
            description: "Discover 565+ verified open-source developer tools, free APIs, AI agents, and MCP servers.",
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
                  text: "DevShelf is an open-source, zero-paywall directory of 565+ verified developer tools, free APIs, AI agents, and MCP servers created and maintained by RitualDev-Lab.",
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
                The Community Directory for 565+ Open-Source Developer Tools, Free APIs &amp; MCP Servers
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
          <span>Feature Your Tool ($39)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
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
                  Instant activation across 565+ web dossiers &amp; npx devshelf-mcp AI sessions.
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

    </div>
  );
}
