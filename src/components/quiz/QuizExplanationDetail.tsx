// ══════════════════════════════════════════════════════════════════
//  QuizExplanationDetail.tsx — Rich Pedagogical Explanation Viewer
//  Particle breakdown highlights, grammar tags & clear translations
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { BookOpen, Sparkles, Volume2 } from 'lucide-react';
import { speakJapanese } from '../../lib/audio/tts';

interface QuizExplanationDetailProps {
  rawExplanation: string;
  jpSentence?: string;
}

export const QuizExplanationDetail: React.FC<QuizExplanationDetailProps> = ({
  rawExplanation,
  jpSentence,
}) => {
  if (!rawExplanation) return null;

  // Highlight Japanese particles (は, が, を, に, で, へ, と, から, まで)
  const renderHighlightedSentence = (text: string) => {
    const parts = text.split(/(は|が|を|に|で|へ|と|から|まで)/g);
    return (
      <span className="font-jp text-sm sm:text-base leading-relaxed">
        {parts.map((p, idx) => {
          const isParticle = ['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'から', 'まで'].includes(p);
          if (isParticle) {
            return (
              <span
                key={idx}
                className="inline-block px-1.5 py-0.5 mx-0.5 rounded-md bg-amber-500/20 text-accent font-bold border border-amber-500/30 text-xs"
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

  return (
    <div className="p-3.5 sm:p-4 rounded-2xl bg-surface-2/90 border border-accent/20 space-y-2 text-xs leading-relaxed animate-in fade-in duration-200">
      <div className="flex items-center justify-between text-appText-muted">
        <span className="font-bold flex items-center gap-1.5 text-accent">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Penjelasan Mendalam:</span>
        </span>
        {jpSentence && (
          <button
            onClick={() => speakJapanese(jpSentence)}
            className="p-1 rounded-lg bg-surface hover:bg-amber-500/20 text-accent transition-colors"
            title="Dengarkan pelafalan kalimat"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {jpSentence && (
        <div className="p-2.5 rounded-xl bg-surface border border-accent/10">
          {renderHighlightedSentence(jpSentence)}
        </div>
      )}

      <p className="text-appText-bright/90">{rawExplanation}</p>
    </div>
  );
};
