export interface LicensePayload {
  iss: string;
  sub: string;
  aud: string;
  tier: "free" | "starter" | "pro" | "team" | "enterprise" | string;
  seats: number;
  features: string[];
  payment_id?: string;
  subscription_id?: string;
  org_id?: string;
  iat: number;
  nbf: number;
  exp: number;
}

export interface MintLicenseOptions {
  customerEmail: string;
  tier?: string;
  seats?: number;
  features?: string[] | null;
  paymentId?: string;
  subscriptionId?: string;
  expiresInDays?: number;
  orgId?: string;
  env?: Record<string, string | undefined>;
}

export interface VerifyLicenseOptions {
  publicKeyPem?: string;
  nowMs?: number;
}

export interface VerifyLicenseResult {
  valid: boolean;
  payload?: LicensePayload;
  error?: string;
}

export declare const RITUAL_ROOT_PUBLIC_KEY_PEM: string;
export declare const RITUAL_ROOT_PUBLIC_KEY_JWK: Record<string, any>;
export declare const RITUAL_ROOT_PRIVATE_KEY_PEM: string;
export declare const TIER_FEATURES: Record<string, string[]>;

export declare function base64UrlEncode(data: Buffer | string | object): string;
export declare function base64UrlDecode(str: string): Buffer;
export declare function resolveTierFeatures(rawTier?: string): string[];
export declare function isFeatureEntitled(licensePayload: LicensePayload | null | undefined, featureName: string): boolean;
export declare function mintLicenseJwt(options: MintLicenseOptions): string;
export declare function verifyLicenseJwt(jwt: string, options?: VerifyLicenseOptions): VerifyLicenseResult;
export declare function getPublicJwks(): { keys: Array<Record<string, any>> };
