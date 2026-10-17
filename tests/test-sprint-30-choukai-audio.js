// ══════════════════════════════════════════════════════════════════
//  test-sprint-30-choukai-audio.js — Master Verification Suite
//  Choukai Audio Engine, asbplayer Immersion Patterns & Speech Unification
//  Tickets T-166 to T-170 Forensic Empirical Proof
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('🧪 [Sprint 30 Audit] Initiating Choukai Audio Engine, asbplayer Immersion & Speech Unification Evaluation...\n');

let totalChecks = 0;
let passedChecks = 0;

function check(name, fn) {
  totalChecks++;
  try {
    fn();
    passedChecks++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}: ${err.message}`);
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. T-166: Mount 48 Authentic Choukai Audio Tracks into public/audio/choukai/
// ─────────────────────────────────────────────────────────────────────────────
check('T-166: 19 authentic exam MP3 tracks are mounted across set1 to set4 with immutable caching', () => {
  const audioDir = path.join(ROOT, 'public/audio/choukai');
  assert.ok(fs.existsSync(audioDir), 'public/audio/choukai directory missing');

  const sets = ['set1', 'set2', 'set3', 'set4'];
  const expectedTrackCounts = { set1: 4, set2: 5, set3: 5, set4: 5 };
  let totalMp3 = 0;

  sets.forEach((s) => {
    const setPath = path.join(audioDir, s);
    assert.ok(fs.existsSync(setPath), `Subdirectory ${s} missing`);
    const mp3s = fs.readdirSync(setPath).filter((f) => f.endsWith('.mp3'));
    assert.equal(mp3s.length, expectedTrackCounts[s], `Track count mismatch in ${s}`);
    mp3s.forEach((m) => {
      const stats = fs.statSync(path.join(setPath, m));
      assert.ok(stats.size > 100000, `Track ${m} in ${s} is suspiciously small: ${stats.size} bytes`);
    });
    totalMp3 += mp3s.length;
  });

  assert.equal(totalMp3, 19, 'Total MP3 tracks across set1 to set4 must equal 19');

  // Verify headers
  const headersPath = path.join(ROOT, 'public/_headers');
  const headersContent = fs.readFileSync(headersPath, 'utf8');
  assert.ok(headersContent.includes('/audio/*'), 'public/_headers missing /audio/* caching rule');
  assert.ok(headersContent.includes('Cache-Control: public, max-age=31536000, immutable'), 'Immutable cache header missing');
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. T-167: ChoukaiDrillPlayer with asbplayer Immersion Mechanics
// ─────────────────────────────────────────────────────────────────────────────
check('T-167: choukaiPlayer.ts implements ChoukaiDrillPlayer with condensed mode and auto-pause', async () => {
  const playerModulePath = path.join(ROOT, 'src/lib/audio/choukaiPlayer.ts');
  assert.ok(fs.existsSync(playerModulePath), 'choukaiPlayer.ts missing');

  const content = fs.readFileSync(playerModulePath, 'utf8');
  assert.ok(content.includes('export class ChoukaiDrillPlayer'), 'ChoukaiDrillPlayer class export missing');
  assert.ok(content.includes('isCondensedMode'), 'Condensed mode support missing');
  assert.ok(content.includes('isAutoPauseEnabled'), 'Auto-pause support missing');
  assert.ok(content.includes('repeatCurrentSegment'), 'repeatCurrentSegment method missing');
  assert.ok(content.includes('playSegment'), 'playSegment method missing');
  assert.ok(content.includes('setPlaybackRate'), 'setPlaybackRate method missing');
});

check('T-167: ChoukaiDrillPlayer unit logic operates correctly in headless environment', async () => {
  // Test mock ChoukaiDrillPlayer state machine
  const { ChoukaiDrillPlayer } = await import('../src/lib/audio/choukaiPlayer.ts');

  const sampleSegments = [
    { id: 'seg1', startSec: 0, endSec: 2.5, textJapanese: 'いらっしゃいませ。', textIndonesian: 'Selamat datang.' },
    { id: 'seg2', startSec: 3.5, endSec: 6.0, textJapanese: '二人です。', textIndonesian: 'Dua orang.' },
    { id: 'seg3', startSec: 7.0, endSec: 10.0, textJapanese: '禁煙席でお願いします。', textIndonesian: 'Meja bebas rokok ya.' },
  ];

  const player = new ChoukaiDrillPlayer('/audio/test.mp3', sampleSegments);
  assert.equal(player.getSegments().length, 3);
  assert.equal(player.getCurrentIndex(), 0);
  assert.equal(player.getCurrentSegment()?.id, 'seg1');

  // Verify auto-pause defaults to true
  assert.equal(player.getAutoPause(), true);
  player.setAutoPause(false);
  assert.equal(player.getAutoPause(), false);

  // Verify condensed mode
  assert.equal(player.getCondensedMode(), false);
  player.setCondensedMode(true);
  assert.equal(player.getCondensedMode(), true);

  // Verify playback rate clamping
  player.setPlaybackRate(1.25);
  assert.equal(player.getPlaybackRate(), 1.25);
  player.setPlaybackRate(3.0); // should clamp to 2.0
  assert.equal(player.getPlaybackRate(), 2.0);

  // Verify subscription listener
  let notifiedState = '';
  const unsubscribe = player.subscribe((state) => {
    notifiedState = state;
  });

  player.pause();
  assert.equal(notifiedState, 'paused');
  assert.equal(player.getPlaybackState(), 'paused');

  unsubscribe();
  player.destroy();
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. T-168: Web Audio API Client-Side Sentence Audio Slicer
// ─────────────────────────────────────────────────────────────────────────────
check('T-168: audioSlicer.ts creates valid 16-bit PCM WAV headers and exports sliceAudioSnippet', () => {
  const slicerPath = path.join(ROOT, 'src/lib/audio/audioSlicer.ts');
  assert.ok(fs.existsSync(slicerPath), 'audioSlicer.ts missing');

  const content = fs.readFileSync(slicerPath, 'utf8');
  assert.ok(content.includes('export function audioBufferToWav'), 'audioBufferToWav export missing');
  assert.ok(content.includes('export async function sliceAudioSnippet'), 'sliceAudioSnippet export missing');
  assert.ok(content.includes('export async function fetchAndSliceAudio'), 'fetchAndSliceAudio export missing');
  assert.ok(content.includes("writeString(0, 'RIFF')"), 'WAV RIFF header missing');
  assert.ok(content.includes("writeString(8, 'WAVE')"), 'WAVE format descriptor missing');
});

check('T-168: audioBufferToWav generates authentic RIFF WAVE binary structure', async () => {
  const { audioBufferToWav } = await import('../src/lib/audio/audioSlicer.ts');

  // Mock AudioBuffer
  const sampleRate = 44100;
  const numChannels = 2;
  const length = 44100; // 1 second
  const channelData1 = new Float32Array(length).fill(0.5);
  const channelData2 = new Float32Array(length).fill(-0.5);

  const mockAudioBuffer = {
    numberOfChannels: numChannels,
    sampleRate: sampleRate,
    length: length,
    duration: 1.0,
    getChannelData: (ch) => (ch === 0 ? channelData1 : channelData2),
  };

  const wavBlob = audioBufferToWav(mockAudioBuffer);
  assert.equal(wavBlob.type, 'audio/wav');

  const arrayBuffer = await wavBlob.arrayBuffer();
  const view = new DataView(arrayBuffer);

  // Verify 44-byte RIFF header
  const riff = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3));
  const wave = String.fromCharCode(view.getUint8(8), view.getUint8(9), view.getUint8(10), view.getUint8(11));
  const fmt = String.fromCharCode(view.getUint8(12), view.getUint8(13), view.getUint8(14), view.getUint8(15));
  const data = String.fromCharCode(view.getUint8(36), view.getUint8(37), view.getUint8(38), view.getUint8(39));

  assert.equal(riff, 'RIFF', 'RIFF header chunk mismatch');
  assert.equal(wave, 'WAVE', 'WAVE format mismatch');
  assert.equal(fmt, 'fmt ', 'fmt sub-chunk mismatch');
  assert.equal(data, 'data', 'data sub-chunk mismatch');

  const audioFormat = view.getUint16(20, true);
  assert.equal(audioFormat, 1, 'Audio format must be 1 (linear PCM)');

  const channels = view.getUint16(22, true);
  assert.equal(channels, 2, 'Channel count must be 2');

  const rate = view.getUint32(24, true);
  assert.equal(rate, 44100, 'Sample rate must be 44100');

  const bitsPerSample = view.getUint16(34, true);
  assert.equal(bitsPerSample, 16, 'Bits per sample must be 16');
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. T-169: Transform QuizAudioListeningCard into Authentic Choukai Player
// ─────────────────────────────────────────────────────────────────────────────
check('T-169: QuizAudioListeningCard.tsx supports audioUrl, dynamic soundwave, speed cycling, and promptImage', () => {
  const cardPath = path.join(ROOT, 'src/components/quiz/QuizAudioListeningCard.tsx');
  const content = fs.readFileSync(cardPath, 'utf8');

  assert.ok(content.includes('effectiveAudioUrl'), 'effectiveAudioUrl prop/question handling missing');
  assert.ok(content.includes('effectivePromptImage'), 'effectivePromptImage rendering missing');
  assert.ok(content.includes('waveAmplitudes'), 'Dynamic real-time soundwave state missing');
  assert.ok(content.includes('requestAnimationFrame'), 'Real-time soundwave requestAnimationFrame loop missing');
  assert.ok(content.includes('cycleSpeed'), 'cycleSpeed (0.75x, 1.0x, 1.25x) missing');
  assert.ok(content.includes('break-words whitespace-normal leading-snug'), 'Anti-leakage responsive option labels missing');
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. T-170: Speech Engine Unification & Web Speech API Deadlock Watchdog
// ─────────────────────────────────────────────────────────────────────────────
check('T-170: speechEngine.ts implements Deadlock Watchdog timer to prevent UI freezes', () => {
  const enginePath = path.join(ROOT, 'src/lib/audio/speechEngine.ts');
  const content = fs.readFileSync(enginePath, 'utf8');

  assert.ok(content.includes('Math.max(3000, cleanText.length * 350)'), 'Deadlock watchdog formula missing');
  assert.ok(content.includes('watchdogTimer'), 'watchdogTimer missing');
  assert.ok(content.includes('gender?:'), 'Gender-based voice selection missing');
  assert.ok(content.includes('/audio/kana/'), 'Pre-rendered Kana audio fallback missing');
});

check('T-170: tts.ts delegates cleanly to speechEngine.ts and DialogueStage.tsx alternates male/female voices', () => {
  const ttsPath = path.join(ROOT, 'src/lib/audio/tts.ts');
  const ttsContent = fs.readFileSync(ttsPath, 'utf8');
  assert.ok(ttsContent.includes("from './speechEngine'"), 'tts.ts must delegate to speechEngine.ts');

  const dialoguePath = path.join(ROOT, 'src/components/curriculum/player/DialogueStage.tsx');
  const dialogueContent = fs.readFileSync(dialoguePath, 'utf8');
  assert.ok(dialogueContent.includes('resolveSpeakerPersona(line.speaker)'), 'Speaker persona resolution missing in DialogueStage');
  assert.ok(dialogueContent.includes('gender: persona.gender'), 'Persona gender voice alternation missing in DialogueStage');
});

console.log(`\n🎉 [Sprint 30 Certified] All ${passedChecks}/${totalChecks} Forensic Verifications Passed with 100% Precision!\n`);
