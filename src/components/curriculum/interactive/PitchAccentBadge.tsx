// ══════════════════════════════════════════════════════════════════
//  PitchAccentBadge.tsx — Japanese Pitch Accent Contour Visualizer
//  Renders Tokyo High/Low tone SVG polyline & mora breakdown
//  Based on OJAD & Wadoku Tokyo Pitch Accent Standards
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { splitIntoMora as splitMoraTokenizer } from '../../../lib/audio/moraTokenizer';

export interface PitchAccentProps {
  reading: string;
  pattern?: number; // 0: Heiban, 1: Atamadaka, 2: Nakadaka, etc.
  particle?: string; // Optional enclitic particle (defaults to 'が' for Odaka and 1-mora words)
  compact?: boolean;
}

/**
 * Canonical extraction of phonetic mora tokens from kana text.
 */
export function extractMoras(text: string): string[] {
  return splitMoraTokenizer(text);
}

export interface PitchMoraNode {
  mora: string;
  isHigh: boolean;
  hasDrop: boolean;
  isParticle?: boolean;
}

/**
 * Calculates high/low pitch status for each mora in Tokyo Japanese,
 * including enclitic particle slot (e.g. が) for Odaka downstep and 1-mora Heiban.
 */
export function getMoraPitches(
  moras: string[],
  pattern: number = 0,
  particle?: string
): PitchMoraNode[] {
  if (moras.length === 0) return [];
  const moraCount = moras.length;

  const result: PitchMoraNode[] = moras.map((mora, idx) => {
    let isHigh = false;
    let hasDrop = false;

    if (pattern === 0) {
      // Heiban (平板): [Low, High, High, ...] No drop within the word
      // 1-mora Heiban (e.g. 木): Low inside word, rises to High on particle
      isHigh = moraCount === 1 ? false : idx > 0;
      hasDrop = false;
    } else if (pattern === 1) {
      // Atamadaka (頭高): [High, Low, Low, ...] Drop after 1st mora
      isHigh = idx === 0;
      hasDrop = idx === 0;
    } else {
      // Nakadaka / Odaka: [Low, High... Drop at pattern index]
      const downstepIndex = pattern - 1;
      isHigh = idx > 0 && idx <= downstepIndex;
      hasDrop = idx === downstepIndex;
    }

    return { mora, isHigh, hasDrop, isParticle: false };
  });

  // Include enclitic particle slot if explicitly requested or for Odaka and 1-mora Heiban
  const shouldAddParticle = particle !== undefined ? !!particle : (pattern === moraCount || (pattern === 0 && moraCount === 1));
  const particleMora = particle || 'が';

  if (shouldAddParticle) {
    let isHigh = false;
    if (pattern === 0) {
      // Heiban: particle stays High
      isHigh = true;
    } else {
      // Atamadaka, Nakadaka, Odaka: particle is Low (Odaka downstep drops onto particle)
      isHigh = false;
    }

    result.push({
      mora: particleMora,
      isHigh,
      hasDrop: false,
      isParticle: true,
    });
  }

  return result;
}

export const PATTERN_NAMES: Record<number, { name: string; kanji: string; desc: string }> = {
  0: { name: 'Heiban', kanji: '平板 [0]', desc: 'Mulai rendah, naik di mora ke-2, tetap tinggi menyatu dengan partikel.' },
  1: { name: 'Atamadaka', kanji: '頭高 [1]', desc: 'Mora pertama tinggi, langsung turun tajam ke rendah pada mora ke-2.' },
  2: { name: 'Nakadaka', kanji: '中高 [2]', desc: 'Mulai rendah, naik di mora ke-2, lalu turun sebelum akhir kata.' },
  3: { name: 'Odaka', kanji: '尾高 [3]', desc: 'Mulai rendah, naik sampai mora terakhir, lalu turun pada partikel penerus.' },
};

