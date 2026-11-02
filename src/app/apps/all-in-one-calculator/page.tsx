import Link from "next/link";
import { ArrowLeft, Calculator, ShieldCheck, Download, Smartphone } from "lucide-react";

export const metadata = {
  title: "All-in-One Calculator Plus — RitualDev Studio",
  description: "170+ high-performance offline calculation and conversion tools for Android."
};

export default function CalculatorAppDetailPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Back Link */}
      <div className="mb-8">
        <Link href="/apps" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO ALL APPS</span>
        </Link>
      </div>

      <div className="border-b border-slate-800 pb-10 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3.5 rounded-2xl bg-brand-green/10 text-brand-green border border-brand-green/30">
            <Calculator className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              All-in-One Calculator Plus
            </h1>
            <div className="text-xs font-mono text-slate-400 mt-1">
              Package ID: <code className="text-brand-green">com.allinone.calculator.plus</code> &middot; Google Play Store
            </div>
          </div>
        </div>

        <p className="mt-4 text-base text-slate-300 leading-relaxed">
          The ultimate everyday computation companion. Includes 170+ specialized calculators spanning financial loan amortizations, scientific math, matrix algebra, engineering units, health BMI/BMR, and currency conversions.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono">
          <Link
            href="/privacy/all-in-one-calculator"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/delete-account/all-in-one-calculator"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-colors"
          >
            Account &amp; Data Deletion
          </Link>
        </div>
      </div>

      <div className="space-y-6 text-sm text-slate-300">
        <h2 className="text-xl font-bold text-white">Application Highlights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl glass-panel border border-slate-800">
            <div className="font-bold text-white mb-1">100% Offline Math Engine</div>
            <p className="text-slate-400">All arithmetic, matrix logic, and formula solvers run directly on device without internet access.</p>
          </div>
          <div className="p-4 rounded-xl glass-panel border border-slate-800">
            <div className="font-bold text-white mb-1">Zero Analytics &amp; Ad Trackers</div>
            <p className="text-slate-400">We do not bundle third-party telemetry, ad brokers, or analytics frameworks into the APK.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
