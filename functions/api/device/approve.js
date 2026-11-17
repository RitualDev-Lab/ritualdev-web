import { jsonResponse } from "../../../src/lib/cf-webhook.js";
import { getDeviceSessionByUserCode, approveDeviceSession } from "../../../src/lib/device-store.js";
import { mintLicenseJwt, resolveTierFeatures } from "../../../src/lib/license-engine.js";

export async function onRequestPost(context) {
  let body = {};
  try {
    body = await context.request.json();
  } catch {
    return jsonResponse({ error: "Malformed JSON payload" }, 400);
  }

  const userCode = String(body?.userCode || body?.user_code || "").trim();
  const email = String(body?.email || "").trim().toLowerCase();
  const tier = String(body?.tier || "pro").trim().toLowerCase();
  const orgDomain = String(body?.orgDomain || (email.includes("@") ? email.split("@")[1] : "default"));

  if (!userCode) {
    return jsonResponse({ error: "Missing required userCode." }, 400);
  }

  if (!email || !email.includes("@")) {
    return jsonResponse({ error: "A valid corporate email address is required." }, 400);
  }

  const session = getDeviceSessionByUserCode(userCode);
  if (!session) {
    return jsonResponse({ error: "Invalid or expired verification code." }, 404);
  }

  const licenseJwt = mintLicenseJwt({
    customerEmail: email,
    tier,
    seats: tier === "enterprise" ? 25 : tier === "team" ? 5 : 1,
    orgId: orgDomain,
    expiresInDays: 365,
    env: context.env,
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
    return jsonResponse({ error: approval.error }, 400);
  }

  return jsonResponse({
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
