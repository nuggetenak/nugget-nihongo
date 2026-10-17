// ══════════════════════════════════════════════════════════════════
//  diagnostics.ts — Global Window Error & Promise Trap with In-Memory
//  Diagnostic Ring Buffer (Ticket T-215)
//  Maintains up to 50 latest operational events, errors, and route
//  transitions; generates formatted diagnostics reports for support.
// ══════════════════════════════════════════════════════════════════

import { APP_VERSION } from '../../config/version';
import { scrubSensitiveData } from '../telemetry/errorReporter';

export type DiagnosticLogType = 'error' | 'unhandledrejection' | 'warn' | 'navigation' | 'info' | 'storage';

export interface DiagnosticLog {
  id: string;
  timestamp: string;
  type: DiagnosticLogType;
  message: string;
  stack?: string;
  metadata?: Record<string, any>;
}

class DiagnosticsManager {
  private readonly MAX_LOGS = 50;
  private ringBuffer: DiagnosticLog[] = [];
  private isInitialized = false;

  /**
   * Adds an event to the circular diagnostic ring buffer.
   */
  public addLog(
    type: DiagnosticLogType,
    message: string,
    stack?: string,
    metadata?: Record<string, any>
  ): DiagnosticLog {
    const log: DiagnosticLog = {
      id: `diag_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      type,
      message: scrubSensitiveData(message || 'No message provided'),
      stack: stack ? scrubSensitiveData(stack) : undefined,
      metadata: metadata ? JSON.parse(scrubSensitiveData(JSON.stringify(metadata))) : undefined,
    };

    this.ringBuffer.push(log);
    if (this.ringBuffer.length > this.MAX_LOGS) {
      this.ringBuffer.shift();
    }

    return log;
  }

  /**
   * Returns a copy of the recorded diagnostic logs.
   */
  public getLogs(): DiagnosticLog[] {
    return [...this.ringBuffer];
  }

  /**
   * Clears in-memory logs (primarily for testing or reset).
   */
  public clearLogs(): void {
    this.ringBuffer = [];
  }

  /**
   * Generates a comprehensive, privacy-scrubbed diagnostic markdown report.
   */
  public getReportString(): string {
    const now = new Date().toISOString();
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Server / Headless';
    const language = typeof navigator !== 'undefined' ? navigator.language : 'Unknown';
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    const viewport = typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'N/A';
    const screenRes = typeof window !== 'undefined' && window.screen ? `${window.screen.width}x${window.screen.height}` : 'N/A';
    const currentUrl = typeof window !== 'undefined' ? scrubSensitiveData(window.location.href) : 'N/A';

    // Collect localStorage metrics safely
    let storageStats = 'N/A';
    if (typeof localStorage !== 'undefined') {
      try {
        const totalKeys = localStorage.length;
        const hasCards = !!localStorage.getItem('nn_fsrs_cards');
        const streak = localStorage.getItem('nn_streak') || '0';
        const xp = localStorage.getItem('nn_xp') || '0';
        storageStats = `Total Keys: ${totalKeys}, Has FSRS Cards: ${hasCards}, Streak: ${streak}, XP: ${xp}`;
      } catch {
        storageStats = 'LocalStorage access blocked';
      }
    }

    const recentLogs = this.ringBuffer.slice(-20);
    const logEntriesFormatted = recentLogs.length > 0
      ? recentLogs.map((l, i) => {
          let line = `[${i + 1}] ${l.timestamp} [${l.type.toUpperCase()}] ${l.message}`;
          if (l.stack) {
            line += `\n    Stack: ${l.stack.split('\n').slice(0, 3).join(' ')}`;
          }
          return line;
        }).join('\n')
      : 'No diagnostic events recorded.';

    return `=== NUGGET NIHONGO DIAGNOSTIC REPORT ===
Version: v${APP_VERSION}
Generated: ${now}
URL: ${currentUrl}
Viewport: ${viewport} (Screen: ${screenRes})
User Agent: ${userAgent}
Locale: ${language}
Online Status: ${isOnline ? 'ONLINE' : 'OFFLINE'}
Storage Metrics: ${storageStats}

--- RECENT EVENTS & LOGS (${recentLogs.length}/${this.ringBuffer.length}) ---
${logEntriesFormatted}
========================================`;
  }

  /**
   * Initializes global window error and unhandled rejection listeners,
   * and exposes `window.__getNuggetDiagnostics`.
   */
  public init(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    // Attach global JavaScript error listener
    window.addEventListener('error', (event) => {
      this.addLog(
        'error',
        event.message || 'Script error',
        event.error?.stack,
        {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        }
      );
    });

    // Attach unhandled promise rejection listener
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason;
      const message = reason instanceof Error ? reason.message : String(reason);
      const stack = reason instanceof Error ? reason.stack : undefined;
      this.addLog('unhandledrejection', `Unhandled Promise Rejection: ${message}`, stack);
    });

    // Attach navigation / hashchange listener
    window.addEventListener('hashchange', () => {
      this.addLog('navigation', `Route changed to ${window.location.hash || '#home'}`);
    });

    // Expose developer and support inspection globals
    (window as any).__getNuggetDiagnostics = () => this.getLogs();
    (window as any).__getNuggetDiagnosticReport = () => this.getReportString();

    this.isInitialized = true;
    this.addLog('info', `Diagnostics engine initialized (v${APP_VERSION})`);
  }
}

export const diagnostics = new DiagnosticsManager();

// Augment Window interface for TypeScript
declare global {
  interface Window {
    __getNuggetDiagnostics?: () => DiagnosticLog[];
    __getNuggetDiagnosticReport?: () => string;
  }
}
