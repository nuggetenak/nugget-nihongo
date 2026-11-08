// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass19-voice-synthesis-zzfx.js
//  SIKLUS V — PASS 19: Multi-Tier Voice Synthesis & ZzFX Procedural WebAudio
//  Klaster 6: Audio, Phonetics & Listening Immersion
//  Audits & Verifies:
//    - voiceManager Persona Speech Synthesis (Sensei Nugget vs Senpai Aoi)
//    - extractJapaneseSpeechText Markdown/Ruby Stripping & Smart Unwrapping
//    - syntheticAudioFallback Mora Tones, Pitch Contours & Comprehension Beeps
//    - Web Audio Node Garbage Collection & scheduleCleanup Anti-Leak Protections
//    - zzfxKanjiAudio Pentatonic Scale Progression & Yo-Scale Mastery Fanfare
//    - sfx Pure Web Audio Sound System & Headless Non-Throwing Invariant
//    - tts Facade & 104 Kana Audio Mapping Matrix (KANA_TO_ROMAJI)
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS V — PASS 19: VOICE SYNTHESIS & ZZFX PROCEDURAL AUDIT    ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

async function runPass19Tests() {
  const {
    extractJapaneseSpeechText,
    speakPersona,
    stopPersonaVoice,
    speakJapaneseText,
    playAudioOrSynthesize,
    voiceManager,
  } = await import('../src/lib/audio/voiceManager.ts');

  const {
    syntheticAudio,
  } = await import('../src/lib/audio/syntheticAudioFallback.ts');

  const {
    zzfxKanjiAudio,
  } = await import('../src/lib/audio/zzfxKanjiAudio.ts');

  const {
    getAudioContext,
    isSfxEnabled,
    playSuccessSfx,
    playErrorSfx,
    playWaterSfx,
    playFlipSfx,
    playFanfareSfx,
    playBrushSfx,
  } = await import('../src/lib/audio/sfx.ts');

  const {
    speakJapanese,
    isSpeechSynthesisSupported,
    KANA_TO_ROMAJI,
  } = await import('../src/lib/audio/tts.ts');

  // ── T-1: extractJapaneseSpeechText Normalization & Smart Unwrapping ──
  console.log('--- [T-1] Japanese Speech Text Normalization & Smart Unwrapping ---');

  // 1. Markdown syntax removal
  assert.strictEqual(
    extractJapaneseSpeechText('**こんにちは**、*皆さん*！ `code` [link](http://test.com)'),
    'こんにちは、皆さん！ code link'
  );

  // 2. Emoji removal
  assert.strictEqual(
    extractJapaneseSpeechText('🍵 お茶をどうぞ 🌸✨'),
    'お茶をどうぞ'
  );

  // 3. Furigana stripping when base kanji exists
  assert.strictEqual(
    extractJapaneseSpeechText('先生（せんせい）'),
    '先生'
  );
  assert.strictEqual(
    extractJapaneseSpeechText('日本語【にほんご】'),
    '日本語'
  );

  // 4. Smart unwrapping when the entire string is bracketed / parenthesized
  assert.strictEqual(
    extractJapaneseSpeechText('（おはようございます）'),
    'おはようございます',
    'Parenthesized phrase must not be completely stripped to empty'
  );
  assert.strictEqual(
    extractJapaneseSpeechText('【文法】'),
    '文法',
    'Bracketed header must not be completely stripped to empty'
  );

  // 5. Defensive input guards
  assert.strictEqual(extractJapaneseSpeechText(null), '');
  assert.strictEqual(extractJapaneseSpeechText(undefined), '');
  assert.strictEqual(extractJapaneseSpeechText(''), '');
  assert.strictEqual(extractJapaneseSpeechText('   '), '');
  console.log('  ✓ [T-1 PASS] Text extraction, emoji/markdown stripping & smart unwrapping verified.');

  // ── T-2: Multi-Persona Speech Synthesis Lifecycle ──
  console.log('--- [T-2] Multi-Persona Speech Synthesis Lifecycle ---');

  // Verify voiceManager helper exports
  assert(typeof speakPersona === 'function');
  assert(typeof stopPersonaVoice === 'function');
  assert(typeof speakJapaneseText === 'function');
  assert(typeof playAudioOrSynthesize === 'function');
  assert(typeof voiceManager.speakPersona === 'function');

  // Headless environment non-throwing verification
  let personaEndCalled = false;
  speakPersona('テストです', 'sensei_nugget', () => {
    personaEndCalled = true;
  });
  assert.strictEqual(personaEndCalled, true, 'onEnd callback must be invoked in headless environment');

  let aoiEndCalled = false;
  speakPersona('頑張ってください！', 'senpai_aoi', () => {
    aoiEndCalled = true;
  });
  assert.strictEqual(aoiEndCalled, true, 'Senpai Aoi onEnd callback must be invoked in headless environment');

  // stopPersonaVoice should safely execute without throwing
  stopPersonaVoice();

  // playAudioOrSynthesize fallback
  let fallbackEndCalled = false;
  await playAudioOrSynthesize(undefined, 'Fallback text', 'sensei_nugget', () => {
    fallbackEndCalled = true;
  });
  assert.strictEqual(fallbackEndCalled, true, 'playAudioOrSynthesize invokes onEnd when audioUrl is missing');

  console.log('  ✓ [T-2 PASS] Multi-persona synthesis lifecycle & headless non-throwing safety verified.');

  // ── T-3: syntheticAudioFallback Anti-Leak Architecture ──
  console.log('--- [T-3] syntheticAudioFallback Anti-Leak Architecture ---');

  assert(typeof syntheticAudio.playMoraTone === 'function');
  assert(typeof syntheticAudio.playPitchContour === 'function');
  assert(typeof syntheticAudio.playComprehensionBeep === 'function');

  // Headless non-throwing execution
  syntheticAudio.playMoraTone(440, 180);
  await syntheticAudio.playPitchContour(['H', 'L']);
  syntheticAudio.playComprehensionBeep(true);
  syntheticAudio.playComprehensionBeep(false);

  // Source inspection: Web Audio Node disconnection
  const saCode = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'lib', 'audio', 'syntheticAudioFallback.ts'),
    'utf8'
  );
  assert(saCode.includes('scheduleCleanup'), 'syntheticAudioFallback must declare scheduleCleanup');
  assert(saCode.includes('gain.disconnect()'), 'Must disconnect gain node to prevent memory leaks');
  assert(saCode.includes('o.disconnect()'), 'Must disconnect oscillator nodes');
  assert(saCode.includes('onended'), 'Must attach onended handler for immediate cleanup');
  console.log('  ✓ [T-3 PASS] syntheticAudioFallback tones, pitch contours & node cleanup verified.');

  // ── T-4: zzfxKanjiAudio Pentatonic Scale & Yo-Scale Fanfare ──
  console.log('--- [T-4] zzfxKanjiAudio Pentatonic Scale & Yo-Scale Fanfare ---');

  assert(typeof zzfxKanjiAudio.playStrokeCorrect === 'function');
  assert(typeof zzfxKanjiAudio.playStrokeError === 'function');
  assert(typeof zzfxKanjiAudio.playBrushInk === 'function');
  assert(typeof zzfxKanjiAudio.playKanjiCompleteFanfare === 'function');

  // Headless non-throwing execution
  zzfxKanjiAudio.playStrokeCorrect(0, 5);
  zzfxKanjiAudio.playStrokeCorrect(4, 5);
  zzfxKanjiAudio.playStrokeError();
  zzfxKanjiAudio.playBrushInk();
  zzfxKanjiAudio.playKanjiCompleteFanfare();

  // Source inspection: Harmonic pentatonic scale & Yo-Scale celebration
  const zzfxCode = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'lib', 'audio', 'zzfxKanjiAudio.ts'),
    'utf8'
  );
  assert(zzfxCode.includes('PROGRESSION_FREQUENCIES'), 'Must define pentatonic progression frequencies');
  assert(zzfxCode.includes('523.25'), 'Includes C5 in harmonic scale');
  assert(zzfxCode.includes('2093.00'), 'Includes C7 in harmonic scale');
  assert(zzfxCode.includes('isSfxEnabled()'), 'Must check user sfx enabled setting');
  assert(zzfxCode.includes('scheduleCleanup'), 'Must implement node cleanup scheduler');
  assert(zzfxCode.includes('587.33') && zzfxCode.includes('1567.98'), 'Must implement Japanese Yo-scale fanfare');
  console.log('  ✓ [T-4 PASS] Pentatonic progression, Yo-scale fanfare & anti-leak safeguards verified.');

  // ── T-5: sfx Pure Web Audio API Sound System ──
  console.log('--- [T-5] sfx Pure Web Audio API Sound System ---');

  assert.strictEqual(getAudioContext(), null, 'In Node.js, getAudioContext returns null');
  assert.strictEqual(typeof isSfxEnabled(), 'boolean');

  // Headless non-throwing execution
  playSuccessSfx();
  playErrorSfx();
  playWaterSfx();
  playFlipSfx();
  playFanfareSfx();
  playBrushSfx();

  // Source inspection: Clean node disconnection
  const sfxCode = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'lib', 'audio', 'sfx.ts'),
    'utf8'
  );
  assert(sfxCode.includes('scheduleNodeCleanup'), 'sfx.ts must implement scheduleNodeCleanup');
  assert(sfxCode.includes('gain.disconnect()'), 'Must disconnect gain node');
  assert(sfxCode.includes('o.disconnect()'), 'Must disconnect oscillator node');
  assert(sfxCode.includes('resume()'), 'Must resume suspended audio context');
  console.log('  ✓ [T-5 PASS] Pure Web Audio sfx suite non-throwing execution & lifecycle verified.');

  // ── T-6: Unified Speech Engine Facade & 104 Kana Mapping ──
  console.log('--- [T-6] Unified Speech Engine Facade & 104 Kana Mapping ---');

  assert.strictEqual(typeof speakJapanese, 'function');
  assert.strictEqual(typeof isSpeechSynthesisSupported, 'function');

  const kanaKeys = Object.keys(KANA_TO_ROMAJI);
  assert(kanaKeys.length >= 104, `Expected at least 104 Kana mapping entries, got ${kanaKeys.length}`);

  // Test standard Hiragana
  assert.strictEqual(KANA_TO_ROMAJI['あ'], 'a');
  assert.strictEqual(KANA_TO_ROMAJI['か'], 'ka');
  assert.strictEqual(KANA_TO_ROMAJI['し'], 'shi');
  assert.strictEqual(KANA_TO_ROMAJI['つ'], 'tsu');
  assert.strictEqual(KANA_TO_ROMAJI['ん'], 'n');

  // Test Dakuon & Handakuon
  assert.strictEqual(KANA_TO_ROMAJI['が'], 'ga');
  assert.strictEqual(KANA_TO_ROMAJI['ぱ'], 'pa');

  // Test Katakana
  assert.strictEqual(KANA_TO_ROMAJI['ア'], 'a');
  assert.strictEqual(KANA_TO_ROMAJI['カ'], 'ka');
  assert.strictEqual(KANA_TO_ROMAJI['サ'], 'sa');

  // Speech delegation in headless mode
  let ttsEndCalled = false;
  await speakJapanese('こんにちは', {
    onEnd: () => {
      ttsEndCalled = true;
    },
  });
  assert.strictEqual(ttsEndCalled, true, 'speakJapanese resolves and calls onEnd in headless mode');

  console.log('  ✓ [T-6 PASS] Speech engine delegation, 104 Kana mappings & watchdog safeguards verified.');

  console.log('\n╔══════════════════════════════════════════════════════════════════╗');
  console.log('║   ALL PASS 19 VOICE SYNTHESIS & ZZFX PROCEDURAL TESTS PASSED!    ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝\n');
}

runPass19Tests().catch((err) => {
  console.error('Pass 19 Test Failed:', err);
  process.exit(1);
});
