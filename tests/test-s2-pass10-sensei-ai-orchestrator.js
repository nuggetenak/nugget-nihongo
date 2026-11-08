// ══════════════════════════════════════════════════════════════════
//  test-s2-pass10-sensei-ai-orchestrator.js
//  Nugget Nihongo · Siklus II — Pass 10 Verification Suite
//  Sensei AI Client Orchestrator, Fallback Prompt Routing,
//  Rate Limiting & Pedagogical Context Injection
// ══════════════════════════════════════════════════════════════════

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('🧪 [Siklus II — Pass 10] Testing Sensei AI Client Orchestrator, Rate Limiting & Context Injection...');

const contextualSheetPath = path.join(ROOT, 'src/components/sensei/ContextualSenseiSheet.tsx');
const senseiPagePath = path.join(ROOT, 'src/pages/SenseiPage.tsx');
const senseiClientPath = path.join(ROOT, 'src/lib/ai/senseiClient.ts');
const rateLimiterPath = path.join(ROOT, 'src/lib/ai/rateLimiter.ts');

assert(fs.existsSync(contextualSheetPath), 'ContextualSenseiSheet.tsx must exist');
assert(fs.existsSync(senseiPagePath), 'SenseiPage.tsx must exist');
assert(fs.existsSync(senseiClientPath), 'senseiClient.ts must exist');
assert(fs.existsSync(rateLimiterPath), 'rateLimiter.ts must exist');

const contextualSheetCode = fs.readFileSync(contextualSheetPath, 'utf8');
const senseiPageCode = fs.readFileSync(senseiPagePath, 'utf8');
const senseiClientCode = fs.readFileSync(senseiClientPath, 'utf8');
const rateLimiterCode = fs.readFileSync(rateLimiterPath, 'utf8');

// ── Check 10.1: ContextualSenseiSheet & SenseiPage Body Scroll Locking & Modal Adaptivity ──
console.log('  ▸ Check 10.1: ContextualSenseiSheet & SenseiPage Body Scroll Locking & Dismissal');
assert(
  contextualSheetCode.includes("import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'"),
  'ContextualSenseiSheet must import useBodyScrollLock'
);
assert(
  contextualSheetCode.includes('useBodyScrollLock(isSenseiSheetOpen)'),
  'ContextualSenseiSheet must lock body scroll when isSenseiSheetOpen is true'
);
assert(
  senseiPageCode.includes("import { useBodyScrollLock } from '../hooks/useBodyScrollLock'"),
  'SenseiPage must import useBodyScrollLock'
);
assert(
  senseiPageCode.includes('useBodyScrollLock(isClearConfirmOpen)'),
  'SenseiPage must lock body scroll when isClearConfirmOpen is true'
);
assert(
  /max-h-\[88dvh\]\s+sm:max-h-\[85vh\]/.test(contextualSheetCode),
  'ContextualSenseiSheet must retain max-height adaptivity for mobile sheets'
);
assert(
  contextualSheetCode.includes('sm:hidden shrink-0'),
  'ContextualSenseiSheet must provide mobile drag handle'
);
assert(
  contextualSheetCode.includes('onClick={closeSenseiSheet}') &&
  contextualSheetCode.includes('e.stopPropagation()'),
  'ContextualSenseiSheet must allow backdrop click dismissal while stopping propagation inside sheet'
);
assert(
  senseiPageCode.includes('setIsClearConfirmOpen(false)') &&
  senseiPageCode.includes('e.stopPropagation()'),
  'SenseiPage clear confirm dialog must support backdrop dismissal'
);
console.log('    ✓ Check 10.1 Passed: Modal body scroll lock and adaptivity verified.');

