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
export function speakJapanese(text: string, rate: number = 0.9): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('[tts] Web Speech API not supported on this device.');
    return;
  }

  // Cancel any ongoing utterance
  window.speechSynthesis.cancel();

  // Strip HTML tags if any
  const cleanText = text.replace(/<[^>]*>/g, '').trim();
  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'ja-JP';
  utterance.rate = rate; // slightly slower for better pedagogical clarity
  utterance.pitch = 1.0;

  const voice = getJaVoice();
  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
}
