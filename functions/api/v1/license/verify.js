import { jsonResponse } from "../../../../src/lib/cf-webhook.js";
import { verifyLicenseJwt } from "../../../../src/lib/license-engine.js";

export async function onRequestPost(context) {
  let body = {};
  try {
    body = await context.request.json();
  } catch {
    return jsonResponse({ valid: false, error: "Malformed JSON payload" }, 400);
  }

  const token = String(body?.token || body?.license_jwt || "").trim();
  if (!token) {
    return jsonResponse({ valid: false, error: "Missing required license token" }, 400);
  }

  const result = verifyLicenseJwt(token);
  return jsonResponse(result, result.valid ? 200 : 400);
}
