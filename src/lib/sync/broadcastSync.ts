// ══════════════════════════════════════════════════════════════════
//  broadcastSync.ts — Multi-Tab Cross-Process Synchronization Bus
//  Synchronizes real-time state changes across open browser tabs via BroadcastChannel
// ══════════════════════════════════════════════════════════════════

export type CrossTabEventType =
  | 'SRS_REVIEW_COMPLETED'
  | 'XP_UPDATED'
  | 'THEME_CHANGED'
  | 'LEVEL_CHANGED'
  | 'SYNC_TRIGGERED';

export interface CrossTabEvent {
  type: CrossTabEventType;
  payload?: any;
  originTabId: string;
  timestamp: number;
}

class BroadcastSyncBus {
  private channel: BroadcastChannel | null = null;
  private tabId: string = Math.random().toString(36).substring(2, 9);
  private listeners: Set<(event: CrossTabEvent) => void> = new Set();
  private isInitialized = false;

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
    window.addEventListener('storage', (storageEvent) => {
      if (storageEvent.key === 'nn_cross_tab_message' && storageEvent.newValue) {
        try {
          const event = JSON.parse(storageEvent.newValue) as CrossTabEvent;
          if (event && event.originTabId !== this.tabId) {
            this.notifyListeners(event);
          }
        } catch {}
      }
    });

    this.isInitialized = true;
  }

  /**
   * Broadcasts an event to all other open tabs.
   */
  public broadcast(type: CrossTabEventType, payload?: any): void {
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

  private notifyListeners(event: CrossTabEvent): void {
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
