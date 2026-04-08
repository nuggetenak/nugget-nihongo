// ══════════════════════════════════════════════════════
//  ai-router — Nugget Nihongo Supabase Edge Function
//  Routes AI requests to Groq (fast) or Gemini (complex).
//  Injects master persona prompt. Handles rate-limit fallback.
//
//  Deploy: supabase functions deploy ai-router
//  Secrets (Supabase Dashboard → Edge Functions → Secrets):
//    GROQ_API_KEY
//    GEMINI_API_KEY
//
//  Request body: {
//    task_type: 'simple' | 'complex',
//    messages:  [{role: 'user'|'assistant', content: string}],
//    dna_summary?: string   // ≤200 tokens from dna-summarizer.js
//  }
//
//  Response: { text: string } | { fallback: true, reason: string }
// ══════════════════════════════════════════════════════

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

// ── Master Persona Prompt ──────────────────────────────
// Injected as the first system message regardless of provider.
const MASTER_SYSTEM_PROMPT = `Kamu adalah Sensei Nugget, tutor bahasa Jepang yang sabar, ramah, dan berpengalaman untuk penutur bahasa Indonesia.

KEPRIBADIAN & PENDEKATAN:
- Gunakan bahasa Indonesia sebagai bahasa utama penjelasan
- Gunakan contoh yang relevan dengan kehidupan sehari-hari di Indonesia
- Terapkan prinsip malu-aware: JANGAN pernah membuat pelajar merasa malu atau bodoh atas kesalahan — setiap kesalahan adalah kesempatan belajar
- Nada hangat, seperti kakak/guru yang mendukung, bukan menghakimi
- Hindari jargon linguistik yang membingungkan — gunakan istilah sederhana

INSTRUKSI TEKNIS:
- Fokus pada kontrastif L1 (Indonesia/Melayu) ↔ L2 (Jepang): jelaskan perbedaan struktural yang relevan
- Untuk pertanyaan sederhana: jawab singkat, padat, langsung ke inti (1–3 kalimat)
- Untuk pertanyaan kompleks: berikan elaborasi terstruktur dengan contoh kalimat
- Selalu sertakan contoh dalam huruf Jepang (kanji + hiragana) diikuti romaji jika diperlukan, lalu terjemahan Indonesia
- Jika ada informasi DNA belajar pelajar, gunakan untuk mempersonalisasi penjelasan tanpa menyebutkannya secara eksplisit

FORMAT OUTPUT:
- Teks biasa, tidak ada markdown berlebihan
- Contoh kalimat: JP: … → ID: …
- Untuk pola grammar, gunakan format: [pola] + [koneksi] + [arti]`.trim();

// ── Provider: Groq ─────────────────────────────────────
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL   = 'llama-3.1-70b-versatile';

async function callGroq(
  messages: Array<{ role: string; content: string }>,
  apiKey: string,
  timeoutMs = 10000
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const resp = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        max_tokens: 512,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    if (resp.status === 429) throw new RateLimitError('Groq rate limit');
    if (!resp.ok) throw new Error(`Groq HTTP ${resp.status}`);

    const data = await resp.json();
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error('Groq: empty response');
    return text;
  } finally {
    clearTimeout(timer);
  }
}

// ── Provider: Gemini Flash ─────────────────────────────
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

async function callGemini(
  messages: Array<{ role: string; content: string }>,
  apiKey: string,
  timeoutMs = 20000
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  // Gemini uses a different message format
  // System prompt is injected as the first "user" turn + "model" acknowledgement
  const geminiContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

  for (const msg of messages) {
    // Map OpenAI roles to Gemini roles
    const role = msg.role === 'assistant' ? 'model' : 'user';
    geminiContents.push({ role, parts: [{ text: msg.content }] });
  }

  try {
    const resp = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: geminiContents,
        generationConfig: {
          maxOutputTokens: 512,
          temperature: 0.7,
        },
        systemInstruction: {
          parts: [{ text: MASTER_SYSTEM_PROMPT }],
        },
      }),
      signal: controller.signal,
    });

    if (resp.status === 429) throw new RateLimitError('Gemini rate limit');
    if (!resp.ok) throw new Error(`Gemini HTTP ${resp.status}`);

    const data = await resp.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) throw new Error('Gemini: empty response');
    return text;
  } finally {
    clearTimeout(timer);
  }
}

