// ══════════════════════════════════════════════════════════════════
//  KanjiCanvas.tsx — Interactive Kanji Touch-Drawing & Pointer Engine
//  High-DPI Retina Scaling • Unified Pointer Events • Vector Normalization
// ══════════════════════════════════════════════════════════════════

import React, {
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';

export interface CanvasPoint {
  x: number;
  y: number;
}

export interface KanjiCanvasHandle {
  /** Clears the canvas buffer */
  clear: () => void;
  /** Returns the points recorded during the current/last stroke */
  getCurrentStrokePoints: () => CanvasPoint[];
  /** Exports canvas as base64 PNG image */
  toDataURL: (type?: string, quality?: number) => string;
  /** Draws an ink dab at normalized coordinates (0..viewBoxSize) */
  drawDab: (pt: CanvasPoint, radius?: number, color?: string) => void;
  /** Draws a line segment between two normalized points */
  drawLine: (p1: CanvasPoint, p2: CanvasPoint, color?: string, lineWidth?: number) => void;
  /** Draws a continuous smooth stroke polyline between multiple normalized points */
  drawStroke: (points: CanvasPoint[], color?: string, lineWidth?: number) => void;
  /** Forces resynchronization of canvas resolution with device pixel ratio */
  syncDpi: () => void;
  /** Direct access to the underlying HTMLCanvasElement */
  getCanvasElement: () => HTMLCanvasElement | null;
}

export interface KanjiCanvasProps {
  /** Target viewBox coordinate dimension (default: 109 to match KanjiVG) */
  viewBoxSize?: number;
  /** Ink stroke color in hex/rgb (default: #F59E0B makie gold) */
  strokeColor?: string;
  /** Stroke line width in CSS pixels (default: 8) */
  lineWidth?: number;
  /** Whether interaction is disabled */
  disabled?: boolean;
  /** Show traditional Japanese 4-quadrant guideline crosshairs */
  showGrid?: boolean;
  /** Custom grid crosshair color */
  gridColor?: string;
  /** Additional CSS class names */
  className?: string;
  /** Optional background color or transparent */
  backgroundColor?: string;
  /** Callback fired when user begins a stroke */
  onStrokeStart?: (point: CanvasPoint, rawEvent: React.PointerEvent<HTMLCanvasElement>) => void;
  /** Callback fired continuously while drawing */
  onStrokeMove?: (point: CanvasPoint, strokePoints: CanvasPoint[], rawEvent: React.PointerEvent<HTMLCanvasElement>) => void;
  /** Callback fired when user lifts pointer / finishes stroke */
  onStrokeEnd?: (strokePoints: CanvasPoint[], rawEvent: React.PointerEvent<HTMLCanvasElement>) => void;
  /** Callback fired if pointer is cancelled (e.g. system alert or gesture interrupted) */
  onStrokeCancel?: () => void;
}

export const KanjiCanvas = forwardRef<KanjiCanvasHandle, KanjiCanvasProps>(
  (
    {
      viewBoxSize = 109,
      strokeColor = '#F59E0B',
      lineWidth = 8,
      disabled = false,
      showGrid = true,
      gridColor = 'rgba(245, 158, 11, 0.12)',
      className = '',
      backgroundColor = 'transparent',
      onStrokeStart,
      onStrokeMove,
      onStrokeEnd,
      onStrokeCancel,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const isDrawingRef = useRef<boolean>(false);
    const activePointerIdRef = useRef<number | null>(null);
    const currentPointsRef = useRef<CanvasPoint[]>([]);

    // Convert screen client coordinates to normalized viewBox (0..109)
    const clientToViewBox = useCallback(
      (clientX: number, clientY: number): CanvasPoint | null => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return null;

        const x = ((clientX - rect.left) / rect.width) * viewBoxSize;
        const y = ((clientY - rect.top) / rect.height) * viewBoxSize;
        return {
          x: Math.max(0, Math.min(viewBoxSize, x)),
          y: Math.max(0, Math.min(viewBoxSize, y)),
        };
      },
      [viewBoxSize]
    );

    // High-DPI synchronization
    const syncDpi = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
    }, []);

    // Draw traditional calligraphy crosshair guidelines (dashed quadrant lines)
    const drawGridGuidelines = useCallback(() => {
      if (!showGrid) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.save();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      // Vertical midline
      ctx.beginPath();
      ctx.moveTo(rect.width / 2, 0);
      ctx.lineTo(rect.width / 2, rect.height);
      ctx.stroke();

      // Horizontal midline
      ctx.beginPath();
      ctx.moveTo(0, rect.height / 2);
      ctx.lineTo(rect.width, rect.height / 2);
      ctx.stroke();

      // Subtle diagonal cross
      ctx.setLineDash([2, 6]);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(rect.width, rect.height);
      ctx.moveTo(rect.width, 0);
      ctx.lineTo(0, rect.height);
      ctx.stroke();

      ctx.restore();
    }, [showGrid, gridColor]);

    // Clear canvas
    const clear = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      if (backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, rect.width, rect.height);
      }
      currentPointsRef.current = [];
    }, [backgroundColor]);

    // Draw an ink dab
    const drawDab = useCallback(
      (pt: CanvasPoint, radius?: number, color = strokeColor) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');
        if (!ctx || rect.width === 0) return;

        const scale = rect.width / viewBoxSize;
        const rad = radius !== undefined ? radius : Math.max(3, rect.width / 36);

        ctx.save();
        ctx.beginPath();
        ctx.arc(pt.x * scale, pt.y * scale, rad, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
      },
      [viewBoxSize, strokeColor]
    );

    // Draw line segment
    const drawLine = useCallback(
      (p1: CanvasPoint, p2: CanvasPoint, color = strokeColor, customWidth?: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');
        if (!ctx || rect.width === 0) return;

        const scale = rect.width / viewBoxSize;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p1.x * scale, p1.y * scale);
        ctx.lineTo(p2.x * scale, p2.y * scale);
        ctx.strokeStyle = color;
        ctx.lineWidth = customWidth !== undefined ? customWidth : Math.max(lineWidth, rect.width / 32);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        ctx.restore();
      },
      [viewBoxSize, strokeColor, lineWidth]
    );

    // Draw continuous smooth stroke polyline
    const drawStroke = useCallback(
      (points: CanvasPoint[], color = strokeColor, customWidth?: number) => {
        if (!points || points.length === 0) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');
        if (!ctx || rect.width === 0) return;

        if (points.length === 1) {
          drawDab(points[0], undefined, color);
          return;
        }

        const scale = rect.width / viewBoxSize;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(points[0].x * scale, points[0].y * scale);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x * scale, points[i].y * scale);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = customWidth !== undefined ? customWidth : Math.max(lineWidth, rect.width / 32);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        ctx.restore();
      },
      [viewBoxSize, strokeColor, lineWidth, drawDab]
    );

    // Resize observer & initial DPI setup
    useEffect(() => {
      syncDpi();
      const canvas = canvasRef.current;
      if (!canvas || typeof ResizeObserver === 'undefined') return;

      const ro = new ResizeObserver(() => {
        syncDpi();
      });
      ro.observe(canvas);

      return () => ro.disconnect();
    }, [syncDpi]);

    // Imperative Handle
    useImperativeHandle(
      ref,
      () => ({
        clear,
        getCurrentStrokePoints: () => [...currentPointsRef.current],
        toDataURL: (type = 'image/png', quality = 0.92) => {
          const canvas = canvasRef.current;
          return canvas ? canvas.toDataURL(type, quality) : '';
        },
        drawDab,
        drawLine,
        drawStroke,
        syncDpi,
        getCanvasElement: () => canvasRef.current,
      }),
      [clear, drawDab, drawLine, drawStroke, syncDpi]
    );

    // Pointer Event Handlers
    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (disabled || isDrawingRef.current) return;
      // Primary pointer only (disallow secondary fingers)
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      const pt = clientToViewBox(e.clientX, e.clientY);
      if (!pt) return;

      const canvas = canvasRef.current;
      if (canvas) {
        try {
          canvas.setPointerCapture(e.pointerId);
          activePointerIdRef.current = e.pointerId;
        } catch (_) {}
      }

      isDrawingRef.current = true;
      currentPointsRef.current = [pt];

      // Draw initial ink dab
      drawDab(pt);

      onStrokeStart?.(pt, e);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawingRef.current) return;
      if (activePointerIdRef.current !== null && e.pointerId !== activePointerIdRef.current) return;

      const pt = clientToViewBox(e.clientX, e.clientY);
      if (!pt) return;

      const pts = currentPointsRef.current;
      const lastPt = pts[pts.length - 1];

      // Prevent redundant micro-movements (< 0.5 viewBox unit)
      if (lastPt) {
        const dx = pt.x - lastPt.x;
        const dy = pt.y - lastPt.y;
        if (dx * dx + dy * dy < 0.25) return;
      }

      pts.push(pt);

      if (lastPt) {
        drawLine(lastPt, pt);
      }

      onStrokeMove?.(pt, pts, e);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawingRef.current) return;
      if (activePointerIdRef.current !== null && e.pointerId !== activePointerIdRef.current) return;

      const canvas = canvasRef.current;
      if (canvas && activePointerIdRef.current !== null) {
        try {
          canvas.releasePointerCapture(activePointerIdRef.current);
        } catch (_) {}
      }

      isDrawingRef.current = false;
      activePointerIdRef.current = null;

      const finishedPoints = [...currentPointsRef.current];
      onStrokeEnd?.(finishedPoints, e);
    };

    const handlePointerCancel = () => {
      if (!isDrawingRef.current) return;
      const canvas = canvasRef.current;
      if (canvas && activePointerIdRef.current !== null) {
        try {
          canvas.releasePointerCapture(activePointerIdRef.current);
        } catch (_) {}
      }

      isDrawingRef.current = false;
      activePointerIdRef.current = null;
      currentPointsRef.current = [];

      onStrokeCancel?.();
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLCanvasElement>) => {
      // If pointer is captured, continue drawing across boundaries without premature stroke cancellation
      const canvas = canvasRef.current;
      if (canvas && activePointerIdRef.current !== null) {
        try {
          if (canvas.hasPointerCapture(e.pointerId)) {
            return;
          }
        } catch (_) {}
      }
      handlePointerUp(e);
    };

    return (
      <div
        className={`relative select-none touch-none aspect-square flex items-center justify-center ${className}`}
        style={{ touchAction: 'none' }}
      >
        {/* Guideline Background */}
        {showGrid && (
          <div
            className="absolute inset-0 pointer-events-none z-0"
            aria-hidden="true"
          >
            <svg
              viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
              className="w-full h-full stroke-amber-500/15"
              fill="none"
            >
              {/* Vertical & Horizontal Crosshair */}
              <line
                x1={viewBoxSize / 2}
                y1={0}
                x2={viewBoxSize / 2}
                y2={viewBoxSize}
                strokeDasharray="4 4"
                strokeWidth="0.8"
              />
              <line
                x1={0}
                y1={viewBoxSize / 2}
                x2={viewBoxSize}
                y2={viewBoxSize / 2}
                strokeDasharray="4 4"
                strokeWidth="0.8"
              />
              {/* Diagonal Guidelines */}
              <line
                x1={0}
                y1={0}
                x2={viewBoxSize}
                y2={viewBoxSize}
                strokeDasharray="2 6"
                strokeWidth="0.5"
                strokeOpacity="0.6"
              />
              <line
                x1={viewBoxSize}
                y1={0}
                x2={0}
                y2={viewBoxSize}
                strokeDasharray="2 6"
                strokeWidth="0.5"
                strokeOpacity="0.6"
              />
              {/* Outer boundary box */}
              <rect
                x="1"
                y="1"
                width={viewBoxSize - 2}
                height={viewBoxSize - 2}
                strokeWidth="0.8"
                strokeOpacity="0.3"
                rx="4"
              />
            </svg>
          </div>
        )}

        {/* Dynamic Canvas Buffer */}
        <canvas
          ref={canvasRef}
          role="application"
          aria-label="Kanvas latihan menulis goresan kanji interaktif"
          tabIndex={disabled ? -1 : 0}
          className={`relative z-10 w-full h-full touch-none cursor-crosshair ${
            disabled ? 'opacity-50 pointer-events-none' : ''
          }`}
          style={{ touchAction: 'none' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onPointerLeave={handlePointerLeave}
        />
      </div>
    );
  }
);

KanjiCanvas.displayName = 'KanjiCanvas';
