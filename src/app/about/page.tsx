import Link from "next/link";
import { ArrowLeft, Terminal, Shield, Users, Mail } from "lucide-react";

export const metadata = {
  title: "About RitualDev — Independent Engineering Studio",
  description: "About RitualDev Studio, founders Divyanshu Jethi & Sakshi Sharma, and our offline-first engineering philosophy."
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Back Link */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO RITUALDEV STUDIO</span>
        </Link>
      </div>

      <div className="border-b border-slate-800 pb-10 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-neon border border-brand-green/30 text-xs font-mono mb-4">
          <span>INDEPENDENT ENGINEERING STUDIO</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About RitualDev
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          RitualDev is an independent software studio founded by <strong>Divyanshu Jethi</strong> and <strong>Sakshi Sharma</strong>. We engineer air-gapped AI agent runtime defense suites, kernel sandboxes, database wire proxies, and offline Android applications.
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Our Engineering Manifesto</h2>
          <p>
            As autonomous coding agents and LLM developer tools proliferate, developers face an unprecedented security dilemma: agents require system access to write code and run commands, but grant unrestricted access to prompt injections, credential exfiltration, and database accidents.
          </p>
          <p>
            We believe the solution is <strong>architectural zero-trust</strong>: OS-level kernel sandboxing (Bubblewrap on Linux, Seatbelt on macOS, AppContainer on Windows), database wire protocol interception with dry-run tokens, and transparent JIT context compaction.
          </p>
        </section>

        <section className="space-y-4 pt-6 border-t border-slate-800">
          <h2 className="text-xl font-bold text-white">Founders &amp; Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-panel rounded-2xl p-6 border border-slate-800">
              <h3 className="font-bold text-lg text-white">Divyanshu Jethi</h3>
              <div className="text-xs font-mono text-brand-neon mt-1">Co-Founder &amp; Principal Systems Engineer</div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Specializing in low-level systems programming, Linux Landlock/bwrap kernel containment, and database wire proxies.
              </p>
            </div>
            <div className="glass-panel rounded-2xl p-6 border border-slate-800">
              <h3 className="font-bold text-lg text-white">Sakshi Sharma</h3>
              <div className="text-xs font-mono text-brand-cyan mt-1">Co-Founder &amp; Product Architect</div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Leading product strategy, developer tooling UX, and mobile privacy architectures across Android and web platforms.
              </p>
            </div>
          </div>
        </section>

        <section className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-2">
          <h3 className="font-bold text-base text-white">Get in Touch</h3>
          <p className="text-xs text-slate-400">
            Reach out directly for enterprise governance architecture discussions or community inquiries:
          </p>
          <div className="text-xs font-mono text-brand-green">
            <a href="mailto:developer@ritualdev.in">developer@ritualdev.in</a>
          </div>
        </section>
      </div>

    </div>
  );
}
