import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Layers, 
  ExternalLink, 
  Star, 
  Terminal, 
  Sparkles,
  ArrowLeft,
  Check,
  Shield,
  Server,
  BookOpen,
  Boxes,
  HelpCircle,
  Globe2,
  ArrowRight
} from "lucide-react";
import rawData from "@/data/devshelf.json";
import wikidataData from "@/data/wikidata.json";
import competitorsData from "@/data/competitors.json";
import BadgeEmbedWidget from "@/components/BadgeEmbedWidget";

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

function getInstallCommand(tool: Resource): string {
  const slug = toSlug(tool.name);
  const lang = (tool.language || "").toLowerCase();

  if (lang.includes("typescript") || lang.includes("javascript") || lang.includes("node")) {
    return `npx ${slug}`;
  }
  if (lang.includes("go")) {
    const repoClean = tool.repo?.replace("https://github.com/", "") || slug;
    return `go install github.com/${repoClean}@latest`;
  }
  if (lang.includes("python")) {
    return `pip install ${slug}`;
  }
  if (lang.includes("rust")) {
    return `cargo install ${slug}`;
  }
  if (tool.repo) {
    const cleanRepo = tool.repo.startsWith("http") ? tool.repo : `https://github.com/${tool.repo}`;
    return `git clone ${cleanRepo}.git`;
  }
  return `npm install -g ${slug}`;
}

