// ══════════════════════════════════════════════════════════════════
//  navigation.ts — Native View Transitions API Engine for Route Swapping
//  Ticket T-228: Fluid 60fps Route & Tab Swapping with Graceful Fallback
// ══════════════════════════════════════════════════════════════════

import { AppState } from '../../store/useAppStore';
import { withViewTransition } from './viewTransition';

/**
 * Triggers a fluid, hardware-accelerated tab change using W3C View Transitions API
 * when supported and allowed by user motion preferences.
 */
export function transitionTabChange(
  newTab: AppState['activeTab'],
  setter: (tab: AppState['activeTab']) => void
): void {
  withViewTransition(() => {
    setter(newTab);
  });
}
