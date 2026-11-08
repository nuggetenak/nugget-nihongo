// ══════════════════════════════════════════════════════════════════════
//  test-s3-pass6-sensei-ai-studio.js — Verification Suite
//  Siklus III Pass 6: Sensei AI Studio, Expression Engine & Contextual Sheet
//  (SenseiPage.tsx, ContextualSenseiSheet.tsx, senseiClient.ts)
// ══════════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let passedChecks = 0;
const totalChecks = 5;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  passedChecks++;
  console.log(`✅ PASS [${passedChecks}/${totalChecks}]: ${message}`);
}

console.log('🍵 [SIKLUS III PASS 6] Starting Sensei AI Studio, Expression Engine & Contextual Sheet Verification...\n');

// ---------------------------------------------------------------------
// Check 1: SenseiPage.tsx (Irasutoya Header Personas & Dynamic Avatar Function)
// ---------------------------------------------------------------------
const senseiPagePath = path.resolve(__dirname, '../src/pages/SenseiPage.tsx');
const senseiPageCode = fs.readFileSync(senseiPagePath, 'utf8');

assert(
  senseiPageCode.includes('import { IrasutoyaImage }') &&
  senseiPageCode.includes('assetId="sensei_teaching"') &&
  senseiPageCode.includes('assetId="senpai_studying"') &&
  senseiPageCode.includes('getSenseiAvatarAsset'),
  'SenseiPage integrates Irasutoya avatars for Sensei Nugget & Senpai Aoi, and implements dynamic getSenseiAvatarAsset'
);

// ---------------------------------------------------------------------
// Check 2: SenseiPage.tsx (Thinking Indicator & Quick Pills Lift)
// ---------------------------------------------------------------------
assert(
  senseiPageCode.includes('assetId="sensei_thinking"') &&
  senseiPageCode.includes('card-interactive-lift rounded-full bg-surface-2'),
  'SenseiPage integrates Irasutoya sensei_thinking expression in loading state, and card-interactive-lift on quick starter pills'
);

// ---------------------------------------------------------------------
// Check 3: SenseiPage.tsx (Message Bubble Interactive Lift)
// ---------------------------------------------------------------------
assert(
  senseiPageCode.includes('card-interactive-lift rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 leading-relaxed shadow-xs'),
  'SenseiPage applies card-interactive-lift to chat message bubble cards'
);

// ---------------------------------------------------------------------
// Check 4: ContextualSenseiSheet.tsx (Irasutoya Sensei Header & Bubble Lift)
// ---------------------------------------------------------------------
const sheetPath = path.resolve(__dirname, '../src/components/sensei/ContextualSenseiSheet.tsx');
const sheetCode = fs.readFileSync(sheetPath, 'utf8');

assert(
  sheetCode.includes('import { IrasutoyaImage }') &&
  sheetCode.includes('assetId="sensei_teaching"') &&
  sheetCode.includes('card-interactive-lift rounded-2xl px-3.5 py-2.5'),
  'ContextualSenseiSheet integrates Irasutoya sensei_teaching in header & message avatar, and applies card-interactive-lift to message cards'
);

// ---------------------------------------------------------------------
// Check 5: senseiClient.ts (inferSenseiExpression & ChatMessage Expression Tag)
// ---------------------------------------------------------------------
const clientPath = path.resolve(__dirname, '../src/lib/ai/senseiClient.ts');
const clientCode = fs.readFileSync(clientPath, 'utf8');

assert(
  clientCode.includes('inferSenseiExpression') &&
  clientCode.includes("expression?: 'teaching' | 'praise' | 'thinking' | 'encourage' | 'ojigi'") &&
  clientCode.includes('expression: inferSenseiExpression('),
  'senseiClient.ts exports inferSenseiExpression sentiment mapper and tags ChatMessage responses with expression metadata'
);

console.log('\n🏆 [SIKLUS III PASS 6] All 5/5 Sensei AI Studio & Contextual Sheet Checks PASSED 100% GREEN!\n');
