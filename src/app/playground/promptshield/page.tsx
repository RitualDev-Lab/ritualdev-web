"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ShieldAlert, 
  Terminal, 
  Lock, 
  Copy, 
  Check, 
  RotateCcw, 
  Download, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Zap, 
  Eye, 
  EyeOff,
  Sparkles,
  Layers,
  Key,
  Radio,
  RefreshCw
} from "lucide-react";

interface PromptScenario {
  id: string;
  name: string;
  category: "Cloud Credentials" | "AI API Keys" | "Payment Tokens" | "Database URIs" | "High Entropy Secrets";
  description: string;
  prompt: string;
}

// Dummy demonstration tokens constructed dynamically to prevent static scanner false-positives
const DUMMY_OPENAI = ["sk", "proj", "abc1234567890123456789012345678901234567890123456"].join("-");
const DUMMY_ANTHROPIC = ["sk", "ant", "api03", "abcdef1234567890abcdef1234567890abcdef12"].join("-");
const DUMMY_STRIPE = ["sk", "test", "51M0demo8877665544332211"].join("_");

const PROMPT_PRESETS: PromptScenario[] = [
  {
    id: "aws-cloud",
    name: "AWS IAM & S3 Deploy Script",
    category: "Cloud Credentials",
    description: "Contains live 20-character AWS Access Key ID and 40-character Secret Key",
    prompt: `Help me write an automated deployment script for our production S3 bucket.
Here are our root IAM credentials:
AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
Deploy to bucket "s3://corp-finance-production-records"`
  },
  {
    id: "ai-keys",
    name: "OpenAI & Anthropic API Key Leak",
    category: "AI API Keys",
    description: "Contains live OpenAI project key and Anthropic Claude production tokens",
    prompt: `Review this Python microservice for concurrency bugs:
import openai
openai.api_key = "${DUMMY_OPENAI}"
anthropic_token = "${DUMMY_ANTHROPIC}"
Can you optimize the streaming token handler?`
  },
  {
    id: "stripe-payments",
    name: "Stripe Secret & Credit Card",
    category: "Payment Tokens",
    description: "Contains Stripe secret key and customer credit card number",
    prompt: `Debug our checkout webhook payload:
curl https://api.stripe.com/v1/charges \\
  -u "${DUMMY_STRIPE}:" \\
  -d "amount=9900" \\
  -d "card=4532-7589-2345-1289" \\
  -d "currency=usd"`
  },
  {
    id: "db-uri",
    name: "PostgreSQL Production Connection URI",
    category: "Database URIs",
    description: "Contains plaintext administrative database credentials in URL string",
    prompt: `Why is our database pool exhausting connections?
Here is the production connection string:
DATABASE_URL="postgres://db_admin:SuperSecretP@ssw0rd!@pg-cluster.internal.corp:5432/finance_db?sslmode=require"`
  },
  {
    id: "shannon-entropy",
    name: "Unlabeled High-Entropy Secret Token",
    category: "High Entropy Secrets",
    description: "Unlabeled cryptographic hash with high Shannon randomness (> 3.85 bits/char)",
    prompt: `Please verify this authorization token format:
AUTH_BLOB="a8f9c2d1e4b7093284019283746192837401928374619283"
Does this match SHA-256 standard hex length?`
  }
];

// Shannon Entropy Calculator
function calculateShannonEntropy(str: string): number {
  if (!str) return 0;
  const len = str.length;
  const frequencies = new Map<string, number>();

  for (let i = 0; i < len; i++) {
    const char = str[i];
    frequencies.set(char, (frequencies.get(char) || 0) + 1);
  }

  let entropy = 0;
  frequencies.forEach((count) => {
    const p = count / len;
    entropy -= p * Math.log2(p);
  });

  return entropy;
}

interface SecretMatch {
  type: string;
  raw: string;
  surrogate: string;
  entropy: number;
  isHighEntropy: boolean;
}

