export interface AuditCheckoutInput {
  orderId: string;
  packageTier?: string;
  productName?: string;
  targetUrl?: string;
  repoUrl?: string;
  contactEmail?: string;
}

export interface McpCheckoutInput {
  orderId: string;
  tier?: string;
  companyName?: string;
  apiDocsUrl?: string;
  contactEmail?: string;
  preferredTransport?: string;
  includeMonetization?: boolean;
}

export type PartnerTierId =
  | "starter_9"
  | "spotlight_19"
  | "category_39"
  | "leader_49"
  | "combo_79"
  | "custom";

export interface PartnerCheckoutInput {
  orderId: string;
  tier?: PartnerTierId | string;
  toolName?: string;
  toolUrl?: string;
  category?: string;
  bundleCategories?: string[];
  customAmountUsd?: number | string;
  sponsorHandle?: string;
  contactEmail?: string;
}

export interface PreparedPartnerOrder {
  status: number;
  error?: string;
  orderId?: string;
  tier?: string;
  amountUsd?: string;
  checkoutUrl?: string;
  summary?: string;
}

export interface CloudOrPrivateCheckoutInput {
  tier?: "team_relay_29" | "team_hub_99" | "private_compliance_kit";
  customerEmail?: string;
  githubUsername?: string;
}

export function resolvePartnerTierPricing(
  tier?: string,
  customAmountUsd?: number | string
): { tierId: string; amountUsd: string; label: string };
export function preparePartnerOrder(body: unknown): PreparedPartnerOrder;
export function buildAuditCheckoutUrl(input: AuditCheckoutInput): string;
export function buildMcpCheckoutUrl(input: McpCheckoutInput): string;
export function buildPartnerCheckoutUrl(input: PartnerCheckoutInput): string;
export function buildCloudOrPrivateCheckoutUrl(input: CloudOrPrivateCheckoutInput): string;
