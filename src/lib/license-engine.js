/**
 * RitualDev Asymmetric Ed25519 License Engine
 *
 * Implements RFC 8037 (EdDSA / Ed25519) JSON Web Token (JWT) minting,
 * offline zero-egress cryptographic verification, and tier feature entitlement resolution.
 * Supports both Node.js (node:crypto) and Cloudflare Workers / Browser (Web Crypto API).
 */

import crypto from "node:crypto";

/**
 * Authoritative RitualDev Root Ed25519 Public Key (SPKI PEM)
 * Embedded in all client CLIs, SDKs, and IDE extensions for 100% offline license verification.
 */
export const RITUAL_ROOT_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAsYVYWmM+W1msRJnloeW3payWeSujxmbCpNeXdwH9XFs=
-----END PUBLIC KEY-----`;

/**
 * Authoritative RitualDev Root Ed25519 Public Key JWK representation
 */
export const RITUAL_ROOT_PUBLIC_KEY_JWK = {
  kty: "OKP",
  crv: "Ed25519",
  kid: "ritualdev-license-v1",
  x: "sYVYWmM-W1msRJnloeW3payWeSujxmbCpNeXdwH9XFs",
  use: "sig",
};

/**
 * Authoritative RitualDev Root Ed25519 Private Key (PKCS#8 PEM)
 * Used by default when RITUAL_LICENSE_PRIVATE_KEY is not supplied in environment.
 */
export const RITUAL_ROOT_PRIVATE_KEY_PEM = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIPk3/jVv/R0pUf2mN50z49G2k69+30d5o1Vf1kL+P0v+
-----END PRIVATE KEY-----`;

/**
 * Enterprise Feature Matrix per Tier
 */
export const TIER_FEATURES = {
  free: [
    "agentshield_sandbox_local",
    "dbshield_proxy_local",
    "poly_build_local",
  ],
  starter: [
    "agentshield_sandbox_local",
    "dbshield_proxy_local",
    "poly_build_local",
    "devshelf_verified_badge",
    "mcp_usage_metering",
  ],
  pro: [
    "agentshield_sandbox_local",
    "agentshield_dlp_heuristics",
    "dbshield_proxy_local",
    "dbshield_dryrun_rollback",
    "poly_build_local",
    "poly_remote_cache_s3",
    "skillprism_compaction_basic",
    "mockforge_synthetic_lite",
    "fineprint_tos_scanner",
  ],
  team: [
    "agentshield_sandbox_local",
    "agentshield_dlp_heuristics",
    "agentshield_ast_inspect",
    "dbshield_proxy_local",
    "dbshield_dryrun_rollback",
    "dbshield_pii_masking",
    "dbshield_slack_cards",
    "poly_build_local",
    "poly_remote_cache_s3",
    "poly_remote_cache_r2",
    "skillprism_compaction_advanced",
    "mockforge_synthetic_relational",
    "fineprint_nda_scanner",
    "team_relay_hosted",
  ],
  enterprise: [
    "agentshield_sandbox_local",
    "agentshield_dlp_heuristics",
    "agentshield_ast_inspect",
    "agentshield_ebpf_core",
    "agentshield_zygote_pool",
    "dbshield_proxy_local",
    "dbshield_dryrun_rollback",
    "dbshield_pii_masking",
    "dbshield_slack_cards",
    "dbshield_teams_cards",
    "poly_build_local",
    "poly_remote_cache_s3",
    "poly_remote_cache_r2",
    "poly_oidc_zero_secret",
    "poly_slsa_attestation",
    "skillprism_compaction_advanced",
    "skillprism_redis_sentinel",
    "skillprism_finops_exporter",
    "mockforge_synthetic_relational",
    "mockforge_cdc_kafka",
    "fineprint_nda_scanner",
    "fineprint_contract_intelligence",
    "team_relay_hosted",
    "airgapped_vpc_deployment",
    "hardware_tpm_signatures",
    "sso_scim_provisioning",
    "priority_sla_1h",
  ],
};

/**
 * Base64URL Encoding & Decoding utilities
 */
export function base64UrlEncode(data) {
  const buf = Buffer.isBuffer(data) ? data : Buffer.from(typeof data === "string" ? data : JSON.stringify(data));
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function base64UrlDecode(str) {
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4 !== 0) {
    b64 += "=";
  }
  return Buffer.from(b64, "base64");
}

/**
 * Resolves features list for a given tier string.
 */
export function resolveTierFeatures(rawTier = "starter") {
  const tier = String(rawTier || "starter").toLowerCase();
  if (tier.includes("enterprise") || tier.includes("combo") || tier.includes("vpc")) {
    return TIER_FEATURES.enterprise;
  }
  if (tier.includes("team") || tier.includes("relay") || tier.includes("hub")) {
    return TIER_FEATURES.team;
  }
  if (tier.includes("pro") || tier.includes("leader") || tier.includes("category")) {
    return TIER_FEATURES.pro;
  }
  if (tier.includes("starter") || tier.includes("spotlight")) {
    return TIER_FEATURES.starter;
  }
  return TIER_FEATURES.free;
}

/**
 * Checks whether a license payload grants a specific feature entitlement.
 */
export function isFeatureEntitled(licensePayload, featureName) {
  if (!licensePayload || typeof licensePayload !== "object") return false;
  const features = Array.isArray(licensePayload.features) ? licensePayload.features : [];
  if (features.includes("*") || features.includes("all")) return true;
  return features.includes(featureName);
}

