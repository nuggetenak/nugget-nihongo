// ══════════════════════════════════════════════════════════════════
//  selfHealingStorage.ts — Storage Corruption Detection & Auto-Recovery
//  Protects UI from syntax errors caused by corrupted localStorage values
// ══════════════════════════════════════════════════════════════════

import { errorReporter } from '../telemetry/errorReporter';

export interface StorageAuditResult {
  healthy: boolean;
  totalKeysChecked: number;
  corruptedKeys: string[];
  repairedKeys: string[];
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
 * Safely writes an item to localStorage with quota-exceeded mitigation.
 */
export function safeSetItem<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (err) {
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
