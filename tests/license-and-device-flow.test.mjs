import assert from "node:assert/strict";
import { describe, it, before, after } from "node:test";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

// Engine & Store modules
import {
  mintLicenseJwt,
  verifyLicenseJwt,
  resolveTierFeatures,
  isFeatureEntitled,
  getPublicJwks,
  RITUAL_ROOT_PUBLIC_KEY_PEM,
  RITUAL_ROOT_PUBLIC_KEY_JWK,
  TIER_FEATURES,
  base64UrlEncode,
  base64UrlDecode,
} from "../src/lib/license-engine.js";

import {
  createDeviceSession,
  getDeviceSessionByUserCode,
  getDeviceSessionByDeviceCode,
  approveDeviceSession,
  denyDeviceSession,
  generateUserCode,
  generateDeviceCode,
  cleanupExpiredSessions,
} from "../src/lib/device-store.js";

import {
  handleDodoWebhookEvent,
  verifyDodoWebhookSignature,
} from "../src/lib/dodo-webhook.js";

// Cloudflare Pages Serverless Functions Handlers
import { onRequestPost as deviceCodePost } from "../functions/api/device/code.js";
import { onRequestPost as deviceTokenPost } from "../functions/api/device/token.js";
import { onRequestPost as deviceApprovePost } from "../functions/api/device/approve.js";
import { onRequestGet as licensePublicKeyGet } from "../functions/api/v1/license/public-key.js";
import { onRequestPost as licenseVerifyPost } from "../functions/api/v1/license/verify.js";
import { onRequestPost as dodoWebhookPost } from "../functions/api/webhooks/dodo.js";

// Helper to construct Cloudflare Pages Function context
function makeCfContext(body, headers = {}, env = {}, url = "https://ritualdev.in/api/test") {
  const req = new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
  return {
    request: req,
    env,
  };
}

