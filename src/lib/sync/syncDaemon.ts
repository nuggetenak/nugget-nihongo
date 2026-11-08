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

  /**
   * Starts the sync daemon listeners and periodic heartbeat timer.
   */
  public start(customIntervalMs?: number): void {
    if (this.isRunning || typeof window === 'undefined') return;

    const interval = Math.max(1000, Number.isFinite(customIntervalMs) ? customIntervalMs! : this.defaultIntervalMs);

    // 1. Reconnect listener
    window.addEventListener('online', this.handleOnline);

    // 2. Visibility change listener (reconnect when tab is focused)
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

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
    if (!this.isRunning || typeof window === 'undefined') return;

    window.removeEventListener('online', this.handleOnline);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);

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
  public async triggerSync(reason = 'manual'): Promise<boolean> {
    const now = Date.now();
    if (now - this.lastTriggerTime < this.minIntervalMs) {
      return false; // Throttled
    }

    let user: any = null;
    let syncNow: (() => Promise<void>) | null = null;
    let syncStatus = 'idle';

    if (customAuthGetter) {
      const state = customAuthGetter();
      user = state.user;
      syncNow = state.syncNow;
      syncStatus = state.syncStatus;
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

    if (!user || !syncNow || syncStatus === 'syncing' || (typeof navigator !== 'undefined' && !navigator.onLine)) {
      return false;
    }

    this.lastTriggerTime = now;
    this.triggerCount++;

    try {
      await syncNow();
      return true;
    } catch (e) {
      console.warn(`[syncDaemon] Sync triggered by ${reason} failed:`, e);
      return false;
    }
  }

  public getStatus(): { isRunning: boolean; lastTriggerTime: number; triggerCount: number } {
    return {
      isRunning: this.isRunning,
      lastTriggerTime: this.lastTriggerTime,
      triggerCount: this.triggerCount,
    };
  }

  public reset(): void {
    this.stop();
    this.lastTriggerTime = 0;
    this.triggerCount = 0;
  }
}

export const syncDaemon = new SyncDaemon();
