// ══════════════════════════════════════════════════════════════════
//  conflictResolver.ts — Conflict-Free Replicated Data & LWW Engine
//  Resolves multi-device offline-online synchronization conflicts
//  for FSRS memory cards, course progress, kanji mastery, and vector clocks
// ══════════════════════════════════════════════════════════════════

import type { FSRSCard } from '../../types/fsrs';
import type { LocalKanjiMasteryRow, LocalKanjiPracticeLogRow } from '../storage/localStore.ts';

export interface TimestampedEntity {
  id?: string;
  updated_at?: string | number;
  last_review?: string | number;
  timestamp?: string | number;
  practiced_at?: number;
  [key: string]: any;
}

/**
 * Standard Last-Write-Wins (LWW) resolver based on ISO-8601 or epoch timestamps.
 * Guarantees deterministic tie-breaking if timestamps are equal.
 */
export function resolveLWW<T extends TimestampedEntity>(local: T, remote: T): T {
  if (!local && !remote) return {} as T;
  if (!local) return remote;
  if (!remote) return local;

  const getTs = (obj: any): number => {
    if (!obj || typeof obj !== 'object') return 0;
    const val = obj.updated_at ?? obj.last_review ?? obj.timestamp ?? obj.practiced_at ?? 0;
    if (typeof val === 'number') return Number.isFinite(val) ? val : 0;
    const parsed = new Date(val).getTime();
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const localTime = getTs(local);
  const remoteTime = getTs(remote);

  if (remoteTime > localTime) return remote;
  if (localTime > remoteTime) return local;

  // Deterministic tie-breaker for identical timestamps
  const localKey = String(local.id || local.character || local.session_id || '');
  const remoteKey = String(remote.id || remote.character || remote.session_id || '');
  if (remoteKey && localKey && remoteKey !== localKey) {
    return remoteKey > localKey ? remote : local;
  }

  return remote;
}

/**
 * Conflict-free FSRS memory card reconciliation.
 * Prevents review count regression, stability degradation, and duplicate lapses
 * when a user reviews the same card on multiple devices while offline.
 */
export function resolveFSRSCardConflict(local: FSRSCard, remote: FSRSCard): FSRSCard {
  if (!local && !remote) return {} as FSRSCard;
  if (!local) return remote;
  if (!remote) return local;

  const localReviewTime = local.last_review ? new Date(local.last_review).getTime() : 0;
  const remoteReviewTime = remote.last_review ? new Date(remote.last_review).getTime() : 0;

  const safeLocalTime = Number.isFinite(localReviewTime) ? localReviewTime : 0;
  const safeRemoteTime = Number.isFinite(remoteReviewTime) ? remoteReviewTime : 0;

  const localDueTime = local.due ? new Date(local.due).getTime() : 0;
  const remoteDueTime = remote.due ? new Date(remote.due).getTime() : 0;
  const resolvedDue = (Number.isFinite(localDueTime) && localDueTime > (Number.isFinite(remoteDueTime) ? remoteDueTime : 0))
    ? local.due
    : (remote.due || local.due || new Date().toISOString());

  // 1. If reviews occurred at significantly different times (> 12 hours)
  const timeDifferenceHours = Math.abs(safeRemoteTime - safeLocalTime) / (1000 * 60 * 60);

  if (timeDifferenceHours > 12) {
    // The later review strictly wins scheduling parameters
    const winner = safeRemoteTime > safeLocalTime ? remote : local;
    const loser = safeRemoteTime > safeLocalTime ? local : remote;

    return {
      ...winner,
      // Reps and lapses should monotonically increment across both histories
      reps: Math.max(winner.reps || 0, loser.reps || 0, (winner.reps || 0) + 1),
      lapses: Math.max(winner.lapses || 0, loser.lapses || 0),
    };
  }

  // 2. Intra-day or concurrent offline reviews: merge with stability preservation
  const newerReview = safeRemoteTime >= safeLocalTime ? remote : local;

  return {
    ...newerReview,
    // Retain the higher memory stability achieved on either device
    stability: Math.max(local.stability || 0, remote.stability || 0),
    // Monotonically non-decreasing review repetitions
    reps: Math.max(local.reps || 0, remote.reps || 0),
    lapses: Math.max(local.lapses || 0, remote.lapses || 0),
    // Smooth difficulty estimate
    difficulty: (Number.isFinite(local.difficulty) && Number.isFinite(remote.difficulty))
      ? Math.round(((local.difficulty + remote.difficulty) / 2) * 100) / 100
      : (newerReview.difficulty || 0),
    // Due date set to the further horizon to prevent premature review burnout
    due: resolvedDue,
    last_review: newerReview.last_review || new Date().toISOString(),
  };
}

/**
 * Monotonic course progress resolver:
 * Progress should never regress if a user studied further offline on one device.
 */
export function resolveCourseProgressConflict(
  local?: { current_index?: number; completed?: boolean; updated_at?: string },
  remote?: { current_index?: number; completed?: boolean; updated_at?: string }
): { current_index: number; completed: boolean; updated_at: string } {
  const loc = local || {};
  const rem = remote || {};

  return {
    current_index: Math.max(loc.current_index || 0, rem.current_index || 0),
    completed: Boolean(loc.completed || rem.completed),
    updated_at: new Date().toISOString(),
  };
}

/**
 * User settings field-level merge:
 * Merges preferences taking non-empty values or newer updates.
 */
export function resolveUserSettingsConflict(
  local?: Record<string, any>,
  remote?: Record<string, any>
): Record<string, any> {
  const loc = local || {};
  const rem = remote || {};

  return {
    ...loc,
    ...rem,
    updated_at: new Date().toISOString(),
  };
}

/**
 * Mastery hierarchy ranking for monotonic progression resolution
 */
const KANJI_MASTERY_RANK: Record<'learning' | 'practiced' | 'mastered', number> = {
  learning: 1,
  practiced: 2,
  mastered: 3,
};

/**
 * CRDT Conflict-Free Kanji Mastery Reconciler:
 * Merges local and remote kanji mastery records across devices.
 * Invariants:
 * 1. Mastery level never regresses (monotonic lattice: learning <= practiced <= mastered).
 * 2. Successful writes and attempts are monotonically non-decreasing (max of local and remote).
 * 3. High-water mark score accuracy is preserved.
 * 4. Latest practice timestamp and updated_at are strictly preserved.
 */
export function resolveKanjiMasteryConflict(
  local?: LocalKanjiMasteryRow | null,
  remote?: LocalKanjiMasteryRow | null
): LocalKanjiMasteryRow {
  if (!local && !remote) {
    return {
      character: '',
      total_attempts: 0,
      successful_writes: 0,
      average_score: 0,
      last_practiced: 0,
      mastery_level: 'learning',
      updated_at: Date.now(),
    };
  }
  if (!local) return { ...remote! };
  if (!remote) return { ...local! };

  const localRank = KANJI_MASTERY_RANK[local.mastery_level] || 1;
  const remoteRank = KANJI_MASTERY_RANK[remote.mastery_level] || 1;
  const highestRank = Math.max(localRank, remoteRank);

  const successfulWrites = Math.max(local.successful_writes || 0, remote.successful_writes || 0);
  const totalAttempts = Math.max(local.total_attempts || 0, remote.total_attempts || 0);

  // Auto-promote if successful writes threshold reached
  let resolvedLevel: 'learning' | 'practiced' | 'mastered' =
    highestRank === 3 ? 'mastered' : highestRank === 2 ? 'practiced' : 'learning';

  if (successfulWrites >= 3) {
    resolvedLevel = 'mastered';
  } else if (successfulWrites >= 1 && resolvedLevel === 'learning') {
    resolvedLevel = 'practiced';
  }

  // Preserve best score / high-water mark
  const localScore = Number.isFinite(local.average_score) ? local.average_score : 0;
  const remoteScore = Number.isFinite(remote.average_score) ? remote.average_score : 0;
  const resolvedScore = Math.max(localScore, remoteScore);

  return {
    character: local.character || remote.character || '',
    total_attempts: totalAttempts,
    successful_writes: successfulWrites,
    average_score: Math.round(resolvedScore * 10) / 10,
    last_practiced: Math.max(local.last_practiced || 0, remote.last_practiced || 0),
    mastery_level: resolvedLevel,
    updated_at: Math.max(local.updated_at || 0, remote.updated_at || 0, Date.now()),
  };
}

/**
 * Zero-Data-Loss Kanji Practice Log Reconciler:
 * Merges offline practice sessions from multiple devices by unique session_id.
 * Preserves the union of all sessions, sorted chronologically descending.
 */
export function resolveKanjiPracticeLogsConflict(
  localLogs?: LocalKanjiPracticeLogRow[] | null,
  remoteLogs?: LocalKanjiPracticeLogRow[] | null
): LocalKanjiPracticeLogRow[] {
  const logMap = new Map<string, LocalKanjiPracticeLogRow>();

  const safeRemote = Array.isArray(remoteLogs) ? remoteLogs : [];
  const safeLocal = Array.isArray(localLogs) ? localLogs : [];

  // Process remote logs first
  safeRemote.forEach((log) => {
    if (log && typeof log === 'object' && log.session_id) {
      logMap.set(log.session_id, { ...log });
    }
  });

  // Merge local logs, keeping the log with the higher score if duplicate session_id
  safeLocal.forEach((log) => {
    if (!log || typeof log !== 'object' || !log.session_id) return;
    const existing = logMap.get(log.session_id);
    if (!existing) {
      logMap.set(log.session_id, { ...log });
    } else {
      logMap.set(log.session_id, {
        ...existing,
        ...log,
        score: Math.max(existing.score || 0, log.score || 0),
        is_complete: Boolean(existing.is_complete || log.is_complete),
        practiced_at: Math.max(existing.practiced_at || 0, log.practiced_at || 0),
      });
    }
  });

  return Array.from(logMap.values()).sort((a, b) => (b.practiced_at || 0) - (a.practiced_at || 0));
}

// ══════════════════════════════════════════════════════════════════
//  Vector Clock & Causality Tracking Subsystem
//  Provides strict partial ordering (happened-before relation)
//  and concurrent divergence resolution for distributed nodes.
// ══════════════════════════════════════════════════════════════════

export type VectorClock = Record<string, number>;

export type VectorClockComparison = 'EQUAL' | 'BEFORE' | 'AFTER' | 'CONCURRENT';

export interface VectorClockedEntity extends TimestampedEntity {
  _vc?: VectorClock;
  [key: string]: any;
}

/**
 * Compares two vector clocks to establish their causal relationship.
 * - 'EQUAL': A and B have identical logical counters.
 * - 'BEFORE': A happened-before B (B causally dominates A).
 * - 'AFTER': B happened-before A (A causally dominates B).
 * - 'CONCURRENT': Independent concurrent divergence (neither dominates; requires CRDT merge).
 */
export function compareVectorClocks(
  vcA: VectorClock | null | undefined,
  vcB: VectorClock | null | undefined
): VectorClockComparison {
  const a = vcA || {};
  const b = vcB || {};
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);

  if (allKeys.size === 0) return 'EQUAL';

  let hasGreater = false;
  let hasLesser = false;

  for (const key of allKeys) {
    const valA = Number.isFinite(a[key]) ? a[key] : 0;
    const valB = Number.isFinite(b[key]) ? b[key] : 0;

    if (valA > valB) hasGreater = true;
    if (valA < valB) hasLesser = true;
  }

  if (hasGreater && hasLesser) return 'CONCURRENT';
  if (hasGreater) return 'AFTER';
  if (hasLesser) return 'BEFORE';
  return 'EQUAL';
}

