"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  Lock,
  Code2,
  FileCode,
  Terminal,
  Zap,
  Globe,
  Smartphone,
  Server,
  DollarSign,
  TrendingUp,
  Percent,
  Coins
} from "lucide-react";

export default function FintechSdkPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<"kotlin" | "swift" | "ts" | "python">("kotlin");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [useCase, setUseCase] = useState("Banking / Loan Origination");
  const [tier, setTier] = useState<"single_7500" | "fleet_15000">("single_7500");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-4">
        <Link href="/" className="hover:text-brand-cyan transition-colors">Home</Link>
        <span>/</span>
        <Link href="/enterprise" className="hover:text-brand-cyan transition-colors">Enterprise</Link>
        <span>/</span>
        <span className="text-brand-cyan font-bold">Embedded Fintech KMP SDK</span>
      </div>

      {/* Hero Header */}
      <div className="space-y-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-brand-cyan border border-cyan-500/30 text-xs font-mono font-bold">
          <Cpu className="w-3.5 h-3.5 animate-pulse" />
          <span>Decoupled from All-in-One Calculator Plus • 170+ Audited Math Engines</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Embedded Fintech &amp; <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-400 to-indigo-400">
            Computational Math Engine SDK
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-3xl mx-auto">
          License battle-tested, arbitrary-precision financial and mathematical calculation engines compiled natively via Kotlin Multiplatform (KMP) across Android, iOS, JVM, WebAssembly, and Desktop. Zero floating-point drift, zero network latency, and 100% air-gapped local execution.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#licensing-tiers"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:opacity-95 transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>OEM Commercial Licensing (from $7,500/yr)</span>
          </a>
          <a
            href="#code-showcase"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-mono font-bold flex items-center gap-2 transition-colors"
          >
            <span>Explore Code Samples &amp; Benchmarks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Target Platforms Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center space-y-2">
          <Smartphone className="w-5 h-5 mx-auto text-brand-cyan" />
          <div className="text-xs font-mono font-bold text-white">Android Native</div>
          <div className="text-[10px] font-mono text-slate-400">Kotlin / Jetpack Compose</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center space-y-2">
          <Smartphone className="w-5 h-5 mx-auto text-indigo-400" />
          <div className="text-xs font-mono font-bold text-white">Apple iOS / macOS</div>
          <div className="text-[10px] font-mono text-slate-400">Swift / SwiftUI / XCFramework</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center space-y-2">
          <Server className="w-5 h-5 mx-auto text-emerald-400" />
          <div className="text-xs font-mono font-bold text-white">Enterprise JVM</div>
          <div className="text-[10px] font-mono text-slate-400">Java / Spring Boot / Quarkus</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center space-y-2">
          <Globe className="w-5 h-5 mx-auto text-amber-400" />
          <div className="text-xs font-mono font-bold text-white">Web &amp; Cloud Edge</div>
          <div className="text-[10px] font-mono text-slate-400">WebAssembly / TypeScript</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center space-y-2 col-span-2 sm:col-span-1">
          <Cpu className="w-5 h-5 mx-auto text-purple-400" />
          <div className="text-xs font-mono font-bold text-white">Native C ABI</div>
          <div className="text-[10px] font-mono text-slate-400">Rust / C++ / Embedded</div>
        </div>
      </div>

      {/* Core Architectural Invariants */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-bold">
            Zero Compromise Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Why Tier-1 Fintechs License RitualDev Engines
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-brand-cyan flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Zero IEEE-754 Floating Drift</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard binary floating-point representation causes catastrophic rounding errors in interest accruals and tax calculations. Our computational core executes strictly on deterministic arbitrary-precision fixed-point representations.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Air-Gapped Local-First Execution</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero network calls, zero external API latency, and zero telemetry. Client financial records and mathematical inputs never leave device memory, guaranteeing statutory compliance with GDPR, DPDP Act 2023, and SOC 2 Type II.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Single Canonical Source of Truth</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Written once in Kotlin Multiplatform and compiled natively for every target. Eliminate discrepancies where iOS and Android calculations yield divergent numbers due to differing platform math libraries.
            </p>
          </div>
        </div>
      </section>

      {/* 170+ Math Engine Domains */}
      <section className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800">
        <div>
          <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1 font-bold">
            Catalog Overview
          </div>
          <h2 className="text-2xl font-bold text-white">
            170+ Pre-Audited Computational Modules
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Engineered over 6 years of consumer deployment across 500,000+ active mobile installations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-emerald-400 font-bold text-xs font-mono flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" />
              <span>Banking &amp; Amortization</span>
            </div>
            <ul className="text-[11px] text-slate-400 space-y-1 font-mono">
              <li>• EMI &amp; Reducing Balance</li>
              <li>• Balloon &amp; Prepayment Schedules</li>
              <li>• Compound APR vs APY</li>
              <li>• Debt-to-Income (DTI) Ratios</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-brand-cyan font-bold text-xs font-mono flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>Quantitative Finance</span>
            </div>
            <ul className="text-[11px] text-slate-400 space-y-1 font-mono">
              <li>• Black-Scholes European Options</li>
              <li>• Greeks (Delta, Gamma, Vega, Theta)</li>
              <li>• Monte Carlo Trajectory Sim</li>
              <li>• Yield to Maturity (YTM)</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-bold text-xs font-mono flex items-center gap-1.5">
              <Percent className="w-4 h-4" />
              <span>Tax &amp; Depreciation</span>
            </div>
            <ul className="text-[11px] text-slate-400 space-y-1 font-mono">
              <li>• Progressive Slab Tax Brackets</li>
              <li>• GST / VAT Composite Invoicing</li>
              <li>• MACRS &amp; Double Declining Balance</li>
              <li>• Capital Gains Indexation</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-purple-400 font-bold text-xs font-mono flex items-center gap-1.5">
              <Coins className="w-4 h-4" />
              <span>Statistical &amp; Currency</span>
            </div>
            <ul className="text-[11px] text-slate-400 space-y-1 font-mono">
              <li>• Triangular Arbitrage Discovery</li>
              <li>• Covariance &amp; Correlation Matrices</li>
              <li>• Sharpe &amp; Sortino Risk Ratios</li>
              <li>• Forward Rate Agreements (FRA)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Code Showcase Section */}
      <section id="code-showcase" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1 font-bold">
              Multiplatform Integration
            </div>
            <h2 className="text-2xl font-bold text-white">
              Idiomatic SDK Across Your Technology Stack
            </h2>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setSelectedLanguage("kotlin")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${selectedLanguage === "kotlin" ? "bg-brand-cyan text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
            >
              Kotlin
            </button>
            <button
              onClick={() => setSelectedLanguage("swift")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${selectedLanguage === "swift" ? "bg-brand-cyan text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
            >
              Swift
            </button>
            <button
              onClick={() => setSelectedLanguage("ts")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${selectedLanguage === "ts" ? "bg-brand-cyan text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
            >
              TypeScript
            </button>
            <button
              onClick={() => setSelectedLanguage("python")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${selectedLanguage === "python" ? "bg-brand-cyan text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
            >
              Python
            </button>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-x-auto">
          {selectedLanguage === "kotlin" && (
            <pre className="text-slate-300 leading-relaxed">
{`import in.ritualdev.fintech.engine.AmortizationEngine
import in.ritualdev.fintech.model.LoanParameters
import in.ritualdev.fintech.decimal.BigDecimal

val engine = AmortizationEngine()
val schedule = engine.calculateReducingBalance(
    LoanParameters(
        principal = BigDecimal("500000.00"),
        annualInterestRatePercent = BigDecimal("7.25"),
        tenureMonths = 360,
        prepaymentAllowance = true
    )
)

println("Monthly EMI: \${schedule.monthlyEmi}")
println("Total Interest Payable: \${schedule.totalInterest}")
println("Final Payoff Date: \${schedule.projectedPayoffDate}")`}
            </pre>
          )}

          {selectedLanguage === "swift" && (
            <pre className="text-slate-300 leading-relaxed">
{`import RitualDevFintechSDK

let engine = OptionsPricingEngine()
let greeks = engine.calculateBlackScholes(
    spotPrice: Decimal(185.50),
    strikePrice: Decimal(190.00),
    riskFreeRate: Decimal(0.045),
    volatility: Decimal(0.24),
    timeToExpiryYears: Decimal(0.25),
    optionType: .call
)

print("Call Price: \\(greeks.theoreticalPrice)")
print("Delta: \\(greeks.delta) | Gamma: \\(greeks.gamma)")
print("Theta: \\(greeks.theta) | Vega: \\(greeks.vega)")`}
            </pre>
          )}

          {selectedLanguage === "ts" && (
            <pre className="text-slate-300 leading-relaxed">
{`import { TaxEngine, CurrencyArbitrage } from '@ritualdev/fintech-wasm';

const taxEngine = new TaxEngine({ regime: 'CORPORATE_2026', jurisdiction: 'US' });
const taxSummary = taxEngine.calculateDepreciation({
  assetCost: '1200000.00',
  salvageValue: '50000.00',
  usefulLifeYears: 7,
  method: 'MACRS_200_PERCENT'
});

console.log('Year 1 Depreciation:', taxSummary.schedule[0].deduction);`}
            </pre>
          )}

          {selectedLanguage === "python" && (
            <pre className="text-slate-300 leading-relaxed">
{`import ritualdev_fintech as rdf

portfolio = rdf.PortfolioRiskEngine()
var_99 = portfolio.calculate_value_at_risk(
    asset_weights=[0.40, 0.35, 0.25],
    covariance_matrix=[[0.04, 0.01, 0.02], [0.01, 0.05, 0.015], [0.02, 0.015, 0.06]],
    confidence_interval=0.99,
    horizon_days=10
)

print(f"10-Day 99% VaR: {var_99.monetary_loss:.2f}")`}
            </pre>
          )}
        </div>
      </section>

      {/* OEM Commercial Licensing Tiers */}
      <section id="licensing-tiers" className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-bold">
            OEM Commercial Licensing
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Predictable Annual Licensing for Enterprise Platforms
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Single Product OEM */}
          <div
            onClick={() => setTier("single_7500")}
            className={`cursor-pointer rounded-3xl p-6 sm:p-8 border transition-all ${
              tier === "single_7500"
                ? "bg-slate-900/90 border-brand-cyan shadow-[0_0_30px_rgba(56,189,248,0.2)]"
                : "bg-slate-950 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-brand-cyan border border-cyan-500/30">
                Single Product OEM
              </span>
              <span className="text-xs font-mono text-slate-400">Commercial Distribution</span>
            </div>

            <div className="mt-4 mb-2">
              <span className="text-4xl font-extrabold text-white">$7,500</span>
              <span className="text-slate-400 text-xs font-mono ml-2">/ year</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Embed all 170+ computational engines into a single commercial mobile app, SaaS platform, or desktop utility.
            </p>

            <ul className="space-y-2.5 text-xs font-mono text-slate-300 border-t border-slate-800 pt-5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlimited End-User Client Instances</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pre-compiled KMP Binaries (Android, iOS, WASM, JVM)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Royalty-Free Commercial Distribution Rights</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Quarterly Precision Updates &amp; Regulatory Changes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Enterprise SLA: Next-Business-Day Triage</span>
              </li>
            </ul>
          </div>

          {/* Enterprise Fleet OEM */}
          <div
            onClick={() => setTier("fleet_15000")}
            className={`cursor-pointer rounded-3xl p-6 sm:p-8 border transition-all ${
              tier === "fleet_15000"
                ? "bg-slate-900/90 border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.25)]"
                : "bg-slate-950 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                Enterprise Fleet OEM
              </span>
              <span className="text-xs font-mono text-amber-400 font-bold">★ Full Source Access</span>
            </div>

            <div className="mt-4 mb-2">
              <span className="text-4xl font-extrabold text-white">$15,000 – $20,000</span>
              <span className="text-slate-400 text-xs font-mono ml-2">/ year</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              For financial institutions, brokerages, and core banking systems requiring multi-app licensing, source access, and bespoke algorithms.
            </p>

            <ul className="space-y-2.5 text-xs font-mono text-slate-300 border-t border-slate-800 pt-5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Multi-Application &amp; White-Label Redistribution</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full Source Code Access &amp; Compiler Toolchain</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Custom Math Engine Engineering (Up to 3 Bespoke Engines/yr)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Certified Cryptographic &amp; Numerical Stability Attestations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24/7 Dedicated Slack War-Room with Senior Quant Engineers</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* OEM Inquiry Form */}
      <section className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 max-w-4xl mx-auto space-y-6">
        <div>
          <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1 font-bold">
            OEM Procurement &amp; Trial Access
          </div>
          <h2 className="text-2xl font-bold text-white">
            Request Enterprise OEM SDK Evaluation Kit
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Receive sandbox binaries, private Maven/SwiftPM repository credentials, and sample test vectors.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono space-y-2">
            <div className="font-bold text-sm">✓ Evaluation Request Dispatched</div>
            <p>Our computational licensing team will review your application and send private artifact registry credentials to <b>{contactEmail}</b> within 4 business hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Company / Institution Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Wealth Management / Citadel"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Corporate Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="licensing@institution.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Primary Use Case</label>
                <select
                  value={useCase}
                  onChange={(e) => setUseCase(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-cyan"
                >
                  <option value="Banking / Loan Origination">Banking &amp; Loan Origination</option>
                  <option value="Trading / Quantitative Analytics">Trading &amp; Quantitative Analytics</option>
                  <option value="Consumer Fintech Mobile Application">Consumer Fintech Mobile Application</option>
                  <option value="Enterprise ERP & Tax Invoicing">Enterprise ERP &amp; Tax Invoicing</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Target OEM Tier</label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-cyan"
                >
                  <option value="single_7500">Single Product OEM ($7,500/year)</option>
                  <option value="fleet_15000">Enterprise Fleet OEM ($15,000 – $20,000/year)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
              <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-brand-cyan" />
                <span>NDA &amp; Trial Agreement executed electronically upon approval</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-500 hover:opacity-95 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
              >
                <span>Request Evaluation Credentials</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </section>

    </div>
  );
}
