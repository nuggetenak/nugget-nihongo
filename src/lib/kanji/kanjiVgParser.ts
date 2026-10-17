// ══════════════════════════════════════════════════════════════════
//  kanjiVgParser.ts — KanjiVG XML/SVG Vector Stroke Order Parser
//  Parses sequential stroke paths, radical tags & generates CSS animations
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
    // Check matrix transform: matrix(... x y)
    const matrixMatch = textTag.match(/transform="matrix\([^)]*?\s+([-\d.]+)\s+([-\d.]+)\)"[^>]*>(\d+)<\/text>/);
    if (matrixMatch) {
      strokeNumbers.push({
        x: parseFloat(matrixMatch[1]),
        y: parseFloat(matrixMatch[2]),
        number: parseInt(matrixMatch[3], 10),
      });
      continue;
    }

    // Check direct x/y coordinates
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

  // Compute Unicode Hex
  const unicodeHex = character
    ? character.charCodeAt(0).toString(16).padStart(5, '0')
    : '';

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
