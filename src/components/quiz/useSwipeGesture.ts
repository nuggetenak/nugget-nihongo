// ══════════════════════════════════════════════════════════════════
//  useSwipeGesture.ts — Kinematic Touch Swipe Physics for Mobile Flashcards
//  Swipe Left = Hafal / Sudah (Green) | Right = Lupa / Belum (Red)
//  Research Basis: Tickets T-221 to T-224 (Sprint 41)
//  Features:
//  - Synthetic click suppression lock (350ms window)
//  - Angular direction locking (arctan2: theta > 30 deg locks horizontal, preserves vertical scroll)
//  - iOS Safari edge-swipe margin protection (24px guard)
//  - Kinematic velocity calculus (v = dx / dt, detects 35px flicks >= 0.5px/ms)
//  - Real-time drag coordinates & Web Vibration API tactile haptic pulses
// ══════════════════════════════════════════════════════════════════

import { useState, useRef, useCallback } from 'react';

export type SwipeDirection = 'left' | 'right' | 'down' | null;

export interface DragOffset {
  x: number;
  y: number;
}

export interface UseSwipeGestureOptions {
  threshold?: number;
  velocityThreshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeDown?: () => void;
  enabled?: boolean;
}

export interface UseSwipeGestureReturn {
  swipeHint: SwipeDirection;
  dragOffset: DragOffset;
  isDragging: boolean;
  wasRecentlySwiped: () => boolean;
  touchHandlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
    onTouchCancel: (e: React.TouchEvent) => void;
  };
}

// Web Vibration API tactile haptic helper with error boundary
export function triggerHaptic(pattern: number | number[]): void {
  try {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  } catch {
    // Non-blocking fallback on unsupported platforms / Safari
  }
}

