"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  FileText, 
  Terminal, 
  Scale, 
  Copy, 
  Check, 
  RotateCcw, 
  Download, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileCode, 
  Sparkles, 
  Eye, 
  ExternalLink,
  Mail,
  Zap,
  Layers,
  Lock
} from "lucide-react";

interface ContractPreset {
  id: string;
  name: string;
  category: "SaaS Terms" | "NDA" | "Contractor Agreement" | "Lease Agreement";
  description: string;
  terms: string;
}

const CONTRACT_PRESETS: ContractPreset[] = [
  {
    id: "predatory-saas",
    name: "Enterprise SaaS Vendor MSA",
    category: "SaaS Terms",
    description: "Contains AI training exfiltration, perpetual IP license, and auto-renewal traps",
    terms: `SECTION 8. INTELLECTUAL PROPERTY & AI TRAINING
8.1 User Content. Customer hereby grants Vendor a perpetual, irrevocable, worldwide, royalty-free license to use, reproduce, modify, and distribute all data, prompts, and submissions uploaded to the platform.
8.2 Machine Learning. Vendor reserves the right to use customer inputs, proprietary code snippets, and data to train artificial intelligence models, algorithms, and foundational machine learning systems.

SECTION 12. TERM, RENEWAL & PRICE ESCALATION
12.1 Auto-Renewal. The subscription term will automatically renew indefinitely for successive 12-month periods unless canceled at least 60 days prior to the expiration of the current term.
12.2 Price Changes. Vendor reserves the right to unilaterally modify subscription prices and fees at any time without prior written notice. Continued use of the platform shall constitute acceptance of adjusted rates.

SECTION 15. DISPUTE RESOLUTION & WAIVERS
15.1 Mandatory Arbitration. All claims arising out of this agreement shall be settled by binding individual arbitration. Customer explicitly waives any right to jury trial or to participate in a class action or representative proceeding.`
  },
  {
    id: "mutual-nda",
    name: "Mutual NDA (With Residual Memory Trap)",
    category: "NDA",
    description: "Contains memory residuals carve-out and asymmetric one-way legal fee shifting",
    terms: `SECTION 4. RESIDUAL MEMORY EXCEPTION
4.1 Residuals. Notwithstanding anything to the contrary, either party may freely use for any purpose the general ideas, concepts, and techniques retained in the unaided memory of personnel who had access to Confidential Information, without compensation or restriction.

SECTION 9. REMEDIES & ATTORNEY'S FEES
9.1 Indemnification. Receiving Party agrees to defend, indemnify and hold harmless Disclosing Party from all damages. In any proceeding arising hereunder, Disclosing Party shall be entitled to recover full attorney's fees from Receiving Party if Disclosing Party prevails, with no reciprocal fee recovery permitted.`
  },
  {
    id: "freelance-contract",
    name: "Independent Contractor Agreement",
    category: "Contractor Agreement",
    description: "Contains 24/7 off-hours IP assignment and overbroad non-compete covenants",
    terms: `SECTION 5. INTELLECTUAL PROPERTY ASSIGNMENT
5.1 Inventions Assignment. Contractor agrees that all ideas, inventions, source code, and improvements developed during the term of this agreement—whether on company time, personal time, or using personal equipment—shall belong exclusively to Company as work made for hire.

SECTION 7. RESTRICTIVE COVENANTS
7.1 Non-Compete. Contractor agrees that for a period of 24 months following termination, Contractor shall not directly or indirectly develop, consult, or provide services to any entity in the technology sector worldwide.`
  }
];

interface GotchaDetection {
  id: string;
  title: string;
  category: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  deduction: number;
  snippet: string;
  plainEnglish: string;
  redlineCounter: string;
}

