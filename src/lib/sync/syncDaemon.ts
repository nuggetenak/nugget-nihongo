// ══════════════════════════════════════════════════════════════════
//  syncDaemon.ts — Reconnection Synchronization Daemon
//  Manages background sync intervals, network reconnection triggers,
//  and throttles cloud replication to conserve battery & bandwidth
// ══════════════════════════════════════════════════════════════════

export type AuthStoreGetter = () => { user: any; syncNow: () => Promise<void>; syncStatus: string };

let customAuthGetter: AuthStoreGetter | null = null;

export function setSyncDaemonAuthGetter(getter: AuthStoreGetter | null): void {
  customAuthGetter = getter;
}

export class SyncDaemon {
  private isRunning = false;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private lastTriggerTime = 0;
  private minIntervalMs = 15000; // 15 seconds minimum throttle between syncs
  private defaultIntervalMs = 300000; // 5 minutes periodic sync
  private triggerCount = 0;
  private isSyncInProgress = false;

  /**
   * Starts the sync daemon listeners and periodic heartbeat timer.
   */
  public start(customIntervalMs?: number): void {
    if (this.isRunning) return;

    const interval = Math.max(1000, Number.isFinite(customIntervalMs) ? customIntervalMs! : this.defaultIntervalMs);

    if (typeof window !== 'undefined') {
      // 1. Reconnect listener
      window.addEventListener('online', this.handleOnline);

      // 2. Visibility change listener (reconnect when tab is focused)
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }

    // 3. Periodic timer
    this.intervalId = setInterval(() => {
      this.triggerSync('periodic_heartbeat');
    }, interval);

    this.isRunning = true;
  }

  public setMinInterval(ms: number): void {
    this.minIntervalMs = Math.max(0, Number.isFinite(ms) ? ms : 15000);
  }

  /**
   * Stops the daemon and tears down listeners.
   */
  public stop(): void {
    if (!this.isRunning) return;

    if (typeof window !== 'undefined') {
      window.removeEventListener('online', this.handleOnline);
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }

    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.isRunning = false;
  }

  private handleOnline = (): void => {
    this.triggerSync('network_online');
  };

  private handleVisibilityChange = (): void => {
    if (document.visibilityState === 'visible' && navigator.onLine) {
      this.triggerSync('tab_visible');
    }
  };

  /**
   * Dispatches cloud sync if authenticated and not throttled.
   */
  public async triggerSync(reason = 'manual', force = false): Promise<boolean> {
    const now = Date.now();
    if (!force && this.lastTriggerTime > 0 && now >= this.lastTriggerTime && now - this.lastTriggerTime < this.minIntervalMs) {
      return false; // Throttled
    }

    if (this.isSyncInProgress) {
      return false; // Already executing a sync
    }

    // Immediately reserve timestamp to guard against concurrent tick collisions
    this.lastTriggerTime = now;

    let user: any = null;
    let syncNow: (() => Promise<void>) | null = null;
    let syncStatus = 'idle';

    if (customAuthGetter) {
      try {
        const state = customAuthGetter();
        if (state) {
          user = state.user;
          syncNow = state.syncNow;
          syncStatus = state.syncStatus;
        }
      } catch {
        return false;
      }
    } else {
      try {
        const mod = await import('../supabase/authStore');
        const state = mod.useAuthStore.getState();
        user = state.user;
        syncNow = state.syncNow;
        syncStatus = state.syncStatus;
      } catch {
        return false;
      }
    }

    // Check network connectivity: guard against offline state (!navigator.onLine) while tolerating undefined in Node/SSR runtimes
    const isOffline = typeof navigator !== 'undefined' && (navigator.onLine === false || (navigator.onLine !== undefined && !navigator.onLine));
    if (!user || !syncNow || syncStatus === 'syncing' || isOffline) {
      return false;
    }

    this.isSyncInProgress = true;
    this.triggerCount++;

    try {
      await syncNow();
      return true;
    } catch (e) {
      console.warn(`[syncDaemon] Sync triggered by ${reason} failed:`, e);
      return false;
    } finally {
      this.isSyncInProgress = false;
    }
  }

  public getStatus(): { isRunning: boolean; lastTriggerTime: number; triggerCount: number; isSyncInProgress: boolean } {
    return {
      isRunning: this.isRunning,
      lastTriggerTime: this.lastTriggerTime,
      triggerCount: this.triggerCount,
      isSyncInProgress: this.isSyncInProgress,
    };
  }

  public reset(): void {
    this.stop();
    this.lastTriggerTime = 0;
    this.triggerCount = 0;
    this.isSyncInProgress = false;
  }
}

export const syncDaemon = new SyncDaemon();
