/**
 * Shared Dodo Payments checkout URL builders used by both client pages (fallback)
 * and Cloudflare Pages / Next.js API handlers so pricing, tiers, and metadata
 * never drift out of sync.
 */

const DODO_AUDIT_STARTER_199 = "pdt_0NrFWnRHHEI72iaB8AC9r";
const DODO_AUDIT_PRO_399 = "pdt_0NrFWnSQHfJhuHs4Y9Xmh";
const DODO_SERVICE_FLEX = "pdt_0NpjONGugY5QkrFDUaPva";
const DODO_AGENTSHIELD_TEAM_19 = "pdt_0NpjONLXnMYR9e2SUlYJt";
const DODO_AGENTSHIELD_ENTERPRISE_49 = "pdt_0NpjONNytUpW7gzjoDlYW";
const DODO_RITUAL_PRO_15 = "pdt_0NrFSkF5XLgBppfQRxgXN";
const DODO_RITUAL_TEAM_99 = "pdt_0NrFSmrXT8zU2u5BKGJ7y";
const DODO_MCP_STARTER_49 = "pdt_0NrFWlIkkreo5fOBIJWxI";
const DODO_MCP_PACK_FLEX = "pdt_0NpjONEJnu5OcWhncWF68";
const DODO_TURNKEY_DEPOSIT = "pdt_0NpjOJVkkh7Mryrzm6ro9";

export const DODO_PRODUCT_IDS = {
  DODO_AUDIT_STARTER_199,
  DODO_AUDIT_PRO_399,
  DODO_SERVICE_FLEX,
  DODO_AGENTSHIELD_TEAM_19,
  DODO_AGENTSHIELD_ENTERPRISE_49,
  DODO_RITUAL_PRO_15,
  DODO_RITUAL_TEAM_99,
  DODO_MCP_STARTER_49,
  DODO_MCP_PACK_FLEX,
  DODO_TURNKEY_DEPOSIT,
};

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