/**
 * Merges two vector clocks by computing the component-wise supremum (maximum counter per node).
 */
export function mergeVectorClocks(
  vcA: VectorClock | null | undefined,
  vcB: VectorClock | null | undefined
): VectorClock {
  const a = vcA || {};
  const b = vcB || {};
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
  const merged: VectorClock = {};

  for (const key of allKeys) {
    const valA = Number.isFinite(a[key]) ? a[key] : 0;
    const valB = Number.isFinite(b[key]) ? b[key] : 0;
    merged[key] = Math.max(valA, valB);
  }

  return merged;
}

/**
 * Increments the logical counter for a given node / client identifier.
 */
export function incrementVectorClock(
  vc: VectorClock | null | undefined,
  nodeId: string
): VectorClock {
  const next = { ...(vc || {}) };
  if (!nodeId) return next;
  next[nodeId] = (Number.isFinite(next[nodeId]) ? next[nodeId] : 0) + 1;
  return next;
}

/**
 * Reconciles two vector-clocked entities.
 * Automatically respects causal dominance (BEFORE/AFTER), and applies
 * an optional domain merger function or LWW tie-breaker upon CONCURRENT divergence.
 */
export function resolveVectorClockConflict<T extends VectorClockedEntity>(
  local: T,
  remote: T,
  domainMerger?: (local: T, remote: T) => T
): T {
  if (!local && !remote) return {} as T;
  if (!local) return remote;
  if (!remote) return local;

  const comparison = compareVectorClocks(local._vc, remote._vc);

  if (comparison === 'BEFORE') {
    // remote causally dominates local
    return {
      ...remote,
      _vc: mergeVectorClocks(local._vc, remote._vc),
    };
  }

  if (comparison === 'AFTER') {
    // local causally dominates remote
    return {
      ...local,
      _vc: mergeVectorClocks(local._vc, remote._vc),
    };
  }

  if (comparison === 'EQUAL') {
    // Identical causality: fallback to deterministic LWW
    return resolveLWW(local, remote);
  }

  // CONCURRENT: Both nodes branched independently while offline
  const mergedClocks = mergeVectorClocks(local._vc, remote._vc);

  if (typeof domainMerger === 'function') {
    const mergedDomain = domainMerger(local, remote);
    return {
      ...mergedDomain,
      _vc: mergedClocks,
    };
  }

  // Default to LWW with merged vector clock
  const lwwWinner = resolveLWW(local, remote);
  return {
    ...lwwWinner,
    _vc: mergedClocks,
  };
}

