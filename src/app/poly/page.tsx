'use client';

import { useEffect } from 'react';

export default function PolyRedirectPage() {
  useEffect(() => {
    window.location.replace('https://poly.ritualdev.in');
  }, []);

  return (
    <>
      <head>
        <meta httpEquiv="refresh" content="0; url=https://poly.ritualdev.in" />
        <link rel="canonical" href="https://poly.ritualdev.in" />
        <title>Redirecting to Poly...</title>
      </head>
      <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-3xl mb-4 animate-pulse">
          ⚡
        </div>
        <h1 className="text-2xl font-bold mb-2">Redirecting to Poly Web Platform...</h1>
        <p className="text-slate-400 mb-6">
          The Universal Polyglot CLI Package & Dependency Orchestrator has moved to its dedicated subdomain.
        </p>
        <a
          href="https://poly.ritualdev.in"
          className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold transition-colors duration-200"
        >
          Open poly.ritualdev.in &rarr;
        </a>
      </div>
    </>
  );
}
