// ══════════════════════════════════════════════════════════════════
//  speechEngine.ts — Web Speech API Speech Synthesis Engine
//  Sintesis pelafalan bahasa Jepang offline, aman di iOS & Android
// ══════════════════════════════════════════════════════════════════

let japaneseVoice: SpeechSynthesisVoice | null = null;
let voicesLoaded = false;

/**
 * Deteksi dan pilih suara bahasa Jepang terbaik yang tersedia di sistem
 */
function findJapaneseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Prioritaskan suara asli ja-JP
  const jaVoice = voices.find(
    (v) => v.lang === 'ja-JP' || v.lang.startsWith('ja') || v.name.toLowerCase().includes('japanese')
  );

  return jaVoice || null;
}

function initVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  japaneseVoice = findJapaneseVoice();
  if (japaneseVoice) voicesLoaded = true;

  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      japaneseVoice = findJapaneseVoice();
      voicesLoaded = true;
    };
  }
}

if (typeof window !== 'undefined') {
  initVoice();
}

/**
 * Cek apakah browser mendukung Web Speech API
 */
export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/**
 * Hentikan pemutaran suara yang sedang berjalan
 */
export function stopJapaneseSpeech(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
  } catch (err) {
    console.warn('[speechEngine] Error canceling speech:', err);
  }
}

/**
 * Lafalkan teks bahasa Jepang
 * @param text Kalimat atau kata dalam bahasa Jepang (Katakana, Hiragana, Kanji)
 * @param rate Kecepatan lafal (default 1.0, lambat 0.8)
 */
export function speakJapanese(
  text: string,
  rate: number = 1.0,
  onEnd?: () => void,
  onError?: (err: any) => void
): Promise<void> {
  return new Promise((resolve) => {
    if (!isSpeechSynthesisSupported() || !text || text.trim() === '') {
      if (onEnd) onEnd();
      resolve();
      return;
    }

    try {
      // Hentikan suara sebelumnya agar tidak bertumpuk
      stopJapaneseSpeech();

      // Bersihkan teks dari simbol markup jika ada
      const cleanText = text.replace(/[\/·・]/g, ' ').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);

      utterance.lang = 'ja-JP';
      utterance.rate = Math.max(0.5, Math.min(1.5, rate)); // Clamp rate antara 0.5x dan 1.5x
      utterance.pitch = 1.0;

      if (!voicesLoaded) {
        japaneseVoice = findJapaneseVoice();
      }
      if (japaneseVoice) {
        utterance.voice = japaneseVoice;
      }

      utterance.onend = () => {
        if (onEnd) onEnd();
        resolve();
      };

      utterance.onerror = (event) => {
        // Jangan perlakukan 'canceled' atau 'interrupted' sebagai error fatal
        if (event.error !== 'canceled' && event.error !== 'interrupted') {
          console.warn('[speechEngine] Utterance error:', event.error);
        }
        if (onError) onError(event);
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('[speechEngine] Speak execution failed:', err);
      if (onError) onError(err);
      resolve();
    }
  });
}