export const TEAM_PRODUCT_CONFIG = {
  team_relay_29: {
    id: "team_relay_29",
    productId: DODO_SERVICE_FLEX,
    flexAmountUsd: "29",
    label: "Hosted Team Relay ($29/mo)",
    redirectUrl: "https://ritualdev.in/pricing/success/?product=team_relay_29",
  },
  team_hub_99: {
    id: "team_hub_99",
    productId: DODO_RITUAL_TEAM_99,
    label: "Hosted Team Hub + Shared Redis Cache ($99/mo)",
    redirectUrl: "https://ritualdev.in/pricing/success/?product=team_hub_99",
  },
  private_compliance_kit: {
    id: "private_compliance_kit",
    productId: DODO_AUDIT_STARTER_199,
    label: "Private Compliance Pack ($199 one-time)",
    redirectUrl: "https://ritualdev.in/pricing/success/?product=private_compliance_kit",
  },
  dbshield_team_29: {
    id: "dbshield_team_29",
    productId: DODO_SERVICE_FLEX,
    flexAmountUsd: "29",
    label: "DBShield Team Slack/Teams Approval Relay ($29/mo)",
    redirectUrl: "https://ritualdev.in/pricing/success/?product=dbshield_team_29",
  },
  dbshield_team_99: {
    id: "dbshield_team_99",
    productId: DODO_RITUAL_TEAM_99,
    label: "DBShield Team + Shared Redis Governance ($99/mo)",
    redirectUrl: "https://ritualdev.in/pricing/success/?product=dbshield_team_99",
  },
  skillprism_team_99: {
    id: "skillprism_team_99",
    productId: DODO_RITUAL_TEAM_99,
    label: "SkillPrism Hosted Shared Redis VPC Cluster ($99/mo)",
    redirectUrl: "https://ritualdev.in/pricing/success/?product=skillprism_team_99",
  },
  agentshield_team_19: {
    id: "agentshield_team_19",
    productId: DODO_AGENTSHIELD_TEAM_19,
    label: "AgentShield Team & CI/CD Gate ($19/seat/mo)",
    redirectUrl: "https://ritualdev.in/pricing/success/?product=agentshield_team_19",
  },
  agentshield_enterprise_49: {
    id: "agentshield_enterprise_49",
    productId: DODO_AGENTSHIELD_ENTERPRISE_49,
    label: "AgentShield Enterprise Fleet ($49/seat/mo)",
    redirectUrl: "https://ritualdev.in/pricing/success/?product=agentshield_enterprise_49",
  },
  websec_team_19: {
    id: "websec_team_19",
    productId: DODO_AGENTSHIELD_TEAM_19,
    label: "WebSecAuditor Team PR Review Gate ($19/seat/mo)",
    redirectUrl: "https://ritualdev.in/pricing/success/?product=websec_team_19",
  },
  ritual_pro_15: {
    id: "ritual_pro_15",
    productId: DODO_RITUAL_PRO_15,
    label: "Ritual Pro Individual Suite License ($15/mo)",
    redirectUrl: "https://ritualdev.in/pricing/success/?product=ritual_pro_15",
  },
  promptshield_pro_49: {
    id: "promptshield_pro_49",
    productId: DODO_SERVICE_FLEX,
    flexAmountUsd: "49",
    coreRepo: "RitualDev-Lab/PromptShield-Core",
    label: "PromptShield Enterprise Fleet + PromptShield-Core ($49/mo)",
    redirectUrl: "https://ritualdev.in/pricing/success/?product=promptshield_pro_49",
  },
  mockforge_pro_49: {
    id: "mockforge_pro_49",
    productId: DODO_SERVICE_FLEX,
    flexAmountUsd: "49",
    coreRepo: "RitualDev-Lab/MockForge-Core",
    label: "MockForge Production Masking Pro + MockForge-Core ($49/mo)",
    redirectUrl: "https://ritualdev.in/pricing/success/?product=mockforge_pro_49",
  },
  fineprint_pro_79: {
    id: "fineprint_pro_79",
    productId: DODO_SERVICE_FLEX,
    flexAmountUsd: "79",
    coreRepo: "RitualDev-Lab/FinePrintAI-Core",
    label: "FinePrint Corporate Playbook Pro + FinePrintAI-Core ($79/mo)",
    redirectUrl: "https://ritualdev.in/pricing/success/?product=fineprint_pro_79",
  },
  mcp_starter_49: {
    id: "mcp_starter_49",
    productId: DODO_MCP_STARTER_49,
    label: "MCP Monetization Starter Kit ($49 one-time)",
    redirectUrl: "https://ritualdev.in/mcp-starter-kit/download/",
  },
  mcp_pack_fintech_39: {
    id: "mcp_pack_fintech_39",
    productId: DODO_MCP_PACK_FLEX,
    extraParams: { pack: "fintech" },
    label: "Fintech & SaaS Connector MCP Pack ($39)",
    redirectUrl: "https://ritualdev.in/pricing/success/?product=mcp_pack_fintech_39",
  },
  mcp_pack_database_49: {
    id: "mcp_pack_database_49",
    productId: DODO_MCP_PACK_FLEX,
    extraParams: { pack: "database" },
    label: "Enterprise Database & Warehouse MCP Pack ($49)",
    redirectUrl: "https://ritualdev.in/pricing/success/?product=mcp_pack_database_49",
  },
  mcp_pack_devops_49: {
    id: "mcp_pack_devops_49",
    productId: DODO_MCP_PACK_FLEX,
    extraParams: { pack: "devops" },
    label: "Cloud & Kubernetes DevOps MCP Pack ($49)",
    redirectUrl: "https://ritualdev.in/pricing/success/?product=mcp_pack_devops_49",
  },
  mcp_pack_all_99: {
    id: "mcp_pack_all_99",
    productId: DODO_MCP_PACK_FLEX,
    extraParams: { pack: "all_access" },
    label: "All-Access Enterprise MCP Bundle ($99)",
    redirectUrl: "https://ritualdev.in/pricing/success/?product=mcp_pack_all_99",
  },
  turnkey_starter_250: {
    id: "turnkey_starter_250",
    productId: DODO_TURNKEY_DEPOSIT,
    extraParams: { tier: "starter", deposit: "250" },
    label: "Starter Turnkey MCP Deposit ($250 / $500 total)",
    redirectUrl: "https://ritualdev.in/mcp-builder/?success=true&tier=turnkey_starter",
  },
  turnkey_pro_750: {
    id: "turnkey_pro_750",
    productId: DODO_TURNKEY_DEPOSIT,
    extraParams: { tier: "pro", deposit: "750" },
    label: "Pro Multi-API Turnkey MCP Deposit ($750 / $1,500 total)",
    redirectUrl: "https://ritualdev.in/mcp-builder/?success=true&tier=turnkey_pro",
  },
  turnkey_enterprise_1750: {
    id: "turnkey_enterprise_1750",
    productId: DODO_TURNKEY_DEPOSIT,
    extraParams: { tier: "enterprise", deposit: "1750" },
    label: "Enterprise Custom MCP Deposit ($1,750 / $3,500 total)",
    redirectUrl: "https://ritualdev.in/mcp-builder/?success=true&tier=turnkey_enterprise",
  },
};

export function buildTeamProductCheckoutUrl({
  tier = "team_relay_29",
  customerEmail = "",
  githubUsername = "",
  companyName = "",
}) {
  const cfg = TEAM_PRODUCT_CONFIG[tier] || TEAM_PRODUCT_CONFIG.team_relay_29;
  const params = new URLSearchParams();
  params.set("quantity", "1");

  if (cfg.flexAmountUsd) {
    params.set("paymentAmount", cfg.flexAmountUsd);
    params.set("amount", cfg.flexAmountUsd);
    params.set("paymentCurrency", "USD");
    params.set("currency", "USD");
    params.set("singlePage", "true");
    params.set("product_type", "digital");
    params.set("shipping_required", "false");
  }
  if (cfg.extraParams) {
    for (const [k, v] of Object.entries(cfg.extraParams)) {
      params.set(k, v);
    }
  }
  if (customerEmail) {
    params.set("email", customerEmail.trim().toLowerCase());
    params.set("customer_email", customerEmail.trim().toLowerCase());
  }
  if (companyName) {
    params.set("fullName", companyName.trim().slice(0, 120));
    params.set("metadata_company", companyName.trim().slice(0, 120));
  }
  if (githubUsername) {
    params.set("metadata_github_username", githubUsername.trim().replace(/^@/, ""));
  }
  if (cfg.coreRepo) {
    params.set("metadata_coreRepo", cfg.coreRepo);
  }
  params.set("metadata_tier", cfg.id);
  params.set("redirect_url", cfg.redirectUrl);
  return `https://checkout.dodopayments.com/buy/${cfg.productId}?${params.toString()}`;
}

export function buildCloudOrPrivateCheckoutUrl({
  tier = "team_relay_29",
  customerEmail = "",
  githubUsername = "",
}) {
  return buildTeamProductCheckoutUrl({ tier, customerEmail, githubUsername });
}
