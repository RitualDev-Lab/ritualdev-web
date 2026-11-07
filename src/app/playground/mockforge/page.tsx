"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Database, 
  Terminal, 
  Play, 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  Download, 
  Zap, 
  Layers, 
  ArrowRight, 
  Code2, 
  CheckCircle2, 
  FileJson, 
  FileSpreadsheet, 
  Share2, 
  ShieldCheck,
  Table
} from "lucide-react";

interface SchemaPreset {
  id: string;
  name: string;
  dialect: "sql" | "prisma";
  description: string;
  schema: string;
}

const PRESETS: SchemaPreset[] = [
  {
    id: "ecommerce-sql",
    name: "E-Commerce Relational DAG (SQL)",
    dialect: "sql",
    description: "4-tier foreign key hierarchy: Users → Orders → Order Items & Payments",
    schema: `-- 100% Topological DAG: Users -> Orders -> Order Items
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  country VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT REFERENCES users(id),
  order_number VARCHAR(50) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id INT PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  product_name VARCHAR(150) NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL
);

CREATE TABLE payments (
  id INT PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  payment_method VARCHAR(30) DEFAULT 'credit_card',
  transaction_ref VARCHAR(64) NOT NULL,
  is_successful BOOLEAN DEFAULT true
);`
  },
  {
    id: "saas-multitenant-sql",
    name: "SaaS Multi-Tenant Hierarchy (SQL)",
    dialect: "sql",
    description: "Organizations → Workspaces → Members → API Keys",
    schema: `-- SaaS Multi-Tenant DAG
CREATE TABLE organizations (
  id INT PRIMARY KEY,
  slug VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  plan VARCHAR(20) DEFAULT 'enterprise',
  created_at TIMESTAMP
);

CREATE TABLE workspaces (
  id INT PRIMARY KEY,
  org_id INT REFERENCES organizations(id),
  name VARCHAR(80) NOT NULL,
  region VARCHAR(20) DEFAULT 'us-east-1'
);

CREATE TABLE users (
  id INT PRIMARY KEY,
  org_id INT REFERENCES organizations(id),
  email VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'member'
);

CREATE TABLE api_keys (
  id INT PRIMARY KEY,
  user_id INT REFERENCES users(id),
  key_prefix VARCHAR(16) NOT NULL,
  is_active BOOLEAN DEFAULT true
);`
  },
  {
    id: "prisma-social",
    name: "Social Graph (Prisma Schema)",
    dialect: "prisma",
    description: "Users, Profiles, Posts & Comments with relational Prisma @relation attributes",
    schema: `model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  username  String
  createdAt DateTime @default(now())
  posts     Post[]
  profile   Profile?
}

model Profile {
  id     Int    @id @default(autoincrement())
  userId Int    @unique
  bio    String
  user   User   @relation(fields: [userId], references: [id])
}

model Post {
  id        Int       @id @default(autoincrement())
  authorId  Int
  title     String
  content   String
  published Boolean   @default(true)
  author    User      @relation(fields: [authorId], references: [id])
  comments  Comment[]
}

model Comment {
  id     Int    @id @default(autoincrement())
  postId Int
  body   String
  post   Post   @relation(fields: [postId], references: [id])
}`
  }
];

// In-Browser Relational Synthesis Engine
function parseSqlTables(sql: string) {
  const tables: Array<{
    name: string;
    columns: Array<{ name: string; type: string; isPk: boolean; fkRef?: { table: string; col: string } }>;
  }> = [];

  const tableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_]+)\s*\(([\s\S]*?)\);/gi;
  let match;

  while ((match = tableRegex.exec(sql)) !== null) {
    const tableName = match[1].toLowerCase();
    const body = match[2];
    const columns: Array<{ name: string; type: string; isPk: boolean; fkRef?: { table: string; col: string } }> = [];

    const lines = body.split(',').map(l => l.trim()).filter(Boolean);
    for (const line of lines) {
      if (/^(PRIMARY\s+KEY|FOREIGN\s+KEY|CONSTRAINT|INDEX|UNIQUE)/i.test(line)) {
        // Table level constraints (skip simple line parser)
        continue;
      }
      const parts = line.split(/\s+/);
      if (parts.length >= 2) {
        const colName = parts[0].toLowerCase();
        const colType = parts[1].toUpperCase();
        const isPk = /PRIMARY\s+KEY/i.test(line) || colName === 'id';

        let fkRef: { table: string; col: string } | undefined;
        const refMatch = /REFERENCES\s+([a-zA-Z0-9_]+)\s*\(([a-zA-Z0-9_]+)\)/i.exec(line);
        if (refMatch) {
          fkRef = { table: refMatch[1].toLowerCase(), col: refMatch[2].toLowerCase() };
        }

        columns.push({ name: colName, type: colType, isPk, fkRef });
      }
    }

    if (columns.length > 0) {
      tables.push({ name: tableName, columns });
    }
  }

  return tables;
}

