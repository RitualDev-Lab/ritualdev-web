/**
 * Advanced Multi-Technique Search & Auto-Categorization Engine for DevShelf
 * 
 * Techniques included:
 * 1. Word-by-word tokenized search with multi-field matching
 * 2. Fuzzy Levenshtein typo-tolerance for misspellings (e.g. 'dockr' -> 'docker', 'posgres' -> 'postgres')
 * 3. Word stemming & inflection normalization (plurals, -ing, -ed, -er, -ers)
 * 4. Technical synonym & acronym expansion (k8s <-> kubernetes, db <-> database, ai <-> llm)
 * 5. Power syntax operators: `cat:`, `lang:`, `alt:`, `tag:`, `is:docker`, `is:featured`, `is:free`, `-exclude`, `"exact phrase"`
 * 6. Intent & Auto-Categorization detection for queries and tools
 * 7. Relevance scoring with exact & prefix boosts
 * 8. Safe keyword highlighting parser for React rendering
 */

export interface Resource {
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
  freeTierCost?: string;
  cors?: string;
  rateLimit?: string;
  goodFirstIssues?: string;
  platform?: string;
}

// ─── 1. Technical Synonym & Acronym Dictionary ─────────────────────────────
export const SYNONYMS: Record<string, string[]> = {
  k8s: ["kubernetes"],
  kubernetes: ["k8s"],
  db: ["database", "sql"],
  database: ["db", "sql", "storage"],
  postgres: ["postgresql", "psql", "sql"],
  postgresql: ["postgres", "psql", "sql"],
  mongo: ["mongodb", "nosql"],
  mongodb: ["mongo", "nosql"],
  sqlite: ["embedded", "sql", "database"],
  redis: ["cache", "key-value", "in-memory"],
  ai: ["llm", "agent", "gpt", "claude", "machine learning", "artificial intelligence", "mcp"],
  llm: ["ai", "gpt", "claude", "large language model", "inference", "ollama"],
  agent: ["ai", "autonomous", "mcp", "workflow"],
  mcp: ["model context protocol", "agent", "claude", "cursor"],
  cli: ["terminal", "command line", "console", "shell", "tui"],
  terminal: ["cli", "console", "shell", "tui", "bash", "zsh"],
  shell: ["terminal", "bash", "zsh", "fish", "cli"],
  tui: ["terminal ui", "cli", "console"],
  docker: ["container", "compose", "podman", "self-host", "selfhosted"],
  container: ["docker", "podman", "kubernetes", "k8s"],
  test: ["testing", "qa", "mock", "e2e", "benchmark", "validation"],
  testing: ["test", "qa", "mock", "e2e", "benchmark"],
  qa: ["test", "testing", "quality assurance", "e2e"],
  e2e: ["end-to-end", "browser testing", "playwright", "cypress"],
  mock: ["mocking", "sandbox", "fake", "stub"],
  auth: ["authentication", "oauth", "jwt", "login", "identity", "sso"],
  authentication: ["auth", "oauth", "jwt", "identity"],
  sec: ["security", "vulnerability", "scanner", "cve", "firewall"],
  security: ["sec", "vulnerability", "scanner", "audit", "protection", "shield"],
  api: ["rest", "graphql", "grpc", "endpoint", "http", "curl"],
  rest: ["api", "http", "endpoint", "crud"],
  seo: ["search engine optimization", "optimizer", "ranking", "meta"],
  perf: ["performance", "benchmark", "speed", "load test"],
  paas: ["cloud", "hosting", "deploy", "serverless"],
  baas: ["backend", "database", "supabase", "pocketbase"],
};

// ─── 2. Category Taxonomy for Auto-Categorization ───────────────────────────
export interface CategoryTaxonomy {
  id: string;
  name: string;
  shelfCategory: string;
  keywords: string[];
  weight: number;
}

