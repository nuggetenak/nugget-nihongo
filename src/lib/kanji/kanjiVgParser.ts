// ══════════════════════════════════════════════════════════════════
//  kanjiVgParser.ts — KanjiVG XML/SVG Vector Stroke Order Parser & Normalizer
//  Parses sequential stroke paths, samples geometry, normalizes viewBox 109×109,
//  and eliminates DOM layout thrashing via memoized singleton measurements.
// ══════════════════════════════════════════════════════════════════

export interface StrokeNumberCoordinate {
  number: number;
  x: number;
  y: number;
}

export interface ParsedKanjiVgData {
  character: string;
  unicodeHex: string;
  strokes: number;
  paths: string[];
  strokeNumbers: StrokeNumberCoordinate[];
  radicals: string[];
}

export interface StrokeAnimationStyle {
  strokeIndex: number;
  length: number;
  delayMs: number;
  durationMs: number;
}

export interface Point2D {
  x: number;
  y: number;
}

export interface StrokeBoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}

// ══════════════════════════════════════════════════════════════════
//  Measurement Singleton & Cache Layer (Zero DOM Layout Thrashing)
// ══════════════════════════════════════════════════════════════════

const MAX_CACHE_SIZE = 1200;
const pathLengthCache = new Map<string, number>();
const pathPointsCache = new Map<string, Point2D[]>();

function setBoundedCache<K, V>(map: Map<K, V>, key: K, value: V): void {
  if (map.size >= MAX_CACHE_SIZE) {
    const keysToEvict = Array.from(map.keys()).slice(0, Math.floor(MAX_CACHE_SIZE * 0.2));
    keysToEvict.forEach((k) => map.delete(k));
  }
  map.set(key, value);
}

let measureSvgSingleton: SVGSVGElement | null = null;
let offscreenPathSingleton: SVGPathElement | null = null;

function getOffscreenMeasureElements(): { svg: SVGSVGElement; path: SVGPathElement } | null {
  if (typeof document === 'undefined') return null;
  if (!measureSvgSingleton || !offscreenPathSingleton) {
    measureSvgSingleton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    measureSvgSingleton.setAttribute('viewBox', '0 0 109 109');
    measureSvgSingleton.setAttribute('width', '109');
    measureSvgSingleton.setAttribute('height', '109');
    measureSvgSingleton.style.position = 'absolute';
    measureSvgSingleton.style.visibility = 'hidden';
    measureSvgSingleton.style.pointerEvents = 'none';
    measureSvgSingleton.style.top = '-9999px';
    measureSvgSingleton.style.left = '-9999px';

    offscreenPathSingleton = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    measureSvgSingleton.appendChild(offscreenPathSingleton);
    document.body?.appendChild(measureSvgSingleton);
  }
  return { svg: measureSvgSingleton, path: offscreenPathSingleton };
}

// ══════════════════════════════════════════════════════════════════
//  Headless Pure-Math Fallback for SVG Path Parsing & Point Sampling
// ══════════════════════════════════════════════════════════════════

interface PathCommand {
  type: string;
  args: number[];
}

function parseSvgPathCommands(d: string): PathCommand[] {
  const commands: PathCommand[] = [];
  const regex = /([a-df-z])([^a-df-z]*)/gi;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(d)) !== null) {
    const type = match[1];
    const rawArgs = match[2];
    const numMatches = rawArgs ? rawArgs.match(/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g) : null;
    const args = numMatches ? numMatches.map((n) => parseFloat(n)).filter((n) => !isNaN(n)) : [];
    commands.push({ type, args });
  }

  return commands;
}

/**
 * Headless point sampler along an SVG path string for Node.js / SSR
 * Accurately calculates cubic Bezier (C), smooth cubic (S), quadratic (Q), and linear segments
 */
