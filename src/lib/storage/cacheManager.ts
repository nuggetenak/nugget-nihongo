// ══════════════════════════════════════════════════════════════════
//  cacheManager.ts — PWA Cache Storage Quota & LRU Eviction Manager
//  Monitors client storage limits to prevent iOS/Android PWA evictions
// ══════════════════════════════════════════════════════════════════

export interface StorageQuotaStats {
  usageMB: number;
  quotaMB: number;
  percentUsed: number;
  availableMB: number;
  isSupported: boolean;
}

class CacheManagerService {
  /**
   * Retrieves current device storage quota and usage estimates.
   */
  public async getStorageQuotaStats(): Promise<StorageQuotaStats> {
    if (typeof navigator === 'undefined' || !navigator.storage || !navigator.storage.estimate) {
      return {
        usageMB: 0,
        quotaMB: 0,
        percentUsed: 0,
        availableMB: 0,
        isSupported: false,
      };
    }

    try {
      const estimate = await navigator.storage.estimate();
      const usage = estimate.usage || 0;
      const quota = estimate.quota || 0;

      const usageMB = Math.round((usage / (1024 * 1024)) * 10) / 10;
      const quotaMB = Math.round((quota / (1024 * 1024)) * 10) / 10;
      const percentUsed = quota > 0 ? Math.round((usage / quota) * 100) : 0;
      const availableMB = Math.max(0, Math.round(((quota - usage) / (1024 * 1024)) * 10) / 10);

      return {
        usageMB,
        quotaMB,
        percentUsed,
        availableMB,
        isSupported: true,
      };
    } catch (err) {
      console.warn('[cacheManager] Failed to estimate storage quota:', err);
      return {
        usageMB: 0,
        quotaMB: 0,
        percentUsed: 0,
        availableMB: 0,
        isSupported: false,
      };
    }
  }

  /**
   * Evicts the oldest items in CacheStorage to alleviate browser storage pressure.
   */
  public async evictOldestCache(cacheName?: string, maxItems = 20): Promise<number> {
    if (typeof caches === 'undefined') return 0;

    let evictedCount = 0;
    try {
      const targetCacheName = cacheName || (await caches.keys())[0];
      if (!targetCacheName) return 0;

      const cache = await caches.open(targetCacheName);
      const requests = await cache.keys();

      // Filter out core essential assets that must never be evicted
      const nonEssentialRequests = requests.filter((req) => {
        const url = req.url;
        return (
          !url.endsWith('/index.html') &&
          !url.endsWith('/manifest.json') &&
          !url.endsWith('/manifest.webmanifest') &&
          !url.includes('/icons/') &&
          !url.includes('/fonts/')
        );
      });

      const toDelete = nonEssentialRequests.slice(0, maxItems);
      for (const req of toDelete) {
        const deleted = await cache.delete(req);
        if (deleted) evictedCount++;
      }
    } catch (err) {
      console.warn('[cacheManager] Cache eviction notice:', err);
    }

    return evictedCount;
  }

  /**
   * Cleans all PWA caches completely for factory resets.
   */
  public async clearAllCaches(): Promise<boolean> {
    if (typeof caches === 'undefined') return false;
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks whether storage is critically low (>85% used or <50MB remaining).
   */
  public async isStorageLow(): Promise<boolean> {
    const stats = await this.getStorageQuotaStats();
    if (!stats.isSupported) return false;
    return stats.percentUsed >= 85 || (stats.quotaMB > 0 && stats.availableMB < 50);
  }
}

export const cacheManager = new CacheManagerService();
