import { NextResponse } from "next/server";
import { handleDodoWebhookEvent } from "../../../../lib/dodo-webhook.js";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const result = await handleDodoWebhookEvent({
    rawBody,
    headers: req.headers,
    env: process.env,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({
    received: true,
    eventType: result.eventType,
    paymentId: result.paymentId,
    fulfillmentNote: result.fulfillmentNote,
  });
}
