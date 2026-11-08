// ══════════════════════════════════════════════════════════════════
//  sanitize.ts — Input Sanitization, XSS Prevention & Credential Masking
//  Protects user custom notes, search queries, URLs, and API inputs from injection
// ══════════════════════════════════════════════════════════════════

/**
 * Escapes HTML control characters to prevent reflective and persistent XSS.
 */
export function escapeHtml(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Sanitizes and neutralizes malicious script payloads, inline event handlers, and data URIs.
 * Handles both closed and unclosed/stray HTML injection vectors.
 */
export function sanitizeUserInput(input: string, maxLength = 2000): string {
  if (!input || typeof input !== 'string') return '';

  let sanitized = input.trim();

  // Strip paired script, iframe, object, embed, style, meta, link, and form tags and their contents
  sanitized = sanitized.replace(/<\s*(script|iframe|object|embed|style|meta|link|base|form)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '');

  // Strip unclosed or self-closing dangerous tags
  sanitized = sanitized.replace(/<\s*\/?\s*(script|iframe|object|embed|style|meta|link|base|form)[^>]*>/gi, '');

  // Strip inline event handlers (e.g. onerror=, onclick=, onload=)
  sanitized = sanitized.replace(/\bon\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '');

  // Neutralize javascript:, vbscript:, data:, and file: pseudoprotocols
  sanitized = sanitized.replace(/(javascript|vbscript|data|file):/gi, '$1_blocked:');

  // Clamp maximum length to mitigate memory exhaustion
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Validates and sanitizes URLs to prevent javascript: or data: injection.
 * Only allows safe protocols (http, https, mailto).
 */
export function sanitizeUrl(url: string, allowedProtocols = ['http:', 'https:', 'mailto:']): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // Explicitly reject dangerous pseudoprotocols early
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
    // Relative URLs or mailto without domain
    if (trimmed.startsWith('/') || trimmed.startsWith('#') || trimmed.startsWith('mailto:')) {
      return trimmed;
    }
    return '';
  }
}

/**
 * Strips dangerous injection and credential parameters from URL query strings.
 */
export function sanitizeQueryParams(queryString: string): string {
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

/**
 * Sanitizes search queries by escaping regex meta-characters and stripping control codes.
 */
export function sanitizeSearchQuery(query: string, maxLen = 120): string {
  if (!query || typeof query !== 'string') return '';
  const trimmed = query.trim().substring(0, maxLen);
  // Remove dangerous control codes except normal unicode and Japanese kana/kanji
  return trimmed.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
}

/**
 * Sanitizes search strings for SQL LIKE patterns by escaping % and _ wildcards.
 */
export function sanitizeSqlSearch(query: string, maxLen = 120): string {
  if (!query || typeof query !== 'string') return '';
  const trimmed = query.trim().substring(0, maxLen);
  return trimmed
    .replace(/\0/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/%/g, '\\%')
    .replace(/_/g, '\\_');
}

/**
 * Masks sensitive API keys for safe display in UI and telemetry logs.
 * Example: 'sk-or-v1-50ab6c891e6278c...' -> 'sk-o•••••••••••6000'
 */
export function maskApiKey(apiKey: string): string {
  if (!apiKey || typeof apiKey !== 'string') return '';
  const trimmed = apiKey.trim();
  if (trimmed.length <= 8) return '••••••••';
  const prefix = trimmed.slice(0, 4);
  const suffix = trimmed.slice(-4);
  return `${prefix}•••••••••••${suffix}`;
}
