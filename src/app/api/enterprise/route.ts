import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      workEmail,
      companyName,
      fleetSize,
      infraEnvironment,
      selectedNeeds,
      notes,
    } = body;

    // Validation
    if (!workEmail || typeof workEmail !== "string" || !workEmail.includes("@")) {
      return NextResponse.json(
        { error: "A valid corporate work email is required." },
        { status: 400 }
      );
    }

    const submissionId = `SLA-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toISOString();

    const leadRecord = {
      submissionId,
      timestamp,
      fullName: fullName || "Not specified",
      workEmail: workEmail.trim().toLowerCase(),
      companyName: companyName || "Not specified",
      fleetSize: fleetSize || "Not specified",
      infraEnvironment: infraEnvironment || "AWS Private VPC",
      selectedNeeds: Array.isArray(selectedNeeds) ? selectedNeeds : [],
      notes: notes || "",
    };

    // Log structured lead
    console.log(`[ENTERPRISE_LEAD] New inquiry:`, JSON.stringify(leadRecord, null, 2));

    // Persist lead locally in data/leads.json if directory writable
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const leadsFile = path.join(dataDir, "enterprise-leads.json");
      let leads = [];
      if (fs.existsSync(leadsFile)) {
        try {
          leads = JSON.parse(fs.readFileSync(leadsFile, "utf8"));
        } catch (_) {
          leads = [];
        }
      }
      leads.push(leadRecord);
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), "utf8");
    } catch (fsErr) {
      console.warn("Could not write enterprise lead to file:", fsErr);
    }

    return NextResponse.json({
      success: true,
      submissionId,
      message: "Enterprise SLA inquiry received. A principal security engineer will contact you within 1 business day.",
      lead: leadRecord,
    });
  } catch (err: any) {
    console.error("Enterprise API Error:", err);
    return NextResponse.json(
      { error: "Internal server error processing enterprise inquiry." },
      { status: 500 }
    );
  }
}
