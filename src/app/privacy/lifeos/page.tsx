import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, Sparkles, Lock, EyeOff, Database, Cpu, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy for LifeOS — RitualDev",
  description: "Official Privacy Policy and Data Safety Disclosures for LifeOS (Package ID: com.lifeos.app.ai) on Google Play. Local-First Gamified Productivity & On-Device AI."
};

export default function LifeOSPrivacyPage() {
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
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>ANDROID APP PRIVACY POLICY &middot; LAST UPDATED: NOVEMBER 7, 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Privacy Policy for LifeOS
        </h1>
        <div className="text-xs font-mono text-slate-400 mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>Application: <code className="text-purple-400">LifeOS &mdash; Productivity RPG</code></span>
          <span>&middot;</span>
          <span>Package ID: <code className="text-slate-300">com.lifeos.app.ai</code></span>
          <span>&middot;</span>
          <span>Category: <code className="text-brand-green">Productivity &amp; Self-Improvement</code></span>
          <span>&middot;</span>
          <span>Developer: <code className="text-slate-300">RitualDev Studio</code></span>
        </div>
      </div>

      <div className="space-y-10 text-sm text-slate-300 leading-relaxed font-sans">
        
        {/* Executive Guarantee Card */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/30">
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-purple-400" />
            <span>Local-First Mandate: Your Habits, Reflections &amp; Routine Belong to You</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            LifeOS is a gamified local-first productivity system integrating habit tracking, daily task RPG mechanics, personal goal hierarchies, and on-device machine intelligence. All user routines, journal entries, and task logs are stored in a <strong>private, hardware-encrypted SQLite database on your local Android device</strong>. We enforce an absolute <strong>zero AI training data retention policy</strong>.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-400" />
            <span>1. What Data LifeOS Stores Locally</span>
          </h2>
          <p>
            LifeOS stores all personal productivity telemetry exclusively within your phone's encrypted sandboxed storage:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-purple-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>HABIT LOGS &amp; DAILY STREAKS</span>
              </div>
              <p className="text-slate-300">
                Timestamped habit completions, streak counts, experience points (XP), skill trees, and leveling progress are saved in local SQLite tables.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-brand-green flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>TASK RPG MECHANICS &amp; QUESTS</span>
              </div>
              <p className="text-slate-300">
                To-do items, project subtasks, priority tags, and deadline schedules are kept strictly local. No remote server tracks your tasks or productivity metrics.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>DAILY JOURNAL REFLECTIONS</span>
              </div>
              <p className="text-slate-300">
                Private journal entries, mood scores, and evening review notes remain encrypted at rest. RitualDev staff and servers cannot access your writings.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>DATA OWNERSHIP &amp; EXPORT</span>
              </div>
              <p className="text-slate-300">
                You own 100% of your data. LifeOS provides one-click export into standard JSON and CSV formats at any time. No proprietary lock-in.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            <span>2. On-Device Intelligence &amp; Zero AI Training Retention</span>
          </h2>
          <p>
            LifeOS incorporates smart routine suggestions, habit decomposition, and quest generation. We enforce strict AI safety principles:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
            <li><strong>Zero Training Retention:</strong> Any prompts processed for task breakdowns or coaching are never stored, logged, or retained to train public or proprietary AI models.</li>
            <li><strong>On-Device First:</strong> Routine scheduling and XP calculations run natively on device CPU using pre-compiled deterministic algorithms.</li>
            <li><strong>No Voice or Camera Capture:</strong> The app does not request or record audio, microphone feeds, or camera data.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-rose-400" />
            <span>3. No Commercial Tracking, Ads, or Data Brokers</span>
          </h2>
          <p>
            Your mental clarity and focus are paramount. LifeOS contains:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
            <li><strong>Zero Commercial Advertisements:</strong> No banner ads, video rewards, or popup interruptions.</li>
            <li><strong>Zero Marketing Trackers:</strong> No Facebook SDK, AppsFlyer, Mixpanel, or third-party behavioral profiling.</li>
            <li><strong>No Data Monetization:</strong> We do not sell or trade user habits, routines, or reflection entries to insurance companies, employers, or data brokers.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-green" />
            <span>4. User Control &amp; Data Deletion</span>
          </h2>
          <p>
            You have permanent, unconditional control over your habit history:
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span><strong>In-App Reset:</strong> Go to Settings &gt; Reset Progress to selectively or completely clear streaks, quests, and journal archives.</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span><strong>Instant Uninstallation Wipe:</strong> Because all data is stored locally in SQLite, uninstalling LifeOS permanently and completely purges all databases from your device storage.</span>
            </div>
          </div>
        </section>

        {/* Section 5: Contact */}
        <section className="space-y-4 p-6 rounded-2xl glass-panel border border-slate-800 bg-slate-900/80">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-purple-400" />
            <span>5. Contact &amp; Support</span>
          </h2>
          <p className="text-xs text-slate-300">
            For questions regarding this policy or data safety practices in LifeOS:
          </p>
          <div className="text-xs font-mono text-slate-300 space-y-1.5 pt-2">
            <div>Developer Support: <a href="mailto:developer@ritualdev.in" className="text-purple-400 hover:underline">developer@ritualdev.in</a></div>
            <div>Security Desk: <a href="mailto:security@ritualdev.in" className="text-brand-green hover:underline">security@ritualdev.in</a></div>
            <div>Main Studio: <Link href="https://ritualdev.in" className="text-purple-400 hover:underline">https://ritualdev.in</Link></div>
            <div>Account Deletion Portal: <Link href="/delete-account/lifeos" className="text-brand-green hover:underline">/delete-account/lifeos</Link></div>
          </div>
        </section>

      </div>

    </div>
  );
}
