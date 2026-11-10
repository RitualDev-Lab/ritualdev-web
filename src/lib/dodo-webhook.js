import { dispatchOrderWebhook } from "./cf-webhook.js";

function decodeBase64(b64) {
  const binStr = atob(b64);
  const bytes = new Uint8Array(binStr.length);
  for (let i = 0; i < binStr.length; i++) {
    bytes[i] = binStr.charCodeAt(i);
  }
  return bytes;
}

function encodeBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) {
    bin += String.fromCharCode(bytes[i]);
  }
  return btoa(bin);
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Verifies Standard Webhooks (Dodo Payments) HMAC-SHA256 signature.
 */
export async function verifyDodoWebhookSignature({
  rawBody,
  webhookId,
  webhookTimestamp,
  webhookSignature,
  secret,
  nowMs = Date.now(),
}) {
  if (!secret || !webhookId || !webhookTimestamp || !webhookSignature) {
    return false;
  }

  const tsSec = Number.parseInt(webhookTimestamp, 10);
  if (!Number.isFinite(tsSec) || Math.abs(nowMs / 1000 - tsSec) > 300) {
    return false;
  }

  const cleanSecret = secret.startsWith("whsec_") ? secret.slice(6) : secret;
  const keyBytes = decodeBase64(cleanSecret);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signedContent = new TextEncoder().encode(`${webhookId}.${webhookTimestamp}.${rawBody}`);
  const sigBuf = await crypto.subtle.sign("HMAC", cryptoKey, signedContent);
  const expectedB64 = encodeBase64(sigBuf);

  const candidates = webhookSignature.trim().split(/\s+/);
  for (const cand of candidates) {
    const [version, sig] = cand.split(",");
    if (version === "v1" && sig && timingSafeEqual(sig, expectedB64)) {
      return true;
    }
  }
  return false;
}

export function resolvePrivateRepoForOrder({ tier = "", metadata = {}, env = {} }) {
  const explicit = String(metadata?.coreRepo || metadata?.repo || "").trim().toLowerCase();
  const t = String(tier || "").toLowerCase();
  const combined = `${t} ${explicit}`;

  if (combined.includes("promptshield")) {
    return env?.PRIVATE_PROMPTSHIELD_REPO || "RitualDev-Lab/PromptShield-Core";
  }
  if (combined.includes("mockforge")) {
    return env?.PRIVATE_MOCKFORGE_REPO || "RitualDev-Lab/MockForge-Core";
  }
  if (combined.includes("fineprint")) {
    return env?.PRIVATE_FINEPRINT_REPO || "RitualDev-Lab/FinePrintAI-Core";
  }
  return env?.PRIVATE_COMPLIANCE_REPO || "";
}

