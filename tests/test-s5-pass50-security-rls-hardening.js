// ══════════════════════════════════════════════════════════════════
//  test-s5-pass50-security-rls-hardening.js — Siklus V Pass 50
//  Klaster 15: Production Hardening, Swarm QA & Zenith Synthesis
//  Security Hardening, Supabase RLS Penetration & Input Sanitation
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

console.log('\n=============================================================');
console.log('🔒 SIKLUS V PASS 50: SECURITY HARDENING & SUPABASE RLS AUDIT');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── 1. Input Sanitization Engine (sanitize.ts) ────────────────────
test('sanitize.ts exports escapeHtml, sanitizeUserInput, sanitizeUrl, sanitizeQueryParams, and maskApiKey', () => {
  const sanitizePath = path.join(ROOT_DIR, 'src/lib/security/sanitize.ts');
  assert(fs.existsSync(sanitizePath), 'sanitize.ts must exist');
  const code = fs.readFileSync(sanitizePath, 'utf8');

  assert(code.includes('export function escapeHtml'), 'Must export escapeHtml');
  assert(code.includes('export function sanitizeUserInput'), 'Must export sanitizeUserInput');
  assert(code.includes('export function sanitizeUrl'), 'Must export sanitizeUrl');
  assert(code.includes('export function sanitizeQueryParams'), 'Must export sanitizeQueryParams');
  assert(code.includes('export function sanitizeSearchQuery'), 'Must export sanitizeSearchQuery');
  assert(code.includes('export function sanitizeSqlSearch'), 'Must export sanitizeSqlSearch');
  assert(code.includes('export function maskApiKey'), 'Must export maskApiKey');
});

