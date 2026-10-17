// ══════════════════════════════════════════════════════════════════
//  audioCodecResolver.ts — Transparent Audio Codec & Pitch Preservation
//  Auto-detects Opus / WebM / MP3 browser support and normalizes pitch
// ══════════════════════════════════════════════════════════════════

export interface CodecSupportMatrix {
  opusOgg: boolean;
  opusWebm: boolean;
  mp3: boolean;
  aac: boolean;
  wav: boolean;
}

let cachedMatrix: CodecSupportMatrix | null = null;

/**
 * Detects browser audio codec capabilities using HTMLAudioElement.canPlayType
 */
export function detectSupportedAudioCodecs(): CodecSupportMatrix {
  if (cachedMatrix) return cachedMatrix;

  if (typeof window === 'undefined' || typeof Audio === 'undefined') {
    cachedMatrix = {
      opusOgg: true,
      opusWebm: true,
      mp3: true,
      aac: true,
      wav: true,
    };
    return cachedMatrix;
  }

  try {
    const probe = new Audio();
    const canPlay = (mime: string): boolean => {
      const res = probe.canPlayType(mime);
      return res === 'probably' || res === 'maybe';
    };

    cachedMatrix = {
      opusOgg: canPlay('audio/ogg; codecs="opus"'),
      opusWebm: canPlay('audio/webm; codecs="opus"'),
      mp3: canPlay('audio/mpeg') || canPlay('audio/mp3'),
      aac: canPlay('audio/mp4; codecs="mp4a.40.2"'),
      wav: canPlay('audio/wav'),
    };
  } catch {
    cachedMatrix = {
      opusOgg: false,
      opusWebm: false,
      mp3: true,
      aac: true,
      wav: true,
    };
  }

  return cachedMatrix;
}

/**
 * Resolves the optimal audio asset URL based on client device capability
 * Prefers Opus (.opus/.webm) for 50%+ asset compression, with automatic fallback to MP3
 */
export function resolveOptimalAudioUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  const matrix = detectSupportedAudioCodecs();

  // If already full URL or specific format
  if (!url.endsWith('.mp3') && !url.endsWith('.opus') && !url.endsWith('.webm')) {
    // Extensionless base URL: append best extension
    if (matrix.opusOgg) return `${url}.opus`;
    if (matrix.opusWebm) return `${url}.webm`;
    return `${url}.mp3`;
  }

  // If url requests .opus but browser cannot play Opus, fallback to .mp3
  if (url.endsWith('.opus') && !matrix.opusOgg) {
    if (matrix.opusWebm) return url.replace(/\.opus$/, '.webm');
    return url.replace(/\.opus$/, '.mp3');
  }

  return url;
}

/**
 * Normalizes an HTMLAudioElement playback rate while preserving natural pitch
 * (Eliminates chipmunk / slow-demon distortion when studying at 0.75x or 1.25x)
 */
export function configureAudioElement(audio: HTMLAudioElement, rate: number = 1.0): void {
  if (!audio) return;

  const clampedRate = Math.min(2.0, Math.max(0.5, rate));
  audio.playbackRate = clampedRate;

  // Standard WCAG & W3C pitch preservation
  audio.preservesPitch = true;

  // Webkit / Gecko legacy fallbacks
  const anyAudio = audio as any;
  if ('webkitPreservesPitch' in anyAudio) {
    anyAudio.webkitPreservesPitch = true;
  }
  if ('mozPreservesPitch' in anyAudio) {
    anyAudio.mozPreservesPitch = true;
  }
}