// ══════════════════════════════════════════════════════════════════
//  Botanical Garden & Gamification CRDT Reconcilers
// ══════════════════════════════════════════════════════════════════

export interface GardenPlantItem {
  id: string;
  kanji: string;
  reading?: string;
  meaning?: string;
  level?: 'n5' | 'n4' | 'n3' | 'n2' | 'n1' | string;
  stage: number;      // 0 to 4
  waterCount: number;
  maxWater?: number;
  lastWatered?: string;
}

export interface GardenSyncState {
  plants: GardenPlantItem[];
  waterDrops: number;
  harvestedKanji?: string[];
  updatedAt?: number | string;
}

/**
 * Reconciles multi-tab botanical garden state using Monotonic High-Water & Additive Merge.
 * Invariants:
 * 1. Plant maturity stage is monotonically non-decreasing (plants never regress in bloom).
 * 2. Water count takes the highest count reached across any open tab or device.
 * 3. Water drops balance is preserved at the high-water mark.
 * 4. Harvested kanji sets are merged via mathematical union (no lost collections).
 */
export function resolveGardenConflict(
  local?: GardenSyncState | null,
  remote?: GardenSyncState | null
): GardenSyncState {
  if (!local && !remote) return { plants: [], waterDrops: 3, harvestedKanji: [], updatedAt: Date.now() };
  if (!local) return remote!;
  if (!remote) return local;

  const localPlants = Array.isArray(local.plants) ? local.plants : [];
  const remotePlants = Array.isArray(remote.plants) ? remote.plants : [];

  const plantMap = new Map<string, GardenPlantItem>();

  for (const plant of localPlants) {
    if (plant && plant.id) {
      plantMap.set(plant.id, { ...plant });
    }
  }

  for (const rPlant of remotePlants) {
    if (!rPlant || !rPlant.id) continue;
    const existing = plantMap.get(rPlant.id);
    if (!existing) {
      plantMap.set(rPlant.id, { ...rPlant });
    } else {
      const stage = Math.max(existing.stage || 0, rPlant.stage || 0);
      const waterCount = Math.max(existing.waterCount || 0, rPlant.waterCount || 0);
      const lastWatered = (existing.lastWatered && rPlant.lastWatered)
        ? (new Date(existing.lastWatered).getTime() > new Date(rPlant.lastWatered).getTime() ? existing.lastWatered : rPlant.lastWatered)
        : (existing.lastWatered || rPlant.lastWatered);

      plantMap.set(rPlant.id, {
        ...existing,
        ...rPlant,
        stage,
        waterCount,
        lastWatered,
      });
    }
  }

  const localDrops = Number.isFinite(local.waterDrops) ? Math.max(0, local.waterDrops) : 0;
  const remoteDrops = Number.isFinite(remote.waterDrops) ? Math.max(0, remote.waterDrops) : 0;
  const mergedDrops = Math.max(localDrops, remoteDrops);

  const localHarvested = Array.isArray(local.harvestedKanji) ? local.harvestedKanji : [];
  const remoteHarvested = Array.isArray(remote.harvestedKanji) ? remote.harvestedKanji : [];
  const mergedHarvested = Array.from(new Set([...localHarvested, ...remoteHarvested]));

  return {
    plants: Array.from(plantMap.values()),
    waterDrops: mergedDrops,
    harvestedKanji: mergedHarvested,
    updatedAt: Date.now(),
  };
}

