import { jsonResponse } from "../../../src/lib/cf-webhook.js";
import { createDeviceSession } from "../../../src/lib/device-store.js";

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
    // defaults
  }

  const clientId = String(body?.client_id || "ritualdev-cli").slice(0, 100);
  const scope = String(body?.scope || "license offline_access").slice(0, 200);

  const url = new URL(context.request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  const sessionData = createDeviceSession({
    clientId,
    scope,
    expiresInSeconds: 900,
    baseUrl,
  });

  return jsonResponse(sessionData, 200, {
    "Cache-Control": "no-store",
  });
}
