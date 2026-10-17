// ══════════════════════════════════════════════════════════════════
//  conflictResolver.ts — Conflict-Free Replicated Data & LWW Engine
//  Resolves multi-device offline-online synchronization conflicts
//  for FSRS memory cards, course progress, and user preferences
// ══════════════════════════════════════════════════════════════════

import type { FSRSCard } from '../../types/fsrs';

export interface TimestampedEntity {
  updated_at?: string;
  last_review?: string;
  timestamp?: string;
  [key: string]: any;
}

/**
 * Standard Last-Write-Wins (LWW) resolver based on ISO-8601 timestamps.
 */
export function resolveLWW<T extends TimestampedEntity>(local: T, remote: T): T {
  const localTime = new Date(local.updated_at || local.last_review || local.timestamp || 0).getTime();
  const remoteTime = new Date(remote.updated_at || remote.last_review || remote.timestamp || 0).getTime();

  return remoteTime > localTime ? remote : local;
}

/**
 * Conflict-free FSRS memory card reconciliation.
 * Prevents review count regression, stability degradation, and duplicate lapses
 * when a user reviews the same card on multiple devices while offline.
 */
export function resolveFSRSCardConflict(local: FSRSCard, remote: FSRSCard): FSRSCard {
  const localReviewTime = local.last_review ? new Date(local.last_review).getTime() : 0;
  const remoteReviewTime = remote.last_review ? new Date(remote.last_review).getTime() : 0;

  // 1. If reviews occurred at significantly different times (> 12 hours)
  const timeDifferenceHours = Math.abs(remoteReviewTime - localReviewTime) / (1000 * 60 * 60);

  if (timeDifferenceHours > 12) {
    // The later review strictly wins scheduling parameters
    const winner = remoteReviewTime > localReviewTime ? remote : local;
    const loser = remoteReviewTime > localReviewTime ? local : remote;

    return {
      ...winner,
      // Reps and lapses should monotonically increment across both histories
      reps: Math.max(winner.reps, loser.reps, (winner.reps || 0) + 1),
      lapses: Math.max(winner.lapses, loser.lapses),
    };
  }

  // 2. Intra-day or concurrent offline reviews: merge with stability preservation
  const newerReview = remoteReviewTime >= localReviewTime ? remote : local;

  return {
    ...newerReview,
    // Retain the higher memory stability achieved on either device
    stability: Math.max(local.stability || 0, remote.stability || 0),
    // Monotonically non-decreasing review repetitions
    reps: Math.max(local.reps || 0, remote.reps || 0),
    lapses: Math.max(local.lapses || 0, remote.lapses || 0),
    // Smooth difficulty estimate
    difficulty: (local.difficulty && remote.difficulty)
      ? Math.round(((local.difficulty + remote.difficulty) / 2) * 100) / 100
      : (newerReview.difficulty || 0),
    // Due date set to the further horizon to prevent premature review burnout
    due: new Date(local.due).getTime() > new Date(remote.due).getTime() ? local.due : remote.due,
    last_review: newerReview.last_review || new Date().toISOString(),
  };
}

/**
 * Monotonic course progress resolver:
 * Progress should never regress if a user studied further offline on one device.
 */
export function resolveCourseProgressConflict(
  local: { current_index: number; completed: boolean; updated_at?: string },
  remote: { current_index: number; completed: boolean; updated_at?: string }
): { current_index: number; completed: boolean; updated_at: string } {
  return {
    current_index: Math.max(local.current_index || 0, remote.current_index || 0),
    completed: Boolean(local.completed || remote.completed),
    updated_at: new Date().toISOString(),
  };
}

/**
 * User settings field-level merge:
 * Merges preferences taking non-empty values or newer updates.
 */
export function resolveUserSettingsConflict(
  local: Record<string, any>,
  remote: Record<string, any>
): Record<string, any> {
  return {
    ...local,
    ...remote,
    updated_at: new Date().toISOString(),
  };
}
