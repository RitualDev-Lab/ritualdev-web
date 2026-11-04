import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      companyName,
      apiDocsUrl,
      contactEmail,
      tier,
      preferredTransport,
      includeMonetization,
      notes,
    } = body;

    if (!contactEmail || !contactEmail.includes("@")) {
      return NextResponse.json(
        { error: "A valid corporate or personal contact email is required." },
        { status: 400 }
      );
    }

    if (!apiDocsUrl && !notes) {
      return NextResponse.json(
        { error: "Please provide your API documentation URL, OpenAPI JSON link, or database details." },
        { status: 400 }
      );
    }

    const orderId = `MCP-SVC-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toISOString();

    const orderRecord = {
      orderId,
      timestamp,
      companyName: companyName || "Client Project",
      apiDocsUrl: apiDocsUrl || "",
      contactEmail: contactEmail.trim().toLowerCase(),
      tier: tier || "standard_349",
      preferredTransport: preferredTransport || "stdio + sse",
      includeMonetization: Boolean(includeMonetization),
      notes: notes || "",
      status: "pending_payment",
    };

    console.log(`[MCP_SERVICE_ORDER_RECEIVED]`, JSON.stringify(orderRecord, null, 2));

    // Persist order locally
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

    // Determine checkout redirect URL based on tier
    const checkoutUrl =
      tier === "pro_699"
        ? `https://checkout.dodopayments.com/buy/pdt_0NpjONGugY5QkrFDUaPva?quantity=3&redirect_url=${encodeURIComponent(`https://ritualdev.in/mcp-builder?success=true&id=${orderId}`)}`
        : `https://checkout.dodopayments.com/buy/pdt_0NpjONGugY5QkrFDUaPva?quantity=2&redirect_url=${encodeURIComponent(`https://ritualdev.in/mcp-builder?success=true&id=${orderId}`)}`;

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
