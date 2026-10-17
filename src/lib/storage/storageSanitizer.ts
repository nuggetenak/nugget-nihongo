// ══════════════════════════════════════════════════════════════════
//  storageSanitizer.ts — Corrupted LocalStorage Self-Healing &
//  Schema Validation Quarantine Engine (Ticket T-214)
//  Guarantees zero infinite crash loops from corrupted JSON or invalid
//  schemas during state rehydration; auto-quarantines damaged keys.
// ══════════════════════════════════════════════════════════════════

import { FSRSCard } from '../../types/fsrs';
import { JLPTLevel } from '../../types/vocab';
import { diagnostics } from '../diagnostics/diagnostics';
import { APP_VERSION } from '../../config/version';

export interface CorruptedEntryRecord {
  originalKey: string;
  rawValue: string;
  reason: string;
  quarantinedAt: string;
  appVersion: string;
}

export interface SanitizedStreak {
  count: number;
  lastDate: string;
}

export interface SanitizedPlacementResult {
  timestamp: string;
  theta: number;
  sem: number;
  recommendedLevel: JLPTLevel;
  questionsAnswered: number;
  accuracy: number;
}

// Critical persistent keys that must NEVER be erased during emergency volatile cache flush
export const PROTECTED_STORAGE_KEYS = new Set([
  'nn_fsrs_cards',
  'nn_streak',
  'nn_xp',
  'nn_completed_lesson_ids',
  'nn_completed_lesson_xp_ids',
  'nugget_user_profile',
  'nn_cat_placement_history',
  'nn_garden_state',
  'nn_gamification_state',
  'nn_sound_effects',
  'nn_furigana',
  'nn_theme',
  'nn_substratum',
  'nn_daily_goal_xp',
]);

/**
 * Quarantines corrupted or malformed localStorage key into an isolated backup key
 * to ensure forensic inspectability while unblocking runtime execution.
 */
export function quarantineCorruptedKey(key: string, rawValue: string, reason: string): void {
  if (typeof localStorage === 'undefined') return;

  const quarantineKey = `nn_corrupted_${key}_${Date.now()}`;
  const record: CorruptedEntryRecord = {
    originalKey: key,
    rawValue,
    reason,
    quarantinedAt: new Date().toISOString(),
    appVersion: APP_VERSION,
  };

  try {
    localStorage.setItem(quarantineKey, JSON.stringify(record));
    localStorage.removeItem(key);
    console.warn(`[storageSanitizer] Quarantined corrupted key "${key}" to "${quarantineKey}". Reason: ${reason}`);
    diagnostics.addLog('storage', `Quarantined key "${key}": ${reason}`);
  } catch (err) {
    console.error(`[storageSanitizer] Failed to quarantine key "${key}":`, err);
  }
}

/**
 * Safely reads and parses a JSON entry from localStorage.
 * If JSON parsing fails or validation fails, quarantines the entry and returns the fallback.
 */
export function safeGetItem<T>(
  key: string,
  defaultValue: T,
  validator?: (val: unknown) => boolean
): T {
  if (typeof localStorage === 'undefined') return defaultValue;

  let raw: string | null = null;
  try {
    raw = localStorage.getItem(key);
  } catch (err) {
    console.warn(`[storageSanitizer] LocalStorage read access blocked for key "${key}":`, err);
    return defaultValue;
  }

  if (raw === null || raw.trim() === '') {
    return defaultValue;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (parseError) {
    quarantineCorruptedKey(key, raw, `JSON SyntaxError: ${(parseError as Error).message}`);
    return defaultValue;
  }

  if (validator && !validator(parsed)) {
    quarantineCorruptedKey(key, raw, 'Schema validation check failed');
    return defaultValue;
  }

  return parsed as T;
}

/**
 * Validates and sanitizes FSRS cards store.
 * Filters out individually corrupted card objects without discarding the student's entire deck.
 */
export function sanitizeFSRSCards(raw: unknown): Record<string, { card: FSRSCard; source?: string }> {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return {};
  }

  const validDeck: Record<string, { card: FSRSCard; source?: string }> = {};
  const entries = Object.entries(raw as Record<string, any>);

  for (const [cardId, entry] of entries) {
    if (!entry || typeof entry !== 'object' || !entry.card) {
      continue;
    }

    const c = entry.card;
    const isDueValid = typeof c.due === 'string' && !isNaN(new Date(c.due).getTime());
    const isStateValid = typeof c.state === 'number' && [0, 1, 2, 3].includes(c.state);
    const isStabilityValid = typeof c.stability === 'number' && !isNaN(c.stability) && c.stability >= 0;
    const isDifficultyValid = typeof c.difficulty === 'number' && !isNaN(c.difficulty) && c.difficulty >= 0;

    if (isDueValid && isStateValid && isStabilityValid && isDifficultyValid) {
      validDeck[cardId] = {
        card: {
          due: c.due,
          stability: c.stability,
          difficulty: c.difficulty,
          elapsed_days: typeof c.elapsed_days === 'number' ? c.elapsed_days : 0,
          scheduled_days: typeof c.scheduled_days === 'number' ? c.scheduled_days : 0,
          reps: typeof c.reps === 'number' ? c.reps : 0,
          lapses: typeof c.lapses === 'number' ? c.lapses : 0,
          state: c.state,
          last_review: typeof c.last_review === 'string' ? c.last_review : undefined,
        },
        source: typeof entry.source === 'string' ? entry.source : undefined,
      };
    } else {
      console.warn(`[storageSanitizer] Discarded invalid FSRS card "${cardId}":`, c);
    }
  }

  return validDeck;
}

