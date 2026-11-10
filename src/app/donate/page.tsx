"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Heart, 
  Coffee, 
  Star, 
  ExternalLink, 
  Shield, 
  CheckCircle2, 
  Sparkles,
  Award,
  CreditCard,
  QrCode,
  DollarSign,
  Copy,
  Check,
  Zap,
  Lock,
  Cpu
} from "lucide-react";

// Live Dodo Payments Product ID
const DODO_PRODUCT_ID = "pdt_0NpjONGugY5QkrFDUaPva";
const DODO_BASE_URL = `https://checkout.dodopayments.com/buy/${DODO_PRODUCT_ID}`;

export default function DonatePage() {
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [selectedAmount, setSelectedAmount] = useState<number>(15);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);

  const predefinedAmounts = currency === "USD" 
    ? [5, 15, 50, 100, 250]
    : [400, 1250, 4150, 8300, 20000];

  const handleDodoCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (isNaN(finalAmount) || finalAmount <= 0) return;

    const dodoParams = new URLSearchParams();
    dodoParams.set("fullName", donorName || "RitualDev Open Source Backer");
    dodoParams.set("name", donorName || "RitualDev Open Source Backer");
    if (donorEmail) {
      dodoParams.set("email", donorEmail);
      dodoParams.set("customer_email", donorEmail);
    }
    dodoParams.set("paymentAmount", String(finalAmount));
    dodoParams.set("amount", String(finalAmount));
    dodoParams.set("paymentCurrency", currency);
    dodoParams.set("currency", currency);
    dodoParams.set("singlePage", "true");
    dodoParams.set("product_type", "digital");
    dodoParams.set("shipping_required", "false");
    dodoParams.set("redirect_url", "https://ritualdev.in/donate?status=thankyou");
    dodoParams.set("metadata_donorName", donorName || "Anonymous Backer");
    dodoParams.set("metadata_type", "donation_community_grant");

    const checkoutUrl = `${DODO_BASE_URL}?${dodoParams.toString()}`;
    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText("https://donation.ritualdev.in");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const donationTiers = [
    {
      name: "Developer Patron",
      amountUSD: "$15",
      amountINR: "₹1,250",
      type: "Monthly or One-Time",
      desc: "Supports ongoing maintenance of our macOS Seatbelt, Linux Landlock, and Windows AppContainer sandboxes.",
      icon: Heart,
      badge: "Supporter",
      amountNumUSD: 15,
      amountNumINR: 1250
    },
    {
      name: "Cloud CI & Build Grid",
      amountUSD: "$50",
      amountINR: "₹4,150",
      type: "Compute Sponsor",
      desc: "Sponsors GitHub Actions runner hours for multi-arch Linux ARM64/x86_64, macOS, and Windows binary builds.",
      icon: Cpu,
      badge: "CI Infrastructure",
      amountNumUSD: 50,
      amountNumINR: 4150
    },
    {
      name: "Air-Gapped Test VPC Grid",
      amountUSD: "$100",
      amountINR: "₹8,300",
      type: "Test Infrastructure",
      desc: "Subsidizes our isolated Redis VPC and Kubernetes cluster for continuous security regressions and dry-run validation.",
      icon: Star,
      badge: "VPC Infrastructure",
      amountNumUSD: 100,
      amountNumINR: 8300
    },
    {
      name: "DevShelf Infrastructure Pillar",
      amountUSD: "$250+",
      amountINR: "₹20,000+",
      type: "Ecosystem Pillar",
      desc: "Subsidizes edge CDN hosting, OpenAPI endpoints, and unthrottled zero-paywall directory search for 567+ developer tools.",
      icon: Award,
      badge: "Pillar Backer",
      amountNumUSD: 250,
      amountNumINR: 20000
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb & Domain Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400 mb-8 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-rose-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-rose-400 font-bold">Donation Portal</span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300 font-mono">donation.ritualdev.in</span>
          <button
            onClick={copyShareLink}
            className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-800"
            title="Copy portal URL"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-950/40 border border-rose-800/50 text-xs font-mono text-rose-300 mb-4 shadow-lg shadow-rose-950/30">
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          <span>OFFICIAL RITUALDEV DONATION PORTAL &middot; ZERO PAYWALL INITIATIVE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Support Open-Source AI Defense &amp; Zero-Paywall Tooling
        </h1>
        <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
          RitualDev builds 100% offline-first software, kernel sandboxes (AgentShield, DBShield), and the DevShelf catalog with zero telemetry and zero paywalls. Your donations keep open-source developer infrastructure independent, safe, and free.
        </p>
      </div>

      {/* Interactive Dodo Payments Donation Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-rose-500/30 bg-gradient-to-b from-rose-950/20 via-slate-900/60 to-slate-950 max-w-3xl mx-auto mb-16 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-rose-400" />
              <span>Donate via Dodo Payments</span>
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Supports UPI, Credit/Debit Cards, Apple Pay, Google Pay, and Indian Net Banking.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                setCurrency("USD");
                setSelectedAmount(15);
                setCustomAmount("");
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
                currency === "USD" ? "bg-rose-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              USD ($)
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrency("INR");
                setSelectedAmount(1250);
                setCustomAmount("");
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
                currency === "INR" ? "bg-rose-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              INR (₹ UPI)
            </button>
          </div>
        </div>

        <form onSubmit={handleDodoCheckout} className="space-y-6">
          {/* Amount Selector */}
          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
              Select Donation Amount ({currency})
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-3">
              {predefinedAmounts.map((amt) => {
                const isSelected = selectedAmount === amt && !customAmount;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount("");
                    }}
                    className={`py-3 px-2 rounded-2xl border text-sm font-bold font-mono transition-all ${
                      isSelected
                        ? "bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/30 scale-105"
                        : "bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    {currency === "USD" ? `$${amt}` : `₹${amt}`}
                  </button>
                );
              })}
            </div>

            {/* Custom Amount input */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                {currency === "USD" ? "$" : "₹"}
              </span>
              <input
                type="number"
                min="1"
                placeholder="Or enter custom amount..."
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
                }}
                className="w-full pl-9 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-rose-500 transition-all"
              />
            </div>
          </div>

          {/* Donor Info (Optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-slate-400">Your Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Alex / Anonymous"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400">Email (for Dodo Tax Receipt)</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:opacity-95 text-white font-bold font-mono text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-rose-600/30"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>
                Proceed to Dodo Checkout (
                {currency === "USD"
                  ? `$${customAmount ? customAmount : selectedAmount}`
                  : `₹${customAmount ? customAmount : selectedAmount}`}
                )
              </span>
            </button>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Secured by Dodo Payments</span>
              </span>
              <span>&middot;</span>
              <span>UPI / Cards / Apple Pay / GPay</span>
              <span>&middot;</span>
              <span>GST &amp; Global Tax Handled</span>
            </div>
          </div>
        </form>
      </div>

      {/* Alternative: GitHub Sponsors Grid */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-white mb-1">
            Prefer GitHub Sponsors?
          </h2>
          <p className="text-xs font-mono text-slate-400">
            Get a GitHub Sponsor badge on your profile and permanent contributor ledger recognition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {donationTiers.map((tier) => {
            const Icon = tier.icon;
            const amountDisplay = currency === "INR" ? tier.amountINR : tier.amountUSD;
            const amountVal = currency === "INR" ? tier.amountNumINR : tier.amountNumUSD;

            return (
              <div
                key={tier.name}
                className="glass-panel glass-panel-hover rounded-3xl p-6 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-rose-300 border border-rose-900/40">
                      {tier.badge}
                    </span>
                  </div>

                  <div className="text-2xl font-extrabold text-white font-mono mb-1">
                    {amountDisplay}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mb-3">
                    {tier.type}
                  </div>

                  <h3 className="font-bold text-base text-slate-200 mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {tier.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800/80 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amountVal);
                      window.scrollTo({ top: 300, behavior: "smooth" });
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-rose-400" />
                    <span>Pay with Dodo ({amountDisplay})</span>
                  </button>

                  <Link
                    href="https://github.com/RitualDev-Lab/DevShelf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl text-slate-400 hover:text-white text-xs font-mono flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Or star on GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transparent Grant Allocation */}
      <div className="glass-panel rounded-3xl p-8 border border-slate-800 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-4">
          Where Your Sponsorship Dollars Go
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5">
            <div className="font-mono text-brand-neon font-bold">50% &middot; Core R&amp;D</div>
            <p className="text-slate-400 leading-relaxed">
              Funding Linux Landlock, macOS Seatbelt, and Windows AppContainer driver testing rigs.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5">
            <div className="font-mono text-brand-cyan font-bold">30% &middot; CI/CD &amp; Infrastructure</div>
            <p className="text-slate-400 leading-relaxed">
              Multi-architecture automated test runners, SLSA Level 3 attestations, and Cosign container signing.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5">
            <div className="font-mono text-purple-400 font-bold">20% &middot; Community &amp; Grants</div>
            <p className="text-slate-400 leading-relaxed">
              Bounties for open-source contributors authoring AST security rules and MCP server scaffolders.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