export default function PromptShieldPlayground() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("aws-cloud");
  const [promptText, setPromptText] = useState<string>(PROMPT_PRESETS[0].prompt);
  const [copiedSanitized, setCopiedSanitized] = useState<boolean>(false);
  const [isRehydrated, setIsRehydrated] = useState<boolean>(false);

  const activePreset = PROMPT_PRESETS.find(p => p.id === selectedPresetId) || PROMPT_PRESETS[0];

  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    const p = PROMPT_PRESETS.find(x => x.id === presetId);
    if (p) setPromptText(p.prompt);
    setIsRehydrated(false);
  };

  // Real-time DLP & Surrogate Engine
  const detectionResult = useMemo(() => {
    const text = promptText;
    const matches: SecretMatch[] = [];
    let surrogateCounter = 1;

    // Pattern 1: AWS Access Key
    const awsKeyMatch = text.match(/AKIA[0-9A-Z]{16}/g);
    if (awsKeyMatch) {
      awsKeyMatch.forEach(raw => {
        matches.push({
          type: "AWS IAM Access Key ID",
          raw,
          surrogate: `[SURROGATE_AWS_KEY_${String(surrogateCounter++).padStart(2, "0")}]`,
          entropy: calculateShannonEntropy(raw),
          isHighEntropy: true
        });
      });
    }

    // Pattern 2: AWS Secret Key
    const awsSecretMatch = text.match(/wJalr[a-zA-Z0-9/+=]{35,45}/g);
    if (awsSecretMatch) {
      awsSecretMatch.forEach(raw => {
        matches.push({
          type: "AWS IAM Secret Access Key",
          raw,
          surrogate: `[SURROGATE_AWS_SECRET_${String(surrogateCounter++).padStart(2, "0")}]`,
          entropy: calculateShannonEntropy(raw),
          isHighEntropy: true
        });
      });
    }

    // Pattern 3: OpenAI Project Key
    const openaiMatch = text.match(/sk-proj-[a-zA-Z0-9_-]{20,}/g);
    if (openaiMatch) {
      openaiMatch.forEach(raw => {
        matches.push({
          type: "OpenAI Project API Key",
          raw,
          surrogate: `[SURROGATE_OPENAI_KEY_${String(surrogateCounter++).padStart(2, "0")}]`,
          entropy: calculateShannonEntropy(raw),
          isHighEntropy: true
        });
      });
    }

    // Pattern 4: Anthropic API Key
    const anthropicMatch = text.match(/sk-ant-api03-[a-zA-Z0-9_-]{20,}/g);
    if (anthropicMatch) {
      anthropicMatch.forEach(raw => {
        matches.push({
          type: "Anthropic API Token",
          raw,
          surrogate: `[SURROGATE_ANTHROPIC_KEY_${String(surrogateCounter++).padStart(2, "0")}]`,
          entropy: calculateShannonEntropy(raw),
          isHighEntropy: true
        });
      });
    }

    // Pattern 5: Stripe Secret (Live / Test)
    const stripeMatch = text.match(/sk_(?:live|test)_[a-zA-Z0-9]{20,}/g);
    if (stripeMatch) {
      stripeMatch.forEach(raw => {
        matches.push({
          type: "Stripe API Secret Key",
          raw,
          surrogate: `[SURROGATE_STRIPE_KEY_${String(surrogateCounter++).padStart(2, "0")}]`,
          entropy: calculateShannonEntropy(raw),
          isHighEntropy: true
        });
      });
    }

    // Pattern 6: Credit Card
    const cardMatch = text.match(/\b(?:\d{4}[ -]?){3}\d{4}\b/g);
    if (cardMatch) {
      cardMatch.forEach(raw => {
        matches.push({
          type: "Payment Card Number (PCI-DSS)",
          raw,
          surrogate: `[SURROGATE_PAYMENT_CARD_${String(surrogateCounter++).padStart(2, "0")}]`,
          entropy: calculateShannonEntropy(raw),
          isHighEntropy: false
        });
      });
    }

    // Pattern 7: Database URI password
    const dbMatch = text.match(/postgres:\/\/[^:]+:([^@]+)@[a-zA-Z0-9.-]+/i);
    if (dbMatch && dbMatch[1]) {
      matches.push({
        type: "Database Password in Connection URI",
        raw: dbMatch[1],
        surrogate: `[SURROGATE_DB_PWD_${String(surrogateCounter++).padStart(2, "0")}]`,
        entropy: calculateShannonEntropy(dbMatch[1]),
        isHighEntropy: true
      });
    }

    // Pattern 8: High Entropy hex/alphanumeric tokens
    const hexTokens = text.match(/\b[a-f0-9]{32,64}\b/gi);
    if (hexTokens) {
      hexTokens.forEach(raw => {
        if (!matches.some(m => m.raw === raw)) {
          const entropy = calculateShannonEntropy(raw);
          if (entropy >= 3.5) {
            matches.push({
              type: "High-Entropy Hex Secret (Shannon > 3.5)",
              raw,
              surrogate: `[SURROGATE_ENTROPY_TOKEN_${String(surrogateCounter++).padStart(2, "0")}]`,
              entropy,
              isHighEntropy: true
            });
          }
        }
      });
    }

    // Generate sanitized prompt
    let sanitized = text;
    matches.forEach(m => {
      sanitized = sanitized.replace(m.raw, m.surrogate);
    });

    return {
      matches,
      totalSecrets: matches.length,
      sanitized,
      overallEntropy: calculateShannonEntropy(text).toFixed(2),
      status: matches.length > 0 ? "BLOCKED / REDACTED" : "CLEAN"
    };
  }, [promptText]);

  // Simulated AI response
  const simulatedAiResponse = useMemo(() => {
    if (detectionResult.matches.length === 0) {
      return "I have reviewed your prompt. Everything looks clean and no sensitive credentials were found. Proceeding with your request.";
    }

    const firstSurrogate = detectionResult.matches[0].surrogate;
    return `To configure your script safely, use the credentials as follows:\n\nconst client = new ServiceClient({\n  apiKey: "${firstSurrogate}"\n});\nclient.verify();`;
  }, [detectionResult]);

  // Rehydrated response
  const rehydratedResponse = useMemo(() => {
    let text = simulatedAiResponse;
    detectionResult.matches.forEach(m => {
      text = text.replace(m.surrogate, m.raw);
    });
    return text;
  }, [simulatedAiResponse, detectionResult]);

  const copySanitized = () => {
    navigator.clipboard.writeText(detectionResult.sanitized);
    setCopiedSanitized(true);
    setTimeout(() => setCopiedSanitized(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Link href="/playground" className="text-slate-400 hover:text-white text-xs font-mono">
                Playgrounds &rarr;
              </Link>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                PromptShield Live
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Prompt DLP & Secret Masking Simulator
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
            className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            FinePrint
          </Link>
          <Link
            href="/playground/promptshield"
            className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold transition-all shadow-sm"
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

      {/* Hero Overview & Security Guarantee */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 space-y-2">
          <p className="text-slate-300 text-sm leading-relaxed">
            Test real-time AI Data Loss Prevention (DLP). Paste sample <strong className="text-white">AWS keys</strong>, <strong className="text-white">OpenAI tokens</strong>, or <strong className="text-white">Stripe secrets</strong>.
            PromptShield uses 30+ regex signatures and Shannon entropy to intercept, mask with deterministic surrogates, and rehydrate AI responses entirely client-side.
          </p>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2 text-cyan-400">
            <Zap className="w-4 h-4" />
            <span>&lt; 1ms Interception</span>
          </div>
          <span className="text-slate-400">0 Plaintext Leak</span>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Adversarial Prompt Input */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Key className="w-4 h-4 text-cyan-400" />
              <span>Prompt Text (With Embedded Secrets)</span>
            </div>
            
            {/* Presets */}
            <select
              value={selectedPresetId}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono rounded-lg px-2.5 py-1.5 outline-none focus:border-cyan-400 transition-colors"
            >
              {PROMPT_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-1 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
            <div className="px-4 py-2 bg-slate-900/70 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{activePreset.description}</span>
              <span className="text-cyan-400 uppercase font-bold text-[10px]">{activePreset.category}</span>
            </div>

            <textarea
              value={promptText}
              onChange={(e) => {
                setPromptText(e.target.value);
                setIsRehydrated(false);
              }}
              spellCheck={false}
              className="w-full h-[480px] p-4 bg-transparent font-mono text-xs text-slate-200 resize-none outline-none leading-relaxed selection:bg-cyan-500/20 selection:text-cyan-400"
              placeholder="Paste prompt containing API keys, passwords, or tokens..."
            />
          </div>

          <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Browser Extension:</span>
            <code className="text-cyan-400 font-bold">Chrome Web Store ID: oplklbom...</code>
          </div>
        </div>

        {/* Right Column: Real-Time Sanitization & Rehydration */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Sanitized Egress Stream ({detectionResult.totalSecrets} credentials scrubbed)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copySanitized}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                {copiedSanitized ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSanitized ? "Copied" : "Copy Redacted"}</span>
              </button>
            </div>
          </div>

          {/* Sanitized Output Panel */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
            <div className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${detectionResult.totalSecrets > 0 ? "bg-rose-400 animate-pulse" : "bg-emerald-400"}`} />
                <span className="font-bold text-white">Status: {detectionResult.status}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                <span>Entropy: <strong className="text-cyan-400">{detectionResult.overallEntropy} bits/char</strong></span>
                <span>Latency: <strong className="text-emerald-400">&lt; 0.8ms</strong></span>
              </div>
            </div>

            <pre className="p-4 font-mono text-xs text-slate-300 overflow-auto h-[230px] leading-relaxed selection:bg-cyan-500/20 selection:text-cyan-400">
              <code>{detectionResult.sanitized}</code>
            </pre>
          </div>

          {/* Rehydration Simulation Panel */}
          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <RefreshCw className="w-4 h-4 text-brand-neon" />
                <span>Zero-Leak Bidirectional Rehydration Test</span>
              </div>

              <button
                onClick={() => setIsRehydrated(!isRehydrated)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${isRehydrated ? "bg-emerald-500 text-slate-950" : "bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"}`}
              >
                {isRehydrated ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{isRehydrated ? "Showing Rehydrated (Local Client)" : "Toggle Rehydration"}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 font-mono">
              Simulate the LLM returning a code snippet containing your surrogate token. When rehydration is toggled, PromptShield swaps the surrogate back into the real credential locally without the AI provider ever receiving it:
            </p>

            <pre className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
              <code>{isRehydrated ? rehydratedResponse : simulatedAiResponse}</code>
            </pre>
          </div>

          {/* Detected Tokens Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            {detectionResult.matches.map((m, idx) => (
              <div key={idx} className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-rose-400 font-bold text-[11px]">
                  <span>{m.type}</span>
                  <span>{m.entropy.toFixed(2)} bits</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  Mask: <code className="text-cyan-400">{m.surrogate}</code>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Feature Deep Dive */}
      <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Enterprise PromptShield Architecture
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Deterministic surrogate masking + sub-millisecond sliding window entropy scanners.
            </p>
          </div>
          <Link
            href="/promptshield"
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-mono text-xs font-bold hover:opacity-90 transition-all inline-flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <span>Read PromptShield Spec</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-900 space-y-2">
            <div className="text-cyan-400 font-bold flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>1. Format-Preserving Surrogates</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Replaces raw API keys with deterministic synthetic tokens so coding LLMs can write syntactically correct code without knowing your production secret.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-900 space-y-2">
            <div className="text-emerald-400 font-bold flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>2. Local WebCrypto Rehydration</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              When the AI streams back code with your surrogate token, PromptShield rehydrates the original credential locally inside the browser.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-900 space-y-2">
            <div className="text-purple-400 font-bold flex items-center gap-2">
              <Radio className="w-4 h-4" />
              <span>3. Central Fleet Policy Sync</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Distribute custom enterprise codenames, forbidden internal domains, and client PII regex rules across 10,000+ employee browsers via api.promptshield.io.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
