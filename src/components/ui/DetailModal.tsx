import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Volume2, X, Sparkles, BookOpen, RotateCcw, Flag, Eye, EyeOff, Zap, Music } from 'lucide-react';
import { NormalizedVocab, NormalizedGrammar } from '../../lib/data/dataManager';
import { speakJapanese } from '../../lib/audio/tts';
import { useAppStore } from '../../store/useAppStore';
import { useModalStore } from '../../store/useModalStore';
import { PitchAccentBadge } from '../curriculum/interactive/PitchAccentBadge';
import { RubyText } from './RubyText';
import { lookupPitch } from '../../lib/data/pitchAccentManager';
import { calculatePitchContour, playPitchToneMelody } from '../../lib/pitch/pitchEngine';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { IrasutoyaImage } from '../common/IrasutoyaImage';

interface DetailModalProps {
  item: (NormalizedVocab | NormalizedGrammar) | null;
  type: 'vocab' | 'grammar';
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ item, type, onClose }) => {
  const { setActiveTab } = useAppStore();
  const [blurTranslations, setBlurTranslations] = useState(false);
  const [revealedSentences, setRevealedSentences] = useState<Record<number, boolean>>({});
  const focusTrapRef = useFocusTrap<HTMLDivElement>(!!item, onClose);
  useBodyScrollLock(!!item);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
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

  const jlptAsset =
    item.level === 'n1' ? 'jlpt_n1' :
    item.level === 'n2' ? 'jlpt_n2' :
    item.level === 'n3' ? 'jlpt_n3' :
    item.level === 'n4' ? 'jlpt_n4' : 'jlpt_n5';

  const modalContent = (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        ref={focusTrapRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg max-h-[88dvh] sm:max-h-[90vh] overflow-y-auto bg-surface border-t-2 sm:border-2 border-accent/30 rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl relative animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
      >
        {/* Mobile Drag Handle Pill */}
        <div className="w-12 h-1.5 rounded-full bg-accent/25 mx-auto -mt-1 mb-3 sm:hidden shrink-0" />
        {/* Top Header Row */}
        <div className="flex items-center justify-between border-b border-accent/15 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 overflow-hidden">
              <IrasutoyaImage
                assetId={jlptAsset as any}
                className="w-7 h-7 object-contain"
                alt={`Tingkat ${item.level.toUpperCase()}`}
                animateFloat
              />
            </div>
            <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 font-extrabold">
              {item.level.toUpperCase()}
            </span>
            <span className="text-xs font-semibold text-appText-muted capitalize">
              {isVocab ? (vocab?.pos || 'Kosakata') : 'Tata Bahasa'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-surface-2 hover:bg-surface-3 border border-accent/20 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            title="Tutup dialog detail materi"
            aria-label="Tutup dialog detail materi"
          >
            <X className="w-5 h-5" />
            <span className="sr-only">Tutup dialog</span>
          </button>
        </div>

        {/* Word Display & Audio Button */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div id="detail-modal-title" className="text-3xl sm:text-4xl font-jp font-bold text-appText-bright leading-tight [word-break:keep-all] [overflow-wrap:anywhere]">
              <RubyText text={title || ''} furigana={reading} />
            </div>
            {vocab?.romaji && (
              <div className="text-xs font-ui text-appText-muted">
                ({vocab.romaji})
              </div>
            )}
            {isVocab && (() => {
              const pitch = (vocab as any)?.pitch || (title ? lookupPitch(title, reading) : undefined);
              if (!pitch) return null;
              return (
                <div className="pt-2 flex items-center gap-2 flex-wrap">
                  <PitchAccentBadge reading={reading || title || ''} pattern={pitch.pattern} />
                  <button
                    type="button"
                    onClick={() => {
                      const contour = calculatePitchContour(reading || title || '', pitch.pattern);
                      playPitchToneMelody(contour.moras, contour.particlePitch);
                    }}
                    className="min-h-[40px] px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
                    title="Dengarkan melodi nada tinggi-rendah"
                    aria-label="Dengarkan melodi nada tinggi-rendah"
                  >
                    <Music className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>Melodi Nada</span>
                  </button>
                </div>
              );
            })()}
          </div>

          <button
            onClick={() => speakJapanese(title || '')}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-accent-hot flex items-center justify-center shadow-sm transition-all active:scale-95"
            title="Dengarkan pelafalan asli"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Meaning Box */}
        <div className="card-interactive-lift bg-surface-2 rounded-2xl p-4 border border-accent/15 space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 font-extrabold">Arti / Terjemahan:</div>
          <div className="text-base font-semibold text-appText-bright leading-relaxed">
            {meaning}
          </div>
        </div>

        {/* Nuance / Explanation (if present) */}
        {grammar?.connection && (
          <div className="space-y-1.5 text-xs text-appText-muted leading-relaxed">
            <div className="font-bold text-appText-bright flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>Pola Pembentukan (Rumus Sambungan):</span>
            </div>
            <div className="bg-surface-2/60 p-3 rounded-xl border border-accent/10 font-mono text-xs text-accent-hot font-bold tracking-wide">
              {grammar.connection}
            </div>
          </div>
        )}

        {(vocab?.nuance || grammar?.desc || grammar?.nuance) && (
          <div className="space-y-1.5 text-xs text-appText-muted leading-relaxed">
            <div className="font-bold text-appText-bright flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Nuansa Penggunaan:</span>
            </div>
            <div
              className="bg-surface-2/60 p-3 rounded-xl border border-accent/10"
              dangerouslySetInnerHTML={{ __html: vocab?.nuance || grammar?.nuance || grammar?.desc || '' }}
            />
          </div>
        )}

        {/* Quick Conjugation Matrix Link for Verbs */}
        {isVocab && (
          <div>
            <button
              onClick={() => useModalStore.getState().openModal('conjugation', { initialVerb: title || '' })}
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent/40 text-accent-hot text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-accent" />
              <span>Buka Matriks Konjugasi Lengkap ({title})</span>
            </button>
          </div>
        )}

        {/* Examples Section */}
        {item.examples && item.examples.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-appText-bright">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-accent" />
                <span>Contoh Kalimat:</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setBlurTranslations(!blurTranslations);
                  setRevealedSentences({});
                }}
                className="text-xs font-semibold text-accent hover:text-accent-hot flex items-center gap-1 px-2.5 py-1 min-h-[36px] rounded-lg bg-surface-2 border border-accent/20 transition-colors active:scale-95"
                title="Samarkan terjemahan untuk latihan membaca mandiri"
              >
                {blurTranslations ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                <span>{blurTranslations ? 'Buka Semua' : 'Samarkan'}</span>
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {item.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="card-interactive-lift bg-surface-2/70 p-3 rounded-xl border border-accent/10 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 flex-1">
                    <div
                      className="font-jp text-appText-bright text-sm"
                      >
                      <RubyText text={ex.jp.replace(/<\/?[a-z0-9]+>/gi, '')} furigana={(ex as any).furigana} />
                    </div>
                    {blurTranslations && !revealedSentences[idx] ? (
                      <button
                        type="button"
                        onClick={() => setRevealedSentences((prev) => ({ ...prev, [idx]: true }))}
                        className="inline-flex items-center gap-1 text-xs text-accent/80 hover:text-accent select-none cursor-pointer min-h-[32px]"
                        title="Klik untuk melihat terjemahan"
                      >
                        <span className="blur-[4px] opacity-40">{ex.id}</span>
                        <span className="text-xs bg-amber-500/15 px-1.5 py-0.5 rounded font-bold">
                          Intip 👁️
                        </span>
                      </button>
                    ) : (
                      <div className="text-appText-muted">{ex.id}</div>
                    )}
                  </div>
                  <button
                    onClick={() => speakJapanese(ex.jp)}
                    className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-lg bg-surface hover:bg-surface-3 text-appText-muted hover:text-accent transition-all shrink-0 flex items-center justify-center active:scale-95"
                    title="Dengarkan kalimat"
                    aria-label="Dengarkan kalimat contoh"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action: Practice item directly in Arena Kuis */}
        <div className="pt-2">
          <button
            onClick={() => {
              onClose();
              setActiveTab('quiz');
            }}
            className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-accent hover:bg-accent-hot text-bg font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-glow active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-bg" />
            <span>Latih di Arena Kuis 🎯</span>
          </button>
        </div>

        {/* Report Content Mistake / Unnatural Sentence */}
        <div className="pt-1 border-t border-accent/15">
          <button
            onClick={() =>
              useModalStore.getState().openModal('reportIssue', {
                itemId: item.id,
                itemType: isVocab ? 'vocab' : 'grammar',
                originalJapanese: title || '',
                originalTranslation: isVocab ? vocab?.meaning : grammar?.meaning,
              })
            }
            className="w-full min-h-[40px] py-2 px-3 rounded-xl bg-surface-2/60 hover:bg-surface-2 border border-accent/15 text-appText-muted hover:text-appText-bright hover:bg-surface-3 hover:border-accent/40 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Flag className="w-3.5 h-3.5 text-accent" />
            <span>Laporkan Kesalahan / Kalimat Rancu 🚩</span>
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
};
