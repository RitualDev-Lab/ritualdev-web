import Link from "next/link";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  LifeBuoy, 
  Mail, 
  FileText, 
  CheckCircle2, 
  Server, 
  Zap,
  PhoneCall,
  Scale
} from "lucide-react";

export const metadata = {
  title: "Enterprise Service Level Agreement (SLA) — RitualDev",
  description: "Official Enterprise Service Level Agreement (SLA) contract terms and response time guarantees for AgentShield, DBShield, and RitualDev Studio."
};

export default function EnterpriseSlaPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Back Link */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO RITUALDEV STUDIO</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="border-b border-slate-800 pb-8 mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-brand-cyan" />
          <span>ENTERPRISE MASTER SERVICE AGREEMENT &middot; SLA ADDENDUM</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Enterprise Service Level Agreement (SLA)
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          This Service Level Agreement (&ldquo;SLA&rdquo;) governs the performance, support availability, incident response timelines, and uptime commitments provided by RitualDev Lab for enterprise deployments of AgentShield, DBShield, and related governance tooling.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mt-4">
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
            Effective Date: November 2026
          </span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/40 text-emerald-300">
            Enterprise Tier: Active
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
            Governing Entity: RitualDev Lab (ritualdev.in)
          </span>
        </div>
      </div>

      <div className="space-y-12 text-sm text-slate-300 leading-relaxed font-sans">

        {/* 1. Executive Summary & Purpose */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-brand-cyan font-mono text-base">01.</span>
            <span>Scope &amp; Coverage</span>
          </h2>
          <p>
            This SLA is incorporated into and forms an integral part of the Enterprise Master Services Agreement (MSA) between RitualDev Lab (&ldquo;Vendor&rdquo;) and the enterprise customer (&ldquo;Customer&rdquo;). This agreement applies to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li><strong>AgentShield Autonomous Sandbox</strong> (Kubernetes Helm deployments, Docker daemons, and workstation CLI runtimes).</li>
            <li><strong>DBShield Wire Guardrail</strong> (Database mutation proxies and MCP server instances).</li>
            <li><strong>Enterprise Governance Suite</strong> (SIEM exporters, telemetry webhooks, and private VPC infrastructure modules).</li>
          </ul>
        </section>

        {/* 2. Severity Classification & Response Matrix */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-brand-cyan font-mono text-base">02.</span>
              <span>Incident Severity Classification &amp; Response Guarantees</span>
            </h2>
            <p className="text-slate-400">
              When an enterprise incident ticket is logged via our designated dispatch channels, RitualDev commits to the initial triage and ongoing status cadence defined below:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* P1 Card */}
            <div className="glass-panel p-6 rounded-2xl border border-rose-500/30 bg-rose-950/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    P1 &middot; CRITICAL
                  </span>
                  <span className="text-xs font-mono text-rose-400 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> &lt; 1 HOUR
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">Critical Outage / Zero-Day</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Total sandbox bypass in active production agent workflows, zero-day kernel/AST escape vulnerability, or verified customer credential exfiltration.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-rose-500/20 font-mono text-xs">
                <div className="text-slate-400"><strong>Coverage:</strong> 24/7/365 Continuous</div>
                <div className="text-slate-400"><strong>Initial Response:</strong> &lt; 60 Minutes</div>
                <div className="text-slate-400"><strong>Status Cadence:</strong> Every 2 Hours</div>
                <div className="text-rose-300 font-bold truncate">Dispatch: security@ritualdev.in</div>
              </div>
            </div>

            {/* P2 Card */}
            <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 bg-amber-950/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    P2 &middot; HIGH
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> &lt; 4 HOURS
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">Partial Degradation</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Core security feature or AST normalizer false-positive halting continuous deployment CI/CD pipeline, SIEM exporter failure without security bypass.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-amber-500/20 font-mono text-xs">
                <div className="text-slate-400"><strong>Coverage:</strong> Mon&ndash;Fri, Business Hours</div>
                <div className="text-slate-400"><strong>Initial Response:</strong> &lt; 4 Hours</div>
                <div className="text-slate-400"><strong>Status Cadence:</strong> Every 6 Hours</div>
                <div className="text-amber-300 font-bold truncate">Dispatch: support@ritualdev.in</div>
              </div>
            </div>

            {/* P3 Card */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-700 bg-slate-900/40 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-slate-800 text-slate-300 border border-slate-700">
                    P3 &middot; STANDARD
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> &lt; 1 DAY
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">General Guidance</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Non-critical inquiry, configuration assistance, bespoke regex rule tuning, architecture integration advice, or general roadmap queries.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-800 font-mono text-xs">
                <div className="text-slate-400"><strong>Coverage:</strong> Standard Business Days</div>
                <div className="text-slate-400"><strong>Initial Response:</strong> &lt; 24 Hours</div>
                <div className="text-slate-400"><strong>Status Cadence:</strong> As Needed</div>
                <div className="text-slate-300 font-bold truncate">Dispatch: support@ritualdev.in</div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Availability & Uptime Guarantee */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-brand-cyan font-mono text-base">03.</span>
            <span>Uptime &amp; Air-Gapped High Availability</span>
          </h2>
          <p>
            Because AgentShield is engineered as a <strong>strictly local-first, air-gapped security boundary</strong>, runtime execution availability is not dependent upon third-party cloud infrastructure.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-white font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>99.95% Availability Target</span>
              </div>
              <p className="text-xs text-slate-400">
                Guaranteed engine operational availability for containerized Helm daemonsets running inside Customer VPCs.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-white font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Fail-Safe Default Enforced</span>
              </div>
              <p className="text-xs text-slate-400">
                In the rare event of daemon termination, subshell interception locks by default to prevent unprotected command execution.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Escalation Path */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-brand-cyan font-mono text-base">04.</span>
            <span>Multi-Tier Engineering Escalation Ladder</span>
          </h2>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start justify-between gap-4">
              <div>
                <strong className="text-white">Tier 1: Solutions Engineering Dispatch</strong>
                <p className="text-slate-400 mt-1">Initial diagnostic triage, reproduction sandbox validation, and log intake.</p>
              </div>
              <span className="text-slate-400 shrink-0">T+0 to T+60m</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start justify-between gap-4">
              <div>
                <strong className="text-brand-cyan">Tier 2: Senior Security &amp; Kernel Engineers</strong>
                <p className="text-slate-400 mt-1">AST parser patching, linear-time regex optimization, and live emergency hotfix deployment.</p>
              </div>
              <span className="text-brand-cyan shrink-0">T+1h to T+4h</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start justify-between gap-4">
              <div>
                <strong className="text-purple-300">Tier 3: Core Architecture Lead &amp; Executive Notification</strong>
                <p className="text-slate-400 mt-1">Executive coordination, emergency private patch signing, and joint incident post-mortem drafting.</p>
              </div>
              <span className="text-purple-300 shrink-0">T+4h+</span>
            </div>
          </div>
        </section>

        {/* 5. Service Credits & Remedies */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-brand-cyan font-mono text-base">05.</span>
            <span>Service Credits &amp; Remedies</span>
          </h2>
          <p>
            In the event that RitualDev fails to meet the guaranteed P1 or P2 initial response SLA for an Enterprise customer within a given calendar month, Customer shall be entitled to service credits calculated as follows:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border border-slate-800 rounded-lg overflow-hidden">
              <thead className="bg-slate-900 text-slate-200">
                <tr>
                  <th className="py-2.5 px-4 border-b border-slate-800">SLA Breach Metric</th>
                  <th className="py-2.5 px-4 border-b border-slate-800">Service Credit (% of Monthly Fee)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-400">
                <tr>
                  <td className="py-2.5 px-4">P1 Response Time exceeds 1 hour (up to 3 hours)</td>
                  <td className="py-2.5 px-4 text-emerald-400 font-bold">10% Credit</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4">P1 Response Time exceeds 3 hours</td>
                  <td className="py-2.5 px-4 text-emerald-400 font-bold">25% Credit</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4">Monthly Containerized Daemon Availability &lt; 99.9%</td>
                  <td className="py-2.5 px-4 text-emerald-400 font-bold">25% Credit</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4">Monthly Containerized Daemon Availability &lt; 99.0%</td>
                  <td className="py-2.5 px-4 text-emerald-400 font-bold">50% Credit</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400">
            Service credits are applied against the customer&apos;s next billing cycle and represent the sole and exclusive financial remedy for SLA response breaches.
          </p>
        </section>

        {/* 6. Exclusions */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-brand-cyan font-mono text-base">06.</span>
            <span>SLA Exclusions</span>
          </h2>
          <p className="text-slate-400">
            SLA commitments and remedies do not apply to service interruptions or response delays resulting from:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400 text-xs">
            <li>Customer-managed infrastructure failures, cloud VPC network disconnects, or operating system kernel panics outside of Vendor container limits.</li>
            <li>Unauthorized alterations, reverse engineering, or modifications to AgentShield binary distributions.</li>
            <li>External upstream third-party LLM cloud outages (e.g. Anthropic Claude, OpenAI, or Microsoft Azure API downtime).</li>
            <li>Force majeure events beyond reasonable commercial control.</li>
          </ul>
        </section>

        {/* 7. Enterprise Dispatch Contacts */}
        <section className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-cyan" />
            <span>Authorized Enterprise Dispatch Channels</span>
          </h3>
          <p className="text-xs text-slate-400">
            To trigger an SLA response, incidents must be dispatched to the verified addresses below with the corresponding priority indicator in the email subject line:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-rose-400 font-bold">P1 Incidents &amp; Security Advisories</div>
              <a href="mailto:security@ritualdev.in?subject=[P1-CRITICAL]%20Enterprise%20Incident" className="text-slate-200 hover:text-white underline mt-1 block">
                security@ritualdev.in
              </a>
              <div className="text-[10px] text-slate-400 mt-1">24/7/365 &middot; &lt; 1 Hour Response</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-amber-400 font-bold">P2 &amp; General Support Inquiries</div>
              <a href="mailto:support@ritualdev.in?subject=[P2-HIGH]%20Support%20Request" className="text-slate-200 hover:text-white underline mt-1 block">
                support@ritualdev.in
              </a>
              <div className="text-[10px] text-slate-400 mt-1">Business Hours &middot; &lt; 4 Hours Response</div>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}
