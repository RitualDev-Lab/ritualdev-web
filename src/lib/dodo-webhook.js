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
    const ghUser = metadata?.github_username || metadata?.githubHandle;
    const tier = metadata?.tier || metadata?.plan || "hosted_relay";

    if (ghUser && env?.GITHUB_PAT && env?.PRIVATE_COMPLIANCE_REPO) {
      const invite = await inviteGitHubCollaborator({
        repoSlug: env.PRIVATE_COMPLIANCE_REPO,
        username: ghUser,
        githubPat: env.GITHUB_PAT,
      });
      fulfillmentNote = invite.invited
        ? `GitHub collaborator invited (@${invite.username} -> ${env.PRIVATE_COMPLIANCE_REPO})`
        : `GitHub invite skipped/failed: ${invite.reason || `HTTP ${invite.status}`}`;
    } else if (tier.includes("relay") || tier.includes("team")) {
      fulfillmentNote = `Provision Hosted Cloud Relay for ${customerEmail} (tier: ${tier})`;
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