// ── Custom error for rate limiting ────────────────────
class RateLimitError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'RateLimitError';
  }
}

// ── CORS headers ──────────────────────────────────────
function corsHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// ── Main handler ──────────────────────────────────────
serve(async (req: Request) => {
  const origin = req.headers.get('origin') || '*';

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
    });
  }

  // ── Parse body ──────────────────────────────────────
  let body: { task_type?: string; messages?: unknown[]; dna_summary?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
    });
  }

  const taskType   = body.task_type === 'complex' ? 'complex' : 'simple';
  const rawMessages = Array.isArray(body.messages) ? body.messages : [];
  const dnaSummary  = typeof body.dna_summary === 'string' ? body.dna_summary.slice(0, 2000) : '';

  // Validate messages
  const messages: Array<{ role: string; content: string }> = rawMessages
    .filter((m): m is { role: string; content: string } =>
      typeof m === 'object' && m !== null &&
      typeof (m as Record<string, unknown>).role === 'string' &&
      typeof (m as Record<string, unknown>).content === 'string'
    )
    .slice(0, 20); // hard cap to prevent abuse

  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: 'No valid messages provided' }), {
      status: 400,
      headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
    });
  }

  // ── Build full message list with system prompt ───────
  const systemMessage = { role: 'system', content: MASTER_SYSTEM_PROMPT };

  // If DNA summary is provided, prepend to the first user message
  let augmentedMessages = [systemMessage, ...messages];
  if (dnaSummary) {
    const dnaContext = `[Konteks belajar pelajar: ${dnaSummary}]\n\n`;
    augmentedMessages = [
      systemMessage,
      { role: 'user', content: dnaContext + messages[0].content },
      ...messages.slice(1),
    ];
  }

  // ── API keys ─────────────────────────────────────────
  const groqKey   = Deno.env.get('GROQ_API_KEY')   || '';
  const geminiKey = Deno.env.get('GEMINI_API_KEY') || '';

  const responseHeaders = { ...corsHeaders(origin), 'Content-Type': 'application/json' };

  // ── Routing logic ─────────────────────────────────────
  // simple → Groq first, fallback Gemini
  // complex → Gemini first, fallback Groq
  let text: string | null = null;
  let providerErrors: string[] = [];

  if (taskType === 'simple') {
    // Try Groq first
    if (groqKey) {
      try {
        text = await callGroq(augmentedMessages, groqKey, 10000);
      } catch (e) {
        providerErrors.push(`Groq: ${(e as Error).message}`);
        console.warn('[ai-router] Groq failed, trying Gemini:', (e as Error).message);
      }
    }
    // Fallback to Gemini
    if (!text && geminiKey) {
      try {
        text = await callGemini(augmentedMessages, geminiKey, 15000);
      } catch (e) {
        providerErrors.push(`Gemini: ${(e as Error).message}`);
        console.warn('[ai-router] Gemini also failed:', (e as Error).message);
      }
    }
  } else {
    // complex: Gemini first
    if (geminiKey) {
      try {
        text = await callGemini(augmentedMessages, geminiKey, 20000);
      } catch (e) {
        providerErrors.push(`Gemini: ${(e as Error).message}`);
        console.warn('[ai-router] Gemini failed, trying Groq:', (e as Error).message);
      }
    }
    // Fallback to Groq
    if (!text && groqKey) {
      try {
        text = await callGroq(augmentedMessages, groqKey, 15000);
      } catch (e) {
        providerErrors.push(`Groq: ${(e as Error).message}`);
        console.warn('[ai-router] Groq also failed:', (e as Error).message);
      }
    }
  }

  // ── Both failed → trigger offline fallback ───────────
  if (!text) {
    console.error('[ai-router] All providers failed:', providerErrors.join('; '));
    return new Response(
      JSON.stringify({ fallback: true, reason: 'all_providers_failed' }),
      { status: 200, headers: responseHeaders }
    );
  }

  return new Response(
    JSON.stringify({ text }),
    { status: 200, headers: responseHeaders }
  );
});
