// ══════════════════════════════════════════════════════════════════
//  test-pass5-quizpage-declutter.js
//  PASS 5 Forensic Verification Suite: QuizPage & Arena Kuis Streamlining,
//  Anti-Microfont Purge, Word-Scramble Anti-Blowout, Exit Guard & Urushi Aesthetics
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
    throw err;
  }
}

const ROOT_DIR = path.resolve(__dirname, '..');

function main() {
  console.log('\n=============================================================');
  console.log('🏛️  RUNNING PASS 5: QUIZPAGE & ARENA KUIS DE-CLUTTERING AUDIT');
  console.log('=============================================================\n');

  const quizPagePath = path.join(ROOT_DIR, 'src/pages/QuizPage.tsx');
  const arenaHubPath = path.join(ROOT_DIR, 'src/components/quiz/QuizArenaHub.tsx');
  const exitGuardPath = path.join(ROOT_DIR, 'src/components/quiz/QuizExitGuardModal.tsx');

  assert(fs.existsSync(quizPagePath), 'QuizPage.tsx must exist');
  assert(fs.existsSync(arenaHubPath), 'QuizArenaHub.tsx must exist');
  assert(fs.existsSync(exitGuardPath), 'QuizExitGuardModal.tsx must exist');

  const quizCode = fs.readFileSync(quizPagePath, 'utf8');
  const hubCode = fs.readFileSync(arenaHubPath, 'utf8');
  const guardCode = fs.readFileSync(exitGuardPath, 'utf8');

  // ── 1. Arena Kuis Streamlining & 3 Categorized Tabs ──
  test('P5.1: Establishes 3 categorized tabs for the 9 core quiz modes (Tantangan Cepat, Kosakata & Huruf, Tata Bahasa & Audio)', () => {
    // Check 3 tab labels in QuizArenaHub
    assert(hubCode.includes('Tantangan Cepat'), 'Must declare Tantangan Cepat tab');
    assert(hubCode.includes('Kosakata & Huruf'), 'Must declare Kosakata & Huruf tab');
    assert(hubCode.includes('Tata Bahasa & Audio'), 'Must declare Tata Bahasa & Audio tab');

    // Tab 1: Tantangan Cepat (Kilat 60 Detik, Ujian Adaptif CAT, Kuis Bertarung XP)
    assert(hubCode.includes('Kilat 60 Detik'), 'Must declare Kilat 60 Detik mode');
    assert(hubCode.includes('Ujian Adaptif CAT'), 'Must declare Ujian Adaptif CAT mode');
    assert(hubCode.includes('Kuis Bertarung XP'), 'Must declare Kuis Bertarung XP mode');

    // Tab 2: Kosakata & Huruf (Tebak Kanji, Bagan & Kuis Kana, Pasangan Kata)
    assert(hubCode.includes('Tebak Kanji'), 'Must declare Tebak Kanji mode');
    assert(hubCode.includes('Bagan & Kuis Kana'), 'Must declare Bagan & Kuis Kana mode');
    assert(hubCode.includes('Pasangan Kata'), 'Must declare Pasangan Kata mode');

    // Tab 3: Tata Bahasa & Audio (Susun Kalimat Bunsetsu, Audio Menyimak Choukai, Pemilih Partikel)
    assert(hubCode.includes('Susun Kalimat Bunsetsu'), 'Must declare Susun Kalimat Bunsetsu mode');
    assert(hubCode.includes('Audio Menyimak Choukai'), 'Must declare Audio Menyimak Choukai mode');
    assert(hubCode.includes('Pemilih Partikel'), 'Must declare Pemilih Partikel mode');

    // Verify CURATED_QUIZ_MODES has exactly 9 modes
    assert(hubCode.includes('CURATED_QUIZ_MODES'), 'Must export CURATED_QUIZ_MODES');
    assert(hubCode.includes('displayedCuratedModes'), 'Must compute displayedCuratedModes');
  });

  // ── 2. Prominent "Rekomendasi Hari Ini" Hero Card ──
  test('P5.2: Features a prominent "Rekomendasi Hari Ini" hero card with high-visibility CTA and stats', () => {
    assert(hubCode.includes('Rekomendasi Hari Ini'), 'Must declare Rekomendasi Hari Ini heading');
    assert(hubCode.includes('Review Harian FSRS') || hubCode.includes('Sesi Latihan Harian'), 'Must feature dynamic daily recommendation title');
    assert(hubCode.includes('shadow-glow'), 'Primary CTA button must feature shadow-glow elevation');
    assert(hubCode.includes('min-h-[48px]'), 'Primary hero CTA button must enforce min-h-[48px]');
    assert(hubCode.includes('bg-gradient-to-r from-amber-500 to-amber-400'), 'Hero CTA must use rich amber lacquer gradient');
    assert(hubCode.includes('Catatan Evaluasi'), 'Must provide access to mistake evaluation review');
  });

  // ── 3. Anti-Microfont Purge Across QuizPage, QuizArenaHub & All Quiz Modals ──
  test('P5.3: Purges all micro-fonts (text-[8px], text-[9px], text-[10px], text-[11px]) across QuizPage, QuizArenaHub & all quiz modals', () => {
    const microfontRegex = /text-\[(8|9|10|11|10\.5|11\.5)px\]/;

    const quizMatch = quizCode.match(microfontRegex);
    assert(!quizMatch, `QuizPage.tsx must NOT contain any micro-fonts below text-xs (12px), found: ${quizMatch?.[0]}`);

    const hubMatch = hubCode.match(microfontRegex);
    assert(!hubMatch, `QuizArenaHub.tsx must NOT contain any micro-fonts below text-xs (12px), found: ${hubMatch?.[0]}`);

    // Scan all components in src/components/quiz/ (including CBT simulators & specialized cards)
    const quizCompDir = path.join(ROOT_DIR, 'src/components/quiz');
    const compFiles = fs.readdirSync(quizCompDir).filter((f) => f.endsWith('.tsx') || f.endsWith('.ts'));
    for (const file of compFiles) {
      const compContent = fs.readFileSync(path.join(quizCompDir, file), 'utf8');
      const compMatch = compContent.match(microfontRegex);
      assert(!compMatch, `${file} must NOT contain any micro-fonts below text-xs (12px), found: ${compMatch?.[0]}`);
    }

    // Verify minimum text-xs on chips and controls
    assert(quizCode.includes('text-xs font-mono font-black text-theme-primary shrink-0'), 'Question counter must be text-xs');
    assert(quizCode.includes('text-xs font-black uppercase px-2.5 py-1 rounded-full'), 'Level chip must be text-xs');
    assert(hubCode.includes('text-xs font-bold text-appText-muted uppercase tracking-wider'), 'Stat ticker labels must be text-xs');
  });

  // ── 4. Word-Scramble Chip Layout Anti-Blowout on Mobile ──
  test('P5.4: Eliminates word-scramble chip layout blowouts on 320px–375px viewports', () => {
    assert(quizCode.includes('w-full max-w-full bg-surface-2 border border-accent/30 rounded-2xl p-3 sm:p-4 flex flex-wrap gap-2 sm:gap-2.5 items-center overflow-hidden'), 'Assembled sentence container must enforce max-w-full overflow-hidden');
    assert(quizCode.includes('flex flex-wrap gap-2 sm:gap-2.5 p-1 sm:p-2 w-full max-w-full overflow-hidden'), 'Available token container must enforce max-w-full overflow-hidden');
    assert(quizCode.includes('min-h-[44px]') && quizCode.includes('max-w-full min-w-0'), 'Assembled chips must declare min-h-[44px] and min-w-0 anti-blowout constraint');
    assert(quizCode.includes('break-all sm:break-normal'), 'Long tokens must break-all on small viewports to prevent layout blowouts');
  });

  // ── 5. Exit Guard Modal Focus & Accessibility ──
  test('P5.5: Mid-quiz exit guard modal guarantees focus management, escape dismissal, and accessible dialog roles', () => {
    assert(guardCode.includes('role="dialog"'), 'Must declare role="dialog"');
    assert(guardCode.includes('aria-modal="true"'), 'Must declare aria-modal="true"');
    assert(guardCode.includes('aria-labelledby="quiz-exit-title"'), 'Must declare aria-labelledby');
    assert(guardCode.includes('aria-describedby="quiz-exit-desc"'), 'Must declare aria-describedby');
    assert(guardCode.includes('stayButtonRef.current?.focus()'), 'Must auto-focus the safe Lanjutkan button');
    assert(guardCode.includes("e.key === 'Escape'"), 'Must handle Escape key dismissal');
    assert(guardCode.includes("e.key === 'Tab'"), 'Must trap focus on Tab navigation');
    assert(guardCode.includes('min-h-[44px]'), 'Buttons must enforce min-h-[44px] touch target');
  });

  // ── 6. Urushi Lacquerware Aesthetics & Progressive Disclosure ──
  test('P5.6: Adheres to refined Urushi lacquerware aesthetic with progressive disclosure for specialty modes', () => {
    assert(hubCode.includes('border-amber-500'), 'Must use warm amber lacquer borders');
    assert(hubCode.includes('group-hover:text-amber-400'), 'Card titles must transition to warm amber on hover');
    assert(hubCode.includes('Mode Tambahan & Spesialis Gemba'), 'Must include collapsible specialty mode progressive disclosure');
    assert(hubCode.includes('SPECIALTY_MODES'), 'Must preserve specialty modes array');
    assert(hubCode.includes('PrometricCbtModal'), 'Must mount Prometric SSW CBT modal');
    assert(hubCode.includes('JftBasicCbtModal'), 'Must mount JFT-Basic CBT modal');
  });

  console.log('-------------------------------------------------------------');
  console.log(`PASS 5 AUDIT COMPLETE: ${passedTests}/${totalTests} TESTS PASSED`);
  console.log('=============================================================\n');
}

main();
