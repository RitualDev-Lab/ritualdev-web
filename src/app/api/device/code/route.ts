import { NextResponse } from "next/server";
import { createDeviceSession } from "../../../../lib/device-store.js";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Record<string, any> = {};
  try {
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      const params = new URLSearchParams(text);
      for (const [k, v] of params.entries()) {
        body[k] = v;
      }
    }
  } catch {
    // defaults
  }

  const clientId = String(body?.client_id || "ritualdev-cli").slice(0, 100);
  const scope = String(body?.scope || "license offline_access").slice(0, 200);

  const url = new URL(req.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  const sessionData = createDeviceSession({
    clientId,
    scope,
    expiresInSeconds: 900,
    baseUrl,
  });

  return NextResponse.json(sessionData, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
      Pragma: "no-cache",
    },
  });
}
