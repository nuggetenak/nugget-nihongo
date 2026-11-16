// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint20-layer4-sensei.js
//  Sprint 20: Lapisan 4 Sensei AI Studio & Asisten Pembelajaran Cerdas
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 161: Lapisan 4 Sensei AI Studio & Asisten Pembelajaran Cerdas...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: SenseiPage Structure & 2 Personas ────────────────────────
console.log('  Check 20.1: Verifying SenseiPage structure & dual personas...');
const senseiPagePath = path.join(ROOT, 'src', 'pages', 'SenseiPage.tsx');
assert(fs.existsSync(senseiPagePath), 'SenseiPage.tsx must exist');
const senseiContent = fs.readFileSync(senseiPagePath, 'utf8');

assert(
  senseiContent.includes('sensei_nugget') && senseiContent.includes('senpai_aoi'),
  'SenseiPage must support both Sensei Nugget and Senpai Aoi personas'
);
assert(
  senseiContent.includes('min-h-[40px]') && senseiContent.includes("setPersona('sensei_nugget')"),
  'Persona switcher buttons must meet >= 40px touch targets'
);
console.log('  ✅ Check 20.1 passed: Dual personas verified.');

// ── Check 2: 3 Interaction Modes (Explain, Roleplay, Correct) ──────────
console.log('  Check 20.2: Verifying 3 interaction modes (Explain, Roleplay, Correct)...');
assert(
  senseiContent.includes("setMode('explain')") &&
  senseiContent.includes("setMode('roleplay')") &&
  senseiContent.includes("setMode('correct')"),
  'SenseiPage must provide Explain, Roleplay, and Correct modes'
);
assert(
  senseiContent.includes('min-h-[44px]') && senseiContent.includes('Penjelasan & Nuansa'),
  'Mode selector tabs must enforce min-h-[44px] touch ergonomics'
);
console.log('  ✅ Check 20.2 passed: 3 interaction modes verified.');

// ── Check 3: Quick Starter Prompt Ribbons ─────────────────────────────
console.log('  Check 20.3: Verifying quick starter prompt ribbons...');
assert(
  senseiContent.includes('ROLEPLAY_SCENARIOS') &&
  senseiContent.includes('EXPLAIN_PROMPTS') &&
  senseiContent.includes('CORRECT_PROMPTS'),
  'SenseiPage must define quick starter prompt arrays for all 3 modes'
);
assert(
  senseiContent.includes('min-h-[40px]') && senseiContent.includes('handleSendMessage(sc.prompt)'),
  'Quick starter pill buttons must meet >= 40px touch target with active:scale-95'
);
console.log('  ✅ Check 20.3 passed: Quick starter prompts verified.');

// ── Check 4: Audio Pronunciation & Copy Actions ───────────────────────
console.log('  Check 20.4: Verifying audio pronunciation & copy actions...');
assert(
  senseiContent.includes('handlePlayVoice') && senseiContent.includes('speakPersona'),
  'SenseiPage must integrate persona-driven TTS audio playback'
);
assert(
  senseiContent.includes('min-h-[40px]') && senseiContent.includes('handleCopyMessage'),
  'Message action buttons (audio & copy) must meet >= 40px touch targets'
);
console.log('  ✅ Check 20.4 passed: Audio & copy actions verified.');

// ── Check 5: Input Textarea, Send Button & Non-Blocking Confirmation ──
console.log('  Check 20.5: Verifying input textarea, send button & clear confirmation...');
assert(
  senseiContent.includes('min-h-[48px]') && senseiContent.includes('inputRef'),
  'Input textarea must provide min-h-[48px] comfortable mobile typing target'
);
assert(
  senseiContent.includes('min-w-[44px] min-h-[44px]') && senseiContent.includes('handleSendMessage()'),
  'Send button must enforce 44px x 44px primary action target'
);
assert(
  senseiContent.includes('isClearConfirmOpen') && senseiContent.includes('handleConfirmClear'),
  'Clear chat confirmation must provide non-blocking accessible modal'
);
console.log('  ✅ Check 20.5 passed: Input & clear confirmation verified.');

// ── Check 6: ContextualSenseiSheet Focus Trap & Scroll Lock ───────────
console.log('  Check 20.6: Verifying ContextualSenseiSheet modal mechanics...');
const sheetPath = path.join(ROOT, 'src', 'components', 'sensei', 'ContextualSenseiSheet.tsx');
assert(fs.existsSync(sheetPath), 'ContextualSenseiSheet.tsx must exist');
const sheetContent = fs.readFileSync(sheetPath, 'utf8');

assert(
  sheetContent.includes('useFocusTrap') && sheetContent.includes('useBodyScrollLock'),
  'ContextualSenseiSheet must enforce focus trapping and body scroll locking'
);
assert(
  sheetContent.includes('min-h-[40px] min-w-[40px]') && sheetContent.includes('closeSenseiSheet'),
  'ContextualSenseiSheet close button must meet >= 40px touch target'
);
console.log('  ✅ Check 20.6 passed: ContextualSenseiSheet mechanics verified.');

// ── Check 7: Context Ribbon & Injected Metadata ───────────────────────
console.log('  Check 20.7: Verifying context ribbon & injected metadata...');
assert(
  sheetContent.includes('senseiSheetContext.target') &&
  sheetContent.includes('senseiSheetContext.level'),
  'ContextualSenseiSheet must render active target word/grammar and level'
);
console.log('  ✅ Check 20.7 passed: Context ribbon verified.');

// ── Check 8: Contextual Sheet Actions & Ergonomics ────────────────────
console.log('  Check 20.8: Verifying contextual sheet action ergonomics...');
assert(
  sheetContent.includes('min-h-[40px]') && sheetContent.includes('handlePlayVoice'),
  'ContextualSenseiSheet audio playback button must meet >= 40px touch target'
);
assert(
  sheetContent.includes('min-h-[44px] min-w-[44px]') && sheetContent.includes('handleSend'),
  'ContextualSenseiSheet send button must enforce 44px x 44px target'
);
assert(
  sheetContent.includes('min-h-[40px]') && sheetContent.includes('handleGoToQuiz'),
  'ContextualSenseiSheet CTA buttons must meet >= 40px touch targets'
);
console.log('  ✅ Check 20.8 passed: Contextual sheet action ergonomics verified.');

// ── Check 9: Interconnection Bridge to Lesson Stage 3 or Quiz ─────────
console.log('  Check 20.9: Verifying interconnection bridge from Contextual Sheet...');
assert(
  sheetContent.includes("stage-tab-drills") || sheetContent.includes("setActiveTab('quiz')"),
  'ContextualSenseiSheet must bridge back to active lesson drill stage or Quiz tab'
);
console.log('  ✅ Check 20.9 passed: Interconnection bridge verified.');

// ── Check 10: Zero Micro-Fonts Across Lapisan 4 ───────────────────────
console.log('  Check 20.10: Verifying zero micro-fonts across Lapisan 4...');
[senseiContent, sheetContent].forEach((c, idx) => {
  assert(
    !c.includes('text-[8px]') &&
    !c.includes('text-[9px]') &&
    !c.includes('text-[9.5px]') &&
    !c.includes('text-[10px]') &&
    !c.includes('text-[10.5px]') &&
    !c.includes('text-[11px]'),
    `Lapisan 4 file ${idx === 0 ? 'SenseiPage' : 'ContextualSenseiSheet'} must not contain micro-fonts < 12px`
  );
});
console.log('  ✅ Check 20.10 passed: Zero micro-fonts verified.');

console.log('🎉 All Suite 161 Lapisan 4 Sensei AI checks PASSED!');
