// ══════════════════════════════════════════════════════════════════
//  PitchContourView.tsx — Interactive SVG Pitch Contour & Mora Tile View
//  Renders dynamic high/low pitch line, downstep indicator & audio triggers
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { Volume2, Music } from 'lucide-react';
import { MoraUnit, playPitchToneMelody } from '../../lib/pitch/pitchEngine';
import { speakJapanese } from '../../lib/audio/tts';

interface PitchContourViewProps {
  kana: string;
  kanji?: string;
  moras: MoraUnit[];
  particlePitch?: 'high' | 'low';
  particleText?: string;
  categoryLabel?: string;
  badgeColor?: string;
  compact?: boolean;
}

export const PitchContourView: React.FC<PitchContourViewProps> = ({
  kana,
  kanji,
  moras,
  particlePitch = 'high',
  particleText = 'が',
  categoryLabel,
  badgeColor = 'bg-accent/20 text-accent border-accent/30',
  compact = false,
}) => {
  const stepWidth = compact ? 28 : 36;
  const highY = compact ? 8 : 10;
  const lowY = compact ? 26 : 30;
  const svgHeight = compact ? 36 : 42;

  // Build points for polyline including the particle
  const allUnits = [...moras];
  const totalSteps = allUnits.length + 1; // +1 for particle
  const totalSvgWidth = totalSteps * stepWidth;

  const points = allUnits.map((m, i) => {
    const x = i * stepWidth + stepWidth / 2;
    const y = m.isHigh ? highY : lowY;
    return `${x},${y}`;
  });

  // Particle point
  const particleX = allUnits.length * stepWidth + stepWidth / 2;
  const particleY = particlePitch === 'high' ? highY : lowY;
  const polylinePoints = [...points, `${particleX},${particleY}`].join(' ');

  const handlePlayVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakJapanese(kana);
  };

  const handlePlayTone = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPitchToneMelody(moras, particlePitch);
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Category & Kanji Header */}
      <div className="flex items-center gap-2 mb-1.5 flex-wrap justify-center">
        {kanji && (
          <span className="text-base sm:text-lg font-black text-appText-bright font-jp">
            {kanji}
          </span>
        )}
        {categoryLabel && (
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider ${badgeColor}`}>
            {categoryLabel}
          </span>
        )}
      </div>

      {/* SVG Pitch Curve Visualizer */}
      <div className="relative overflow-visible py-1">
        <svg
          width={totalSvgWidth}
          height={svgHeight}
          className="overflow-visible"
          role="img"
          aria-label={`Grafik kontur nada untuk ${kana}`}
        >
          {/* Pitch Contour Line */}
          <polyline
            fill="none"
            stroke="currentColor"
            className="text-amber-400/80 drop-shadow-sm"
            strokeWidth={compact ? '2' : '2.5'}
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polylinePoints}
          />

          {/* Mora Circles */}
          {allUnits.map((m, i) => {
            const cx = i * stepWidth + stepWidth / 2;
            const cy = m.isHigh ? highY : lowY;
            return (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={compact ? 4 : 5}
                  className={m.hasDrop ? 'fill-rose-500 stroke-2 stroke-surface' : 'fill-amber-400 stroke-2 stroke-surface'}
                />
                {m.hasDrop && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={compact ? 7 : 8}
                    className="stroke-rose-500 fill-none opacity-40 animate-ping"
                    strokeWidth="1"
                  />
                )}
              </g>
            );
          })}

          {/* Particle Circle */}
          <circle
            cx={particleX}
            cy={particleY}
            r={compact ? 3.5 : 4}
            className="fill-sky-400 stroke-2 stroke-surface"
          />
        </svg>

        {/* Mora Label Tiles */}
        <div className="flex mt-1">
          {allUnits.map((m, i) => (
            <div
              key={i}
              style={{ width: `${stepWidth}px` }}
              className="text-center font-jp text-xs sm:text-sm font-bold text-appText-bright transition-transform hover:scale-110"
            >
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 mx-auto rounded-lg flex items-center justify-center border text-xs sm:text-xs font-black ${
                  m.isHigh
                    ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/40 shadow-xs'
                    : 'bg-surface-3 text-appText-muted border-accent/15'
                }`}
              >
                {m.mora}
              </div>
            </div>
          ))}

          {/* Particle Label Tile */}
          <div
            style={{ width: `${stepWidth}px` }}
            className="text-center font-jp text-xs sm:text-sm font-bold text-sky-800 dark:text-sky-400"
            title="Partikel pengiring [ga] menunjukkan letak jatuhnya nada"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 mx-auto rounded-lg flex items-center justify-center border border-sky-500/30 bg-sky-500/15 text-sky-800 dark:text-sky-300 text-xs font-black">
              {particleText}
            </div>
          </div>
        </div>
      </div>

      {/* Audio Controls Toolbar */}
      <div className="flex items-center gap-2 mt-2.5">
        <button
          type="button"
          onClick={handlePlayVoice}
          className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-surface hover:bg-surface-3 border border-accent/20 text-appText-muted hover:text-accent text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-xs"
          title="Dengarkan pengucapan suara asli (TTS)"
        >
          <Volume2 className="w-4 h-4 text-accent" />
          <span>Suara</span>
        </button>

        <button
          type="button"
          onClick={handlePlayTone}
          className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-surface hover:bg-surface-3 border border-amber-500/20 text-appText-muted hover:text-amber-500 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-xs"
          title="Dengarkan melodi nada tinggi-rendah (Web Audio Beep)"
        >
          <Music className="w-4 h-4 text-amber-500" />
          <span>Melodi Nada</span>
        </button>
      </div>
    </div>
  );
};