/**
 * Validates and normalizes streak count and last activity date.
 */
export function sanitizeStreak(raw: unknown): SanitizedStreak {
  if (typeof raw === 'number' && !isNaN(raw)) {
    return { count: Math.max(0, Math.floor(raw)), lastDate: '' };
  }

  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    const obj = raw as Record<string, any>;
    const count = typeof obj.count === 'number' && !isNaN(obj.count) ? Math.max(0, Math.floor(obj.count)) : 0;
    const lastDate = typeof obj.lastDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(obj.lastDate) ? obj.lastDate : '';
    return { count, lastDate };
  }

  return { count: 0, lastDate: '' };
}

/**
 * Validates and clamps a numeric storage value.
 */
export function sanitizeNumber(
  raw: unknown,
  defaultVal: number,
  min = 0,
  max = Number.MAX_SAFE_INTEGER
): number {
  let num: number = defaultVal;

  if (typeof raw === 'number' && !isNaN(raw)) {
    num = raw;
  } else if (typeof raw === 'string') {
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) num = parsed;
  } else if (raw && typeof raw === 'object' && 'count' in (raw as any)) {
    const count = (raw as any).count;
    if (typeof count === 'number' && !isNaN(count)) num = count;
  }

  return Math.min(max, Math.max(min, num));
}

/**
 * Validates and dedupes an array of completed lesson IDs.
 */
export function sanitizeCompletedLessonIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const valid = raw.filter((id): id is string => typeof id === 'string' && id.trim().length > 0);
  return Array.from(new Set(valid));
}

/**
 * Validates CAT placement diagnostic history.
 */
export function sanitizePlacementHistory(raw: unknown): SanitizedPlacementResult[] {
  if (!Array.isArray(raw)) return [];

  const results: SanitizedPlacementResult[] = [];
  const validLevels = new Set<string>(['n5', 'n4', 'n3', 'n2', 'n1']);

  for (const item of raw) {
    if (
      item &&
      typeof item === 'object' &&
      typeof item.timestamp === 'string' &&
      typeof item.theta === 'number' &&
      !isNaN(item.theta) &&
      typeof item.sem === 'number' &&
      !isNaN(item.sem) &&
      typeof item.recommendedLevel === 'string' &&
      validLevels.has(item.recommendedLevel.toLowerCase())
    ) {
      results.push({
        timestamp: item.timestamp,
        theta: item.theta,
        sem: item.sem,
        recommendedLevel: item.recommendedLevel.toLowerCase() as JLPTLevel,
        questionsAnswered: typeof item.questionsAnswered === 'number' ? item.questionsAnswered : 10,
        accuracy: typeof item.accuracy === 'number' ? item.accuracy : 0.7,
      });
    }
  }

  return results;
}

/**
 * Action 3: Extracts all localStorage entries and packages them into an emergency JSON export.
 */
export function emergencyExportAllLocalStorage(): {
  filename: string;
  jsonString: string;
  count: number;
} {
  const exportPayload: Record<string, any> = {
    _meta: {
      appName: 'Nugget Nihongo',
      appVersion: APP_VERSION,
      exportedAt: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
    },
    storage: {},
  };

  let count = 0;
  if (typeof localStorage !== 'undefined') {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      const val = localStorage.getItem(key);
      if (val !== null) {
        try {
          exportPayload.storage[key] = JSON.parse(val);
        } catch {
          exportPayload.storage[key] = val;
        }
        count++;
      }
    }
  }

  const dateStr = new Date().toISOString().slice(0, 10);
  const filename = `nugget-nihongo-emergency-backup-${dateStr}.json`;
  const jsonString = JSON.stringify(exportPayload, null, 2);

  return { filename, jsonString, count };
}

/**
 * Action 4: Safely flushes volatile layout and cache keys while preserving all critical study data.
 */
export function emergencyResetVolatileCache(): {
  clearedCount: number;
  preservedCount: number;
} {
  let clearedCount = 0;
  let preservedCount = 0;

  if (typeof localStorage === 'undefined') {
    return { clearedCount, preservedCount };
  }

  const keysToRemove: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    // Never remove protected study keys or Supabase authentication tokens
    if (PROTECTED_STORAGE_KEYS.has(key) || key.startsWith('sb-') || key.startsWith('supabase.')) {
      preservedCount++;
      continue;
    }

    // Identify volatile cache keys
    if (
      key.startsWith('nn_') ||
      key.includes('cache') ||
      key.includes('queue') ||
      key.includes('buffer') ||
      key.includes('view') ||
      key.includes('tab')
    ) {
      keysToRemove.push(key);
    }
  }

  for (const k of keysToRemove) {
    try {
      localStorage.removeItem(k);
      clearedCount++;
    } catch (err) {
      console.warn(`[storageSanitizer] Failed to remove volatile key ${k}:`, err);
    }
  }

  diagnostics.addLog(
    'storage',
    `Emergency cache reset: cleared ${clearedCount} volatile keys, preserved ${preservedCount} critical keys`
  );

  return { clearedCount, preservedCount };
}
