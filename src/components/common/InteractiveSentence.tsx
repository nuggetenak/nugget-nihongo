// ══════════════════════════════════════════════════════════════════
//  InteractiveSentence.tsx — Tap-to-Breakdown Interactive Sentence Component
//  Tokens Japanese text with one-tap morphological decomposition & dictionary popover
//  Adheres to Universal Multi-Device Responsive Design Rule
// ══════════════════════════════════════════════════════════════════

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, X, Sparkles, BookOpen, ExternalLink, RotateCcw } from 'lucide-react';
import { tokenizeJapanese, JapaneseToken } from '../../lib/japanese/tokenizer';
import { offlineDictionary, WordLookupResult } from '../../lib/japanese/offlineDictionary';
import { deinflectWord, DeinflectionCandidate } from '../../lib/grammar/deinflector';
import { speakJapanese } from '../../lib/audio/speechEngine';
import { RubyText } from '../ui/RubyText';
import { ConjugationModal } from '../grammar/ConjugationModal';

export interface InteractiveSentenceProps {
  sentence: string;
  readingHint?: string;
  translation?: string;
  className?: string;
  tokenClassName?: string;
  showFurigana?: boolean;
  onOpenConjugationModal?: (lemma: string) => void;
}

const POS_LABELS: Record<string, string> = {
  kanji_compound: 'Kata Benda / Senyawa Kanji',
  inflected_verb_adj: 'Kata Kerja / Kata Sifat Terkonjugasi',
  particle: 'Partikel Tata Bahasa (Joshi)',
  katakana_loanword: 'Kata Serapan (Gairaigo)',
  punctuation: 'Tanda Baca',
  other: 'Kosakata / Kata Dasar',
};