function samplePointsHeadless(d: string, samples = 28): Point2D[] {
  const commands = parseSvgPathCommands(d);
  if (commands.length === 0) return [];

  const rawPolyline: Point2D[] = [];
  let currX = 0;
  let currY = 0;
  let lastControlX = 0;
  let lastControlY = 0;
  let lastCmdType = '';

  for (const cmd of commands) {
    const isRel = cmd.type === cmd.type.toLowerCase();
    const t = cmd.type.toUpperCase();
    const args = cmd.args;

    if (t === 'M') {
      if (args.length >= 2) {
        currX = isRel ? currX + args[0] : args[0];
        currY = isRel ? currY + args[1] : args[1];
        rawPolyline.push({ x: currX, y: currY });
      }
      lastCmdType = 'M';
    } else if (t === 'L') {
      for (let i = 0; i < args.length; i += 2) {
        currX = isRel ? currX + args[i] : args[i];
        currY = isRel ? currY + args[i + 1] : args[i + 1];
        rawPolyline.push({ x: currX, y: currY });
      }
      lastCmdType = 'L';
    } else if (t === 'H') {
      for (let i = 0; i < args.length; i++) {
        currX = isRel ? currX + args[i] : args[i];
        rawPolyline.push({ x: currX, y: currY });
      }
      lastCmdType = 'H';
    } else if (t === 'V') {
      for (let i = 0; i < args.length; i++) {
        currY = isRel ? currY + args[i] : args[i];
        rawPolyline.push({ x: currX, y: currY });
      }
      lastCmdType = 'V';
    } else if (t === 'C') {
      // Cubic Bezier: (x1 y1 x2 y2 x y)
      for (let i = 0; i < args.length; i += 6) {
        const x1 = isRel ? currX + args[i] : args[i];
        const y1 = isRel ? currY + args[i + 1] : args[i + 1];
        const x2 = isRel ? currX + args[i + 2] : args[i + 2];
        const y2 = isRel ? currY + args[i + 3] : args[i + 3];
        const toX = isRel ? currX + args[i + 4] : args[i + 4];
        const toY = isRel ? currY + args[i + 5] : args[i + 5];

        // Sample 6 intermediate points along the cubic Bezier segment
        const segSteps = 6;
        for (let step = 1; step <= segSteps; step++) {
          const tVal = step / segSteps;
          const uVal = 1 - tVal;
          const bx =
            uVal * uVal * uVal * currX +
            3 * uVal * uVal * tVal * x1 +
            3 * uVal * tVal * tVal * x2 +
            tVal * tVal * tVal * toX;
          const by =
            uVal * uVal * uVal * currY +
            3 * uVal * uVal * tVal * y1 +
            3 * uVal * tVal * tVal * y2 +
            tVal * tVal * tVal * toY;
          rawPolyline.push({ x: bx, y: by });
        }
        lastControlX = x2;
        lastControlY = y2;
        currX = toX;
        currY = toY;
      }
      lastCmdType = 'C';
    } else if (t === 'S') {
      // Smooth Cubic Bezier: (x2 y2 x y) with reflected first control point
      for (let i = 0; i < args.length; i += 4) {
        let x1 = currX;
        let y1 = currY;
        if (lastCmdType === 'C' || lastCmdType === 'S') {
          x1 = 2 * currX - lastControlX;
          y1 = 2 * currY - lastControlY;
        }
        const x2 = isRel ? currX + args[i] : args[i];
        const y2 = isRel ? currY + args[i + 1] : args[i + 1];
        const toX = isRel ? currX + args[i + 2] : args[i + 2];
        const toY = isRel ? currY + args[i + 3] : args[i + 3];

        const segSteps = 6;
        for (let step = 1; step <= segSteps; step++) {
          const tVal = step / segSteps;
          const uVal = 1 - tVal;
          const bx =
            uVal * uVal * uVal * currX +
            3 * uVal * uVal * tVal * x1 +
            3 * uVal * tVal * tVal * x2 +
            tVal * tVal * tVal * toX;
          const by =
            uVal * uVal * uVal * currY +
            3 * uVal * uVal * tVal * y1 +
            3 * uVal * tVal * tVal * y2 +
            tVal * tVal * tVal * toY;
          rawPolyline.push({ x: bx, y: by });
        }
        lastControlX = x2;
        lastControlY = y2;
        currX = toX;
        currY = toY;
      }
      lastCmdType = 'S';
    } else if (t === 'Q') {
      // Quadratic Bezier: (x1 y1 x y)
      for (let i = 0; i < args.length; i += 4) {
        const x1 = isRel ? currX + args[i] : args[i];
        const y1 = isRel ? currY + args[i + 1] : args[i + 1];
        const toX = isRel ? currX + args[i + 2] : args[i + 2];
        const toY = isRel ? currY + args[i + 3] : args[i + 3];

        const segSteps = 6;
        for (let step = 1; step <= segSteps; step++) {
          const tVal = step / segSteps;
          const uVal = 1 - tVal;
          const qx = uVal * uVal * currX + 2 * uVal * tVal * x1 + tVal * tVal * toX;
          const qy = uVal * uVal * currY + 2 * uVal * tVal * y1 + tVal * tVal * toY;
          rawPolyline.push({ x: qx, y: qy });
        }
        lastControlX = x1;
        lastControlY = y1;
        currX = toX;
        currY = toY;
      }
      lastCmdType = 'Q';
    } else if (t === 'Z') {
      if (rawPolyline.length > 0) {
        const first = rawPolyline[0];
        currX = first.x;
        currY = first.y;
        rawPolyline.push({ x: currX, y: currY });
      }
      lastCmdType = 'Z';
    }
  }

  if (rawPolyline.length === 0) return [];
  if (rawPolyline.length === 1) return Array(samples + 1).fill(rawPolyline[0]);

  // Compute cumulative lengths along raw polyline
  const cumLengths = [0];
  let totalLength = 0;
  for (let i = 1; i < rawPolyline.length; i++) {
    const dx = rawPolyline[i].x - rawPolyline[i - 1].x;
    const dy = rawPolyline[i].y - rawPolyline[i - 1].y;
    totalLength += Math.sqrt(dx * dx + dy * dy);
    cumLengths.push(totalLength);
  }

  if (totalLength === 0) return Array(samples + 1).fill(rawPolyline[0]);

  // Equidistant resampling
  const result: Point2D[] = [];
  for (let s = 0; s <= samples; s++) {
    const targetDist = (s / samples) * totalLength;

    // Find segment
    let segIdx = 0;
    while (segIdx < cumLengths.length - 1 && cumLengths[segIdx + 1] < targetDist) {
      segIdx++;
    }

    if (segIdx >= rawPolyline.length - 1) {
      result.push({ ...rawPolyline[rawPolyline.length - 1] });
    } else {
      const segLen = cumLengths[segIdx + 1] - cumLengths[segIdx];
      const frac = segLen > 0 ? (targetDist - cumLengths[segIdx]) / segLen : 0;
      const p1 = rawPolyline[segIdx];
      const p2 = rawPolyline[segIdx + 1];
      result.push({
        x: p1.x + (p2.x - p1.x) * frac,
        y: p1.y + (p2.y - p1.y) * frac,
      });
    }
  }

  return result;
}

