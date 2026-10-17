// ══════════════════════════════════════════════════════════════════
//  audioSlicer.ts — Client-Side Sentence Audio Slicer (Web Audio API)
//  Clips dialogue snippets into standard 16-bit PCM WAV for FSRS cards
// ══════════════════════════════════════════════════════════════════

/**
 * Encodes an AudioBuffer into a standard 16-bit linear PCM WAV Blob
 */
export function audioBufferToWav(buffer: AudioBuffer, totalFrames?: number): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const frames = totalFrames ?? buffer.length;
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = frames * blockAlign;
  const bufferSize = 44 + dataSize; // 44 byte RIFF header + raw PCM

  const arrayBuffer = new ArrayBuffer(bufferSize);
  const view = new DataView(arrayBuffer);

  // Write ASCII helper
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // RIFF Chunk Descriptor
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');

  // "fmt " Sub-chunk
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 = PCM)
  view.setUint16(22, numChannels, true); // NumChannels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, byteRate, true); // ByteRate
  view.setUint16(32, blockAlign, true); // BlockAlign
  view.setUint16(34, 16, true); // BitsPerSample

  // "data" Sub-chunk
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  // Interleave channels & write 16-bit PCM samples
  let offset = 44;
  for (let i = 0; i < frames; i++) {
    for (let channel = 0; channel < numChannels; channel++) {
      let sample = buffer.getChannelData(channel)[i];
      // Clamping sample between -1 and 1
      sample = Math.max(-1, Math.min(1, sample));
      // Convert float [-1.0, 1.0] to 16-bit signed integer [-32768, 32767]
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

/**
 * Extracts a time-bounded audio snippet from an existing audio Blob
 * @param audioBlob Raw source audio blob
 * @param startSec Start timestamp in seconds
 * @param endSec End timestamp in seconds
 * @returns Snippet as WAV Blob
 */
export async function sliceAudioSnippet(
  audioBlob: Blob,
  startSec: number,
  endSec: number
): Promise<Blob> {
  if (typeof window === 'undefined') {
    throw new Error('sliceAudioSnippet requires a browser window environment');
  }

  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) {
    throw new Error('Web Audio API is not supported in this environment');
  }

  const audioContext = new AudioContextClass();
  try {
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const sampleRate = audioBuffer.sampleRate;
    const clampedStart = Math.max(0, startSec);
    const clampedEnd = Math.min(audioBuffer.duration, Math.max(clampedStart, endSec));

    const startOffset = Math.floor(clampedStart * sampleRate);
    const endOffset = Math.floor(clampedEnd * sampleRate);
    const frameCount = Math.max(1, endOffset - startOffset);

    const slicedBuffer = audioContext.createBuffer(
      audioBuffer.numberOfChannels,
      frameCount,
      sampleRate
    );

    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
      const channelData = audioBuffer.getChannelData(channel);
      const slicedData = slicedBuffer.getChannelData(channel);
      slicedData.set(channelData.subarray(startOffset, endOffset));
    }

    return audioBufferToWav(slicedBuffer, frameCount);
  } finally {
    if (audioContext.state !== 'closed') {
      audioContext.close().catch(() => {});
    }
  }
}

/**
 * Fetches an audio URL and slices a snippet directly
 */
export async function fetchAndSliceAudio(
  url: string,
  startSec: number,
  endSec: number
): Promise<Blob> {
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Failed to fetch audio from ${url}: status ${resp.status}`);
  }
  const blob = await resp.blob();
  return sliceAudioSnippet(blob, startSec, endSec);
}
