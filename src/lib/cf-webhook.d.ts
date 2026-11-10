export function dispatchOrderWebhook(
  env: Record<string, string | undefined> | NodeJS.ProcessEnv,
  messageText: string
): Promise<boolean>;

export function jsonResponse(payload: unknown, status?: number): Response;
