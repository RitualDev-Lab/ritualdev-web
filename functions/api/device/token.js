import { jsonResponse } from "../../../src/lib/cf-webhook.js";
import { getDeviceSessionByDeviceCode } from "../../../src/lib/device-store.js";

export async function onRequestPost(context) {
  let body = {};
  try {
    const contentType = context.request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await context.request.json();
    } else {
      const text = await context.request.text();
      const params = new URLSearchParams(text);
      for (const [k, v] of params.entries()) {
        body[k] = v;
      }
    }
  } catch {
    return jsonResponse({ error: "invalid_request", error_description: "Malformed request" }, 400);
  }

  const deviceCode = String(body?.device_code || "").trim();
  if (!deviceCode) {
    return jsonResponse({ error: "invalid_request", error_description: "Missing required device_code" }, 400);
  }

  const session = getDeviceSessionByDeviceCode(deviceCode);
  if (!session) {
    return jsonResponse({ error: "invalid_grant", error_description: "Invalid or unknown device code" }, 400);
  }

  if (session.status === "expired" || Date.now() > session.expiresAt) {
    return jsonResponse({ error: "expired_token", error_description: "The device verification code has expired." }, 400);
  }

  if (session.status === "denied") {
    return jsonResponse({ error: "access_denied", error_description: "The user denied authorization." }, 400);
  }

  if (session.status === "pending") {
    return jsonResponse(
      { error: "authorization_pending", error_description: "Authorization pending browser confirmation." },
      400,
      { "Cache-Control": "no-store" }
    );
  }

  if (session.status === "approved" && session.licenseJwt) {
    return jsonResponse(
      {
        access_token: session.licenseJwt,
        token_type: "Bearer",
        expires_in: 2592000,
        scope: session.scope,
        license: {
          tier: session.licensePayload?.tier || "pro",
          customer_email: session.customerEmail,
          features: session.licensePayload?.features || [],
          expires_at: session.licensePayload?.exp,
        },
      },
      200,
      { "Cache-Control": "no-store" }
    );
  }

  return jsonResponse({ error: "server_error" }, 500);
}
