// ══════════════════════════════════════════════════════════════════
//  tts.ts — Native Japanese Speech Synthesis (Web Speech API)
//  Plays pronunciation instantly offline without any external API calls
// ══════════════════════════════════════════════════════════════════

let jaVoice: SpeechSynthesisVoice | null = null;

function getJaVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  if (jaVoice) return jaVoice;

  const voices = window.speechSynthesis.getVoices();
  jaVoice = voices.find((v) => v.lang === 'ja-JP' || v.lang.startsWith('ja')) || null;
  return jaVoice;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    jaVoice = null;
    getJaVoice();
  };
}

/**
 * Pronounce Japanese text
 */
export function speakJapanese(text: string, customRate?: number): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('[tts] Web Speech API not supported on this device.');
    return;
  }

  // Cancel any ongoing utterance
  window.speechSynthesis.cancel();

  // Strip HTML tags and parenthetical/bracketed furigana or notes
  let cleanText = text.replace(/<[^>]*>/g, '').trim();
  const stripped = cleanText
    .replace(/【[^】]*】/g, '')
    .replace(/〔[^〕]*〕/g, '')
    .replace(/（[^）]*）/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/\[[^\]]*\]/g, '')
    .trim();

  // If stripped isn't empty, use stripped; otherwise remove bare brackets
  if (stripped) {
    cleanText = stripped;
  } else {
    cleanText = cleanText.replace(/[【】〔〕（）\(\)\[\]]/g, '').trim();
  }

  if (!cleanText) return;

  let effectiveRate = customRate;
  if (!effectiveRate) {
    try {
      const stored = localStorage.getItem('nn_speech_rate');
      effectiveRate = stored ? parseFloat(stored) : 0.9;
    } catch {
      effectiveRate = 0.9;
    }
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'ja-JP';
  utterance.rate = effectiveRate; // default 0.9 for pedagogical clarity
  utterance.pitch = 1.0;

  const voice = getJaVoice();
  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
}
