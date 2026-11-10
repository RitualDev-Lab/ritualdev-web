import { jsonResponse } from "../../../src/lib/cf-webhook.js";
import { handleDodoWebhookEvent } from "../../../src/lib/dodo-webhook.js";

export async function onRequestPost(context) {
  const rawBody = await context.request.text();
  const result = await handleDodoWebhookEvent({
    rawBody,
    headers: context.request.headers,
    env: context.env,
  });

  if (!result.ok) {
    return jsonResponse({ error: result.error }, result.status);
  }

  return jsonResponse({
    received: true,
    eventType: result.eventType,
    paymentId: result.paymentId,
    fulfillmentNote: result.fulfillmentNote,
  });
}
