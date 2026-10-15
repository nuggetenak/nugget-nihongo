// ══════════════════════════════════════════════════════════════════
//  QuizExplanationDetail.tsx — Rich Pedagogical Explanation Viewer
//  Particle breakdown highlights, readings, translations & grammar tags
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { BookOpen, Sparkles, Volume2, Languages, HelpCircle } from 'lucide-react';
import { speakJapanese } from '../../lib/audio/tts';
import { useAppStore } from '../../store/useAppStore';

interface QuizExplanationDetailProps {
  rawExplanation: string;
  jpSentence?: string;
  reading?: string;
  romaji?: string;
  translation?: string;
}

export const QuizExplanationDetail: React.FC<QuizExplanationDetailProps> = ({
  rawExplanation,
  jpSentence,
  reading,
  romaji,
  translation,
}) => {
  if (!rawExplanation && !jpSentence) return null;

  // Highlight Japanese particles safely without leaking raw <b> or </b> tags
  const renderHighlightedSentence = (text: string) => {
    // Strip raw HTML tags if already present in database string
    const cleanText = text.replace(/<\/?b>/g, '');
    const parts = cleanText.split(/(は|が|を|に|で|へ|と|から|まで|より|だけ|しか)/g);
    return (
      <span className="font-jp text-sm sm:text-base leading-relaxed text-appText-bright">
        {parts.map((p, idx) => {
          const isParticle = ['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'から', 'まで', 'より', 'だけ', 'しか'].includes(p);
          if (isParticle) {
            return (
              <span
                key={idx}
                className="inline-block px-1.5 py-0.5 mx-0.5 rounded-md bg-amber-500/20 text-accent font-bold border border-amber-500/30 text-xs"
                title={`Partikel: ${p}`}
              >
                {p}
              </span>
            );
          }
          return <span key={idx}>{p}</span>;
        })}
      </span>
    );
  };

  const { openSenseiSheet } = useAppStore();

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-surface-2/95 border border-accent/25 space-y-3 text-xs leading-relaxed animate-in fade-in duration-200 shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between text-appText-muted border-b border-accent/15 pb-2">
        <span className="font-bold flex items-center gap-1.5 text-accent text-xs">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Penjelasan Mendalam · 解説</span>
        </span>
        <div className="flex items-center gap-1.5">
          {jpSentence && (
            <button
              type="button"
              onClick={() => speakJapanese(jpSentence)}
              className="px-2 py-1 rounded-lg bg-surface hover:bg-amber-500/20 text-accent transition-all flex items-center gap-1 font-semibold text-[11px] active:scale-95"
              title="Dengarkan pelafalan kalimat Jepang"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Audio</span>
            </button>
          )}

          <button
            type="button"
            onClick={() =>
              openSenseiSheet({
                id: `quiz-exp-${Date.now()}`,
                type: 'quiz',
                level: 'n5',
                target: jpSentence || rawExplanation.slice(0, 35),
                meaning_id: translation || rawExplanation,
              })
            }
            className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold transition-all flex items-center gap-1 text-[11px] active:scale-95 shadow-xs"
            title="Tanya penjelasan kuis ini ke Sensei AI"
          >
            <span>🍵</span>
            <span>Tanya Sensei</span>
          </button>
        </div>
      </div>

      {/* Japanese Sentence with breakdown */}
      {(jpSentence || reading || translation) && (
        <div className="p-3 rounded-xl bg-surface border border-accent/15 space-y-1.5">
          {jpSentence && (
            <div className="flex items-start justify-between gap-2">
              <div>{renderHighlightedSentence(jpSentence)}</div>
            </div>
          )}

          {/* Reading (Hiragana / Furigana) */}
          {reading && (
            <div className="text-xs font-jp text-amber-400/90 font-medium flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-mono px-1 py-0.2 rounded bg-amber-500/15 border border-amber-500/20 text-accent">
                Bacaan
              </span>
              <span>【{reading}】</span>
            </div>
          )}

          {/* Romaji */}
          {romaji && (
            <div className="text-[11px] font-mono text-appText-muted/80">
              /{romaji}/
            </div>
          )}

          {/* Indonesian Translation */}
          {translation && !translation.includes('[TBD]') && (
            <div className="mt-2 pt-2 border-t border-accent/10 flex items-start gap-1.5 text-xs text-appText-bright font-medium">
              <span className="text-accent font-bold shrink-0">Arti:</span>
              <span className="italic leading-relaxed">{translation}</span>
            </div>
          )}
        </div>
      )}

      {/* Pedagogical Explanation Text */}
      {rawExplanation && (
        <div className="text-appText-bright/90 bg-surface/40 p-2.5 rounded-xl border border-accent/10 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-accent">
            Poin Tata Bahasa & Catatan Belajar:
          </div>
          <p className="leading-relaxed text-xs">{rawExplanation}</p>
        </div>
      )}
    </div>
  );
};
