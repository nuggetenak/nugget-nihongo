// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint43-sensei-ai-studio-memory.js
//  Sprint 43: Sensei AI Studio, AI Feedback & Contextual Memory Forensics
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 184: Sprint 43: Sensei AI Studio, AI Feedback & Contextual Memory...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: Client Rate Limiter & Backoff ────────────────────────
console.log('  Check 43.1: Verifying rate limiter & exponential backoff policies...');
const rateLimiterPath = path.join(ROOT, 'src', 'lib', 'ai', 'rateLimiter.ts');
assert(fs.existsSync(rateLimiterPath), 'rateLimiter.ts must exist');
const rateLimiterContent = fs.readFileSync(rateLimiterPath, 'utf8');

assert(
  rateLimiterContent.includes('canExecute') &&
  rateLimiterContent.includes('recordExecution') &&
  rateLimiterContent.includes('calculateBackoffDelay'),
  'rateLimiter must implement canExecute, recordExecution, and calculateBackoffDelay'
);
assert(
  rateLimiterContent.includes('sensei_chat') && rateLimiterContent.includes('minIntervalMs'),
  'rateLimiter must define sensei_chat policy with minimum spacing interval'
);
console.log('  ✅ Check 43.1 passed: Rate limiter and exponential backoff verified.');

// ── Check 2: Expression Inference & Robust Prompt Construction ────
console.log('  Check 43.2: Verifying inferSenseiExpression & buildSenseiSystemPrompt safety...');
const clientPath = path.join(ROOT, 'src', 'lib', 'ai', 'senseiClient.ts');
assert(fs.existsSync(clientPath), 'senseiClient.ts must exist');
const clientContent = fs.readFileSync(clientPath, 'utf8');

assert(
  clientContent.includes('inferSenseiExpression') &&
  clientContent.includes('teaching') &&
  clientContent.includes('praise') &&
  clientContent.includes('thinking') &&
  clientContent.includes('encourage') &&
  clientContent.includes('ojigi'),
  'senseiClient must support 5 dynamic avatar expressions'
);

assert(
  clientContent.includes('if (!text || typeof text !== \'string\') return \'teaching\';'),
  'inferSenseiExpression must safely guard against null/undefined/non-string input'
);

assert(
  clientContent.includes('buildSenseiSystemPrompt') &&
  clientContent.includes('SAFETY_GUARDRAILS') &&
  clientContent.includes('SENSEI_NUGGET_BASE') &&
  clientContent.includes('SENPAI_AOI_BASE'),
  'buildSenseiSystemPrompt must incorporate base personas and strict safety guardrails'
);
console.log('  ✅ Check 43.2 passed: Expression inference and prompt construction verified.');

// ── Check 3: Chat History Sanitization & Corruption Defense ────────
console.log('  Check 43.3: Verifying sanitizeAndTrimChatHistory & load/save guards...');
assert(
  clientContent.includes('sanitizeAndTrimChatHistory') &&
  clientContent.includes('Array.isArray(messages)') &&
  clientContent.includes('startsWith(\'err-\')'),
  'sanitizeAndTrimChatHistory must filter error-state messages and validate message objects'
);

assert(
  clientContent.includes('Pesan tidak boleh kosong.'),
  'sendSenseiMessage must reject empty message arrays'
);

assert(
  clientContent.includes('Array.isArray(parsed)') &&
  clientContent.includes('localStorage.getItem(`${STORAGE_PREFIX}${mode}`)'),
  'loadChatHistory must guard against corrupted non-array JSON in localStorage'
);
console.log('  ✅ Check 43.3 passed: Chat history sanitization and corruption defense verified.');

// ── Check 4: Long-Term Learner Memory (Mem0 Architecture) ──────────
console.log('  Check 43.4: Verifying senseiMemory long-term persistence layer...');
const memoryPath = path.join(ROOT, 'src', 'lib', 'ai', 'senseiMemory.ts');
assert(fs.existsSync(memoryPath), 'senseiMemory.ts must exist');
const memoryContent = fs.readFileSync(memoryPath, 'utf8');

assert(
  memoryContent.includes('addMemory') &&
  memoryContent.includes('retrieveRelevantMemories') &&
  memoryContent.includes('formatMemoriesForPrompt') &&
  memoryContent.includes('removeMemory') &&
  memoryContent.includes('clearAll'),
  'senseiMemory must provide full CRUD, retrieval, and prompt injection operations'
);

assert(
  memoryContent.includes('this.memories.slice(-50)') ||
  memoryContent.includes('this.memories = this.memories.slice(-50)'),
  'senseiMemory must enforce maximum memory size to prevent storage quota exhaustion'
);

assert(
  memoryContent.includes('Array.isArray(parsed) ? parsed : []'),
  'senseiMemory hydrate must guard against corrupted localStorage JSON'
);
console.log('  ✅ Check 43.4 passed: Long-term memory architecture verified.');

// ── Check 5: Sensei Studio & Contextual Sheet Integration ───────────
console.log('  Check 43.5: Verifying SenseiPage and ContextualSenseiSheet contracts...');
const pagePath = path.join(ROOT, 'src', 'pages', 'SenseiPage.tsx');
const sheetPath = path.join(ROOT, 'src', 'components', 'sensei', 'ContextualSenseiSheet.tsx');
const featurePath = path.join(ROOT, 'src', 'features', 'sensei', 'index.ts');

assert(fs.existsSync(pagePath), 'SenseiPage.tsx must exist');
assert(fs.existsSync(sheetPath), 'ContextualSenseiSheet.tsx must exist');
assert(fs.existsSync(featurePath), 'features/sensei/index.ts must exist');

const pageContent = fs.readFileSync(pagePath, 'utf8');
const sheetContent = fs.readFileSync(sheetPath, 'utf8');
const featureContent = fs.readFileSync(featurePath, 'utf8');

assert(
  featureContent.includes('SenseiPage') &&
  featureContent.includes('ContextualSenseiSheet') &&
  featureContent.includes('sendSenseiMessage') &&
  featureContent.includes('senseiMemory') &&
  featureContent.includes('rateLimiter'),
  'features/sensei/index.ts must export all core Sensei AI capabilities'
);

assert(
  pageContent.includes('Sensei Nugget') &&
  pageContent.includes('Senpai Aoi') &&
  pageContent.includes('isClearConfirmOpen') &&
  pageContent.includes('min-h-[44px]'),
  'SenseiPage must provide dual personas, touch-compliant controls, and non-blocking clear confirmation'
);

assert(
  sheetContent.includes('senseiSheetContext') &&
  sheetContent.includes('useFocusTrap') &&
  sheetContent.includes('useBodyScrollLock'),
  'ContextualSenseiSheet must enforce focus trapping and body scroll locking'
);
console.log('  ✅ Check 43.5 passed: Sensei Studio and Contextual Sheet contracts verified.');

console.log('🎉 All Suite 184 Sprint 43 Sensei AI Studio & Memory checks PASSED!');
