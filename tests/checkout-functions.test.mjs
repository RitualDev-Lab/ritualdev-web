import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildAuditCheckoutUrl, buildMcpCheckoutUrl, buildPartnerCheckoutUrl, buildCloudOrPrivateCheckoutUrl } from "../src/lib/checkout-urls.js";
import { verifyDodoWebhookSignature, handleDodoWebhookEvent } from "../src/lib/dodo-webhook.js";
import { onRequestPost as mcpOrderPost } from "../functions/api/mcp-order.js";
import { onRequestPost as auditOrderPost } from "../functions/api/audit-order.js";
import { onRequestPost as enterprisePost } from "../functions/api/enterprise.js";
import { onRequestPost as partnerOrderPost } from "../functions/api/partner-order.js";
import affiliatesData from "../src/data/affiliates.json" with { type: "json" };

function makeContext(body, env = {}) {
  return {
    request: new Request("https://ritualdev.in/api/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
    env,
  };
}

describe("Storefront Checkout URL Builders & Cloudflare Pages Functions", () => {
  it("builds consistent MCP Dodo checkout URLs with order metadata", () => {
    const url349 = buildMcpCheckoutUrl({
      orderId: "MCP-SVC-101",
      tier: "standard_349",
      companyName: "BlackFriday.dev",
      apiDocsUrl: "https://www.blackfriday.dev",
      contactEmail: "Zoltan@Bergside.com",
    });
    assert.ok(url349.includes("paymentAmount=349"));
    assert.ok(url349.includes("email=zoltan%40bergside.com"));
    assert.ok(url349.includes("metadata_orderId=MCP-SVC-101"));
    assert.ok(url349.includes("mcp-builder%2F%3Fsuccess%3Dtrue"));

    const url699 = buildMcpCheckoutUrl({
      orderId: "MCP-SVC-102",
      tier: "pro_699",
      contactEmail: "cto@acme.io",
    });
    assert.ok(url699.includes("paymentAmount=699"));
  });

  it("maps Starter $199 and Pro $399 audits to distinct Dodo product IDs", () => {
    const starter = buildAuditCheckoutUrl({
      orderId: "AUDIT-199",
      packageTier: "starter_199",
      targetUrl: "https://thrum.team",
      contactEmail: "leon@letto.ca",
    });
    const pro = buildAuditCheckoutUrl({
      orderId: "AUDIT-399",
      packageTier: "pro_399",
      repoUrl: "https://github.com/traccia-ai/traccia-py",
      contactEmail: "founder@traccia.ai",
    });
    assert.ok(starter.includes("pdt_0NrFWnRHHEI72iaB8AC9r"));
    assert.ok(pro.includes("pdt_0NrFWnSQHfJhuHs4Y9Xmh"));
  });

  it("mcp-order Cloudflare function rejects missing email and returns checkoutUrl on valid input", async () => {
    const bad = await mcpOrderPost(makeContext({ apiDocsUrl: "https://example.com" }));
    assert.equal(bad.status, 400);

    const ok = await mcpOrderPost(
      makeContext({
        companyName: "Acme API",
        apiDocsUrl: "https://api.acme.com/openapi.json",
        contactEmail: "founder@acme.com",
        tier: "standard_349",
      })
    );
    assert.equal(ok.status, 200);
    const json = await ok.json();
    assert.equal(json.success, true);
    assert.ok(json.checkoutUrl.includes("paymentAmount=349"));
  });

  it("audit-order and enterprise Cloudflare functions validate and return success", async () => {
    const auditRes = await auditOrderPost(
      makeContext({
        productName: "Thrum",
        targetUrl: "https://thrum.team",
        contactEmail: "leon@letto.ca",
        packageTier: "starter_199",
      })
    );
    assert.equal(auditRes.status, 200);
    const auditJson = await auditRes.json();
    assert.ok(auditJson.checkoutUrl.includes("pdt_0NrFWnRHHEI72iaB8AC9r"));

    const entRes = await enterprisePost(
      makeContext({
        fullName: "Jane Doe",
        workEmail: "jane@corp.io",
        companyName: "Corp",
      })
    );
    assert.equal(entRes.status, 200);
    const entJson = await entRes.json();
    assert.equal(entJson.success, true);
    assert.ok(entJson.submissionId.startsWith("SLA-REQ-"));
  });

  it("partner-order Cloudflare function supports $9/$19/$49 indie tiers and affiliates include cloud bounties", async () => {
    const pUrl = buildPartnerCheckoutUrl({
      orderId: "SPONSOR-999",
      tier: "spotlight_19",
      toolName: "BlackFriday.dev",
      toolUrl: "https://www.blackfriday.dev",
      contactEmail: "zoltan@bergside.com",
    });
    assert.ok(pUrl.includes("paymentAmount=19"));
    assert.ok(pUrl.includes("metadata_toolName=BlackFriday.dev"));

    const partnerRes = await partnerOrderPost(
      makeContext({
        toolName: "BlackFriday.dev",
        toolUrl: "https://www.blackfriday.dev",
        contactEmail: "zoltan@bergside.com",
        tier: "starter_9",
      })
    );
    assert.equal(partnerRes.status, 200);
    const partnerJson = await partnerRes.json();
    assert.ok(partnerJson.checkoutUrl.includes("paymentAmount=9"));

    const slugs = affiliatesData.partners.map((p) => p.slug);
    for (const expected of ["digitalocean", "railway", "hetzner", "cloudflare", "posthog", "neon", "vultr", "supabase"]) {
      assert.ok(slugs.includes(expected), `Expected affiliate slug: ${expected}`);
    }
  });

  it("verifies Standard Webhooks HMAC signature and rejects invalid or stale Dodo webhooks", async () => {
    const cloudUrl = buildCloudOrPrivateCheckoutUrl({
      tier: "private_compliance_kit",
      customerEmail: "ciso@acme.com",
      githubUsername: "@octocat",
    });
    assert.ok(cloudUrl.includes("pdt_0NrFWnRHHEI72iaB8AC9r"));
    assert.ok(cloudUrl.includes("metadata_github_username=octocat"));

    const rawSecret = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    const secretB64 = `whsec_${Buffer.from(rawSecret).toString("base64")}`;
    const webhookId = "msg_test_123";
    const ts = Math.floor(Date.now() / 1000).toString();
    const rawBody = JSON.stringify({
      type: "payment.succeeded",
      data: {
        payment_id: "pay_001",
        total_amount: 19900,
        currency: "USD",
        customer: { email: "buyer@acme.com" },
        metadata: { tier: "private_compliance_kit", github_username: "octocat" },
      },
    });

    const crypto = await import("node:crypto");
    const sig = crypto
      .createHmac("sha256", rawSecret)
      .update(`${webhookId}.${ts}.${rawBody}`)
      .digest("base64");

    const valid = await verifyDodoWebhookSignature({
      rawBody,
      webhookId,
      webhookTimestamp: ts,
      webhookSignature: `v1,${sig}`,
      secret: secretB64,
    });
    assert.equal(valid, true);

    const invalid = await verifyDodoWebhookSignature({
      rawBody: rawBody + " ",
      webhookId,
      webhookTimestamp: ts,
      webhookSignature: `v1,${sig}`,
      secret: secretB64,
    });
    assert.equal(invalid, false);

    const resOk = await handleDodoWebhookEvent({
      rawBody,
      headers: new Headers({
        "webhook-id": webhookId,
        "webhook-timestamp": ts,
        "webhook-signature": `v1,${sig}`,
      }),
      env: { DODO_WEBHOOK_SECRET: secretB64 },
    });
    assert.equal(resOk.ok, true);
    assert.equal(resOk.status, 200);
    assert.equal(resOk.paymentId, "pay_001");

    const resBad = await handleDodoWebhookEvent({
      rawBody,
      headers: new Headers({
        "webhook-id": webhookId,
        "webhook-timestamp": ts,
        "webhook-signature": "v1,invalidsig",
      }),
      env: { DODO_WEBHOOK_SECRET: secretB64 },
    });
    assert.equal(resBad.ok, false);
    assert.equal(resBad.status, 401);
  });
});
