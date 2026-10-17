// ══════════════════════════════════════════════════════════════════
//  speechEngine.ts — Web Speech API Speech Synthesis Engine
//  Unified, Deadlock-Watchdog Protected Japanese Audio Synthesis
//  Provides native Web Speech, Kana pre-rendered WAV, & synthetic fallback
// ══════════════════════════════════════════════════════════════════

import { syntheticAudio } from './syntheticAudioFallback';

let japaneseVoice: SpeechSynthesisVoice | null = null;
let allJaVoices: SpeechSynthesisVoice[] = [];
let voicesLoaded = false;

// 104 Kana to Audio Clip Name Mapping
const KANA_TO_ROMAJI: Record<string, string> = {
  // Hiragana
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'を': 'wo', 'ん': 'n',
  'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
  'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
  'だ': 'da', 'ぢ': 'dji', 'づ': 'dzu', 'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
  'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
  'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
  'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
  'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
  'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
  'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
  'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
  'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
  'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
  'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
  'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
  'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',

  // Katakana
  'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
  'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
  'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
  'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
  'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
  'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
  'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
  'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
  'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
  'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n',
  'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
  'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
  'ダ': 'da', 'ヂ': 'dji', 'ヅ': 'dzu', 'デ': 'de', 'ド': 'do',
  'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
  'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
};

/**
 * Deteksi dan kumpulkan seluruh suara bahasa Jepang di sistem
 */
function refreshVoices(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const voices = window.speechSynthesis.getVoices() || [];
  allJaVoices = voices.filter(
    (v) => v.lang === 'ja-JP' || v.lang.startsWith('ja') || v.name.toLowerCase().includes('japanese')
  );
  japaneseVoice = allJaVoices[0] || null;
  if (allJaVoices.length > 0) voicesLoaded = true;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  refreshVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    refreshVoices();
  };
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function hasNativeJapaneseVoice(): boolean {
  refreshVoices();
  return allJaVoices.length > 0;
}

export function getJaVoice(gender?: 'male' | 'female'): SpeechSynthesisVoice | null {
  refreshVoices();
  if (allJaVoices.length === 0) return null;

  if (gender === 'female') {
    const fVoice = allJaVoices.find(
      (v) =>
        v.name.toLowerCase().includes('female') ||
        v.name.toLowerCase().includes('kyoko') ||
        v.name.toLowerCase().includes('nanami') ||
        v.name.toLowerCase().includes('ayumi') ||
        v.name.toLowerCase().includes('haruka')
    );
    if (fVoice) return fVoice;
  } else if (gender === 'male') {
    const mVoice = allJaVoices.find(
      (v) =>
        v.name.toLowerCase().includes('male') ||
        v.name.toLowerCase().includes('ichiro') ||
        v.name.toLowerCase().includes('keita') ||
        v.name.toLowerCase().includes('hattori') ||
        v.name.toLowerCase().includes('otoya')
    );
    if (mVoice) return mVoice;
  }

  return japaneseVoice || allJaVoices[0] || null;
}

export function stopJapaneseSpeech(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
  } catch (err) {
    console.warn('[speechEngine] Error canceling speech:', err);
  }
}

export interface SpeakJapaneseOptions {
  rate?: number;
  pitch?: number;
  gender?: 'male' | 'female';
  voice?: SpeechSynthesisVoice | null;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

function getStoredSpeechRate(): number {
  if (typeof window === 'undefined') return 1.0;
  try {
    const raw = localStorage.getItem('nn_speech_rate');
    const parsed = raw ? parseFloat(raw) : 1.0;
    return isNaN(parsed) || parsed <= 0 ? 1.0 : parsed;
  } catch {
    return 1.0;
  }
}

/**
 * Lafalkan teks bahasa Jepang dengan perlindungan Deadlock Watchdog.
 * Menggunakan laju bicara global (nn_speech_rate) jika parameter rate tidak diberikan (Ticket T-205).
 */
export function speakJapanese(
  text: string,
  rateOrOptions?: number | SpeakJapaneseOptions,
  legacyOnEnd?: () => void,
  legacyOnError?: (err: any) => void
): Promise<void> {
  const defaultRate = getStoredSpeechRate();
  const options: SpeakJapaneseOptions =
    typeof rateOrOptions === 'number'
      ? { rate: rateOrOptions, onEnd: legacyOnEnd, onError: legacyOnError }
      : (rateOrOptions || {});

  const effectiveRate = options.rate !== undefined && options.rate !== null && !isNaN(options.rate)
    ? options.rate
    : defaultRate;
  const effectivePitch = options.pitch ?? (options.gender === 'female' ? 1.08 : options.gender === 'male' ? 0.94 : 1.0);
  const onEnd = options.onEnd || legacyOnEnd;
  const onError = options.onError || legacyOnError;

  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !text || text.trim() === '') {
      if (onEnd) onEnd();
      resolve();
      return;
    }