export async function generateStaticParams() {
  const resources = (rawData.resources as Resource[]) || [];
  return resources.map((tool) => ({
    slug: toSlug(tool.name),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resources = (rawData.resources as Resource[]) || [];
  const tool = resources.find((r) => toSlug(r.name) === slug);

  if (!tool) {
    return {
      title: "Tool Not Found | DevShelf",
      description: "The requested developer tool could not be found in DevShelf.",
    };
  }

  const altText = tool.alternativeTo ? ` Free open-source alternative to ${tool.alternativeTo}.` : "";
  const title = `${tool.name} - Open Source ${tool.category || "Developer Tool"} | DevShelf`;
  const description = `${tool.description || "Open-source developer utility and toolkit."}${altText} Verified specs, install command, and documentation.`;
  const canonicalUrl = `https://ritualdev.in/devshelf/${slug}/`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "RitualDev DevShelf",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resources = (rawData.resources as Resource[]) || [];
  const tool = resources.find((r) => toSlug(r.name) === slug);

  if (!tool) {
    notFound();
  }

  const installCmd = getInstallCommand(tool);
  const repoUrl = tool.repo ? (tool.repo.startsWith("http") ? tool.repo : `https://github.com/${tool.repo}`) : null;
  const pageUrl = `https://ritualdev.in/devshelf/${slug}/`;

  // Related tools in the same category
  const relatedTools = resources
    .filter((r) => r.category === tool.category && toSlug(r.name) !== slug)
    .slice(0, 3);

  // Wikidata Entity Link
  const wikiEntry = (wikidataData as Record<string, { id: string; name: string; url: string; wikipedia: string | null; description: string }>)[slug];

  // Matched Competitor Comparison
  const matchedCompetitor = competitorsData.find((comp) => {
    if (!tool.alternativeTo) return false;
    const lowerAlt = tool.alternativeTo.toLowerCase();
    const compName = comp.name.toLowerCase();
    return lowerAlt.includes(compName) || comp.slug === toSlug(tool.alternativeTo);
  });

  // Schema.org SoftwareApplication JSON-LD
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All (Linux, macOS, Windows, Docker)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    license: tool.license || "Open Source",
    url: pageUrl,
    downloadUrl: repoUrl || undefined,
    sameAs: [
      wikiEntry?.url,
      wikiEntry?.wikipedia,
      repoUrl
    ].filter(Boolean),
  };

  // Schema.org BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ritualdev.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "DevShelf",
        item: "https://ritualdev.in/devshelf/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: pageUrl,
      },
    ],
  };

  // Schema.org FAQPage JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${tool.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: tool.description || `${tool.name} is a verified developer tool in the DevShelf directory.`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${tool.name} free and open-source?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${tool.name} is licensed under ${tool.license || "an open-source license"} and features a ${tool.freeTier || "100% free / open source"} allowance without mandatory paid tiers.`,
        },
      },
      {
        "@type": "Question",
        name: `How do I install or run ${tool.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can install or run ${tool.name} using the terminal command: "${installCmd}".`,
        },
      },
      ...(tool.alternativeTo
        ? [
            {
              "@type": "Question",
              name: `What proprietary tool does ${tool.name} replace?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `${tool.name} is a verified, self-hostable open-source alternative to ${tool.alternativeTo} with zero telemetry and no vendor lock-in.`,
              },
            },
          ]
        : []),
      ...(tool.dockerCompose
        ? [
            {
              "@type": "Question",
              name: `Can I self-host ${tool.name} with Docker?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `Yes, ${tool.name} provides a pre-configured Docker Compose specification that can be launched with "docker compose up -d".`,
              },
            },
          ]
        : []),
    ],
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Structured Data: JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Navigation & Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-8 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-brand-cyan transition-colors">Home</Link>
          <span>/</span>
          <Link href="/devshelf/" className="hover:text-brand-cyan transition-colors">DevShelf</Link>
          <span>/</span>
          <span className="text-brand-cyan truncate max-w-[200px]">{tool.name}</span>
        </div>

        <Link
          href={`/devshelf/#${slug}`}
          className="text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </Link>
      </div>

      {/* Main Tool Container */}
      <article className="space-y-8">
        
        {/* Header Block */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {tool.name}
                </h1>

                {tool.featured && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/40 text-xs font-mono font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>Featured Partner</span>
                  </span>
                )}

                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/40 text-xs font-mono">
                  {tool.category || "Developer Tool"}
                </span>

                {wikiEntry && (
                  <Link
                    href={wikiEntry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/40 text-xs font-mono flex items-center gap-1 hover:bg-blue-500/20 transition-colors"
                    title={`Grounding verified with Wikidata Entity ID: ${wikiEntry.id}`}
                  >
                    <Globe2 className="w-3 h-3 text-blue-400" />
                    <span>Wikidata: {wikiEntry.id}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-blue-400/80" />
                  </Link>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                {tool.language && (
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    Language: {tool.language}
                  </span>
                )}
                {tool.license && (
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                    License: {tool.license}
                  </span>
                )}
                {tool.section && (
                  <span className="text-slate-500 hidden sm:inline">
                    • {tool.section}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {repoUrl && (
                <Link
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-500 transition-colors text-xs font-mono flex items-center gap-2"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}

              {tool.url && (
                <Link
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors text-xs font-mono flex items-center gap-2"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>

          {/* Alternative To Callout Banner */}
          {tool.alternativeTo && (
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 mb-6 space-y-2">
              <div className="flex items-start sm:items-center gap-3">
                <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
                <div className="text-xs font-mono">
                  <span className="text-purple-400 font-bold uppercase tracking-wider block sm:inline mr-2">
                    Open-Source Alternative:
                  </span>
                  <span className="text-white font-bold">
                    Replaces {tool.alternativeTo}
                  </span>
                  <span className="text-slate-400 block sm:inline sm:ml-2">
                    (Self-hostable, zero vendor lock-in, zero telemetry)
                  </span>
                </div>
              </div>

              {matchedCompetitor && (
                <div className="pt-2 border-t border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pl-8">
                  <span className="text-[11px] font-mono text-purple-200">
                    Compare full feature matrix &amp; trade-offs with {matchedCompetitor.name}
                  </span>
                  <Link
                    href={`/alternatives/${matchedCompetitor.slug}/`}
                    className="text-purple-300 hover:text-white font-mono text-[11px] font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>View {matchedCompetitor.name} Comparison Matrix</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Core Description */}
          <div className="space-y-3">
            <h2 className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-brand-cyan" />
              <span>About &amp; Core Purpose</span>
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
              {tool.description}
            </p>
          </div>

          {/* Capability Tags */}
          {tool.statusTags && tool.statusTags.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-brand-neon" />
                <span>Verified Capabilities &amp; Traits</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.statusTags.map((tag, tIdx) => (
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
        </div>

        {/* Quick Install & Run Section */}
        <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
          <h2 className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-brand-neon" />
            <span>Quick Install &amp; Execution</span>
          </h2>

          <div className="p-4 rounded-2xl bg-black/70 border border-slate-800 font-mono text-xs text-white flex items-center">
            <span className="text-brand-neon mr-2">$</span>
            <span className="flex-1">{installCmd}</span>
          </div>

          {repoUrl && (
            <div className="p-4 rounded-2xl bg-black/70 border border-slate-800 font-mono text-xs text-slate-300 flex items-center">
              <span className="text-slate-500 mr-2">$</span>
              <span className="flex-1">git clone {repoUrl}.git</span>
            </div>
          )}
        </section>

        {/* Embeddable README Badge Generator */}
        <BadgeEmbedWidget slug={slug} toolName={tool.name} />

        {/* Docker Compose Section (if present) */}
        {tool.dockerCompose && (
          <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
            <h2 className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-blue-400" />
              <span>Self-Hostable Docker Compose Recipe</span>
            </h2>

            <div className="p-4 rounded-2xl bg-black/80 border border-slate-800 overflow-x-auto">
              <pre className="text-emerald-400 font-mono text-xs leading-relaxed">
                {tool.dockerCompose}
              </pre>
            </div>
            <p className="text-xs font-mono text-slate-400">
              💡 Save as <code className="text-brand-cyan">docker-compose.yml</code> and execute <code className="text-brand-cyan">docker compose up -d</code> to run locally.
            </p>
          </section>
        )}

        {/* Specifications Matrix Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="glass-panel p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-500 block mb-1">Free Tier</span>
            <span className="text-white font-bold truncate block">
              {tool.freeTier || "100% Free / OSS"}
            </span>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-500 block mb-1">Authentication</span>
            <span className="text-white font-bold truncate block">
              {tool.auth || "No Auth Required"}
            </span>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-500 block mb-1">Self-Hostable</span>
            <span className="text-white font-bold truncate block">
              {tool.dockerCompose ? "Yes (Docker)" : "Native / CLI"}
            </span>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-500 block mb-1">License</span>
            <span className="text-white font-bold truncate block">
              {tool.license || "Open Source"}
            </span>
          </div>
        </section>

        {/* Frequently Answered Questions (SEO & AEO Grounding) */}
        <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-brand-cyan" />
            <span>Frequently Asked Questions about {tool.name}</span>
          </h2>

          <div className="space-y-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <h3 className="font-bold text-white">What is {tool.name}?</h3>
              <p className="text-slate-400 leading-relaxed">{tool.description}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <h3 className="font-bold text-white">Is {tool.name} free and open-source?</h3>
              <p className="text-slate-400 leading-relaxed">
                Yes, {tool.name} is licensed under {tool.license || "an open-source license"} and provides a {tool.freeTier || "100% free / open source"} tier.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <h3 className="font-bold text-white">How do I install or run {tool.name}?</h3>
              <p className="text-slate-400 leading-relaxed">
                You can run or install {tool.name} via: <code className="text-brand-neon bg-black/60 px-1.5 py-0.5 rounded">{installCmd}</code>.
              </p>
            </div>

            {tool.alternativeTo && (
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <h3 className="font-bold text-white">What proprietary tool does {tool.name} replace?</h3>
                <p className="text-slate-400 leading-relaxed">
                  {tool.name} is a self-hostable open-source alternative to {tool.alternativeTo} with zero telemetry and no vendor lock-in.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Related Tools in the same category */}
        {relatedTools.length > 0 && (
          <section className="pt-6 border-t border-slate-800 space-y-4">
            <h2 className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
              <Boxes className="w-3.5 h-3.5 text-purple-400" />
              <span>Other Open-Source Tools in {tool.category}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedTools.map((rel) => {
                const relSlug = toSlug(rel.name);
                return (
                  <Link
                    key={relSlug}
                    href={`/devshelf/${relSlug}/`}
                    className="glass-panel glass-panel-hover rounded-2xl p-4 border border-slate-800 block group transition-all"
                  >
                    <div className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors mb-1 truncate">
                      {rel.name}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {rel.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Footer Back link */}
        <div className="pt-6 text-center">
          <Link
            href="/devshelf/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-xs font-mono font-bold transition-colors"
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Browse All 565+ Tools in DevShelf Directory</span>
          </Link>
        </div>

      </article>
    </div>
  );
}
