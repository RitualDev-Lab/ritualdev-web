/**
 * RFC 8628 OAuth 2.0 Device Authorization Grant Session Store
 * Manages device_code and user_code pairs, approval state, and issued Ed25519 license tokens.
 */

import crypto from "node:crypto";

/**
 * Unambiguous 20-character alphabet (excludes 0, O, 1, I, L, U to prevent transcription errors)
 */
const USER_CODE_CHARSET = "BCDFGHJKMNPQRSTVWXYZ23456789";

// Global in-memory storage for active device sessions
// Works across API calls within the Node.js / Serverless process
const globalSessions = globalThis.__RITUAL_DEVICE_SESSIONS__ || new Map();
if (!globalThis.__RITUAL_DEVICE_SESSIONS__) {
  globalThis.__RITUAL_DEVICE_SESSIONS__ = globalSessions;
}

/**
 * Generates an unambiguous, human-friendly user code (format: XXXX-YYYY)
 */
export function generateUserCode() {
  let code = "";
  const randomBytes = crypto.randomBytes(8);
  for (let i = 0; i < 8; i++) {
    code += USER_CODE_CHARSET[randomBytes[i] % USER_CODE_CHARSET.length];
    if (i === 3) code += "-";
  }
  return code;
}

/**
 * Generates a high-entropy cryptographically secure device code
 */
export function generateDeviceCode() {
  return `dev_${crypto.randomBytes(32).toString("hex")}`;
}

/**
 * Creates a new pending device authorization session
 *
 * @param {Object} options
 * @param {string} [options.clientId] - Client identifier (e.g. agentshield-cli, poly-cli)
 * @param {string} [options.scope] - Requested OAuth scope (default: "license offline_access")
 * @param {number} [options.expiresInSeconds] - Session TTL in seconds (default: 900 / 15 mins)
 * @returns {Object} RFC 8628 authorization response object
 */
export function createDeviceSession({
  clientId = "ritualdev-cli",
  scope = "license offline_access",
  expiresInSeconds = 900,
  baseUrl = "https://ritualdev.in",
} = {}) {
  cleanupExpiredSessions();

  const deviceCode = generateDeviceCode();
  const userCode = generateUserCode();
  const nowMs = Date.now();
  const expiresAtMs = nowMs + expiresInSeconds * 1000;

  const session = {
    deviceCode,
    userCode,
    clientId,
    scope,
    status: "pending", // pending, approved, denied, expired
    createdAt: nowMs,
    expiresAt: expiresAtMs,
    interval: 5, // polling interval in seconds
    customerEmail: null,
    licenseJwt: null,
    licensePayload: null,
  };

  globalSessions.set(deviceCode, session);
  globalSessions.set(userCode, session);

  const cleanBase = baseUrl.replace(/\/+$/, "");

  return {
    device_code: deviceCode,
    user_code: userCode,
    verification_uri: `${cleanBase}/device/`,
    verification_uri_complete: `${cleanBase}/device/?user_code=${userCode}`,
    expires_in: expiresInSeconds,
    interval: 5,
  };
}

/**
 * Retrieves a session by its user_code (normalized, case-insensitive, hyphen-agnostic)
 */
export function getDeviceSessionByUserCode(rawUserCode) {
  if (!rawUserCode) return null;
  const normalized = String(rawUserCode)
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");

  // Look through active sessions
  for (const session of globalSessions.values()) {
    const sessionNormalized = session.userCode.replace(/[^A-Z0-9]/g, "");
    if (sessionNormalized === normalized) {
      if (Date.now() > session.expiresAt) {
        session.status = "expired";
      }
      return session;
    }
  }
  return null;
}

/**
 * Retrieves a session by its secret device_code
 */
export function getDeviceSessionByDeviceCode(deviceCode) {
  if (!deviceCode) return null;
  const session = globalSessions.get(deviceCode);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    session.status = "expired";
  }
  return session;
}

/**
 * Approves a device authorization session and binds the minted license
 */
export function approveDeviceSession(userCode, { customerEmail, licenseJwt, licensePayload }) {
  const session = getDeviceSessionByUserCode(userCode);
  if (!session) {
    return { ok: false, error: "Invalid or expired verification code." };
  }

  if (session.status === "expired" || Date.now() > session.expiresAt) {
    session.status = "expired";
    return { ok: false, error: "Verification code has expired. Please initiate a new login in your terminal." };
  }

  session.status = "approved";
  session.customerEmail = customerEmail;
  session.licenseJwt = licenseJwt;
  session.licensePayload = licensePayload;
  session.approvedAt = Date.now();

  return { ok: true, session };
}

/**
 * Denies a device authorization session
 */
export function denyDeviceSession(userCode) {
  const session = getDeviceSessionByUserCode(userCode);
  if (!session) return false;
  session.status = "denied";
  return true;
}

/**
 * Prunes expired sessions from memory
 */
export function cleanupExpiredSessions() {
  const now = Date.now();
  for (const [key, session] of globalSessions.entries()) {
    if (now > session.expiresAt + 60000) {
      globalSessions.delete(key);
    }
  }
}

/**
 * Returns active store size (for tests & monitoring)
 */
export function getStoreStats() {
  cleanupExpiredSessions();
  return {
    totalKeys: globalSessions.size,
  };
}
