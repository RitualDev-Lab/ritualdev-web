import { NextResponse } from "next/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-static";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "public", "api", "v1", "registry", "tools.json");
    const content = readFileSync(filePath, "utf8");
    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read tool registry" }, { status: 500 });
  }
}
