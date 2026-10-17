// ══════════════════════════════════════════════════════════════════
//  test-sprint-11-motion.js — Forensic Unit & Integration Suite
//  Sprint 11: Motion System, Flow Choreography & Multi-Persona Voice
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
console.log('🧪 RUNNING SPRINT 11 VERIFICATION SUITE: MOTION & VOICE PIPELINE');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-51: tailwindcss-animate & Motion Tokens ────────────────────
test('T-51: tailwindcss-animate in package.json and tailwind.config.js', () => {
  const pkgPath = path.join(ROOT_DIR, 'package.json');
  const pkgContent = fs.readFileSync(pkgPath, 'utf8');
  assert(pkgContent.includes('tailwindcss-animate'), 'package.json must contain tailwindcss-animate');

  const twPath = path.join(ROOT_DIR, 'tailwind.config.js');
  const twContent = fs.readFileSync(twPath, 'utf8');
  assert(twContent.includes("require('tailwindcss-animate')"), 'tailwind.config.js must require tailwindcss-animate');
  assert(twContent.includes('shimmer:'), 'tailwind.config.js must define shimmer keyframes');
  assert(twContent.includes("'shimmer-flow':"), 'tailwind.config.js must define shimmer-flow animation');
});

// ── T-52: W3C View Transitions API & Stage Flow Choreography ─────
test('T-52: viewTransition.ts progressive enhancement & LessonStudyPage integration', () => {
  const vtPath = path.join(ROOT_DIR, 'src/lib/ui/viewTransition.ts');
  assert(fs.existsSync(vtPath), 'src/lib/ui/viewTransition.ts must exist');
  const vtContent = fs.readFileSync(vtPath, 'utf8');
  assert(vtContent.includes('export function withViewTransition'), 'Must export withViewTransition');
  assert(vtContent.includes('prefers-reduced-motion'), 'Must check prefers-reduced-motion');
  assert(vtContent.includes('startViewTransition'), 'Must check startViewTransition');

  const lessonPagePath = path.join(ROOT_DIR, 'src/pages/LessonStudyPage.tsx');
  const lessonPageContent = fs.readFileSync(lessonPagePath, 'utf8');
  assert(lessonPageContent.includes("import { withViewTransition } from '../lib/ui/viewTransition';"), 'LessonStudyPage must import withViewTransition');
  assert(lessonPageContent.includes('withViewTransition(() => {'), 'LessonStudyPage must wrap stage transitions with withViewTransition');
  assert(lessonPageContent.includes('animate-in fade-in slide-in-from-right-4'), 'LessonStudyPage must declare directional transition classes');
});

// ── T-53: Multi-Persona Voice Pipeline & Acoustic Standards ───────
test('T-53: personaVoices.ts profiles & 24kHz -16LUFS acoustic specifications', () => {
  const personaPath = path.join(ROOT_DIR, 'src/lib/audio/personaVoices.ts');
  assert(fs.existsSync(personaPath), 'src/lib/audio/personaVoices.ts must exist');
  const personaContent = fs.readFileSync(personaPath, 'utf8');

  // Verify all 5 canonical persona profiles
  const requiredPersonas = [
    'gemba_supervisor_m',
    'colleague_f',
    'elderly_resident_f',
    'indonesian_worker_m',
    'sensei_nugget_m',
  ];
  for (const pid of requiredPersonas) {
    assert(personaContent.includes(pid), `personaVoices.ts must define ${pid}`);
  }

  // Verify acoustic standard constants
  assert(personaContent.includes('ACOUSTIC_STANDARDS'), 'personaVoices.ts must export ACOUSTIC_STANDARDS');
  assert(personaContent.includes('sampleRateHz: 24000'), 'Acoustic standard sampleRateHz must be 24000');
  assert(personaContent.includes("targetLufs: -16"), 'Acoustic standard targetLufs must be -16');
  assert(personaContent.includes("channelMode: 'mono'"), 'Acoustic standard channelMode must be mono');
  assert(personaContent.includes('export function resolveSpeakerPersona'), 'Must export resolveSpeakerPersona');
});

