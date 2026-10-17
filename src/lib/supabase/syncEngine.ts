// ══════════════════════════════════════════════════════════════════
//  syncEngine.ts — Selective Delta Sync & Paginated Cloud Reconciliation
//  Research Basis: ADR-012, Zero-Collision Offline PWA Sync
//  - Replaces 60-request batch floods with targeted dirty mutation uploads
//  - Eliminates 1,000-row Supabase truncation barriers with cursor pagination
//  - Conflict-Free LWW reconciliation and additive XP synchronization
// ══════════════════════════════════════════════════════════════════

import { supabase } from './client';
import { useAppStore } from '../../store/useAppStore';
import { useGardenStore } from '../garden/gardenStore';
import { useGamificationStore } from '../gamification/gamificationStore';
import { FSRSCard } from '../../types/fsrs';
import { resolveFSRSCardConflict } from '../sync/conflictResolver';
import { storageBridge } from '../persistence/storageBridge';
import { localStore } from '../storage/localStore';

export const syncEngine = {
  async syncAll(userId: string): Promise<void> {
    if (!userId) return;

    // 1. Pull remote profile & paginated FSRS cards
    await this.pullProfileAndProgress(userId);
    await this.pullCards(userId);

    // 2. Push selective dirty mutations and progress to remote
    await this.pushCards(userId);
    await this.pushProfileAndGamification(userId);
  },

  /**
   * Reconciles remote profile, additive XP, and learning DNA (garden & heatmap).
   */
  async pullProfileAndProgress(userId: string): Promise<void> {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
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
   * Paginated pull of all user FSRS cards in 1,000-row chunks.
   * Eliminates the default 1,000-row Supabase truncation wall.
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
          .select('*')
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
        localStore.setCard({
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
        }, false);
      }
    } catch (e) {
      console.warn('[syncEngine] pullCards failed:', e);
    }
  },

  /**
   * Pushes ONLY dirty mutations recorded offline to Supabase.
   * Completely eliminates 60-request full-lexicon upload DOS floods.
   */
  async pushCards(userId: string): Promise<void> {
    try {
      const dirtyMutations = localStore.getDirtyMutations();
      const cardMutations = dirtyMutations.filter((m) => m.table_name === 'srs_cards');

      let rowsToPush: any[] = [];
      const clearedMutationIds: string[] = [];

      if (cardMutations.length > 0) {
        // Targeted delta sync from dirty queue
        for (const m of cardMutations) {
          try {
            const card = JSON.parse(m.payload_json);
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

      if (rowsToPush.length === 0) return;

      // Upsert in batches of 50
      const CHUNK_SIZE = 50;
      for (let i = 0; i < rowsToPush.length; i += CHUNK_SIZE) {
        const chunk = rowsToPush.slice(i, i + CHUNK_SIZE);
        await supabase.from('srs_cards').upsert(chunk, {
          onConflict: 'user_id,item_type,item_id',
        });
      }

      // Clear processed mutations from dirty queue
      if (clearedMutationIds.length > 0) {
        localStore.clearDirtyMutations(clearedMutationIds);
      }
      await storageBridge.clearTable('offline_queue');

      // Also push pending review logs if any
      const reviewMutations = dirtyMutations.filter((m) => m.table_name === 'review_history');
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

      const learningDna = {
        garden_plants: gardenState.plants,
        garden_drops: gardenState.waterDrops,
        heatmap: gamificationState.heatmap,
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
};
