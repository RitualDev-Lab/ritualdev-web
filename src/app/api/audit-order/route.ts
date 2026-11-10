import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { buildAuditCheckoutUrl } from "../../../lib/checkout-urls.js";
import { dispatchOrderWebhook } from "../../../lib/cf-webhook.js";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      productName,
      targetUrl,
      repoUrl,
      contactEmail,
      launchDate = "ASAP",
      packageTier = "starter_199",
      notes = "",
      orderId: clientOrderId,
    } = body;

    if (!contactEmail || !contactEmail.includes("@")) {
      return NextResponse.json(
        { error: "A valid contact email is required to deliver your audit report." },
        { status: 400 }
      );
    }

    if (!targetUrl && !repoUrl) {
      return NextResponse.json(
        { error: "Please provide either a live web URL or a GitHub repository URL to audit." },
        { status: 400 }
      );
    }

    const orderId = clientOrderId || `AUDIT-${Math.floor(10000 + Math.random() * 90000)}`;
    const timestamp = new Date().toISOString();

    const deliverySla =
      packageTier === "pro_399"
        ? "24 Hours (Full SaaS + MCP Defense Audit)"
        : "24 Hours (Indie Pre-Launch Security Audit)";

    const orderRecord = {
      orderId,
      timestamp,
      productName: productName || "AI Product",
      targetUrl: targetUrl || "",
      repoUrl: repoUrl || "",
      contactEmail: contactEmail.trim().toLowerCase(),
      launchDate,
      packageTier,
      notes,
      status: "pending_payment",
      deliverySla,
    };

    console.log(`[AUDIT_ORDER_RECEIVED]`, JSON.stringify(orderRecord, null, 2));

    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const ordersFile = path.join(dataDir, "audit-orders.json");
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
      console.warn("Could not write audit order to file:", fsErr);
    }

    const checkoutUrl = buildAuditCheckoutUrl({
      orderId,
      packageTier,
      productName,
      targetUrl,
      repoUrl,
      contactEmail,
    });

    await dispatchOrderWebhook(
      process.env,
      `🛡️ **New Pre-Launch Security Audit Order [${orderId}]**\n• Tier: ${packageTier}\n• Product: ${orderRecord.productName}\n• Email: ${orderRecord.contactEmail}\n• Target URL: ${orderRecord.targetUrl || "N/A"}\n• Repo URL: ${orderRecord.repoUrl || "N/A"}`
    );

    return NextResponse.json({
      success: true,
      orderId,
      checkoutUrl,
      deliverySla,
      message: "Audit order registered. Proceeding to secure checkout.",
    });
  } catch (err: any) {
    console.error("Audit API Error:", err);
    return NextResponse.json(
      { error: "Internal server error registering audit order." },
      { status: 500 }
    );
  }
}
