// ══════════════════════════════════════════════════════════════════
//  viewTransition.ts — W3C View Transitions API Progressive Enhancement
//  Research Basis: Ticket T-52, Smooth Layout Morphing & Zero Reflow
// ══════════════════════════════════════════════════════════════════

/**
 * Executes a state update with native W3C View Transitions if supported,
 * falling back gracefully to synchronous execution in unsupported browsers.
 */
export function withViewTransition(updateFn: () => void | Promise<void>): Promise<void> {
  if (typeof document === 'undefined') {
    updateFn();
    return Promise.resolve();
  }

  // Respect user's prefers-reduced-motion OS preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const docWithTransition = document as unknown as {
    startViewTransition?: (callback: () => void | Promise<void>) => {
      finished: Promise<void>;
      ready: Promise<void>;
      updateCallbackDone: Promise<void>;
    };
  };

  if (docWithTransition.startViewTransition && !prefersReducedMotion) {
    try {
      const transition = docWithTransition.startViewTransition(async () => {
        await updateFn();
      });
      if (transition) {
        if (transition.ready && typeof transition.ready.catch === 'function') {
          transition.ready.catch(() => {});
        }
        if (transition.updateCallbackDone && typeof transition.updateCallbackDone.catch === 'function') {
          transition.updateCallbackDone.catch(() => {});
        }
        if (transition.finished && typeof transition.finished.catch === 'function') {
          return transition.finished.catch(() => {});
        }
      }
      return Promise.resolve();
    } catch {
      updateFn();
      return Promise.resolve();
    }
  }

  // Graceful fallback: synchronous or promise-based execution
  const res = updateFn();
  if (res instanceof Promise) {
    return res.catch(() => {});
  }
  return Promise.resolve();
}
