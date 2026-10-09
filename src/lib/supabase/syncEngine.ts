import { supabase } from './client';
import { useAppStore } from '../../store/useAppStore';
import { useGardenStore } from '../garden/gardenStore';
import { useGamificationStore } from '../gamification/gamificationStore';
import { FSRSCard } from '../../types/fsrs';

export const syncEngine = {
  async syncAll(userId: string): Promise<void> {
    if (!userId) return;

    // 1. Pull remote profile & FSRS cards
    await this.pullProfileAndProgress(userId);
    await this.pullCards(userId);

    // 2. Push local progress to remote
    await this.pushCards(userId);
    await this.pushProfileAndGamification(userId);
  },

  async pullProfileAndProgress(userId: string): Promise<void> {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profile) {
        const appState = useAppStore.getState();
        // If remote XP or streak is higher, reconcile
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
          } catch {}
        }
      }
    } catch (e) {
      console.warn('[syncEngine] pullProfile failed:', e);
    }
  },

  async pullCards(userId: string): Promise<void> {
    try {
      const { data: remoteCards } = await supabase
        .from('srs_cards')
        .select('*')
        .eq('user_id', userId);

      if (!remoteCards || remoteCards.length === 0) return;

      const localCards = useAppStore.getState().cards;
      const mergedCards = { ...localCards };

      for (const row of remoteCards) {
        const local = localCards[row.item_id];
        const remoteTime = row.last_review ? new Date(row.last_review).getTime() : 0;
        const localTime = local?.card?.last_review ? new Date(local.card.last_review).getTime() : 0;

        // If remote is newer or local entry doesn't exist, adopt remote
        if (!local || remoteTime >= localTime) {
          mergedCards[row.item_id] = {
            source: row.item_type,
            card: {
              stability: row.stability || 0,
              difficulty: row.difficulty || 0,
              elapsed_days: row.elapsed_days || 0,
              scheduled_days: row.scheduled_days || 0,
              reps: row.reps || 0,
              lapses: row.lapses || 0,
              state: row.state || 0,
              due: row.due || new Date().toISOString(),
              last_review: row.last_review || new Date().toISOString(),
            } as FSRSCard,
          };
        }
      }

      useAppStore.setState({ cards: mergedCards });
      if (typeof window !== 'undefined') {
        localStorage.setItem('nn_fsrs_cards', JSON.stringify(mergedCards));
      }
    } catch (e) {
      console.warn('[syncEngine] pullCards failed:', e);
    }
  },

  async pushCards(userId: string): Promise<void> {
    const localCards = useAppStore.getState().cards;
    const entries = Object.entries(localCards);
    if (entries.length === 0) return;

    // Batch upsert cards in chunks of 50
    const CHUNK_SIZE = 50;
    for (let i = 0; i < entries.length; i += CHUNK_SIZE) {
      const chunk = entries.slice(i, i + CHUNK_SIZE);
      const rows = chunk.map(([id, entry]) => {
        const c = entry.card || ({} as Partial<FSRSCard>);
        return {
          user_id: userId,
          item_type: entry.source || (id.startsWith('vg-') ? 'vocab' : 'grammar'),
          item_id: id,
          stability: c.stability || 0,
          difficulty: c.difficulty || 0,
          elapsed_days: c.elapsed_days || 0,
          scheduled_days: c.scheduled_days || 0,
          reps: c.reps || 0,
          lapses: c.lapses || 0,
          state: c.state || 0,
          due: c.due || new Date().toISOString(),
          last_review: c.last_review || new Date().toISOString(),
        };
      });

      await supabase.from('srs_cards').upsert(rows, {
        onConflict: 'user_id,item_type,item_id',
      });
    }
  },

  async pushProfileAndGamification(userId: string): Promise<void> {
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
  },
};
