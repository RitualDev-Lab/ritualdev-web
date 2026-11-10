export function verifyDodoWebhookSignature(params: {
  rawBody: string;
  webhookId: string;
  webhookTimestamp: string;
  webhookSignature: string;
  secret: string;
  nowMs?: number;
}): Promise<boolean>;

export function inviteGitHubCollaborator(params: {
  repoSlug: string;
  username: string;
  githubPat: string;
}): Promise<{ invited: boolean; status?: number; username?: string; reason?: string }>;

export function dispatchDevShelfSponsorActivation(params: {
  toolName?: string;
  toolUrl?: string;
  category?: string;
  tier?: string;
  amount?: string | number;
  githubHandle?: string;
  patronName?: string;
  comment?: string;
  githubPat?: string;
}): Promise<{ dispatched: boolean; workflowTier?: string; status?: number; reason?: string }>;

export function handleDodoWebhookEvent(params: {
  rawBody: string;
  headers: Headers;
  env: Record<string, string | undefined> | NodeJS.ProcessEnv;
}): Promise<{
  ok: boolean;
  status: number;
  error?: string;
  eventType?: string;
  paymentId?: string;
  fulfillmentNote?: string;
}>;
