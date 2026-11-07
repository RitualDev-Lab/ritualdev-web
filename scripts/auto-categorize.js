#!/usr/bin/env node

/**
 * DevShelf Auto-Categorizing Tool (CLI & Auditor)
 *
 * Usage:
 *   node scripts/auto-categorize.js --name "ToolName" --desc "Tool description..." [--tags "tag1,tag2"] [--lang "Rust"]
 *   node scripts/auto-categorize.js --audit
 *   node scripts/auto-categorize.js --suggest "PostgreSQL terminal UI"
 */

const fs = require("node:fs");
const path = require("node:path");

// Load categories from devshelf data
const dataPath = path.join(__dirname, "..", "src", "data", "devshelf.json");
const rawData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
const allResources = rawData.resources || [];
const allCategories = Array.from(new Set(allResources.map((r) => r.category).filter(Boolean)));

const CATEGORY_TAXONOMY = [
  {
    id: "ai-mcp",
    name: "AI & MCP Servers",
    shelf: "shelf/ai-tools.json",
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
    shelf: "shelf/cli-tools.json",
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
    shelf: "shelf/cli-tools.json",
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
    shelf: "shelf/cli-tools.json",
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
    shelf: "shelf/testing-qa.json",
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
    shelf: "shelf/apis.json",
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
    shelf: "shelf/free-cloud.json",
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
    shelf: "shelf/free-cloud.json",
    shelfCategory: "Cloud Hosting & PaaS",
    keywords: [
      "cloud", "hosting", "paas", "serverless", "edge", "deploy", "free tier",
      "cloudflare", "vercel", "netlify", "fly.io", "render", "railway"
    ],
    weight: 1.0,
  },
  {
    id: "boilerplates",
    name: "Boilerplates & Starters",
    shelf: "shelf/boilerplates.json",
    shelfCategory: "Full-Stack Web Starter",
    keywords: [
      "boilerplate", "starter", "template", "scaffold", "saas starter", "full-stack",
      "nextjs template", "dashboard starter"
    ],
    weight: 1.0,
  },
];

function classifyText(text) {
  const t = (text || "").toLowerCase();
  let best = null;
  let maxScore = 0;
  let matchedKw = "";

  for (const tax of CATEGORY_TAXONOMY) {
    let score = 0;
    for (const kw of tax.keywords) {
      if (t.includes(kw)) {
        score += 2.0 * tax.weight;
        matchedKw = kw;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      best = tax;
    }
  }

  if (!best || maxScore === 0) {
    return {
      category: "Developer Tools",
      shelfCategory: "Developer Tools",
      shelf: "shelf/cli-tools.json",
      confidence: 45,
      reason: "General developer utility baseline",
      suggestedTags: ["developer-tools", "open-source"],
    };
  }

  const confidence = Math.min(99, Math.round((maxScore / 6) * 100));

  return {
    category: best.name,
    shelfCategory: best.shelfCategory,
    shelf: best.shelf,
    confidence,
    reason: `Matched taxonomy keywords: "${matchedKw}"`,
    suggestedTags: best.keywords.slice(0, 4),
  };
}

// Parse args
const args = process.argv.slice(2);

if (args.includes("--audit")) {
  console.log(`\n🔍 Auditing all ${allResources.length} tools across DevShelf directory...`);
  let lowConfidence = 0;
  const categoryCounts = {};

  allResources.forEach((tool) => {
    const text = `${tool.name} ${tool.description || ""} ${tool.category || ""} ${(tool.statusTags || []).join(" ")}`;
    const result = classifyText(text);
    categoryCounts[tool.category || "Uncategorized"] = (categoryCounts[tool.category || "Uncategorized"] || 0) + 1;
    if (result.confidence < 50) {
      lowConfidence++;
    }
  });

  console.log(`\n📊 Category Distribution (${Object.keys(categoryCounts).length} distinct categories):`);
  const sorted = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  sorted.slice(0, 15).forEach(([cat, count]) => {
    console.log(`   • ${cat.padEnd(35)} : ${count} tools`);
  });

  console.log(`\n✅ Audit complete: ${allResources.length} tools audited.`);
  console.log(`   Classification coverage: ${(((allResources.length - lowConfidence) / allResources.length) * 100).toFixed(1)}% high-confidence categorizations.\n`);
  process.exit(0);
}

// Find --name and --desc
let toolName = "";
let toolDesc = "";
let toolTags = "";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--name" && args[i + 1]) {
    toolName = args[i + 1];
    i++;
  } else if (args[i] === "--desc" && args[i + 1]) {
    toolDesc = args[i + 1];
    i++;
  } else if (args[i] === "--tags" && args[i + 1]) {
    toolTags = args[i + 1];
    i++;
  } else if (args[i] === "--suggest" && args[i + 1]) {
    toolDesc = args[i + 1];
    i++;
  }
}

if (!toolName && !toolDesc) {
  // If no params, show help
  console.log(`
🛠️  DevShelf Auto-Categorizing Tool

Usage:
  node scripts/auto-categorize.js --name "<Name>" --desc "<Description>" [--tags "t1,t2"]
  node scripts/auto-categorize.js --audit
  node scripts/auto-categorize.js --suggest "<Keywords or Phrase>"

Examples:
  node scripts/auto-categorize.js --name "Akii" --desc "SEO & AI Search Optimizer CLI"
  node scripts/auto-categorize.js --name "VectorShield" --desc "Self-hosted vector database for LLM agent embeddings"
  node scripts/auto-categorize.js --audit
`);
  process.exit(0);
}

const input = `${toolName} ${toolDesc} ${toolTags}`;
const result = classifyText(input);

console.log("\n╔════════════════════════════════════════════════════════════════════╗");
console.log("║              DEVSHELF AUTO-CATEGORIZATION REPORT                  ║");
console.log("╚════════════════════════════════════════════════════════════════════╝\n");
console.log(` 📦 Tool Name            : ${toolName || "(Not specified)"}`);
console.log(` 📝 Description          : ${toolDesc || "(Not specified)"}`);
console.log(` 🏷️  Assigned Category    : ${result.shelfCategory}`);
console.log(` 📁 Recommended Shelf    : ${result.shelf}`);
console.log(` 🎯 Confidence Level     : ${result.confidence}%`);
console.log(` 💡 Classification Logic : ${result.reason}`);
console.log(` 🔖 Suggested Tags       : ${result.suggestedTags.join(", ")}`);
console.log("\n" + "─".repeat(70) + "\n");