// ══════════════════════════════════════════════════════════════════
//  Public Geometry Utilities & Extraction APIs
// ══════════════════════════════════════════════════════════════════

/**
 * Calculates physical stroke length with zero DOM layout thrashing (memoized)
 */
export function getPathLength(d: string): number {
  if (!d) return 100;
  if (pathLengthCache.has(d)) return pathLengthCache.get(d)!;

  try {
    const measurer = getOffscreenMeasureElements();
    if (measurer) {
      measurer.path.setAttribute('d', d);
      const len = measurer.path.getTotalLength();
      const result = Math.max(8, Math.ceil(len));
      setBoundedCache(pathLengthCache, d, result);
      return result;
    }
  } catch {
    // fallback
  }

  // Headless pure-math estimation
  const sampled = samplePointsHeadless(d, 20);
  let estLen = 0;
  for (let i = 1; i < sampled.length; i++) {
    const dx = sampled[i].x - sampled[i - 1].x;
    const dy = sampled[i].y - sampled[i - 1].y;
    estLen += Math.sqrt(dx * dx + dy * dy);
  }
  const result = Math.max(8, Math.ceil(estLen));
  setBoundedCache(pathLengthCache, d, result);
  return result;
}

/**
 * Robust, cross-browser path geometry sampling without per-stroke layout thrashing.
 * Falls back to Bezier mathematical interpolation in Node.js / headless environments.
 */
