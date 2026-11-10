import { NextResponse } from "next/server";
import { preparePartnerOrder } from "../../../lib/checkout-urls.js";
import { dispatchOrderWebhook } from "../../../lib/cf-webhook.js";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prepared = preparePartnerOrder(body);
    if (prepared.error) {
      return NextResponse.json({ error: prepared.error }, { status: prepared.status || 400 });
    }

    await dispatchOrderWebhook(process.env, prepared.summary || "");

    return NextResponse.json({
      success: true,
      orderId: prepared.orderId,
      tier: prepared.tier,
      amountUsd: prepared.amountUsd,
      checkoutUrl: prepared.checkoutUrl,
      message: "DevShelf spotlight reservation registered. Redirecting to checkout.",
    });
  } catch (err: any) {
    console.error("Partner Order API Error:", err);
    return NextResponse.json(
      { error: "Internal server error registering spotlight order." },
      { status: 500 }
    );
  }
}
