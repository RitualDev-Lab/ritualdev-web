import { preparePartnerOrder } from "../../src/lib/checkout-urls.js";
import { corsPreflightResponse, dispatchOrderWebhook, jsonResponse } from "../../src/lib/cf-webhook.js";

export async function onRequestOptions() {
  return corsPreflightResponse();
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const prepared = preparePartnerOrder(body);
    if (prepared.error) {
      return jsonResponse({ error: prepared.error }, prepared.status || 400);
    }

    await dispatchOrderWebhook(context.env, prepared.summary);

    return jsonResponse({
      success: true,
      orderId: prepared.orderId,
      tier: prepared.tier,
      amountUsd: prepared.amountUsd,
      checkoutUrl: prepared.checkoutUrl,
      message: "DevShelf spotlight reservation registered. Proceeding to checkout.",
    });
  } catch (err) {
    console.error("CF Pages Partner Order Error:", err);
    return jsonResponse({ error: "Internal server error registering spotlight order." }, 500);
  }
}
