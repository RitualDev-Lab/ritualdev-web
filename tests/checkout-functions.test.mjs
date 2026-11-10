import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildAuditCheckoutUrl, buildMcpCheckoutUrl, buildPartnerCheckoutUrl, buildCloudOrPrivateCheckoutUrl, buildTeamProductCheckoutUrl } from "../src/lib/checkout-urls.js";
import { verifyDodoWebhookSignature, handleDodoWebhookEvent } from "../src/lib/dodo-webhook.js";
import { onRequestPost as mcpOrderPost } from "../functions/api/mcp-order.js";
import { onRequestPost as auditOrderPost } from "../functions/api/audit-order.js";
import { onRequestPost as enterprisePost } from "../functions/api/enterprise.js";
import { onRequestPost as partnerOrderPost } from "../functions/api/partner-order.js";
import { onRequest as middlewareRequest } from "../functions/_middleware.js";
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

    const comboRes = await partnerOrderPost(
      makeContext({
        toolName: "Akii SEO",
        toolUrl: "https://github.com/akii-technologies-ltd/akii-seo-ai-search-optimizer",
        contactEmail: "team@akii.dev",
        tier: "combo_79",
        bundleCategories: ["ai", "cli", "cloud"],
      })
    );
    assert.equal(comboRes.status, 200);
    const comboJson = await comboRes.json();
    assert.ok(comboJson.checkoutUrl.includes("paymentAmount=79"));
    assert.ok(comboJson.checkoutUrl.includes("metadata_bundleCategories=ai%2Ccli%2Ccloud"));

    const customRes = await partnerOrderPost(
      makeContext({
        sponsorHandle: "@devpatron",
        contactEmail: "patron@acme.dev",
        tier: "custom",
        customAmountUsd: 125,
      })
    );
    assert.equal(customRes.status, 200);
    const customJson = await customRes.json();
    assert.ok(customJson.checkoutUrl.includes("paymentAmount=125"));
    assert.ok(customJson.checkoutUrl.includes("metadata_sponsorHandle=devpatron"));

    const clampedUrl = buildPartnerCheckoutUrl({
      orderId: "SPONSOR-MIN",
      tier: "custom",
      customAmountUsd: 1,
      sponsorHandle: "smallpatron",
      contactEmail: "p@acme.dev",
    });
    assert.ok(clampedUrl.includes("paymentAmount=5"));

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

    // Verified sponsor payment dispatches DevShelf activate-sponsor workflow automatically
    const sponsorBody = JSON.stringify({
      type: "payment.succeeded",
      data: {
        payment_id: "pay_sponsor_79",
        total_amount: 7900,
        currency: "USD",
        customer: { email: "founder@akii.dev" },
        metadata: {
          orderId: "SPONSOR-777",
          tier: "combo_79",
          toolName: "Akii SEO",
          toolUrl: "https://github.com/akii-technologies-ltd/akii-seo-ai-search-optimizer",
          category: "cli",
        },
      },
    });
    const sponsorSig = crypto
      .createHmac("sha256", rawSecret)
      .update(`${webhookId}.${ts}.${sponsorBody}`)
      .digest("base64");

    const origFetch = globalThis.fetch;
    let dispatchedUrl = "";
    let dispatchedTier = "";
    globalThis.fetch = async (url, init) => {
      dispatchedUrl = String(url);
      const bodyObj = JSON.parse(init?.body || "{}");
      dispatchedTier = bodyObj?.inputs?.tier || "";
      return new Response(null, { status: 204 });
    };
    try {
      const sponsorHookRes = await handleDodoWebhookEvent({
        rawBody: sponsorBody,
        headers: new Headers({
          "webhook-id": webhookId,
          "webhook-timestamp": ts,
          "webhook-signature": `v1,${sponsorSig}`,
        }),
        env: { DODO_WEBHOOK_SECRET: secretB64, GITHUB_PAT: "ghp_testtoken" },
      });
      assert.equal(sponsorHookRes.ok, true);
      assert.ok(dispatchedUrl.includes("activate-sponsor.yml/dispatches"));
      assert.equal(dispatchedTier, "enterprise");
      assert.ok(sponsorHookRes.fulfillmentNote.includes("activate-sponsor.yml"));
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("redirects donation.ritualdev.in and www.ritualdev.in to canonical ritualdev.in routes", async () => {
    const donRes = await middlewareRequest({
      request: new Request("https://donation.ritualdev.in/?src=qr"),
      next: () => new Response("ok"),
    });
    assert.equal(donRes.status, 302);
    assert.equal(donRes.headers.get("location"), "https://ritualdev.in/donate/?src=qr");

    const wwwRes = await middlewareRequest({
      request: new Request("https://www.ritualdev.in/partners?x=1"),
      next: () => new Response("ok"),
    });
    assert.equal(wwwRes.status, 301);
    assert.equal(wwwRes.headers.get("location"), "https://ritualdev.in/partners?x=1");

    let calledNext = false;
    await middlewareRequest({
      request: new Request("https://ritualdev.in/donate/"),
      next: () => {
        calledNext = true;
        return new Response("ok");
      },
    });
    assert.equal(calledNext, true);
  });

  it("builds team and suite checkout URLs for DBShield, AgentShield, SkillPrism, MCP Packs, and Turnkey deposits", async () => {
    const db29 = buildTeamProductCheckoutUrl({ tier: "dbshield_team_29", customerEmail: "dba@acme.io" });
    assert.ok(db29.includes("paymentAmount=29"));
    assert.ok(db29.includes("metadata_tier=dbshield_team_29"));

    const db99 = buildTeamProductCheckoutUrl({ tier: "dbshield_team_99", companyName: "Acme Corp" });
    assert.ok(db99.includes("pdt_0NrFSmrXT8zU2u5BKGJ7y"));
    assert.ok(db99.includes("metadata_tier=dbshield_team_99"));

    const sp99 = buildTeamProductCheckoutUrl({ tier: "skillprism_team_99" });
    assert.ok(sp99.includes("pdt_0NrFSmrXT8zU2u5BKGJ7y"));
    assert.ok(sp99.includes("skillprism_team_99"));

    const as19 = buildTeamProductCheckoutUrl({ tier: "agentshield_team_19" });
    assert.ok(as19.includes("pdt_0NpjONLXnMYR9e2SUlYJt"));

    const as49 = buildTeamProductCheckoutUrl({ tier: "agentshield_enterprise_49" });
    assert.ok(as49.includes("pdt_0NpjONNytUpW7gzjoDlYW"));

    const pack99 = buildTeamProductCheckoutUrl({ tier: "mcp_pack_all_99" });
    assert.ok(pack99.includes("pdt_0NpjONEJnu5OcWhncWF68"));
    assert.ok(pack99.includes("pack=all_access"));

    const tk250 = buildTeamProductCheckoutUrl({ tier: "turnkey_starter_250" });
    assert.ok(tk250.includes("pdt_0NpjOJVkkh7Mryrzm6ro9"));
    assert.ok(tk250.includes("deposit=250"));

    const pro15 = buildTeamProductCheckoutUrl({ tier: "ritual_pro_15" });
    assert.ok(pro15.includes("pdt_0NrFSkF5XLgBppfQRxgXN"));

    // Verify webhook recognizes product ID fallback even without explicit tier metadata
    const crypto = await import("node:crypto");
    const rawSecret = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    const secretB64 = `whsec_${Buffer.from(rawSecret).toString("base64")}`;
    const webhookId = "msg_team_99";
    const ts = Math.floor(Date.now() / 1000).toString();
    const rawBody = JSON.stringify({
      type: "subscription.active",
      data: {
        subscription_id: "sub_db_99",
        product_id: "pdt_0NrFSmrXT8zU2u5BKGJ7y",
        total_amount: 9900,
        currency: "USD",
        customer: { email: "infra@acme.io" },
        metadata: {},
      },
    });
    const sig = crypto.createHmac("sha256", rawSecret).update(`${webhookId}.${ts}.${rawBody}`).digest("base64");
    const res = await handleDodoWebhookEvent({
      rawBody,
      headers: new Headers({
        "webhook-id": webhookId,
        "webhook-timestamp": ts,
        "webhook-signature": `v1,${sig}`,
      }),
      env: { DODO_WEBHOOK_SECRET: secretB64 },
    });
    assert.equal(res.ok, true);
    assert.ok(res.fulfillmentNote.includes("Provision Hosted Team Relay / Governance tenant"));

    // Verify Private Core Repo routing for PromptShield-Core, MockForge-Core, FinePrintAI-Core
    const ps49 = buildTeamProductCheckoutUrl({ tier: "promptshield_pro_49", githubUsername: "@alice" });
    assert.ok(ps49.includes("paymentAmount=49"));
    assert.ok(ps49.includes("PromptShield-Core"));
    assert.ok(ps49.includes("metadata_github_username=alice"));

    const mf49 = buildTeamProductCheckoutUrl({ tier: "mockforge_pro_49" });
    assert.ok(mf49.includes("paymentAmount=49"));
    assert.ok(mf49.includes("MockForge-Core"));

    const fp79 = buildTeamProductCheckoutUrl({ tier: "fineprint_pro_79" });
    assert.ok(fp79.includes("paymentAmount=79"));
    assert.ok(fp79.includes("FinePrintAI-Core"));

    const coreBody = JSON.stringify({
      type: "payment.succeeded",
      data: {
        payment_id: "pay_fp_79",
        total_amount: 7900,
        currency: "USD",
        customer: { email: "counsel@acme.io" },
        metadata: { tier: "fineprint_pro_79", github_username: "legalops" },
      },
    });
    const coreSig = crypto.createHmac("sha256", rawSecret).update(`${webhookId}.${ts}.${coreBody}`).digest("base64");
    const origFetch2 = globalThis.fetch;
    let inviteUrl = "";
    globalThis.fetch = async (url) => {
      inviteUrl = String(url);
      return new Response(null, { status: 201 });
    };
    try {
      const coreRes = await handleDodoWebhookEvent({
        rawBody: coreBody,
        headers: new Headers({
          "webhook-id": webhookId,
          "webhook-timestamp": ts,
          "webhook-signature": `v1,${coreSig}`,
        }),
        env: { DODO_WEBHOOK_SECRET: secretB64, GITHUB_PAT: "ghp_testtoken" },
      });
      assert.equal(coreRes.ok, true);
      assert.ok(inviteUrl.includes("/repos/RitualDev-Lab/FinePrintAI-Core/collaborators/legalops"));
      assert.ok(coreRes.fulfillmentNote.includes("FinePrintAI-Core"));
    } finally {
      globalThis.fetch = origFetch2;
    }
  });
});
