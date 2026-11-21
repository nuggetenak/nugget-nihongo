// ══════════════════════════════════════════════════════════════════
//  broadcastSync.ts — Multi-Tab Cross-Process Synchronization Bus
//  Synchronizes real-time state changes across open browser tabs via BroadcastChannel
// ══════════════════════════════════════════════════════════════════

export type CrossTabEventType =
  | 'SRS_REVIEW_COMPLETED'
  | 'XP_UPDATED'
  | 'STREAK_UPDATED'
  | 'CAT_COMPLETED'
  | 'THEME_CHANGED'
  | 'LEVEL_CHANGED'
  | 'SYNC_TRIGGERED'
  | 'GARDEN_UPDATED'
  | 'GAMIFICATION_UPDATED';

export interface CrossTabEvent {
  type: CrossTabEventType;
  payload?: any;
  originTabId: string;
  timestamp: number;
}

export class BroadcastSyncBus {
  private channel: BroadcastChannel | null = null;
  private tabId: string;
  private listeners: Set<(event: CrossTabEvent) => void> = new Set();
  private recentEventKeys: Set<string> = new Set();
  private maxRecentKeys = 100;
  private isInitialized = false;

  constructor(customTabId?: string) {
    this.tabId = customTabId || Math.random().toString(36).substring(2, 9);
  }

  public handleStorageEvent = (storageEvent: StorageEvent): void => {
    if (storageEvent.key === 'nn_cross_tab_message' && storageEvent.newValue) {
      try {
        const event = JSON.parse(storageEvent.newValue) as CrossTabEvent;
        if (event && typeof event === 'object' && event.originTabId && event.originTabId !== this.tabId) {
          this.notifyListeners(event);
        }
      } catch {}
    }
  };

  /**
   * Initializes BroadcastChannel with window storage event fallback.
   */
  public init(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.channel = new BroadcastChannel('nn_cross_tab_sync');
        this.channel.onmessage = (messageEvent) => {
          const event = messageEvent.data as CrossTabEvent;
          if (event && event.originTabId !== this.tabId) {
            this.notifyListeners(event);
          }
        };
      } catch (err) {
        console.warn('[broadcastSync] BroadcastChannel initialization failed:', err);
      }
    }

    // Fallback: storage event listener for cross-tab notifications
    window.addEventListener('storage', this.handleStorageEvent);

    this.isInitialized = true;
  }

  /**
   * Cleans up channel listeners and destroys the sync bus instance.
   */
  public destroy(): void {
    if (this.channel) {
      try {
        this.channel.close();
      } catch {}
      this.channel = null;
    }

    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.handleStorageEvent);
    }

    this.listeners.clear();
    this.recentEventKeys.clear();
    this.isInitialized = false;
  }

  public isReady(): boolean {
    return this.isInitialized;
  }

  public getListenerCount(): number {
    return this.listeners.size;
  }

  public isDuplicate(event: CrossTabEvent): boolean {
    if (!event || typeof event !== 'object' || !event.type) return false;
    const eventKey = `${event.originTabId}:${event.timestamp}:${event.type}`;
    return this.recentEventKeys.has(eventKey);
  }

  /**
   * Broadcasts an event to all other open tabs.
   */
  public broadcast(type: CrossTabEventType, payload?: any): void {
    if (!type || typeof type !== 'string') return;
    const event: CrossTabEvent = {
      type,
      payload,
      originTabId: this.tabId,
      timestamp: Date.now(),
    };

    if (this.channel) {
      try {
        this.channel.postMessage(event);
      } catch {}
    }

    // Storage fallback trigger
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('nn_cross_tab_message', JSON.stringify(event));
      } catch {}
    }
  }

  /**
   * Subscribes to events dispatched by other tabs.
   */
  public subscribe(handler: (event: CrossTabEvent) => void): () => void {
    this.listeners.add(handler);
    return () => {
      this.listeners.delete(handler);
    };
  }

  public notifyListeners(event: CrossTabEvent): void {
    if (!event || typeof event !== 'object' || !event.type || event.originTabId === this.tabId) return;

    // Deduplicate identical events received via multiple transports (BroadcastChannel + storageEvent fallback)
    const eventKey = `${event.originTabId}:${event.timestamp}:${event.type}`;
    if (this.recentEventKeys.has(eventKey)) {
      return;
    }

    this.recentEventKeys.add(eventKey);
    if (this.recentEventKeys.size > this.maxRecentKeys) {
      const first = this.recentEventKeys.values().next().value;
      if (first) this.recentEventKeys.delete(first);
    }

    for (const listener of this.listeners) {
      try {
        listener(event);
      } catch (err) {
        console.error('[broadcastSync] Listener error:', err);
      }
    }
  }

  public getTabId(): string {
    return this.tabId;
  }
}

export const broadcastSync = new BroadcastSyncBus();
