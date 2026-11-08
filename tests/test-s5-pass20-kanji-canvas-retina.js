// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass20-kanji-canvas-retina.js
//  SIKLUS V — PASS 20: KanjiCanvas High-DPI Retina Buffer & Pointer Capture
//  Klaster 7: Interactive Kanji Writing & Touch Recognition
//  Audits & Verifies:
//    - High-DPI Retina Canvas Buffer Resolution (devicePixelRatio Scaling)
//    - Unified Pointer Events API (pointerdown/move/up/cancel) & setPointerCapture
//    - Cross-Boundary Stroke Preservation (Captured Pointer Escape Tolerance)
//    - touch-action: none Scroll Suppression (Zero Mobile Scroll Interference)
//    - KanjiVG 109x109 Coordinate Normalization & Bounding Box Clamping
//    - Continuous Polyline Vector Rendering (drawStroke, drawLine, drawDab)
//    - Traditional 4-Quadrant Calligraphy Crosshairs & Guidelines
//    - Accessibility Contracts (role="application", aria-label, tabIndex)
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS V — PASS 20: KANJICANVAS HIGH-DPI RETINA AUDIT          ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

function runPass20Tests() {
  const rootDir = path.resolve(__dirname, '..');
  const canvasPath = path.join(rootDir, 'src', 'components', 'kanji', 'KanjiCanvas.tsx');

  assert(fs.existsSync(canvasPath), 'KanjiCanvas.tsx must exist');
  const canvasSrc = fs.readFileSync(canvasPath, 'utf8');

  // ── T-1: Component TypeScript Interfaces & Imperative Handle Contract ──
  console.log('--- [T-1] Component TypeScript Interfaces & Handle Contract ---');

  assert(canvasSrc.includes('export interface CanvasPoint'), 'Must export CanvasPoint interface');
  assert(canvasSrc.includes('export interface KanjiCanvasHandle'), 'Must export KanjiCanvasHandle interface');
  assert(canvasSrc.includes('export interface KanjiCanvasProps'), 'Must export KanjiCanvasProps interface');
  assert(canvasSrc.includes('export const KanjiCanvas'), 'Must export KanjiCanvas component');

  // Verify all methods in KanjiCanvasHandle
  const handleMethods = [
    'clear',
    'getCurrentStrokePoints',
    'toDataURL',
    'drawDab',
    'drawLine',
    'drawStroke',
    'syncDpi',
    'getCanvasElement',
  ];
  handleMethods.forEach((method) => {
    assert(
      canvasSrc.includes(`${method}:`) || canvasSrc.includes(`${method},`),
      `KanjiCanvasHandle must declare ${method}`
    );
  });
  console.log('  ✓ [T-1 PASS] All TypeScript interfaces and 8 imperative handle methods verified.');

  // ── T-2: High-DPI Retina Display Scaling & ResizeObserver ──
  console.log('--- [T-2] High-DPI Retina Scaling & Resolution Synchronization ---');

  assert(
    canvasSrc.includes('window.devicePixelRatio'),
    'Must read window.devicePixelRatio for Retina display scaling'
  );
  assert(
    canvasSrc.includes('Math.round(rect.width * dpr)'),
    'Target buffer width must scale by DPR'
  );
  assert(
    canvasSrc.includes('Math.round(rect.height * dpr)'),
    'Target buffer height must scale by DPR'
  );
  assert(
    canvasSrc.includes('ctx.scale(dpr, dpr)'),
    '2D context coordinate system must scale by DPR'
  );
  assert(
    canvasSrc.includes('ResizeObserver'),
    'Must attach ResizeObserver to detect canvas layout shifts'
  );
  assert(
    canvasSrc.includes('ro.disconnect()'),
    'ResizeObserver must disconnect on unmount to prevent memory leaks'
  );
  console.log('  ✓ [T-2 PASS] Device pixel ratio scaling, context transform & ResizeObserver lifecycle verified.');

  // ── T-3: Coordinate Normalization to KanjiVG ViewBox (0..109) ──
  console.log('--- [T-3] Coordinate Normalization & Boundary Clamping ---');

  assert(
    canvasSrc.includes('clientToViewBox'),
    'Must implement clientToViewBox coordinate converter'
  );
  assert(
    canvasSrc.includes('viewBoxSize = 109'),
    'Default viewBoxSize must be 109 to match KanjiVG XML specifications'
  );
  assert(
    canvasSrc.includes('Math.max(0, Math.min(viewBoxSize, x))'),
    'X coordinate must be clamped within [0, viewBoxSize]'
  );
  assert(
    canvasSrc.includes('Math.max(0, Math.min(viewBoxSize, y))'),
    'Y coordinate must be clamped within [0, viewBoxSize]'
  );
  assert(
    canvasSrc.includes('rect.width === 0 || rect.height === 0'),
    'Must guard against zero dimensions during unmounted or collapsed layout state'
  );
  console.log('  ✓ [T-3 PASS] KanjiVG 109x109 coordinate normalization & zero-dimension guards verified.');

  // ── T-4: Unified Pointer Events, Pointer Capture & Cross-Boundary Defense ──
  console.log('--- [T-4] Pointer Capture & Cross-Boundary Drawing Defense ---');

  assert(canvasSrc.includes('onPointerDown={handlePointerDown}'), 'Must bind handlePointerDown');
  assert(canvasSrc.includes('onPointerMove={handlePointerMove}'), 'Must bind handlePointerMove');
  assert(canvasSrc.includes('onPointerUp={handlePointerUp}'), 'Must bind handlePointerUp');
  assert(canvasSrc.includes('onPointerCancel={handlePointerCancel}'), 'Must bind handlePointerCancel');
  assert(canvasSrc.includes('onPointerLeave={handlePointerLeave}'), 'Must bind handlePointerLeave');

  // Pointer Capture claiming
  assert(
    canvasSrc.includes('canvas.setPointerCapture(e.pointerId)'),
    'Must claim pointer capture on pointer down'
  );
  assert(
    canvasSrc.includes('canvas.releasePointerCapture('),
    'Must release pointer capture on stroke conclusion'
  );

  // Cross-Boundary tolerance (captured pointer must not be prematurely terminated by pointerleave)
  assert(
    canvasSrc.includes('canvas.hasPointerCapture(e.pointerId)'),
    'handlePointerLeave must check hasPointerCapture to allow drawing beyond canvas borders'
  );

  // Secondary button rejection
  assert(
    canvasSrc.includes("e.button !== 0 && e.pointerType === 'mouse'"),
    'Must reject non-primary mouse buttons (right/middle click)'
  );

  // Single active pointer guard
  assert(
    canvasSrc.includes('activePointerIdRef.current !== null && e.pointerId !== activePointerIdRef.current'),
    'Must reject secondary touch points during an active stroke'
  );
  console.log('  ✓ [T-4 PASS] Pointer capture, boundary drift preservation & secondary touch rejection verified.');

  // ── T-5: Gesture Scroll Suppression & Accessibility ──
  console.log('--- [T-5] Gesture Scroll Suppression & Accessibility Standards ---');

  // Container touch-action
  assert(
    canvasSrc.includes("style={{ touchAction: 'none' }}"),
    'Container must declare touchAction: none in inline style'
  );
  assert(
    canvasSrc.includes('touch-none'),
    'Container must declare Tailwind touch-none utility'
  );

  // Canvas element touch-action
  assert(
    canvasSrc.includes('cursor-crosshair'),
    'Canvas must present cursor-crosshair for precision calligraphy stylus feedback'
  );
  assert(
    canvasSrc.includes('role="application"'),
    'Canvas must declare ARIA role="application"'
  );
  assert(
    canvasSrc.includes('aria-label='),
    'Canvas must provide informative Indonesian aria-label'
  );
  assert(
    canvasSrc.includes('tabIndex='),
    'Canvas must provide accessible tabIndex for keyboard focus'
  );
  console.log('  ✓ [T-5 PASS] touchAction: none scroll suppression & accessibility compliance verified.');

  // ── T-6: Polyline Vector Rendering & Calligraphy Guidelines ──
  console.log('--- [T-6] Polyline Vector Rendering & Calligraphy Guidelines ---');

  assert(
    canvasSrc.includes('drawStroke = useCallback'),
    'Must implement drawStroke helper for continuous vector polyline rendering'
  );
  assert(
    canvasSrc.includes("ctx.lineCap = 'round'"),
    'Must use round line caps for authentic calligraphy stroke terminals'
  );
  assert(
    canvasSrc.includes("ctx.lineJoin = 'round'"),
    'Must use round line joins for smooth curved kanji corners'
  );

  // Traditional Japanese 4-Quadrant Guidelines
  assert(canvasSrc.includes('showGrid'), 'Must support optional calligraphy grid');
  assert(canvasSrc.includes('viewBoxSize / 2'), 'Must draw vertical and horizontal quadrant dividing lines');
  assert(canvasSrc.includes('strokeDasharray="4 4"'), 'Midline grid crosshairs must be dashed');
  assert(canvasSrc.includes('strokeDasharray="2 6"'), 'Diagonal guidelines must have subtle dot-dash pattern');
  assert(canvasSrc.includes('rx="4"'), 'Outer guideline box must have rounded corners');

  console.log('  ✓ [T-6 PASS] Continuous polyline vector rendering & 4-quadrant guidelines verified.');

  console.log('\n╔══════════════════════════════════════════════════════════════════╗');
  console.log('║   ALL PASS 20 KANJICANVAS HIGH-DPI AUDIT TESTS PASSED!           ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝\n');
}

runPass20Tests();
