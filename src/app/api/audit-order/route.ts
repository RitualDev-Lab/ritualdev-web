import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      productName,
      targetUrl,
      repoUrl,
      contactEmail,
      launchDate,
      packageTier,
      notes,
    } = body;

    // Validation
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

    const orderId = `AUDIT-${Math.floor(10000 + Math.random() * 90000)}`;
    const timestamp = new Date().toISOString();

    const orderRecord = {
      orderId,
      timestamp,
      productName: productName || "AI Product",
      targetUrl: targetUrl || "",
      repoUrl: repoUrl || "",
      contactEmail: contactEmail.trim().toLowerCase(),
      launchDate: launchDate || "ASAP",
      packageTier: packageTier || "starter_199",
      notes: notes || "",
      status: "pending_payment",
    };

    console.log(`[AUDIT_ORDER_RECEIVED]`, JSON.stringify(orderRecord, null, 2));

    // Persist order locally
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

    // Determine checkout redirect URL based on tier
    const checkoutUrl =
      packageTier === "pro_399"
        ? `https://checkout.dodopayments.com/buy/pdt_0NrFWnSQHfJhuHs4Y9Xmh?quantity=1&redirect_url=${encodeURIComponent(`https://ritualdev.in/audit/success?id=${orderId}`)}`
        : `https://checkout.dodopayments.com/buy/pdt_0NrFWnRHHEI72iaB8AC9r?quantity=1&redirect_url=${encodeURIComponent(`https://ritualdev.in/audit/success?id=${orderId}`)}`;

    return NextResponse.json({
      success: true,
      orderId,
      checkoutUrl,
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
