// ══════════════════════════════════════════════════════════════════
//  admin-api.js — Nugget Nihongo Admin API (Phase 5.5c §15.9)
//  Cloudflare Worker — separate from ai-proxy.js (different deploy)
//
//  Handles promotion pipeline actions from /admin/promote.html:
//    POST /admin/promote   — mark item as promoted, write payload
//    POST /admin/reject    — mark item as rejected + blocklist
//    GET  /admin/candidates — list promotion candidates sorted by score
//    GET  /admin/stats      — queue stats (count by status)
//
//  Auth: Bearer token check — Nugget sets ADMIN_SECRET via wrangler secret.
//  All mutating operations require Authorization: Bearer {ADMIN_SECRET}.
//  GET endpoints also require auth (no public reads).
//
//  Supabase integration: uses SUPABASE_URL + SUPABASE_SERVICE_KEY secrets.
//  Service key bypasses RLS — only this Worker has it.
//
//  GitHub integration (optional):
//    When GITHUB_TOKEN + GITHUB_REPO are set, /admin/promote also opens a
//    PR that appends the promoted item to the correct data/ file.
//    Without these secrets, promote action updates Supabase only —
//    Nugget runs git commit manually (see §15.9: "for launch, git commit
//    means Nugget runs git commit manually").
//
//  Secrets needed (wrangler secret put):
//    ADMIN_SECRET        — any strong random string (you pick)
//    SUPABASE_URL        — e.g. https://xyz.supabase.co
//    SUPABASE_SERVICE_KEY — service_role key (NOT anon key)
//    GITHUB_TOKEN        — (optional) PAT with repo write scope
//    GITHUB_REPO         — (optional) e.g. nuggetenak/nugget-nihongo
//
//  Deploy:
//    wrangler deploy --name nugget-nihongo-admin
//    (separate from ai-proxy — different route, different secret)
// ══════════════════════════════════════════════════════════════════

const ALLOWED_ORIGINS = [
  'https://nuggetenak.github.io',
  'https://nugget-nihongo.pages.dev',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

// ── Helpers ───────────────────────────────────────────────────────
function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}

function checkAuth(request, env) {
  const header = request.headers.get('Authorization') || '';
  const token = header.replace(/^Bearer\s+/i, '');
  return token && token === env.ADMIN_SECRET;
}

// ── Supabase client helpers ───────────────────────────────────────
function sbHeaders(env) {
  return {
    'Content-Type': 'application/json',
    'apikey': env.SUPABASE_SERVICE_KEY,
    'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
    'Prefer': 'return=representation',
  };
}

async function sbGet(env, path, params = {}) {
  const url = new URL(env.SUPABASE_URL + '/rest/v1/' + path);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url.toString(), { headers: sbHeaders(env) });
  if (!res.ok) throw new Error(`Supabase GET ${path}: ${res.status}`);
  return res.json();
}