export default function FinePrintPlayground() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("predatory-saas");
  const [contractText, setContractText] = useState<string>(CONTRACT_PRESETS[0].terms);
  const [copiedRedline, setCopiedRedline] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"audit" | "redline" | "email">("audit");

  const activePreset = CONTRACT_PRESETS.find(p => p.id === selectedPresetId) || CONTRACT_PRESETS[0];

  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    const p = CONTRACT_PRESETS.find(x => x.id === presetId);
    if (p) setContractText(p.terms);
  };

  // Instant In-Browser Clause Risk Evaluation Engine
  const analysis = useMemo(() => {
    const text = contractText;
    const gotchas: GotchaDetection[] = [];

    // Rule 1: AI Model Training Consent
    if (/use.*(?:data|prompts|inputs|code).*to\s+train.*(?:ai|models|machine\s+learning|algorithms)/is.test(text)) {
      gotchas.push({
        id: "GOTCHA_AI_TRAINING",
        title: "Customer Data & Code Exfiltration for AI Training",
        category: "AI Data Privacy",
        severity: "CRITICAL",
        deduction: 30,
        snippet: "use customer inputs, proprietary code snippets, and data to train artificial intelligence models",
        plainEnglish: "The vendor claims the legal right to feed your private code, prompts, and proprietary documents into their AI models without compensation.",
        redlineCounter: "STRIKE OUT clause entirely. Insert: 'Vendor explicitly agrees NOT to use Customer data, inputs, or code to train, tune, or improve any machine learning models without express written consent.'"
      });
    }

    // Rule 2: Perpetual IP License
    if (/perpetual.*irrevocable.*(?:worldwide|royalty-free).*license/is.test(text)) {
      gotchas.push({
        id: "GOTCHA_IP_EXFILTRATION",
        title: "Perpetual & Irrevocable License to Your IP",
        category: "Intellectual Property",
        severity: "CRITICAL",
        deduction: 25,
        snippet: "perpetual, irrevocable, worldwide, royalty-free license to use, reproduce, modify, and distribute",
        plainEnglish: "Even after closing your account, the vendor retains perpetual ownership rights to reproduce, modify, and monetize whatever you upload.",
        redlineCounter: "LIMIT license duration strictly to active subscription term: '...a non-exclusive, revocable license strictly necessary to host Customer content during the term.'"
      });
    }

    // Rule 3: Auto-Renewal & Stealth Price Changes
    if (/automatic(?:ally)?\s+renew/is.test(text) || /unilateral(?:ly)?\s+modify.*(?:price|fee)/is.test(text)) {
      gotchas.push({
        id: "GOTCHA_AUTO_RENEWAL",
        title: "Perpetual Auto-Renewal & Unilateral Price Hikes",
        category: "Billing & Subscriptions",
        severity: "HIGH",
        deduction: 20,
        snippet: "automatically renew indefinitely... unilaterally modify subscription prices and fees at any time",
        plainEnglish: "Your credit card will be billed automatically year after year, and the vendor reserves the right to increase rates without prior notification.",
        redlineCounter: "MANDATE 60-day advance email notice before any price adjustments, with guaranteed right to terminate without penalty."
      });
    }

    // Rule 4: Mandatory Arbitration & Class Action Waiver
    if (/binding\s+individual\s+arbitration/is.test(text) || /waive.*(?:class\s+action|jury\s+trial)/is.test(text)) {
      gotchas.push({
        id: "GOTCHA_ARBITRATION",
        title: "Mandatory Arbitration & Class Action Ban",
        category: "Dispute Resolution",
        severity: "CRITICAL",
        deduction: 30,
        snippet: "settled by binding individual arbitration. Customer explicitly waives any right to jury trial or class action",
        plainEnglish: "You forfeit your constitutional right to take the vendor to court or participate in a class-action lawsuit if they leak your data.",
        redlineCounter: "PRESERVE court jurisdiction: 'Disputes may be brought in courts of competent jurisdiction. Mutual waiver of punitive damages applies.'"
      });
    }

    // Rule 5: Residual Memory Exception
    if (/residual\s+memory|retained\s+in\s+the\s+unaided\s+memory/is.test(text)) {
      gotchas.push({
        id: "GOTCHA_RESIDUALS",
        title: "Residual Memory Trade Secret Exemption",
        category: "Trade Secrets & NDA",
        severity: "HIGH",
        deduction: 20,
        snippet: "freely use for any purpose the general ideas, concepts, and techniques retained in the unaided memory",
        plainEnglish: "Employees who view your confidential code or trade secrets can freely replicate your product if they claim they 'remembered' it without written notes.",
        redlineCounter: "STRIKE residual memory clause entirely or exclude proprietary algorithms and source code architecture."
      });
    }

    // Rule 6: 24/7 Off-Hours Inventions Assignment
    if (/personal\s+time.*personal\s+equipment.*belong\s+exclusively/is.test(text) || /during\s+the\s+term.*whether\s+on\s+company\s+time/is.test(text)) {
      gotchas.push({
        id: "GOTCHA_INVENTIONS",
        title: "24/7 Off-Hours Inventions Assignment",
        category: "Employment & IP",
        severity: "CRITICAL",
        deduction: 30,
        snippet: "whether on company time, personal time, or using personal equipment—shall belong exclusively to Company",
        plainEnglish: "The company claims ownership of your weekend side projects, personal GitHub repos, and inventions built entirely on your own time.",
        redlineCounter: "LIMIT to company projects: 'Inventions developed strictly during company hours using company equipment directly relating to company business.'"
      });
    }

    // Rule 7: Overbroad Non-Compete
    if (/not\s+directly\s+or\s+indirectly.*sector\s+worldwide/is.test(text)) {
      gotchas.push({
        id: "GOTCHA_NON_COMPETE",
        title: "Overbroad Worldwide Non-Compete Covenant",
        category: "Restrictive Covenants",
        severity: "HIGH",
        deduction: 20,
        snippet: "shall not directly or indirectly develop, consult, or provide services to any entity in the technology sector worldwide",
        plainEnglish: "Prohibits you from working as a software developer anywhere in the world for 2 years after contract end.",
        redlineCounter: "STRIKE non-compete under FTC 2024 Non-Compete Rule. Substitute reasonable non-solicitation of clients only."
      });
    }

    // Rule 8: Asymmetric Indemnity
    if (/indemnify\s+and\s+hold\s+harmless/is.test(text) && /no\s+reciprocal/is.test(text)) {
      gotchas.push({
        id: "GOTCHA_ASYMMETRIC_INDEMNITY",
        title: "One-Way Attorney's Fees & Indemnification Trap",
        category: "Legal Liability",
        severity: "HIGH",
        deduction: 20,
        snippet: "entitled to recover full attorney's fees... with no reciprocal fee recovery permitted",
        plainEnglish: "You pay their legal bills if they win, but they pay nothing if you prove they breached the contract.",
        redlineCounter: "MUTUALIZE legal fees and indemnification: 'The prevailing party in any dispute shall be entitled to recover reasonable legal fees.'"
      });
    }

    const totalDeductions = gotchas.reduce((sum, g) => sum + g.deduction, 0);
    const score = Math.max(0, 100 - totalDeductions);

    let grade: "A" | "B" | "C" | "F" = "A";
    let riskLevel: "SAFE" | "MODERATE" | "HIGH" | "CRITICAL" = "SAFE";

    if (score >= 90) {
      grade = "A";
      riskLevel = "SAFE";
    } else if (score >= 70) {
      grade = "B";
      riskLevel = "MODERATE";
    } else if (score >= 45) {
      grade = "C";
      riskLevel = "HIGH";
    } else {
      grade = "F";
      riskLevel = "CRITICAL";
    }

    return {
      score,
      grade,
      riskLevel,
      gotchas,
      totalGotchas: gotchas.length
    };
  }, [contractText]);

  // Generate Email Negotiation Draft
  const emailDraft = useMemo(() => {
    const lines = [
      `Subject: Re: Proposed Agreement - Requested Revisions & Clarifications`,
      ``,
      `Hi Team,`,
      ``,
      `Thanks for sharing the draft agreement. Our legal engineering team has completed an initial compliance audit. We are excited about moving forward, but need to resolve a few predatory terms before execution:`,
      ``
    ];

    analysis.gotchas.forEach((g, idx) => {
      lines.push(`${idx + 1}. ${g.title} (${g.severity})`);
      lines.push(`   Issue: ${g.plainEnglish}`);
      lines.push(`   Proposed Solution: ${g.redlineCounter}`);
      lines.push(``);
    });

    lines.push(`We've attached our marked-up redline copy for your review. Please let us know if these standard adjustments are acceptable so we can proceed with execution.`);
    lines.push(``);
    lines.push(`Best regards,`);
    lines.push(`Legal Engineering Team`);

    return lines.join("\n");
  }, [analysis]);

  // Generate Redline Proposal Draft
  const redlineDraft = useMemo(() => {
    let result = contractText;
    analysis.gotchas.forEach(g => {
      if (g.snippet && result.includes(g.snippet)) {
        result = result.replace(
          g.snippet,
          `\n[STRIKE OUT: ${g.snippet}]\n[PROPOSED INSERTION: ${g.redlineCounter}]\n`
        );
      }
    });
    return result;
  }, [contractText, analysis]);

  const copyRedline = () => {
    navigator.clipboard.writeText(redlineDraft);
    setCopiedRedline(true);
    setTimeout(() => setCopiedRedline(false), 2000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(emailDraft);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Link href="/playground" className="text-slate-400 hover:text-white text-xs font-mono">
                Playgrounds &rarr;
              </Link>
              <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
                FinePrint AI Live
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interactive Contract & NDA Clause Scanner
            </h1>
          </div>
        </div>

        {/* Global Playground Switcher Pill Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs">
          <Link
            href="/playground/mockforge"
            className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            MockForge
          </Link>
          <Link
            href="/playground/fineprint"
            className="px-3 py-1.5 rounded-lg bg-purple-500 text-slate-950 font-bold transition-all shadow-sm"
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
            Paste confusing contract clauses from an <strong className="text-white">NDA</strong>, <strong className="text-white">SaaS Terms of Service</strong>, or <strong className="text-white">Freelance Work-for-Hire</strong>.
            FinePrint&apos;s offline legal engine audits predatory dealbreakers, scores risk (0–100), and generates instant plain-English redline pushback drafts.
          </p>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2 text-purple-400">
            <Lock className="w-4 h-4" />
            <span>100% In-Memory Private</span>
          </div>
          <span className="text-slate-400">0 KB Cloud Egress</span>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Contract Input */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Contract Text / Clause Input</span>
            </div>
            
            {/* Presets */}
            <select
              value={selectedPresetId}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono rounded-lg px-2.5 py-1.5 outline-none focus:border-purple-400 transition-colors"
            >
              {CONTRACT_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-1 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
            <div className="px-4 py-2 bg-slate-900/70 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{activePreset.description}</span>
              <span className="text-purple-400 uppercase font-bold text-[10px]">{activePreset.category}</span>
            </div>

            <textarea
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
              spellCheck={false}
              className="w-full h-[480px] p-4 bg-transparent font-mono text-xs text-slate-200 resize-none outline-none leading-relaxed selection:bg-purple-500/20 selection:text-purple-400"
              placeholder="Paste contract paragraphs, Terms of Service, or NDA clauses here..."
            />
          </div>

          <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>CLI Zero-Install:</span>
            <code className="text-purple-400 font-bold">npx @ritualdev-lab/fineprint scan contract.pdf</code>
          </div>
        </div>

        {/* Right Column: Live Audit & Redline Output */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* View Tab Buttons */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-mono">
              <button
                onClick={() => setActiveTab("audit")}
                className={`px-3 py-1.5 rounded flex items-center gap-1.5 ${activeTab === "audit" ? "bg-slate-800 text-purple-400 font-bold" : "text-slate-400 hover:text-white"}`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Risk Scorecard ({analysis.totalGotchas})</span>
              </button>
              <button
                onClick={() => setActiveTab("redline")}
                className={`px-3 py-1.5 rounded flex items-center gap-1.5 ${activeTab === "redline" ? "bg-slate-800 text-purple-400 font-bold" : "text-slate-400 hover:text-white"}`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Tracked Redlines</span>
              </button>
              <button
                onClick={() => setActiveTab("email")}
                className={`px-3 py-1.5 rounded flex items-center gap-1.5 ${activeTab === "email" ? "bg-slate-800 text-purple-400 font-bold" : "text-slate-400 hover:text-white"}`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Negotiation Email</span>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              {activeTab === "redline" && (
                <button
                  onClick={copyRedline}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  {copiedRedline ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRedline ? "Copied" : "Copy Redline"}</span>
                </button>
              )}

              {activeTab === "email" && (
                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-lg bg-purple-500 text-slate-950 font-mono text-xs font-bold hover:opacity-90 flex items-center gap-1.5 transition-opacity"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? "Copied Email" : "Copy Email Draft"}</span>
                </button>
              )}
            </div>
          </div>

          {/* Main Card View */}
          <div className="relative flex-1 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
            
            {/* Header Score Banner */}
            <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`text-3xl font-extrabold ${analysis.score >= 80 ? "text-emerald-400" : analysis.score >= 50 ? "text-amber-400" : "text-rose-400"}`}>
                  {analysis.score}
                  <span className="text-xs text-slate-500 font-normal">/100</span>
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-slate-200">
                    Grade {analysis.grade} — {analysis.riskLevel}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    {analysis.totalGotchas} critical gotchas detected in submitted text
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">FinePrint Zero-Gotcha Engine</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Tab: Risk Scorecard */}
            {activeTab === "audit" && (
              <div className="p-4 space-y-3 overflow-y-auto max-h-[440px]">
                {analysis.gotchas.length === 0 ? (
                  <div className="p-10 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <p className="text-white font-bold text-sm">No Predatory Gotchas Found</p>
                    <p className="text-xs text-slate-400">The scanned text does not contain mandatory arbitration traps or covert AI model training consent.</p>
                  </div>
                ) : (
                  analysis.gotchas.map((gotcha) => (
                    <div
                      key={gotcha.id}
                      className={`p-4 rounded-xl border bg-slate-900/40 space-y-2.5 ${gotcha.severity === "CRITICAL" ? "border-rose-500/40" : "border-amber-500/40"}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-bold text-white text-xs flex items-center gap-2">
                          <span>{gotcha.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({gotcha.category})</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${gotcha.severity === "CRITICAL" ? "bg-rose-500/20 text-rose-400 border border-rose-500/40" : "bg-amber-500/20 text-amber-400 border border-amber-500/40"}`}>
                          {gotcha.severity} (-{gotcha.deduction})
                        </span>
                      </div>

                      <div className="p-2.5 rounded bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-900 italic">
                        &quot;{gotcha.snippet}&quot;
                      </div>

                      <div className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-purple-300">Plain English: </strong>
                        {gotcha.plainEnglish}
                      </div>

                      <div className="text-xs text-emerald-400 font-mono bg-emerald-950/20 p-2 rounded border border-emerald-900/30">
                        <strong>Redline Remedy: </strong>
                        {gotcha.redlineCounter}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab: Tracked Changes Redline */}
            {activeTab === "redline" && (
              <pre className="p-4 font-mono text-xs text-slate-300 overflow-auto max-h-[440px] leading-relaxed selection:bg-purple-500/20 selection:text-purple-400">
                <code>{redlineDraft}</code>
              </pre>
            )}

            {/* Tab: Negotiation Email */}
            {activeTab === "email" && (
              <pre className="p-4 font-mono text-xs text-slate-300 overflow-auto max-h-[440px] leading-relaxed selection:bg-purple-500/20 selection:text-purple-400">
                <code>{emailDraft}</code>
              </pre>
            )}

          </div>

          <div className="grid grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl flex items-center gap-2 text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>FTC & CRFA Compliant</span>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl flex items-center gap-2 text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Automated Redlines</span>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl flex items-center gap-2 text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero-Data Retention</span>
            </div>
          </div>
        </div>

      </div>

      {/* Feature Deep Dive */}
      <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Why FinePrint AI Replaces Expensive Legal Counsel
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Deterministic clause risk matrices + instant counterparty pushback emails.
            </p>
          </div>
          <Link
            href="/fineprint"
            className="px-5 py-2.5 rounded-xl bg-purple-500 text-slate-950 font-mono text-xs font-bold hover:opacity-90 transition-all inline-flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <span>Read FinePrint Spec</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-900 space-y-2">
            <div className="text-purple-400 font-bold flex items-center gap-2">
              <Scale className="w-4 h-4" />
              <span>1. Zero-Gotcha Scoring</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Evaluates mandatory arbitration waivers, perpetual IP exfiltration, auto-renewals, and memory residuals with strict weighted scoring.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-900 space-y-2">
            <div className="text-brand-cyan font-bold flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>2. 100% Client-Side Privacy</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Your trade secrets, unreleased patents, and confidential NDAs run in-memory inside your browser with 0 KB egress to external clouds.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-900 space-y-2">
            <div className="text-emerald-400 font-bold flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>3. 1-Click Negotiation Emails</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Generate professional, collaborative, or assertive legal emails to counterparty counsel detailing the exact clauses to strike before signing.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
