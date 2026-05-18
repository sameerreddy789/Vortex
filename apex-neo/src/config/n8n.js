// n8n webhook integration
// Set VITE_N8N_WEBHOOK_URL in your .env file to enable real webhook calls.
// The app works without it — failures are silently caught.

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

/**
 * Fires a demo event payload to the configured n8n webhook.
 * Resolves silently even if the webhook is not configured or unreachable.
 */
export async function triggerDemoEvent() {
  console.log('[n8n] Attempting to trigger event...');
  console.log('[n8n] URL:', N8N_WEBHOOK_URL);

  if (!N8N_WEBHOOK_URL || N8N_WEBHOOK_URL.includes('PASTE_YOUR')) {
    console.error('[n8n] ERROR: No valid webhook URL configured in .env!');
    return;
  }

  const payload = {
    event_type: 'api_limit_hit',
    user_id: `demo_${Date.now()}`,
    name: 'Rahul Demo',
    email: 'rahul_demo@fintrack.io',
    company: 'FinTrack Inc.',
    feature: 'Data Export API',
    session_mins: 47,
    teammates_invited: 3,
    api_calls_today: 98,
    plan: 'free_trial',
    source: 'vortex_demo_button',
    timestamp: new Date().toISOString(),
  };

  console.log('[n8n] Sending payload via PROXY:', payload);

  try {
  const response = await fetch('/api/proxy-webhook', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: N8N_WEBHOOK_URL, payload }),
  });
    console.log('[n8n] Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[n8n] Webhook failed:', errorText);
      throw new Error(`n8n webhook returned ${response.status}`);
    }

    const data = await response.json().catch(() => ({}));
    console.log('[n8n] SUCCESS! Response data:', data);
    return data;
  } catch (error) {
    console.error('[n8n] FETCH ERROR:', error.message);
    if (error.message.includes('Failed to fetch')) {
      console.warn('[n8n] TIP: This is often a CORS issue or the n8n tunnel is down.');
    }
    throw error;
  }
}