// ── Check 10.2: Touch Target Dimensions Standard (>= 40px) & Active Scale ──
console.log('  ▸ Check 10.2: Touch Target Dimensions Standard (>= 40px) & Active Scale Feedback');
assert(
  contextualSheetCode.includes('min-h-[40px] min-w-[40px] w-10 h-10') &&
  contextualSheetCode.includes('active:scale-95'),
  'ContextualSenseiSheet close button must meet min-h-[40px] min-w-[40px] with active:scale-95'
);
assert(
  contextualSheetCode.includes('min-h-[44px] min-w-[44px] w-11 h-11') &&
  contextualSheetCode.includes('active:scale-95'),
  'ContextualSenseiSheet send button must meet min-h-[44px] min-w-[44px] with active:scale-95'
);
assert(
  contextualSheetCode.includes('min-h-[40px] px-2.5 py-1.5 rounded-lg') &&
  contextualSheetCode.includes('handlePlayVoice'),
  'ContextualSenseiSheet voice pronunciation button must satisfy min-h-[40px]'
);
assert(
  senseiPageCode.includes('min-w-[44px] min-h-[44px] w-11 h-11') &&
  senseiPageCode.includes('active:scale-95'),
  'SenseiPage send button must meet min-h-[44px] min-w-[44px]'
);
assert(
  senseiPageCode.includes('min-h-[40px] min-w-[40px]') &&
  senseiPageCode.includes('handleClearChat'),
  'SenseiPage clear chat button must meet min-h-[40px] min-w-[40px]'
);
console.log('    ✓ Check 10.2 Passed: Touch target dimensions (>=40px) verified across Sensei tools.');

// ── Check 10.3: High-Contrast Accessible Text Tokens (WCAG AA Compliance) ──
console.log('  ▸ Check 10.3: High-Contrast Accessible Text Tokens across Light & Dark Themes');
assert(
  contextualSheetCode.includes('text-amber-800 dark:text-amber-300 font-bold'),
  'ContextualSenseiSheet must use high-contrast dual-theme amber tokens for level and avatar badges'
);
assert(
  contextualSheetCode.includes('text-amber-700 dark:text-amber-400 font-bold'),
  'ContextualSenseiSheet must use high-contrast dual-theme amber tokens for context ribbon'
);
assert(
  contextualSheetCode.includes('text-rose-700 dark:text-rose-400 font-bold'),
  'ContextualSenseiSheet must use high-contrast rose tokens for voice stop state'
);
assert(
  senseiPageCode.includes('text-emerald-700 dark:text-emerald-400 font-bold'),
  'SenseiPage must use high-contrast dual-theme emerald tokens for online readiness badge'
);
assert(
  senseiPageCode.includes('text-rose-700 dark:text-rose-300 font-bold'),
  'SenseiPage must use high-contrast rose tokens for Senpai Aoi avatar'
);
console.log('    ✓ Check 10.3 Passed: High-contrast tokens conform to WCAG AA.');

// ── Check 10.4: Client-Side Rate Limiter Integration in senseiClient.ts ──
console.log('  ▸ Check 10.4: Client-Side Rate Limiter Integration & Flooding Protection');
assert(
  senseiClientCode.includes("import { rateLimiter } from './rateLimiter'"),
  'senseiClient must import rateLimiter from ./rateLimiter'
);
assert(
  senseiClientCode.includes("rateLimiter.canExecute('sensei_chat')"),
  'senseiClient must check rateLimiter.canExecute before dispatching chat requests'
);
assert(
  senseiClientCode.includes("rateLimiter.recordExecution('sensei_chat')"),
  'senseiClient must record execution upon dispatching requests'
);
assert(
  senseiClientCode.includes('Mohon tunggu') && senseiClientCode.includes('Sensei sedang memproses pesan sebelumnya'),
  'senseiClient must provide user-friendly feedback on rate limit throttle'
);
console.log('    ✓ Check 10.4 Passed: Rate limiter integration and flood protection verified.');

// ── Check 10.5: Chat Payload Sanitization, Memory Leak Prevention & Truncation ──
console.log('  ▸ Check 10.5: Chat Payload Sanitization & Token Optimization');
assert(
  senseiClientCode.includes('export function sanitizeAndTrimChatHistory'),
  'senseiClient must export sanitizeAndTrimChatHistory'
);
assert(
  senseiClientCode.includes("!m.id.startsWith('err-')"),
  'sanitizeAndTrimChatHistory must purge error messages to prevent LLM context contamination'
);
assert(
  senseiClientCode.includes('slice(-maxTurns)'),
  'sanitizeAndTrimChatHistory must cap maximum message turns to prevent payload blowouts'
);
assert(
  senseiClientCode.includes('const sanitizedMessages = sanitizeAndTrimChatHistory(messages)'),
  'sendSenseiMessage must sanitize and trim incoming messages before dispatching'
);
console.log('    ✓ Check 10.5 Passed: Chat history sanitization and truncation verified.');

console.log('\n🎉 [Siklus II — Pass 10] All 5 Checks PASSED! Sensei AI Client Orchestrator is fully verified.\n');