export const CATEGORY_TAXONOMY: CategoryTaxonomy[] = [
  {
    id: "ai-mcp",
    name: "AI & MCP Servers",
    shelfCategory: "AI Agents & MCP Servers",
    keywords: [
      "ai", "llm", "agent", "gpt", "claude", "mcp", "model context protocol",
      "inference", "ollama", "vllm", "localai", "prompt", "autonomous", "rag",
      "vector", "embeddings", "langchain", "crewai", "transformer", "genai", "copilot"
    ],
    weight: 1.2,
  },
  {
    id: "database",
    name: "Databases & SQL",
    shelfCategory: "Database & SQL",
    keywords: [
      "database", "db", "sql", "postgres", "postgresql", "sqlite", "mysql", "redis",
      "mongodb", "baas", "orm", "prisma", "drizzle", "migration", "query", "duckdb",
      "vector database", "surrealdb", "nosql", "supabase", "clickhouse"
    ],
    weight: 1.1,
  },
  {
    id: "devops-containers",
    name: "DevOps & Containers",
    shelfCategory: "DevOps & Containers",
    keywords: [
      "docker", "container", "kubernetes", "k8s", "compose", "podman", "helm",
      "ci", "cd", "pipeline", "deploy", "terraform", "ansible", "self-host",
      "selfhosted", "nginx", "caddy", "traefik", "reverse proxy", "devops", "cloud"
    ],
    weight: 1.1,
  },
  {
    id: "cli-terminal",
    name: "CLI Tools & Terminal",
    shelfCategory: "Terminal & Shell",
    keywords: [
      "cli", "terminal", "shell", "bash", "zsh", "fish", "tui", "command-line",
      "console", "prompt", "tmux", "git", "diff", "ssh", "repl", "keyboard",
      "developer productivity", "utility"
    ],
    weight: 1.0,
  },
  {
    id: "testing-qa",
    name: "Testing & QA",
    shelfCategory: "Browser & E2E Testing",
    keywords: [
      "test", "testing", "qa", "e2e", "browser testing", "playwright", "cypress",
      "mock", "mocking", "sandbox", "load test", "benchmark", "k6", "artillery",
      "unit test", "integration test", "schema", "assert", "coverage"
    ],
    weight: 1.1,
  },
  {
    id: "api-network",
    name: "API & Network Tools",
    shelfCategory: "API Testing & Debugging",
    keywords: [
      "api", "rest", "graphql", "grpc", "http", "curl", "postman", "hoppscotch",
      "bruno", "webhook", "proxy", "tunnel", "ngrok", "packet", "websocket"
    ],
    weight: 1.0,
  },
  {
    id: "security-auth",
    name: "Security & Authentication",
    shelfCategory: "Authentication & Security",
    keywords: [
      "security", "auth", "authentication", "oauth", "jwt", "identity", "sso",
      "vulnerability", "scanner", "cve", "firewall", "encryption", "audit",
      "secret", "token", "shield", "dpdp", "privacy", "zero telemetry"
    ],
    weight: 1.1,
  },
  {
    id: "cloud-paas",
    name: "Cloud Hosting & PaaS",
    shelfCategory: "Cloud Hosting & PaaS",
    keywords: [
      "cloud", "hosting", "paas", "serverless", "edge", "deploy", "free tier",
      "cloudflare", "vercel", "netlify", "fly.io", "render", "railway"
    ],
    weight: 1.0,
  },
];

// ─── 3. Levenshtein Distance for Typo-Tolerance ─────────────────────────────
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const row = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    let prev = i;
    for (let j = 1; j <= b.length; j++) {
      const val = a[i - 1] === b[j - 1] ? row[j - 1] : Math.min(row[j - 1], prev, row[j]) + 1;
      row[j - 1] = prev;
      prev = val;
    }
    row[b.length] = prev;
  }

  return row[b.length];
}

