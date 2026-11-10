/**
 * Shared Dodo Payments checkout URL builders used by both client pages (fallback)
 * and Cloudflare Pages / Next.js API handlers so pricing, tiers, and metadata
 * never drift out of sync.
 */

const DODO_AUDIT_STARTER_199 = "pdt_0NrFWnRHHEI72iaB8AC9r";
const DODO_AUDIT_PRO_399 = "pdt_0NrFWnSQHfJhuHs4Y9Xmh";
const DODO_SERVICE_FLEX = "pdt_0NpjONGugY5QkrFDUaPva";

export function buildAuditCheckoutUrl({
  orderId,
  packageTier = "starter_199",
  productName = "",
  targetUrl = "",
  repoUrl = "",
  contactEmail = "",
}) {
  const isPro = packageTier === "pro_399" || packageTier === "comprehensive_7500" || packageTier === "rapid_1500";
  const productId = packageTier === "pro_399" ? DODO_AUDIT_PRO_399 : DODO_AUDIT_STARTER_199;
  const params = new URLSearchParams();
  params.set("quantity", "1");
  if (contactEmail) {
    params.set("email", contactEmail.trim().toLowerCase());
    params.set("customer_email", contactEmail.trim().toLowerCase());
  }
  if (productName) {
    params.set("fullName", productName.trim());
    params.set("metadata_product", productName.trim().slice(0, 120));
  }
  params.set("metadata_orderId", orderId);
  params.set("metadata_tier", isPro && packageTier !== "rapid_1500" ? packageTier : "starter_199");
  if (targetUrl) params.set("metadata_targetUrl", targetUrl.trim().slice(0, 200));
  if (repoUrl) params.set("metadata_repoUrl", repoUrl.trim().slice(0, 200));
  params.set(
    "redirect_url",
    `https://ritualdev.in/audit/success/?id=${encodeURIComponent(orderId)}&tier=${encodeURIComponent(packageTier)}`
  );
  return `https://checkout.dodopayments.com/buy/${productId}?${params.toString()}`;
}

export function buildMcpCheckoutUrl({
  orderId,
  tier = "standard_349",
  companyName = "",
  apiDocsUrl = "",
  contactEmail = "",
  preferredTransport = "stdio + sse",
  includeMonetization = true,
}) {
  const amountUsd = tier === "pro_699" ? "699" : "349";
  const params = new URLSearchParams();
  params.set("quantity", "1");
  params.set("paymentAmount", amountUsd);
  params.set("amount", amountUsd);
  params.set("paymentCurrency", "USD");
  params.set("currency", "USD");
  params.set("singlePage", "true");
  params.set("product_type", "digital");
  params.set("shipping_required", "false");
  if (contactEmail) {
    params.set("email", contactEmail.trim().toLowerCase());
    params.set("customer_email", contactEmail.trim().toLowerCase());
  }
  if (companyName) {
    params.set("fullName", companyName.trim());
    params.set("metadata_company", companyName.trim().slice(0, 120));
  }
  params.set("metadata_orderId", orderId);
  params.set("metadata_tier", tier);
  params.set("metadata_transport", preferredTransport);
  params.set("metadata_monetize", String(Boolean(includeMonetization)));
  if (apiDocsUrl) params.set("metadata_apiDocsUrl", apiDocsUrl.trim().slice(0, 200));
  params.set(
    "redirect_url",
    `https://ritualdev.in/mcp-builder/?success=true&id=${encodeURIComponent(orderId)}&tier=${encodeURIComponent(tier)}`
  );
  return `https://checkout.dodopayments.com/buy/${DODO_SERVICE_FLEX}?${params.toString()}`;
}

export function buildPartnerCheckoutUrl({
  orderId,
  tier = "spotlight_19",
  toolName = "",
  toolUrl = "",
  category = "ai",
  contactEmail = "",
}) {
  const amountUsd = tier === "leader_49" ? "49" : tier === "starter_9" ? "9" : "19";
  const params = new URLSearchParams();
  params.set("quantity", "1");
  params.set("paymentAmount", amountUsd);
  params.set("amount", amountUsd);
  params.set("paymentCurrency", "USD");
  params.set("currency", "USD");
  params.set("singlePage", "true");
  params.set("product_type", "digital");
  params.set("shipping_required", "false");
  if (contactEmail) {
    params.set("email", contactEmail.trim().toLowerCase());
    params.set("customer_email", contactEmail.trim().toLowerCase());
  }
  if (toolName) {
    params.set("fullName", toolName.trim());
    params.set("metadata_toolName", toolName.trim().slice(0, 120));
  }
  if (toolUrl) params.set("metadata_toolUrl", toolUrl.trim().slice(0, 200));
  params.set("metadata_orderId", orderId);
  params.set("metadata_tier", tier);
  params.set("metadata_category", category);
  params.set(
    "redirect_url",
    `https://ritualdev.in/partners/?success=true&id=${encodeURIComponent(orderId)}&tier=${encodeURIComponent(tier)}`
  );
  return `https://checkout.dodopayments.com/buy/${DODO_SERVICE_FLEX}?${params.toString()}`;
}

export function buildCloudOrPrivateCheckoutUrl({
  tier = "team_relay_29",
  customerEmail = "",
  githubUsername = "",
}) {
  const amountMap = {
    team_relay_29: "29",
    team_hub_99: "99",
    private_compliance_kit: "199",
  };
  const amountUsd = amountMap[tier] || "29";
  const productId = tier === "private_compliance_kit" ? DODO_AUDIT_STARTER_199 : DODO_SERVICE_FLEX;
  const params = new URLSearchParams();
  params.set("quantity", "1");
  if (productId === DODO_SERVICE_FLEX) {
    params.set("paymentAmount", amountUsd);
    params.set("amount", amountUsd);
    params.set("paymentCurrency", "USD");
    params.set("currency", "USD");
    params.set("singlePage", "true");
    params.set("product_type", "digital");
    params.set("shipping_required", "false");
  }
  if (customerEmail) {
    params.set("email", customerEmail.trim().toLowerCase());
    params.set("customer_email", customerEmail.trim().toLowerCase());
  }
  if (githubUsername) {
    params.set("metadata_github_username", githubUsername.trim().replace(/^@/, ""));
  }
  params.set("metadata_tier", tier);
  params.set(
    "redirect_url",
    `https://ritualdev.in/pricing/success/?product=${encodeURIComponent(tier)}`
  );
  return `https://checkout.dodopayments.com/buy/${productId}?${params.toString()}`;
}
