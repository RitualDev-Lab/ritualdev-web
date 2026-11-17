export interface DeviceSession {
  deviceCode: string;
  userCode: string;
  clientId: string;
  scope: string;
  status: "pending" | "approved" | "denied" | "expired";
  createdAt: number;
  expiresAt: number;
  interval: number;
  customerEmail: string | null;
  licenseJwt: string | null;
  licensePayload: Record<string, any> | null;
  approvedAt?: number;
}

export interface DeviceAuthResponse {
  device_code: string;
  user_code: string;
  verification_uri: string;
  verification_uri_complete: string;
  expires_in: number;
  interval: number;
}

export declare function generateUserCode(): string;
export declare function generateDeviceCode(): string;
export declare function createDeviceSession(options?: {
  clientId?: string;
  scope?: string;
  expiresInSeconds?: number;
  baseUrl?: string;
}): DeviceAuthResponse;
export declare function getDeviceSessionByUserCode(rawUserCode: string): DeviceSession | null;
export declare function getDeviceSessionByDeviceCode(deviceCode: string): DeviceSession | null;
export declare function approveDeviceSession(
  userCode: string,
  options: {
    customerEmail: string;
    licenseJwt: string;
    licensePayload?: Record<string, any>;
  }
): { ok: boolean; session?: DeviceSession; error?: string };
export declare function denyDeviceSession(userCode: string): boolean;
export declare function cleanupExpiredSessions(): void;
export declare function getStoreStats(): { totalKeys: number };
