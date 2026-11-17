import { NextResponse } from "next/server";
import { getDeviceSessionByDeviceCode } from "../../../../lib/device-store.js";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Record<string, any> = {};
  try {
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await req.json();
    } else {
      const text = await req.text();
      const params = new URLSearchParams(text);
      for (const [k, v] of params.entries()) {
        body[k] = v;
      }
    }
  } catch {
    return NextResponse.json(
      { error: "invalid_request", error_description: "Malformed token request" },
      { status: 400 }
    );
  }

  const deviceCode = String(body?.device_code || "").trim();
  if (!deviceCode) {
    return NextResponse.json(
      { error: "invalid_request", error_description: "Missing required device_code parameter" },
      { status: 400 }
    );
  }

  const session = getDeviceSessionByDeviceCode(deviceCode);
  if (!session) {
    return NextResponse.json(
      { error: "invalid_grant", error_description: "Invalid or unknown device code" },
      { status: 400 }
    );
  }

  if (session.status === "expired" || Date.now() > session.expiresAt) {
    return NextResponse.json(
      { error: "expired_token", error_description: "The device verification code has expired." },
      { status: 400 }
    );
  }

  if (session.status === "denied") {
    return NextResponse.json(
      { error: "access_denied", error_description: "The user denied authorization." },
      { status: 400 }
    );
  }

  if (session.status === "pending") {
    return NextResponse.json(
      { error: "authorization_pending", error_description: "Authorization pending browser confirmation." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (session.status === "approved" && session.licenseJwt) {
    return NextResponse.json(
      {
        access_token: session.licenseJwt,
        token_type: "Bearer",
        expires_in: 2592000, // 30 days
        scope: session.scope,
        license: {
          tier: session.licensePayload?.tier || "pro",
          customer_email: session.customerEmail,
          features: session.licensePayload?.features || [],
          expires_at: session.licensePayload?.exp,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
          Pragma: "no-cache",
        },
      }
    );
  }

  return NextResponse.json(
    { error: "server_error", error_description: "Unexpected session state" },
    { status: 500 }
  );
}
