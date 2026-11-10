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

export type TeamProductTierId =
  | "team_relay_29"
  | "team_hub_99"
  | "private_compliance_kit"
  | "dbshield_team_29"
  | "dbshield_team_99"
  | "skillprism_team_99"
  | "agentshield_team_19"
  | "agentshield_enterprise_49"
  | "websec_team_19"
  | "ritual_pro_15"
  | "mcp_starter_49"
  | "mcp_pack_fintech_39"
  | "mcp_pack_database_49"
  | "mcp_pack_devops_49"
  | "mcp_pack_all_99"
  | "turnkey_starter_250"
  | "turnkey_pro_750"
  | "turnkey_enterprise_1750";

export interface TeamProductCheckoutInput {
  tier?: TeamProductTierId | string;
  customerEmail?: string;
  githubUsername?: string;
  companyName?: string;
}

export interface CloudOrPrivateCheckoutInput {
  tier?: "team_relay_29" | "team_hub_99" | "private_compliance_kit";
  customerEmail?: string;
  githubUsername?: string;
}

export const DODO_PRODUCT_IDS: Record<string, string>;
export const TEAM_PRODUCT_CONFIG: Record<
  string,
  { id: string; productId: string; flexAmountUsd?: string; extraParams?: Record<string, string>; label: string; redirectUrl: string }
>;

export function resolvePartnerTierPricing(
  tier?: string,
  customAmountUsd?: number | string
): { tierId: string; amountUsd: string; label: string };
export function preparePartnerOrder(body: unknown): PreparedPartnerOrder;
export function buildAuditCheckoutUrl(input: AuditCheckoutInput): string;
export function buildMcpCheckoutUrl(input: McpCheckoutInput): string;
export function buildPartnerCheckoutUrl(input: PartnerCheckoutInput): string;
export function buildTeamProductCheckoutUrl(input: TeamProductCheckoutInput): string;
export function buildCloudOrPrivateCheckoutUrl(input: CloudOrPrivateCheckoutInput): string;
