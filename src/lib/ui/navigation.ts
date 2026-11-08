// ══════════════════════════════════════════════════════════════════
//  navigation.ts — Native View Transitions API Engine for Route Swapping
//  Ticket T-228: Fluid 60fps Route & Tab Swapping with Graceful Fallback
// ══════════════════════════════════════════════════════════════════

import { AppState } from '../../store/useAppStore';
import { withViewTransition } from './viewTransition';

/**
 * Triggers a fluid, hardware-accelerated tab change using W3C View Transitions API
 * and guarantees viewport is positioned at the top on every transition.
 */
export function transitionTabChange(
  newTab: AppState['activeTab'],
  setter: (tab: AppState['activeTab']) => void
): void {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
  withViewTransition(() => {
    setter(newTab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  });
}