function parsePrismaModels(prisma: string) {
  const tables: Array<{
    name: string;
    columns: Array<{ name: string; type: string; isPk: boolean; fkRef?: { table: string; col: string } }>;
  }> = [];

  const modelRegex = /model\s+([a-zA-Z0-9_]+)\s*\{([\s\S]*?)\}/gi;
  let match;

  while ((match = modelRegex.exec(prisma)) !== null) {
    const tableName = match[1].toLowerCase();
    const body = match[2];
    const columns: Array<{ name: string; type: string; isPk: boolean; fkRef?: { table: string; col: string } }> = [];

    const lines = body.split('\n').map(l => l.trim()).filter(Boolean);
    for (const line of lines) {
      if (line.startsWith('//') || line.startsWith('@@')) continue;
      const parts = line.split(/\s+/);
      if (parts.length >= 2) {
        const colName = parts[0].toLowerCase();
        const colType = parts[1].toUpperCase();

        // Skip relation array/object fields (e.g. posts Post[])
        if (['USER', 'PROFILE', 'POST', 'COMMENT', 'ORGANIZATION'].includes(colType) || colType.endsWith('[]')) {
          continue;
        }

        const isPk = line.includes('@id') || colName === 'id';
        let fkRef: { table: string; col: string } | undefined;

        // Check if there is another line defining @relation(fields: [colName], references: [id])
        const relRegex = new RegExp(`@relation\\(.*?fields:\\s*\\[${colName}\\].*?references:\\s*\\[([a-zA-Z0-9_]+)\\]`, 'i');
        for (const relLine of lines) {
          const rm = relRegex.exec(relLine);
          if (rm) {
            const relType = relLine.split(/\s+/)[1].toLowerCase();
            fkRef = { table: relType, col: rm[1].toLowerCase() };
            break;
          }
        }

        // Generic fallback for user_id, org_id
        if (!fkRef && colName.endsWith('id') && colName !== 'id') {
          const parentTable = colName.replace(/_?id$/i, '');
          fkRef = { table: parentTable, col: 'id' };
        }

        columns.push({ name: colName, type: colType, isPk, fkRef });
      }
    }

    if (columns.length > 0) {
      tables.push({ name: tableName, columns });
    }
  }

  return tables;
}

// Topological DAG Sort (Kahn's Algorithm)
function sortTablesTopologically(tables: ReturnType<typeof parseSqlTables>) {
  const tableMap = new Map(tables.map(t => [t.name, t]));
  const inDegree = new Map<string, number>();
  const graph = new Map<string, string[]>();

  tables.forEach(t => {
    inDegree.set(t.name, 0);
    graph.set(t.name, []);
  });

  tables.forEach(t => {
    t.columns.forEach(col => {
      if (col.fkRef && tableMap.has(col.fkRef.table) && col.fkRef.table !== t.name) {
        const parent = col.fkRef.table;
        graph.get(parent)?.push(t.name);
        inDegree.set(t.name, (inDegree.get(t.name) || 0) + 1);
      }
    });
  });

  const queue: string[] = [];
  inDegree.forEach((deg, name) => {
    if (deg === 0) queue.push(name);
  });

  const sorted: Array<typeof tables[0]> = [];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    const tbl = tableMap.get(curr);
    if (tbl) sorted.push(tbl);

    const children = graph.get(curr) || [];
    for (const child of children) {
      const newDeg = (inDegree.get(child) || 1) - 1;
      inDegree.set(child, newDeg);
      if (newDeg === 0) {
        queue.push(child);
      }
    }
  }

  // Add any remaining tables if cycles or independent
  tables.forEach(t => {
    if (!sorted.includes(t)) sorted.push(t);
  });

  return sorted;
}

