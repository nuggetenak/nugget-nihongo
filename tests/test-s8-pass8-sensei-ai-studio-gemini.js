// ══════════════════════════════════════════════════════════════════
//  test-s8-pass8-sensei-ai-studio-gemini.js
//  Siklus VIII Pass 8 (Sprint 54 / Suite 195):
//  Sensei AI Studio, Contextual Memory, Grammar Feedback & Gemini Bridges
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { rateLimiter } from '../src/lib/ai/rateLimiter.ts';
import { senseiMemory } from '../src/lib/ai/senseiMemory.ts';

console.log('⚡ Running Suite 195: Siklus VIII Pass 8 (Sprint 54): Sensei AI Studio, Contextual Memory & Gemini Bridges...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: Client Rate Limiter & Exponential Backoff Delay ──────────────────
console.log('  Check 54.1: Verifying client rate limiter policies & exponential backoff delay...');
rateLimiter.reset('sensei_chat');

const initialCheck = rateLimiter.canExecute('sensei_chat');
assert.strictEqual(initialCheck.allowed, true, 'Initial execution must be allowed');
assert.strictEqual(initialCheck.waitMs, 0, 'Initial waitMs must be 0');

rateLimiter.recordExecution('sensei_chat');

// Immediate subsequent check should be throttled by minIntervalMs (1500ms)
const immediateCheck = rateLimiter.canExecute('sensei_chat');
assert.strictEqual(immediateCheck.allowed, false, 'Immediate subsequent execution must be throttled');
assert(immediateCheck.waitMs > 0, 'Wait time must be positive when throttled');

// Exponential backoff math verification & NaN immunity
const delay0 = rateLimiter.calculateBackoffDelay(0, 1000, 15000);
assert(delay0 >= 1000 && delay0 <= 1500, 'Delay for retry 0 must be in [1000, 1500]');

const delay3 = rateLimiter.calculateBackoffDelay(3, 1000, 15000);
assert(delay3 >= 8000 && delay3 <= 15000, 'Delay for retry 3 must be in [8000, 15000]');

const delayCapped = rateLimiter.calculateBackoffDelay(10, 1000, 15000);
assert.strictEqual(delayCapped, 15000, 'Delay must be clamped to maxMs (15000ms)');

// NaN / negative resilience
const delayNaN = rateLimiter.calculateBackoffDelay(NaN, 1000, 15000);
assert(!Number.isNaN(delayNaN), 'calculateBackoffDelay must never return NaN');
assert(delayNaN >= 1000 && delayNaN <= 1500, 'calculateBackoffDelay(NaN) must fall back safely to retry 0');

const delayNeg = rateLimiter.calculateBackoffDelay(-2, 1000, 15000);
assert(delayNeg >= 1000 && delayNeg <= 1500, 'calculateBackoffDelay(-2) must fall back safely to retry 0');

console.log('  ✅ Check 54.1 passed: Rate limiter and backoff delay verified.');

// ── Check 2: Dynamic Sensei Avatar Expression Classifier Contracts ────────────
console.log('  Check 54.2: Verifying inferSenseiExpression sentiment heuristics & fallbacks in senseiClient.ts...');
const clientPath = path.join(ROOT, 'src', 'lib', 'ai', 'senseiClient.ts');
assert(fs.existsSync(clientPath), 'senseiClient.ts must exist');
const clientContent = fs.readFileSync(clientPath, 'utf8');

assert(
  clientContent.includes('export function inferSenseiExpression') &&
  clientContent.includes("if (!text || typeof text !== 'string') return 'teaching';"),
  'inferSenseiExpression must safely guard against non-string and falsy inputs'
);

assert(
  clientContent.includes("'praise'") &&
  clientContent.includes('yoku dekimashita') &&
  clientContent.includes('sugoi') &&
  clientContent.includes("'encourage'") &&
  clientContent.includes('ganbatte') &&
  clientContent.includes("'ojigi'") &&
  clientContent.includes('yoroshiku') &&
  clientContent.includes("'thinking'"),
  'inferSenseiExpression must handle praise, encourage, ojigi, and thinking sentiment patterns'
);

console.log('  ✅ Check 54.2 passed: Sensei expression classification verified.');

// ── Check 3: Canonical Prompts, Safety Guardrails & Context Cards ───────────
console.log('  Check 54.3: Verifying buildSenseiSystemPrompt personas, modes & safety guardrails...');

assert(
  clientContent.includes('export function buildSenseiSystemPrompt') &&
  clientContent.includes('SENSEI_NUGGET_BASE') &&
  clientContent.includes('SENPAI_AOI_BASE'),
  'senseiClient must export buildSenseiSystemPrompt with both Sensei Nugget and Senpai Aoi personas'
);

assert(
  clientContent.includes('MODE AKTIF: [EXPLAIN - PENJELASAN TATA BAHASA & NUANSA]') &&
  clientContent.includes('MODE AKTIF: [ROLEPLAY - PERCAKAPAN SITUASIONAL]') &&
  clientContent.includes('MODE AKTIF: [CORRECT - KOREKSI KALIMAT & UMPAN BALIK]'),
  'senseiClient must implement 3 distinct pedagogical modes (explain, roleplay, correct)'
);

assert(
  clientContent.includes('PEDOMAN KEAMANAN & BATASAN TOPIK (STRICT)') &&
  clientContent.includes('jailbreak') &&
  clientContent.includes('haji'),
  'senseiClient must enforce safety guardrails against jailbreaks and maintain safe learning atmosphere'
);

assert(
  clientContent.includes('[CONTEXT KARTU AKTIF YANG DITANYAKAN PELAJAR]') &&
  clientContent.includes('contextCard.target') &&
  clientContent.includes('contextCard.meaning_id') &&
  clientContent.includes('contextCard.structure'),
  'senseiClient must dynamically inject active context card metadata into system prompt'
);

console.log('  ✅ Check 54.3 passed: Canonical prompts and context cards verified.');

// ── Check 4: Chat History Sanitization & Defense against Malformed Payloads ─
console.log('  Check 54.4: Verifying sanitizeAndTrimChatHistory defensively prunes invalid items...');

assert(
  clientContent.includes('export function sanitizeAndTrimChatHistory') &&
  clientContent.includes('if (!Array.isArray(messages)) return [];') &&
  clientContent.includes("(!m.id || !m.id.startsWith('err-'))") &&
  clientContent.includes('return valid.slice(-maxTurns);'),
  'sanitizeAndTrimChatHistory must validate array, purge errors safely, and cap message turns'
);

assert(
  clientContent.includes('loadChatHistory') &&
  clientContent.includes('saveChatHistory') &&
  clientContent.includes('clearChatHistory'),
  'senseiClient must export history storage persistence utilities'
);

console.log('  ✅ Check 54.4 passed: Chat history sanitization verified.');

// ── Check 5: Mem0 Long-Term Memory Service CRUD & Capacity Capping ───────────
console.log('  Check 54.5: Verifying Mem0 senseiMemory CRUD, deduplication, search & capacity cap...');

senseiMemory.clearAll();
assert.strictEqual(senseiMemory.getMemories().length, 0, 'Memories must be empty after clearAll');

// Add memories
const m1 = senseiMemory.addMemory('goal', 'Lulus JLPT N3 pada Desember 2026');
assert(m1 !== null, 'Adding goal memory must succeed');
assert.strictEqual(m1?.category, 'goal');

const m2 = senseiMemory.addMemory('weak_point', 'Sering tertukar antara partikel ni dan de');
assert(m2 !== null, 'Adding weak_point memory must succeed');

// Deduplication
const m1Dup = senseiMemory.addMemory('goal', 'lulus jlpt n3 pada desember 2026');
assert.strictEqual(senseiMemory.getMemories().length, 2, 'Duplicate content must not create a new entry');
assert.strictEqual(m1Dup?.id, m1?.id, 'Duplicate must return existing entry with updated relevance');

// Query retrieval
const retrieved = senseiMemory.retrieveRelevantMemories('partikel', 3);
assert(retrieved.length > 0, 'Retrieval with matching keyword must return results');
assert(retrieved[0].content.includes('partikel'), 'Most relevant item must be returned first');

// Prompt formatting
const formatted = senseiMemory.formatMemoriesForPrompt();
assert(formatted.includes('### Memori Pembelajar (Personalized Memory Context):'), 'Formatted block must include header');
assert(formatted.includes('🎯 Target'), 'Formatted block must include category badges');
assert(formatted.includes('⚠️ Titik Lemah'), 'Formatted block must include weak_point badge');

// Capacity capping (add 60 items)
for (let i = 0; i < 60; i++) {
  senseiMemory.addMemory('mastered_concept', `Konsep kanji grade ${i}`);
}
assert(senseiMemory.getMemories().length <= 50, 'Memory store must cap at maximum 50 items');

console.log('  ✅ Check 54.5 passed: Sensei memory service verified.');

console.log('\n🎉 ALL PASS 8 (SUITE 195) SENSEI AI & GEMINI TESTS PASSED 100% GREEN!\n');
