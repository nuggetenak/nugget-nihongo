// ══════════════════════════════════════════════════════════════════
//  storageBridge.ts — Local-First Persistence Bridge (TinyBase / IndexedDB)
//  Research Basis: ADR-012, Zero-Collision Offline PWA Sync
//  Retires synchronous localStorage blocking during heavy review syncs
// ══════════════════════════════════════════════════════════════════

export interface StorageRecord<T = any> {
  id: string;
  table: string;
  data: T;
  updatedAt: number; // Unix timestamp
  version: number;
}

class StorageBridgeService {
  private dbName = 'nugget_nihongo_local_db_v1';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;
  private memoryFallback: Map<string, StorageRecord> = new Map();

  constructor() {
    this.initDB();
  }

  private initDB(): Promise<IDBDatabase | null> {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return Promise.resolve(null);
    }

    return new Promise((resolve) => {
      try {
        const req = window.indexedDB.open(this.dbName, this.dbVersion);

        req.onupgradeneeded = (e: IDBVersionChangeEvent) => {
          const db = (e.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains('srs_cards')) {
            db.createObjectStore('srs_cards', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('user_progress')) {
            db.createObjectStore('user_progress', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('offline_queue')) {
            db.createObjectStore('offline_queue', { keyPath: 'id' });
          }
        };

        req.onsuccess = () => {
          this.db = req.result;
          resolve(this.db);
        };

        req.onerror = () => {
          console.warn('[storageBridge] IndexedDB open error, using memory fallback');
          resolve(null);
        };
      } catch (err) {
        console.warn('[storageBridge] IndexedDB initialization failed:', err);
        resolve(null);
      }
    });
  }

  public async setItem<T>(table: string, id: string, data: T): Promise<StorageRecord<T>> {
    const record: StorageRecord<T> = {
      id,
      table,
      data,
      updatedAt: Date.now(),
      version: 1,
    };

    if (!this.db) {
      await this.initDB();
    }

    if (this.db && this.db.objectStoreNames.contains(table)) {
      return new Promise((resolve, reject) => {
        try {
          const tx = this.db!.transaction(table, 'readwrite');
          const store = tx.objectStore(table);
          const req = store.put(record);
          req.onsuccess = () => resolve(record);
          req.onerror = () => reject(req.error);
        } catch (e) {
          this.memoryFallback.set(`${table}:${id}`, record);
          resolve(record);
        }
      });
    } else {
      this.memoryFallback.set(`${table}:${id}`, record);
      return record;
    }
  }

  public async getItem<T>(table: string, id: string): Promise<T | null> {
    if (!this.db) {
      await this.initDB();
    }

    if (this.db && this.db.objectStoreNames.contains(table)) {
      return new Promise((resolve) => {
        try {
          const tx = this.db!.transaction(table, 'readonly');
          const store = tx.objectStore(table);
          const req = store.get(id);
          req.onsuccess = () => {
            const res = req.result as StorageRecord<T> | undefined;
            resolve(res ? res.data : null);
          };
          req.onerror = () => {
            const fallback = this.memoryFallback.get(`${table}:${id}`);
            resolve(fallback ? fallback.data : null);
          };
        } catch {
          const fallback = this.memoryFallback.get(`${table}:${id}`);
          resolve(fallback ? fallback.data : null);
        }
      });
    } else {
      const fallback = this.memoryFallback.get(`${table}:${id}`);
      return fallback ? fallback.data : null;
    }
  }

  public async getAll<T>(table: string): Promise<T[]> {
    if (!this.db) {
      await this.initDB();
    }

    if (this.db && this.db.objectStoreNames.contains(table)) {
      return new Promise((resolve) => {
        try {
          const tx = this.db!.transaction(table, 'readonly');
          const store = tx.objectStore(table);
          const req = store.getAll();
          req.onsuccess = () => {
            const records = (req.result || []) as StorageRecord<T>[];
            resolve(records.map(r => r.data));
          };
          req.onerror = () => resolve([]);
        } catch {
          resolve([]);
        }
      });
    } else {
      const results: T[] = [];
      this.memoryFallback.forEach((rec, key) => {
        if (key.startsWith(`${table}:`)) {
          results.push(rec.data);
        }
      });
      return results;
    }
  }

  public async deleteItem(table: string, id: string): Promise<boolean> {
    if (!this.db) {
      await this.initDB();
    }

    if (this.db && this.db.objectStoreNames.contains(table)) {
      return new Promise((resolve) => {
        try {
          const tx = this.db!.transaction(table, 'readwrite');
          const store = tx.objectStore(table);
          const req = store.delete(id);
          req.onsuccess = () => resolve(true);
          req.onerror = () => resolve(false);
        } catch {
          this.memoryFallback.delete(`${table}:${id}`);
          resolve(true);
        }
      });
    } else {
      this.memoryFallback.delete(`${table}:${id}`);
      return Promise.resolve(true);
    }
  }

  public async clearTable(table: string): Promise<boolean> {
    if (!this.db) {
      await this.initDB();
    }

    if (this.db && this.db.objectStoreNames.contains(table)) {
      return new Promise((resolve) => {
        try {
          const tx = this.db!.transaction(table, 'readwrite');
          const store = tx.objectStore(table);
          const req = store.clear();
          req.onsuccess = () => resolve(true);
          req.onerror = () => resolve(false);
        } catch {
          const toDel: string[] = [];
          this.memoryFallback.forEach((_, key) => {
            if (key.startsWith(`${table}:`)) toDel.push(key);
          });
          toDel.forEach((k) => this.memoryFallback.delete(k));
          resolve(true);
        }
      });
    } else {
      const toDel: string[] = [];
      this.memoryFallback.forEach((_, key) => {
        if (key.startsWith(`${table}:`)) toDel.push(key);
      });
      toDel.forEach((k) => this.memoryFallback.delete(k));
      return Promise.resolve(true);
    }
  }

  public async migrateFromLocalStorage(): Promise<{ migratedCards: number; migratedProgress: boolean }> {
    if (typeof window === 'undefined' || !window.localStorage) {
      return { migratedCards: 0, migratedProgress: false };
    }

    let migratedCards = 0;
    let migratedProgress = false;

    try {
      // 1. Migrate FSRS Cards (nn_cards)
      const rawCards = localStorage.getItem('nn_cards');
      if (rawCards) {
        const cardsObj = JSON.parse(rawCards);
        for (const [cardId, cardData] of Object.entries(cardsObj)) {
          await this.setItem('srs_cards', cardId, cardData);
          migratedCards++;
        }
      }

      // 2. Migrate Curriculum Progress (nn_curriculum_progress_v2)
      const rawProgress = localStorage.getItem('nn_curriculum_progress_v2');
      if (rawProgress) {
        const progressObj = JSON.parse(rawProgress);
        await this.setItem('user_progress', 'curriculum_progress', progressObj);
        migratedProgress = true;
      }
    } catch (err) {
      console.warn('[storageBridge] Migration from localStorage error:', err);
    }

    return { migratedCards, migratedProgress };
  }
}

export const storageBridge = new StorageBridgeService();
