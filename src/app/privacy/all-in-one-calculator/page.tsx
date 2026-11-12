import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, Calculator, Lock, EyeOff, HardDrive, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy for All-in-One Calculator Plus — RitualDev",
  description: "Official Privacy Policy and Data Safety Disclosures for All-in-One Calculator Plus (Package ID: com.allinone.calculator.plus) on Google Play. 100% Offline, Zero Data Harvesting.",
  alternates: {
    canonical: "https://ritualdev.in/privacy/all-in-one-calculator/",
  }
};

export default function CalculatorPrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Back Link */}
      <div className="mb-8">
        <Link href="/privacy" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO PRIVACY CENTER</span>
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-slate-800 pb-8 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-brand-green uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-brand-green" />
          <span>ANDROID APP PRIVACY POLICY &middot; LAST UPDATED: NOVEMBER 7, 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Privacy Policy for All-in-One Calculator Plus
        </h1>
        <div className="text-xs font-mono text-slate-400 mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>Application: <code className="text-brand-green">All-in-One Calculator Plus</code></span>
          <span>&middot;</span>
          <span>Package ID: <code className="text-slate-300">com.allinone.calculator.plus</code></span>
          <span>&middot;</span>
          <span>Category: <code className="text-cyan-400">Tools &amp; Utilities</code></span>
          <span>&middot;</span>
          <span>Developer: <code className="text-slate-300">RitualDev Studio</code></span>
        </div>
      </div>

      <div className="space-y-10 text-sm text-slate-300 leading-relaxed font-sans">
        
        {/* Executive Summary Card */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-brand-green/30">
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-brand-green" />
            <span>Core Privacy Mandate: 100% Offline Mathematical Processing</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            All-in-One Calculator Plus is engineered to execute 170+ modular calculators, financial amortizations, unit conversions, and health metrics <strong>100% locally on your Android device</strong>. We believe your personal loan details, budget figures, scientific computations, and health markers belong solely to you. We do not collect, store, monetize, or transmit your calculation records to external cloud servers.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-green" />
            <span>1. Information We Handle &amp; Processing Categories</span>
          </h2>
          <p>
            The application processes diverse calculations across several core modules. Here is how information within each module is handled:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-brand-green flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>FINANCIAL &amp; LOAN CALCULATORS</span>
              </div>
              <p className="text-slate-300">
                Inputs such as mortgage balances, interest rates, EMI terms, investment principal, and tax brackets are computed exclusively in device RAM. No financial figures are logged remotely or used for credit profiling.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-brand-cyan flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>HEALTH &amp; FITNESS CALCULATORS</span>
              </div>
              <p className="text-slate-300">
                Metrics including Body Mass Index (BMI), Basal Metabolic Rate (BMR), body fat percentage, and caloric needs are processed locally. No health data is stored in the cloud or synchronized with advertising partners.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-purple-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SCIENTIFIC &amp; ALGEBRA TOOLS</span>
              </div>
              <p className="text-slate-300">
                Matrix operations, polynomial equation solvers, trigonometry, and complex numbers are evaluated instantly via compiled native math engines without network dependence.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CALCULATION HISTORY &amp; FAVORITES</span>
              </div>
              <p className="text-slate-300">
                Saved calculations and custom formula shortcuts are stored inside Android's private app sandbox SQLite database. This data never leaves your physical phone.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-brand-green" />
            <span>2. Android Permissions Scoping &amp; Justification</span>
          </h2>
          <p>
            All-in-One Calculator Plus operates with the strict principle of least privilege. The app requires no invasive permissions:
          </p>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <code className="text-xs font-mono font-bold text-brand-green">android.permission.INTERNET</code>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Optional Feature</span>
              </div>
              <p className="text-xs text-slate-300">
                Used solely when the user explicitly triggers the Currency Converter to fetch publicly available foreign exchange benchmark rates (e.g. from European Central Bank open APIs). No device identifier, location, or user identity is included in the rate request. If you are offline, cached historical exchange rates are used seamlessly.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <code className="text-xs font-mono font-bold text-brand-cyan">Scoped Storage / PDF Export</code>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">User-Initiated Action</span>
              </div>
              <p className="text-xs text-slate-300">
                When you choose to export an amortization schedule, invoice tally, or calculation breakdown as a PDF or CSV document, the app uses Android's Storage Access Framework (SAF) to save the file directly to your chosen local directory. We do not access other files on your storage.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-rose-400" />
            <span>3. Zero Telemetry &amp; No Third-Party Tracking</span>
          </h2>
          <p>
            RitualDev enforces strict engineering boundaries against covert user surveillance:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
            <li><strong>No Ad Networks:</strong> We do not integrate Google AdMob, Unity Ads, AppLovin, or any commercial ad bidding SDKs.</li>
            <li><strong>No Analytics Trackers:</strong> The application does not bundle Google Firebase Analytics, AppsFlyer, Adjust, or Facebook Graph SDKs.</li>
            <li><strong>No Device Fingerprinting:</strong> We do not read IMEI numbers, SIM serials, MAC addresses, or telephony IDs.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-brand-green" />
            <span>4. User Control, Data Ownership &amp; Erasure</span>
          </h2>
          <p>
            Because all calculation state resides on your hardware, you possess complete autonomy over your records:
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
              <span><strong>Instant History Clear:</strong> Navigate to Settings &gt; Clear All History inside the app to immediately wipe all calculation history and saved variables from SQLite storage.</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
              <span><strong>Total Deletion on Uninstall:</strong> Uninstalling the application triggers Android's OS-level sandbox removal, permanently wiping all app databases, caches, and preferences from your storage.</span>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span>5. Google Play Developer Program Policy Compliance</span>
          </h2>
          <p>
            RitualDev certifies that All-in-One Calculator Plus complies fully with the Google Play Developer Program Policies, including Families Policy Requirements and Target API level guidelines. The app does not handle restricted personal data, is suitable for all ages, and requires no account creation or login credentials.
          </p>
        </section>

        {/* Section 6: Contact */}
        <section className="space-y-4 p-6 rounded-2xl glass-panel border border-slate-800 bg-slate-900/80">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-green" />
            <span>6. Contact &amp; Statutory Inquiries</span>
          </h2>
          <p className="text-xs text-slate-300">
            For privacy questions, audit verification, or support inquiries regarding All-in-One Calculator Plus:
          </p>
          <div className="text-xs font-mono text-slate-300 space-y-1.5 pt-2">
            <div>Support Desk: <a href="mailto:developer@ritualdev.in" className="text-brand-green hover:underline">developer@ritualdev.in</a></div>
            <div>Security Team: <a href="mailto:security@ritualdev.in" className="text-brand-cyan hover:underline">security@ritualdev.in</a></div>
            <div>Main Studio: <Link href="https://ritualdev.in" className="text-brand-green hover:underline">https://ritualdev.in</Link></div>
            <div>Data Deletion Portal: <Link href="/delete-account/all-in-one-calculator" className="text-brand-cyan hover:underline">/delete-account/all-in-one-calculator</Link></div>
          </div>
        </section>

      </div>

    </div>
  );
}
