// ══════════════════════════════════════════════════════════════════
//  useBodyScrollLock.ts — Reference-Counted Background Body Scroll Lock
//  Research Basis: Ticket T-45, Prevents Background Scrolling & iOS Overscroll
// ══════════════════════════════════════════════════════════════════

import { useEffect } from 'react';

let lockCount = 0;
let originalOverflow = '';

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isLocked) {
      if (lockCount === 0) {
        originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
      lockCount++;
    }

    return () => {
      if (isLocked) {
        lockCount--;
        if (lockCount <= 0) {
          lockCount = 0;
          document.body.style.overflow = originalOverflow;
        }
      }
    };
  }, [isLocked]);
}
