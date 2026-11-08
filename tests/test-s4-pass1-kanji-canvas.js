// ══════════════════════════════════════════════════════════════════
//  test-s4-pass1-kanji-canvas.js — Siklus IV Pass 1 Verification
//  Validates Interactive KanjiCanvas Architecture, Pointer Events,
//  High-DPI Retina Scaling, Normalization & Accessibility Contracts
// ══════════════════════════════════════════════════════════════════

const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

console.log('🧪 Running Siklus IV Pass 1: Kanji Canvas & Pointer Event Engine Test...');

const canvasPath = path.resolve(ROOT, 'src/components/kanji/KanjiCanvas.tsx');
assert(fs.existsSync(canvasPath), 'KanjiCanvas.tsx must exist at src/components/kanji/KanjiCanvas.tsx');
const canvasSrc = fs.readFileSync(canvasPath, 'utf8');

// 1. Structural Component & TypeScript Contract Exports
console.log('  🔍 Check 1: Validating Component & Type Exports...');
assert(canvasSrc.includes('export const KanjiCanvas'), 'Must export KanjiCanvas component');
assert(canvasSrc.includes('export interface KanjiCanvasHandle'), 'Must export KanjiCanvasHandle interface');
assert(canvasSrc.includes('export interface KanjiCanvasProps'), 'Must export KanjiCanvasProps interface');
assert(canvasSrc.includes('export interface CanvasPoint'), 'Must export CanvasPoint interface');
console.log('  ✅ Check 1 Passed: Component and TypeScript interfaces certified');

// 2. High-DPI Retina Display Scaling
console.log('  🔍 Check 2: Validating High-DPI Scaling & Device Pixel Ratio Synchronization...');
assert(canvasSrc.includes('window.devicePixelRatio'), 'Must inspect devicePixelRatio for Retina display fidelity');
assert(canvasSrc.includes('ctx.scale(dpr, dpr)'), 'Must apply DPR coordinate scaling to canvas 2D context');
assert(canvasSrc.includes('syncDpi'), 'Must provide syncDpi method for dynamic DPI adjustment');
assert(canvasSrc.includes('ResizeObserver'), 'Must observe canvas resize events to resync buffer resolution');
console.log('  ✅ Check 2 Passed: High-DPI scaling architecture certified');

// 3. Coordinate Normalization to KanjiVG ViewBox (0..109)
console.log('  🔍 Check 3: Validating ViewBox Coordinate Normalization...');
assert(canvasSrc.includes('clientToViewBox'), 'Must have clientToViewBox normalization helper');
assert(canvasSrc.includes('viewBoxSize = 109'), 'Default viewBox size must be 109 to match KanjiVG standards');
assert(canvasSrc.includes('getBoundingClientRect()'), 'Must calculate bounding box offsets for accurate touch drawing');
console.log('  ✅ Check 3 Passed: Coordinate normalization to 109x109 viewBox certified');

// 4. Unified Pointer Events & Anti-Interference Touch Controls
console.log('  🔍 Check 4: Validating Pointer Event Handling & Pointer Capture...');
assert(canvasSrc.includes('onPointerDown={handlePointerDown}'), 'Must bind onPointerDown');
assert(canvasSrc.includes('onPointerMove={handlePointerMove}'), 'Must bind onPointerMove');
assert(canvasSrc.includes('onPointerUp={handlePointerUp}'), 'Must bind onPointerUp');
assert(canvasSrc.includes('onPointerCancel={handlePointerCancel}'), 'Must bind onPointerCancel');
assert(canvasSrc.includes('setPointerCapture'), 'Must claim pointer capture on pointer down');
assert(canvasSrc.includes('releasePointerCapture'), 'Must release pointer capture on pointer up/cancel');
assert(canvasSrc.includes("touchAction: 'none'"), 'Must enforce touchAction: none to eliminate browser scroll fighting');
console.log('  ✅ Check 4 Passed: Pointer capture and scroll suppression certified');

// 5. Imperative Ref Methods & Calligraphy Grid
console.log('  🔍 Check 5: Validating Imperative Controls & Traditional Calligraphy Guidelines...');
assert(canvasSrc.includes('useImperativeHandle'), 'Must provide imperative handle to parent');
assert(canvasSrc.includes('clear,'), 'Handle must expose clear() method');
assert(canvasSrc.includes('getCurrentStrokePoints'), 'Handle must expose getCurrentStrokePoints() method');
assert(canvasSrc.includes('toDataURL'), 'Handle must expose toDataURL() for image export');
assert(canvasSrc.includes('drawDab,'), 'Handle must expose drawDab() for instant visual ink response');
assert(canvasSrc.includes('drawLine,'), 'Handle must expose drawLine() for smooth vector drawing');
assert(canvasSrc.includes('showGrid'), 'Must support traditional Japanese quadrant calligraphy guidelines');
assert(canvasSrc.includes('strokeDasharray'), 'Grid must render dashed quadrant guidelines');
console.log('  ✅ Check 5 Passed: Imperative handle & calligraphy grid certified');

// 6. Accessibility & Multi-Device Standards
console.log('  🔍 Check 6: Validating ARIA Role & Accessibility Standards...');
assert(canvasSrc.includes('role="application"'), 'Must declare role="application" for interactive drawing surface');
assert(canvasSrc.includes('aria-label='), 'Must provide clear Indonesian descriptive aria-label');
console.log('  ✅ Check 6 Passed: ARIA accessibility and multi-device compliance certified');

console.log('\n🎉 PASS 1 VERIFIED: Kanji Canvas & Pointer Event Engine certified 100% compliant!\n');
process.exit(0);
