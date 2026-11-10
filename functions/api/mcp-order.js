import { buildMcpCheckoutUrl } from "../../src/lib/checkout-urls.js";
import { dispatchOrderWebhook, jsonResponse } from "../../src/lib/cf-webhook.js";

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const {
      companyName,
      apiDocsUrl,
      contactEmail,
      tier = "standard_349",
      preferredTransport = "stdio + sse",
      includeMonetization = true,
      notes = "",
      orderId: clientOrderId,
    } = body || {};

    if (!contactEmail || typeof contactEmail !== "string" || !contactEmail.includes("@")) {
      return jsonResponse(
        { error: "A valid corporate or personal contact email is required." },
        400
      );
    }

    if (!apiDocsUrl && !notes) {
      return jsonResponse(
        { error: "Please provide your API documentation URL, OpenAPI JSON link, or endpoint notes." },
        400
      );
    }

    const orderId = clientOrderId || `MCP-SVC-${Math.floor(10000 + Math.random() * 90000)}`;
    const checkoutUrl = buildMcpCheckoutUrl({
      orderId,
      tier,
      companyName,
      apiDocsUrl,
      contactEmail,
      preferredTransport,
      includeMonetization,
    });

    const alertText = [
      `🚀 **New Custom MCP Server Order [${orderId}]**`,
      `• **Tier:** ${tier === "pro_699" ? "$699 (Monetized & Cloud MCP)" : "$349 (Standard 48h Connector)"}`,
      `• **Company:** ${companyName || "Client Project"}`,
      `• **Email:** ${contactEmail.trim().toLowerCase()}`,
      `• **API Docs:** ${apiDocsUrl || "See notes"}`,
      `• **Transport:** ${preferredTransport} | Monetize: ${Boolean(includeMonetization)}`,
      `• **Notes:** ${notes || "None"}`,
    ].join("\n");

    await dispatchOrderWebhook(context.env, alertText);

    return jsonResponse({
      success: true,
      orderId,
      checkoutUrl,
      message: "MCP Server build order registered. Redirecting to checkout.",
    });
  } catch (err) {
    console.error("CF Pages MCP Order Error:", err);
    return jsonResponse({ error: "Internal server error registering MCP build order." }, 500);
  }
}
