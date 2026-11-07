import assert from "node:assert";
import data from "../src/data/devshelf.json" with { type: "json" };
import {
  searchResources,
  autoCategorizeQuery,
  autoCategorizeTool,
  highlightText,
  parseSearchQuery,
  levenshteinDistance,
  stemWord
} from "../src/lib/searchEngine.ts";

console.log("🚀 Testing DevShelf Search Engine & Auto-Categorizer...");

const tools = data.resources || [];
assert(tools.length >= 575, `Expected >= 575 tools, got ${tools.length}`);

// 1. Levenshtein & Stemming
assert.strictEqual(levenshteinDistance("docker", "dockr"), 1);
assert.strictEqual(levenshteinDistance("postgres", "posgres"), 1);
assert.strictEqual(stemWord("databases"), "database");
assert.strictEqual(stemWord("testing"), "test");
assert.strictEqual(stemWord("optimizers"), "optimizer");
console.log("✅ Levenshtein & Stemming tests passed.");

// 2. Query Parsing & Operators
const parsed1 = parseSearchQuery('akii "seo optimizer" is:docker -paid');
assert.deepStrictEqual(parsed1.tokens, ["akii"]);
assert.deepStrictEqual(parsed1.exactPhrases, ["seo optimizer"]);
assert.deepStrictEqual(parsed1.negations, ["paid"]);
assert.strictEqual(parsed1.isDocker, true);
console.log("✅ Query parser & power syntax operators passed.");

// 3. Exact Search for Akii
const akiiResults = searchResources(tools, "Akii");
assert(akiiResults.results.length >= 1, "Akii should be found");
assert.strictEqual(akiiResults.results[0].name, "Akii: SEO & AI Search Optimizer");
console.log(`✅ Akii search returned #1: "${akiiResults.results[0].name}"`);

// 4. Word-by-word Multi-token Search
const multiToken = searchResources(tools, "seo ai search optimizer");
assert(multiToken.results.some(t => t.name.includes("Akii")), "Akii should match multi-token SEO query");
console.log(`✅ Multi-token search passed (${multiToken.results.length} matches)`);

// 5. Typo-Tolerance / Fuzzy Matching
const fuzzy1 = searchResources(tools, "posgres");
assert(fuzzy1.results.length > 0, "Typo 'posgres' should match PostgreSQL tools");
assert(fuzzy1.results.some(t => (t.name + t.description).toLowerCase().includes("postgres")), "Should contain postgres tool");

const fuzzy2 = searchResources(tools, "dockr");
assert(fuzzy2.results.length > 0, "Typo 'dockr' should match Docker tools");
console.log(`✅ Typo-tolerant fuzzy search passed ('posgres': ${fuzzy1.results.length}, 'dockr': ${fuzzy2.results.length})`);

// 6. Synonym & Acronym Expansion
const synK8s = searchResources(tools, "k8s");
assert(synK8s.results.length > 0, "Acronym 'k8s' should find Kubernetes tools");
assert(synK8s.results.some(t => (t.name + t.description).toLowerCase().includes("kubernetes")), "Matches kubernetes");

const synDb = searchResources(tools, "db");
assert(synDb.results.length > 0, "Acronym 'db' should find Database tools");
console.log(`✅ Synonym & Acronym expansion passed ('k8s': ${synK8s.results.length}, 'db': ${synDb.results.length})`);

// 7. Auto-Categorize Query & Intent Detection
const allCategories = Array.from(new Set(tools.map(t => t.category).filter(Boolean)));
const autoCatDb = autoCategorizeQuery("postgres query manager", allCategories);
assert(autoCatDb !== null, "Should detect category for postgres query");
assert(autoCatDb.detectedCategory.toLowerCase().includes("database") || autoCatDb.matchedTaxonomyId === "database");
console.log(`✅ Auto-categorize query 'postgres': detected "${autoCatDb.detectedCategory}" (${autoCatDb.confidence}%)`);

const autoCatAi = autoCategorizeQuery("claude prompt workflow", allCategories);
assert(autoCatAi !== null, "Should detect category for claude query");
assert(autoCatAi.matchedTaxonomyId === "ai-mcp");
console.log(`✅ Auto-categorize query 'claude prompt': detected "${autoCatAi.detectedCategory}" (${autoCatAi.confidence}%)`);

// 8. Auto-Categorize Tool Utility
const toolToCategorize = {
  name: "VectorShield",
  description: "High-performance vector database with pgvector and similarity search embeddings.",
  language: "Rust",
  statusTags: ["vector", "embeddings", "local-first"]
};
const toolCat = autoCategorizeTool(toolToCategorize, allCategories);
assert(toolCat.recommendedCategory.toLowerCase().includes("database") || toolCat.recommendedCategory.toLowerCase().includes("ai"));
console.log(`✅ Auto-categorize tool 'VectorShield': classified as "${toolCat.recommendedCategory}" (${toolCat.confidence}%)`);

// 9. Safe Highlight Text Tokenizer
const highlightChunks = highlightText("Akii is an SEO and AI search optimizer", ["akii", "seo", "ai"]);
assert(highlightChunks.some(c => c.text.toLowerCase() === "akii" && c.isMatch));
assert(highlightChunks.some(c => c.text.toLowerCase() === "seo" && c.isMatch));
console.log("✅ Text highlighter chunks passed.");

console.log("\n🎉 ALL SEARCH ENGINE & AUTO-CATEGORIZER TESTS PASSED PERFECTLY!");