export async function inviteGitHubCollaborator({ repoSlug, username, githubPat }) {
  if (!repoSlug || !username || !githubPat) {
    return { invited: false, reason: "Missing GITHUB_PAT, repoSlug, or github_username" };
  }
  const cleanUser = username.replace(/^@/, "").replace(/[^a-zA-Z0-9-]/g, "");
  if (!cleanUser) {
    return { invited: false, reason: "Invalid GitHub username" };
  }

  const res = await fetch(
    `https://api.github.com/repos/${repoSlug}/collaborators/${encodeURIComponent(cleanUser)}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${githubPat}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "RitualDev-Fulfillment/1.0",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ permission: "pull" }),
    }
  );
  return {
    invited: res.status === 201 || res.status === 204,
    status: res.status,
    username: cleanUser,
  };
}

const SPONSOR_TIER_MAP = new Set([
  "starter_9",
  "spotlight_19",
  "category_39",
  "leader_49",
  "combo_79",
  "custom",
  "starter",
  "mcpPro",
  "categoryTakeover",
  "featuredSponsor",
  "enterprise",
  "newsletterSpotlight",
]);

function mapToWorkflowTier(rawTier = "") {
  const t = String(rawTier || "").toLowerCase();
  if (t.includes("combo") || t.includes("enterprise") || t.includes("featured") || t === "custom") {
    return "enterprise";
  }
  if (t.includes("leader") || t.includes("category") || t.includes("mcp")) {
    return "mcpPro";
  }
  return "starter";
}

function mapToWorkflowCategory(rawCat = "") {
  const c = String(rawCat || "").toLowerCase().trim();
  if (c === "databases") return "cloud";
  if (c === "devops") return "cli";
  const allowed = new Set(["ai", "cli", "apis", "cloud", "testing", "boilerplates", "perks"]);
  return allowed.has(c) ? c : "cli";
}

export async function dispatchDevShelfSponsorActivation({
  toolName,
  toolUrl,
  category = "cli",
  tier = "spotlight_19",
  amount,
  githubHandle = "",
  patronName = "",
  comment = "",
  githubPat,
}) {
  if (!githubPat) {
    return { dispatched: false, reason: "Missing GITHUB_PAT" };
  }
  if (!toolName || !toolUrl) {
    return { dispatched: false, reason: "Missing toolName or toolUrl metadata" };
  }

  const workflowTier = mapToWorkflowTier(tier);
  const workflowCategory = mapToWorkflowCategory(category);
  const normalizedUsd =
    typeof amount === "number"
      ? String(amount >= 100 && Number.isInteger(amount) ? Math.round(amount / 100) : amount)
      : amount
        ? String(amount)
        : "";

  const res = await fetch(
    "https://api.github.com/repos/RitualDev-Lab/DevShelf/actions/workflows/activate-sponsor.yml/dispatches",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${githubPat}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "RitualDev-Fulfillment/1.0",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ref: "main",
        inputs: {
          tool_name: String(toolName).slice(0, 120),
          tool_url: String(toolUrl).slice(0, 200),
          category: workflowCategory,
          tier: workflowTier,
          pitch: String(comment || `${toolName} — Verified DevShelf Sponsor (${tier})`).slice(0, 160),
          patron_name: String(patronName || toolName).slice(0, 120),
          github_handle: String(githubHandle || "").replace(/^@/, "").slice(0, 60),
          amount: normalizedUsd,
          comment: String(comment || `Activated tier: ${tier}`).slice(0, 300),
        },
      }),
    }
  );

  return {
    dispatched: res.status === 204 || res.status === 200,
    workflowTier,
    status: res.status,
  };
}

export async function handleDodoWebhookEvent({ rawBody, headers, env }) {
  const secret = env?.DODO_WEBHOOK_SECRET;
  if (!secret) {
    return { ok: false, status: 500, error: "DODO_WEBHOOK_SECRET not configured" };
  }

  const webhookId = headers.get("webhook-id") || "";
  const webhookTimestamp = headers.get("webhook-timestamp") || "";
  const webhookSignature = headers.get("webhook-signature") || "";

  const isValid = await verifyDodoWebhookSignature({
    rawBody,
    webhookId,
    webhookTimestamp,
    webhookSignature,
    secret,
  });

  if (!isValid) {
    return { ok: false, status: 401, error: "Invalid webhook signature" };
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return { ok: false, status: 400, error: "Malformed JSON webhook body" };
  }

  const eventType = event?.type || event?.event_type || "unknown";
  const data = event?.data || {};
  const metadata = data?.metadata || {};
  const customerEmail = data?.customer?.email || metadata?.customer_email || "unknown";
  const amount = data?.total_amount ?? data?.amount ?? "unknown";
  const currency = data?.currency || "USD";
  const paymentId = data?.payment_id || data?.subscription_id || webhookId;

  const isPaid =
    eventType === "payment.succeeded" ||
    eventType === "subscription.active" ||
    eventType === "subscription.renewed";

  let fulfillmentNote = "Recorded verified event.";
  if (isPaid) {
    const ghUser =
      metadata?.github_username ||
      metadata?.githubHandle ||
      metadata?.sponsorHandle ||
      metadata?.github;
    const productId = data?.product_id || data?.product_cart?.[0]?.product_id || "";
    const tier = metadata?.tier || metadata?.package || metadata?.plan || productId || "hosted_relay";
    const toolName = metadata?.toolName || metadata?.tool_name;
    const toolUrl = metadata?.toolUrl || metadata?.tool_url || metadata?.url;
    const orderId = metadata?.orderId || "";
    const isSponsorPayment = SPONSOR_TIER_MAP.has(tier) || orderId.startsWith("SPONSOR-") || Boolean(toolName && toolUrl);
    const targetPrivateRepo = resolvePrivateRepoForOrder({ tier, metadata, env });

    if (isSponsorPayment) {
      const activation = await dispatchDevShelfSponsorActivation({
        toolName: toolName || metadata?.sponsorName || customerEmail,
        toolUrl: toolUrl || "https://ritualdev.in/partners",
        category: metadata?.category || metadata?.toolCategory || "cli",
        tier,
        amount,
        githubHandle: ghUser,
        patronName: metadata?.sponsorName || data?.customer?.name || toolName,
        comment: metadata?.sponsor_comment || metadata?.comment || metadata?.toolPitch || "",
        githubPat: env?.GITHUB_PAT,
      });
      fulfillmentNote = activation.dispatched
        ? `Dispatched DevShelf activate-sponsor.yml workflow (tier: ${activation.workflowTier})`
        : `DevShelf workflow dispatch pending manual review: ${activation.reason || `HTTP ${activation.status}`}`;
    } else if (targetPrivateRepo && ghUser && env?.GITHUB_PAT) {
      const invite = await inviteGitHubCollaborator({
        repoSlug: targetPrivateRepo,
        username: ghUser,
        githubPat: env.GITHUB_PAT,
      });
      fulfillmentNote = invite.invited
        ? `GitHub collaborator invited (@${invite.username} -> ${targetPrivateRepo})`
        : `GitHub invite skipped/failed (${targetPrivateRepo}): ${invite.reason || `HTTP ${invite.status}`}`;
    } else if (targetPrivateRepo) {
      fulfillmentNote = `Pending GitHub invite to ${targetPrivateRepo} for ${customerEmail} (handle=${ghUser || "missing"}, tier=${tier})`;
    } else if (
      tier.includes("dbshield") ||
      tier.includes("skillprism") ||
      tier.includes("relay") ||
      tier.includes("team") ||
      tier.includes("hub") ||
      tier.includes("enterprise") ||
      tier.includes("websec") ||
      productId === "pdt_0NpjONLXnMYR9e2SUlYJt" ||
      productId === "pdt_0NpjONNytUpW7gzjoDlYW" ||
      productId === "pdt_0NrFSmrXT8zU2u5BKGJ7y"
    ) {
      fulfillmentNote = `Provision Hosted Team Relay / Governance tenant for ${customerEmail} (tier: ${tier})`;
    } else if (
      tier.includes("mcp") ||
      tier.includes("turnkey") ||
      productId === "pdt_0NrFWlIkkreo5fOBIJWxI" ||
      productId === "pdt_0NpjONEJnu5OcWhncWF68" ||
      productId === "pdt_0NpjOJVkkh7Mryrzm6ro9"
    ) {
      fulfillmentNote = `Deliver MCP Kit / Turnkey kickoff for ${customerEmail} (tier: ${tier})`;
    } else if (
      tier.includes("audit") ||
      orderId.startsWith("AUDIT-") ||
      productId === "pdt_0NrFWnRHHEI72iaB8AC9r" ||
      productId === "pdt_0NrFWnSQHfJhuHs4Y9Xmh"
    ) {
      fulfillmentNote = `Queue Pre-Launch Security Audit for ${customerEmail} (tier: ${tier})`;
    }

    await dispatchOrderWebhook(
      env,
      [
        `💰 **Verified Dodo Payment [${eventType}]**`,
        `• **Payment ID:** ${paymentId}`,
        `• **Customer:** ${customerEmail}`,
        `• **Amount:** ${amount} ${currency}`,
        `• **Tier / Metadata:** ${JSON.stringify(metadata)}`,
        `• **Fulfillment:** ${fulfillmentNote}`,
      ].join("\n")
    );
  }

  return {
    ok: true,
    status: 200,
    eventType,
    paymentId,
    fulfillmentNote,
  };
}