async function sbPatch(env, path, filter, payload) {
  const url = new URL(env.SUPABASE_URL + '/rest/v1/' + path);
  url.searchParams.set('ai_item_id', `eq.${filter}`);
  const res = await fetch(url.toString(), {
    method: 'PATCH',
    headers: { ...sbHeaders(env), 'Prefer': 'return=minimal' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Supabase PATCH ${path}: ${res.status} ${await res.text()}`);
  return true;
}

async function sbPost(env, path, payload) {
  const res = await fetch(env.SUPABASE_URL + '/rest/v1/' + path, {
    method: 'POST',
    headers: sbHeaders(env),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Supabase POST ${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

// ── GitHub PR helper (optional) ───────────────────────────────────
// Opens a PR appending the promoted item to the correct data/ file.
// Returns PR URL or null if GitHub secrets not configured.
async function openPromotionPR(env, item, promotedPayload, targetFile) {
  if (!env.GITHUB_TOKEN || !env.GITHUB_REPO) return null;

  const api = `https://api.github.com/repos/${env.GITHUB_REPO}`;
  const ghHeaders = {
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
    'User-Agent': 'nugget-nihongo-admin-worker',
  };

  try {
    // 1. Get current file SHA + content
    const fileRes = await fetch(`${api}/contents/${targetFile}?ref=develop`, { headers: ghHeaders });
    if (!fileRes.ok) throw new Error(`GitHub GET file: ${fileRes.status}`);
    const fileData = await fileRes.json();
    const currentContent = atob(fileData.content.replace(/\n/g, ''));

    // 2. Append new entry (items are in a JS array — insert before closing ])
    const newEntryJSON = JSON.stringify(promotedPayload, null, 2);
    const newEntry = ',\n' + newEntryJSON.split('\n').map(l => '  ' + l).join('\n');
    const updatedContent = currentContent.trimEnd().replace(/\];?\s*$/, newEntry + '\n];\n');

    // 3. Create a branch
    const ts = Date.now();
    const branchName = `promote/ai-${item.ai_item_id.slice(-8)}-${ts}`;

    // Get base SHA
    const baseRes = await fetch(`${api}/git/ref/heads/develop`, { headers: ghHeaders });
    if (!baseRes.ok) throw new Error(`GitHub get ref: ${baseRes.status}`);
    const baseSHA = (await baseRes.json()).object.sha;

    await fetch(`${api}/git/refs`, {
      method: 'POST',
      headers: ghHeaders,
      body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: baseSHA }),
    });

    // 4. Commit the file update
    await fetch(`${api}/contents/${targetFile}`, {
      method: 'PUT',
      headers: ghHeaders,
      body: JSON.stringify({
        message: `promote(ai): ${item.ai_item_id} → ${targetFile}`,
        content: btoa(updatedContent),
        sha: fileData.sha,
        branch: branchName,
      }),
    });

    // 5. Open PR
    const prRes = await fetch(`${api}/pulls`, {
      method: 'POST',
      headers: ghHeaders,
      body: JSON.stringify({
        title: `Promote AI item: ${item.ai_item_id}`,
        head: branchName,
        base: 'develop',
        body: [
          `## AI Content Promotion`,
          `**Item ID:** ${item.ai_item_id}`,
          `**Type:** ${item.item_type}`,
          `**Stats:** ${item.thumbs_up} 👍 / ${item.thumbs_down} 👎`,
          `  ${item.serve_count} serves over ${Math.round((Date.now() - new Date(item.first_seen_at)) / 86400000)} days`,
          `**Generator:** ${item.generator_provider}:${item.generator_model}`,
          `**Critic:** ${item.critic_provider} (${item.critic_verdict})`,
          ``,
          `Review the diff before merging. Merge = item lives in the app permanently.`,
        ].join('\n'),
      }),
    });
    if (!prRes.ok) throw new Error(`GitHub PR: ${prRes.status}`);
    const pr = await prRes.json();
    return pr.html_url;
  } catch (e) {
    console.error('[admin-api] GitHub PR failed (non-fatal):', e.message);
    return null;
  }
}

// Determine promotion target file from item type + level
function promotionTargetFile(item, level) {
  const lvl = (level || 'n4').toLowerCase();
  switch (item.item_type) {
    case 'quiz_question':    return `public/data/quiz-bank/${lvl}.js`;
    case 'nuance_note':      return `public/data/nuance-notes/${item.ai_item_id}.md`;
    case 'confusion_pair':   return 'public/data/confusion-pairs.js';
    default:                 return `public/data/quiz-bank/${lvl}.js`;
  }
}

// Build the promoted payload with full §15.9 lineage metadata
function buildPromotedPayload(item, promotedBy, override = {}) {
  const content = item.content || {};
  const level = content.level || 'n4';
  // Generate a sequential-looking ID based on item_type + level + timestamp
  const ts = Date.now().toString(36).toUpperCase();
  const id = `qb-${level}-${ts}`;

  return {
    ...content,
    ...override,          // allow admin to override prompt/answer/choices
    id,
    promoted_from: item.ai_item_id,
    original_provider: `${item.generator_provider}:${item.generator_model}`,
    critic_provider: `${item.critic_provider}`,
    critic_verdict: item.critic_verdict,
    serves_before_promotion: item.serve_count,
    thumbs_up: item.thumbs_up,
    thumbs_down: item.thumbs_down,
    edits_submitted: item.edits_submitted,
    promoted_at: new Date().toISOString(),
    promoted_by: promotedBy || 'admin',
    provenance: 'ai-gen-promoted-v1',
  };
}

// ── Route handlers ────────────────────────────────────────────────