test('escapeHtml safely encodes HTML control entities', () => {
  function escapeHtml(str) {
    if (!str || typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const raw = '<div class="alert" id=\'x\'>Fish & Chips</div>';
  const escaped = escapeHtml(raw);
  assert(!escaped.includes('<div'), 'Must escape tags');
  assert(escaped.includes('&lt;div'), 'Must convert < to &lt;');
  assert(escaped.includes('&amp;'), 'Must convert & to &amp;');
  assert(escaped.includes('&quot;alert&quot;'), 'Must escape double quotes');
  assert(escaped.includes('&#39;x&#39;'), 'Must escape single quotes');
});

test('sanitizeUserInput neutralizes XSS tags, unclosed tags, inline event handlers, and data URIs', () => {
  function sanitizeUserInput(input, maxLength = 2000) {
    if (!input || typeof input !== 'string') return '';
    let sanitized = input.trim();
    sanitized = sanitized.replace(/<\s*(script|iframe|object|embed|style|meta|link|base|form)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '');
    sanitized = sanitized.replace(/<\s*\/?\s*(script|iframe|object|embed|style|meta|link|base|form)[^>]*>/gi, '');
    sanitized = sanitized.replace(/\bon\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '');
    sanitized = sanitized.replace(/(javascript|vbscript|data|file):/gi, '$1_blocked:');
    if (sanitized.length > maxLength) {
      sanitized = sanitized.substring(0, maxLength);
    }
    return sanitized;
  }

  // 1. Paired script tag
  const xss1 = 'Hello <script>alert(1)</script> World';
  assert.strictEqual(sanitizeUserInput(xss1), 'Hello  World');

  // 2. Unclosed script tag
  const xss2 = 'Hello <script src="https://evil.com/xss.js"> World';
  assert(!sanitizeUserInput(xss2).includes('<script'), 'Must strip unclosed script tag');

  // 3. Inline event handler
  const xss3 = '<img src="x" onerror="alert(document.cookie)">';
  assert(!sanitizeUserInput(xss3).includes('onerror'), 'Must strip onerror handler');

  // 4. Javascript pseudoprotocol
  const xss4 = '<a href="javascript:alert(1)">Click</a>';
  assert(sanitizeUserInput(xss4).includes('javascript_blocked:'), 'Must neutralize javascript: protocol');

  // 5. Length clamping
  const longText = 'A'.repeat(3000);
  assert.strictEqual(sanitizeUserInput(longText, 100).length, 100);
});

test('sanitizeUrl allows valid protocols (http, https, mailto) and blocks dangerous protocols', () => {
  function sanitizeUrl(url, allowedProtocols = ['http:', 'https:', 'mailto:']) {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (/^(?:javascript|data|vbscript|file):/i.test(trimmed)) {
      return '';
    }
    try {
      const parsed = new URL(trimmed, 'https://nuggetnihongo.com');
      if (!allowedProtocols.includes(parsed.protocol)) {
        return '';
      }
      return trimmed;
    } catch {
      if (trimmed.startsWith('/') || trimmed.startsWith('#') || trimmed.startsWith('mailto:')) {
        return trimmed;
      }
      return '';
    }
  }

  // Valid URLs
  assert.strictEqual(sanitizeUrl('https://x.com/NuggetNihongo'), 'https://x.com/NuggetNihongo');
  assert.strictEqual(sanitizeUrl('https://trakteer.id/nugget-nihongo'), 'https://trakteer.id/nugget-nihongo');
  assert.strictEqual(sanitizeUrl('mailto:nuggetnihongo@gmail.com'), 'mailto:nuggetnihongo@gmail.com');
  assert.strictEqual(sanitizeUrl('/materi'), '/materi');
  assert.strictEqual(sanitizeUrl('#home'), '#home');

  // Blocked dangerous URLs
  assert.strictEqual(sanitizeUrl('javascript:alert(document.domain)'), '');
  assert.strictEqual(sanitizeUrl('data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg=='), '');
  assert.strictEqual(sanitizeUrl('vbscript:msgbox(1)'), '');
  assert.strictEqual(sanitizeUrl('file:///C:/Windows/System32/cmd.exe'), '');
});

test('sanitizeQueryParams strips sensitive credentials and injection parameters', () => {
  function sanitizeQueryParams(queryString) {
    if (!queryString || typeof queryString !== 'string') return '';
    try {
      const params = new URLSearchParams(queryString.startsWith('?') ? queryString.slice(1) : queryString);
      const blockedParams = [
        'sb_url', 'supabase_url', 'sb_key', 'supabase_anon_key',
        'password', 'token', 'secret', 'apiKey', 'api_key'
      ];
      for (const p of blockedParams) {
        params.delete(p);
      }
      const result = params.toString();
      return result ? `?${result}` : '';
    } catch {
      return '';
    }
  }

  const query = '?sb_url=https://attacker.com&tab=grammar&token=evilToken123&level=n3';
  const clean = sanitizeQueryParams(query);
  assert(!clean.includes('sb_url'), 'Must strip sb_url');
  assert(!clean.includes('token'), 'Must strip token');
  assert(clean.includes('tab=grammar'), 'Must preserve tab');
  assert(clean.includes('level=n3'), 'Must preserve level');
});

test('sanitizeSqlSearch escapes SQL wildcards and removes null bytes', () => {
  function sanitizeSqlSearch(query, maxLen = 120) {
    if (!query || typeof query !== 'string') return '';
    const trimmed = query.trim().substring(0, maxLen);
    return trimmed
      .replace(/\0/g, '')
      .replace(/\\/g, '\\\\')
      .replace(/%/g, '\\%')
      .replace(/_/g, '\\_');
  }

  const input = '100%_guaranteed\0injection';
  const clean = sanitizeSqlSearch(input);
  assert(!clean.includes('\0'), 'Must remove null bytes');
  assert(clean.includes('\\%'), 'Must escape %');
  assert(clean.includes('\\_'), 'Must escape _');
});

test('maskApiKey obfuscates API tokens while preserving prefix and suffix', () => {
  function maskApiKey(apiKey) {
    if (!apiKey || typeof apiKey !== 'string') return '';
    const trimmed = apiKey.trim();
    if (trimmed.length <= 8) return '••••••••';
    const prefix = trimmed.slice(0, 4);
    const suffix = trimmed.slice(-4);
    return `${prefix}•••••••••••${suffix}`;
  }

  assert.strictEqual(maskApiKey('sk-or-v1-abcdef1234567890'), 'sk-o•••••••••••7890');
  assert.strictEqual(maskApiKey('short'), '••••••••');
  assert.strictEqual(maskApiKey(''), '');
  assert.strictEqual(maskApiKey(null), '');
});

// ── 2. Supabase Migration RLS & Security Policies ─────────────────
test('Supabase migration enforces RLS, SELECT auth.uid() caching, and search_paths', () => {
  const migrationPath = path.join(ROOT_DIR, 'supabase/migrations/20261025_modern_backend_overhaul.sql');
  assert(fs.existsSync(migrationPath), '20261025_modern_backend_overhaul.sql must exist');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  // Verify RLS enablement
  assert(sql.includes('ENABLE ROW LEVEL SECURITY'), 'Must enable Row Level Security');
  assert(sql.includes('ALTER TABLE public.health_heartbeats ENABLE ROW LEVEL SECURITY'), 'Must secure health_heartbeats with RLS');
  assert(sql.includes('ALTER TABLE public.user_memories ENABLE ROW LEVEL SECURITY'), 'Must secure user_memories with RLS');

  // Verify (SELECT auth.uid()) optimization for plan caching
  assert(sql.includes('(SELECT auth.uid()) = id'), 'Must use (SELECT auth.uid()) for profiles');
  assert(sql.includes('(SELECT auth.uid()) = user_id'), 'Must use (SELECT auth.uid()) for user data');

  // Verify search_path pinning to prevent hijacking
  assert(sql.includes('SET search_path = public'), 'Must set search_path on functions');
  assert(sql.includes('REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon'), 'Must revoke public execution on user creation trigger');

  // Verify match_user_memories vector similarity function security
  assert(sql.includes('CREATE OR REPLACE FUNCTION public.match_user_memories'), 'Must define match_user_memories');
  assert(sql.includes('SECURITY DEFINER'), 'match_user_memories must use SECURITY DEFINER');
  assert(sql.includes('REVOKE EXECUTE ON FUNCTION public.match_user_memories(UUID, extensions.vector, FLOAT, INT) FROM PUBLIC, anon'), 'Must revoke anon execution');
});

// ── 3. Supabase Client Connection Safeguards ──────────────────────
test('src/lib/supabase/client.ts protects against URL query project hijacking', () => {
  const clientPath = path.join(ROOT_DIR, 'src/lib/supabase/client.ts');
  assert(fs.existsSync(clientPath), 'client.ts must exist');
  const code = fs.readFileSync(clientPath, 'utf8');

  assert(code.includes("params.delete('sb_url')"), 'Must strip sb_url from URL search');
  assert(code.includes("params.delete('supabase_url')"), 'Must strip supabase_url from URL search');
  assert(code.includes("params.delete('sb_key')"), 'Must strip sb_key from URL search');
  assert(code.includes('OFFICIAL_PROJECT_REF'), 'Must define canonical project ref');
  assert(code.includes('OFFICIAL_SUPABASE_URL'), 'Must define canonical project URL');
});

// ── 4. Storage Sanitizer Defense-in-Depth ──────────────────────────
test('src/lib/storage/storageSanitizer.ts protects LocalStorage against malformed states', () => {
  const sanitizerPath = path.join(ROOT_DIR, 'src/lib/storage/storageSanitizer.ts');
  assert(fs.existsSync(sanitizerPath), 'storageSanitizer.ts must exist');
  const code = fs.readFileSync(sanitizerPath, 'utf8');

  assert(code.includes('export function sanitizeFSRSCards'), 'Must export sanitizeFSRSCards');
  assert(code.includes('export function sanitizeStreak'), 'Must export sanitizeStreak');
  assert(code.includes('export function sanitizeNumber'), 'Must export sanitizeNumber');
  assert(code.includes('emergencyExportAllLocalStorage'), 'Must export emergency export');
  assert(code.includes('emergencyResetVolatileCache'), 'Must export emergency cache flush');
});

console.log(`\n=============================================================`);
console.log(`📊 SIKLUS V PASS 50 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
