import { dispatchOrderWebhook, jsonResponse } from "../../src/lib/cf-webhook.js";

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const {
      fullName,
      workEmail,
      companyName,
      fleetSize,
      infraEnvironment,
      selectedNeeds,
      notes,
    } = body || {};

    if (!workEmail || typeof workEmail !== "string" || !workEmail.includes("@")) {
      return jsonResponse({ error: "A valid corporate work email is required." }, 400);
    }

    const submissionId = `SLA-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const leadRecord = {
      submissionId,
      timestamp: new Date().toISOString(),
      fullName: fullName || "Not specified",
      workEmail: workEmail.trim().toLowerCase(),
      companyName: companyName || "Not specified",
      fleetSize: fleetSize || "Not specified",
      infraEnvironment: infraEnvironment || "AWS Private VPC",
      selectedNeeds: Array.isArray(selectedNeeds) ? selectedNeeds : [],
      notes: notes || "",
    };

    const alertText = [
      `🏛️ *Enterprise Defense SLA Inquiry [${submissionId}]*`,
      `*Company:* ${leadRecord.companyName}`,
      `*Contact:* ${leadRecord.fullName} (${leadRecord.workEmail})`,
      `*Fleet Size:* ${leadRecord.fleetSize}`,
      `*Target Infra:* ${leadRecord.infraEnvironment}`,
      `*Selected Needs:* ${leadRecord.selectedNeeds.join(", ") || "None selected"}`,
      `*Notes:* ${leadRecord.notes || "None provided"}`,
    ].join("\n");

    await dispatchOrderWebhook(context.env, alertText);

    return jsonResponse({
      success: true,
      submissionId,
      message: "Enterprise SLA inquiry received. A principal security engineer will contact you within 1 business day.",
      lead: leadRecord,
    });
  } catch (err) {
    console.error("CF Pages Enterprise API Error:", err);
    return jsonResponse({ error: "Internal server error processing enterprise inquiry." }, 500);
  }
}
