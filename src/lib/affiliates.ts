import affiliatesData from "@/data/affiliates.json";

export interface AffiliatePartner {
  slug: string;
  toolName: string;
  url: string;
  vanityPath: string;
  category?: string;
  perkTitle: string;
  perkDescription: string;
  ctaText?: string;
  badge?: string;
  active: boolean;
}

function getHostname(urlStr: string): string {
  try {
    return new URL(urlStr).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function normalizeSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getActivePartners(): AffiliatePartner[] {
  const partners = (affiliatesData.partners as AffiliatePartner[]) || [];
  return partners.filter((p) => p.active);
}

export function getPartnerBySlug(slug: string): AffiliatePartner | undefined {
  return getActivePartners().find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function getCloudHostingPartners(): AffiliatePartner[] {
  const prioritySlugs = ["digitalocean", "vultr", "hetzner", "railway"];
  const active = getActivePartners();
  return prioritySlugs
    .map((s) => active.find((p) => p.slug === s))
    .filter((p): p is AffiliatePartner => Boolean(p));
}

export function findPartnerForTool(tool: {
  name?: string;
  url?: string;
  repo?: string;
}): AffiliatePartner | undefined {
  if (!tool?.name) return undefined;
  const nameLower = tool.name.toLowerCase();
  const toolSlug = normalizeSlug(tool.name);
  const toolHost = getHostname(tool.url || tool.repo || "");

  return getActivePartners().find((p) => {
    const pSlug = p.slug.toLowerCase();
    const pName = p.toolName.toLowerCase();
    if (pSlug === nameLower || pName === nameLower || toolSlug === pSlug) return true;
    if (nameLower.includes(pName)) return true;
    const partnerHost = getHostname(p.url);
    if (toolHost && partnerHost && toolHost === partnerHost) return true;
    return false;
  });
}
