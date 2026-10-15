---
name: local-first-pwa-sync
description: "Zero-collision offline PWA sync, IndexedDB local persistence, and conflict-free CRDT cloud synchronization with Supabase using TinyBase."
---

# Local-First PWA Synchronization Skill (TinyBase + Supabase)

This skill describes the architecture for robust, zero-collision offline synchronization in Nugget Nihongo. It ensures users can review cards, complete quizzes, and water their mastery garden completely offline, while automatically reconciling state with Supabase when online.

## 1. Core Principles
1. **Immediate Local Reads & Writes (0ms):** Every UI state mutation writes synchronously to local memory and is flushed to IndexedDB.
2. **Conflict-Free Reconciliation:** Uses Last-Write-Wins (LWW) or CRDT vector clocks keyed by `(card_id, review_timestamp)` so multi-device reviews merge seamlessly without data loss.
3. **Dirty-Queue Synchronization:** Mutations while offline are placed into a local queue and replayed to Supabase upon connection restoration.

## 2. TinyBase Store Setup
```ts
import { createStore } from 'tinybase';
import { createIndexedDbPersister } from 'tinybase/persisters/persister-indexed-db';

export async function initLocalStore() {
  const store = createStore();
  const persister = createIndexedDbPersister(store, 'nugget_nihongo_local');

  // Load existing IndexedDB data into memory
  await persister.startAutoLoad();
  await persister.startAutoSave();

  return { store, persister };
}
```

## 3. Merging Offline SRS History to Supabase
```ts
export async function syncDirtyReviewsToSupabase(supabase: any, store: any) {
  const dirtyReviews = store.getTable('dirty_reviews');
  const reviewIds = Object.keys(dirtyReviews);

  if (reviewIds.length === 0) return;

  const records = reviewIds.map((id) => dirtyReviews[id]);

  const { error } = await supabase
    .from('srs_reviews')
    .upsert(records, { onConflict: 'card_id,review_time' });

  if (!error) {
    // Clear dirty queue
    store.delTable('dirty_reviews');
  }
}
```
