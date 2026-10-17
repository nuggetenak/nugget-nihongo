// ══════════════════════════════════════════════════════════════════
//  rateLimiter.ts — Client-Side Rate Limiter & Exponential Backoff
//  Prevents API key exhaustion, token quota draining, and network spam
// ══════════════════════════════════════════════════════════════════

export interface RateLimitPolicy {
  maxRequestsPerMinute: number;
  minIntervalMs: number;
}

const DEFAULT_POLICIES: Record<string, RateLimitPolicy> = {
  sensei_chat: { maxRequestsPerMinute: 20, minIntervalMs: 1500 },
  ai_test_ping: { maxRequestsPerMinute: 6, minIntervalMs: 3000 },
  tts_synth: { maxRequestsPerMinute: 40, minIntervalMs: 400 },
};

class ClientRateLimiter {
  private history: Map<string, number[]> = new Map();
  private lastExecuted: Map<string, number> = new Map();

  /**
   * Checks whether an action is permitted under the active rate limiting policy.
   */
  public canExecute(actionKey: string, customPolicy?: RateLimitPolicy): { allowed: boolean; waitMs: number } {
    const policy = customPolicy || DEFAULT_POLICIES[actionKey] || { maxRequestsPerMinute: 30, minIntervalMs: 1000 };
    const now = Date.now();

    // 1. Check minimum spacing interval
    const lastTime = this.lastExecuted.get(actionKey) || 0;
    const elapsedSinceLast = now - lastTime;
    if (elapsedSinceLast < policy.minIntervalMs) {
      return { allowed: false, waitMs: policy.minIntervalMs - elapsedSinceLast };
    }

    // 2. Check sliding 1-minute window
    const timestamps = (this.history.get(actionKey) || []).filter((t) => now - t < 60000);
    this.history.set(actionKey, timestamps);

    if (timestamps.length >= policy.maxRequestsPerMinute) {
      const oldestInWindow = timestamps[0];
      const waitMs = Math.max(0, 60000 - (now - oldestInWindow));
      return { allowed: false, waitMs };
    }

    return { allowed: true, waitMs: 0 };
  }

  /**
   * Records a successfully dispatched action timestamp.
   */
  public recordExecution(actionKey: string): void {
    const now = Date.now();
    this.lastExecuted.set(actionKey, now);

    const timestamps = (this.history.get(actionKey) || []).filter((t) => now - t < 60000);
    timestamps.push(now);
    this.history.set(actionKey, timestamps);
  }

  /**
   * Calculates exponential backoff delay with random jitter for API retries.
   */
  public calculateBackoffDelay(retryCount: number, baseMs = 1000, maxMs = 15000): number {
    const exponential = baseMs * Math.pow(2, retryCount);
    const jitter = Math.random() * (baseMs * 0.5);
    return Math.min(maxMs, Math.round(exponential + jitter));
  }

  /**
   * Resets execution history for an action key.
   */
  public reset(actionKey?: string): void {
    if (actionKey) {
      this.history.delete(actionKey);
      this.lastExecuted.delete(actionKey);
    } else {
      this.history.clear();
      this.lastExecuted.clear();
    }
  }
}

export const rateLimiter = new ClientRateLimiter();
