// ══════════════════════════════════════════════════════════════════
//  test-challenger-m4-adversarial.js — Empirical Challenger Verification
//  Milestone 4: Tab 4 Sensei AI Room & In-Lesson Contextual Sheet
//  Adversarial Stress Harness, Touch Targets, Responsive & Invariants
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

console.log('══════════════════════════════════════════════════════════════════');
console.log('🔥 EMPIRICAL CHALLENGER 2: MILESTONE 4 ADVERSARIAL STRESS SUITE');
console.log('   Tab 4: Sensei AI Room (SenseiPage.tsx) &');
console.log('   In-Lesson Contextual Sheet (LessonStudyPage.tsx & App.tsx)');
console.log('══════════════════════════════════════════════════════════════════\n');

let totalChecks = 0;
let passedChecks = 0;

function check(label, condition) {
  totalChecks++;
  try {
    assert(condition, label);
    passedChecks++;
    console.log(`    ✓ ${label}`);
  } catch (err) {
    console.error(`    ❌ FAILED: ${label}`);
    throw err;
  }
}

// ── 1. Load Files ─────────────────────────────────────────────────
const senseiPath = path.join(ROOT, 'src/pages/SenseiPage.tsx');
const lessonStudyPath = path.join(ROOT, 'src/pages/LessonStudyPage.tsx');
const contextualSheetPath = path.join(ROOT, 'src/components/sensei/ContextualSenseiSheet.tsx');
const appPath = path.join(ROOT, 'src/App.tsx');
const appStorePath = path.join(ROOT, 'src/store/useAppStore.ts');

check('SenseiPage.tsx exists', fs.existsSync(senseiPath));
check('LessonStudyPage.tsx exists', fs.existsSync(lessonStudyPath));
check('ContextualSenseiSheet.tsx exists', fs.existsSync(contextualSheetPath));
check('App.tsx exists', fs.existsSync(appPath));
check('useAppStore.ts exists', fs.existsSync(appStorePath));

const senseiCode = fs.readFileSync(senseiPath, 'utf8');
const lessonStudyCode = fs.readFileSync(lessonStudyPath, 'utf8');
const sheetCode = fs.readFileSync(contextualSheetPath, 'utf8');
const appCode = fs.readFileSync(appPath, 'utf8');
const appStoreCode = fs.readFileSync(appStorePath, 'utf8');

// ══════════════════════════════════════════════════════════════════
// 🥊 SUITE 1: SenseiPage Touch Target & Ergonomics Audit
// ══════════════════════════════════════════════════════════════════
console.log('\n── SUITE 1: SenseiPage.tsx Touch Targets & Ergonomics ──');

// 1.1 Persona buttons
check('Sensei Nugget button has min-h-[40px]', /onClick=\{\(\) => setPersona\('sensei_nugget'\)\}[\s\S]*?min-h-\[40px\]/.test(senseiCode));
check('Sensei Nugget button has active:scale-95', /onClick=\{\(\) => setPersona\('sensei_nugget'\)\}[\s\S]*?active:scale-95/.test(senseiCode));
check('Senpai Aoi button has min-h-[40px]', /onClick=\{\(\) => setPersona\('senpai_aoi'\)\}[\s\S]*?min-h-\[40px\]/.test(senseiCode));
check('Senpai Aoi button has active:scale-95', /onClick=\{\(\) => setPersona\('senpai_aoi'\)\}[\s\S]*?active:scale-95/.test(senseiCode));

// 1.2 Mode selection tabs
check('Mode explain button has min-h-[44px]', /onClick=\{\(\) => setMode\('explain'\)\}[\s\S]*?min-h-\[44px\]/.test(senseiCode));
check('Mode explain button has active:scale-95', /onClick=\{\(\) => setMode\('explain'\)\}[\s\S]*?active:scale-95/.test(senseiCode));
check('Mode roleplay button has min-h-[44px]', /onClick=\{\(\) => setMode\('roleplay'\)\}[\s\S]*?min-h-\[44px\]/.test(senseiCode));
check('Mode roleplay button has active:scale-95', /onClick=\{\(\) => setMode\('roleplay'\)\}[\s\S]*?active:scale-95/.test(senseiCode));
check('Mode correct button has min-h-[44px]', /onClick=\{\(\) => setMode\('correct'\)\}[\s\S]*?min-h-\[44px\]/.test(senseiCode));
check('Mode correct button has active:scale-95', /onClick=\{\(\) => setMode\('correct'\)\}[\s\S]*?active:scale-95/.test(senseiCode));

// 1.3 Quick starter pills
check('Roleplay starter pills have min-h-[40px] and active:scale-95', /ROLEPLAY_SCENARIOS\.map[\s\S]*?min-h-\[40px\][\s\S]*?active:scale-95/.test(senseiCode));
check('Explain starter pills have min-h-[40px] and active:scale-95', /EXPLAIN_PROMPTS\.map[\s\S]*?min-h-\[40px\][\s\S]*?active:scale-95/.test(senseiCode));
check('Correct starter pills have min-h-[40px] and active:scale-95', /CORRECT_PROMPTS\.map[\s\S]*?min-h-\[40px\][\s\S]*?active:scale-95/.test(senseiCode));

