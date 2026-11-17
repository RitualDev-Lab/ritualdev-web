"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, DollarSign, Calculator, ArrowRight, Shield, Activity, Sparkles, TrendingDown, Layers, Terminal } from "lucide-react";

interface ModelPricing {
  name: string;
  provider: string;
  inputPerMillion: number;
  outputPerMillion: number;
}

const MODELS: Record<string, ModelPricing> = {
  "claude-3-5-sonnet": { name: "Claude 3.5 Sonnet", provider: "Anthropic", inputPerMillion: 3.0, outputPerMillion: 15.0 },
  "gpt-4o": { name: "GPT-4o", provider: "OpenAI", inputPerMillion: 2.5, outputPerMillion: 10.0 },
  "claude-3-opus": { name: "Claude 3 Opus", provider: "Anthropic", inputPerMillion: 15.0, outputPerMillion: 75.0 },
  "gemini-1-5-pro": { name: "Gemini 1.5 Pro", provider: "Google", inputPerMillion: 1.25, outputPerMillion: 5.0 },
};

export default function FinOpsCalculatorPage() {
  const [modelKey, setModelKey] = useState<string>("claude-3-5-sonnet");
  const [inputTokensPerRequest, setInputTokensPerRequest] = useState<number>(35000);
  const [requestsPerDay, setRequestsPerDay] = useState<number>(5000);
  const [compactionRatePercent, setCompactionRatePercent] = useState<number>(98);

  const model = MODELS[modelKey];

  // Computations
  const totalMonthlyRequests = requestsPerDay * 30;
  const rawMonthlyInputTokens = totalMonthlyRequests * inputTokensPerRequest;
  const rawMonthlyInputCost = (rawMonthlyInputTokens / 1000000) * model.inputPerMillion;

  // With SkillPrism + prompt cache stacking (e.g. 98% compaction)
  const compactedTokens = rawMonthlyInputTokens * (1 - compactionRatePercent / 100);
  const compactedMonthlyCost = (compactedTokens / 1000000) * model.inputPerMillion;

  const monthlySavingsDollars = rawMonthlyInputCost - compactedMonthlyCost;
  const annualSavingsDollars = monthlySavingsDollars * 12;

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-800 pb-4">
        <Link href="/" className="hover:text-emerald-400">Home</Link>
        <span>/</span>
        <span className="text-emerald-400 font-bold">SkillPrism FinOps Calculator</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Token FinOps ROI Modeler • OpenTelemetry Native</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          AI Agent Token FinOps <span className="text-emerald-400">&amp; ROI Calculator</span>
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
          Autonomous coding agents repeatedly dump thousands of tool schemas, git histories, and AST snippets into prompt context. Stacking <span className="text-white font-bold">SkillPrism JIT semantic compaction</span> with native prompt caching cuts prompt token consumption by <span className="text-emerald-400 font-bold">98%+</span>.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-8">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Agent Workload Parameters</h2>
          </div>

          {/* Model Selector */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 flex justify-between">
              <span>Primary Foundation LLM</span>
              <span className="text-xs font-mono text-emerald-400">${model.inputPerMillion}/M tokens</span>
            </label>
            <select
              value={modelKey}
              onChange={(e) => setModelKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
            >
              {Object.entries(MODELS).map(([k, m]) => (
                <option key={k} value={k}>
                  {m.name} ({m.provider}) — ${m.inputPerMillion}/M Input
                </option>
              ))}
            </select>
          </div>

          {/* Input Tokens Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <label className="font-semibold text-slate-300">Avg Prompt Tokens per Tool Call</label>
              <span className="font-mono text-emerald-400 font-bold bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                {inputTokensPerRequest.toLocaleString()} tokens
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="100000"
              step="5000"
              value={inputTokensPerRequest}
              onChange={(e) => setInputTokensPerRequest(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-xs font-mono text-slate-500">
              <span>5,000 (Small)</span>
              <span>35,000 (Typical Multi-Tool Agent)</span>
              <span>100,000 (Monorepo Context)</span>
            </div>
          </div>

          {/* Requests Per Day Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <label className="font-semibold text-slate-300">Autonomous Agent Invocations / Day</label>
              <span className="font-mono text-emerald-400 font-bold bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                {requestsPerDay.toLocaleString()} reqs/day
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={requestsPerDay}
              onChange={(e) => setRequestsPerDay(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-xs font-mono text-slate-500">
              <span>500 (Early Pilot)</span>
              <span>5,000 (Engineering Org)</span>
              <span>50,000 (Enterprise Fleet)</span>
            </div>
          </div>

          {/* Compaction Rate Target */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <label className="font-semibold text-slate-300">SkillPrism Target Compaction Rate</label>
              <span className="font-mono text-emerald-400 font-bold bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                {compactionRatePercent}% Reduction
              </span>
            </div>
            <input
              type="range"
              min="80"
              max="99"
              step="1"
              value={compactionRatePercent}
              onChange={(e) => setCompactionRatePercent(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-xs font-mono text-slate-500">
              <span>80% (Conservative)</span>
              <span>96.7% (Baseline Benchmark)</span>
              <span>98%+ (Cache Stacked)</span>
            </div>
          </div>
        </div>

        {/* Output Cards Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/30 to-slate-950 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-emerald-900/50 pb-4">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">Estimated FinOps Savings</span>
              <TrendingDown className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400">Net Monthly Savings</span>
              <p className="text-4xl sm:text-5xl font-black text-white">
                ${Math.round(monthlySavingsDollars).toLocaleString()}
                <span className="text-slate-400 text-base font-normal"> / mo</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 font-mono text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Annual Compute Saved:</span>
                <span className="text-emerald-400 font-bold">${Math.round(annualSavingsDollars).toLocaleString()} / yr</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tokens Saved / Month:</span>
                <span className="text-white">{Math.round((rawMonthlyInputTokens - compactedTokens) / 1000000).toLocaleString()}M tokens</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Baseline Bill:</span>
                <span className="text-rose-400 line-through">${Math.round(rawMonthlyInputCost).toLocaleString()} / mo</span>
              </div>
              <div className="flex justify-between text-slate-400 border-t border-slate-800 pt-2 font-semibold">
                <span>SkillPrism Bill:</span>
                <span className="text-emerald-400 font-bold">${Math.round(compactedMonthlyCost).toLocaleString()} / mo</span>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-3 pt-2">
              <Link
                href="/enterprise/pilot"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-center block transition shadow-lg text-sm"
              >
                Claim FinOps Pilot ($25k–$50k/yr)
              </Link>
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>npx @ritualdev-lab/skillprism init</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
