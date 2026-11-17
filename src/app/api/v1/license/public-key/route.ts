import { NextResponse } from "next/server";
import {
  RITUAL_ROOT_PUBLIC_KEY_JWK,
  RITUAL_ROOT_PUBLIC_KEY_PEM,
  getPublicJwks,
} from "../../../../../lib/license-engine.js";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(
    {
      issuer: "https://ritualdev.in",
      algorithm: "EdDSA",
      curve: "Ed25519",
      jwks: getPublicJwks(),
      public_key_pem: RITUAL_ROOT_PUBLIC_KEY_PEM,
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=86400",
      },
    }
  );
}
