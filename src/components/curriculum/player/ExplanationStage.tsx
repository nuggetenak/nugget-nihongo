// ══════════════════════════════════════════════════════════════════
//  ExplanationStage.tsx — Tahap 2: Bedah Rumus & Kartu Riset 5W1H
//  Menyajikan penjelasan tata bahasa, analisis L1, & kerangka riset
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { Volume2, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { LessonExplanationSection, LessonPedagogicalFramework } from '../../../types/curriculum';
import { PedagogicalFrameworkCard } from './PedagogicalFrameworkCard';
import { speakJapanese } from '../../../lib/audio/speechEngine';

interface ExplanationStageProps {
  explanations?: LessonExplanationSection[];
  pedagogicalFramework?: LessonPedagogicalFramework;
}

export const ExplanationStage: React.FC<ExplanationStageProps> = ({
  explanations = [],
  pedagogicalFramework,
}) => {
  const handlePlayExample = (text: string) => {
    speakJapanese(text, 1.0);
  };

  return (
    <div className="space-y-6">
      {/* ── 1. Kartu Riset 5W1H & Skenario (Progressive Disclosure) ─ */}
      {pedagogicalFramework && (
        <PedagogicalFrameworkCard framework={pedagogicalFramework} />
      )}

      {/* ── 2. Bedah Pola Tata Bahasa Terurai ────────────────────── */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-appText-muted flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-accent" />
          <span>Dekonstruksi Pola & Rumus Tata Bahasa</span>
        </h4>

        {(!explanations || explanations.length === 0) ? (
          <div className="py-8 text-center text-appText-muted text-xs">
            Penjelasan umum termuat dalam kartu riset di atas. Silakan lanjut ke latihan.
          </div>
        ) : (
          explanations.map((exp, idx) => (
            <div
              key={exp.id || idx}
              className="p-4 sm:p-5 rounded-2xl bg-surface border border-accent/20 space-y-3.5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-appText-bright">
                    {exp.title}
                  </h3>
                  <div className="text-xs text-appText-muted mt-0.5">
                    {exp.meaning}
                  </div>
                </div>
              </div>

              {/* Rumus Formula */}
              <div className="p-3 rounded-xl bg-surface-2 border border-accent/15 font-mono text-xs sm:text-sm text-accent font-bold flex items-center gap-2">
                <ArrowRight className="w-3.5 h-3.5 text-accent-hot shrink-0" />
                <span className="break-words">{exp.formula}</span>
              </div>

              {/* Catatan Nuansa */}
              {exp.nuanceNotes && (
                <p className="text-xs text-appText leading-relaxed">
                  {exp.nuanceNotes}
                </p>
              )}

              {/* Contoh Kalimat */}
              {exp.examples && exp.examples.length > 0 && (
                <div className="pt-2 border-t border-accent/10 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-appText-muted">
                    Contoh Penggunaan Alami:
                  </div>
                  <div className="space-y-2">
                    {exp.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="p-3 rounded-xl bg-surface-2/60 border border-accent/10 flex items-start justify-between gap-2"
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="text-sm font-jp font-semibold text-appText-bright break-words">
                            {ex.jp}
                          </div>
                          {ex.romaji && (
                            <div className="text-[11px] font-mono text-appText-muted">
                              {ex.romaji}
                            </div>
                          )}
                          <div className="text-xs text-appText">
                            {ex.idText}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handlePlayExample(ex.jp)}
                          className="min-h-[36px] min-w-[36px] p-2 rounded-xl bg-surface border border-accent/20 text-accent hover:bg-surface-3 transition-colors shrink-0 flex items-center justify-center active:scale-95"
                          title="Dengarkan contoh kalimat"
                          aria-label={`Dengarkan contoh kalimat ${ex.jp}`}
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Peringatan Trap Tersemat jika ada */}
              {exp.contrastiveTrap && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs space-y-1.5">
                  <div className="font-bold text-red-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{exp.contrastiveTrap.warningTitle}</span>
                  </div>
                  <p className="text-appText leading-relaxed">
                    {exp.contrastiveTrap.explanation}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