export function samplePointsFromPath(d: string, samples = 28): Point2D[] {
  if (!d) return [];
  const cacheKey = `${d}__${samples}`;
  if (pathPointsCache.has(cacheKey)) return pathPointsCache.get(cacheKey)!;

  try {
    const measurer = getOffscreenMeasureElements();
    if (measurer) {
      measurer.path.setAttribute('d', d);
      const totalLen = measurer.path.getTotalLength();
      const points: Point2D[] = [];
      if (totalLen > 0) {
        for (let i = 0; i <= samples; i++) {
          const pt = measurer.path.getPointAtLength((i / samples) * totalLen);
          points.push({ x: pt.x, y: pt.y });
        }
      }
      if (points.length > 0) {
        setBoundedCache(pathPointsCache, cacheKey, points);
        return points;
      }
    }
  } catch (err) {
    // fallback
  }

  // Headless fallback
  const fallbackPoints = samplePointsHeadless(d, samples);
  setBoundedCache(pathPointsCache, cacheKey, fallbackPoints);
  return fallbackPoints;
}

/**
 * Extracts the starting coordinate (x, y) of a stroke path
 */
export function getStrokeStartPoint(d: string): Point2D {
  if (!d) return { x: 54.5, y: 54.5 };
  const match = d.match(/^[Mm]\s*([-\d.]+)[,\s]+([-\d.]+)/);
  if (match) {
    return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
  }
  const sampled = samplePointsFromPath(d, 2);
  return sampled[0] || { x: 54.5, y: 54.5 };
}

/**
 * Extracts the ending coordinate (x, y) of a stroke path
 */
export function getStrokeEndPoint(d: string): Point2D {
  if (!d) return { x: 54.5, y: 54.5 };
  const sampled = samplePointsFromPath(d, 4);
  return sampled[sampled.length - 1] || { x: 54.5, y: 54.5 };
}

/**
 * Calculates the bounding box of a collection of 2D points
 */
export function getStrokeBoundingBox(points: Point2D[]): StrokeBoundingBox {
  if (!points || points.length === 0) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 };
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const pt of points) {
    if (pt.x < minX) minX = pt.x;
    if (pt.y < minY) minY = pt.y;
    if (pt.x > maxX) maxX = pt.x;
    if (pt.y > maxY) maxY = pt.y;
  }

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

/**
 * Normalizes an SVG path command string to a target viewBox dimension (default: 109)
 */
export function normalizePathToBounds(
  d: string,
  sourceBoxSize: number = 109,
  targetBoxSize: number = 109
): string {
  if (!d || sourceBoxSize === targetBoxSize || sourceBoxSize <= 0) return d;
  const scale = targetBoxSize / sourceBoxSize;

  // Scale numbers in path data
  return d.replace(/([-\d.]+)/g, (match) => {
    const num = parseFloat(match);
    if (isNaN(num)) return match;
    return (num * scale).toFixed(2).replace(/\.00$/, '');
  });
}

/**
 * Converts a Japanese kanji character to its standard 5-digit KanjiVG hex code
 */
export function getKanjiUnicodeHex(kanji: string): string {
  if (!kanji || typeof kanji !== 'string') return '';
  const codePoint = kanji.codePointAt(0);
  if (codePoint === undefined) return '';
  return codePoint.toString(16).padStart(5, '0').toLowerCase();
}

