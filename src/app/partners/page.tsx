"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Check,
  Shield,
  ArrowRight,
  Award,
  Terminal,
  CheckCircle2,
  Lock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { buildPartnerCheckoutUrl } from "@/lib/checkout-urls.js";

function PartnerOrderSuccessBanner() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  const orderId = searchParams.get("id");
  const tier = searchParams.get("tier");

  if (!isSuccess) return null;

  return (
    <div className="p-6 rounded-3xl bg-emerald-950/40 border border-emerald-500/40 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4" />
          <span>Spotlight Reservation Confirmed • Reference {orderId || "Registered"}</span>
        </div>
        <h2 className="text-lg font-bold text-white">
          Your DevShelf Launch Placement Is Queued ({tier === "leader_49" ? "Category Leader $49" : tier === "starter_9" ? "Starter $9" : "Launch Spotlight $19"})
        </h2>
        <p className="text-xs text-slate-300 font-mono">
          We run our automated Zero-Paywall check and publish featured cards within 24 hours across{" "}
          <code className="text-emerald-300">ritualdev.in/devshelf</code> and <code className="text-emerald-300">devshelf.ritualdev.in</code>.
        </p>
      </div>
    </div>
  );
}

export default function PartnersPage() {
  const [selectedTier, setSelectedTier] = useState<"starter_9" | "spotlight_19" | "leader_49">("spotlight_19");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "databases" | "ai" | "devops">("all");
  const [toolName, setToolName] = useState("");
  const [toolUrl, setToolUrl] = useState("");
  const [category, setCategory] = useState("ai");
  const [contactEmail, setContactEmail] = useState("");
  const [tagline, setTagline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const partnerTiers: {
    id: "starter_9" | "spotlight_19" | "leader_49";
    name: string;
    price: string;
    period: string;
    desc: string;
    badge: string;
    color: string;
    features: string[];
    ctaText: string;
    popular: boolean;
  }[] = [
    {
      id: "starter_9",
      name: "Indie Directory Listing",
      price: "$9",
      period: "one-time",
      desc: "Permanent verified placement for open-source developer tools, CLIs, APIs, and solo maker projects.",
      badge: "Starter • $9",
      color: "border-sky-500/30 text-sky-400",
      features: [
        "Fast-track editorial listing on DevShelf Web & CLI (npx devshelf)",
        "Do-follow backlink to your homepage or GitHub repository",
        "Official 'Verified Zero-Paywall' SVG badge for your README",
        "Programmatic indexing in /api/v1/registry/tools.json",
        "24-hour review & automated link health monitoring",
      ],
      ctaText: "Select Starter ($9)",
      popular: false,
    },
    {
      id: "spotlight_19",
      name: "Launch Spotlight + Digest",
      price: "$19",
      period: "30-day boost",
      desc: "Built for Product Hunt, Show HN, and indie SaaS launches wanting featured visibility and a clean developer backlink.",
      badge: "PH / Show HN Boost",
      color: "border-emerald-500/30 text-emerald-400",
      features: [
        "30-day Featured card pin in your target DevShelf category",
        "Custom promotional FAQs & highlighted CTA on your /devshelf/[slug] page",
        "Dedicated shoutout in RSS/Atom feed (/feed.xml) & Developer Digest",
        "Indexed in DevShelf programmatic SEO dossier + comparison pages",
        "Verified Free Tier badge + zero-paywall audit check included",
        "Instant self-serve checkout (Cards, Apple Pay, Google Pay, UPI)",
      ],
      ctaText: "Select Launch Spotlight ($19)",
      popular: true,
    },
    {
      id: "leader_49",
      name: "Category Leader + MCP Pin",
      price: "$49",
      period: "per month",
      desc: "Top-ranked recommendation across DevShelf directory pages and AI coding assistants via npx devshelf-mcp.",
      badge: "AI Agent Pin",
      color: "border-purple-500/30 text-purple-400",
      features: [
        "#1 pinned slot at the top of your category shelf",
        "Priority placement inside npx devshelf-mcp & SkillPrism discovery",
        "Custom promotional FAQs, Quick Install spotlight banner & CTA",
        "Verified MCP server schema check & README Security badge",
        "Featured header highlight card on DevShelf homepage & CLI",
        "Cancel anytime with zero lock-in",
      ],
      ctaText: "Select Category Leader ($49/mo)",
      popular: false,
    },
  ];

  const openCategoryPlacements = [
    {
      name: "AI Tools, Agents & MCP Servers",
      category: "ai",
      tier: "$19 Boost / $49 Leader",
      badge: "Open for Launches",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      desc: "Spotlight your AI developer tool, coding assistant plugin, or MCP server in front of Claude Code, Cursor, and Windsurf builders.",
      targetTech: "MCP Servers, Local LLMs, Eval & Agent SDKs",
      targetTier: "spotlight_19" as const,
      previewMcp: "npx -y @your-org/mcp-server",
    },
    {
      name: "Managed Databases & Storage",
      category: "databases",
      tier: "$19 Boost / $49 Leader",
      badge: "Open for Launches",
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      desc: "Featured visibility across self-hosted database alternatives, Postgres providers, and serverless storage tools.",
      targetTech: "Postgres, SQLite, Vector Stores, BaaS",
      targetTier: "leader_49" as const,
      previewMcp: "npx -y @your-db/cli",
    },
    {
      name: "DevOps, CLI & Cloud Platforms",
      category: "devops",
      tier: "$9 Starter / $19 Boost",
      badge: "Open for Launches",
      badgeColor: "text-sky-400 bg-sky-500/10 border-sky-500/30",
      desc: "Reach terminal-first developers browsing CLI tools, API clients, and self-hostable Heroku/Datadog alternatives.",
      targetTech: "CLI Utilities, Hosting, Observability, QA",
      targetTier: "starter_9" as const,
      previewMcp: "npx -y @your-platform/cli",
    },
  ];

  const filteredPlacements =
    selectedCategory === "all"
      ? openCategoryPlacements
      : openCategoryPlacements.filter((p) => p.category === selectedCategory);

  const selectTierAndScroll = (tierId: "starter_9" | "spotlight_19" | "leader_49") => {
    setSelectedTier(tierId);
    const el = document.getElementById("reserve-spotlight");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSponsorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim() || !toolName.trim() || !toolUrl.trim()) {
      setErrorMsg("Please provide your tool name, tool/repo URL, and contact email.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const orderId = `SPONSOR-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      try {
        const res = await fetch("/api/partner-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toolName,
            toolUrl,
            category,
            contactEmail,
            tier: selectedTier,
            tagline,
            orderId,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.checkoutUrl) {
            window.location.href = data.checkoutUrl;
            return;
          }
        }
      } catch (_) {
        // Fallback if API route unreachable
      }

      const checkoutUrl = buildPartnerCheckoutUrl({
        orderId,
        tier: selectedTier,
        toolName,
        toolUrl,
        category,
        contactEmail,
      });
      window.location.href = checkoutUrl;
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to initiate checkout. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto space-y-16">
        <Suspense fallback={null}>
          <PartnerOrderSuccessBanner />
        </Suspense>

        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-mono uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> DevShelf Indie Spotlights ($9 – $49)
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Spotlight Your Tool or Launch on DevShelf
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Transparent, indie-maker pricing designed for Product Hunt launches, Show HN projects, open-source maintainers, and MCP tools — no $500/mo agency markups.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/api/v1/registry/tools.json"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 bg-slate-900/80 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-600 transition"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              Machine-Readable API: /api/v1/registry/tools.json
            </Link>
            <a
              href="https://devshelf.ritualdev.in/sponsors.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 bg-slate-900/80 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-600 transition"
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
              DevShelf Wall of Love &amp; Leaderboard
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Indie Pricing Cards ($9 - $49) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partnerTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 flex flex-col justify-between transition-all duration-300 ${
                selectedTier === tier.id
                  ? "bg-slate-900/95 border-emerald-400 shadow-2xl shadow-emerald-500/15"
                  : tier.popular
                  ? "bg-slate-900/80 border-emerald-500/40"
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
                  Best Value for Launches
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2 gap-2">
                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded border shrink-0 ${tier.color}`}>
                      {tier.badge}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{tier.desc}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                  <span className="text-slate-400 text-sm font-medium">/ {tier.period}</span>
                </div>

                <div className="border-t border-slate-800 pt-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                    Included Deliverables
                  </p>
                  <ul className="space-y-2.5">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => selectTierAndScroll(tier.id)}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition ${
                    selectedTier === tier.id || tier.popular
                      ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                      : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                >
                  <span>{selectedTier === tier.id ? "✓ Selected Below" : tier.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reservation Form */}
        <section id="reserve-spotlight" className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 max-w-4xl mx-auto space-y-6">
          <div>
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1 font-bold">
              Fast-Track Placement Reservation
            </div>
            <h2 className="text-2xl font-bold text-white">
              Submit Your Tool for DevShelf Spotlight
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Must provide a genuine free tier or open-source core (Zero-Paywall rule). Instant refund if your submission doesn&apos;t pass review.
            </p>
          </div>

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSponsorSubmit} className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Tool / Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TracePilot, PostHog, RowSafe"
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Tool Website or GitHub Repo URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/org/tool or https://mytool.dev"
                  value={toolUrl}
                  onChange={(e) => setToolUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Contact Email *</label>
                <input
                  type="email"
                  required
                  placeholder="maker@mytool.dev"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Target Category Shelf</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="ai">AI Tools, Agents &amp; MCP Servers</option>
                  <option value="cli">CLI &amp; Developer Productivity</option>
                  <option value="apis">Free Public APIs</option>
                  <option value="cloud">Cloud &amp; Databases</option>
                  <option value="testing">Testing, Analytics &amp; QA</option>
                  <option value="boilerplates">Starter Kits &amp; Boilerplates</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold">One-Line Pitch / Free Tier Summary (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Open-source Postman alternative with local Git sync — 100% free forever"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
              <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  Selected Tier:{" "}
                  <b>
                    {selectedTier === "starter_9"
                      ? "$9 (Indie Directory Listing)"
                      : selectedTier === "leader_49"
                      ? "$49/mo (Category Leader + MCP Pin)"
                      : "$19 (Launch Spotlight + Digest)"}
                  </b>
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                <span>
                  {isSubmitting
                    ? "Redirecting..."
                    : `Reserve Placement (${
                        selectedTier === "starter_9"
                          ? "$9"
                          : selectedTier === "leader_49"
                          ? "$49/mo"
                          : "$19"
                      })`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </section>

        {/* Open Category Placements Showcase */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Available Category Slots</h2>
              <p className="text-slate-400 text-sm">Affordable spotlight positions across core developer workflows</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "ai", "databases", "devops"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition ${
                    selectedCategory === cat
                      ? "bg-slate-700 text-white font-semibold"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPlacements.map((p) => (
              <div key={p.name} className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between space-y-4 hover:border-slate-700 transition">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{p.tier}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{p.name}</h3>
                    <p className="text-xs text-sky-400 font-mono mt-0.5">Target: {p.targetTech}</p>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
                  <div className="pt-1">
                    <div className="text-[11px] text-slate-500 font-mono mb-1">PREVIEW INTEGRATION:</div>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-xs font-mono text-slate-400">
                      {p.previewMcp}
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => selectTierAndScroll(p.targetTier)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-bold transition"
                  >
                    <span>Book This Slot ({p.tier.split(" / ")[0]})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zero-Paywall Editorial Standard */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 sm:p-10 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" /> Editorial Standard
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Zero-Paywall Verification Standard
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Spotlight sponsorship never buys a pass around quality audits. Every promoted tool must provide a genuinely useful permanent free tier or MIT/Apache open-source release.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/80 font-mono text-xs text-slate-300 space-y-2">
              <div className="text-emerald-400 font-bold pb-1 border-b border-slate-800">
                DEVSHELF PARTNER PROMISE
              </div>
              <p>✓ Listed within 24 hours across DevShelf Web &amp; CLI</p>
              <p>✓ Full transparency — sponsored placements clearly labeled</p>
              <p>✓ 100% refund if submission fails Zero-Paywall verification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