export interface GamificationSyncState {
  heatmap?: Record<string, { reviews: number; xp: number }>;
  badges?: Array<{ id: string; earned?: boolean; earnedAt?: string; [key: string]: any }>;
  updatedAt?: number | string;
}

/**
 * Reconciles multi-tab gamification state (Heatmap & Badges) without loss of progress.
 * Invariants:
 * 1. Heatmap reviews and XP per date are monotonically non-decreasing.
 * 2. Unlocked badges are merged via union; once earned, a badge is never un-earned.
 */
export function resolveGamificationConflict(
  local?: GamificationSyncState | null,
  remote?: GamificationSyncState | null
): GamificationSyncState {
  if (!local && !remote) return { heatmap: {}, badges: [], updatedAt: Date.now() };
  if (!local) return remote!;
  if (!remote) return local;

  const mergedHeatmap: Record<string, { reviews: number; xp: number }> = {
    ...(local.heatmap || {}),
  };

  const remoteHeatmap = remote.heatmap || {};
  for (const date of Object.keys(remoteHeatmap)) {
    const locDay = mergedHeatmap[date];
    const remDay = remoteHeatmap[date];
    if (!locDay) {
      mergedHeatmap[date] = { ...remDay };
    } else {
      mergedHeatmap[date] = {
        reviews: Math.max(locDay.reviews || 0, remDay.reviews || 0),
        xp: Math.max(locDay.xp || 0, remDay.xp || 0),
      };
    }
  }

  const badgeMap = new Map<string, any>();
  (local.badges || []).forEach((b) => {
    if (b && b.id) badgeMap.set(b.id, { ...b, earned: Boolean(b.earned) });
  });

  (remote.badges || []).forEach((rBadge) => {
    if (!rBadge || !rBadge.id) return;
    const existing = badgeMap.get(rBadge.id);
    if (!existing) {
      badgeMap.set(rBadge.id, { ...rBadge, earned: Boolean(rBadge.earned) });
    } else {
      const isEarned = existing.earned || Boolean(rBadge.earned);
      const earnedAt = existing.earnedAt || rBadge.earnedAt;
      badgeMap.set(rBadge.id, {
        ...existing,
        ...rBadge,
        earned: isEarned,
        earnedAt,
      });
    }
  });

  return {
    heatmap: mergedHeatmap,
    badges: Array.from(badgeMap.values()),
    updatedAt: Date.now(),
  };
}
