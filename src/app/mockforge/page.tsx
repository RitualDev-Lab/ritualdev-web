"use client";

import { useState } from "react";
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
  Table
} from "lucide-react";

export default function MockForgePage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sampleSchema = `-- 100% Valid Topological Ordering Handled by Kahn's DAG
CREATE TABLE users (id INT PRIMARY KEY, email TEXT, name TEXT);
CREATE TABLE orders (id INT PRIMARY KEY, user_id INT REFERENCES users(id), total DECIMAL);
CREATE TABLE order_items (id INT PRIMARY KEY, order_id INT REFERENCES orders(id), sku TEXT);`;

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
        <span className="text-brand-neon">MockForge AI</span>
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

      {/* Code Showcase / Schema Preview */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Table className="w-5 h-5 text-cyan-400" />
            <span>Zero-Violation Relational Topological Generation</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Feed any SQL DDL or Prisma schema. MockForge parses foreign-key constraints into a Directed Acyclic Graph (DAG) and generates insertion scripts guaranteed never to violate referential integrity.
          </p>
        </div>

        <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-cyan-300 overflow-x-auto">
          <pre>{sampleSchema}</pre>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-slate-400">
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span>Throughput</span>
            <span className="text-cyan-400 font-bold">88,000+ rows/sec</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span>Foreign Key Integrity</span>
            <span className="text-cyan-400 font-bold">100% Guaranteed</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span>Supported Dialects</span>
            <span className="text-white font-bold">Postgres / MySQL / SQLite</span>
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