// ── T-54: Bimodal Dialogue Audio Player & Persona Speech Sync ────
test('T-54: LessonDialogueLine schema expansion & DialogueStage player', () => {
  const typesPath = path.join(ROOT_DIR, 'src/types/curriculum.ts');
  const typesContent = fs.readFileSync(typesPath, 'utf8');
  assert(typesContent.includes('speaker_persona_id?: PersonaProfileId;'), 'LessonDialogueLine must have speaker_persona_id');
  assert(typesContent.includes('audio_url?: string;'), 'LessonDialogueLine must have audio_url');
  assert(typesContent.includes('duration_ms?: number;'), 'LessonDialogueLine must have duration_ms');

  const stagePath = path.join(ROOT_DIR, 'src/components/curriculum/player/DialogueStage.tsx');
  const stageContent = fs.readFileSync(stagePath, 'utf8');
  assert(stageContent.includes('resolveSpeakerPersona'), 'DialogueStage must use resolveSpeakerPersona');
  assert(stageContent.includes('animate-pulse'), 'DialogueStage must provide speech-bubble active pulse animation');
  assert(stageContent.includes('handlePlayAll'), 'DialogueStage must implement sequential dialogue playback');
});

// ── T-55: Tactile Micro-Interactions & 3D Transform Unflattening ──
test('T-55: GPU compositor button physics & unflattened 3D flashcards', () => {
  const cssPath = path.join(ROOT_DIR, 'src/index.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  assert(cssContent.includes('.btn-tactile'), 'index.css must define .btn-tactile');
  assert(cssContent.includes('box-shadow: 0 4px 0'), 'btn-tactile must use GPU box-shadow for depth');
  assert(cssContent.includes('transform: translateY(3px)'), 'btn-tactile active must use translateY');
  assert(!cssContent.match(/\.btn-tactile\s*\{[^}]*border-bottom-width:\s*4px/), 'btn-tactile must not cause border-bottom-width CPU layout reflow');

  const quizPath = path.join(ROOT_DIR, 'src/pages/QuizPage.tsx');
  const quizContent = fs.readFileSync(quizPath, 'utf8');
  assert(quizContent.includes('perspective-1000 transform-style-3d'), 'QuizPage flashcard container must have 3D perspective context');
  assert(!quizContent.includes('shadow-xl overflow-hidden'), 'QuizPage 3D flashcard container must not flatten 3D context with overflow-hidden');
});

// ── T-56: Universal Shimmer Skeleton System & Layout-Shift Free Page Mounts ──
test('T-56: SkeletonCard shimmer-flow & page integration (Zero CLS)', () => {
  const skeletonPath = path.join(ROOT_DIR, 'src/components/ui/SkeletonCard.tsx');
  assert(fs.existsSync(skeletonPath), 'src/components/ui/SkeletonCard.tsx must exist');
  const skeletonContent = fs.readFileSync(skeletonPath, 'utf8');
  assert(skeletonContent.includes('animate-shimmer-flow'), 'SkeletonCard must use animate-shimmer-flow');
  assert(skeletonContent.includes("type?: SkeletonType"), 'SkeletonCard must support specialized skeleton types');
  assert(skeletonContent.includes("'word'"), 'SkeletonCard must support word variant');
  assert(skeletonContent.includes("'plant'"), 'SkeletonCard must support plant variant');
  assert(skeletonContent.includes('export const SkeletonGrid'), 'Must export SkeletonGrid');

  const homePath = path.join(ROOT_DIR, 'src/pages/HomePage.tsx');
  const homeContent = fs.readFileSync(homePath, 'utf8');
  assert(homeContent.includes("import { SkeletonCard } from '../components/ui/SkeletonCard';"), 'HomePage must import SkeletonCard');
  assert(homeContent.includes('<SkeletonCard type="word"'), 'HomePage must render SkeletonCard when dailyWord is loading');

  const kebunPath = path.join(ROOT_DIR, 'src/pages/KebunPage.tsx');
  const kebunContent = fs.readFileSync(kebunPath, 'utf8');
  assert(kebunContent.includes("import { SkeletonGrid } from '../components/ui/SkeletonCard';"), 'KebunPage must import SkeletonGrid');
  assert(kebunContent.includes('<SkeletonGrid count={8} type="plant" />'), 'KebunPage must render SkeletonGrid when plants are empty/loading');
});

console.log('\n─────────────────────────────────────────────────────────────');
console.log(`📊 SPRINT 11 RESULT: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('─────────────────────────────────────────────────────────────\n');

if (passedTests !== totalTests) {
  process.exit(1);
} else {
  process.exit(0);
}
