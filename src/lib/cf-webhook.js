/**
 * Shared webhook dispatcher compatible with Slack, Discord, Microsoft Teams, and Zapier.
 * Runs in both Node runtimes (process.env) and Cloudflare Pages Workers (context.env).
 */
export async function dispatchOrderWebhook(env, messageText) {
  const webhookUrl =
    env?.ENTERPRISE_WEBHOOK_URL ||
    env?.SLACK_WEBHOOK_URL ||
    env?.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return false;

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: messageText,
        content: messageText,
      }),
    });
    return res.ok;
  } catch (err) {
    console.warn("Webhook dispatch warning:", err);
    return false;
  }
}

export function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