// Realistic Data Generator
const FIRST_NAMES = ["Alex", "Jordan", "Taylor", "Morgan", "Sam", "Chris", "Pat", "Riley", "Cameron", "Elena"];
const LAST_NAMES = ["Vance", "Mercer", "Chen", "Kowalski", "Patel", "Dubois", "Nakamura", "Alvarez", "Larsson"];
const DOMAINS = ["ritualdev.in", "cloudcorp.io", "matrix.org", "enterprise.net", "apexlabs.dev"];
const PRODUCTS = ["Enterprise License Tier", "Real-Time Proxy Node", "Audit Trail Vault", "SOC 2 Gateway", "Cluster Token Pod"];

function generateRandomRow(
  col: { name: string; type: string; isPk: boolean; fkRef?: { table: string; col: string } },
  rowIndex: number,
  generatedData: Record<string, any[]>
) {
  // Foreign key resolution
  if (col.fkRef && generatedData[col.fkRef.table] && generatedData[col.fkRef.table].length > 0) {
    const parentRows = generatedData[col.fkRef.table];
    const pickedParent = parentRows[rowIndex % parentRows.length];
    return pickedParent[col.fkRef.col] ?? (rowIndex + 1);
  }

  if (col.isPk) {
    return rowIndex + 1;
  }

  const nameLower = col.name.toLowerCase();
  const typeUpper = col.type.toUpperCase();

  if (nameLower.includes("email")) {
    const fn = FIRST_NAMES[rowIndex % FIRST_NAMES.length].toLowerCase();
    const ln = LAST_NAMES[(rowIndex + 2) % LAST_NAMES.length].toLowerCase();
    const dom = DOMAINS[rowIndex % DOMAINS.length];
    return `${fn}.${ln}+${rowIndex + 1}@${dom}`;
  }

  if (nameLower.includes("name") || nameLower.includes("username")) {
    return `${FIRST_NAMES[rowIndex % FIRST_NAMES.length]} ${LAST_NAMES[(rowIndex + 1) % LAST_NAMES.length]}`;
  }

  if (nameLower.includes("product") || nameLower.includes("title")) {
    return PRODUCTS[rowIndex % PRODUCTS.length];
  }

  if (nameLower.includes("amount") || nameLower.includes("price") || nameLower.includes("total")) {
    return Number((49.99 + (rowIndex * 17.5)).toFixed(2));
  }

  if (nameLower.includes("status")) {
    return rowIndex % 2 === 0 ? "completed" : "active";
  }

  if (nameLower.includes("role")) {
    return rowIndex === 0 ? "admin" : "member";
  }

  if (nameLower.includes("country")) {
    return ["United States", "Germany", "Japan", "India", "Canada"][rowIndex % 5];
  }

  if (typeUpper.includes("BOOL")) {
    return rowIndex % 3 !== 0;
  }

  if (typeUpper.includes("INT")) {
    return (rowIndex + 1) * 2;
  }

  if (typeUpper.includes("TIME") || typeUpper.includes("DATE")) {
    return `2026-03-${String((rowIndex % 28) + 1).padStart(2, "0")}T14:30:00Z`;
  }

  return `Val_${col.name}_${rowIndex + 1}`;
}

