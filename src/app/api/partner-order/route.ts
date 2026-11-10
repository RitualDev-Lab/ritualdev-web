import { NextResponse } from "next/server";
import { buildPartnerCheckoutUrl } from "../../../lib/checkout-urls.js";
import { dispatchOrderWebhook } from "../../../lib/cf-webhook.js";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
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
      return NextResponse.json({ error: "A valid contact email is required." }, { status: 400 });
    }
    if (!toolName || !toolUrl) {
      return NextResponse.json({ error: "Both Tool Name and Tool URL / Repo are required." }, { status: 400 });
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

    await dispatchOrderWebhook(
      process.env,
      `⭐ **New DevShelf Indie Spotlight Order [${orderId}]**\n• Tier: ${tier}\n• Tool: ${toolName} (${toolUrl})\n• Email: ${contactEmail.trim().toLowerCase()}\n• Tagline: ${tagline || "N/A"}`
    );

    return NextResponse.json({
      success: true,
      orderId,
      checkoutUrl,
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
