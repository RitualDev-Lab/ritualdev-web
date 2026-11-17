import { NextResponse } from "next/server";
import { verifyLicenseJwt } from "../../../../../lib/license-engine.js";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Record<string, any> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ valid: false, error: "Malformed JSON payload" }, { status: 400 });
  }

  const token = String(body?.token || body?.license_jwt || "").trim();
  if (!token) {
    return NextResponse.json({ valid: false, error: "Missing required license token" }, { status: 400 });
  }

  const result = verifyLicenseJwt(token);
  return NextResponse.json(result, { status: result.valid ? 200 : 400 });
}
