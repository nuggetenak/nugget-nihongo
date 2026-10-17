// ══════════════════════════════════════════════════════════════════
//  localStore.ts — Local-First TinyBase IndexedDB Persistence Engine
//  Research Basis: ADR-012, Zero-Collision Offline PWA Sync
//  Replaces 5MB synchronous localStorage wall with reactive IndexedDB
// ══════════════════════════════════════════════════════════════════

import { createStore } from 'tinybase';
import { createIndexedDbPersister } from 'tinybase/persisters/persister-indexed-db';

type Store = ReturnType<typeof createStore>;

export interface LocalFSRSCardRow {
  item_id: string;
  item_type: string;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  reps: number;
  lapses: number;
  state: number;
  due: string;
  last_review: string;
  updated_at: number;
}

export interface LocalReviewLogRow {
  review_id: string;
  card_id: string;
  rating: number; // 1: Again, 2: Hard, 3: Good, 4: Easy
  state: number;  // 0: New, 1: Learning, 2: Review, 3: Relearning
  review_time: string;
  scheduled_days: number;
  elapsed_days: number;
}

export interface LocalDirtyMutationRow {
  mutation_id: string;
  table_name: string;
  entity_id: string;
  action: 'upsert' | 'delete';
  payload_json: string;
  queued_at: number;
}

export class LocalStorageManager {
  private store: Store;
  private persister: any = null;
  private isInitialized = false;

  constructor() {
    this.store = createStore();
  }

  public async init(): Promise<void> {
    if (this.isInitialized) return;

    if (typeof window !== 'undefined' && window.indexedDB) {
      try {
        this.persister = createIndexedDbPersister(this.store, 'nugget_nihongo_local');
        await this.persister.startAutoLoad();
        await this.persister.startAutoSave();
      } catch (err) {
        console.warn('[localStore] TinyBase IndexedDB persister init fallback:', err);
      }
    }

    this.isInitialized = true;
  }

  public getRawStore(): Store {
    return this.store;
  }

  // ── Cards Table (FSRS State) ──
  public getCard(itemId: string): LocalFSRSCardRow | null {
    const row = this.store.getRow('cards', itemId);
    if (!row || Object.keys(row).length === 0) return null;
    return row as unknown as LocalFSRSCardRow;
  }

  public setCard(card: LocalFSRSCardRow, enqueueDirty = true): void {
    this.store.setRow('cards', card.item_id, card as any);
    if (enqueueDirty) {
      this.enqueueDirtyMutation('srs_cards', card.item_id, 'upsert', card);
    }
  }

  public getAllCards(): LocalFSRSCardRow[] {
    const table = this.store.getTable('cards');
    return Object.values(table) as unknown as LocalFSRSCardRow[];
  }

  // ── Reviews Table (Historical Immutable Logs) ──
  public addReviewLog(log: LocalReviewLogRow): void {
    this.store.setRow('reviews', log.review_id, log as any);
    this.enqueueDirtyMutation('review_history', log.review_id, 'upsert', log);
  }

  public getAllReviews(): LocalReviewLogRow[] {
    const table = this.store.getTable('reviews');
    return Object.values(table) as unknown as LocalReviewLogRow[];
  }

  // ── Gamification Table ──
  public getGamificationValue<T>(key: string, fallback: T): T {
    const val = this.store.getValue(key);
    return val !== undefined ? (val as unknown as T) : fallback;
  }

  public setGamificationValue(key: string, value: any): void {
    this.store.setValue(key, value);
    this.enqueueDirtyMutation('gamification', key, 'upsert', { key, value });
  }

  // ── Preferences Table ──
  public getPreference<T>(key: string, fallback: T): T {
    const row = this.store.getRow('preferences', key);
    if (!row || row.value === undefined) return fallback;
    return row.value as unknown as T;
  }

  public setPreference(key: string, value: any): void {
    this.store.setRow('preferences', key, { key, value });
  }

  // ── Dirty Queue (Offline Mutation Sync) ──
  public enqueueDirtyMutation(
    tableName: string,
    entityId: string,
    action: 'upsert' | 'delete',
    payload: any
  ): void {
    const mutationId = `${tableName}:${entityId}:${Date.now()}`;
    const row: LocalDirtyMutationRow = {
      mutation_id: mutationId,
      table_name: tableName,
      entity_id: entityId,
      action,
      payload_json: JSON.stringify(payload),
      queued_at: Date.now(),
    };
    this.store.setRow('dirty_queue', mutationId, row as any);
  }

  public getDirtyMutations(): LocalDirtyMutationRow[] {
    const table = this.store.getTable('dirty_queue');
    return Object.values(table) as unknown as LocalDirtyMutationRow[];
  }

  public clearDirtyMutations(mutationIds: string[]): void {
    for (const id of mutationIds) {
      this.store.delRow('dirty_queue', id);
    }
  }

  // ── First-Boot Migration of All 19 Legacy localStorage Keys ──
  public async migrateAllLocalStorageKeys(): Promise<{ migratedCount: number; keys: string[] }> {
    if (typeof window === 'undefined' || !window.localStorage) {
      return { migratedCount: 0, keys: [] };
    }

    const LEGACY_KEYS = [
      'nn_cards',
      'nn_fsrs_cards',
      'nn_curriculum_progress_v2',
      'nn_xp',
      'nn_streak',
      'nn_streak_last',
      'nn_garden_plants',
      'nn_garden_drops',
      'nn_heatmap',
      'nn_settings',
      'nn_l1_substratum',
      'nn_furigana',
      'nn_romaji',
      'nn_audio',
      'nn_voice',
      'nn_kanji_drawings',
      'nn_bookmarks',
      'nn_history',
      'nn_daily_goal'
    ];

    const migratedKeys: string[] = [];
    let migratedCount = 0;

    for (const key of LEGACY_KEYS) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;

      try {
        if (key === 'nn_cards' || key === 'nn_fsrs_cards') {
          const parsed = JSON.parse(raw);
          for (const [id, entry] of Object.entries<any>(parsed)) {
            const c = entry.card || entry;
            this.setCard({
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
            migratedCount++;
          }
        } else if (key === 'nn_xp' || key === 'nn_streak') {
          const num = parseInt(raw, 10);
          if (!isNaN(num)) {
            this.setGamificationValue(key, num);
            migratedCount++;
          }
        } else {
          // JSON or string preference
          let val = raw;
          try {
            val = JSON.parse(raw);
          } catch {}
          this.setPreference(key, val);
          migratedCount++;
        }
        migratedKeys.push(key);
      } catch (err) {
        console.warn(`[localStore] Failed migrating legacy key ${key}:`, err);
      }
    }

    return { migratedCount, keys: migratedKeys };
  }
}

export const localStore = new LocalStorageManager();
