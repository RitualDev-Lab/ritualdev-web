"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Database, 
  Terminal, 
  GitFork, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Cpu, 
  Layers, 
  FileCode, 
  Download, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Server, 
  Zap, 
  Table,
  Play,
  FileSpreadsheet
} from "lucide-react";

export default function MockForgePage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeSchemaKey, setActiveSchemaKey] = useState<"ecommerce" | "saas" | "healthcare">("ecommerce");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBatch, setGeneratedBatch] = useState<number>(1);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const schemaPresets = {
    ecommerce: {
      name: "E-Commerce Orders",
      sql: `-- Relational Kahn DAG: users -> orders -> order_items
CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT, email TEXT);
CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), total_cents INT);
CREATE TABLE order_items (id SERIAL PRIMARY KEY, order_id INT REFERENCES orders(id), sku TEXT, qty INT);`,
      generateRows: (batch: number) => {
        const users = [
          { id: 101, name: "Alice Zhang", email: "alice.z@techcorp.io" },
          { id: 102, name: "Marcus Brody", email: "m.brody@cloudscale.net" },
          { id: 103, name: "Chloe Dupont", email: "c.dupont@hexasec.com" }
        ];
        const orders = [
          { id: 5001 + batch, user_id: 101, total_cents: 14999 },
          { id: 5002 + batch, user_id: 102, total_cents: 49900 },
          { id: 5003 + batch, user_id: 103, total_cents: 8950 }
        ];
        const order_items = [
          { id: 9001 + batch, order_id: 5001 + batch, sku: "SKU-PRO-AGENT", qty: 1 },
          { id: 9002 + batch, order_id: 5002 + batch, sku: "SKU-DBSHIELD-HA", qty: 2 },
          { id: 9003 + batch, order_id: 5003 + batch, sku: "SKU-SKILLPRISM-VPC", qty: 5 }
        ];
        return { users, orders, order_items };
      }
    },
    saas: {
      name: "SaaS Subscriptions",
      sql: `-- Relational Kahn DAG: tenants -> subscriptions -> invoices
CREATE TABLE tenants (id UUID PRIMARY KEY, company_name TEXT, plan_tier TEXT);
CREATE TABLE subscriptions (id UUID PRIMARY KEY, tenant_id UUID REFERENCES tenants(id), status TEXT);
CREATE TABLE invoices (id UUID PRIMARY KEY, subscription_id UUID REFERENCES subscriptions(id), amount_due NUMERIC);`,
      generateRows: (batch: number) => {
        const tenants = [
          { id: `t_01_${batch}`, company_name: "Vertex Analytics", plan_tier: "Enterprise VPC" },
          { id: `t_02_${batch}`, company_name: "Acuity Health AI", plan_tier: "Team Fleet" }
        ];
        const subscriptions = [
          { id: `sub_91_${batch}`, tenant_id: `t_01_${batch}`, status: "active" },
          { id: `sub_92_${batch}`, tenant_id: `t_02_${batch}`, status: "active" }
        ];
        const invoices = [
          { id: `inv_101_${batch}`, subscription_id: `sub_91_${batch}`, amount_due: "$8,500.00" },
          { id: `inv_102_${batch}`, subscription_id: `sub_92_${batch}`, amount_due: "$1,200.00" }
        ];
        return { tenants, subscriptions, invoices };
      }
    },
    healthcare: {
      name: "HIPAA Clinical Encounters",
      sql: `-- Relational Kahn DAG: patients -> encounters -> prescriptions
CREATE TABLE patients (patient_uuid UUID PRIMARY KEY, masked_token TEXT, age_bracket TEXT);
CREATE TABLE encounters (encounter_id INT PRIMARY KEY, patient_uuid UUID REFERENCES patients(patient_uuid), facility TEXT);
CREATE TABLE prescriptions (rx_id INT PRIMARY KEY, encounter_id INT REFERENCES encounters(encounter_id), drug_code TEXT);`,
      generateRows: (batch: number) => {
        const patients = [
          { patient_uuid: `p_anon_331_${batch}`, masked_token: "HASH_ANON_889F", age_bracket: "40-49" },
          { patient_uuid: `p_anon_332_${batch}`, masked_token: "HASH_ANON_220E", age_bracket: "60-69" }
        ];
        const encounters = [
          { encounter_id: 8801 + batch, patient_uuid: `p_anon_331_${batch}`, facility: "St. Jude Clinic #4" },
          { encounter_id: 8802 + batch, patient_uuid: `p_anon_332_${batch}`, facility: "Metro General Telehealth" }
        ];
        const prescriptions = [
          { rx_id: 7701 + batch, encounter_id: 8801 + batch, drug_code: "NDC-50458-578" },
          { rx_id: 7702 + batch, encounter_id: 8802 + batch, drug_code: "NDC-00006-074" }
        ];
        return { patients, encounters, prescriptions };
      }
    }
  };

  const handleSynthesize = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedBatch((prev) => prev + 1);
      setIsGenerating(false);
    }, 280);
  };

  const currentDataset = useMemo(() => {
    return schemaPresets[activeSchemaKey].generateRows(generatedBatch);
  }, [activeSchemaKey, generatedBatch]);

  const enterpriseFeatures = [
    {
      title: "Production DB Masking (HIPAA / GDPR / SOC 2)",
      desc: "Pipe real Postgres/MySQL sanitized dumps through MockForge. Synthetic data replaces customer PII while preserving 100% of foreign-key relationships.",
      icon: ShieldCheck
    },
    {
      title: "Ephemeral In-Memory Mock API Servers",
      desc: "Instant HTTP mock servers spinning up directly inside GitHub Actions CI/CD test runners. Serves dynamic REST/GraphQL endpoints with zero cloud database spin-up latency.",
      icon: Server
    },
    {
      title: "Bidirectional ORM Synchronizers",
      desc: "Direct integration with Prisma, Drizzle, SQLAlchemy, and Django migrations to regenerate deterministic test fixtures on every git commit.",
      icon: GitFork
    },
    {
      title: "High-Throughput WebAssembly Engine",
      desc: "Synthesizes 88,000+ relational records per second entirely in-memory using WebAssembly SQLite with zero cloud database fees.",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link href="/" className="hover:text-brand-neon">Home</Link>
        <span>/</span>
        <span className="text-cyan-400">MockForge AI</span>
      </div>

      {/* Hero Header */}
      <div className="border-b border-slate-800 pb-12 space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            <Database className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">MockForge AI</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 text-xs font-mono">
                v0.1.0 Released
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-mono">
                88,000 rows/sec
              </span>
            </div>
            <p className="text-slate-400 text-sm sm:text-base font-mono mt-1">
              Intelligent In-Browser Relational Mock DB &amp; Seed Data Synthesizer
            </p>
          </div>
        </div>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          MockForge AI builds complex relational mock datasets with <strong>100% foreign-key integrity</strong> using <strong>Kahn's Topological DAG Sorter</strong> and an <strong>in-browser WebAssembly SQLite engine</strong>. Generates millions of coherent rows across PostgreSQL, MySQL, and SQLite schemas at zero cloud compute cost ($0 VPS).
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 items-center pt-2">
          <a
            href="https://github.com/RitualDev-Lab/MockForge/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:brightness-110 transition"
          >
            <Download className="w-4 h-4" />
            <span>Download Release v0.1.0</span>
          </a>

          <a
            href="https://checkout.dodopayments.com/buy/pdt_0NrFSkF5XLgBppfQRxgXN?quantity=1&redirect_url=https%3A%2F%2Fritualdev.in%2Fpricing%2Fsuccess%3Fproduct%3Dmockforge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-400 font-bold text-sm transition"
          >
            <span>Upgrade to Production Masking Pro ($49/mo)</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="https://github.com/RitualDev-Lab/MockForge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-mono text-sm transition"
          >
            <span>Public Repo &amp; Docs</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Quick CLI Row */}
        <div className="flex flex-wrap gap-3 pt-4">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">
            <span className="text-cyan-400">$</span>
            <span>pip install mockforge</span>
            <button onClick={() => copyText("pip install mockforge", "pip")} className="ml-2 text-slate-400 hover:text-white">
              {copied === "pip" ? <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">
            <span className="text-cyan-400">$</span>
            <span>npm install -g @ritualdev/mockforge</span>
            <button onClick={() => copyText("npm install -g @ritualdev/mockforge", "npm")} className="ml-2 text-slate-400 hover:text-white">
              {copied === "npm" ? <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Simulation / Live Sandbox */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Table className="w-5 h-5 text-cyan-400" />
              <span>Interactive In-Browser Relational Synthesis Playground</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select a relational schema and click Synthesize to resolve Kahn's DAG foreign-key dependencies client-side in &lt; 15ms.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSynthesize}
              disabled={isGenerating}
              className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isGenerating ? "Synthesizing DAG..." : "1-Click Synthesize Batch"}</span>
            </button>
            <button
              onClick={() => copyText(JSON.stringify(currentDataset, null, 2), "json-copy")}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs border border-slate-700 flex items-center gap-1.5 transition"
            >
              {copied === "json-copy" ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied === "json-copy" ? "Copied JSON" : "Copy JSON"}</span>
            </button>
          </div>
        </div>

        {/* Schema Selector Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          {(Object.keys(schemaPresets) as Array<keyof typeof schemaPresets>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveSchemaKey(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                activeSchemaKey === key 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {schemaPresets[key].name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>DDL Schema Definition (Topological DAG)</span>
              <span className="text-cyan-400 font-bold">Kahn Sorter: Active</span>
            </div>
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-cyan-300 overflow-x-auto h-[180px]">
              <pre>{schemaPresets[activeSchemaKey].sql}</pre>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Live Synthesized Relational Records</span>
              <span className="text-brand-neon font-bold">100% Foreign Key Coherent</span>
            </div>
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-y-auto h-[180px] space-y-2">
              <pre className="text-cyan-300 text-[11px] leading-tight">
                {JSON.stringify(currentDataset, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-slate-400">
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span>Synthesis Throughput</span>
            <span className="text-cyan-400 font-bold">88,000+ rows/sec</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span>Foreign Key Integrity</span>
            <span className="text-cyan-400 font-bold">100% DAG Guaranteed</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span>Supported Dialects</span>
            <span className="text-white font-bold">Postgres / MySQL / SQLite / Prisma</span>
          </div>
        </div>
      </div>

      {/* Enterprise Capabilities */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Enterprise Masking &amp; CI/CD Features</h2>
          <p className="text-sm text-slate-400 mt-1">Available for organizations scaling high-fidelity test fixtures and compliance masking.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enterpriseFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{feat.title}</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Generate Coherent Test Data in Seconds</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          Stop writing brittle manual SQL seed fixtures. Run MockForge locally or integrate into your CI/CD test runners.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/RitualDev-Lab/MockForge/releases/latest"
            className="px-6 py-3 rounded-xl bg-cyan-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:brightness-110 transition"
          >
            Download Free Community CLI
          </a>
          <a
            href="https://checkout.dodopayments.com/buy/pdt_0NrFSkF5XLgBppfQRxgXN?quantity=1&redirect_url=https%3A%2F%2Fritualdev.in%2Fpricing%2Fsuccess%3Fproduct%3Dmockforge"
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition"
          >
            Purchase Production Masking Pro ($49/mo)
          </a>
        </div>
      </div>

    </div>
  );
}
