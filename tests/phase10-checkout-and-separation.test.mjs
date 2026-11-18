import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import { onRequestPost as mcpOrderPost } from "../functions/api/mcp-order.js";
import { onRequestPost as dodoWebhookPost } from "../functions/api/webhooks/dodo.js";
import { onRequestGet as publicKeyGet } from "../functions/api/v1/license/public-key.js";
import { onRequestPost as licenseVerifyPost } from "../functions/api/v1/license/verify.js";

describe("Phase 10: Static Marketing vs. Cloudflare Functions Separation & Checkout/License E2E", () => {
  it("enforces clean separation between static Next.js export and Cloudflare Pages Functions", () => {
    const nextConfig = readFileSync(resolve("next.config.mjs"), "utf8");
    assert.match(nextConfig, /output:\s*['"]export['"]/, "Next.js must build as a pure static export");

    // All production checkout, webhook, and license endpoints must be served via Cloudflare Pages Functions
    for (const fnPath of [
      "functions/api/mcp-order.js",
      "functions/api/audit-order.js",
      "functions/api/enterprise.js",
      "functions/api/partner-order.js",
      "functions/api/webhooks/dodo.js",
      "functions/api/v1/license/verify.js",
      "functions/api/v1/license/public-key.js",
    ]) {
      assert.ok(existsSync(resolve(fnPath)), `Expected Cloudflare Pages Function: ${fnPath}`);
    }

    // CI workflow must remain fail-closed (no continue-on-error: true)
    const ciYaml = readFileSync(resolve(".github/workflows/ci.yml"), "utf8");
    assert.equal(
      /continue-on-error:\s*true/i.test(ciYaml),
      false,
      "CI workflow must not contain fail-open continue-on-error steps",
    );
  });

  it("executes end-to-end checkout session -> signed Dodo webhook -> Ed25519 license verification", async () => {
    // 1. Create a checkout session via Cloudflare Function
    const orderRes = await mcpOrderPost({
      request: new Request("https://ritualdev.in/api/mcp-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: "Phase10 Corp",
          apiDocsUrl: "https://api.phase10.example/openapi.json",
          contactEmail: "secops@phase10.example",
          tier: "standard_349",
        }),
      }),
      env: {},
    });
    assert.equal(orderRes.status, 200);
    const orderJson = await orderRes.json();
    assert.equal(orderJson.success, true);
    assert.ok(orderJson.checkoutUrl.startsWith("https://checkout.dodopayments.com/"));

    // 2. Fetch Ed25519 public key endpoint
    const pubKeyRes = await publicKeyGet({
      request: new Request("https://ritualdev.in/api/v1/license/public-key", { method: "GET" }),
      env: {},
    });
    assert.equal(pubKeyRes.status, 200);
    const pubKeyJson = await pubKeyRes.json();
    assert.equal(pubKeyJson.algorithm, "EdDSA");
    assert.ok(pubKeyJson.public_key_pem?.includes("BEGIN PUBLIC KEY"));
    assert.ok(Array.isArray(pubKeyJson.jwks?.keys) && pubKeyJson.jwks.keys.length >= 1);

    // 3. Deliver a validly HMAC-signed Dodo webhook event (Standard Webhooks base64 key) and mint a license JWT
    const rawKeyBytes = Buffer.from("phase10-dodo-webhook-signing-key", "utf8");
    const webhookSecret = `whsec_${rawKeyBytes.toString("base64")}`;
    const webhookId = "msg_phase10_001";
    const webhookTimestamp = String(Math.floor(Date.now() / 1000));
    const payload = JSON.stringify({
      type: "payment.succeeded",
      data: {
        payment_id: "pay_phase10_991",
        product_id: "pdt_0NpjONGugY5QkrFDUaPva",
        customer: { email: "secops@phase10.example", name: "SecOps Team" },
        metadata: { orderId: orderJson.orderId || "ORD-PHASE10", tier: "pro" },
      },
    });
    const signedContent = `${webhookId}.${webhookTimestamp}.${payload}`;
    const sig = createHmac("sha256", rawKeyBytes).update(signedContent).digest("base64");

    const whRes = await dodoWebhookPost({
      request: new Request("https://ritualdev.in/api/webhooks/dodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "webhook-id": webhookId,
          "webhook-timestamp": webhookTimestamp,
          "webhook-signature": `v1,${sig}`,
        },
        body: payload,
      }),
      env: { DODO_WEBHOOK_SECRET: webhookSecret },
    });
    assert.equal(whRes.status, 200);
    const whJson = await whRes.json();
    assert.equal(whJson.received, true);
    assert.ok(whJson.licenseJwt, "Signed webhook must mint a verifiable Ed25519 license JWT");

    // 4. Verify the minted license JWT via /api/v1/license/verify
    const verifyOkRes = await licenseVerifyPost({
      request: new Request("https://ritualdev.in/api/v1/license/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: whJson.licenseJwt }),
      }),
      env: {},
    });
    assert.equal(verifyOkRes.status, 200);
    const verifyOkJson = await verifyOkRes.json();
    assert.equal(verifyOkJson.valid, true);

    // 5. Tampered token & missing token must fail closed with HTTP 400
    const tamperedRes = await licenseVerifyPost({
      request: new Request("https://ritualdev.in/api/v1/license/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: `${whJson.licenseJwt}tampered` }),
      }),
      env: {},
    });
    assert.equal(tamperedRes.status, 400);
    const tamperedJson = await tamperedRes.json();
    assert.equal(tamperedJson.valid, false);

    const missingRes = await licenseVerifyPost({
      request: new Request("https://ritualdev.in/api/v1/license/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }),
      env: {},
    });
    assert.equal(missingRes.status, 400);
  });
});