    // Clean text from ruby / HTML tags / parentheticals
    let cleanText = text.replace(/<[^>]*>/g, '').trim();
    const stripped = cleanText
      .replace(/【[^】]*】/g, '')
      .replace(/〔[^〕]*〕/g, '')
      .replace(/（[^）]*）/g, '')
      .replace(/\([^)]*\)/g, '')
      .replace(/\[[^\]]*\]/g, '')
      .trim();

    if (stripped) {
      cleanText = stripped;
    } else {
      cleanText = cleanText.replace(/[【】〔〕（）\(\)\[\]\/·・]/g, ' ').trim();
    }

    if (!cleanText) {
      if (onEnd) onEnd();
      resolve();
      return;
    }

    // 1. Check local pre-rendered Kana clip for single mora
    const romaji = KANA_TO_ROMAJI[cleanText];
    if (romaji) {
      try {
        const audio = new Audio(`/audio/kana/${romaji}.wav`);
        audio.playbackRate = effectiveRate;
        audio.onended = () => {
          if (onEnd) onEnd();
          resolve();
        };
        audio.onerror = () => {
          // Fall back to Web Speech
          speakViaWebSpeech(cleanText, effectiveRate, effectivePitch, options.gender, options.voice, onEnd, onError, resolve);
        };
        audio.play().catch(() => {
          speakViaWebSpeech(cleanText, effectiveRate, effectivePitch, options.gender, options.voice, onEnd, onError, resolve);
        });
        return;
      } catch {
        // Fall back to Web Speech
      }
    }

    speakViaWebSpeech(cleanText, effectiveRate, effectivePitch, options.gender, options.voice, onEnd, onError, resolve);
  });
}

function speakViaWebSpeech(
  cleanText: string,
  rate: number,
  pitch: number,
  gender: 'male' | 'female' | undefined,
  customVoice: SpeechSynthesisVoice | null | undefined,
  onEnd: (() => void) | undefined,
  onError: ((err: any) => void) | undefined,
  resolve: () => void
): void {
  let hasResolved = false;
  let watchdogTimer: any = null;

  const finish = () => {
    if (hasResolved) return;
    hasResolved = true;
    if (watchdogTimer) {
      clearTimeout(watchdogTimer);
      watchdogTimer = null;
    }
    if (onEnd) onEnd();
    resolve();
  };

  // Deadlock Watchdog: force-resolve if browser speech stalls (e.g. iOS background throttling)
  const timeoutMs = Math.max(3000, cleanText.length * 350);
  watchdogTimer = setTimeout(() => {
    console.warn(`[speechEngine] Watchdog triggered after ${timeoutMs}ms for "${cleanText.slice(0, 15)}..."`);
    finish();
  }, timeoutMs);

  if (!isSpeechSynthesisSupported()) {
    syntheticAudio.playPitchContour(['H', 'L']);
    finish();
    return;
  }

  try {
    stopJapaneseSpeech();

    const selectedVoice = customVoice || getJaVoice(gender);
    if (!selectedVoice && !hasNativeJapaneseVoice()) {
      syntheticAudio.playPitchContour(['H', 'L']);
      finish();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ja-JP';
    utterance.rate = Math.max(0.5, Math.min(1.5, rate));
    utterance.pitch = Math.max(0.7, Math.min(1.4, pitch));

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      finish();
    };

    utterance.onerror = (event) => {
      if (event.error !== 'canceled' && event.error !== 'interrupted') {
        console.warn('[speechEngine] Utterance error:', event.error);
        if (onError) onError(event);
      }
      finish();
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('[speechEngine] Speak execution failed, falling back to synthetic audio:', err);
    syntheticAudio.playPitchContour(['H', 'L']);
    if (onError) onError(err);
    finish();
  }
}
