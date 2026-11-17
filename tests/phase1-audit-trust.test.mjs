import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

function walkFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(full));
    } else if (/\.(ts|tsx|js|mjs|json|md|txt)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

test("Audit Remediation Phase 1: Trust, Advisories & Legal Integrity", async (t) => {
  await t.test("Zero colliding CVE IDs or synthetic GHSAs exist in src/ or public/", () => {
    const files = [...walkFiles(path.join(rootDir, "src")), ...walkFiles(path.join(rootDir, "public"))];
    const forbidden = /CVE-2026-3829[123]|GHSA-92f2-4677-rmvh|GHSA-p3v4-5qw2-92rg|GHSA-g5mq-fjr3-39qp/;
    for (const file of files) {
      const content = fs.readFileSync(file, "utf8");
      assert.strictEqual(forbidden.test(content), false, `Forbidden synthetic CVE/GHSA found in ${file}`);
    }
  });

  await t.test("Trust and Enterprise pages avoid unverified CPA SOC 2 and static 10.0/10.0 claims", () => {
    const trustContent = fs.readFileSync(path.join(rootDir, "src/app/trust/page.tsx"), "utf8");
    const enterpriseContent = fs.readFileSync(path.join(rootDir, "src/app/enterprise/page.tsx"), "utf8");

    assert.strictEqual(trustContent.includes("10.0 / 10.0"), false, "trust/page.tsx must not claim static 10.0 / 10.0");
    assert.strictEqual(trustContent.includes("Live Scorecard"), true, "trust/page.tsx should link to live OpenSSF Scorecard");
    assert.strictEqual(enterpriseContent.includes("Certified SOC 2 Type II / ISO 27001 CPA Audit Reports"), false);
    assert.strictEqual(enterpriseContent.includes("SOC 2 &amp; ISO 27001 Architecture Alignment"), true);
  });

  await t.test("Required routes (/projects, /sla, /privacy/dpdp, /terms carve-out) exist and are complete", () => {
    const projectsPath = path.join(rootDir, "src/app/projects/page.tsx");
    const slaPath = path.join(rootDir, "src/app/sla/page.tsx");
    const dpdpPath = path.join(rootDir, "src/app/privacy/dpdp/page.tsx");
    const termsPath = path.join(rootDir, "src/app/terms/page.tsx");

    assert.ok(fs.existsSync(projectsPath), "/projects/page.tsx must exist");
    assert.ok(fs.existsSync(slaPath), "/sla/page.tsx must exist");
    assert.ok(fs.existsSync(dpdpPath), "/privacy/dpdp/page.tsx must exist");

    const termsContent = fs.readFileSync(termsPath, "utf8");
    assert.ok(termsContent.includes("Digital Deliverables"), "terms/page.tsx Section 5 must include digital deliverables refund carve-out");
  });

  await t.test("FinePrint page transparently discloses --offline AST vs optional Gemini cloud mode", () => {
    const fineprintContent = fs.readFileSync(path.join(rootDir, "src/app/fineprint/page.tsx"), "utf8");
    assert.strictEqual(fineprintContent.includes("Zero-Cloud In-Memory Processing"), false);
    assert.ok(fineprintContent.includes("--offline"), "fineprint/page.tsx must document --offline local AST mode");
    assert.ok(fineprintContent.includes("GEMINI_API_KEY"), "fineprint/page.tsx must disclose optional Gemini API key");
  });
});
