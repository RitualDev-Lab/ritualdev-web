import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { buildMcpCheckoutUrl } from "../../../lib/checkout-urls.js";
import { dispatchOrderWebhook } from "../../../lib/cf-webhook.js";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      companyName,
      apiDocsUrl,
      contactEmail,
      tier = "standard_349",
      preferredTransport = "stdio + sse",
      includeMonetization = true,
      notes = "",
      orderId: clientOrderId,
    } = body;

    if (!contactEmail || !contactEmail.includes("@")) {
      return NextResponse.json(
        { error: "A valid corporate or personal contact email is required." },
        { status: 400 }
      );
    }

    if (!apiDocsUrl && !notes) {
      return NextResponse.json(
        { error: "Please provide your API documentation URL, OpenAPI JSON link, or endpoint details." },
        { status: 400 }
      );
    }

    const orderId = clientOrderId || `MCP-SVC-${Math.floor(10000 + Math.random() * 90000)}`;
    const timestamp = new Date().toISOString();

    const orderRecord = {
      orderId,
      timestamp,
      companyName: companyName || "Client Project",
      apiDocsUrl: apiDocsUrl || "",
      contactEmail: contactEmail.trim().toLowerCase(),
      tier,
      preferredTransport,
      includeMonetization: Boolean(includeMonetization),
      notes,
      status: "pending_payment",
    };

    console.log(`[MCP_SERVICE_ORDER_RECEIVED]`, JSON.stringify(orderRecord, null, 2));

    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const ordersFile = path.join(dataDir, "mcp-service-orders.json");
      let orders = [];
      if (fs.existsSync(ordersFile)) {
        try {
          orders = JSON.parse(fs.readFileSync(ordersFile, "utf8"));
        } catch (_) {
          orders = [];
        }
      }
      orders.push(orderRecord);
      fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), "utf8");
    } catch (fsErr) {
      console.warn("Could not write MCP service order to file:", fsErr);
    }

    const checkoutUrl = buildMcpCheckoutUrl({
      orderId,
      tier,
      companyName,
      apiDocsUrl,
      contactEmail,
      preferredTransport,
      includeMonetization,
    });

    await dispatchOrderWebhook(
      process.env,
      `🚀 **New Custom MCP Server Order [${orderId}]**\n• Tier: ${tier}\n• Company: ${orderRecord.companyName}\n• Email: ${orderRecord.contactEmail}\n• API Docs: ${orderRecord.apiDocsUrl || "See notes"}`
    );

    return NextResponse.json({
      success: true,
      orderId,
      checkoutUrl,
      message: "MCP Server build order registered. Redirecting to checkout.",
    });
  } catch (err: any) {
    console.error("MCP Order API Error:", err);
    return NextResponse.json(
      { error: "Internal server error registering MCP build order." },
      { status: 500 }
    );
  }
}
