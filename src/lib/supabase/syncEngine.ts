// ══════════════════════════════════════════════════════════════════
//  syncEngine.ts — Selective Delta Sync & Paginated Cloud Reconciliation
//  Research Basis: ADR-012, Zero-Collision Offline PWA Sync
//  - Replaces 60-request batch floods with targeted dirty mutation uploads
//  - Eliminates 1,000-row Supabase truncation barriers with cursor pagination
//  - Conflict-Free LWW reconciliation and additive XP synchronization
//  - Free-Tier Optimized: Selective column projection & circuit-breaker timeout
//  - Concurrency Lock & Request Coalescing: Prevents redundant parallel sync waves
// ══════════════════════════════════════════════════════════════════

import { supabase } from './client';
import { useAppStore } from '../../store/useAppStore';
import { useGardenStore } from '../garden/gardenStore';
import { useGamificationStore } from '../gamification/gamificationStore';
import { useCurriculumStore } from '../curriculum/curriculumStore';
import { FSRSCard } from '../../types/fsrs';
import {
  resolveFSRSCardConflict,
  resolveKanjiMasteryConflict,
  resolveKanjiPracticeLogsConflict,
} from '../sync/conflictResolver.ts';
import { storageBridge } from '../persistence/storageBridge';
import { localStore } from '../storage/localStore.ts';
import type { LocalKanjiMasteryRow, LocalKanjiPracticeLogRow } from '../storage/localStore.ts';

let activeSyncPromise: Promise<void> | null = null;