// ─── 4. Word Stemmer & Normalization ─────────────────────────────────────────
export function stemWord(word: string): string {
  const w = word.toLowerCase().trim();
  if (w.length <= 3) return w;

  // Common endings removal
  if (w.endsWith("ies") && w.length > 5) return w.slice(0, -3) + "y";
  if (w.endsWith("bases")) return w.slice(0, -1); // databases -> database
  if (w.endsWith("ses") && w.length > 5) return w.slice(0, -1);
  if (w.endsWith("es") && w.length > 4) {
    if (w.endsWith("ches") || w.endsWith("shes") || w.endsWith("xes")) return w.slice(0, -2);
    return w.slice(0, -1); // caches -> cache, proxies -> proxy
  }
  if (w.endsWith("s") && !w.endsWith("ss") && w.length > 3) return w.slice(0, -1);
  if (w.endsWith("ing") && w.length > 5) return w.slice(0, -3);
  if (w.endsWith("ers") && w.length > 5) return w.slice(0, -3);
  if (w.endsWith("er") && w.length > 4) return w.slice(0, -2);
  if (w.endsWith("ed") && w.length > 4) return w.slice(0, -2);

  return w;
}

// ─── 5. Query Parser & Power Syntax Extraction ──────────────────────────────
export interface ParsedQuery {
  raw: string;
  tokens: string[];
  exactPhrases: string[];
  negations: string[];
  categoryFilter?: string;
  languageFilter?: string;
  alternativeFilter?: string;
  tagFilter?: string;
  isDocker?: boolean;
  isFeatured?: boolean;
  isFree?: boolean;
  hasCard?: boolean;
}

export function parseSearchQuery(query: string): ParsedQuery {
  const raw = (query || "").trim();
  if (!raw) {
    return { raw: "", tokens: [], exactPhrases: [], negations: [] };
  }

  const exactPhrases: string[] = [];
  let working = raw;

  // Extract quoted exact phrases: "like this"
  const phraseRegex = /"([^"]+)"|'([^']+)'/g;
  let match: RegExpExecArray | null;
  while ((match = phraseRegex.exec(raw)) !== null) {
    const phrase = (match[1] || match[2] || "").trim().toLowerCase();
    if (phrase) {
      exactPhrases.push(phrase);
    }
  }
  working = working.replace(phraseRegex, " ");

  const parts = working.split(/\s+/).filter(Boolean);
  const tokens: string[] = [];
  const negations: string[] = [];
  let categoryFilter: string | undefined;
  let languageFilter: string | undefined;
  let alternativeFilter: string | undefined;
  let tagFilter: string | undefined;
  let isDocker: boolean | undefined;
  let isFeatured: boolean | undefined;
  let isFree: boolean | undefined;
  let hasCard: boolean | undefined;

  for (const part of parts) {
    const pLower = part.toLowerCase();

    // Negations: -exclude
    if (pLower.startsWith("-") && pLower.length > 1) {
      negations.push(pLower.slice(1));
      continue;
    }

    // Power operators
    if (pLower.startsWith("cat:") || pLower.startsWith("category:")) {
      categoryFilter = pLower.split(":")[1];
      continue;
    }
    if (pLower.startsWith("lang:") || pLower.startsWith("language:")) {
      languageFilter = pLower.split(":")[1];
      continue;
    }
    if (pLower.startsWith("alt:") || pLower.startsWith("alternative:")) {
      alternativeFilter = pLower.split(":")[1];
      continue;
    }
    if (pLower.startsWith("tag:")) {
      tagFilter = pLower.split(":")[1];
      continue;
    }

    if (pLower === "is:docker" || pLower === "docker:true") {
      isDocker = true;
      continue;
    }
    if (pLower === "is:featured" || pLower === "featured:true") {
      isFeatured = true;
      continue;
    }
    if (pLower === "is:free" || pLower === "is:zero-paywall" || pLower === "is:nocard") {
      isFree = true;
      continue;
    }

    // Normal keyword token
    // Strip trailing punctuation like commas, colons
    const cleanToken = pLower.replace(/^[^\w]+|[^\w]+$/g, "");
    if (cleanToken) {
      tokens.push(cleanToken);
    }
  }

  return {
    raw,
    tokens,
    exactPhrases,
    negations,
    categoryFilter,
    languageFilter,
    alternativeFilter,
    tagFilter,
    isDocker,
    isFeatured,
    isFree,
    hasCard,
  };
}

