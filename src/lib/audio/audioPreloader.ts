// ══════════════════════════════════════════════════════════════════
//  audioPreloader.ts — Predictive Audio Chunk & Dialogue Preloader
//  Eliminates playback latency in Choukai drills & dialogue stages
// ══════════════════════════════════════════════════════════════════

import { resolveOptimalAudioUrl, configureAudioElement } from './audioCodecResolver';

export interface PreloadOptions {
  rate?: number;
  priority?: 'high' | 'low';
}

class AudioPreloaderService {
  private pool: Map<string, HTMLAudioElement> = new Map();
  private maxPoolSize: number = 12;

  /**
   * Preloads an array of audio URLs in sequence or parallel
   */
  public async preload(urls: string | string[], options?: PreloadOptions): Promise<void> {
    const list = Array.isArray(urls) ? urls : [urls];
    if (typeof window === 'undefined' || typeof Audio === 'undefined') return;

    for (const rawUrl of list) {
      if (!rawUrl || typeof rawUrl !== 'string') continue;
      const targetUrl = resolveOptimalAudioUrl(rawUrl);

      // Skip if already in memory
      if (this.pool.has(targetUrl)) continue;

      try {
        await this.loadSingleAudio(targetUrl, options?.rate || 1.0);
      } catch (err) {
        // Non-blocking catch to ensure subsequent clips continue preloading
        console.warn(`[audioPreloader] Non-critical preload failure for ${targetUrl}:`, err);
      }
    }
  }

  private loadSingleAudio(url: string, rate: number): Promise<HTMLAudioElement> {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.preload = 'auto';
      configureAudioElement(audio, rate);

      const onCanPlay = () => {
        cleanup();
        this.addToPool(url, audio);
        resolve(audio);
      };

      const onError = () => {
        cleanup();
        reject(new Error(`Failed to preload audio: ${url}`));
      };

      const cleanup = () => {
        audio.removeEventListener('canplaythrough', onCanPlay);
        audio.removeEventListener('error', onError);
      };

      audio.addEventListener('canplaythrough', onCanPlay, { once: true });
      audio.addEventListener('error', onError, { once: true });
      audio.src = url;
      audio.load();
    });
  }

  private addToPool(url: string, audio: HTMLAudioElement): void {
    if (this.pool.size >= this.maxPoolSize) {
      // Evict oldest entry (LRU key from iterator)
      const oldestKey = this.pool.keys().next().value;
      if (oldestKey) {
        const oldAudio = this.pool.get(oldestKey);
        if (oldAudio) {
          oldAudio.src = '';
          oldAudio.load();
        }
        this.pool.delete(oldestKey);
      }
    }
    this.pool.set(url, audio);
  }

  /**
   * Retrieves a preloaded audio element if available
   */
  public getPreloadedAudio(rawUrl: string): HTMLAudioElement | null {
    const targetUrl = resolveOptimalAudioUrl(rawUrl);
    const audio = this.pool.get(targetUrl);
    if (!audio) return null;

    // Refresh LRU order: delete and re-insert
    this.pool.delete(targetUrl);
    this.pool.set(targetUrl, audio);
    return audio;
  }

  public isPreloaded(rawUrl: string): boolean {
    const targetUrl = resolveOptimalAudioUrl(rawUrl);
    return this.pool.has(targetUrl);
  }

  public getPoolSize(): number {
    return this.pool.size;
  }

  public clearPool(): void {
    this.pool.forEach((audio) => {
      try {
        audio.src = '';
        audio.load();
      } catch {}
    });
    this.pool.clear();
  }
}

export const audioPreloader = new AudioPreloaderService();
