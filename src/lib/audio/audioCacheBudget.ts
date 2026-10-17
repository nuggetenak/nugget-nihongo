// ══════════════════════════════════════════════════════════════════
//  audioCacheBudget.ts — Audio Storage Quota & LRU Eviction Engine
//  Prevents mobile storage quota overflows with bounded cache ceilings
// ══════════════════════════════════════════════════════════════════

export interface AudioCacheEntry {
  url: string;
  sizeBytes: number;
  lastAccessed: number;
  createdAt: number;
}

export interface AudioCacheBudgetConfig {
  maxBytes: number; // Default 50MB
  maxEntries: number; // Default 100 clips
  cacheName: string;
}

const DEFAULT_CONFIG: AudioCacheBudgetConfig = {
  maxBytes: 50 * 1024 * 1024, // 50 MB
  maxEntries: 100,
  cacheName: 'nn_audio_cache_v1',
};

const STORAGE_INDEX_KEY = 'nn_audio_cache_index';

class AudioCacheBudgetManager {
  private config: AudioCacheBudgetConfig;
  private entries: Map<string, AudioCacheEntry> = new Map();

  constructor(config: Partial<AudioCacheBudgetConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.loadIndex();
  }

  private loadIndex(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_INDEX_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          parsed.forEach((item: AudioCacheEntry) => {
            if (item && item.url) {
              this.entries.set(item.url, item);
            }
          });
        }
      }
    } catch {
      this.entries.clear();
    }
  }

  private persistIndex(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const array = Array.from(this.entries.values());
      localStorage.setItem(STORAGE_INDEX_KEY, JSON.stringify(array));
    } catch (err) {
      console.warn('[audioCacheBudget] Failed to persist audio index:', err);
    }
  }

  /**
   * Records access to an audio URL, creating or updating its LRU timestamp and size
   */
  public recordAudioAccess(url: string, estimatedSize: number = 250_000): void {
    if (!url) return;
    const now = Date.now();
    const existing = this.entries.get(url);

    if (existing) {
      existing.lastAccessed = now;
      if (estimatedSize > 0) existing.sizeBytes = estimatedSize;
    } else {
      this.entries.set(url, {
        url,
        sizeBytes: estimatedSize,
        lastAccessed: now,
        createdAt: now,
      });
    }

    this.persistIndex();
  }

  /**
   * Enforces the storage quota by evicting least-recently-used audio entries
   * returns the number of evicted items
   */
  public async enforceBudget(): Promise<number> {
    const usage = this.getAudioCacheUsage();
    if (usage.totalBytes <= this.config.maxBytes && this.entries.size <= this.config.maxEntries) {
      return 0;
    }

    // Sort entries by lastAccessed ascending (oldest first)
    const sorted = Array.from(this.entries.values()).sort(
      (a, b) => a.lastAccessed - b.lastAccessed
    );

    let evictedCount = 0;
    let currentBytes = usage.totalBytes;
    let currentCount = this.entries.size;

    let cache: Cache | null = null;
    if (typeof caches !== 'undefined') {
      try {
        cache = await caches.open(this.config.cacheName);
      } catch {}
    }

    for (const entry of sorted) {
      if (currentBytes <= this.config.maxBytes * 0.85 && currentCount <= this.config.maxEntries * 0.85) {
        break; // Reached safe headroom (85% of ceiling)
      }

      // Delete from CacheStorage if present
      if (cache) {
        try {
          await cache.delete(entry.url);
        } catch {}
      }

      this.entries.delete(entry.url);
      currentBytes -= entry.sizeBytes;
      currentCount--;
      evictedCount++;
    }

    this.persistIndex();
    return evictedCount;
  }

  public getAudioCacheUsage(): {
    count: number;
    totalBytes: number;
    budgetBytes: number;
    percentUsed: number;
  } {
    let totalBytes = 0;
    this.entries.forEach((e) => {
      totalBytes += e.sizeBytes;
    });

    const percentUsed = Math.min(
      100,
      Math.round((totalBytes / this.config.maxBytes) * 100)
    );

    return {
      count: this.entries.size,
      totalBytes,
      budgetBytes: this.config.maxBytes,
      percentUsed,
    };
  }

  public async clearAudioCache(): Promise<void> {
    if (typeof caches !== 'undefined') {
      try {
        await caches.delete(this.config.cacheName);
      } catch {}
    }
    this.entries.clear();
    this.persistIndex();
  }
}

export const audioCacheBudget = new AudioCacheBudgetManager();