export const InteractiveSentence: React.FC<InteractiveSentenceProps> = ({
  sentence,
  readingHint,
  translation,
  className = '',
  tokenClassName = '',
  showFurigana = true,
  onOpenConjugationModal,
}) => {
  const [selectedToken, setSelectedToken] = useState<JapaneseToken | null>(null);
  const [lookupResult, setLookupResult] = useState<WordLookupResult | null>(null);
  const [deinflection, setDeinflection] = useState<DeinflectionCandidate | null>(null);
  const [internalModalVerb, setInternalModalVerb] = useState<string | null>(null);
  const [popoverPos, setPopoverPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!sentence) return null;

  const tokens = tokenizeJapanese(sentence);

  const handleTokenClick = (e: React.MouseEvent<HTMLSpanElement>, token: JapaneseToken) => {
    // Ignore pure punctuation tokens
    if (token.pos === 'punctuation') return;

    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverPos({
      x: Math.max(16, Math.min(rect.left + rect.width / 2, window.innerWidth - 16)),
      y: rect.bottom + 8,
    });

    setSelectedToken(token);

    // Look up dictionary entry
    const res = offlineDictionary.lookup(token.surface);
    setLookupResult(res);

    // Run Yomitan de-inflection
    const candidates = deinflectWord(token.surface);
    if (candidates.length > 0 && candidates[0].lemma !== token.surface) {
      setDeinflection(candidates[0]);
    } else {
      setDeinflection(null);
    }
  };

  const handleClosePopover = () => {
    setSelectedToken(null);
    setLookupResult(null);
    setDeinflection(null);
    setPopoverPos(null);
  };

  const handleOpenConjugation = (lemma: string) => {
    handleClosePopover();
    if (onOpenConjugationModal) {
      onOpenConjugationModal(lemma);
    } else {
      setInternalModalVerb(lemma);
    }
  };

  // Close popover on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedToken) {
        handleClosePopover();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedToken]);

  return (
    <div ref={containerRef} className={`relative inline-block w-full max-w-full ${className}`}>
      {/* Interactive Tokens Container */}
      <div className="flex flex-wrap items-baseline gap-x-0.5 gap-y-1.5 leading-relaxed font-jp">
        {tokens.map((token, idx) => {
          if (token.pos === 'punctuation') {
            return (
              <span key={idx} className="text-appText-muted select-none">
                {token.surface}
              </span>
            );
          }

          const isSelected = selectedToken?.surface === token.surface;

          return (
            <button
              type="button"
              key={idx}
              onClick={(e) => handleTokenClick(e, token)}
              className={`inline-flex items-baseline px-1 py-0.5 rounded-lg text-left transition-all active:scale-95 cursor-pointer select-none border ${
                isSelected
                  ? 'bg-amber-500/20 border-accent text-accent-hot shadow-sm font-bold'
                  : 'border-transparent hover:border-accent/30 hover:bg-surface-2 text-appText-bright'
              } ${tokenClassName}`}
              title={`Ketuk untuk rincian: ${token.surface}`}
            >
              {token.isKanji && showFurigana ? (
                <RubyText text={token.surface} furigana={token.reading} showFurigana={showFurigana} />
              ) : (
                <span>{token.surface}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Optional Indonesian sentence translation */}
      {translation && (
        <div className="mt-2 text-xs sm:text-sm text-appText-muted italic leading-normal">
          {translation}
        </div>
      )}

      {/* Morphological Micro-Popover / Bottom Sheet */}
      {selectedToken && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150"
          onClick={handleClosePopover}
          role="dialog"
          aria-modal="true"
          aria-label={`Rincian Morfologi ${selectedToken.surface}`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-surface border-t-2 sm:border-2 border-accent/30 rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl relative max-h-[85dvh] overflow-y-auto animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200"
          >
            {/* Mobile Drag Handle */}
            <div className="w-12 h-1.5 rounded-full bg-accent/25 mx-auto -mt-1 mb-2 sm:hidden shrink-0" />

            {/* Header: Token Surface & Voice Playback */}
            <div className="flex items-start justify-between gap-3 border-b border-accent/15 pb-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl sm:text-3xl font-jp font-bold text-accent-hot">
                  {selectedToken.surface}
                </div>
                <div>
                  {selectedToken.reading && (
                    <div className="text-xs font-jp text-appText-muted">
                      【{selectedToken.reading}】
                    </div>
                  )}
                  <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-500/15 text-accent border border-accent/25 mt-0.5">
                    {POS_LABELS[selectedToken.pos || 'other']}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => speakJapanese(selectedToken.surface)}
                  className="w-9 h-9 rounded-xl bg-surface-2 hover:bg-amber-500/20 text-accent flex items-center justify-center border border-accent/20 transition-all active:scale-95 shadow-sm"
                  title="Dengarkan pelafalan"
                  aria-label={`Dengarkan ${selectedToken.surface}`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleClosePopover}
                  className="w-9 h-9 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-appText-bright flex items-center justify-center transition-all active:scale-95"
                  title="Tutup popover"
                  aria-label="Tutup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Yomitan De-inflection Notification */}
            {deinflection && (
              <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 space-y-1.5 text-xs text-appText-bright">
                <div className="flex items-center gap-1.5 font-bold text-accent-hot">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Dekomposisi Konjugasi (Yomitan)</span>
                </div>
                <div className="text-[11px] text-appText leading-relaxed">
                  Bentuk dasar (kamus): <strong className="font-jp text-xs text-accent-hot">{deinflection.lemma}</strong>
                </div>
                <div className="text-[11px] text-appText-muted leading-relaxed">
                  Perubahan: {deinflection.reasons.join(' → ')}
                </div>
                {deinflection.steps.length > 0 && (
                  <div className="text-[10px] text-accent italic bg-surface/50 p-2 rounded-lg border border-accent/15 mt-1">
                    {deinflection.steps[0].explanationId}
                  </div>
                )}
              </div>
            )}

            {/* Dictionary Meaning */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Arti Bahasa Indonesia</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-2/70 border border-accent/15 text-sm text-appText-bright font-medium leading-relaxed">
                {lookupResult?.exactMatch?.arti ||
                  (lookupResult?.deinflections?.[0]?.matchedEntry?.arti
                    ? `${lookupResult.deinflections[0].matchedEntry.arti} (dari ${lookupResult.deinflections[0].candidate.lemma})`
                    : deinflection
                    ? `Bentuk terkonjugasi dari verba/adjektiva "${deinflection.lemma}".`
                    : 'Arti dapat dipelajari dalam konteks pelajaran ini.')}
              </div>
            </div>

            {/* Action Buttons: Conjugation Matrix */}
            {(deinflection || selectedToken.pos === 'inflected_verb_adj') && (
              <button
                type="button"
                onClick={() => handleOpenConjugation(deinflection?.lemma || selectedToken.surface)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-accent to-accent-hot hover:opacity-95 text-bg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Lihat di Matriks Konjugasi ({deinflection?.lemma || selectedToken.surface})</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Internal Fallback Conjugation Modal */}
      {internalModalVerb && (
        <ConjugationModal
          isOpen={true}
          onClose={() => setInternalModalVerb(null)}
          initialVerb={internalModalVerb}
        />
      )}
    </div>
  );
};

export default InteractiveSentence;
