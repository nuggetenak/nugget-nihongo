// ══════════════════════════════════════════════════════════════════
//  useFocusTrap.ts — Accessible Keyboard Focus Trap for Modals & Dialogs
//  Ticket T-216: Universal Modal Focus Trap & Keyboard Escape Hook
//  Complies with WCAG 2.1 SC 2.4.3 (Focus Order) & SC 2.1.2 (No Keyboard Trap)
// ══════════════════════════════════════════════════════════════════

import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Custom hook to trap keyboard focus within an active dialog or drawer,
 * intercept Escape key for dismissal, and restore previous focus on close.
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(
  isActive: boolean,
  onClose?: () => void
) {
  const containerRef = useRef<T | null>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // Cache previously focused element to restore when modal closes
    previousActiveElement.current = document.activeElement as HTMLElement | null;

    const el = containerRef.current;
    if (!el) return;

    // Focus first focusable child after microtask to ensure elements are mounted
    const focusTimer = setTimeout(() => {
      const focusable = el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }, 16);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key handles graceful dialog close
      if (e.key === 'Escape' && onClose) {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusableEls = el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
      if (focusableEls.length === 0) return;

      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        // Shift + Tab: if on first element, cycle to last
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        // Tab: if on last element, cycle to first
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
    };
  }, [isActive, onClose]);

  return containerRef;
}

export default useFocusTrap;