export const PitchAccentBadge: React.FC<PitchAccentProps> = ({
  reading,
  pattern = 0,
  particle,
  compact = false,
}) => {
  const [showModal, setShowModal] = useState(false);
  const moras = extractMoras(reading);
  if (moras.length === 0) return null;

  const pitchInfo = getMoraPitches(moras, pattern, particle);
  const patternMeta = PATTERN_NAMES[pattern] || {
    name: pattern === moras.length ? 'Odaka' : 'Nakadaka',
    kanji: pattern === moras.length ? `尾高 [${pattern}]` : `中高 [${pattern}]`,
    desc: pattern === moras.length
      ? 'Mulai rendah, naik sampai mora terakhir, lalu turun pada partikel penerus.'
      : `Mulai rendah, naik di mora ke-2, lalu turun tajam setelah mora ke-${pattern}.`,
  };

  const stepWidth = 26;
  const highY = 6;
  const lowY = 20;

  const points = pitchInfo.map((p, i) => {
    const x = i * stepWidth + stepWidth / 2;
    const y = p.isHigh ? highY : lowY;
    return `${x},${y}`;
  });

  if (compact) {
    const compactStep = 8;
    const compactWidth = Math.max(24, pitchInfo.length * compactStep + 4);
    const compactHighY = 3;
    const compactLowY = 11;
    const compactPoints = pitchInfo.map((p, i) => {
      const x = i * compactStep + compactStep / 2;
      const y = p.isHigh ? compactHighY : compactLowY;
      return `${x},${y}`;
    });

    return (
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/15 dark:bg-amber-500/10 hover:bg-amber-500/25 border border-amber-500/30 text-[10px] text-amber-800 dark:text-amber-300 font-mono transition-colors active:scale-95 shrink-0"
        title={`Intonasi Tokyo: ${patternMeta.kanji} (${patternMeta.name})`}
      >
        <span className="font-bold">{patternMeta.kanji}</span>
        <svg
          width={compactWidth}
          height={14}
          viewBox={`0 0 ${compactWidth} 14`}
          className="shrink-0 overflow-visible"
        >
          <polyline
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1.5"
            points={compactPoints.join(' ')}
          />
          {pitchInfo.map((p, i) => (
            <circle
              key={i}
              cx={i * compactStep + compactStep / 2}
              cy={p.isHigh ? compactHighY : compactLowY}
              r={p.isParticle ? "1.5" : "2"}
              fill={p.hasDrop ? '#EF4444' : p.isParticle ? '#9CA3AF' : '#F59E0B'}
              stroke={p.isParticle ? '#F59E0B' : 'none'}
              strokeWidth={p.isParticle ? "0.5" : "0"}
            />
          ))}
        </svg>
      </button>
    );
  }

  const svgWidth = pitchInfo.length * stepWidth;

  return (
    <div className="inline-flex flex-col items-center p-2.5 rounded-2xl bg-surface-2 border border-accent/20 shadow-sm max-w-full">
      <div className="flex items-center justify-between w-full gap-2 mb-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-accent flex items-center gap-1">
          <span>Intonasi Nada Tokyo:</span>
          <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300 font-mono">
            {patternMeta.kanji}
          </span>
        </span>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="text-appText-muted hover:text-accent transition-colors p-0.5 active:scale-95"
          title="Pelajari jenis intonasi nada Jepang"
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SVG Contour Line & Mora Text */}
      <div className="flex flex-col items-center overflow-x-auto max-w-full py-1">
        <svg
          width={svgWidth}
          height={26}
          viewBox={`0 0 ${svgWidth} 26`}
          className="overflow-visible"
        >
          {/* Guide horizontal lines */}
          <line x1={0} y1={highY} x2={svgWidth} y2={highY} stroke="currentColor" strokeOpacity={0.12} strokeDasharray="2,2" />
          <line x1={0} y1={lowY} x2={svgWidth} y2={lowY} stroke="currentColor" strokeOpacity={0.12} strokeDasharray="2,2" />

          {/* Polyline contour */}
          <polyline
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points.join(' ')}
          />

          {/* Nodes */}
          {pitchInfo.map((p, i) => (
            <g key={i}>
              <circle
                cx={i * stepWidth + stepWidth / 2}
                cy={p.isHigh ? highY : lowY}
                r={p.isParticle ? "3" : "3.5"}
                fill={p.hasDrop ? '#EF4444' : p.isParticle ? '#374151' : '#F59E0B'}
                stroke={p.isParticle ? '#9CA3AF' : 'none'}
                strokeWidth={p.isParticle ? "1.5" : "0"}
                strokeDasharray={p.isParticle ? "2,2" : undefined}
              />
              {p.hasDrop && (
                <line
                  x1={i * stepWidth + stepWidth / 2 + 3}
                  y1={highY}
                  x2={i * stepWidth + stepWidth / 2 + 8}
                  y2={lowY}
                  stroke="#EF4444"
                  strokeWidth="1.5"
                  strokeDasharray="1,1"
                />
              )}
            </g>
          ))}
        </svg>

        {/* Mora Kana Labels */}
        <div className="flex mt-1">
          {pitchInfo.map((p, i) => (
            <span
              key={i}
              style={{ width: `${stepWidth}px` }}
              className={`text-center font-jp text-xs leading-tight ${
                p.isParticle
                  ? 'text-appText-muted/70 italic text-[11px]'
                  : p.hasDrop
                  ? 'text-rose-400 font-extrabold'
                  : p.isHigh
                  ? 'text-amber-300 font-bold'
                  : 'text-appText-muted font-bold'
              }`}
            >
              {p.isParticle ? `(${p.mora})` : p.mora}
            </span>
          ))}
        </div>
      </div>

      {/* Pitch Info Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-md bg-surface-2 border border-accent/25 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-accent/15">
              <h3 className="text-sm font-bold text-appText-bright flex items-center gap-2">
                <span>🎵</span>
                <span>Panduan Intonasi Nada (Pitch Accent)</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-full bg-surface-3 hover:bg-surface text-appText-muted hover:text-appText-bright flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-appText leading-relaxed">
              Bahasa Jepang menggunakan <strong>Pitch Accent</strong> (tinggi-rendah nada suara per ketukan mora), bukan penekanan volume (stress accent) seperti bahasa Inggris atau Indonesia. Nada yang tepat membedakan kata serupa seperti <em>ame</em> (hujan 🌧️ = nada tinggi di awal) vs <em>ame</em> (permen 🍬 = nada rendah lalu naik).
            </p>

            <div className="space-y-2 pt-1">
              {Object.entries(PATTERN_NAMES).map(([key, item]) => (
                <div
                  key={key}
                  className={`p-3 rounded-2xl border text-xs space-y-1 ${
                    Number(key) === pattern
                      ? 'bg-amber-500/15 border-amber-500 text-appText-bright font-medium'
                      : 'bg-surface border-accent/15 text-appText'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-accent">{item.kanji} — {item.name}</span>
                    {Number(key) === pattern && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-300">
                        Kata Ini
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-appText-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full min-h-[44px] rounded-xl bg-accent text-bg font-bold text-xs active:scale-95 transition-all shadow-md"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
