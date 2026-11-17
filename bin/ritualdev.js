#!/usr/bin/env node

/**
 * RitualDev Unified CLI (`ritualdev`)
 * Implements RFC 8628 Device Authorization (`ritualdev login`),
 * offline Ed25519 license verification, and enterprise workstation management.
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { verifyLicenseJwt, resolveTierFeatures } from "../src/lib/license-engine.js";

const DEFAULT_GATEWAY = process.env.RITUAL_API_URL || "https://ritualdev.in";
const RITUAL_DIR = path.join(os.homedir(), ".ritual");
const LICENSE_PATH = path.join(RITUAL_DIR, "license.json");
const AGENTSHIELD_DIR = path.join(os.homedir(), ".agentshield");
const AGENTSHIELD_LICENSE_PATH = path.join(AGENTSHIELD_DIR, "license.json");

function ensureDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function postJson(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "RitualDev-CLI/1.0",
    },
    body: JSON.stringify(data),
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data: json };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function login({ gateway = DEFAULT_GATEWAY, clientId = "ritualdev-cli" } = {}) {
  console.log("\n🔒 \x1b[1m\x1b[36mRitualDev Workstation Authorization (RFC 8628)\x1b[0m");
  console.log("Connecting to identity and licensing gateway...\n");

  const codeEndpoint = `${gateway.replace(/\/+$/, "")}/api/device/code`;
  const initRes = await postJson(codeEndpoint, {
    client_id: clientId,
    scope: "license offline_access",
  });

  if (!initRes.ok || !initRes.data?.device_code) {
    console.error("\x1b[31m✖ Failed to initiate device authorization flow.\x1b[0m");
    console.error(`Error: ${initRes.data?.error || `HTTP ${initRes.status}`}`);
    process.exit(1);
  }

  const { device_code, user_code, verification_uri_complete, interval = 5, expires_in = 900 } = initRes.data;

  console.log("------------------------------------------------------------");
  console.log(`  \x1b[1m🔑 Verification Code:\x1b[0m \x1b[1m\x1b[32m${user_code}\x1b[0m`);
  console.log(`  \x1b[1m👉 Open in Browser:\x1b[0m   \x1b[34m${verification_uri_complete}\x1b[0m`);
  console.log("------------------------------------------------------------\n");
  console.log(`⏳ Waiting for browser confirmation (expires in ${Math.round(expires_in / 60)} minutes)...`);

  const tokenEndpoint = `${gateway.replace(/\/+$/, "")}/api/device/token`;
  const pollIntervalMs = (interval || 5) * 1000;
  const deadline = Date.now() + expires_in * 1000;

  while (Date.now() < deadline) {
    await sleep(pollIntervalMs);

    const tokenRes = await postJson(tokenEndpoint, {
      grant_type: "urn:ietf:params:oauth:grant-type:device_code",
      device_code,
      client_id: clientId,
    });

    if (tokenRes.ok && tokenRes.data?.access_token) {
      const accessToken = tokenRes.data.access_token;
      
      // Perform strict offline cryptographic verification
      const verifyResult = verifyLicenseJwt(accessToken);
      if (!verifyResult.valid) {
        console.error("\n\x1b[31m✖ Received token failed offline Ed25519 cryptographic verification!\x1b[0m");
        console.error(`Reason: ${verifyResult.error}`);
        process.exit(1);
      }

      // Save locally to ~/.ritual/license.json and ~/.agentshield/license.json
      ensureDirectory(RITUAL_DIR);
      ensureDirectory(AGENTSHIELD_DIR);

      const licenseData = {
        access_token: accessToken,
        issued_at: new Date().toISOString(),
        gateway,
        payload: verifyResult.payload,
      };

      fs.writeFileSync(LICENSE_PATH, JSON.stringify(licenseData, null, 2), "utf-8");
      try {
        fs.writeFileSync(AGENTSHIELD_LICENSE_PATH, JSON.stringify(licenseData, null, 2), "utf-8");
      } catch {}

      console.log("\n\x1b[1m\x1b[32m✔ Workstation Authorized & Entitlement Activated!\x1b[0m");
      console.log(`• \x1b[1mLicensee:\x1b[0m ${verifyResult.payload.sub}`);
      console.log(`• \x1b[1mTier:\x1b[0m \x1b[33m${String(verifyResult.payload.tier).toUpperCase()}\x1b[0m (${verifyResult.payload.seats} seats)`);
      console.log(`• \x1b[1mExpires:\x1b[0m ${new Date(verifyResult.payload.exp * 1000).toLocaleDateString()}`);
      console.log(`• \x1b[1mActive Features:\x1b[0m ${verifyResult.payload.features?.length || 0} modules unlocked`);
      console.log(`• \x1b[1mCryptographic Audit:\x1b[0m Ed25519 Verified (Offline Safe)`);
      console.log(`• \x1b[1mSaved to:\x1b[0m ${LICENSE_PATH}\n`);
      return licenseData;
    }

    if (tokenRes.data?.error === "authorization_pending") {
      process.stdout.write(".");
      continue;
    }

    if (tokenRes.data?.error === "expired_token") {
      console.error("\n\x1b[31m✖ Verification code expired. Please run 'ritualdev login' again.\x1b[0m");
      process.exit(1);
    }

    if (tokenRes.data?.error === "access_denied") {
      console.error("\n\x1b[31m✖ Device authorization request was denied by the user.\x1b[0m");
      process.exit(1);
    }
  }

  console.error("\n\x1b[31m✖ Device authorization timed out.\x1b[0m");
  process.exit(1);
}

export function status() {
  console.log("\n📋 \x1b[1m\x1b[36mRitualDev Workstation License Status\x1b[0m\n");
  if (!fs.existsSync(LICENSE_PATH)) {
    console.log("\x1b[33mNo active license found at ~/.ritual/license.json\x1b[0m");
    console.log("Run \x1b[32mritualdev login\x1b[0m to connect your workstation via RFC 8628 SSO.\n");
    return null;
  }

  try {
    const raw = fs.readFileSync(LICENSE_PATH, "utf-8");
    const data = JSON.parse(raw);
    const verifyResult = verifyLicenseJwt(data.access_token);

    if (!verifyResult.valid) {
      console.error("\x1b[31m✖ Local license token is INVALID or CORRUPTED.\x1b[0m");
      console.error(`Error: ${verifyResult.error}\n`);
      return null;
    }

    const p = verifyResult.payload;
    const nowSec = Math.floor(Date.now() / 1000);
    const daysRemaining = Math.max(0, Math.ceil((p.exp - nowSec) / 86400));

    console.log(`• \x1b[1mStatus:\x1b[0m \x1b[32mACTIVE (Ed25519 Signature Verified)\x1b[0m`);
    console.log(`• \x1b[1mLicensee:\x1b[0m ${p.sub}`);
    console.log(`• \x1b[1mOrganization:\x1b[0m ${p.org_id || "default"}`);
    console.log(`• \x1b[1mTier:\x1b[0m \x1b[33m${String(p.tier).toUpperCase()}\x1b[0m (${p.seats} seat${p.seats > 1 ? "s" : ""})`);
    console.log(`• \x1b[1mDays Remaining:\x1b[0m ${daysRemaining} days (valid until ${new Date(p.exp * 1000).toLocaleDateString()})`);
    console.log(`• \x1b[1mFeatures Enabled (${p.features?.length || 0}):\x1b[0m`);
    for (const f of p.features || []) {
      console.log(`    \x1b[32m✔\x1b[0m ${f}`);
    }
    console.log();
    return p;
  } catch (err) {
    console.error(`\x1b[31mError reading license: ${err.message}\x1b[0m\n`);
    return null;
  }
}

export function logout() {
  let count = 0;
  if (fs.existsSync(LICENSE_PATH)) {
    fs.unlinkSync(LICENSE_PATH);
    count++;
  }
  if (fs.existsSync(AGENTSHIELD_LICENSE_PATH)) {
    try {
      fs.unlinkSync(AGENTSHIELD_LICENSE_PATH);
      count++;
    } catch {}
  }
  console.log(`\n\x1b[32m✔ Successfully logged out. Cleared ${count} local license file(s).\x1b[0m\n`);
}

// CLI argument dispatcher (only runs when invoked directly as CLI entrypoint)
const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectRun) {
  const args = process.argv.slice(2);
  const command = args[0] || "status";

  if (command === "login") {
    login().catch((err) => {
      console.error("Login fatal error:", err);
      process.exit(1);
    });
  } else if (command === "status") {
    status();
  } else if (command === "logout") {
    logout();
  } else if (command === "verify") {
    const token = args[1];
    if (!token) {
      console.error("Usage: ritualdev verify <jwt_token>");
      process.exit(1);
    }
    const res = verifyLicenseJwt(token);
    if (res.valid) {
      console.log("\x1b[32m✔ Ed25519 License JWT is VALID!\x1b[0m");
      console.log(JSON.stringify(res.payload, null, 2));
    } else {
      console.error("\x1b[31m✖ License token is INVALID!\x1b[0m", res.error);
      process.exit(1);
    }
  } else if (command === "--help" || command === "-h" || command === "help") {
    console.log(`
RitualDev CLI — Enterprise Workstation Identity & Offline Licensing

Usage:
  ritualdev login             Initiate RFC 8628 OAuth 2.0 device flow in terminal
  ritualdev status            Inspect local Ed25519 license status & entitlements
  ritualdev verify <token>    Verify any Ed25519 license JWT token offline
  ritualdev logout            Clear local workstation license credentials
`);
  }
}