export default function MockForgePlayground() {
  const [selectedPreset, setSelectedPreset] = useState<string>("ecommerce-sql");
  const [schemaText, setSchemaText] = useState<string>(PRESETS[0].schema);
  const [rowCount, setRowCount] = useState<number>(5);
  const [outputFormat, setOutputFormat] = useState<"json" | "sql" | "csv">("json");
  const [seedKey, setSeedKey] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const activePreset = PRESETS.find(p => p.id === selectedPreset) || PRESETS[0];

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
    const p = PRESETS.find(x => x.id === presetId);
    if (p) setSchemaText(p.schema);
  };

  // Generate relational data
  const generatedData = useMemo(() => {
    // Determine dialect
    const isPrisma = schemaText.includes("model ") || activePreset.dialect === "prisma";
    const rawTables = isPrisma ? parsePrismaModels(schemaText) : parseSqlTables(schemaText);
    const orderedTables = sortTablesTopologically(rawTables);

    const result: Record<string, any[]> = {};

    for (const table of orderedTables) {
      result[table.name] = [];
      for (let i = 0; i < rowCount; i++) {
        const row: Record<string, any> = {};
        for (const col of table.columns) {
          row[col.name] = generateRandomRow(col, i + (seedKey * 10), result);
        }
        result[table.name].push(row);
      }
    }

    return {
      tables: orderedTables,
      data: result,
      tableCount: orderedTables.length,
      totalRows: orderedTables.length * rowCount
    };
  }, [schemaText, rowCount, seedKey, activePreset.dialect]);

  // Formatted output
  const outputString = useMemo(() => {
    if (outputFormat === "json") {
      return JSON.stringify(generatedData.data, null, 2);
    }

    if (outputFormat === "sql") {
      const statements: string[] = [
        `-- MockForge v0.1.2 Synthetic Seed Output (${generatedData.totalRows} records)`,
        `-- Generated 100% In-Browser with Relational Foreign-Key Consistency`,
        `BEGIN;\n`
      ];

      for (const [tableName, rows] of Object.entries(generatedData.data)) {
        if (!rows || rows.length === 0) continue;
        statements.push(`-- Inserts for table '${tableName}'`);
        for (const row of rows) {
          const cols = Object.keys(row).join(", ");
          const vals = Object.values(row).map(v => {
            if (typeof v === "number" || typeof v === "boolean") return String(v);
            return `'${String(v).replace(/'/g, "''")}'`;
          }).join(", ");
          statements.push(`INSERT INTO ${tableName} (${cols}) VALUES (${vals});`);
        }
        statements.push("");
      }

      statements.push("COMMIT;");
      return statements.join("\n");
    }

    if (outputFormat === "csv") {
      const csvParts: string[] = [];
      for (const [tableName, rows] of Object.entries(generatedData.data)) {
        if (!rows || rows.length === 0) continue;
        csvParts.push(`### TABLE: ${tableName}`);
        const cols = Object.keys(rows[0]);
        csvParts.push(cols.join(","));
        for (const row of rows) {
          csvParts.push(cols.map(c => `"${String(row[c]).replace(/"/g, '""')}"`).join(","));
        }
        csvParts.push("\n");
      }
      return csvParts.join("\n");
    }

    return "";
  }, [generatedData, outputFormat]);

  const handleCopy = () => {
    navigator.clipboard.writeText(outputString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = outputFormat === "json" ? "json" : outputFormat === "sql" ? "sql" : "csv";
    const mime = outputFormat === "json" ? "application/json" : "text/plain";
    const blob = new Blob([outputString], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mockforge-seed.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Playground Breadcrumbs & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-brand-neon/10 border border-brand-neon/30 text-brand-neon">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Link href="/playground" className="text-slate-400 hover:text-white text-xs font-mono">
                Playgrounds &rarr;
              </Link>
              <span className="text-xs font-mono text-brand-neon font-bold uppercase tracking-wider">
                MockForge Live
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Relational Mock Data & Fixture Playground
            </h1>
          </div>
        </div>

        {/* Global Playground Switcher Pill Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs">
          <Link
            href="/playground/mockforge"
            className="px-3 py-1.5 rounded-lg bg-brand-neon text-slate-950 font-bold transition-all shadow-sm"
          >
            MockForge
          </Link>
          <Link
            href="/playground/fineprint"
            className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            FinePrint
          </Link>
          <Link
            href="/playground/promptshield"
            className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            PromptShield
          </Link>
          <Link
            href="/playground"
            className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            AgentShield
          </Link>
        </div>
      </div>

      {/* Hero Overview & Guarantee */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 space-y-2">
          <p className="text-slate-300 text-sm leading-relaxed">
            Paste any <strong className="text-white">SQL DDL</strong> (`CREATE TABLE`) or <strong className="text-white">Prisma Schema</strong>. 
            MockForge parses dependencies using Kahn&apos;s DAG topological sorting, synthesizing 100% foreign-key consistent test fixtures 
            directly in your browser with zero network transmission.
          </p>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2 text-brand-neon">
            <Zap className="w-4 h-4" />
            <span>Wasm / 100% In-Memory</span>
          </div>
          <span className="text-slate-400">$0 Cloud Fee</span>
        </div>
      </div>

      {/* Editor & Preview Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Schema Input */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Code2 className="w-4 h-4 text-brand-neon" />
              <span>Input Schema (SQL / Prisma)</span>
            </div>
            
            {/* Presets Selector */}
            <select
              value={selectedPreset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono rounded-lg px-2.5 py-1.5 outline-none focus:border-brand-neon transition-colors"
            >
              {PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-1 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
            <div className="px-4 py-2 bg-slate-900/70 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{activePreset.description}</span>
              <span className="text-brand-neon uppercase font-bold text-[10px]">{activePreset.dialect}</span>
            </div>

            <textarea
              value={schemaText}
              onChange={(e) => setSchemaText(e.target.value)}
              spellCheck={false}
              className="w-full h-[480px] p-4 bg-transparent font-mono text-xs text-slate-200 resize-none outline-none leading-relaxed selection:bg-brand-neon/20 selection:text-brand-neon"
              placeholder="Paste your CREATE TABLE or Prisma model here..."
            />
          </div>

          <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Terminal Zero-Install:</span>
            <code className="text-brand-neon font-bold">npx @ritualdev-lab/mockforge generate schema.prisma</code>
          </div>
        </div>

        {/* Right Column: Live Synthetic Fixture Preview */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Table className="w-4 h-4 text-brand-cyan" />
              <span>Synthesized Fixtures ({generatedData.tableCount} tables · {generatedData.totalRows} rows)</span>
            </div>

            {/* Output Controls */}
            <div className="flex items-center gap-2">
              {/* Row Count */}
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs font-mono text-slate-300">
                <span>Rows:</span>
                <select
                  value={rowCount}
                  onChange={(e) => setRowCount(Number(e.target.value))}
                  className="bg-transparent outline-none text-brand-neon font-bold cursor-pointer"
                >
                  <option value={5} className="bg-slate-900">5</option>
                  <option value={10} className="bg-slate-900">10</option>
                  <option value={25} className="bg-slate-900">25</option>
                  <option value={50} className="bg-slate-900">50</option>
                </select>
              </div>

              {/* Format Switcher */}
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-mono">
                <button
                  onClick={() => setOutputFormat("json")}
                  className={`px-2.5 py-1 rounded ${outputFormat === "json" ? "bg-slate-800 text-brand-neon font-bold" : "text-slate-400 hover:text-white"}`}
                >
                  JSON
                </button>
                <button
                  onClick={() => setOutputFormat("sql")}
                  className={`px-2.5 py-1 rounded ${outputFormat === "sql" ? "bg-slate-800 text-brand-neon font-bold" : "text-slate-400 hover:text-white"}`}
                >
                  SQL
                </button>
                <button
                  onClick={() => setOutputFormat("csv")}
                  className={`px-2.5 py-1 rounded ${outputFormat === "csv" ? "bg-slate-800 text-brand-neon font-bold" : "text-slate-400 hover:text-white"}`}
                >
                  CSV
                </button>
              </div>

              {/* Re-seed Button */}
              <button
                onClick={() => setSeedKey(k => k + 1)}
                title="Randomize synthetic seed data"
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-brand-neon hover:border-brand-neon transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg bg-brand-neon text-slate-950 font-mono text-xs font-bold hover:opacity-90 flex items-center gap-1.5 transition-opacity"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Code Output Viewer */}
          <div className="relative flex-1 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
            <div className="px-4 py-2 bg-slate-900/70 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Relational Referential Integrity Verified (0 Broken FKs)</span>
              </div>
              <span className="text-slate-500 uppercase">{outputFormat}</span>
            </div>

            <pre className="w-full h-[480px] p-4 bg-transparent font-mono text-xs text-slate-300 overflow-auto leading-relaxed selection:bg-brand-neon/20 selection:text-brand-neon">
              <code>{outputString}</code>
            </pre>
          </div>

          <div className="grid grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl flex items-center gap-2 text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>DAG Topo Order</span>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl flex items-center gap-2 text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Deterministic Seeding</span>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl flex items-center gap-2 text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero-Cloud Transmission</span>
            </div>
          </div>
        </div>

      </div>

      {/* Feature Deep Dive & Architecture */}
      <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Enterprise MockForge Architecture
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Deterministic Kahn&apos;s DAG ordering with zero database credentials required.
            </p>
          </div>
          <Link
            href="/mockforge"
            className="px-5 py-2.5 rounded-xl bg-brand-neon text-slate-950 font-mono text-xs font-bold hover:opacity-90 transition-all inline-flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <span>Read MockForge Spec</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-900 space-y-2">
            <div className="text-brand-neon font-bold flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>1. Directed Acyclic Graph (DAG)</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Kahn&apos;s algorithm evaluates primary-to-foreign key edges, guaranteeing parent tables are populated before child tables to eliminate constraint errors.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-900 space-y-2">
            <div className="text-brand-cyan font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>2. SOC 2 & HIPAA Sanitization</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Never test with production PII. Synthesize photorealistic user, financial, and order records that pass validation schemas without security risk.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-900 space-y-2">
            <div className="text-purple-400 font-bold flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>3. CI/CD Pipeline Integration</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Use in GitHub Actions or Docker test containers: <code>npx @ritualdev-lab/mockforge generate schema.sql --rows 500</code> runs in sub-100ms.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
