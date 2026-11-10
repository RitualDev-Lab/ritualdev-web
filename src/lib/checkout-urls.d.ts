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

export interface PartnerCheckoutInput {
  orderId: string;
  tier?: string;
  toolName?: string;
  toolUrl?: string;
  category?: string;
  contactEmail?: string;
}

export interface CloudOrPrivateCheckoutInput {
  tier?: "team_relay_29" | "team_hub_99" | "private_compliance_kit";
  customerEmail?: string;
  githubUsername?: string;
}

export function buildAuditCheckoutUrl(input: AuditCheckoutInput): string;
export function buildMcpCheckoutUrl(input: McpCheckoutInput): string;
export function buildPartnerCheckoutUrl(input: PartnerCheckoutInput): string;
export function buildCloudOrPrivateCheckoutUrl(input: CloudOrPrivateCheckoutInput): string;