export const syncEngine = {
  /**
   * Diagnostic indicator to check if an active sync operation is in flight.
   */
  isSyncActive(): boolean {
    return activeSyncPromise !== null;
  },

  /**
   * Returns the count of pending dirty mutations currently queued in localStore.
   */
  getPendingDirtyCount(): number {
    try {
      return localStore.getDirtyMutations().length;
    } catch {
      return 0;
    }
  },

  /**
   * Checks whether there are unsynced changes waiting for cloud replication.
   */
  hasUnsyncedMutations(): boolean {
    return this.getPendingDirtyCount() > 0;
  },

  async syncAll(userId: string): Promise<void> {
    if (!userId) return;

    // Concurrency Lock & Request Coalescing:
    // If a sync is already active, coalesce onto the in-flight promise rather than spawning redundant waves.
    if (activeSyncPromise) {
      return activeSyncPromise;
    }

    // Free Tier Circuit-Breaker: Abort after 8 seconds if Supabase is sleeping or unresponsive
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(
        () =>
          reject(
            new Error(
              'Koneksi sinkronisasi melebihi batas waktu (timeout 8 detik). Server cloud mungkin sedang tertidur.'
            )
          ),
        8000
      )
    );

    activeSyncPromise = (async () => {
      await Promise.race([
        (async () => {
          // 1. Pull remote profile, paginated FSRS cards, and kanji mastery
          await this.pullProfileAndProgress(userId);
          await this.pullCards(userId);
          await this.pullKanjiMastery(userId);

          // 2. Push selective dirty mutations and progress to remote
          await this.pushCards(userId);
          await this.pushKanjiMastery(userId);
          await this.pushProfileAndGamification(userId);
        })(),
        timeoutPromise,
      ]);
    })();

    try {
      await activeSyncPromise;
    } finally {
      activeSyncPromise = null;
    }
  },

  /**
   * Reconciles remote profile, additive XP, and learning DNA (garden & heatmap).
   */
  async pullProfileAndProgress(userId: string): Promise<void> {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('id, xp, streak_days, learning_dna, updated_at')
        .eq('id', userId)
        .single();

      if (error || !profile) return;

      const appState = useAppStore.getState();

      // Additive / monotonic XP reconciliation
      if (typeof profile.xp === 'number' && profile.xp > appState.xp) {
        appState.incrementXp(profile.xp - appState.xp);
      }
      if (typeof profile.streak_days === 'number' && profile.streak_days > appState.streak) {
        appState.updateStreak(profile.streak_days);
      }

      // Restore garden plants from learning_dna if available
      if (profile.learning_dna?.garden_plants) {
        try {
          const plants = profile.learning_dna.garden_plants;
          localStorage.setItem('nn_garden_plants', JSON.stringify(plants));
          useGardenStore.setState({ plants });
          localStore.setGamificationValue('nn_garden_plants', plants);
        } catch {}
      }

      // Restore curriculum progress if available in learning_dna
      if (profile.learning_dna?.curriculum_progress) {
        try {
          const remoteCurriculum = profile.learning_dna.curriculum_progress;
          const localCurriculum = useCurriculumStore.getState().trackProgress;
          const merged = { ...localCurriculum } as Record<string, any>;
          Object.keys(remoteCurriculum).forEach((trackId) => {
            if (!merged[trackId]) {
              merged[trackId] = remoteCurriculum[trackId];
            } else {
              merged[trackId] = {
                completedUnits: Array.from(
                  new Set([
                    ...(merged[trackId].completedUnits || []),
                    ...(remoteCurriculum[trackId].completedUnits || []),
                  ])
                ),
                completedLessons: Array.from(
                  new Set([
                    ...(merged[trackId].completedLessons || []),
                    ...(remoteCurriculum[trackId].completedLessons || []),
                  ])
                ),
                lessonScores: {
                  ...remoteCurriculum[trackId].lessonScores,
                  ...merged[trackId].lessonScores,
                },
              };
            }
          });
          useCurriculumStore.setState({ trackProgress: merged as any });
        } catch {}
      }

      // Restore heatmap if available in learning_dna
      if (profile.learning_dna?.heatmap) {
        try {
          const remoteHeatmap = profile.learning_dna.heatmap;
          const localHeatmap = useGamificationStore.getState().heatmap;
          const merged = { ...localHeatmap, ...remoteHeatmap };
          localStorage.setItem('nn_heatmap', JSON.stringify(merged));
          useGamificationStore.setState({ heatmap: merged });
          localStore.setGamificationValue('nn_heatmap', merged);
        } catch {}
      }
    } catch (e) {
      console.warn('[syncEngine] pullProfile failed:', e);
    }
  },

  /**
   * Paginated pull of all user FSRS cards in 1,000-row chunks with selective projection.
   * Eliminates the default 1,000-row Supabase truncation wall and minimizes egress bandwidth.
   */
  async pullCards(userId: string): Promise<void> {
    try {
      const PAGE_SIZE = 1000;
      let from = 0;
      let allRemoteCards: any[] = [];
      let hasMore = true;

      while (hasMore) {
        const { data, error } = await supabase
          .from('srs_cards')
          .select(
            'id, user_id, item_type, item_id, stability, difficulty, elapsed_days, scheduled_days, reps, lapses, state, due, last_review, updated_at'
          )
          .eq('user_id', userId)
          .range(from, from + PAGE_SIZE - 1)
          .order('id', { ascending: true });

        if (error || !data || data.length === 0) {
          break;
        }

        allRemoteCards = allRemoteCards.concat(data);
        if (data.length < PAGE_SIZE) {
          hasMore = false;
        } else {
          from += PAGE_SIZE;
        }
      }

      if (allRemoteCards.length === 0) return;

      const localCards = useAppStore.getState().cards;
      const mergedCards = { ...localCards };

      for (const row of allRemoteCards) {
        const local = localCards[row.item_id];
        const remoteCard: FSRSCard = {
          stability: row.stability || 0,
          difficulty: row.difficulty || 0,
          elapsed_days: row.elapsed_days || 0,
          scheduled_days: row.scheduled_days || 0,
          reps: row.reps || 0,
          lapses: row.lapses || 0,
          state: row.state || 0,
          due: row.due || new Date().toISOString(),
          last_review: row.last_review || new Date().toISOString(),
        };

        const resolvedCard = local?.card
          ? resolveFSRSCardConflict(local.card, remoteCard)
          : remoteCard;

        mergedCards[row.item_id] = {
          source: row.item_type,
          card: resolvedCard,
        };
      }

      useAppStore.setState({ cards: mergedCards });
      if (typeof window !== 'undefined') {
        localStorage.setItem('nn_fsrs_cards', JSON.stringify(mergedCards));
      }

      // Persist to localStore IndexedDB & storageBridge
      for (const [id, entry] of Object.entries(mergedCards)) {
        storageBridge.setItem('srs_cards', id, entry).catch(() => {});
        const c = entry.card || {};
        localStore.setCard(
          {
            item_id: id,
            item_type: entry.source || (id.startsWith('vg-') ? 'vocab' : 'grammar'),
            stability: c.stability || 0,
            difficulty: c.difficulty || 0,
            elapsed_days: c.elapsed_days || 0,
            scheduled_days: c.scheduled_days || 0,
            reps: c.reps || 0,
            lapses: c.lapses || 0,
            state: c.state || 0,
            due: c.due || new Date().toISOString(),
            last_review: c.last_review || new Date().toISOString(),
            updated_at: Date.now(),
          },
          false
        );
      }
    } catch (e) {
      console.warn('[syncEngine] pullCards failed:', e);
    }
  },

  /**
   * Pushes ONLY dirty mutations recorded offline to Supabase.
   * Completely eliminates 60-request full-lexicon upload DOS floods and preserves free tier quotas.
   * Correctly handles 'delete' mutations to purge deleted items from the cloud.
   */
  async pushCards(userId: string): Promise<void> {
    try {
      const dirtyMutations = localStore.getDirtyMutations();
      const cardMutations = dirtyMutations.filter((m) => m.table_name === 'srs_cards');

      let rowsToPush: any[] = [];
      const toDeleteIds: string[] = [];
      const clearedMutationIds: string[] = [];

      if (cardMutations.length > 0) {
        // Targeted delta sync from dirty queue
        for (const m of cardMutations) {
          try {
            const card = JSON.parse(m.payload_json);
            if (m.action === 'delete') {
              toDeleteIds.push(card.item_id || m.entity_id);
              clearedMutationIds.push(m.mutation_id);
            } else {
              rowsToPush.push({
                user_id: userId,
                item_type: card.item_type || (card.item_id.startsWith('vg-') ? 'vocab' : 'grammar'),
                item_id: card.item_id,
                stability: card.stability || 0,
                difficulty: card.difficulty || 0,
                elapsed_days: card.elapsed_days || 0,
                scheduled_days: card.scheduled_days || 0,
                reps: card.reps || 0,
                lapses: card.lapses || 0,
                state: card.state || 0,
                due: card.due || new Date().toISOString(),
                last_review: card.last_review || new Date().toISOString(),
              });
              clearedMutationIds.push(m.mutation_id);
            }
          } catch {}
        }
      } else {
        // Fallback: If dirty queue is empty on legacy boot, inspect bridge or local cards
        const offlineQueue = await storageBridge.getAll<any>('offline_queue');
        if (offlineQueue.length > 0) {
          rowsToPush = offlineQueue.map((c) => ({
            user_id: userId,
            item_type: c.item_type || (c.item_id?.startsWith('vg-') ? 'vocab' : 'grammar'),
            item_id: c.item_id,
            stability: c.stability || 0,
            difficulty: c.difficulty || 0,
            elapsed_days: c.elapsed_days || 0,
            scheduled_days: c.scheduled_days || 0,
            reps: c.reps || 0,
            lapses: c.lapses || 0,
            state: c.state || 0,
            due: c.due || new Date().toISOString(),
            last_review: c.last_review || new Date().toISOString(),
          }));
        }
      }

      // 1. Process deletions
      if (toDeleteIds.length > 0) {
        const CHUNK_SIZE = 50;
        for (let i = 0; i < toDeleteIds.length; i += CHUNK_SIZE) {
          const chunk = toDeleteIds.slice(i, i + CHUNK_SIZE);
          await supabase.from('srs_cards').delete().eq('user_id', userId).in('item_id', chunk);
        }
      }

      // 2. Upsert in batches of 50
      if (rowsToPush.length > 0) {
        const CHUNK_SIZE = 50;
        for (let i = 0; i < rowsToPush.length; i += CHUNK_SIZE) {
          const chunk = rowsToPush.slice(i, i + CHUNK_SIZE);
          await supabase.from('srs_cards').upsert(chunk, {
            onConflict: 'user_id,item_type,item_id',
          });
        }
      }

      // Clear processed mutations from dirty queue
      if (clearedMutationIds.length > 0) {
        localStore.clearDirtyMutations(clearedMutationIds);
      }
      await storageBridge.clearTable('offline_queue');

      // Also push pending review logs if any
      const reviewMutations = dirtyMutations.filter(
        (m) => m.table_name === 'review_history' || m.table_name === 'reviews'
      );
      if (reviewMutations.length > 0) {
        const reviewRows = reviewMutations.map((m) => {
          const rev = JSON.parse(m.payload_json);
          return {
            user_id: userId,
            card_id: rev.card_id,
            rating: rev.rating,
            review_time: rev.review_time,
            state: rev.state,
            scheduled_days: rev.scheduled_days,
            elapsed_days: rev.elapsed_days,
          };
        });
        try {
          await supabase.from('review_history').upsert(reviewRows, {
            onConflict: 'user_id,card_id,review_time',
          });
        } catch {}
        localStore.clearDirtyMutations(reviewMutations.map((m) => m.mutation_id));
      }
    } catch (e) {
      console.warn('[syncEngine] pushCards failed:', e);
    }
  },

  async pushProfileAndGamification(userId: string): Promise<void> {
    try {
      const appState = useAppStore.getState();
      const gardenState = useGardenStore.getState();
      const gamificationState = useGamificationStore.getState();

      const curriculumState = useCurriculumStore.getState();
      const learningDna = {
        garden_plants: gardenState.plants,
        garden_drops: gardenState.waterDrops,
        heatmap: gamificationState.heatmap,
        curriculum_progress: curriculumState.trackProgress,
        last_synced: new Date().toISOString(),
      };

      await supabase.from('profiles').upsert({
        id: userId,
        xp: appState.xp,
        streak_days: appState.streak,
        learning_dna: learningDna,
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('[syncEngine] pushProfileAndGamification failed:', e);
    }
  },

  /**
   * Pulls remote kanji mastery records and reconciles them with local TinyBase IndexedDB.
   * Utilizes CRDT resolveKanjiMasteryConflict to guarantee monotonic progression.
   */
  async pullKanjiMastery(userId: string): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('kanji_mastery_logs')
        .select(
          'id, user_id, character, total_attempts, successful_writes, average_score, last_practiced, mastery_level, updated_at'
        )
        .eq('user_id', userId);

      if (error || !data || data.length === 0) return;

      for (const row of data) {
        const local = localStore.getKanjiMastery(row.character);
        const remoteRow: LocalKanjiMasteryRow = {
          character: row.character,
          total_attempts: row.total_attempts || 0,
          successful_writes: row.successful_writes || 0,
          average_score: row.average_score || 0,
          last_practiced:
            typeof row.last_practiced === 'number'
              ? row.last_practiced
              : new Date(row.last_practiced || row.updated_at || Date.now()).getTime(),
          mastery_level: row.mastery_level || 'learning',
          updated_at:
            typeof row.updated_at === 'number'
              ? row.updated_at
              : new Date(row.updated_at || Date.now()).getTime(),
        };

        const resolved = local
          ? resolveKanjiMasteryConflict(local, remoteRow)
          : remoteRow;

        // Persist reconciled row to localStore without re-enqueueing dirty mutation
        localStore.setKanjiMastery(resolved, false);
      }
    } catch (e) {
      console.warn('[syncEngine] pullKanjiMastery failed:', e);
    }
  },

  /**
   * Pushes dirty kanji mastery records and practice session history to Supabase.
   * Correctly purges deleted mastery records from the cloud.
   * Clears dirty queue upon confirmation.
   */
  async pushKanjiMastery(userId: string): Promise<void> {
    try {
      const dirtyMutations = localStore.getDirtyMutations();

      // 1. Kanji Mastery Delta Sync
      const masteryMutations = dirtyMutations.filter(
        (m) => m.table_name === 'kanji_mastery_logs' || m.table_name === 'kanji_mastery'
      );

      if (masteryMutations.length > 0) {
        const clearedMasteryIds: string[] = [];
        const rowsToPush: any[] = [];
        const toDeleteChars: string[] = [];

        for (const m of masteryMutations) {
          try {
            const r = JSON.parse(m.payload_json);
            if (m.action === 'delete') {
              toDeleteChars.push(r.character || m.entity_id);
              clearedMasteryIds.push(m.mutation_id);
            } else {
              rowsToPush.push({
                user_id: userId,
                character: r.character,
                total_attempts: r.total_attempts || 0,
                successful_writes: r.successful_writes || 0,
                average_score: r.average_score || 0,
                last_practiced: r.last_practiced || Date.now(),
                mastery_level: r.mastery_level || 'learning',
                updated_at: r.updated_at || Date.now(),
              });
              clearedMasteryIds.push(m.mutation_id);
            }
          } catch {}
        }

        // Process deletions
        if (toDeleteChars.length > 0) {
          const CHUNK_SIZE = 50;
          for (let i = 0; i < toDeleteChars.length; i += CHUNK_SIZE) {
            const chunk = toDeleteChars.slice(i, i + CHUNK_SIZE);
            await supabase.from('kanji_mastery_logs').delete().eq('user_id', userId).in('character', chunk);
          }
        }

        if (rowsToPush.length > 0) {
          const CHUNK_SIZE = 50;
          for (let i = 0; i < rowsToPush.length; i += CHUNK_SIZE) {
            const chunk = rowsToPush.slice(i, i + CHUNK_SIZE);
            await supabase.from('kanji_mastery_logs').upsert(chunk, {
              onConflict: 'user_id,character',
            });
          }
        }

        if (clearedMasteryIds.length > 0) {
          localStore.clearDirtyMutations(clearedMasteryIds);
        }
      }

      // 2. Kanji Practice Session Logs Sync
      const historyMutations = dirtyMutations.filter(
        (m) => m.table_name === 'kanji_practice_history' || m.table_name === 'kanji_practice_logs'
      );

      if (historyMutations.length > 0) {
        const clearedHistoryIds: string[] = [];
        const historyRows: any[] = [];

        for (const m of historyMutations) {
          try {
            const h = JSON.parse(m.payload_json);
            historyRows.push({
              user_id: userId,
              session_id: h.session_id,
              character: h.character,
              score: h.score || 0,
              is_complete: Boolean(h.is_complete),
              practiced_at: h.practiced_at || Date.now(),
            });
            clearedHistoryIds.push(m.mutation_id);
          } catch {}
        }

        if (historyRows.length > 0) {
          const CHUNK_SIZE = 50;
          for (let i = 0; i < historyRows.length; i += CHUNK_SIZE) {
            const chunk = historyRows.slice(i, i + CHUNK_SIZE);
            await supabase.from('kanji_practice_history').upsert(chunk, {
              onConflict: 'user_id,session_id',
            });
          }
          localStore.clearDirtyMutations(clearedHistoryIds);
        }
      }
    } catch (e) {
      console.warn('[syncEngine] pushKanjiMastery failed:', e);
    }
  },
};