export function useSwipeGesture({
  threshold = 60,
  velocityThreshold = 0.5,
  onSwipeLeft,
  onSwipeRight,
  onSwipeDown,
  enabled = true,
}: UseSwipeGestureOptions): UseSwipeGestureReturn {
  const [swipeHint, setSwipeHint] = useState<SwipeDirection>(null);
  const [dragOffset, setDragOffset] = useState<DragOffset>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const touchStartTime = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);
  const isEdgeTouch = useRef<boolean>(false);
  const wasSwipedRef = useRef<boolean>(false);
  const lastSwipeTimestamp = useRef<number>(0);
  const hasHapticFiredRef = useRef<boolean>(false);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!enabled || e.touches.length !== 1) return;

      const clientX = e.touches[0].clientX;
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 375;

      // Ticket T-223: iOS Safari Edge-Swipe Guard (preserve native swipe back/forward gestures)
      if (clientX < 24 || clientX > screenWidth - 24) {
        isEdgeTouch.current = true;
        isSwiping.current = false;
        return;
      }

      isEdgeTouch.current = false;
      startX.current = clientX;
      startY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
      isSwiping.current = true;
      hasHapticFiredRef.current = false;
      setDragOffset({ x: 0, y: 0 });
    },
    [enabled]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isSwiping.current || !enabled || isEdgeTouch.current || e.touches.length !== 1) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const dx = currentX - startX.current;
      const dy = currentY - startY.current;
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);

      // Dead-zone check to ignore micro-jitters
      if (adx < 10 && ady < 10) {
        setSwipeHint(null);
        setDragOffset({ x: 0, y: 0 });
        setIsDragging(false);
        return;
      }

      // Ticket T-46 & T-222: Strict Angular Direction Locking & 1.5x Axis Dominance Decoupling
      // theta = arctan2(|dy|, |dx|) in degrees (0 = pure horizontal, 90 = pure vertical)
      const angleDeg = (Math.atan2(ady, adx) * 180) / Math.PI;

      // If vertical movement is dominant (theta > 30 deg or ady > adx * 1.5), lock out horizontal swipe triggers
      // to let native vertical scrolling proceed unimpeded
      if (angleDeg > 30 || ady > adx * 1.5) {
        // Only allow down-swipe hint if onSwipeDown was explicitly provided AND angle > 65 deg
        if (onSwipeDown && angleDeg > 65 && dy > 30 && ady > adx * 1.5) {
          setSwipeHint('down');
          setDragOffset({ x: 0, y: dy });
          setIsDragging(true);
        } else {
          setSwipeHint(null);
          setDragOffset({ x: 0, y: 0 });
          setIsDragging(false);
        }
        return;
      }

      // Horizontal swipe dominant (adx > ady * 1.5 and theta <= 30 deg)
      if (adx > ady * 1.5 && angleDeg <= 30) {
        setIsDragging(true);
        setDragOffset({ x: dx, y: dy * 0.3 }); // Dampen vertical motion during horizontal drag
      }

      const dt = Math.max(1, Date.now() - touchStartTime.current);
      const vx = adx / dt;
      const isThresholdMet = adx >= threshold || (adx >= 30 && vx >= velocityThreshold);

      if (dx < -15) {
        setSwipeHint('left');
      } else if (dx > 15) {
        setSwipeHint('right');
      } else {
        setSwipeHint(null);
      }

      // Ticket T-224: Web Vibration API milestone haptic pulse on threshold crossing
      if (isThresholdMet) {
        if (!hasHapticFiredRef.current) {
          triggerHaptic(12);
          hasHapticFiredRef.current = true;
        }
      } else {
        hasHapticFiredRef.current = false;
      }
    },
    [enabled, onSwipeDown, threshold, velocityThreshold]
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!isSwiping.current || !enabled || isEdgeTouch.current) {
        isSwiping.current = false;
        isEdgeTouch.current = false;
        setIsDragging(false);
        setSwipeHint(null);
        setDragOffset({ x: 0, y: 0 });
        return;
      }

      isSwiping.current = false;
      setIsDragging(false);
      setSwipeHint(null);
      setDragOffset({ x: 0, y: 0 });

      if (e.changedTouches.length === 0) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const dx = endX - startX.current;
      const dy = endY - startY.current;
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);
      const angleDeg = (Math.atan2(ady, adx) * 180) / Math.PI;

      const dt = Math.max(1, Date.now() - touchStartTime.current);
      const vx = dx / dt; // velocity in px/ms
      const avx = Math.abs(vx);

      // Ticket T-46, T-222, T-223: Kinematic Velocity Calculus & 1.5x Axis Decoupling
      // Swipe accepted if:
      // (1) Distance >= threshold (e.g. 60px) OR
      // (2) Quick flick: Distance >= 30px AND velocity >= velocityThreshold (0.5 px/ms)
      const isHorizontalFlick = adx > ady * 1.5 && angleDeg <= 30 && (adx >= threshold || (adx >= 30 && avx >= velocityThreshold));

      if (isHorizontalFlick) {
        // Ticket T-221: Synthetic Click Double-Flip Bug Eradication
        wasSwipedRef.current = true;
        lastSwipeTimestamp.current = Date.now();
        triggerHaptic([10, 30, 15]);

        if (dx < 0 && onSwipeLeft) {
          onSwipeLeft();
        } else if (dx > 0 && onSwipeRight) {
          onSwipeRight();
        }

        // Maintain click suppression lock for 350ms
        setTimeout(() => {
          wasSwipedRef.current = false;
        }, 350);
        return;
      }

      // Explicit down-swipe check (only if onSwipeDown provided, ady > adx * 1.5, and angle > 65 deg)
      if (onSwipeDown && ady > adx * 1.5 && angleDeg > 65 && dy >= threshold) {
        wasSwipedRef.current = true;
        lastSwipeTimestamp.current = Date.now();
        triggerHaptic([10, 30, 15]);
        onSwipeDown();
        setTimeout(() => {
          wasSwipedRef.current = false;
        }, 350);
      }
    },
    [enabled, onSwipeLeft, onSwipeRight, onSwipeDown, threshold, velocityThreshold]
  );

  const onTouchCancel = useCallback(() => {
    isSwiping.current = false;
    isEdgeTouch.current = false;
    setIsDragging(false);
    setSwipeHint(null);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  const wasRecentlySwiped = useCallback(() => {
    return wasSwipedRef.current || Date.now() - lastSwipeTimestamp.current < 350;
  }, []);

  return {
    swipeHint,
    dragOffset,
    isDragging,
    wasRecentlySwiped,
    touchHandlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTouchCancel,
    },
  };
}
