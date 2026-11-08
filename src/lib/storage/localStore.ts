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

export interface LocalKanjiMasteryRow {
  character: string;
  total_attempts: number;
  successful_writes: number;
  average_score: number;
  last_practiced: number;
  mastery_level: 'learning' | 'practiced' | 'mastered';
  updated_at: number;
}

export interface LocalKanjiPracticeLogRow {
  session_id: string;
  character: string;
  score: number;
  is_complete: boolean;
  practiced_at: number;
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
    if (!itemId || typeof itemId !== 'string') return null;
    const row = this.store.getRow('cards', itemId);
    if (!row || Object.keys(row).length === 0) return null;
    return row as unknown as LocalFSRSCardRow;
  }

  public setCard(card: LocalFSRSCardRow, enqueueDirty = true): void {
    if (!card || !card.item_id) return;
    this.store.setRow('cards', card.item_id, card as any);
    if (enqueueDirty) {
      this.enqueueDirtyMutation('srs_cards', card.item_id, 'upsert', card);
    }
  }

  public deleteCard(itemId: string, enqueueDirty = true): void {
    if (!itemId || typeof itemId !== 'string') return;
    this.store.delRow('cards', itemId);
    if (enqueueDirty) {
      this.enqueueDirtyMutation('srs_cards', itemId, 'delete', { item_id: itemId });
    }
  }

  public getAllCards(): LocalFSRSCardRow[] {
    const table = this.store.getTable('cards');
    return Object.values(table) as unknown as LocalFSRSCardRow[];
  }

  // ── Reviews Table (Historical Immutable Logs) ──
  public addReviewLog(log: LocalReviewLogRow): void {
    if (!log || !log.review_id) return;
    this.store.setRow('reviews', log.review_id, log as any);
    this.enqueueDirtyMutation('review_history', log.review_id, 'upsert', log);
  }

  public getAllReviews(): LocalReviewLogRow[] {
    const table = this.store.getTable('reviews');
    return Object.values(table) as unknown as LocalReviewLogRow[];
  }

  // ── Kanji Mastery Table ──
  public getKanjiMastery(character: string): LocalKanjiMasteryRow | null {
    if (!character || typeof character !== 'string') return null;
    const row = this.store.getRow('kanji_mastery', character);
    if (!row || Object.keys(row).length === 0) return null;
    return row as unknown as LocalKanjiMasteryRow;
  }

  public setKanjiMastery(record: LocalKanjiMasteryRow, enqueueDirty = true): void {
    if (!record || !record.character) return;
    this.store.setRow('kanji_mastery', record.character, record as any);
    if (enqueueDirty) {
      this.enqueueDirtyMutation('kanji_mastery_logs', record.character, 'upsert', record);
    }
  }

  public deleteKanjiMastery(character: string, enqueueDirty = true): void {
    if (!character || typeof character !== 'string') return;
    this.store.delRow('kanji_mastery', character);
    if (enqueueDirty) {
      this.enqueueDirtyMutation('kanji_mastery_logs', character, 'delete', { character });
    }
  }

  public getAllKanjiMastery(): LocalKanjiMasteryRow[] {
    const table = this.store.getTable('kanji_mastery');
    return Object.values(table) as unknown as LocalKanjiMasteryRow[];
  }

  // ── Kanji Practice History Table ──
  public addKanjiPracticeLog(log: LocalKanjiPracticeLogRow, enqueueDirty = true): void {
    if (!log || !log.session_id) return;
    this.store.setRow('kanji_practice_history', log.session_id, log as any);
    if (enqueueDirty) {
      this.enqueueDirtyMutation('kanji_practice_history', log.session_id, 'upsert', log);
    }
  }

  public getAllKanjiPracticeLogs(): LocalKanjiPracticeLogRow[] {
    const table = this.store.getTable('kanji_practice_history');
    return Object.values(table) as unknown as LocalKanjiPracticeLogRow[];
  }

  // ── Gamification Table ──
  public getGamificationValue<T>(key: string, fallback: T): T {
    if (!key || typeof key !== 'string') return fallback;
    const val = this.store.getValue(key);
    return val !== undefined ? (val as unknown as T) : fallback;
  }

  public setGamificationValue(key: string, value: any): void {
    if (!key || typeof key !== 'string') return;
    this.store.setValue(key, value);
    this.enqueueDirtyMutation('gamification', key, 'upsert', { key, value });
  }

  // ── Preferences Table ──
  public getPreference<T>(key: string, fallback: T): T {
    if (!key || typeof key !== 'string') return fallback;
    const row = this.store.getRow('preferences', key);
    if (!row || row.value === undefined) return fallback;
    return row.value as unknown as T;
  }

  public setPreference(key: string, value: any): void {
    if (!key || typeof key !== 'string') return;
    this.store.setRow('preferences', key, { key, value });
  }

  // ── Table Diagnostics & Reset ──
  public getTableCounts(): Record<string, number> {
    return {
      cards: Object.keys(this.store.getTable('cards')).length,
      reviews: Object.keys(this.store.getTable('reviews')).length,
      kanji_mastery: Object.keys(this.store.getTable('kanji_mastery')).length,
      kanji_practice_history: Object.keys(this.store.getTable('kanji_practice_history')).length,
      dirty_queue: Object.keys(this.store.getTable('dirty_queue')).length,
      preferences: Object.keys(this.store.getTable('preferences')).length,
    };
  }

  public resetStore(): void {
    this.store.delTables();
    this.store.delValues();
  }

  // ── Dirty Queue (Offline Mutation Sync) ──
  public enqueueDirtyMutation(
    tableName: string,
    entityId: string,
    action: 'upsert' | 'delete',
    payload: any
  ): void {
    const salt = Math.random().toString(36).substring(2, 7);
    const mutationId = `${tableName}:${entityId}:${Date.now()}:${salt}`;
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
    if (!Array.isArray(mutationIds)) return;
    for (const id of mutationIds) {
      if (id && typeof id === 'string') {
        this.store.delRow('dirty_queue', id);
      }
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
          if (parsed && typeof parsed === 'object') {
            for (const [id, entry] of Object.entries<any>(parsed)) {
              if (!entry) continue;
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