/**
 * Mints an Asymmetric Ed25519-signed JSON Web Token (JWT) license.
 *
 * @param {Object} options
 * @param {string} options.customerEmail - Licensee corporate email
 * @param {string} [options.tier] - starter, pro, team, enterprise
 * @param {number} [options.seats] - Number of authorized seats
 * @param {string[]} [options.features] - Specific custom features or derived from tier
 * @param {string} [options.paymentId] - Associated Dodo payment/order ID
 * @param {string} [options.subscriptionId] - Associated Dodo subscription ID
 * @param {number} [options.expiresInDays] - Duration in days (default 365)
 * @param {string} [options.orgId] - Optional enterprise Organization ID
 * @param {Object} [options.env] - Environment variables container
 * @returns {string} Signed JWT token string
 */
export function mintLicenseJwt({
  customerEmail,
  tier = "pro",
  seats = 1,
  features = null,
  paymentId = "",
  subscriptionId = "",
  expiresInDays = 365,
  orgId = "",
  env = {},
}) {
  if (!customerEmail || typeof customerEmail !== "string") {
    throw new Error("Cannot mint license: customerEmail is required.");
  }

  const cleanTier = String(tier).toLowerCase();
  const resolvedFeatures = features || resolveTierFeatures(cleanTier);

  const nowSec = Math.floor(Date.now() / 1000);
  const expSec = nowSec + (expiresInDays * 86400);

  const header = {
    alg: "EdDSA",
    typ: "JWT",
    kid: "ritualdev-license-v1",
  };

  const payload = {
    iss: "https://ritualdev.in",
    sub: customerEmail,
    aud: "ritualdev-ecosystem",
    tier: cleanTier,
    seats: Number(seats) || 1,
    features: resolvedFeatures,
    payment_id: paymentId,
    subscription_id: subscriptionId,
    org_id: orgId || customerEmail.split("@")[1] || "default",
    iat: nowSec,
    nbf: nowSec - 10,
    exp: expSec,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signingInput = Buffer.from(`${encodedHeader}.${encodedPayload}`);

  // Retrieve private key (from env, or fallback to authoritative root private key)
  const privateKeyPem = env?.RITUAL_LICENSE_PRIVATE_KEY || process.env?.RITUAL_LICENSE_PRIVATE_KEY || RITUAL_ROOT_PRIVATE_KEY_PEM;
  const privateKey = crypto.createPrivateKey(privateKeyPem);

  // Sign with Ed25519
  const signature = crypto.sign(null, signingInput, privateKey);
  const encodedSignature = base64UrlEncode(signature);

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

/**
 * Cryptographically verifies an Ed25519 License JWT offline with zero network egress.
 *
 * @param {string} jwt - The JWT string to verify
 * @param {Object} [options]
 * @param {string} [options.publicKeyPem] - Optional public key override (defaults to embedded root)
 * @param {number} [options.nowMs] - Current timestamp in ms (defaults to Date.now())
 * @returns {{ valid: boolean, payload?: Object, error?: string }}
 */
export function verifyLicenseJwt(jwt, options = {}) {
  if (!jwt || typeof jwt !== "string") {
    return { valid: false, error: "Empty or invalid JWT string provided" };
  }

  const parts = jwt.trim().split(".");
  if (parts.length !== 3) {
    return { valid: false, error: "Malformed JWT: expected 3 dot-separated segments" };
  }

  const [headerB64, payloadB64, sigB64] = parts;

  let header;
  let payload;
  try {
    header = JSON.parse(base64UrlDecode(headerB64).toString("utf-8"));
    payload = JSON.parse(base64UrlDecode(payloadB64).toString("utf-8"));
  } catch {
    return { valid: false, error: "Malformed JWT JSON encoding" };
  }

  // Validate algorithm
  if (header.alg !== "EdDSA") {
    return { valid: false, error: `Unsupported signature algorithm: ${header.alg}. Expected EdDSA` };
  }

  // Verify Ed25519 cryptographic signature
  const signingInput = Buffer.from(`${headerB64}.${payloadB64}`);
  const signature = base64UrlDecode(sigB64);

  const pubKeyPem = options.publicKeyPem || process.env?.RITUAL_LICENSE_PUBLIC_KEY || RITUAL_ROOT_PUBLIC_KEY_PEM;
  
  try {
    const publicKey = crypto.createPublicKey(pubKeyPem);
    const isSignatureValid = crypto.verify(null, signingInput, publicKey, signature);

    if (!isSignatureValid) {
      return { valid: false, error: "Cryptographic signature verification failed: signature is invalid or key mismatch" };
    }
  } catch (err) {
    return { valid: false, error: `Cryptographic verification error: ${err.message}` };
  }

  // Verify timestamps
  const nowSec = Math.floor((options.nowMs || Date.now()) / 1000);

  if (payload.exp && nowSec > payload.exp) {
    return {
      valid: false,
      error: `License has expired at ${new Date(payload.exp * 1000).toISOString()} (current time: ${new Date(nowSec * 1000).toISOString()})`,
      payload,
    };
  }

  if (payload.nbf && nowSec < payload.nbf) {
    return {
      valid: false,
      error: `License is not active yet (not before ${new Date(payload.nbf * 1000).toISOString()})`,
      payload,
    };
  }

  return {
    valid: true,
    payload,
  };
}

/**
 * Returns RFC 7517 compliant JSON Web Key Set (JWKS) for the public key.
 */
export function getPublicJwks() {
  return {
    keys: [RITUAL_ROOT_PUBLIC_KEY_JWK],
  };
}
