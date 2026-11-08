// ══════════════════════════════════════════════════════════════════
//  StarScrambleWidget.tsx — Interactive Sentence Ordering (Mondai 2)
//  Research Basis: Bunsetsu Syntax Ergonomics, WCAG AAA Touch Targets
//  Zero-Drag Tap-to-Slot & Tap-to-Return Architecture for Mobile
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { Star, RotateCcw, Sparkles } from 'lucide-react';
import { ExerciseItem, StarScramblePayload } from '../../types/exercise';
import { IrasutoyaImage } from '../common/IrasutoyaImage';
import {
  findMatchingOptionIndex,
  slotAvailableToken,
  unslotToken,
  resetScrambleState,
} from '../../lib/exercise/starScrambleHelper';

interface StarScrambleWidgetProps {
  item: ExerciseItem;
  questionIndex: number;
  availableTokens: string[];
  slottedTokens: (string | null)[];
  onTokenChange: (available: string[], slots: (string | null)[]) => void;
  selectedOptionIndex?: number;
  onSelectOption: (optionIndex: number) => void;
  isSubmitted?: boolean;
}

export const StarScrambleWidget: React.FC<StarScrambleWidgetProps> = ({
  item,
  availableTokens,
  slottedTokens,
  onTokenChange,
  selectedOptionIndex,
  onSelectOption,
  isSubmitted = false,
}) => {
  const scramble = item.starScramble;
  if (!scramble) return null;

  const starPosition = Math.max(1, Math.min(4, Math.floor(scramble.starPosition || 1)));

  // Auto-sync Star slot token with matching option index (Ticket T-41)
  React.useEffect(() => {
    if (isSubmitted) return;
    const starToken = slottedTokens[starPosition - 1];
    if (starToken) {
      const matchIdx = findMatchingOptionIndex(starToken, item.options);
      if (matchIdx !== -1 && selectedOptionIndex !== matchIdx) {
        onSelectOption(matchIdx);
      }
    } else if (selectedOptionIndex !== undefined && selectedOptionIndex >= 0) {
      // Star slot is empty, clear selection if currently selected
      onSelectOption(-1);
    }
  }, [slottedTokens, starPosition, item.options, selectedOptionIndex, isSubmitted, onSelectOption]);

  // Tap available token to insert into first empty slot
  const handleTapAvailableToken = (token: string, tokenIdx: number) => {
    if (isSubmitted) return;
    const next = slotAvailableToken(availableTokens, slottedTokens, tokenIdx);
    if (next.slottedIndex !== -1) {
      onTokenChange(next.availableTokens, next.slottedTokens);
    }
  };

  // Tap slotted token to return to available bank
  const handleTapSlot = (slotIdx: number) => {
    if (isSubmitted) return;
    const next = unslotToken(availableTokens, slottedTokens, slotIdx);
    if (next.returnedToken !== null) {
      onTokenChange(next.availableTokens, next.slottedTokens);
    }
  };

  // Reset all tokens back to bank
  const handleReset = () => {
    if (isSubmitted) return;
    const reset = resetScrambleState(item.starScramble!.tokens);
    onTokenChange(reset.availableTokens, reset.slottedTokens);
    onSelectOption(-1);
  };

  return (
    <div className="space-y-4 sm:space-y-5 bg-surface-2/60 border border-theme/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
      {/* ── HEADER & INSTRUCTIONS ──────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 border-b border-theme/60 pb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
            <IrasutoyaImage
              assetId="senpai_studying"
              className="w-8 h-8 object-contain"
              alt="Mondai 2 Susun Kalimat"
              animateFloat
            />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-400 font-bold">
              Mondai 2: Susun Kalimat (★)
            </span>
            <p className="text-xs text-appText-muted truncate">
              Ketuk kata untuk mengisi slot. Tentukan kata pada slot bintang (★).
            </p>
          </div>
        </div>

        {!isSubmitted && (
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-surface hover:bg-surface-3 border border-theme text-xs font-bold text-appText-bright flex items-center gap-1.5 transition-all active:scale-95 shrink-0 shadow-sm"
            title="Reset susunan kalimat"
          >
            <RotateCcw className="w-3.5 h-3.5 text-accent" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}
      </div>

      {/* ── SENTENCE TARGET WITH 4 SLOTTED GAPS ─────────────────────── */}
      <div className="card-interactive-lift bg-surface border border-theme rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="text-xs font-bold text-appText-muted uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Kalimat Rumpang Soal:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-base sm:text-xl font-bold text-appText-bright leading-relaxed">
          {/* Lead text */}
          {scramble.leadText && (
            <span className="text-appText-bright font-medium">{scramble.leadText}</span>
          )}

          {/* 4 Slots */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[0, 1, 2, 3].map((slotIdx) => {
              const isStarSlot = slotIdx + 1 === starPosition;
              const filledToken = slottedTokens[slotIdx];

              return (
                <button
                  key={slotIdx}
                  type="button"
                  onClick={() => handleTapSlot(slotIdx)}
                  disabled={isSubmitted}
                  className={`min-h-[44px] min-w-[64px] sm:min-w-[80px] px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1 border-2 active:scale-95 ${
                    isStarSlot
                      ? filledToken
                        ? 'animate-slot-snap bg-amber-500/20 border-amber-400 text-amber-700 dark:text-amber-300 font-bold shadow-sm'
                        : 'bg-amber-500/10 border-dashed border-amber-400/80 text-amber-700 dark:text-amber-300/80 font-bold animate-pulse'
                      : filledToken
                      ? 'animate-slot-snap bg-surface-2 border-theme text-appText-bright shadow-sm'
                      : 'bg-surface-2/40 border-dashed border-theme text-appText-muted'
                  }`}
                  title={filledToken ? `Ketuk untuk kembalikan "${filledToken}"` : `Slot ${slotIdx + 1}`}
                >
                  {isStarSlot && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />}
                  {filledToken ? (
                    <span className="truncate max-w-[120px]">{filledToken}</span>
                  ) : (
                    <span className="text-xs font-mono font-bold opacity-60">
                      {isStarSlot ? '★' : `[ ${slotIdx + 1} ]`}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tail text */}
          {scramble.tailText && (
            <span className="text-appText-bright font-medium">{scramble.tailText}</span>
          )}
        </div>
      </div>

      {/* ── WORD BANK: AVAILABLE TOKENS ────────────────────────────── */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-appText-muted uppercase tracking-wider">
          Bank Pilihan Kata (Ketuk untuk Menaruh):
        </div>

        <div className="flex flex-wrap gap-2">
          {availableTokens.map((token, tokenIdx) => (
            <button
              key={`${token}-${tokenIdx}`}
              type="button"
              onClick={() => handleTapAvailableToken(token, tokenIdx)}
              disabled={isSubmitted}
              className="card-interactive-lift min-h-[44px] px-4 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme text-appText-bright font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-95 hover:border-amber-500/50 flex items-center gap-1.5"
            >
              <span>{token}</span>
            </button>
          ))}

          {availableTokens.length === 0 && (
            <div className="text-xs text-emerald-700 dark:text-emerald-400 font-bold py-2 flex items-center gap-1.5">
              <span>✓ Semua kata telah terpasang ke dalam slot kalimat.</span>
            </div>
          )}
        </div>
      </div>

      {/* ── 4 OPTIONS (A, B, C, D) CORRESPONDING TO STAR POSITION ──── */}
      <div className="pt-2 border-t border-theme/60 space-y-2.5">
        <div className="text-xs font-bold text-appText-muted uppercase tracking-wider flex items-center justify-between">
          <span>Kata manakah yang masuk pada slot bintang (★)?</span>
          {slottedTokens[starPosition - 1] && (
            <span className="text-amber-800 dark:text-amber-400 font-mono font-bold">
              Terpilih: {slottedTokens[starPosition - 1]}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {item.options.map((option, optIdx) => {
            const isSelected = selectedOptionIndex === optIdx;
            const optionLetter = ['A', 'B', 'C', 'D'][optIdx] || `${optIdx + 1}`;

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => onSelectOption(optIdx)}
                disabled={isSubmitted}
                className={`card-interactive-lift min-h-[48px] px-4 py-3 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all flex items-center justify-between gap-3 active:scale-[0.98] ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 text-amber-900 dark:text-amber-300 font-bold shadow-sm'
                    : 'bg-surface hover:bg-surface-2 border-theme text-appText-bright'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-surface-2 text-appText-muted border border-theme'
                    }`}
                  >
                    {optionLetter}
                  </span>
                  <span className="break-words leading-tight">{option}</span>
                </div>

                {isSelected && (
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
