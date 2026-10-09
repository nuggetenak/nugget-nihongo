import React, { useState, useEffect } from 'react';
import { Volume2, X, Sparkles, BookOpen, RotateCcw } from 'lucide-react';
import { NormalizedVocab, NormalizedGrammar } from '../../lib/data/dataManager';
import { speakJapanese } from '../../lib/audio/tts';
import { ConjugationModal } from '../grammar/ConjugationModal';

interface DetailModalProps {
  item: (NormalizedVocab | NormalizedGrammar) | null;
  type: 'vocab' | 'grammar';
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ item, type, onClose }) => {
  const [isConjugationModalOpen, setIsConjugationModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const isVocab = type === 'vocab';
  const vocab = isVocab ? (item as NormalizedVocab) : null;
  const grammar = !isVocab ? (item as NormalizedGrammar) : null;

  const title = vocab ? vocab.word : grammar?.pattern;
  const reading = vocab ? vocab.reading : grammar?.reading;
  const meaning = vocab ? vocab.meaning : grammar?.meaning;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg max-h-[88dvh] sm:max-h-[90vh] overflow-y-auto bg-surface border-t-2 sm:border-2 border-accent/30 rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl relative animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200"
      >
        {/* Mobile Drag Handle Pill */}
        <div className="w-12 h-1.5 rounded-full bg-accent/25 mx-auto -mt-1 mb-3 sm:hidden shrink-0" />
        {/* Top Header Row */}
        <div className="flex items-center justify-between border-b border-accent/15 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent-hot">
              {item.level.toUpperCase()}
            </span>
            <span className="text-xs font-semibold text-appText-muted capitalize">
              {isVocab ? (vocab?.pos || 'Kosakata') : 'Tata Bahasa'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-2 hover:bg-surface-3 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Word Display & Audio Button */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-jp font-bold text-appText-bright leading-tight">
              {title}
            </div>
            {reading && reading !== title && (
              <div className="text-sm font-jp text-amber-300">
                【{reading}】 {vocab?.romaji && <span className="font-ui text-xs text-appText-muted ml-1">({vocab.romaji})</span>}
              </div>
            )}
          </div>

          <button
            onClick={() => speakJapanese(title || '')}
            className="w-11 h-11 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-accent-hot flex items-center justify-center shadow-sm transition-all"
            title="Dengarkan pelafalan asli"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Meaning Box */}
        <div className="bg-surface-2 rounded-2xl p-4 border border-accent/15 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-accent">Arti / Terjemahan:</div>
          <div className="text-base font-semibold text-appText-bright leading-relaxed">
            {meaning}
          </div>
        </div>

        {/* Nuance / Explanation (if present) */}
        {(vocab?.nuance || grammar?.desc) && (
          <div className="space-y-1.5 text-xs text-appText-muted leading-relaxed">
            <div className="font-bold text-appText-bright flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Nuansa Penggunaan:</span>
            </div>
            <div
              className="bg-surface-2/60 p-3 rounded-xl border border-accent/10"
              dangerouslySetInnerHTML={{ __html: vocab?.nuance || grammar?.desc || '' }}
            />
          </div>
        )}

        {/* Quick Conjugation Matrix Link for Verbs */}
        {isVocab && (
          <div>
            <button
              onClick={() => setIsConjugationModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent/40 text-accent-hot text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 text-accent" />
              <span>Buka Matriks Konjugasi Lengkap ({title})</span>
            </button>
          </div>
        )}

        {/* Examples Section */}
        {item.examples && item.examples.length > 0 && (
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-appText-bright flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-accent" />
              <span>Contoh Kalimat:</span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {item.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="bg-surface-2/70 p-3 rounded-xl border border-accent/10 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 flex-1">
                    <div
                      className="font-jp text-appText-bright text-sm"
                      dangerouslySetInnerHTML={{ __html: ex.jp }}
                    />
                    <div className="text-appText-muted">{ex.id}</div>
                  </div>
                  <button
                    onClick={() => speakJapanese(ex.jp)}
                    className="p-1.5 rounded-lg bg-surface hover:bg-surface-3 text-appText-muted hover:text-accent transition-all shrink-0"
                    title="Dengarkan kalimat"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Verb Conjugation Matrix Modal */}
      <ConjugationModal
        isOpen={isConjugationModalOpen}
        onClose={() => setIsConjugationModalOpen(false)}
        initialVerb={title}
      />
    </div>
  );
};
