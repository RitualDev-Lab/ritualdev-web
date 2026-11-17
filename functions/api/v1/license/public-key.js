import { jsonResponse } from "../../../../src/lib/cf-webhook.js";
import {
  RITUAL_ROOT_PUBLIC_KEY_PEM,
  getPublicJwks,
} from "../../../../src/lib/license-engine.js";

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const format = url.searchParams.get("format");

  if (format === "pem") {
    return new Response(RITUAL_ROOT_PUBLIC_KEY_PEM, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  return jsonResponse(
    {
      issuer: "https://ritualdev.in",
      algorithm: "EdDSA",
      curve: "Ed25519",
      jwks: getPublicJwks(),
      public_key_pem: RITUAL_ROOT_PUBLIC_KEY_PEM,
    },
    200,
    {
      "Cache-Control": "public, max-age=86400",
    }
  );
}
