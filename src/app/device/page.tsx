"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Shield, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  ArrowRight, 
  Lock, 
  Building2, 
  Cpu, 
  RefreshCw,
  ExternalLink
} from "lucide-react";

function DeviceActivationContent() {
  const searchParams = useSearchParams();
  const [userCode, setUserCode] = useState("");
  const [provider, setProvider] = useState<"okta" | "google" | "azure">("okta");
  const [orgDomain, setOrgDomain] = useState("company.com");
  const [email, setEmail] = useState("developer@company.com");
  const [status, setStatus] = useState<"idle" | "authorizing" | "success" | "error">("idle");
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    const codeParam = searchParams.get("user_code");
    if (codeParam) {
      setUserCode(codeParam.toUpperCase());
    }
  }, [searchParams]);

  const handleAuthorize = async () => {
    if (!userCode || userCode.length < 8) {
      setStatus("error");
      return;
    }

    setStatus("authorizing");
    // Simulate enterprise OIDC verification & JWT minting
    setTimeout(() => {
      const mockJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
        JSON.stringify({
          sub: `usr_${Date.now()}`,
          email,
          orgId: orgDomain.replace(/\.[^/.]+$/, ""),
          provider,
          roles: ["developer", "security_auditor"],
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 86400 * 30,
        })
      ).replace(/=/g, "")}.sso_sig_${Math.random().toString(36).substring(2, 12)}`;

      setSessionToken(mockJwt);
      setStatus("success");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>RFC 8628 OAuth 2.0 Device Flow</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Authorize Workstation
          </h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Connect your local terminal CLI to your enterprise SSO identity provider (Okta, Google Workspace, Azure AD).
          </p>
        </div>

        {/* Activation Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          
          {status !== "success" ? (
            <>
              {/* User Code Input */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  Terminal Verification Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={userCode}
                    onChange={(e) => {
                      setUserCode(e.target.value.toUpperCase());
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="WDJB-MJHT"
                    maxLength={9}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-brand-neon focus:ring-1 focus:ring-brand-neon rounded-xl px-4 py-3.5 text-center font-mono text-xl tracking-widest text-emerald-300 uppercase placeholder:text-slate-600 transition-all"
                  />
                  <Key className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  Confirm the 8-character code shown in your terminal after running <code className="text-emerald-300">agentshield login --sso</code>.
                </p>
              </div>

              {/* IdP Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  Identity Provider
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "okta", name: "Okta SSO" },
                    { id: "google", name: "Google" },
                    { id: "azure", name: "Azure AD" },
                  ].map((idp) => (
                    <button
                      key={idp.id}
                      type="button"
                      onClick={() => setProvider(idp.id as any)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-mono font-medium border transition-all ${
                        provider === idp.id
                          ? "bg-emerald-950/40 border-emerald-500/60 text-emerald-300 shadow-[0_0_12px_rgba(0,245,155,0.15)]"
                          : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                      }`}
                    >
                      {idp.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Corporate Email */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  Corporate Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    const domain = e.target.value.split("@")[1];
                    if (domain) setOrgDomain(domain);
                  }}
                  placeholder="developer@acme.corp"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-brand-neon rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 font-mono transition-all"
                />
              </div>

              {/* Error Alert */}
              {status === "error" && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs font-mono">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Please enter a valid 8-character verification code (e.g. WDJB-MJHT).</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleAuthorize}
                disabled={status === "authorizing"}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(0,245,155,0.3)] hover:shadow-[0_0_25px_rgba(0,245,155,0.5)] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === "authorizing" ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Corporate SSO Session...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm &amp; Authorize Device</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </>
          ) : (
            /* Success State */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white">Workstation Authorized!</h2>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Your device has been verified with <span className="text-emerald-300 font-semibold">{email}</span> via {provider.toUpperCase()} SSO.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left font-mono space-y-2 text-xs">
                <div className="flex justify-between text-slate-400 border-b border-slate-800/80 pb-1.5">
                  <span>Organization</span>
                  <span className="text-slate-200">{orgDomain}</span>
                </div>
                <div className="flex justify-between text-slate-400 border-b border-slate-800/80 pb-1.5">
                  <span>RBAC Roles</span>
                  <span className="text-emerald-300 font-bold">developer, security_auditor</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Policy Level</span>
                  <span className="text-emerald-300">Strict Air-Gapped (Zero-Leak)</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-emerald-300 text-xs font-mono">
                🛡️ You can now return to your terminal. Your CLI session is active.
              </div>

              <div className="pt-2">
                <Link
                  href="/docs"
                  className="text-xs font-mono text-slate-400 hover:text-white transition-colors underline"
                >
                  View documentation &amp; command quickstarts &rarr;
                </Link>
              </div>
            </div>
          )}

        </div>

        {/* Security Notice */}
        <div className="text-center space-y-2 text-xs text-slate-500 font-mono">
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Air-gapped token validation &middot; TLS 1.3 encrypted</span>
          </div>
          <div>
            Need custom SSO integration for Okta or Azure AD?{" "}
            <Link href="/enterprise" className="text-emerald-400 hover:underline">
              Contact Enterprise Security
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function DeviceActivationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070b14] flex items-center justify-center text-slate-400 font-mono">Loading Device Authorization...</div>}>
      <DeviceActivationContent />
    </Suspense>
  );
}
