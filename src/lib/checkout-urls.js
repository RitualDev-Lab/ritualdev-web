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

export const PARTNER_TIER_CONFIG = {
  starter_9: {
    id: "starter_9",
    amountUsd: 9,
    period: "one-time",
    label: "$9 (Starter Verified Listing)",
  },
  spotlight_19: {
    id: "spotlight_19",
    amountUsd: 19,
    period: "30-day boost",
    label: "$19 (Launch Spotlight + Custom FAQs & Digest)",
  },
  category_39: {
    id: "category_39",
    amountUsd: 39,
    period: "per month",
    label: "$39/mo (Category Exclusive Spotlight)",
  },
  leader_49: {
    id: "leader_49",
    amountUsd: 49,
    period: "per month",
    label: "$49/mo (MCP Pro + Category Leader)",
  },
  combo_79: {
    id: "combo_79",
    amountUsd: 79,
    period: "per month",
    label: "$79/mo (Category Combo Pack + Homepage Takeover)",
  },
  custom: {
    id: "custom",
    amountUsd: 25,
    period: "custom sponsor",
    label: "Custom Sponsor / Pay-What-You-Want",
  },
};

export function resolvePartnerTierPricing(tier = "spotlight_19", customAmountUsd) {
  const cfg = PARTNER_TIER_CONFIG[tier] || PARTNER_TIER_CONFIG.spotlight_19;
  if (cfg.id !== "custom") {
    return {
      tierId: cfg.id,
      amountUsd: String(cfg.amountUsd),
      label: cfg.label,
    };
  }
  const parsed = Number(customAmountUsd);
  const clamped = Number.isFinite(parsed) && parsed > 0 ? Math.max(5, Math.min(5000, Math.round(parsed))) : 25;
  return {
    tierId: "custom",
    amountUsd: String(clamped),
    label: `$${clamped} (Custom Sponsor / Bespoke Pack)`,
  };
}

export function buildPartnerCheckoutUrl({
  orderId,
  tier = "spotlight_19",
  toolName = "",
  toolUrl = "",
  category = "ai",
  bundleCategories = [],
  customAmountUsd,
  sponsorHandle = "",
  contactEmail = "",
}) {
  const pricing = resolvePartnerTierPricing(tier, customAmountUsd);
  const params = new URLSearchParams();
  params.set("quantity", "1");
  params.set("paymentAmount", pricing.amountUsd);
  params.set("amount", pricing.amountUsd);
  params.set("paymentCurrency", "USD");
  params.set("currency", "USD");
  params.set("singlePage", "true");
  params.set("product_type", "digital");
  params.set("shipping_required", "false");
  if (contactEmail) {
    params.set("email", contactEmail.trim().toLowerCase());
    params.set("customer_email", contactEmail.trim().toLowerCase());
  }
  const displayName = (toolName || sponsorHandle || "Custom DevShelf Sponsor").trim();
  if (displayName) {
    params.set("fullName", displayName);
    params.set("metadata_toolName", displayName.slice(0, 120));
  }
  if (toolUrl) params.set("metadata_toolUrl", toolUrl.trim().slice(0, 200));
  if (sponsorHandle) params.set("metadata_sponsorHandle", sponsorHandle.trim().replace(/^@/, "").slice(0, 60));
  if (Array.isArray(bundleCategories) && bundleCategories.length > 0) {
    params.set("metadata_bundleCategories", bundleCategories.slice(0, 3).join(","));
  }
  params.set("metadata_orderId", orderId);
  params.set("metadata_tier", pricing.tierId);
  params.set("metadata_category", category);
  params.set(
    "redirect_url",
    `https://ritualdev.in/partners/?success=true&id=${encodeURIComponent(orderId)}&tier=${encodeURIComponent(pricing.tierId)}&amount=${encodeURIComponent(pricing.amountUsd)}`
  );
  return `https://checkout.dodopayments.com/buy/${DODO_SERVICE_FLEX}?${params.toString()}`;
}

export function preparePartnerOrder(body) {
  const {
    toolName = "",
    toolUrl = "",
    category = "ai",
    bundleCategories = [],
    contactEmail = "",
    tier = "spotlight_19",
    customAmountUsd,
    sponsorHandle = "",
    tagline = "",
    orderId: clientOrderId,
  } = body || {};

  if (!contactEmail || typeof contactEmail !== "string" || !contactEmail.includes("@")) {
    return { error: "A valid contact email is required.", status: 400 };
  }

  const isCustom = tier === "custom";
  if (!isCustom && (!toolName || !toolUrl)) {
    return { error: "Both Tool Name and Tool URL / Repo are required.", status: 400 };
  }
  if (isCustom && !toolName && !sponsorHandle) {
    return { error: "Please enter your name, handle, or tool/company name for custom sponsorship.", status: 400 };
  }

  const orderId = clientOrderId || `SPONSOR-${Math.floor(10000 + Math.random() * 90000)}`;
  const pricing = resolvePartnerTierPricing(tier, customAmountUsd);
  const checkoutUrl = buildPartnerCheckoutUrl({
    orderId,
    tier: pricing.tierId,
    toolName,
    toolUrl,
    category,
    bundleCategories,
    customAmountUsd,
    sponsorHandle,
    contactEmail,
  });

  const cleanCategories =
    Array.isArray(bundleCategories) && bundleCategories.length > 0
      ? bundleCategories.slice(0, 3).join(", ")
      : category;

  const summary = [
    `⭐ **New DevShelf Partner Order [${orderId}]**`,
    `• **Tier:** ${pricing.label}`,
    `• **Entity / Tool:** ${toolName || sponsorHandle} ${toolUrl ? `(${toolUrl})` : ""}`.trim(),
    `• **Category / Bundle:** ${cleanCategories}`,
    `• **Email:** ${contactEmail.trim().toLowerCase()}`,
    `• **Notes / Pitch:** ${tagline || "None provided"}`,
  ].join("\n");

  return {
    status: 200,
    orderId,
    tier: pricing.tierId,
    amountUsd: pricing.amountUsd,
    checkoutUrl,
    summary,
  };
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
