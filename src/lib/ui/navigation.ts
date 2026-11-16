// ══════════════════════════════════════════════════════════════════
//  navigation.ts — Native View Transitions API Engine for Route Swapping
//  Ticket T-228: Fluid 60fps Route & Tab Swapping with Graceful Fallback
//  Refinement: Per-Tab Scroll Memory & Seamless State Preservation
// ══════════════════════════════════════════════════════════════════

import { AppState } from '../../store/useAppStore';
import { withViewTransition } from './viewTransition';
import { announcer } from '../a11y/announcer';

// Per-Tab Scroll Position Cache
const tabScrollMemory: Record<string, number> = {};

export function getTabScrollMemory(tab: string): number {
  return tabScrollMemory[tab] ?? 0;
}

export function setTabScrollMemory(tab: string, scrollY: number): void {
  tabScrollMemory[tab] = scrollY;
}

export function clearTabScrollMemory(): void {
  Object.keys(tabScrollMemory).forEach((k) => delete tabScrollMemory[k]);
}

/**
 * Triggers a fluid, hardware-accelerated tab change using W3C View Transitions API
 * and preserves / restores per-tab scroll positions seamlessly.
 */
export function transitionTabChange(
  newTab: AppState['activeTab'],
  setter: (tab: AppState['activeTab']) => void,
  currentTab?: AppState['activeTab']
): void {
  if (typeof window !== 'undefined') {
    const fromTab = currentTab || (window as any).__nn_active_tab;
    if (fromTab) {
      tabScrollMemory[fromTab] = window.scrollY || document.documentElement.scrollTop || 0;
    }
  }

  withViewTransition(() => {
    setter(newTab);
    announcer.announce(`Membuka tab ${newTab}`, 'polite');
    if (typeof window !== 'undefined') {
      (window as any).__nn_active_tab = newTab;
      const targetScroll = tabScrollMemory[newTab] ?? 0;
      if (targetScroll === 0) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        requestAnimationFrame(() => {
          window.scrollTo({ top: targetScroll, behavior: 'instant' });
        });
      }
    }
  });
}
