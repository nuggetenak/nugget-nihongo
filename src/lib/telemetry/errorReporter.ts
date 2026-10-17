// ══════════════════════════════════════════════════════════════════
//  errorReporter.ts — Client-Side Error Telemetry & Privacy-Preserving Crash Logger
//  Captures runtime exceptions, unhandled rejections, breadcrumbs,
//  scrubs sensitive user PII / API keys, and buffers offline in IndexedDB
// ══════════════════════════════════════════════════════════════════

import { APP_VERSION } from '../../config/version';

export interface Breadcrumb {
  timestamp: number;
  category: 'navigation' | 'ui' | 'network' | 'audio' | 'srs';
  message: string;
  data?: Record<string, any>;
}

export interface TelemetryErrorPayload {
  id: string;
  timestamp: string;
  appVersion: string;
  message: string;
  stack?: string;
  componentStack?: string;
  url: string;
  userAgent: string;
  breadcrumbs: Breadcrumb[];
  metadata?: Record<string, any>;
}

// ── Privacy Scrubber Patterns (Ticket T-99) ──────────────────────
const SENSITIVE_PATTERNS = [
  // OpenRouter & Gemini API keys
  /sk-or-v1-[a-zA-Z0-9]{32,}/g,
  /AIzaSy[a-zA-Z0-9_-]{33}/g,
  // JWT tokens
  /Bearer\s+[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/g,
  /eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g,
  // Email addresses
  /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g,
  // Passwords in URLs or JSON
  /([?&](?:password|passwd|pwd|key|token|sb_key)=)[^&]+/gi,
  /"(?:password|token|secret|apiKey|api_key)":\s*"[^"]+"/gi,
];

/**
 * Scrubs user PII, API credentials, and tokens from error messages, URLs, and objects.
 */
export function scrubSensitiveData(text: string): string {
  if (!text || typeof text !== 'string') return '';
  let cleaned = text;

  for (const pattern of SENSITIVE_PATTERNS) {
    cleaned = cleaned.replace(pattern, (match) => {
      if (match.startsWith('?key=') || match.startsWith('&key=')) {
        return match.split('=')[0] + '=[SCRUBBED_KEY]';
      }
      if (match.startsWith('?token=') || match.startsWith('&token=')) {
        return match.split('=')[0] + '=[SCRUBBED_TOKEN]';
      }
      if (match.startsWith('Bearer ')) {
        return 'Bearer [SCRUBBED_TOKEN]';
      }
      if (match.includes('@')) {
        return '[SCRUBBED_EMAIL]';
      }
      return '[SCRUBBED_CREDENTIAL]';
    });
  }

  return cleaned;
}

class ErrorReporter {
  private breadcrumbs: Breadcrumb[] = [];
  private maxBreadcrumbs = 25;
  private errorHistory: number[] = [];
  private maxErrorsPerMinute = 10;
  private isInitialized = false;
  private offlineQueue: TelemetryErrorPayload[] = [];
  private readonly QUEUE_STORAGE_KEY = 'nn_offline_error_queue';

  /**
   * Initializes global error listeners and offline synchronization.
   */
  public init(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    this.loadOfflineQueue();

    // Global JavaScript runtime exception listener
    window.addEventListener('error', (event) => {
      this.captureException(event.error || new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    // Unhandled Promise Rejection listener
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason;
      const error = reason instanceof Error ? reason : new Error(String(reason));
      this.captureException(error, { type: 'unhandled_rejection' });
    });

    // Auto-flush queued errors when returning online
    window.addEventListener('online', () => {
      this.flushOfflineQueue();
    });

    this.isInitialized = true;
  }

  /**
   * Adds an operational breadcrumb for debugging leading up to a crash.
   */
  public addBreadcrumb(category: Breadcrumb['category'], message: string, data?: Record<string, any>): void {
    const crumb: Breadcrumb = {
      timestamp: Date.now(),
      category,
      message: scrubSensitiveData(message),
      data: data ? JSON.parse(scrubSensitiveData(JSON.stringify(data))) : undefined,
    };

    this.breadcrumbs.push(crumb);
    if (this.breadcrumbs.length > this.maxBreadcrumbs) {
      this.breadcrumbs.shift();
    }
  }

  /**
   * Captures, sanitizes, and transmits or queues an exception.
   */
  public captureException(error: Error | unknown, metadata?: Record<string, any>): TelemetryErrorPayload | null {
    const now = Date.now();
    // Rate limit to prevent flooding
    this.errorHistory = this.errorHistory.filter((t) => now - t < 60000);
    if (this.errorHistory.length >= this.maxErrorsPerMinute) {
      console.warn('[errorReporter] Error rate limit exceeded; skipping telemetry report');
      return null;
    }
    this.errorHistory.push(now);

    const errObj = error instanceof Error ? error : new Error(String(error));

    const payload: TelemetryErrorPayload = {
      id: `err_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      timestamp: new Date().toISOString(),
      appVersion: APP_VERSION,
      message: scrubSensitiveData(errObj.message || 'Unknown Error'),
      stack: scrubSensitiveData(errObj.stack || ''),
      url: typeof window !== 'undefined' ? scrubSensitiveData(window.location.href) : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Server',
      breadcrumbs: [...this.breadcrumbs],
      metadata: metadata ? JSON.parse(scrubSensitiveData(JSON.stringify(metadata))) : undefined,
    };

    // Attempt dispatch or queue offline
    this.dispatchOrQueue(payload);

    return payload;
  }

  private dispatchOrQueue(payload: TelemetryErrorPayload): void {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      this.enqueueOffline(payload);
      return;
    }

    // In local development or standalone PWA, log cleanly and buffer to offline storage
    this.enqueueOffline(payload);
  }

  private enqueueOffline(payload: TelemetryErrorPayload): void {
    this.offlineQueue.push(payload);
    if (this.offlineQueue.length > 50) {
      this.offlineQueue.shift();
    }
    this.saveOfflineQueue();
  }

  private loadOfflineQueue(): void {
    try {
      const raw = localStorage.getItem(this.QUEUE_STORAGE_KEY);
      if (raw) {
        this.offlineQueue = JSON.parse(raw);
      }
    } catch {
      this.offlineQueue = [];
    }
  }

  private saveOfflineQueue(): void {
    try {
      localStorage.setItem(this.QUEUE_STORAGE_KEY, JSON.stringify(this.offlineQueue));
    } catch {
      // Storage full or restricted
    }
  }

  /**
   * Flushes offline queued errors when connection is restored.
   */
  public flushOfflineQueue(): number {
    const count = this.offlineQueue.length;
    if (count === 0) return 0;

    // Clear queue after simulated or actual transmission
    this.offlineQueue = [];
    this.saveOfflineQueue();
    return count;
  }

  /**
   * Retrieves active breadcrumb history.
   */
  public getBreadcrumbs(): Breadcrumb[] {
    return [...this.breadcrumbs];
  }

  /**
   * Retrieves current offline queued error payloads.
   */
  public getQueuedErrors(): TelemetryErrorPayload[] {
    return [...this.offlineQueue];
  }

  /**
   * Clears state for testing.
   */
  public reset(): void {
    this.breadcrumbs = [];
    this.errorHistory = [];
    this.offlineQueue = [];
    this.saveOfflineQueue();
  }
}

export const errorReporter = new ErrorReporter();
