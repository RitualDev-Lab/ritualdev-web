import { buildPartnerCheckoutUrl } from "../../src/lib/checkout-urls.js";
import { dispatchOrderWebhook, jsonResponse } from "../../src/lib/cf-webhook.js";

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const {
      toolName,
      toolUrl,
      category = "ai",
      contactEmail,
      tier = "spotlight_19",
      tagline = "",
      orderId: clientOrderId,
    } = body || {};

    if (!contactEmail || typeof contactEmail !== "string" || !contactEmail.includes("@")) {
      return jsonResponse({ error: "A valid contact email is required." }, 400);
    }
    if (!toolName || !toolUrl) {
      return jsonResponse({ error: "Both Tool Name and Tool URL / Repo are required." }, 400);
    }

    const orderId = clientOrderId || `SPONSOR-${Math.floor(10000 + Math.random() * 90000)}`;
    const checkoutUrl = buildPartnerCheckoutUrl({
      orderId,
      tier,
      toolName,
      toolUrl,
      category,
      contactEmail,
    });

    const tierLabel =
      tier === "leader_49"
        ? "$49/mo (Category Leader + MCP Pin)"
        : tier === "starter_9"
        ? "$9 (Indie Directory Listing)"
        : "$19 (30-Day Launch Spotlight + Digest)";

    await dispatchOrderWebhook(
      context.env,
      [
        `⭐ **New DevShelf Indie Spotlight Order [${orderId}]**`,
        `• **Tier:** ${tierLabel}`,
        `• **Tool:** ${toolName} (${toolUrl})`,
        `• **Category:** ${category}`,
        `• **Email:** ${contactEmail.trim().toLowerCase()}`,
        `• **Tagline:** ${tagline || "None provided"}`,
      ].join("\n")
    );

    return jsonResponse({
      success: true,
      orderId,
      checkoutUrl,
      message: "DevShelf spotlight reservation registered. Proceeding to checkout.",
    });
  } catch (err) {
    console.error("CF Pages Partner Order Error:", err);
    return jsonResponse({ error: "Internal server error registering spotlight order." }, 500);
  }
}