// ─── 6. Auto-Categorize Query & Intent Detection ────────────────────────────
export interface AutoCategoryDetection {
  detectedCategory: string;
  matchedTaxonomyId: string;
  confidence: number;
  explanation: string;
  suggestedTags: string[];
}

export function autoCategorizeQuery(query: string, availableCategories: string[]): AutoCategoryDetection | null {
  const parsed = parseSearchQuery(query);
  if (!parsed.raw && parsed.tokens.length === 0) return null;

  const queryTerms = [...parsed.tokens, ...parsed.exactPhrases];
  const expandedTerms = new Set<string>();

  queryTerms.forEach((term) => {
    expandedTerms.add(term);
    expandedTerms.add(stemWord(term));
    const syns = SYNONYMS[term] || [];
    syns.forEach((s) => expandedTerms.add(s));
  });

  let bestTaxonomy: CategoryTaxonomy | null = null;
  let highestScore = 0;
  let topKeyword = "";

  for (const tax of CATEGORY_TAXONOMY) {
    let score = 0;
    for (const kw of tax.keywords) {
      const kwStemmed = stemWord(kw);
      if (expandedTerms.has(kw) || expandedTerms.has(kwStemmed)) {
        score += 2.0 * tax.weight;
        topKeyword = kw;
      } else {
        // Partial or word-level hit
        for (const term of expandedTerms) {
          if (term.length >= 3 && (kw.includes(term) || term.includes(kw))) {
            score += 1.0 * tax.weight;
            topKeyword = kw;
          }
        }
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestTaxonomy = tax;
    }
  }

  if (!bestTaxonomy || highestScore < 1.0) {
    return null;
  }

  // Find the closest real category in availableCategories
  let matchedCategory = bestTaxonomy.shelfCategory;
  const directMatch = availableCategories.find(
    (c) => c.toLowerCase() === bestTaxonomy!.shelfCategory.toLowerCase()
  );
  if (directMatch) {
    matchedCategory = directMatch;
  } else {
    // Substring match
    const subMatch = availableCategories.find((c) =>
      c.toLowerCase().includes(bestTaxonomy!.id) ||
      bestTaxonomy!.keywords.some((kw) => c.toLowerCase().includes(kw))
    );
    if (subMatch) matchedCategory = subMatch;
  }

  const confidence = Math.min(98, Math.round((highestScore / 6) * 100));

  return {
    detectedCategory: matchedCategory,
    matchedTaxonomyId: bestTaxonomy.id,
    confidence,
    explanation: `Query indicates intent for ${bestTaxonomy.name} (matched "${topKeyword}")`,
    suggestedTags: bestTaxonomy.keywords.slice(0, 3),
  };
}

// ─── 7. Auto-Categorize Tool Utility ────────────────────────────────────────
export function autoCategorizeTool(tool: Partial<Resource>, categoriesList: string[]): {
  recommendedCategory: string;
  confidence: number;
  reason: string;
  suggestedTags: string[];
} {
  const combined = [
    tool.name,
    tool.description,
    tool.alternativeTo,
    tool.language,
    tool.repo,
    ...(tool.statusTags || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const detection = autoCategorizeQuery(combined, categoriesList);
  if (detection) {
    return {
      recommendedCategory: detection.detectedCategory,
      confidence: detection.confidence,
      reason: detection.explanation,
      suggestedTags: detection.suggestedTags,
    };
  }

  return {
    recommendedCategory: "Developer Tools",
    confidence: 50,
    reason: "Default fallback based on general utility profile",
    suggestedTags: ["developer-tools", "open-source"],
  };
}

// ─── 8. Word-by-Word Matching & Scoring Engine ──────────────────────────────
export interface ScoredResource {
  tool: Resource;
  score: number;
  matchedTokens: string[];
  isFuzzyMatch: boolean;
}

export function searchResources(
  resources: Resource[],
  query: string,
  options: {
    selectedCategory?: string;
    quickFilter?: string;
    enableFuzzy?: boolean;
  } = {}
): {
  results: Resource[];
  totalMatches: number;
  crossCategoryCount: number;
  detectedCategory: AutoCategoryDetection | null;
  scoredResults: ScoredResource[];
  availableCategoriesInResults: Array<{ name: string; count: number }>;
} {
  const parsed = parseSearchQuery(query);
  const selectedCategory = options.selectedCategory || "All";
  const quickFilter = options.quickFilter || "all";
  const enableFuzzy = options.enableFuzzy !== false;

  // Get list of categories for intent detection
  const allCategoryNames = Array.from(new Set(resources.map((r) => r.category).filter(Boolean))) as string[];
  const detectedCategory = parsed.raw ? autoCategorizeQuery(parsed.raw, allCategoryNames) : null;

  // Base filter if no query tokens
  if (!parsed.raw && parsed.tokens.length === 0 && parsed.exactPhrases.length === 0) {
    const base = resources.filter((r) => {
      if (selectedCategory !== "All" && r.category !== selectedCategory) return false;
      if (quickFilter === "featured" && !r.featured) return false;
      if (quickFilter === "alternatives" && !r.alternativeTo) return false;
      if (quickFilter === "docker" && !r.dockerCompose) return false;
      if (quickFilter === "no-card" && !r.statusTags?.some((t) => t.toLowerCase().includes("no card"))) return false;
      if (quickFilter === "ai" && !(r.type === "ai" || r.category?.toLowerCase().includes("ai") || r.category?.toLowerCase().includes("mcp"))) return false;
      return true;
    });

    return {
      results: base,
      totalMatches: base.length,
      crossCategoryCount: 0,
      detectedCategory: null,
      scoredResults: base.map((tool) => ({ tool, score: 0, matchedTokens: [], isFuzzyMatch: false })),
      availableCategoriesInResults: [],
    };
  }

  // Build expanded token set with synonyms, stemmed forms, and typo-tolerant synonym keys
  const tokenMatchers = parsed.tokens.map((token) => {
    const stemmed = stemWord(token);
    const syns = new Set<string>(SYNONYMS[token] || []);

    // Also check if token is a typo of any known synonym key (distance <= 1)
    if (token.length >= 4) {
      for (const [key, val] of Object.entries(SYNONYMS)) {
        if (levenshteinDistance(token, key) <= 1) {
          syns.add(key);
          val.forEach((v) => syns.add(v));
        }
      }
    }

    const synList = Array.from(syns);
    return {
      original: token,
      stemmed,
      synonyms: synList,
      allVariations: [token, stemmed, ...synList],
    };
  });

  // Evaluate candidate matching across all resources
  const scoredAll: ScoredResource[] = [];

  for (const tool of resources) {
    const nameLower = (tool.name || "").toLowerCase();
    const descLower = (tool.description || "").toLowerCase();
    const catLower = (tool.category || "").toLowerCase();
    const altLower = (tool.alternativeTo || "").toLowerCase();
    const langLower = (tool.language || "").toLowerCase();
    const tagsLower = (tool.statusTags || []).map((t) => t.toLowerCase());
    const repoLower = (tool.repo || "").toLowerCase();

    // Check Negations
    if (parsed.negations.length > 0) {
      const combined = `${nameLower} ${descLower} ${catLower} ${altLower} ${langLower} ${tagsLower.join(" ")}`;
      const hasNegation = parsed.negations.some((neg) => combined.includes(neg));
      if (hasNegation) continue;
    }

    // Check Operator Filters
    if (parsed.categoryFilter && !catLower.includes(parsed.categoryFilter)) continue;
    if (parsed.languageFilter && !langLower.includes(parsed.languageFilter)) continue;
    if (parsed.alternativeFilter && !altLower.includes(parsed.alternativeFilter)) continue;
    if (parsed.tagFilter && !tagsLower.some((t) => t.includes(parsed.tagFilter!))) continue;
    if (parsed.isDocker && !tool.dockerCompose) continue;
    if (parsed.isFeatured && !tool.featured) continue;
    if (parsed.isFree && !tagsLower.some((t) => t.includes("no card") || t.includes("free") || t.includes("zero-paywall"))) continue;

    // Check Exact Phrases
    if (parsed.exactPhrases.length > 0) {
      const fullText = `${nameLower} ${descLower} ${altLower}`;
      const allPhrasesMatch = parsed.exactPhrases.every((p) => fullText.includes(p));
      if (!allPhrasesMatch) continue;
    }

    // Check Word-by-Word Tokens
    let toolMatchedTokens: string[] = [];
    let isFuzzy = false;
    let tokenMatchScore = 0;
    let allTokensMatched = true;

    for (const matcher of tokenMatchers) {
      let tokenFound = false;

      // 1. Direct or stem match in Name
      if (nameLower.includes(matcher.original)) {
        tokenFound = true;
        tokenMatchScore += 100;
        toolMatchedTokens.push(matcher.original);
      } else if (nameLower.includes(matcher.stemmed)) {
        tokenFound = true;
        tokenMatchScore += 70;
        toolMatchedTokens.push(matcher.stemmed);
      } else if (matcher.synonyms.some((s) => nameLower.includes(s))) {
        tokenFound = true;
        tokenMatchScore += 60;
        toolMatchedTokens.push(matcher.original);
      }

      // 2. AlternativeTo match
      if (altLower.includes(matcher.original)) {
        tokenFound = true;
        tokenMatchScore += 80;
        toolMatchedTokens.push(matcher.original);
      }

      // 3. Category match
      if (catLower.includes(matcher.original) || catLower.includes(matcher.stemmed)) {
        tokenFound = true;
        tokenMatchScore += 40;
        toolMatchedTokens.push(matcher.original);
      }

      // 4. Description match
      if (descLower.includes(matcher.original)) {
        tokenFound = true;
        tokenMatchScore += 30;
        toolMatchedTokens.push(matcher.original);
      } else if (descLower.includes(matcher.stemmed)) {
        tokenFound = true;
        tokenMatchScore += 20;
        toolMatchedTokens.push(matcher.stemmed);
      } else if (matcher.synonyms.some((s) => descLower.includes(s))) {
        tokenFound = true;
        tokenMatchScore += 20;
        toolMatchedTokens.push(matcher.original);
      }

      // 5. Tags & Repo match
      if (tagsLower.some((t) => t.includes(matcher.original) || t.includes(matcher.stemmed))) {
        tokenFound = true;
        tokenMatchScore += 25;
        toolMatchedTokens.push(matcher.original);
      }
      if (repoLower.includes(matcher.original)) {
        tokenFound = true;
        tokenMatchScore += 15;
      }

      // 6. Typo-Tolerance / Fuzzy Match fallback if not yet matched
      if (!tokenFound && enableFuzzy && matcher.original.length >= 4) {
        // Compare with words in tool name
        const nameWords = nameLower.split(/[\s\-_\/]+/).filter(Boolean);
        for (const nw of nameWords) {
          const maxDist = matcher.original.length <= 6 ? 1 : 2;
          const dist = levenshteinDistance(matcher.original, nw);
          if (dist <= maxDist) {
            tokenFound = true;
            isFuzzy = true;
            tokenMatchScore += 35 - dist * 10;
            toolMatchedTokens.push(nw);
            break;
          }
        }

        // Compare with category words if still not found
        if (!tokenFound) {
          const catWords = catLower.split(/[\s\-_\/]+/).filter(Boolean);
          for (const cw of catWords) {
            const dist = levenshteinDistance(matcher.original, cw);
            if (dist <= 1) {
              tokenFound = true;
              isFuzzy = true;
              tokenMatchScore += 20;
              toolMatchedTokens.push(cw);
              break;
            }
          }
        }

        // Compare with description words if still not found
        if (!tokenFound) {
          const descWords = descLower.split(/[\s\-_\/]+/).filter((w) => w.length >= 4);
          for (const dw of descWords) {
            const maxDist = matcher.original.length <= 6 ? 1 : 2;
            const dist = levenshteinDistance(matcher.original, dw);
            if (dist <= maxDist) {
              tokenFound = true;
              isFuzzy = true;
              tokenMatchScore += 18 - dist * 5;
              toolMatchedTokens.push(dw);
              break;
            }
          }
        }
      }

      if (!tokenFound) {
        allTokensMatched = false;
        break;
      }
    }

    if (!allTokensMatched && tokenMatchers.length > 0) {
      continue;
    }

    // Additional relevance scoring boosts
    let finalScore = tokenMatchScore;
    const rawLower = parsed.raw.toLowerCase();

    // Exact name match boost
    if (nameLower === rawLower) {
      finalScore += 300;
    } else if (nameLower.startsWith(rawLower)) {
      finalScore += 160;
    } else if (nameLower.includes(rawLower)) {
      finalScore += 90;
    }

    // Featured boost
    if (tool.featured) finalScore += 15;

    // Docker Compose boost if user searched docker
    if (tool.dockerCompose && (rawLower.includes("docker") || parsed.isDocker)) {
      finalScore += 25;
    }

    scoredAll.push({
      tool,
      score: finalScore,
      matchedTokens: Array.from(new Set(toolMatchedTokens)),
      isFuzzyMatch: isFuzzy,
    });
  }

  // Sort by score descending
  scoredAll.sort((a, b) => b.score - a.score);

  // Group by category counts across all matching tools for dynamic category pills
  const categoryCounter = new Map<string, number>();
  for (const item of scoredAll) {
    const cat = item.tool.category || "Other";
    categoryCounter.set(cat, (categoryCounter.get(cat) || 0) + 1);
  }
  const availableCategoriesInResults = Array.from(categoryCounter.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Filter into current category and quick filters
  const inScope = scoredAll.filter(({ tool }) => {
    if (selectedCategory !== "All" && tool.category !== selectedCategory) return false;
    if (quickFilter === "featured" && !tool.featured) return false;
    if (quickFilter === "alternatives" && !tool.alternativeTo) return false;
    if (quickFilter === "docker" && !tool.dockerCompose) return false;
    if (quickFilter === "no-card" && !tool.statusTags?.some((t) => t.toLowerCase().includes("no card"))) return false;
    if (quickFilter === "ai" && !(tool.type === "ai" || tool.category?.toLowerCase().includes("ai") || tool.category?.toLowerCase().includes("mcp"))) return false;
    return true;
  });

  const crossCategoryCount = scoredAll.length - inScope.length;

  return {
    results: inScope.map((s) => s.tool),
    totalMatches: inScope.length,
    crossCategoryCount: crossCategoryCount > 0 ? scoredAll.length : 0,
    detectedCategory,
    scoredResults: inScope,
    availableCategoriesInResults,
  };
}

// ─── 9. Safe Highlight Tokenizer for React UI ────────────────────────────────
export interface TextChunk {
  text: string;
  isMatch: boolean;
}

export function highlightText(text: string, tokens: string[]): TextChunk[] {
  if (!text) return [];
  const cleanTokens = (tokens || [])
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t.length >= 2);

  if (cleanTokens.length === 0) {
    return [{ text, isMatch: false }];
  }

  // Escape special regex characters in tokens
  const escaped = cleanTokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");

  const parts = text.split(regex);
  const chunks: TextChunk[] = [];

  for (const part of parts) {
    if (!part) continue;
    const isMatch = cleanTokens.some((t) => part.toLowerCase() === t);
    chunks.push({ text: part, isMatch });
  }

  return chunks;
}
