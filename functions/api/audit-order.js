import { buildAuditCheckoutUrl } from "../../src/lib/checkout-urls.js";
import { dispatchOrderWebhook, jsonResponse } from "../../src/lib/cf-webhook.js";

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const {
      productName,
      targetUrl,
      repoUrl,
      contactEmail,
      launchDate = "ASAP",
      packageTier = "starter_199",
      notes = "",
      orderId: clientOrderId,
    } = body || {};

    if (!contactEmail || typeof contactEmail !== "string" || !contactEmail.includes("@")) {
      return jsonResponse(
        { error: "A valid contact email is required to deliver your audit report." },
        400
      );
    }

    if (!targetUrl && !repoUrl) {
      return jsonResponse(
        { error: "Please provide either a live web URL or a GitHub repository URL to audit." },
        400
      );
    }

    const orderId = clientOrderId || `AUDIT-${Math.floor(10000 + Math.random() * 90000)}`;
    const checkoutUrl = buildAuditCheckoutUrl({
      orderId,
      packageTier,
      productName,
      targetUrl,
      repoUrl,
      contactEmail,
    });

    const deliverySla =
      packageTier === "pro_399"
        ? "24 Hours (Full SaaS + MCP Defense Audit)"
        : "24 Hours (Indie Pre-Launch Security Audit)";

    const alertText = [
      `🛡️ **New Pre-Launch Security Audit Order [${orderId}]**`,
      `• **Tier:** ${packageTier} (${deliverySla})`,
      `• **Product:** ${productName || "AI Product"}`,
      `• **Email:** ${contactEmail.trim().toLowerCase()}`,
      `• **Target URL:** ${targetUrl || "N/A"}`,
      `• **Repo URL:** ${repoUrl || "N/A"}`,
      `• **Timeline:** ${launchDate}`,
      `• **Notes:** ${notes || "None"}`,
    ].join("\n");

    await dispatchOrderWebhook(context.env, alertText);

    return jsonResponse({
      success: true,
      orderId,
      checkoutUrl,
      deliverySla,
      message: "Audit order registered. Proceeding to secure checkout.",
    });
  } catch (err) {
    console.error("CF Pages Audit Order Error:", err);
    return jsonResponse({ error: "Internal server error registering audit order." }, 500);
  }
}
