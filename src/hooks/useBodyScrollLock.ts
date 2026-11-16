// ══════════════════════════════════════════════════════════════════
//  useBodyScrollLock.ts — Reference-Counted Background Body Scroll Lock
//  Research Basis: Ticket T-45, Prevents Background Scrolling & iOS Overscroll
// ══════════════════════════════════════════════════════════════════

import { useEffect } from 'react';

let lockCount = 0;
let originalOverflow = '';

export function lockBodyScroll() {
  if (typeof document === 'undefined') return;
  if (lockCount === 0) {
    originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount++;
}

export function unlockBodyScroll() {
  if (typeof document === 'undefined') return;
  lockCount--;
  if (lockCount <= 0) {
    lockCount = 0;
    document.body.style.overflow = originalOverflow;
  }
}

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      lockBodyScroll();
      return () => {
        unlockBodyScroll();
      };
    }
  }, [isLocked]);
}
