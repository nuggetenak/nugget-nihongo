// ══════════════════════════════════════════════════════════════════
//  webVitals.ts — Native In-Browser Core Web Vitals Telemetry Observer
//  Measures LCP, CLS, INP, and TTFB without external heavy dependencies
// ══════════════════════════════════════════════════════════════════

export type MetricRating = 'good' | 'needs-improvement' | 'poor';

export interface WebVitalMetric {
  name: 'LCP' | 'CLS' | 'INP' | 'TTFB';
  value: number;
  rating: MetricRating;
  timestamp: number;
}

export interface WebVitalsSummary {
  lcp?: WebVitalMetric;
  cls?: WebVitalMetric;
  inp?: WebVitalMetric;
  ttfb?: WebVitalMetric;
}

class WebVitalsMonitor {
  private metrics: Map<string, WebVitalMetric> = new Map();
  private isInitialized = false;

  /**
   * Initializes PerformanceObserver listeners for Core Web Vitals.
   */
  public init(): void {
    if (this.isInitialized || typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') {
      return;
    }

    this.observeTTFB();
    this.observeLCP();
    this.observeCLS();
    this.observeINP();

    this.isInitialized = true;
  }

  // 1. Time to First Byte (TTFB)
  private observeTTFB(): void {
    try {
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      if (navEntry) {
        const ttfb = Math.round(navEntry.responseStart);
        this.recordMetric('TTFB', ttfb, this.rateTTFB(ttfb));
      }
    } catch {
      // Navigation timing unsupported
    }
  }

  // 2. Largest Contentful Paint (LCP)
  private observeLCP(): void {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const lcp = Math.round(lastEntry.startTime);
          this.recordMetric('LCP', lcp, this.rateLCP(lcp));
        }
      });
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {
      // LCP observer unsupported
    }
  }

  // 3. Cumulative Layout Shift (CLS)
  private observeCLS(): void {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
          if (!layoutShiftEntry.hadRecentInput && typeof layoutShiftEntry.value === 'number') {
            clsValue += layoutShiftEntry.value;
          }
        }
        const roundedCls = Math.round(clsValue * 1000) / 1000;
        this.recordMetric('CLS', roundedCls, this.rateCLS(roundedCls));
      });
      observer.observe({ type: 'layout-shift', buffered: true });
    } catch {
      // CLS observer unsupported
    }
  }

  // 4. Interaction to Next Paint (INP)
  private observeINP(): void {
    try {
      let maxDuration = 0;
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.duration > maxDuration) {
            maxDuration = Math.round(entry.duration);
            this.recordMetric('INP', maxDuration, this.rateINP(maxDuration));
          }
        }
      });
      observer.observe({ type: 'event', buffered: true, durationThreshold: 16 } as any);
    } catch {
      // Event timing unsupported
    }
  }

  public recordMetric(name: WebVitalMetric['name'], value: number, rating: MetricRating): void {
    const metric: WebVitalMetric = {
      name,
      value,
      rating,
      timestamp: Date.now(),
    };
    this.metrics.set(name, metric);
  }

  // ── Google Core Web Vitals Threshold Rating Helpers ─────────────
  public rateLCP(value: number): MetricRating {
    if (value <= 2500) return 'good';
    if (value <= 4000) return 'needs-improvement';
    return 'poor';
  }

  public rateCLS(value: number): MetricRating {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }

  public rateINP(value: number): MetricRating {
    if (value <= 200) return 'good';
    if (value <= 500) return 'needs-improvement';
    return 'poor';
  }

  public rateTTFB(value: number): MetricRating {
    if (value <= 800) return 'good';
    if (value <= 1800) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Returns snapshot of current Core Web Vitals metrics.
   */
  public getMetricsSummary(): WebVitalsSummary {
    return {
      lcp: this.metrics.get('LCP'),
      cls: this.metrics.get('CLS'),
      inp: this.metrics.get('INP'),
      ttfb: this.metrics.get('TTFB'),
    };
  }

  /**
   * Resets metrics map (primarily for unit testing).
   */
  public reset(): void {
    this.metrics.clear();
  }
}

export const webVitals = new WebVitalsMonitor();