// 1.4 Voice playback and suggested action
check('Voice playback button has min-h-[40px] and active:scale-95', /handlePlayVoice\(msg\.id, msg\.content\)[\s\S]*?min-h-\[40px\][\s\S]*?active:scale-95/.test(senseiCode));
check('Suggested action CTA button has min-h-[40px] and active:scale-95', /handleSuggestedAction\(msg\.suggestedAction!\)[\s\S]*?min-h-\[40px\][\s\S]*?active:scale-95/.test(senseiCode));

// 1.5 Send button and Clear chat button
check('Send message button has w-11 h-11 (44px) and active:scale-95', /handleSendMessage\(\)[\s\S]*?w-11 h-11[\s\S]*?active:scale-95/.test(senseiCode));
check('Clear chat trigger has min-h-[40px], min-w-[40px], and active:scale-95', /onClick=\{handleClearChat\}[\s\S]*?min-h-\[40px\][\s\S]*?min-w-\[40px\][\s\S]*?active:scale-95/.test(senseiCode));

// 1.6 Non-blocking confirmation modal
check('Confirmation modal cancel button has min-h-[44px] and active:scale-95', /onClick=\{\(\) => setIsClearConfirmOpen\(false\)\}[\s\S]*?min-h-\[44px\][\s\S]*?active:scale-95/.test(senseiCode));
check('Confirmation modal confirm button has min-h-[44px] and active:scale-95', /onClick=\{handleConfirmClear\}[\s\S]*?min-h-\[44px\][\s\S]*?active:scale-95/.test(senseiCode));

// ══════════════════════════════════════════════════════════════════
// 🥊 SUITE 2: LessonStudyPage Touch Target & Ergonomics Audit
// ══════════════════════════════════════════════════════════════════
console.log('\n── SUITE 2: LessonStudyPage.tsx Touch Targets & Controls ──');

// 2.1 Back button in header
check('Header back button has min-h-[44px] min-w-[44px] and active:scale-95', /onClick=\{closeLessonStudy\}[\s\S]*?min-h-\[44px\][\s\S]*?min-w-\[44px\][\s\S]*?active:scale-95/.test(lessonStudyCode));

// 2.2 In-Lesson Tanya Sensei trigger
check('Tanya Sensei trigger has min-h-[40px] and active:scale-95', /onClick=\{handleOpenSensei\}[\s\S]*?min-h-\[40px\][\s\S]*?active:scale-95/.test(lessonStudyCode));

// 2.3 Stepper stage buttons
check('Stepper buttons have min-h-[44px], min-w-0, and active:scale-95', /stages\.map[\s\S]*?min-h-\[44px\][\s\S]*?min-w-0[\s\S]*?active:scale-95/.test(lessonStudyCode));

// 2.4 Footer navigation buttons
check('Tahap Sebelumnya button has min-h-[44px] and active:scale-95', /Tahap Sebelumnya[\s\S]*?min-h-\[44px\][\s\S]*?active:scale-95|min-h-\[44px\][\s\S]*?active:scale-95[\s\S]*?Tahap Sebelumnya/.test(lessonStudyCode));
check('Lanjut Tahap Berikutnya button has min-h-[44px] and active:scale-95', /Lanjut Tahap Berikutnya[\s\S]*?min-h-\[44px\][\s\S]*?active:scale-95|min-h-\[44px\][\s\S]*?active:scale-95[\s\S]*?Lanjut Tahap Berikutnya/.test(lessonStudyCode));
check('Pelajaran Berikutnya button has min-h-[44px] and active:scale-95', /Pelajaran Berikutnya[\s\S]*?min-h-\[44px\][\s\S]*?active:scale-95|min-h-\[44px\][\s\S]*?active:scale-95[\s\S]*?Pelajaran Berikutnya/.test(lessonStudyCode));

// ══════════════════════════════════════════════════════════════════
// 🥊 SUITE 3: Responsive Constraints & Anti-Leakage Invariants
// ══════════════════════════════════════════════════════════════════
console.log('\n── SUITE 3: Responsive Layout & Anti-Leakage Constraints ──');

// 3.1 SenseiPage container
check('SenseiPage outer container has safe-area bottom cushion pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12', 
  /pb-\[calc\(5\.5rem\+env\(safe-area-inset-bottom\)\)\]\s+lg:pb-12/.test(senseiCode));
check('SenseiPage outer container has zero horizontal overflow guards (overflow-x-hidden min-w-0)',
  /overflow-x-hidden\s+min-w-0|min-w-0\s+overflow-x-hidden/.test(senseiCode));
check('SenseiPage outer container has fluid responsive max-w (w-full max-w-full sm:max-w-4xl)',
  /w-full\s+max-w-full\s+sm:max-w-4xl/.test(senseiCode));

// 3.2 Quick starter horizontal scroll
check('SenseiPage quick starter container uses horizontal scroll with scrollbar-none and max-w-full',
  /overflow-x-auto\s+scrollbar-none[\s\S]*?max-w-full|scrollbar-none[\s\S]*?overflow-x-auto[\s\S]*?max-w-full/.test(senseiCode));

