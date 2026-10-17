// ══════════════════════════════════════════════════════════════════
//  WordLookupSheet.tsx — Interactive Word Lookup & Yomitan De-Inflector Modal
//  Provides one-tap dictionary definitions & conjugation breakdown in reading passages
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { X, Volume2, BookOpen, GitCommit, Sparkles, Layers } from 'lucide-react';
import { offlineDictionary, WordLookupResult } from '../../lib/japanese/offlineDictionary';
import { audioService } from '../../lib/audio/audioService';

interface WordLookupSheetProps {
  word: string;
  isOpen: boolean;
  onClose: () => void;
}

export const WordLookupSheet: React.FC<WordLookupSheetProps> = ({ word, isOpen, onClose }) => {
  if (!isOpen || !word) return null;

  const result: WordLookupResult = offlineDictionary.lookup(word);

  const handlePlayAudio = () => {
    audioService.speak(word);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="word-lookup-title"
        className="w-full sm:max-w-md bg-surface border-t sm:border border-accent/25 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-200 max-h-[90dvh] overflow-y-auto min-w-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle Bar */}
        <div className="w-12 h-1.5 bg-surface-3 rounded-full mx-auto sm:hidden -mt-1 mb-2" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 border-b border-accent/15 pb-4">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 id="word-lookup-title" className="text-2xl font-black text-appText-bright font-jp tracking-wide">
                {word}
              </h2>
              <button
                type="button"
                onClick={handlePlayAudio}
                aria-label={`Dengarkan pelafalan ${word}`}
                className="w-9 h-9 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-accent flex items-center justify-center transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-appText-muted">Kamus Cepat & Analisis Morfologi</div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela kamus"
            className="w-10 h-10 rounded-full bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-appText-bright flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Exact Match Result Card */}
        {result.exactMatch && (
          <div className="bg-surface-2 rounded-2xl p-4 border border-accent/20 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-accent font-mono uppercase tracking-wider">
                {result.exactMatch.level} · {result.exactMatch.pos || 'Kata'}
              </div>
              <div className="text-xs text-appText-muted font-mono">{result.exactMatch.romaji}</div>
            </div>
            <div className="text-base font-bold text-appText-bright">{result.exactMatch.arti}</div>
            <div className="text-xs text-appText-muted font-jp">Cara baca: {result.exactMatch.kana}</div>
          </div>
        )}

        {/* 2. Yomitan De-Inflection Analysis */}
        {result.deinflections.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-appText-bright uppercase tracking-wider">
              <GitCommit className="w-4 h-4 text-accent" />
              <span>Dekomposisi Tata Bahasa (Yomitan)</span>
            </div>

            <div className="space-y-2.5">
              {result.deinflections.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className="font-bold text-accent-hot font-jp text-sm">
                      Bentuk Dasar: {item.candidate.lemma}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-accent text-[10px] font-semibold">
                      {item.candidate.pos}
                    </span>
                  </div>

                  {/* Step by step reason chain */}
                  <div className="space-y-1 text-appText-muted">
                    {item.candidate.steps.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-1.5 text-[11px] leading-tight">
                        <span className="text-accent font-bold">↳</span>
                        <div>
                          <strong className="text-appText-bright">{step.ruleName}</strong>: {step.explanationId}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Matched Lemma Definition */}
                  {item.matchedEntry && (
                    <div className="pt-1.5 border-t border-accent/15 text-xs text-appText-bright font-medium flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>Arti: {item.matchedEntry.arti}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Fallback when no exact match or deinflection */}
        {!result.exactMatch && result.deinflections.length === 0 && (
          <div className="p-6 text-center space-y-2 bg-surface-2 rounded-2xl border border-accent/15">
            <div className="text-2xl">🔍</div>
            <div className="text-sm font-bold text-appText-bright">Kata Belum Terdaftar di Indeks Cepat</div>
            <p className="text-xs text-appText-muted">
              Cobalah mencari kata dasar atau periksa di Kamus Lengkap & Pencarian Global.
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-bright border border-accent/20 text-xs font-bold transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