// GET /admin/candidates — list promotion candidates
async function handleCandidates(request, env, cors) {
  const url = new URL(request.url);
  const status = url.searchParams.get('status') || 'candidate';
  const limit  = Math.min(parseInt(url.searchParams.get('limit') || '50'), 100);

  try {
    const rows = await sbGet(env, 'ai_promotion_queue', {
      status:   `eq.${status}`,
      order:    'thumbs_up.desc,serve_count.desc',
      limit:    String(limit),
      select:   '*',
    });
    return json({ candidates: rows, count: rows.length }, 200, cors);
  } catch (e) {
    return json({ error: e.message }, 502, cors);
  }
}

// GET /admin/stats — queue stats
async function handleStats(request, env, cors) {
  try {
    const rows = await sbGet(env, 'ai_promotion_queue', { select: 'status' });
    const counts = { pending: 0, candidate: 0, promoted: 0, rejected: 0 };
    for (const r of rows) counts[r.status] = (counts[r.status] || 0) + 1;
    return json({ stats: counts, total: rows.length }, 200, cors);
  } catch (e) {
    return json({ error: e.message }, 502, cors);
  }
}

// POST /admin/promote — promote an item
async function handlePromote(request, env, cors) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400, cors); }

  const { ai_item_id, promoted_by, override } = body;
  if (!ai_item_id) return json({ error: 'ai_item_id required' }, 400, cors);

  try {
    // Fetch the item from queue
    const rows = await sbGet(env, 'ai_promotion_queue', {
      ai_item_id: `eq.${ai_item_id}`,
      limit: '1',
    });
    if (!rows.length) return json({ error: 'item not found in queue' }, 404, cors);
    const item = rows[0];

    if (item.status === 'rejected') return json({ error: 'item was already rejected' }, 409, cors);
    if (item.status === 'promoted') return json({ error: 'item already promoted' }, 409, cors);

    // Build payload + determine target file
    const promotedPayload = buildPromotedPayload(item, promoted_by || 'nugget', override || {});
    const level = (item.content && item.content.level) || 'n4';
    const targetFile = promotionTargetFile(item, level);

    // Update Supabase
    await sbPatch(env, 'ai_promotion_queue', ai_item_id, {
      status:           'promoted',
      promoted_at:      new Date().toISOString(),
      promoted_by:      promoted_by || 'nugget',
      promoted_payload: promotedPayload,
      promotion_target: targetFile,
    });

    // Optionally open a GitHub PR
    const prUrl = await openPromotionPR(env, item, promotedPayload, targetFile);

    return json({
      ok: true,
      ai_item_id,
      promoted_payload: promotedPayload,
      target_file: targetFile,
      github_pr: prUrl,
      manual_step: prUrl
        ? null
        : `GitHub not configured — add this to ${targetFile} manually:\n\n${JSON.stringify(promotedPayload, null, 2)}`,
    }, 200, cors);
  } catch (e) {
    console.error('[admin-api] promote failed:', e.message);
    return json({ error: e.message }, 502, cors);
  }
}

// POST /admin/reject — reject + blocklist an item
async function handleReject(request, env, cors) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400, cors); }

  const { ai_item_id, reason } = body;
  if (!ai_item_id) return json({ error: 'ai_item_id required' }, 400, cors);

  try {
    await sbPatch(env, 'ai_promotion_queue', ai_item_id, {
      status:       'rejected',
      rejected_at:  new Date().toISOString(),
      quarantined:  true,
    });

    // Also insert into ai_feedback as a thumbs_down so it propagates to clients
    await sbPost(env, 'ai_feedback', {
      user_id:    'admin',
      ai_item_id,
      item_type:  'quiz_question',
      verdict:    'thumbs_down',
      reason_codes: ['admin_reject'],
      reason_other: reason || null,
      quarantined: true,
    });

    return json({ ok: true, ai_item_id, status: 'rejected' }, 200, cors);
  } catch (e) {
    return json({ error: e.message }, 502, cors);
  }
}

// ── Main handler ──────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    // Auth check on all routes
    if (!checkAuth(request, env)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...cors, 'Content-Type': 'application/json', 'WWW-Authenticate': 'Bearer' },
      });
    }

    const url = new URL(request.url);
    const method = request.method;

    if (method === 'GET'  && url.pathname === '/admin/candidates') return handleCandidates(request, env, cors);
    if (method === 'GET'  && url.pathname === '/admin/stats')      return handleStats(request, env, cors);
    if (method === 'POST' && url.pathname === '/admin/promote')    return handlePromote(request, env, cors);
    if (method === 'POST' && url.pathname === '/admin/reject')     return handleReject(request, env, cors);

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  },
};