// 3.3 LessonStudyPage container
check('LessonStudyPage outer container has safe-area bottom cushion pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12',
  /pb-\[calc\(5\.5rem\+env\(safe-area-inset-bottom\)\)\]\s+lg:pb-12/.test(lessonStudyCode));
check('LessonStudyPage outer container has zero horizontal overflow guards (min-w-0 overflow-x-hidden)',
  /min-w-0\s+overflow-x-hidden|overflow-x-hidden\s+min-w-0/.test(lessonStudyCode));

// 3.4 Stepper anti-collision on mobile
check('LessonStudyPage stepper contains responsive short labels for mobile (sm:hidden vs hidden sm:inline)',
  /sm:hidden[\s\S]*?shortLabel[\s\S]*?hidden sm:inline[\s\S]*?label/.test(lessonStudyCode));

// ══════════════════════════════════════════════════════════════════
// 🥊 SUITE 4: Persona, Copywriting, & Anti-Regressions (Sprints 3, 12, 28)
// ══════════════════════════════════════════════════════════════════
console.log('\n── SUITE 4: Persona, Copywriting & Anti-Regressions ──');

// 4.1 Persona descriptions correctness
check('Sensei Nugget is correctly mapped to "Sensei ramah & suportif"', 
  senseiCode.includes('Sensei ramah & suportif, analogi hangat dan konteks budaya'));
check('Senpai Aoi is correctly mapped to "Senpai to the point"',
  senseiCode.includes('Senpai to the point, percakapan alami dan realitas dunia kerja'));

// 4.2 Roleplay scenarios
const expectedScenarios = ['ramen', 'konbini', 'station', 'baito'];
expectedScenarios.forEach((scId) => {
  check(`Roleplay scenario "${scId}" is registered`, new RegExp(`id:\\s*['"]${scId}['"]`).test(senseiCode));
});
check('Konbini scenario contains Indonesian copy "kantung plastik"', senseiCode.includes('kantung plastik'));

// 4.3 Anti-regression: NO window.confirm
check('SenseiPage does NOT use native window.confirm', !/window\.confirm/.test(senseiCode));
check('LessonStudyPage does NOT use native window.confirm', !/window\.confirm/.test(lessonStudyCode));

// 4.4 Anti-regression: NO focus:outline-hidden (Sprint 3)
check('SenseiPage does NOT use deprecated focus:outline-hidden', !/focus:outline-hidden/.test(senseiCode));
check('SenseiPage uses compliant focus:outline-none', /focus:outline-none/.test(senseiCode));

// ══════════════════════════════════════════════════════════════════
// 🥊 SUITE 5: Non-Destructive Invariant & Sheet Integration (F12)
// ══════════════════════════════════════════════════════════════════
console.log('\n── SUITE 5: Non-Destructive Invariant & Sheet Integration (F12) ──');

// 5.1 Root mount in App.tsx
check('ContextualSenseiSheet is imported in App.tsx', /import\s+\{\s*ContextualSenseiSheet\s*\}\s+from\s+['"]\.\/components\/sensei\/ContextualSenseiSheet['"]/.test(appCode));
check('ContextualSenseiSheet is rendered at the root boundary in App.tsx', /<ContextualSenseiSheet\s*\/>/.test(appCode));

// 5.2 Contextual payload in LessonStudyPage
check('LessonStudyPage invokes openSenseiSheet with rich context object', 
  /openSenseiSheet\(\{[\s\S]*?id:[\s\S]*?type:[\s\S]*?level:[\s\S]*?target:[\s\S]*?structure:[\s\S]*?exampleJa:[\s\S]*?exampleId:[\s\S]*?\}\)/.test(lessonStudyCode));

// 5.3 AppStore stores sheet state without unmounting lesson
check('useAppStore defines isSenseiSheetOpen', /isSenseiSheetOpen:\s*boolean/.test(appStoreCode));
check('useAppStore defines senseiSheetContext', /senseiSheetContext:\s*\{[\s\S]*?\}\s*\|\s*null/.test(appStoreCode));
check('useAppStore defines openSenseiSheet action', /openSenseiSheet:\s*\(ctx:\s*\{[\s\S]*?\}\)\s*=>\s*void/.test(appStoreCode));
check('useAppStore defines closeSenseiSheet action', /closeSenseiSheet:\s*\(\)\s*=>\s*void/.test(appStoreCode));

// 5.4 ContextualSenseiSheet mobile modal adaptivity
check('ContextualSenseiSheet mobile bottom sheet has max-h-[88dvh] sm:max-h-[85vh]', /max-h-\[88dvh\]\s+sm:max-h-\[85vh\]/.test(sheetCode));
check('ContextualSenseiSheet has mobile drag handle bar', /sm:hidden shrink-0/.test(sheetCode));

console.log('\n══════════════════════════════════════════════════════════════════');
console.log(`🏁 CHALLENGER 2 VERIFICATION RESULT: ${passedChecks}/${totalChecks} CHECKS PASSED`);
console.log('══════════════════════════════════════════════════════════════════');
