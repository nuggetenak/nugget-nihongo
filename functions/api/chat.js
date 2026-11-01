// ══════════════════════════════════════════════════════════════════
//  Cloudflare Pages Function: /api/chat gateway proxy
// ══════════════════════════════════════════════════════════════════

const WORKER_URL = 'https://nugget-nihongo-ai.nugrohopangestu85.workers.dev/chat';

export async function onRequest(context) {
  const { request } = context;

  // Handle CORS Preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-goog-api-key, X-User-ID',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  const forwardHeaders = new Headers(request.headers);
  forwardHeaders.set('Origin', 'https://nugget-nihongo.pages.dev');

  try {
    const upstreamRes = await fetch(WORKER_URL, {
      method: request.method,
      headers: forwardHeaders,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    });

    const responseHeaders = new Headers(upstreamRes.headers);
    responseHeaders.set('Access-Control-Allow-Origin', '*');

    return new Response(upstreamRes.body, {
      status: upstreamRes.status,
      headers: responseHeaders,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: 'gateway_error',
        message: 'Gagal menghubungi worker backend AI: ' + (err.message || String(err)),
      }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
