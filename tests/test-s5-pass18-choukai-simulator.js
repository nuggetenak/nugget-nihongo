// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass18-choukai-simulator.js
//  SIKLUS V — PASS 18: Choukai Audio Simulator & Auto-Pause Drills
//  Klaster 6: Audio, Phonetics & Listening Immersion
//  Audits & Verifies:
//    - asbplayer-Inspired Sentence-Aligned ChoukaiDrillPlayer Engine
//    - convertJsonSentencesToSegments Millisecond & Second Normalization
//    - Zero-Deadlock Auto-Pause Shadowing & Resume Advancement
//    - Condensed Playback Mode Dead-Air Skip Optimization
//    - 3-Speed Playback Cycling (0.75x, 1.0x, 1.25x)
//    - 4 JFT-Basic CBT Simulation Sets (163 Total Exam Questions)
//    - Audio Files (MP3/M4A) & JSON Sentence Transcript Alignment
//    - ChoukaiAudioPlayer Unmount Cleanup & Boundary-Safe formatTime
//    - ChoukaiSimulatorPage Responsive Layout & Safe-Area Ergonomics
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS V — PASS 18: CHOUKAI AUDIO SIMULATOR & DRILLS AUDIT     ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

async function runPass18Tests() {
  const {
    ChoukaiDrillPlayer,
    convertJsonSentencesToSegments,
  } = await import('../src/lib/audio/choukaiPlayer.ts');

  const {
    CHOUKAI_QUESTION_SETS,
    getAllChoukaiSets,
    getChoukaiSetById,
  } = await import('../src/lib/data/choukaiExamBank.ts');

  // ── T-1: convertJsonSentencesToSegments Normalization ──
  console.log('--- [T-1] JSON Sentences to Audio Segments Normalization ---');

  const rawJsonSentences = [
    { startMs: 5000, endMs: 8200, text: 'こんにちは', translation: 'Halo', speaker: 'A' },
    { startMs: 10000, endMs: 13500, text: 'さようなら', translation: 'Selamat tinggal', speaker: 'B' },
    { startSec: 1.5, endSec: 4.0, textJapanese: 'おはよう', textIndonesian: 'Selamat pagi' },
  ];

  const segments = convertJsonSentencesToSegments(rawJsonSentences);
  assert.strictEqual(segments.length, 3, 'Should convert all 3 sentence items');
  // Should be sorted chronologically by startSec
  assert.strictEqual(segments[0].startSec, 1.5, 'First segment should start at 1.5s');
  assert.strictEqual(segments[0].endSec, 4.0, 'First segment should end at 4.0s');
  assert.strictEqual(segments[0].textJapanese, 'おはよう', 'First segment Japanese text preserved');

  assert.strictEqual(segments[1].startSec, 5.0, 'Second segment should convert 5000ms to 5.0s');
  assert.strictEqual(segments[1].endSec, 8.2, 'Second segment should convert 8200ms to 8.2s');
  assert.strictEqual(segments[1].textJapanese, 'こんにちは');
  assert.strictEqual(segments[1].textIndonesian, 'Halo');
  assert.strictEqual(segments[1].speaker, 'A');

  assert.strictEqual(segments[2].startSec, 10.0, 'Third segment should convert 10000ms to 10.0s');
  assert.strictEqual(segments[2].endSec, 13.5, 'Third segment should convert 13500ms to 13.5s');

  // Empty or invalid input handling
  assert.deepStrictEqual(convertJsonSentencesToSegments(null), [], 'Null input returns empty array');
  assert.deepStrictEqual(convertJsonSentencesToSegments(undefined), [], 'Undefined input returns empty array');
  console.log('  ✓ [T-1 PASS] Segment time normalization, chronological sorting & defensive guards verified.');

  // ── T-2: ChoukaiDrillPlayer Core State & Navigation ──
  console.log('--- [T-2] ChoukaiDrillPlayer Core State & Navigation ---');

  const testSegments = [
    { id: 'seg-1', startSec: 0.0, endSec: 2.5, textJapanese: '田中です。' },
    { id: 'seg-2', startSec: 4.0, endSec: 7.0, textJapanese: '初めまして。' },
    { id: 'seg-3', startSec: 9.0, endSec: 12.0, textJapanese: 'よろしくお願いします。' },
  ];

  const player = new ChoukaiDrillPlayer('test.mp3', testSegments);
  assert.strictEqual(player.getPlaybackState(), 'idle', 'Initial state must be idle');
  assert.strictEqual(player.getCurrentIndex(), 0, 'Initial index must be 0');
  assert.strictEqual(player.getCurrentSegment()?.id, 'seg-1');
  assert.strictEqual(player.getDuration(), 12.0, 'Duration matches last segment endSec in headless mode');

  // Listener event emission
  let listenerCalls = 0;
  let lastReportedState = '';
  const unsubscribe = player.subscribe((state, idx, seg) => {
    listenerCalls++;
    lastReportedState = state;
  });

  await player.play();
  assert.strictEqual(player.getPlaybackState(), 'playing');
  assert.strictEqual(lastReportedState, 'playing');
  assert(listenerCalls >= 1, 'Listener must be called on state changes');

  // Next / Prev Navigation
  await player.nextSegment();
  assert.strictEqual(player.getCurrentIndex(), 1, 'Should navigate to segment 1');
  assert.strictEqual(player.getCurrentTime(), 4.0, 'Current time aligns to segment startSec');

  await player.nextSegment();
  assert.strictEqual(player.getCurrentIndex(), 2, 'Should navigate to segment 2');
  assert.strictEqual(player.getCurrentTime(), 9.0);

  // Clamped at end
  await player.nextSegment();
  assert.strictEqual(player.getCurrentIndex(), 2, 'Cannot exceed last segment index');

  await player.prevSegment();
  assert.strictEqual(player.getCurrentIndex(), 1, 'Should navigate back to segment 1');

  await player.repeatCurrentSegment();
  assert.strictEqual(player.getCurrentIndex(), 1, 'Repeat keeps index at current segment');
  assert.strictEqual(player.getCurrentTime(), 4.0, 'Repeat rewinds to segment startSec');

  unsubscribe();
  const preUnsubCount = listenerCalls;
  player.pause();
  assert.strictEqual(listenerCalls, preUnsubCount, 'Unsubscribed listener must not receive further events');
  console.log('  ✓ [T-2 PASS] Core state, navigation boundaries & subscriber lifecycles verified.');

  // ── T-3: Zero-Deadlock Auto-Pause Shadowing Engine ──
  console.log('--- [T-3] Zero-Deadlock Auto-Pause Shadowing Engine ---');

  const shadowPlayer = new ChoukaiDrillPlayer('shadow.mp3', testSegments);
  shadowPlayer.setAutoPause(true);
  assert.strictEqual(shadowPlayer.getAutoPause(), true);

  await shadowPlayer.play();
  assert.strictEqual(shadowPlayer.getPlaybackState(), 'playing');

  // Seek past segment 1 endSec (2.5s) to simulate playback crossing the sentence boundary
  shadowPlayer.seekTime(2.6);
  assert.strictEqual(shadowPlayer.getIsAutoPaused(), true, 'Player must mark isAutoPaused = true');
  assert.strictEqual(shadowPlayer.getPlaybackState(), 'paused', 'Player must pause at sentence completion');
  assert.strictEqual(shadowPlayer.getCurrentIndex(), 0, 'Current index remains 0 during pause');

  // Zero-deadlock resume: Calling play() when isAutoPaused must advance index and unpause without loop
  await shadowPlayer.play();
  assert.strictEqual(shadowPlayer.getIsAutoPaused(), false, 'isAutoPaused must reset on resume');
  assert.strictEqual(shadowPlayer.getPlaybackState(), 'playing', 'Playback must resume');
  assert.strictEqual(shadowPlayer.getCurrentIndex(), 1, 'Index must advance to next segment (1)');
  assert.strictEqual(shadowPlayer.getCurrentTime(), 4.0, 'Timeline jumps to next segment startSec (4.0s)');

  // Cross segment 2 boundary (7.0s)
  shadowPlayer.seekTime(7.1);
  assert.strictEqual(shadowPlayer.getIsAutoPaused(), true, 'Second auto-pause triggered');
  assert.strictEqual(shadowPlayer.getPlaybackState(), 'paused');
  assert.strictEqual(shadowPlayer.getCurrentIndex(), 1);

  // Resume again
  await shadowPlayer.play();
  assert.strictEqual(shadowPlayer.getCurrentIndex(), 2, 'Advances to segment 2');
  assert.strictEqual(shadowPlayer.getCurrentTime(), 9.0);

  shadowPlayer.destroy();
  console.log('  ✓ [T-3 PASS] Auto-pause shadowing boundary detection & zero-deadlock resume verified.');

  // ── T-4: Condensed Playback Mode Dead-Air Skip ──
  console.log('--- [T-4] Condensed Playback Mode Dead-Air Skip ---');

  const condensedPlayer = new ChoukaiDrillPlayer('condensed.mp3', testSegments);
  condensedPlayer.setAutoPause(false);
  condensedPlayer.setCondensedMode(true);
  assert.strictEqual(condensedPlayer.getCondensedMode(), true);

  await condensedPlayer.play();

  // Reaching end of segment 0 (2.5s) while condensed mode is active
  condensedPlayer.seekTime(2.55);
  // In condensed mode, it must not pause; it must skip immediately to segment 1 startSec (4.0s)
  assert.strictEqual(condensedPlayer.getCurrentIndex(), 1, 'Condensed mode immediately advances segment index');
  assert.strictEqual(condensedPlayer.getCurrentTime(), 4.0, 'Condensed mode skips dead-air between 2.5s and 4.0s');
  assert.strictEqual(condensedPlayer.getPlaybackState(), 'playing', 'Condensed mode keeps playing continuously');

  condensedPlayer.destroy();
  console.log('  ✓ [T-4 PASS] Condensed playback mode seamless dead-air skip verified.');

  // ── T-5: Playback Speed Cycling & Clamping ──
  console.log('--- [T-5] Playback Speed Cycling & Clamping ---');

  const speedPlayer = new ChoukaiDrillPlayer('speed.mp3', testSegments);
  assert.strictEqual(speedPlayer.getPlaybackRate(), 1.0, 'Default rate is 1.0x');

  // Clamping test
  speedPlayer.setPlaybackRate(0.1);
  assert.strictEqual(speedPlayer.getPlaybackRate(), 0.5, 'Minimum rate clamped at 0.5x');
  speedPlayer.setPlaybackRate(5.0);
  assert.strictEqual(speedPlayer.getPlaybackRate(), 2.0, 'Maximum rate clamped at 2.0x');

  // Cycling test: 1.0x -> 1.25x -> 0.75x -> 1.0x
  speedPlayer.setPlaybackRate(1.0);
  const s1 = speedPlayer.cyclePlaybackRate();
  assert.strictEqual(s1, 1.25, 'Cycle 1 from 1.0x -> 1.25x');
  const s2 = speedPlayer.cyclePlaybackRate();
  assert.strictEqual(s2, 0.75, 'Cycle 2 from 1.25x -> 0.75x');
  const s3 = speedPlayer.cyclePlaybackRate();
  assert.strictEqual(s3, 1.0, 'Cycle 3 from 0.75x -> 1.0x');

  speedPlayer.destroy();
  console.log('  ✓ [T-5 PASS] Playback rate boundary clamping & 3-speed cycling verified.');

  // ── T-6: Official JFT-Basic CBT Exam Bank Integrity ──
  console.log('--- [T-6] Official JFT-Basic CBT Exam Bank Integrity ---');

  const allSets = getAllChoukaiSets();
  assert.strictEqual(allSets.length, 4, 'Must provide exactly 4 official simulation sets');

  let totalQuestionsCount = 0;
  let totalAudioTracks = 0;

  allSets.forEach((set, sIdx) => {
    assert(set.id > 0, `Set ${sIdx} must have positive id`);
    assert(typeof set.title === 'string' && set.title.length > 0, `Set ${set.id} has title`);
    assert(Array.isArray(set.sections) && set.sections.length > 0, `Set ${set.id} has sections`);

    set.sections.forEach((sec) => {
      assert(typeof sec.id === 'string' && sec.id.length > 0);
      assert(typeof sec.name === 'string' && sec.name.length > 0);
      assert(Array.isArray(sec.questions), `Section ${sec.id} has questions array`);

      if (sec.audioFiles) {
        totalAudioTracks += sec.audioFiles.length;
        sec.audioFiles.forEach((af) => {
          assert(af.mp3.endsWith('.mp3'), `Audio ${af.label} must have valid .mp3 extension`);
          if (af.m4a) assert(af.m4a.endsWith('.m4a'), `Audio ${af.label} m4a must end with .m4a`);
        });
      }

      sec.questions.forEach((q) => {
        totalQuestionsCount++;
        assert(typeof q.id === 'number', `Question must have numeric id`);
        assert(typeof q.answer === 'string' && q.answer.trim().length > 0, `Question ${q.id} has non-empty answer`);
        assert(Array.isArray(q.options) && q.options.length >= 2, `Question ${q.id} must have >= 2 options`);
        assert(q.promptText || q.promptImage, `Question ${q.id} must have either promptText or promptImage`);
      });
    });
  });

  assert.strictEqual(totalQuestionsCount, 163, `Expected exactly 163 CBT questions across bank, got ${totalQuestionsCount}`);
  assert(totalAudioTracks >= 19, `Expected at least 19 audio tracks across bank, got ${totalAudioTracks}`);

  const fetchedSet1 = getChoukaiSetById(1);
  assert(fetchedSet1 !== undefined && fetchedSet1.id === 1, 'getChoukaiSetById(1) returns Set 1');
  assert.strictEqual(getChoukaiSetById(999), undefined, 'Non-existent ID returns undefined');
  console.log(`  ✓ [T-6 PASS] 4 simulation sets, ${totalQuestionsCount} questions & ${totalAudioTracks} audio tracks verified.`);

  // ── T-7: Public Audio Subtitles & Transcripts ──
  console.log('--- [T-7] Public Audio Subtitles & Transcripts ---');

  const rootDir = path.resolve(__dirname, '..');
  const n5JsonPath = path.join(rootDir, 'public', 'audio', 'choukai', 'choukai-n5-01.json');
  const jftJsonPath = path.join(rootDir, 'public', 'audio', 'choukai', 'choukai-jft-01.json');

  assert(fs.existsSync(n5JsonPath), 'choukai-n5-01.json must exist');
  assert(fs.existsSync(jftJsonPath), 'choukai-jft-01.json must exist');

  const n5Data = JSON.parse(fs.readFileSync(n5JsonPath, 'utf8'));
  const jftData = JSON.parse(fs.readFileSync(jftJsonPath, 'utf8'));

  const n5Segments = convertJsonSentencesToSegments(n5Data.sentences);
  assert.strictEqual(n5Segments.length, 5, 'N5 transcript must contain 5 segments');
  n5Segments.forEach((seg, i) => {
    assert(seg.textJapanese.length > 0, `N5 segment ${i} must have Japanese text`);
    assert(seg.startSec < seg.endSec, `N5 segment ${i} startSec must precede endSec`);
    assert(typeof seg.textIndonesian === 'string', `N5 segment ${i} must have Indonesian translation`);
  });

  const jftSegments = convertJsonSentencesToSegments(jftData.sentences);
  assert.strictEqual(jftSegments.length, 3, 'JFT transcript must contain 3 segments');
  jftSegments.forEach((seg, i) => {
    assert(seg.textJapanese.length > 0, `JFT segment ${i} must have Japanese text`);
    assert(seg.startSec < seg.endSec, `JFT segment ${i} startSec must precede endSec`);
  });
  console.log('  ✓ [T-7 PASS] N5 & JFT sentence transcripts parsed and verified.');

  // ── T-8: ChoukaiAudioPlayer Component Architecture & Boundary Resilience ──
  console.log('--- [T-8] ChoukaiAudioPlayer Component Architecture & Boundary Resilience ---');

  const audioPlayerCode = fs.readFileSync(
    path.join(rootDir, 'src', 'components', 'audio', 'ChoukaiAudioPlayer.tsx'),
    'utf8'
  );

  // Verify unmount cleanup hook
  assert(
    audioPlayerCode.includes('return () =>') && audioPlayerCode.includes('el.pause()'),
    'ChoukaiAudioPlayer must include unmount cleanup pausing audio element'
  );

  // Verify safe formatTime guards against NaN / Infinity / Negatives
  assert(
    audioPlayerCode.includes('!isFinite(secs)') || audioPlayerCode.includes('isNaN(secs)'),
    'formatTime must defensively guard against non-finite values'
  );

  // Verify speed rate chips include 0.75, 1.0, 1.25
  assert(
    audioPlayerCode.includes('0.75') && audioPlayerCode.includes('1.25'),
    'ChoukaiAudioPlayer must feature 0.75x, 1.0x, 1.25x speed options'
  );

  // Verify touch target dimension
  assert(
    audioPlayerCode.includes('min-h-[40px]') || audioPlayerCode.includes('min-h-[44px]'),
    'ChoukaiAudioPlayer must maintain >= 40px touch targets'
  );
  console.log('  ✓ [T-8 PASS] ChoukaiAudioPlayer unmount cleanup, boundary safety & touch targets verified.');

  // ── T-9: ChoukaiSimulatorPage Layout & Universal Mobile Ergonomics ──
  console.log('--- [T-9] ChoukaiSimulatorPage Layout & Mobile Ergonomics ---');

  const pageCode = fs.readFileSync(
    path.join(rootDir, 'src', 'pages', 'ChoukaiSimulatorPage.tsx'),
    'utf8'
  );

  // Anti-leakage viewport constraint
  assert(pageCode.includes('overflow-x-hidden'), 'ChoukaiSimulatorPage must enforce overflow-x-hidden');

  // Safe area bottom cushion
  assert(
    pageCode.includes('safe-area-inset-bottom') || pageCode.includes('pb-[calc(5.5rem'),
    'ChoukaiSimulatorPage must include safe-area bottom cushion'
  );

  // Horizontal scrolling on tab selectors
  assert(
    pageCode.includes('overflow-x-auto') && pageCode.includes('whitespace-nowrap'),
    'Set & section selectors must support horizontal scrolling without word wrap blowouts'
  );

  // Touch target sizing on options
  assert(
    pageCode.includes('min-h-[50px]') || pageCode.includes('min-h-[44px]'),
    'Option cards must have min-h >= 40px for mobile touch ergonomics'
  );

  console.log('  ✓ [T-9 PASS] ChoukaiSimulatorPage responsive container & touch ergonomics verified.');

  console.log('\n╔══════════════════════════════════════════════════════════════════╗');
  console.log('║   ALL PASS 18 CHOUKAI SIMULATOR & AUDIO DRILL TESTS PASSED!      ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝\n');
}

runPass18Tests().catch((err) => {
  console.error('Pass 18 Test Failed:', err);
  process.exit(1);
});
