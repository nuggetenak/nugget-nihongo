// ══════════════════════════════════════════════════════════════════
//  voiceManager.ts — Multi-Persona Audio & Voice Synthesis Manager
//  Nugget Nihongo · Sensei Nugget & Senpai Aoi Speech Synthesis
// ══════════════════════════════════════════════════════════════════

import { SenseiPersona } from '../ai/senseiClient';

let jaVoices: SpeechSynthesisVoice[] = [];
let isVoicesReady = false;

function loadVoices(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const all = window.speechSynthesis.getVoices();
  jaVoices = all.filter((v) => v.lang.startsWith('ja') || v.lang === 'ja-JP');
  if (jaVoices.length > 0) isVoicesReady = true;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}

/**
 * Temukan voice audio yang sesuai untuk persona
 */
function getPersonaVoice(persona: SenseiPersona): SpeechSynthesisVoice | null {
  loadVoices();
  if (jaVoices.length === 0) return null;

  if (persona === 'sensei_nugget') {
    // Cari suara pria / default (seperti Ichiro, Keita, Hattori)
    const maleVoice = jaVoices.find(
      (v) =>
        v.name.toLowerCase().includes('male') ||
        v.name.toLowerCase().includes('ichiro') ||
        v.name.toLowerCase().includes('keita')
    );
    return maleVoice || jaVoices[0];
  } else {
    // Cari suara wanita (seperti Kyoko, Nanami, Ayumi, Haruka)
    const femaleVoice = jaVoices.find(
      (v) =>
        v.name.toLowerCase().includes('female') ||
        v.name.toLowerCase().includes('kyoko') ||
        v.name.toLowerCase().includes('nanami') ||
        v.name.toLowerCase().includes('ayumi')
    );
    return femaleVoice || jaVoices[0];
  }
}

/**
 * Filter teks agar hanya melafalkan bagian bahasa Jepang atau teks bersih
 */
export function extractJapaneseSpeechText(raw: string): string {
  // Hapus markdown formatting seperti bold, italic, code
  let clean = raw
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/🍵|🌸|✨|👍|👏/g, '')
    .trim();

  // Bersihkan bracket kurung furigana
  clean = clean
    .replace(/【[^】]*】/g, '')
    .replace(/〔[^〕]*〕/g, '')
    .replace(/（[^）]*）/g, '')
    .replace(/\([^)]*\)/g, '')
    .trim();

  return clean;
}

/**
 * Lafalkan ucapan Sensei / Senpai dengan karakteristik vokal unik
 */
export function speakPersona(
  text: string,
  persona: SenseiPersona = 'sensei_nugget',
  onEnd?: () => void
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  try {
    window.speechSynthesis.cancel();

    const clean = extractJapaneseSpeechText(text);
    if (!clean) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'ja-JP';

    const voice = getPersonaVoice(persona);
    if (voice) {
      utterance.voice = voice;
    }

    if (persona === 'sensei_nugget') {
      utterance.pitch = 0.95; // Sedikit lebih dalam, tegas
      utterance.rate = 0.9;   // Kecepatan stabil untuk kejelasan mora
    } else {
      utterance.pitch = 1.15; // Ramah, cerah
      utterance.rate = 0.95;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('[voiceManager] Error playing persona voice:', e);
    if (onEnd) onEnd();
  }
}

/**
 * Hentikan audio yang sedang diputar
 */
export function stopPersonaVoice(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}

/**
 * Convenient helper to pronounce standard Japanese text
 */
export function speakJapaneseText(text: string, onEnd?: () => void): void {
  speakPersona(text, 'sensei_nugget', onEnd);
}

/**
 * Play local pre-rendered audio asset if available, falling back seamlessly to voice synthesis
 */
export async function playAudioOrSynthesize(
  audioUrl: string | undefined,
  fallbackText: string,
  persona: SenseiPersona = 'sensei_nugget',
  onEnd?: () => void
): Promise<void> {
  if (typeof window === 'undefined') {
    if (onEnd) onEnd();
    return;
  }

  if (audioUrl) {
    try {
      const audio = new Audio(audioUrl);
      audio.onended = () => {
        if (onEnd) onEnd();
      };
      audio.onerror = () => {
        speakPersona(fallbackText, persona, onEnd);
      };
      await audio.play();
      return;
    } catch {
      speakPersona(fallbackText, persona, onEnd);
      return;
    }
  }

  speakPersona(fallbackText, persona, onEnd);
}

export const voiceManager = {
  speakPersona,
  stopPersonaVoice,
  extractJapaneseSpeechText,
  speakText: speakJapaneseText,
  playAudioOrSynthesize
};
