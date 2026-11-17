import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

test("Audit Remediation Phase 2: Brand Focus, Pricing Unification, Version Sync & DevShelf Dossiers", async (t) => {
  await t.test("Navbar and Footer focus strictly on Enterprise AI Agent Security with consistent pricing", () => {
    const navbar = fs.readFileSync(path.join(rootDir, "src/components/Navbar.tsx"), "utf8");
    const footer = fs.readFileSync(path.join(rootDir, "src/components/Footer.tsx"), "utf8");

    assert.ok(navbar.includes("ENTERPRISE AI AGENT SECURITY"), "Navbar must show focused B2B tagline");
    assert.strictEqual(navbar.includes("AGENT DEFENSE & OFFLINE APPS"), false);
    assert.strictEqual(navbar.includes('href="/apps"'), false, "Navbar must not link to consumer Android /apps");

    assert.ok(footer.includes("From $19/mo"), "Footer must match /partners pricing (From $19/mo)");
    assert.strictEqual(footer.includes("$499/mo"), false, "Footer must not show conflicting $499/mo badge");
    assert.strictEqual(footer.includes("All-in-One Calculator"), false, "Footer must not list consumer calculators");
  });

  await t.test("Homepage excludes MockForge, FinePrint, and consumer Android calculator banner", () => {
    const home = fs.readFileSync(path.join(rootDir, "src/components/HomePageClient.tsx"), "utf8");
    assert.strictEqual(home.includes("MockForge AI"), false);
    assert.strictEqual(home.includes("FinePrint AI"), false);
    assert.strictEqual(home.includes("All-in-One Calculator Plus"), false);
    assert.ok(home.includes("/benchmarks"), "Homepage must link to 500-vector benchmarks");
    assert.ok(home.includes("/mcp-security"), "Homepage must link to Top 100 MCP Security Report");
  });

  await t.test("DevShelf dossiers deduplicate git clone and resolve open-source metadata instead of Not listed", () => {
    const slugPage = fs.readFileSync(path.join(rootDir, "src/app/devshelf/[slug]/page.tsx"), "utf8");
    const mainPage = fs.readFileSync(path.join(rootDir, "src/app/devshelf/page.tsx"), "utf8");

    assert.ok(slugPage.includes('!installConfig.commands.some((c) => c.trim().startsWith("git clone"))'));
    assert.ok(mainPage.includes('!selectedInstall?.cmd?.trim().startsWith("git clone")'));
    assert.ok(slugPage.includes("100% Free & Open Source"));
    assert.ok(mainPage.includes("100% Free & Open Source"));
  });

  await t.test("AgentShield version strings are synchronized to v0.2.2 across web surfaces", () => {
    const agentPage = fs.readFileSync(path.join(rootDir, "src/app/agentshield/page.tsx"), "utf8");
    const playgroundPage = fs.readFileSync(path.join(rootDir, "src/app/playground/page.tsx"), "utf8");
    const docsPage = fs.readFileSync(path.join(rootDir, "src/app/docs/page.tsx"), "utf8");

    assert.ok(agentPage.includes("v0.2.2 Stable"), "agentshield/page.tsx must show v0.2.2");
    assert.strictEqual(agentPage.includes("v1.2.0 Stable"), false);
    assert.ok(playgroundPage.includes("v0.2.2 Core"), "playground/page.tsx must show v0.2.2");
    assert.ok(docsPage.includes("AgentShield v0.2.2"), "docs/page.tsx must show AgentShield v0.2.2");
  });

  await t.test("Unified Pricing page presents 3 core tiers + $99/mo SkillPrism Hub", () => {
    const pricing = fs.readFileSync(path.join(rootDir, "src/app/pricing/page.tsx"), "utf8");
    assert.ok(pricing.includes("Community OSS"));
    assert.ok(pricing.includes("Team Gate + Relay"));
    assert.ok(pricing.includes("Enterprise VPC Fleet"));
    assert.ok(pricing.includes("SkillPrism Managed Redis Hub"));
    assert.ok(pricing.includes("From $19/mo"));
  });
});
