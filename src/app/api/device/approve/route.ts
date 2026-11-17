import { NextResponse } from "next/server";
import { getDeviceSessionByUserCode, approveDeviceSession } from "../../../../lib/device-store.js";
import { mintLicenseJwt, resolveTierFeatures } from "../../../../lib/license-engine.js";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Record<string, any> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON payload" }, { status: 400 });
  }

  const userCode = String(body?.userCode || body?.user_code || "").trim();
  const email = String(body?.email || "").trim().toLowerCase();
  const tier = String(body?.tier || "pro").trim().toLowerCase();
  const orgDomain = String(body?.orgDomain || (email.includes("@") ? email.split("@")[1] : "default"));

  if (!userCode) {
    return NextResponse.json({ error: "Missing required userCode." }, { status: 400 });
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "A valid corporate email address is required." }, { status: 400 });
  }

  const session = getDeviceSessionByUserCode(userCode);
  if (!session) {
    return NextResponse.json({ error: "Invalid or expired verification code." }, { status: 404 });
  }

  // Mint the Ed25519-signed License JWT for this workstation
  const licenseJwt = mintLicenseJwt({
    customerEmail: email,
    tier,
    seats: tier === "enterprise" ? 25 : tier === "team" ? 5 : 1,
    orgId: orgDomain,
    expiresInDays: 365,
    env: process.env,
  });

  const features = resolveTierFeatures(tier);

  const approval = approveDeviceSession(userCode, {
    customerEmail: email,
    licenseJwt,
    licensePayload: {
      tier,
      customer_email: email,
      org_id: orgDomain,
      features,
      exp: Math.floor(Date.now() / 1000) + 365 * 86400,
    },
  });

  if (!approval.ok) {
    return NextResponse.json({ error: approval.error }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    success: true,
    message: "Workstation authorized successfully.",
    user_code: session.userCode,
    customer_email: email,
    tier,
    license_token: licenseJwt,
    license: {
      sub: email,
      tier,
      features,
    },
  });
}