/**
 * Clears the measurement and point cache to prevent memory leaks in long sessions
 */
export function clearKanjiVgCache(): void {
  pathLengthCache.clear();
  pathPointsCache.clear();
}

/**
 * Returns telemetry cache statistics for diagnostics
 */
export function getKanjiVgCacheStats(): { pathLengthsCached: number; pointSetsCached: number } {
  return {
    pathLengthsCached: pathLengthCache.size,
    pointSetsCached: pathPointsCache.size,
  };
}

// ══════════════════════════════════════════════════════════════════
//  Original Parsing & Timeline Generators (Backward Compatible)
// ══════════════════════════════════════════════════════════════════

/**
 * Parses raw KanjiVG SVG/XML string into structured stroke paths & coordinates
 */
export function parseKanjiVgSvg(svgString: string, character: string = ''): ParsedKanjiVgData {
  if (!svgString || typeof svgString !== 'string') {
    return {
      character,
      unicodeHex: '',
      strokes: 0,
      paths: [],
      strokeNumbers: [],
      radicals: [],
    };
  }

  // 1. Extract paths in sequential order
  const pathMatches = svgString.match(/<path[^>]*\bd="([^"]+)"[^>]*>/g) || [];
  const paths: string[] = [];

  for (const match of pathMatches) {
    const dMatch = match.match(/\bd="([^"]+)"/);
    if (dMatch && dMatch[1]) {
      paths.push(dMatch[1].trim());
    }
  }

  // 2. Extract stroke numbers and coordinate text
  const strokeNumbers: StrokeNumberCoordinate[] = [];
  const textMatches = svgString.match(/<text[^>]*>(\d+)<\/text>/g) || [];

  for (const textTag of textMatches) {
    const matrixMatch = textTag.match(/transform="matrix\([^)]*?\s+([-\d.]+)\s+([-\d.]+)\)"[^>]*>(\d+)<\/text>/);
    if (matrixMatch) {
      strokeNumbers.push({
        x: parseFloat(matrixMatch[1]),
        y: parseFloat(matrixMatch[2]),
        number: parseInt(matrixMatch[3], 10),
      });
      continue;
    }

    const xyMatch = textTag.match(/x="([-\d.]+)"\s+y="([-\d.]+)"[^>]*>(\d+)<\/text>/);
    if (xyMatch) {
      strokeNumbers.push({
        x: parseFloat(xyMatch[1]),
        y: parseFloat(xyMatch[2]),
        number: parseInt(xyMatch[3], 10),
      });
    }
  }

  // 3. Extract radical components (kvg:element / kvg:radical)
  const radicals: string[] = [];
  const radicalMatches = svgString.match(/kvg:element="([^"]+)"/g) || [];
  for (const r of radicalMatches) {
    const elem = r.match(/kvg:element="([^"]+)"/);
    if (elem && elem[1] && !radicals.includes(elem[1])) {
      radicals.push(elem[1]);
    }
  }

  const unicodeHex = character ? getKanjiUnicodeHex(character) : '';

  return {
    character,
    unicodeHex,
    strokes: paths.length,
    paths,
    strokeNumbers,
    radicals,
  };
}

/**
 * Generates sequential CSS animation timeline for SVG stroke dasharray rendering
 */
export function generateStrokeAnimationTimeline(
  strokeLengths: number[],
  baseDurationMs: number = 600,
  speedMultiplier: number = 1.0
): StrokeAnimationStyle[] {
  let accumulatedDelay = 0;
  const duration = Math.round(baseDurationMs / speedMultiplier);

  return strokeLengths.map((length, strokeIndex) => {
    const delay = accumulatedDelay;
    accumulatedDelay += duration + Math.round(150 / speedMultiplier);

    return {
      strokeIndex,
      length: Math.max(10, Math.ceil(length)),
      delayMs: delay,
      durationMs: duration,
    };
  });
}
