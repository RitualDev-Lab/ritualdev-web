import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

test('Phase 5: GTM Launch Blitz, Verifiable Benchmarks & Enterprise Outbound Suite', async (t) => {
  await t.test('Verifies Phase 5 GTM Launch Blitz kits exist', () => {
    const launchDir = path.join(rootDir, 'launch');
    assert.ok(fs.existsSync(launchDir), 'launch/ directory must exist');

    const week9 = path.join(launchDir, 'week9-agentshield-dbshield-launch.md');
    const week10 = path.join(launchDir, 'week10-skillprism-finops-launch.md');
    const week11 = path.join(launchDir, 'week11-devshelf-universal-credits-launch.md');
    const contracts = path.join(launchDir, 'enterprise-outbound-cadence-and-contracts.md');

    assert.ok(fs.existsSync(week9), 'Week 9 launch pack must exist');
    assert.ok(fs.existsSync(week10), 'Week 10 launch pack must exist');
    assert.ok(fs.existsSync(week11), 'Week 11 launch pack must exist');
    assert.ok(fs.existsSync(contracts), 'Enterprise outbound & contract pack must exist');

    const contractsContent = fs.readFileSync(contracts, 'utf8');
    assert.ok(contractsContent.includes('Commercial Pilot Statement of Work (SOW #RIT-2026-VPC)'));
    assert.ok(contractsContent.includes('$25,000'));
    assert.ok(contractsContent.includes('$50,000'));
    assert.ok(contractsContent.includes('SOC 2 Type II'));
  });

  await t.test('Verifies Phase 5 interactive pages exist in ritualdev-web', () => {
    const appDir = path.join(rootDir, 'src', 'app');

    const benchmarksPage = path.join(appDir, 'benchmarks', 'page.tsx');
    const mcpSecurityPage = path.join(appDir, 'mcp-security', 'page.tsx');
    const finopsCalculatorPage = path.join(appDir, 'finops-calculator', 'page.tsx');
    const pilotPage = path.join(appDir, 'enterprise', 'pilot', 'page.tsx');

    assert.ok(fs.existsSync(benchmarksPage), 'benchmarks page must exist');
    assert.ok(fs.existsSync(mcpSecurityPage), 'mcp-security page must exist');
    assert.ok(fs.existsSync(finopsCalculatorPage), 'finops-calculator page must exist');
    assert.ok(fs.existsSync(pilotPage), 'enterprise/pilot page must exist');

    const benchmarksContent = fs.readFileSync(benchmarksPage, 'utf8');
    assert.ok(benchmarksContent.includes('Agent Security Benchmarks'));
    assert.ok(benchmarksContent.includes('500 Standardized Vectors'));

    const mcpSecurityContent = fs.readFileSync(mcpSecurityPage, 'utf8');
    assert.ok(mcpSecurityContent.includes('Top 100 MCP Server'));
    assert.ok(mcpSecurityContent.includes('CWE-918'));

    const finopsContent = fs.readFileSync(finopsCalculatorPage, 'utf8');
    assert.ok(finopsContent.includes('FinOps'));
    assert.ok(finopsContent.includes('compactionRatePercent'));
  });
});
