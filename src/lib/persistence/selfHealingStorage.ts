// ══════════════════════════════════════════════════════════════════
//  selfHealingStorage.ts — Storage Corruption Detection & Auto-Recovery
//  Protects UI from syntax errors caused by corrupted localStorage values
// ══════════════════════════════════════════════════════════════════

import { errorReporter } from '../telemetry/errorReporter.ts';
import { storageBridge } from './storageBridge.ts';
import { cacheManager } from '../storage/cacheManager.ts';

export interface StorageAuditResult {
  healthy: boolean;
  totalKeysChecked: number;
  corruptedKeys: string[];
  repairedKeys: string[];
}

/**
 * Checks whether an error is a browser storage quota exceeded error.
 */
export function isQuotaExceededError(err: any): boolean {
  if (!err) return false;
  return (
    (typeof DOMException !== 'undefined' && err instanceof DOMException && (err.code === 22 || err.code === 1014 || err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED')) ||
    err.name === 'QuotaExceededError' ||
    err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
    err.code === 22 ||
    err.code === 1014
  );
}

/**
 * Prunes non-essential transient cache entries and telemetry queues to relieve storage pressure.
 */
export function pruneEphemeralStorage(): number {
  if (typeof window === 'undefined' || !window.localStorage) return 0;
  let prunedCount = 0;
  const ephemeralKeys = [
    'nn_telemetry_queue',
    'nn_recent_searches',
    'nn_audio_cache_meta',
    'nn_debug_logs',
    'nn_temp_session',
  ];

  try {
    for (const key of ephemeralKeys) {
      if (localStorage.getItem(key) !== null) {
        localStorage.removeItem(key);
        prunedCount++;
      }
    }
    // Also trigger cacheManager non-essential asset eviction
    cacheManager.evictOldestCache(undefined, 20).catch(() => {});
  } catch {}

  return prunedCount;
}

/**
 * Safely parses JSON strings with automatic fallback and self-healing storage repair.
 */
export function safeJsonParse<T>(raw: string | null, fallback: T, keyName?: string): T {
  if (raw === null || raw === undefined || raw === '') {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[selfHealingStorage] Corrupted JSON detected for key "${keyName || 'unknown'}":`, err);

    // Report corruption telemetry
    errorReporter.captureException(err, {
      context: 'selfHealingStorage.safeJsonParse',
      corruptedKey: keyName,
      rawSnippet: typeof raw === 'string' ? raw.slice(0, 100) : '',
    });

    // Auto-heal by restoring fallback default into storage
    if (keyName && typeof window !== 'undefined') {
      try {
        localStorage.setItem(keyName, JSON.stringify(fallback));
        console.info(`[selfHealingStorage] Successfully repaired key "${keyName}" with safe fallback default.`);
      } catch (writeErr) {
        console.error(`[selfHealingStorage] Failed to rewrite repaired key "${keyName}":`, writeErr);
      }
    }

    return fallback;
  }
}

/**
 * Safely retrieves and parses a typed item from localStorage.
 */
export function safeGetItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return safeJsonParse<T>(raw, fallback, key);
  } catch {
    return fallback;
  }
}

/**
 * Safely writes an item to localStorage with 2-stage quota-exceeded mitigation
 * and automatic IndexedDB spillover.
 */
export function safeSetItem<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (err: any) {
    if (isQuotaExceededError(err)) {
      console.warn(`[selfHealingStorage] QuotaExceededError detected writing "${key}". Executing emergency prune...`);
      // Stage 1: Prune transient ephemeral keys
      pruneEphemeralStorage();
      try {
        const retrySerialized = JSON.stringify(value);
        localStorage.setItem(key, retrySerialized);
        console.info(`[selfHealingStorage] Successfully wrote "${key}" after pruning ephemeral keys.`);
        return true;
      } catch (retryErr) {
        console.error(`[selfHealingStorage] Hard quota limit reached. Spilling "${key}" to IndexedDB...`, retryErr);
        // Stage 2: Emergency spill to IndexedDB
        storageBridge.setItem('emergency_spill', key, value).catch(() => {});
        // Notify user via modal if available
        try {
          import('../../store/useModalStore.ts').then(({ useModalStore }) => {
            useModalStore.getState().openModal('storageEviction');
          }).catch(() => {});
        } catch {}
      }
    }

    console.error(`[selfHealingStorage] Failed to write key "${key}":`, err);
    errorReporter.captureException(err, { context: 'selfHealingStorage.safeSetItem', key });
    return false;
  }
}

/**
 * Audits all application keys in localStorage for syntax and integrity issues.
 */
export function auditStorageHealth(): StorageAuditResult {
  const result: StorageAuditResult = {
    healthy: true,
    totalKeysChecked: 0,
    corruptedKeys: [],
    repairedKeys: [],
  };

  if (typeof window === 'undefined') return result;

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('nn_') || key.startsWith('bunpou_'))) {
        result.totalKeysChecked++;
        const raw = localStorage.getItem(key);
        if (raw) {
          try {
            JSON.parse(raw);
          } catch {
            result.healthy = false;
            result.corruptedKeys.push(key);
          }
        }
      }
    }
  } catch (err) {
    console.warn('[selfHealingStorage] Storage audit failed:', err);
  }

  return result;
}

/**
 * Requests persistent storage from the browser to protect against Safari 7-day ITP
 * and automatic Android OS eviction.
 */
export async function requestPersistentStorage(): Promise<{ supported: boolean; persisted: boolean }> {
  if (typeof navigator === 'undefined' || !navigator.storage || !navigator.storage.persist) {
    return { supported: false, persisted: false };
  }

  try {
    let isPersisted = false;
    if (navigator.storage.persisted) {
      isPersisted = await navigator.storage.persisted();
    }
    if (!isPersisted) {
      isPersisted = await navigator.storage.persist();
      if (isPersisted) {
        console.info('[selfHealingStorage] Persistent storage granted by browser.');
      }
    }
    return { supported: true, persisted: isPersisted };
  } catch (err) {
    console.warn('[selfHealingStorage] Persistent storage request error:', err);
    return { supported: true, persisted: false };
  }
}

/**
 * Estimates storage usage and quota in MB.
 */
export async function getStorageQuotaEstimate(): Promise<{
  usageMb: number;
  quotaMb: number;
  percentUsed: number;
  isPressureHigh: boolean;
}> {
  if (typeof navigator === 'undefined' || !navigator.storage || !navigator.storage.estimate) {
    return { usageMb: 0, quotaMb: 0, percentUsed: 0, isPressureHigh: false };
  }

  try {
    const est = await navigator.storage.estimate();
    const usage = est.usage || 0;
    const quota = est.quota || 0;
    const usageMb = Math.round((usage / (1024 * 1024)) * 10) / 10;
    const quotaMb = Math.round((quota / (1024 * 1024)) * 10) / 10;
    const percentUsed = quota > 0 ? Math.round((usage / quota) * 100) : 0;
    const isPressureHigh = percentUsed >= 80 || (quotaMb > 0 && quotaMb - usageMb < 50);

    return { usageMb, quotaMb, percentUsed, isPressureHigh };
  } catch {
    return { usageMb: 0, quotaMb: 0, percentUsed: 0, isPressureHigh: false };
  }
}

/**
 * Creates an automatic snapshot of all critical application state in IndexedDB.
 */
export async function createAutoSnapshot(): Promise<boolean> {
  if (typeof window === 'undefined' || !window.localStorage) return false;
  try {
    const payload: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('nn_') || k.startsWith('bunpou_'))) {
        payload[k] = localStorage.getItem(k);
      }
    }
    if (Object.keys(payload).length > 0) {
      return await storageBridge.saveSnapshot('latest', payload);
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Detects whether localStorage was wiped by browser eviction (Safari 7-day ITP)
 * and automatically recovers state from the latest IndexedDB snapshot.
 */
export async function detectEvictionAndAutoRecover(): Promise<{
  evicted: boolean;
  recovered: boolean;
  restoredKeys: number;
}> {
  if (typeof window === 'undefined' || !window.localStorage) {
    return { evicted: false, recovered: false, restoredKeys: 0 };
  }

  try {
    const hasCards = Boolean(localStorage.getItem('nn_fsrs_cards') || localStorage.getItem('nn_cards'));
    const hasProgress = Boolean(localStorage.getItem('nn_curriculum_progress_v2') || localStorage.getItem('nn_xp'));

    // If local storage is empty of cards and progress, check if IndexedDB has a snapshot
    if (!hasCards && !hasProgress) {
      const snapshot = await storageBridge.getLatestSnapshot();
      if (snapshot && snapshot.data && Object.keys(snapshot.data).length > 0) {
        console.warn('[selfHealingStorage] Storage eviction detected! Auto-recovering from IndexedDB snapshot...');
        const res = await storageBridge.restoreSnapshot('latest');
        return { evicted: true, recovered: res.success, restoredKeys: res.restoredKeys };
      }
    }
    return { evicted: false, recovered: false, restoredKeys: 0 };
  } catch (err) {
    console.error('[selfHealingStorage] Eviction recovery failed:', err);
    return { evicted: false, recovered: false, restoredKeys: 0 };
  }
}