describe("Phase 1: Unified Licensing, Dodo Webhooks & RFC 8628 Flow", () => {

  describe("1. Asymmetric Ed25519 License Engine", () => {
    it("mints an authentic RFC 8037 Ed25519-signed License JWT with authoritative root key", () => {
      const jwt = mintLicenseJwt({
        customerEmail: "alice@acme-corp.com",
        tier: "pro",
        seats: 3,
        paymentId: "pdt_test_12345",
      });

      assert.ok(typeof jwt === "string", "JWT must be a string");
      const parts = jwt.split(".");
      assert.strictEqual(parts.length, 3, "JWT must consist of header, payload, and signature");

      // Verify Header
      const header = JSON.parse(base64UrlDecode(parts[0]).toString("utf-8"));
      assert.strictEqual(header.alg, "EdDSA");
      assert.strictEqual(header.typ, "JWT");
      assert.strictEqual(header.kid, "ritualdev-license-v1");

      // Verify Payload
      const payload = JSON.parse(base64UrlDecode(parts[1]).toString("utf-8"));
      assert.strictEqual(payload.iss, "https://ritualdev.in");
      assert.strictEqual(payload.sub, "alice@acme-corp.com");
      assert.strictEqual(payload.tier, "pro");
      assert.strictEqual(payload.seats, 3);
      assert.strictEqual(payload.payment_id, "pdt_test_12345");
      assert.strictEqual(payload.org_id, "acme-corp.com");
      assert.ok(payload.exp > payload.iat, "exp must be after iat");
      assert.ok(Array.isArray(payload.features), "features must be an array");
      assert.ok(payload.features.includes("agentshield_sandbox_local"));
    });

    it("verifies minted license offline with embedded root public key with zero network egress", () => {
      const jwt = mintLicenseJwt({
        customerEmail: "security-team@enterprise.io",
        tier: "enterprise",
        seats: 25,
        orgId: "enterprise.io",
        expiresInDays: 30,
      });

      const verification = verifyLicenseJwt(jwt);
      assert.strictEqual(verification.valid, true);
      assert.ok(verification.payload);
      assert.strictEqual(verification.payload.sub, "security-team@enterprise.io");
      assert.strictEqual(verification.payload.tier, "enterprise");
      assert.strictEqual(verification.payload.seats, 25);
      assert.ok(verification.payload.features.includes("agentshield_ebpf_core"));
      assert.ok(verification.payload.features.includes("poly_slsa_attestation"));
      assert.ok(verification.payload.features.includes("hardware_tpm_signatures"));
    });

    it("cryptographically rejects tampered signatures, headers, or payloads", () => {
      const jwt = mintLicenseJwt({
        customerEmail: "bob@developer.org",
        tier: "starter",
      });

      const parts = jwt.split(".");

      // 1. Tamper payload: change tier from starter to enterprise
      const payload = JSON.parse(base64UrlDecode(parts[1]).toString("utf-8"));
      payload.tier = "enterprise";
      payload.features = TIER_FEATURES.enterprise;
      const tamperedPayloadB64 = base64UrlEncode(JSON.stringify(payload));
      const tamperedJwt = `${parts[0]}.${tamperedPayloadB64}.${parts[2]}`;

      const tamperedResult = verifyLicenseJwt(tamperedJwt);
      assert.strictEqual(tamperedResult.valid, false);
      assert.ok(tamperedResult.error.includes("Cryptographic signature verification failed"));

      // 2. Tamper signature: change first character
      const sig = parts[2];
      const corruptedSig = (sig[0] === "A" ? "B" : "A") + sig.slice(1);
      const corruptedJwt = `${parts[0]}.${parts[1]}.${corruptedSig}`;

      const corruptedResult = verifyLicenseJwt(corruptedJwt);
      assert.strictEqual(corruptedResult.valid, false);
      assert.ok(corruptedResult.error.includes("Cryptographic signature verification failed"));
    });

    it("rejects tokens signed with rogue or unauthorized Ed25519 private keys", () => {
      // Generate a rogue keypair
      const rogue = crypto.generateKeyPairSync("ed25519");
      const roguePrivPem = rogue.privateKey.export({ type: "pkcs8", format: "pem" });

      const rogueJwt = mintLicenseJwt({
        customerEmail: "attacker@rogue.net",
        tier: "enterprise",
        env: { RITUAL_LICENSE_PRIVATE_KEY: roguePrivPem },
      });

      // Verification against authoritative root public key must fail
      const rogueResult = verifyLicenseJwt(rogueJwt);
      assert.strictEqual(rogueResult.valid, false);
      assert.ok(rogueResult.error.includes("Cryptographic signature verification failed"));
    });

    it("rejects expired licenses and returns accurate expiration error details", () => {
      const expiredJwt = mintLicenseJwt({
        customerEmail: "charlie@past.com",
        tier: "pro",
        expiresInDays: -10, // Expired 10 days ago
      });

      const result = verifyLicenseJwt(expiredJwt);
      assert.strictEqual(result.valid, false);
      assert.ok(result.error.includes("License has expired"));
      assert.ok(result.payload);
      assert.strictEqual(result.payload.sub, "charlie@past.com");
    });

    it("evaluates feature entitlements and tier matrices correctly", () => {
      assert.strictEqual(isFeatureEntitled({ features: ["poly_slsa_attestation"] }, "poly_slsa_attestation"), true);
      assert.strictEqual(isFeatureEntitled({ features: ["poly_slsa_attestation"] }, "agentshield_ebpf_core"), false);
      assert.strictEqual(isFeatureEntitled({ features: ["*"] }, "any_future_feature"), true);
      assert.strictEqual(isFeatureEntitled(null, "any"), false);

      const freeFeatures = resolveTierFeatures("free");
      assert.ok(freeFeatures.includes("agentshield_sandbox_local"));
      assert.ok(!freeFeatures.includes("poly_slsa_attestation"));

      const enterpriseFeatures = resolveTierFeatures("enterprise");
      assert.ok(enterpriseFeatures.includes("agentshield_ebpf_core"));
      assert.ok(enterpriseFeatures.includes("hardware_tpm_signatures"));
    });

    it("exposes RFC 7517 compliant JWKS public key set", () => {
      const jwks = getPublicJwks();
      assert.ok(Array.isArray(jwks.keys));
      assert.strictEqual(jwks.keys.length, 1);
      const key = jwks.keys[0];
      assert.strictEqual(key.kty, "OKP");
      assert.strictEqual(key.crv, "Ed25519");
      assert.strictEqual(key.kid, "ritualdev-license-v1");
      assert.strictEqual(key.use, "sig");
      assert.strictEqual(key.x, RITUAL_ROOT_PUBLIC_KEY_JWK.x);
    });
  });

  describe("2. RFC 8628 Device Authorization Grant Store", () => {
    it("generates user codes following unambiguous 20-character format (XXXX-YYYY)", () => {
      const code = generateUserCode();
      assert.match(code, /^[BCDFGHJKMNPQRSTVWXYZ23456789]{4}-[BCDFGHJKMNPQRSTVWXYZ23456789]{4}$/);
      assert.ok(!code.includes("0") && !code.includes("O"));
      assert.ok(!code.includes("1") && !code.includes("I") && !code.includes("L"));
    });

    it("creates a pending device session and returns standard RFC 8628 parameters", () => {
      const session = createDeviceSession({
        clientId: "agentshield-cli",
        scope: "license offline_access",
        expiresInSeconds: 600,
        baseUrl: "https://ritualdev.in",
      });

      assert.ok(session.device_code.startsWith("dev_"));
      assert.match(session.user_code, /^[A-Z0-9]{4}-[A-Z0-9]{4}$/);
      assert.strictEqual(session.verification_uri, "https://ritualdev.in/device/");
      assert.strictEqual(
        session.verification_uri_complete,
        `https://ritualdev.in/device/?user_code=${session.user_code}`
      );
      assert.strictEqual(session.expires_in, 600);
      assert.strictEqual(session.interval, 5);

      // Verify retrieval by device_code
      const storedByDev = getDeviceSessionByDeviceCode(session.device_code);
      assert.ok(storedByDev);
      assert.strictEqual(storedByDev.status, "pending");
      assert.strictEqual(storedByDev.clientId, "agentshield-cli");

      // Verify lookup by user_code (case-insensitive and hyphen-agnostic)
      const storedByUser = getDeviceSessionByUserCode(session.user_code.toLowerCase().replace("-", ""));
      assert.ok(storedByUser);
      assert.strictEqual(storedByUser.deviceCode, session.device_code);
    });

    it("approves a pending session and binds minted license token", () => {
      const session = createDeviceSession({ clientId: "poly-cli" });
      const userCode = session.user_code;

      const dummyJwt = mintLicenseJwt({ customerEmail: "dev@acme.com", tier: "team" });
      const approval = approveDeviceSession(userCode, {
        customerEmail: "dev@acme.com",
        licenseJwt: dummyJwt,
        licensePayload: { tier: "team", customer_email: "dev@acme.com" },
      });

      assert.strictEqual(approval.ok, true);
      assert.strictEqual(approval.session.status, "approved");
      assert.strictEqual(approval.session.licenseJwt, dummyJwt);

      // Verify checking by device_code reflects approval
      const updated = getDeviceSessionByDeviceCode(session.device_code);
      assert.strictEqual(updated.status, "approved");
      assert.strictEqual(updated.customerEmail, "dev@acme.com");
      assert.strictEqual(updated.licenseJwt, dummyJwt);
    });

    it("denies a pending device session correctly", () => {
      const session = createDeviceSession();
      const denied = denyDeviceSession(session.user_code);
      assert.strictEqual(denied, true);

      const updated = getDeviceSessionByDeviceCode(session.device_code);
      assert.strictEqual(updated.status, "denied");
    });
  });

  describe("3. Dodo Payments Webhook Automated License Minting & Device Fulfillment", () => {
    // Generate valid HMAC signature helper for Dodo Payments Standard Webhooks
    async function signDodoWebhook(rawBody, secret = "whsec_test_secret_1234567890abcdef1234567890abcdef") {
      const webhookId = `msg_${crypto.randomBytes(12).toString("hex")}`;
      const webhookTimestamp = Math.floor(Date.now() / 1000).toString();

      const cleanSecret = secret.startsWith("whsec_") ? secret.slice(6) : secret;
      const keyBuf = Buffer.from(cleanSecret, "base64");
      const hmac = crypto.createHmac("sha256", keyBuf);
      hmac.update(`${webhookId}.${webhookTimestamp}.${rawBody}`);
      const sigB64 = hmac.digest("base64");
      const webhookSignature = `v1,${sigB64}`;

      return {
        webhookId,
        webhookTimestamp,
        webhookSignature,
        secret,
      };
    }

    it("processes payment.succeeded event, mints Ed25519 license JWT, and auto-approves device session", async () => {
      // 1. User ran `ritualdev login` in terminal, creating device session
      const deviceSession = createDeviceSession({ clientId: "ritualdev-cli" });
      const userCode = deviceSession.user_code;

      // 2. Dodo Payments webhook payload containing user_code in metadata
      const webhookPayload = JSON.stringify({
        type: "payment.succeeded",
        data: {
          payment_id: "pay_live_dodo_987654321",
          amount: 4900,
          currency: "USD",
          customer: {
            email: "cto@fintech-unicorn.com",
            name: "FinTech CTO",
          },
          metadata: {
            tier: "enterprise",
            seats: "10",
            user_code: userCode,
            orderId: "ORD-ENTERPRISE-55",
          },
        },
      });

      const { webhookId, webhookTimestamp, webhookSignature, secret } = await signDodoWebhook(webhookPayload);

      const headers = new Headers({
        "webhook-id": webhookId,
        "webhook-timestamp": webhookTimestamp,
        "webhook-signature": webhookSignature,
      });

      const res = await handleDodoWebhookEvent({
        rawBody: webhookPayload,
        headers,
        env: { DODO_WEBHOOK_SECRET: secret },
      });

      assert.strictEqual(res.ok, true);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.eventType, "payment.succeeded");
      assert.ok(res.licenseJwt, "License JWT must be minted");
      assert.strictEqual(res.tier, "enterprise");
      assert.ok(res.fulfillmentNote.includes("Auto-approved RFC 8628 device session"));

      // 3. Cryptographically verify the minted license from webhook
      const verifyRes = verifyLicenseJwt(res.licenseJwt);
      assert.strictEqual(verifyRes.valid, true);
      assert.strictEqual(verifyRes.payload.sub, "cto@fintech-unicorn.com");
      assert.strictEqual(verifyRes.payload.tier, "enterprise");
      assert.strictEqual(verifyRes.payload.seats, 10);
      assert.strictEqual(verifyRes.payload.payment_id, "pay_live_dodo_987654321");

      // 4. Verify that the device session in store was auto-approved with the license
      const deviceCheck = getDeviceSessionByDeviceCode(deviceSession.device_code);
      assert.strictEqual(deviceCheck.status, "approved");
      assert.strictEqual(deviceCheck.licenseJwt, res.licenseJwt);
      assert.strictEqual(deviceCheck.customerEmail, "cto@fintech-unicorn.com");
    });

    it("rejects webhooks with invalid or missing HMAC signatures", async () => {
      const payload = JSON.stringify({ type: "payment.succeeded" });
      const headers = new Headers({
        "webhook-id": "msg_invalid",
        "webhook-timestamp": Math.floor(Date.now() / 1000).toString(),
        "webhook-signature": "v1,invalid_signature_here",
      });

      const res = await handleDodoWebhookEvent({
        rawBody: payload,
        headers,
        env: { DODO_WEBHOOK_SECRET: "whsec_test_secret_1234567890abcdef1234567890abcdef" },
      });

      assert.strictEqual(res.ok, false);
      assert.strictEqual(res.status, 401);
      assert.strictEqual(res.error, "Invalid webhook signature");
    });
  });

  describe("4. Cloudflare Pages & Next.js Endpoints Integration", () => {
    it("handles RFC 8628 full cycle via Cloudflare Functions: /api/device/code -> /api/device/token (pending) -> /api/device/approve -> /api/device/token (success)", async () => {
      // Step A: Request Device & User Code
      const codeCtx = makeCfContext({ client_id: "cloudflare-cli", scope: "license offline_access" });
      const codeResp = await deviceCodePost(codeCtx);
      assert.strictEqual(codeResp.status, 200);
      const codeData = await codeResp.json();
      assert.ok(codeData.device_code);
      assert.ok(codeData.user_code);

      // Step B: Poll token while pending
      const tokenPendingCtx = makeCfContext({
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
        device_code: codeData.device_code,
      });
      const tokenPendingResp = await deviceTokenPost(tokenPendingCtx);
      assert.strictEqual(tokenPendingResp.status, 400);
      const tokenPendingData = await tokenPendingResp.json();
      assert.strictEqual(tokenPendingData.error, "authorization_pending");

      // Step C: Browser approval from https://ritualdev.in/device/
      const approveCtx = makeCfContext({
        userCode: codeData.user_code,
        email: "lead-dev@startup.io",
        tier: "pro",
      });
      const approveResp = await deviceApprovePost(approveCtx);
      assert.strictEqual(approveResp.status, 200);
      const approveData = await approveResp.json();
      assert.strictEqual(approveData.ok, true);
      assert.strictEqual(approveData.license?.sub, "lead-dev@startup.io");
      assert.strictEqual(approveData.license?.tier, "pro");

      // Step D: Poll token after approval - CLI receives authorized Ed25519 license token
      const tokenApprovedCtx = makeCfContext({
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
        device_code: codeData.device_code,
      });
      const tokenApprovedResp = await deviceTokenPost(tokenApprovedCtx);
      assert.strictEqual(tokenApprovedResp.status, 200);
      const tokenApprovedData = await tokenApprovedResp.json();
      assert.ok(tokenApprovedData.access_token);
      assert.strictEqual(tokenApprovedData.token_type, "Bearer");

      // Step E: Offline verification of access token
      const offlineCheck = verifyLicenseJwt(tokenApprovedData.access_token);
      assert.strictEqual(offlineCheck.valid, true);
      assert.strictEqual(offlineCheck.payload.sub, "lead-dev@startup.io");
      assert.strictEqual(offlineCheck.payload.tier, "pro");
    });

    it("handles RFC 8628 device flow with form-urlencoded bodies and handles denial & errors", async () => {
      // Step A: Form urlencoded device code request
      const formBody = "client_id=poly-cli&scope=license%20offline_access";
      const codeCtx = makeCfContext(formBody, { "Content-Type": "application/x-www-form-urlencoded" });
      const codeResp = await deviceCodePost(codeCtx);
      assert.strictEqual(codeResp.status, 200);
      const codeData = await codeResp.json();

      // Step B: Form urlencoded token request while pending
      const tokenCtx = makeCfContext(
        `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Adevice_code&device_code=${codeData.device_code}`,
        { "Content-Type": "application/x-www-form-urlencoded" }
      );
      const tokenResp = await deviceTokenPost(tokenCtx);
      assert.strictEqual(tokenResp.status, 400);
      const tokenData = await tokenResp.json();
      assert.strictEqual(tokenData.error, "authorization_pending");

      // Step C: Invalid device code returns invalid_grant
      const invalidCtx = makeCfContext({ device_code: "dev_non_existent" });
      const invalidResp = await deviceTokenPost(invalidCtx);
      assert.strictEqual(invalidResp.status, 400);
      const invalidData = await invalidResp.json();
      assert.strictEqual(invalidData.error, "invalid_grant");

      // Step D: Denying the session returns access_denied
      denyDeviceSession(codeData.user_code);
      const deniedCtx = makeCfContext(
        `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Adevice_code&device_code=${codeData.device_code}`,
        { "Content-Type": "application/x-www-form-urlencoded" }
      );
      const deniedResp = await deviceTokenPost(deniedCtx);
      assert.strictEqual(deniedResp.status, 400);
      const deniedData = await deniedResp.json();
      assert.strictEqual(deniedData.error, "access_denied");
    });

    it("serves authoritative public keys via /api/v1/license/public-key (JSON & PEM)", async () => {
      // 1. JSON JWKS
      const reqJson = {
        request: new Request("https://ritualdev.in/api/v1/license/public-key"),
        env: {},
      };
      const respJson = await licensePublicKeyGet(reqJson);
      assert.strictEqual(respJson.status, 200);
      const bodyJson = await respJson.json();
      assert.strictEqual(bodyJson.algorithm, "EdDSA");
      assert.strictEqual(bodyJson.curve, "Ed25519");
      assert.ok(bodyJson.public_key_pem.includes("BEGIN PUBLIC KEY"));
      assert.ok(bodyJson.jwks?.keys?.length > 0);

      // 2. Raw PEM via ?format=pem
      const reqPem = {
        request: new Request("https://ritualdev.in/api/v1/license/public-key?format=pem"),
        env: {},
      };
      const respPem = await licensePublicKeyGet(reqPem);
      assert.strictEqual(respPem.status, 200);
      const bodyPem = await respPem.text();
      assert.ok(bodyPem.startsWith("-----BEGIN PUBLIC KEY-----"));
    });

    it("verifies licenses via online endpoint /api/v1/license/verify", async () => {
      const validJwt = mintLicenseJwt({ customerEmail: "verified@client.io", tier: "pro" });
      const verifyCtx = makeCfContext({ token: validJwt });
      const verifyResp = await licenseVerifyPost(verifyCtx);
      assert.strictEqual(verifyResp.status, 200);
      const body = await verifyResp.json();
      assert.strictEqual(body.valid, true);
      assert.strictEqual(body.payload.sub, "verified@client.io");

      // Invalid token
      const invalidCtx = makeCfContext({ token: "invalid.jwt.token" });
      const invalidResp = await licenseVerifyPost(invalidCtx);
      assert.strictEqual(invalidResp.status, 400);
      const invalidBody = await invalidResp.json();
      assert.strictEqual(invalidBody.valid, false);
    });
  });

  describe("5. Unified CLI Entitlements & Workstation Credential Cache", () => {
    const tempDir = path.join(os.tmpdir(), `ritual-test-${Date.now()}`);
    const tempLicensePath = path.join(tempDir, ".ritual", "license.json");

    before(() => {
      fs.mkdirSync(path.dirname(tempLicensePath), { recursive: true });
    });

    after(() => {
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch {}
    });

    it("validates offline entitlement tokens without internet connection", () => {
      const token = mintLicenseJwt({
        customerEmail: "developer@airgapped-corp.internal",
        tier: "enterprise",
        seats: 50,
      });

      // Emulate offline CLI verification
      const result = verifyLicenseJwt(token);
      assert.strictEqual(result.valid, true);
      assert.strictEqual(result.payload.tier, "enterprise");
      assert.strictEqual(result.payload.seats, 50);

      // Verify workstation credentials file serialization
      const licenseRecord = {
        access_token: token,
        issued_at: new Date().toISOString(),
        gateway: "https://ritualdev.in",
        payload: result.payload,
      };

      fs.writeFileSync(tempLicensePath, JSON.stringify(licenseRecord, null, 2), "utf-8");
      assert.ok(fs.existsSync(tempLicensePath));

      const readBack = JSON.parse(fs.readFileSync(tempLicensePath, "utf-8"));
      const verificationFromDisk = verifyLicenseJwt(readBack.access_token);
      assert.strictEqual(verificationFromDisk.valid, true);
      assert.strictEqual(verificationFromDisk.payload.sub, "developer@airgapped-corp.internal");
    });
  });
});
