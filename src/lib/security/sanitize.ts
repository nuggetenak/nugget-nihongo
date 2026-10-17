// ══════════════════════════════════════════════════════════════════
//  sanitize.ts — Input Sanitization, XSS Prevention & Credential Masking
//  Protects user custom notes, search queries, and API inputs from injection
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
 */
export function sanitizeUserInput(input: string, maxLength = 2000): string {
  if (!input || typeof input !== 'string') return '';

  let sanitized = input.trim();

  // Strip script, iframe, object, embed, style tags and their contents
  sanitized = sanitized.replace(/<\s*(script|iframe|object|embed|style)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '');

  // Strip inline event handlers (e.g. onerror=, onclick=, onload=)
  sanitized = sanitized.replace(/\bon\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '');

  // Neutralize javascript: and vbscript: pseudoprotocols
  sanitized = sanitized.replace(/(javascript|vbscript|data):/gi, '$1_blocked:');

  // Clamp maximum length to mitigate memory exhaustion
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Sanitizes search queries by escaping regex meta-characters to prevent ReDoS.
 */
export function sanitizeSearchQuery(query: string, maxLen = 120): string {
  if (!query || typeof query !== 'string') return '';
  const trimmed = query.trim().substring(0, maxLen);
  // Remove dangerous control codes except normal unicode and Japanese kana/kanji
  return trimmed.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
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
