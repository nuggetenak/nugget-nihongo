// ══════════════════════════════════════════════════════════════════
//  useSwipeGesture.ts — Touch Swipe Physics for Mobile Flashcards
//  Swipe Left = Hafal (Green) | Right = Lupa (Red) | Down = Ragu (Amber)
// ══════════════════════════════════════════════════════════════════

import { useState, useRef, useCallback } from 'react';

export type SwipeDirection = 'left' | 'right' | 'down' | null;

interface UseSwipeGestureOptions {
  threshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeDown?: () => void;
  enabled?: boolean;
}

export function useSwipeGesture({
  threshold = 60,
  onSwipeLeft,
  onSwipeRight,
  onSwipeDown,
  enabled = true,
}: UseSwipeGestureOptions) {
  const [swipeHint, setSwipeHint] = useState<SwipeDirection>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const isSwiping = useRef(false);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!enabled) return;
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
      isSwiping.current = true;
    },
    [enabled]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isSwiping.current || !enabled) return;
      const dx = e.touches[0].clientX - startX.current;
      const dy = e.touches[0].clientY - startY.current;
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);

      if (adx < 15 && ady < 15) {
        setSwipeHint(null);
        return;
      }

      if (adx > ady) {
        if (dx < -30) setSwipeHint('left');
        else if (dx > 30) setSwipeHint('right');
        else setSwipeHint(null);
      } else {
        if (dy > 30) setSwipeHint('down');
        else setSwipeHint(null);
      }
    },
    [enabled]
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!isSwiping.current || !enabled) {
        isSwiping.current = false;
        setSwipeHint(null);
        return;
      }
      isSwiping.current = false;

      const dx = e.changedTouches[0].clientX - startX.current;
      const dy = e.changedTouches[0].clientY - startY.current;
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);

      setSwipeHint(null);

      if (adx > ady) {
        if (dx < -threshold && onSwipeLeft) {
          onSwipeLeft();
        } else if (dx > threshold && onSwipeRight) {
          onSwipeRight();
        }
      } else {
        if (dy > threshold && onSwipeDown) {
          onSwipeDown();
        }
      }
    },
    [threshold, onSwipeLeft, onSwipeRight, onSwipeDown, enabled]
  );

  return {
    swipeHint,
    touchHandlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}
