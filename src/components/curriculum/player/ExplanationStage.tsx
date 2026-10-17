// ══════════════════════════════════════════════════════════════════
//  ExplanationStage.tsx — Tahap 2: Bedah Materi & Pola Kalimat (4 Pilar)
//  1. Konteks Situasi & Logika Sensei
//  2. Bedah Kosakata Inti & Pasangan Partikel
//  3. Bedah Pola Tata Bahasa, Partikel & Variasi Kalimat
//  4. Waspada Kesalahan Umum Orang Indonesia (❌ vs ✅)
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { Volume2, BookOpen, AlertCircle, ArrowRight, Layers, Sparkles, Check, X, MessageCircle, PenTool } from 'lucide-react';
import {
  LessonExplanationSection,
  LessonPedagogicalFramework,
  LessonVocabDetail,
  CommonPitfallItem,
} from '../../../types/curriculum';
import { PedagogicalFrameworkCard } from './PedagogicalFrameworkCard';
import { speakJapanese } from '../../../lib/audio/speechEngine';
import { PitchAccentBadge } from '../interactive/PitchAccentBadge';
import { KanjiStrokeModal, KanjiDetailInfo } from '../interactive/KanjiStrokeModal';
import { useAppStore } from '../../../store/useAppStore';
import { lookupPitch } from '../../../lib/data/pitchAccentManager';

interface ExplanationStageProps {
  explanations?: LessonExplanationSection[];
  pedagogicalFramework?: LessonPedagogicalFramework;
  vocabBreakdown?: LessonVocabDetail[];
  commonPitfalls?: CommonPitfallItem[];
}

export const ExplanationStage: React.FC<ExplanationStageProps> = ({
  explanations = [],
  pedagogicalFramework,
  vocabBreakdown = [],
  commonPitfalls = [],
}) => {
  const { openSenseiSheet } = useAppStore();
  const [selectedKanji, setSelectedKanji] = useState<KanjiDetailInfo | null>(null);
  const [isKanjiModalOpen, setIsKanjiModalOpen] = useState(false);

  const handleOpenKanji = (kanjiChar: string, meaning: string, reading: string) => {
    setSelectedKanji({
      kanji: kanjiChar,
      meanings: [meaning],
      onyomi: [reading],
      kunyomi: [],
    });
    setIsKanjiModalOpen(true);
  };

  const handlePlayAudio = (text: string) => {
    speakJapanese(text, 1.0);
  };

  // Gabungkan daftar jebakan umum dari prop atau dari framework
  const activePitfalls =
    commonPitfalls.length > 0
      ? commonPitfalls
      : pedagogicalFramework?.common_pitfalls || pedagogicalFramework?.edge_cases || [];

  return (
    <div className="space-y-7 min-w-0">
      {/* ── PILAR 1: Konteks Situasi Nyata & Logika Sensei ───────────── */}
      {pedagogicalFramework && (
        <PedagogicalFrameworkCard framework={pedagogicalFramework} />
      )}

      {/* ── PILAR 2: Bedah Kosakata Inti (Vocab Breakdown) ──────────── */}
      {vocabBreakdown && vocabBreakdown.length > 0 && (
        <div className="space-y-4 pt-1">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                <Layers className="w-4 h-4 text-accent" />
                <span>Bedah Kosakata Inti Pelajaran ({vocabBreakdown.length} Kata)</span>
              </h4>
              <p className="text-[11px] text-appText-muted mt-0.5">
                Kuasai kata kunci dan pasangan partikel alaminya sebelum menyusun pola kalimat
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {vocabBreakdown.map((vb) => (
              <div
                key={vb.id}
                className="p-4 rounded-2xl bg-surface border border-accent/20 space-y-2.5 shadow-sm hover:border-accent/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="text-lg font-bold font-jp text-appText-bright leading-tight break-words">
                          {vb.word}
                        </div>
                        {/[一-龯]/.test(vb.word) && (
                          <button
                            type="button"
                            onClick={() => {
                              const firstKanji = vb.word.match(/[一-龯]/)?.[0] || vb.word[0];
                              handleOpenKanji(firstKanji, vb.meaning, vb.reading);
                            }}
                            className="px-2 py-0.5 rounded-lg bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-accent border border-accent/20 text-[10px] font-bold flex items-center gap-1 active:scale-95 transition-colors"
                            title="Latihan goresan kanji"
                          >
                            <PenTool className="w-3 h-3 text-accent" />
                            <span>Goresan</span>
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-xs text-accent font-jp font-semibold">
                          {vb.reading}
                        </span>
                        {(() => {
                          const pitch = vb.pitch || lookupPitch(vb.word, vb.reading);
                          if (!pitch) return null;
                          return (
                            <PitchAccentBadge
                              reading={vb.reading || vb.word}
                              pattern={pitch.pattern}
                              compact
                            />
                          );
                        })()}
                      </div>
                      <div className="text-[11px] font-mono text-appText-muted">
                        {vb.romaji}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          openSenseiSheet({
                            id: vb.id,
                            type: 'vocab',
                            level: 'n5',
                            target: vb.word,
                            meaning_id: vb.meaning,
                          })
                        }
                        className="min-h-[40px] min-w-[40px] p-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-800 dark:text-amber-300 transition-colors flex items-center justify-center active:scale-95"
                        title={`Tanya Sensei tentang kata ${vb.word}`}
                        aria-label={`Tanya Sensei tentang kata ${vb.word}`}
                      >
                        <span className="text-sm">🍵</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePlayAudio(vb.word)}
                        className="min-h-[40px] min-w-[40px] p-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-accent transition-colors flex items-center justify-center active:scale-95"
                        title={`Dengarkan pelafalan ${vb.word}`}
                        aria-label={`Dengarkan pelafalan ${vb.word}`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {vb.pos && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-accent/15 text-accent font-semibold border border-accent/20">
                        {vb.pos}
                      </span>
                    )}
                    <span className="text-xs font-bold text-appText-bright">
                      {vb.meaning}
                    </span>
                  </div>

                  {vb.nuance && (
                    <div className="text-[11px] text-appText-muted leading-relaxed bg-surface-2/60 p-2 rounded-xl">
                      💡 {vb.nuance}
                    </div>
                  )}

                  {vb.particleTip && (
                    <div className="text-[11px] text-amber-800 dark:text-amber-200 bg-amber-500/15 dark:bg-amber-500/20 p-2 rounded-xl border border-amber-500/30 font-medium">
                      🔗 <strong className="text-amber-900 dark:text-amber-200">Pasangan Partikel:</strong> {vb.particleTip}
                    </div>
                  )}
                </div>

                {vb.exampleSentence && (
                  <div className="pt-2 border-t border-accent/10 space-y-1 bg-surface-2/40 p-2.5 rounded-xl">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-appText-muted">
                        Contoh Pemakaian:
                      </span>
                      <button
                        type="button"
                        onClick={() => handlePlayAudio(vb.exampleSentence!.jp)}
                        className="text-accent hover:text-accent-hot text-[11px] flex items-center gap-1 min-h-[28px] px-1.5 py-0.5 rounded active:scale-95"
                        title="Dengarkan contoh kalimat"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Putar</span>
                      </button>
                    </div>
                    <div className="text-xs font-jp font-semibold text-appText-bright break-words">
                      {vb.exampleSentence.jp}
                    </div>
                    {vb.exampleSentence.romaji && (
                      <div className="text-[10px] font-mono text-appText-muted">
                        {vb.exampleSentence.romaji}
                      </div>
                    )}
                    <div className="text-[11px] text-appText">
                      {vb.exampleSentence.idText}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PILAR 3: Bedah Pola Tata Bahasa & Partikel Terurai ───────── */}
      <div className="space-y-4 pt-1">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-accent" />
            <span>Bedah Pola Tata Bahasa & Partikel</span>
          </h4>
          <p className="text-[11px] text-appText-muted mt-0.5">
            Pahami logika urutan kata, fungsi partikel, dan variasi bentuk percakapan
          </p>
        </div>

        {(!explanations || explanations.length === 0) ? (
          <div className="py-8 text-center text-appText-muted text-xs">
            Penjelasan umum termuat dalam kartu skenario di atas. Silakan lanjut ke latihan.
          </div>
        ) : (
          explanations.map((exp, idx) => (
            <div
              key={exp.id || idx}
              className="p-4 sm:p-6 rounded-3xl bg-surface border border-accent/20 space-y-4 shadow-sm"
            >
              {/* Header Pola */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/15 px-2 py-0.5 rounded-md border border-accent/20">
                    Pola #{idx + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-appText-bright pt-1 truncate">
                    {exp.title}
                  </h3>
                  <div className="text-xs text-appText-muted">
                    {exp.meaning}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openSenseiSheet({
                      id: exp.id || `exp-${idx}`,
                      type: 'grammar',
                      level: 'n5',
                      target: exp.title,
                      meaning_id: exp.meaning,
                      structure: exp.formula,
                    })
                  }
                  className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shrink-0 shadow-xs"
                  title="Tanya penjelasan detail ke Sensei AI"
                >
                  <span>🍵</span>
                  <span className="hidden sm:inline">Tanya Sensei</span>
                </button>
              </div>

              {/* Rumus Formula */}
              <div className="p-3.5 rounded-2xl bg-surface-2 border border-accent/20 font-mono text-xs sm:text-sm text-accent font-bold flex items-center gap-2 shadow-inner">
                <ArrowRight className="w-4 h-4 text-accent-hot shrink-0" />
                <span className="break-words">{exp.formula}</span>
              </div>

              {/* Logika Berpikir di Balik Pola */}
              {exp.patternLogic && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Logika Berpikir di Balik Pola Ini:</span>
                  </div>
                  <p className="text-xs text-appText leading-relaxed">
                    {exp.patternLogic}
                  </p>
                </div>
              )}

              {/* Peran Partikel dalam Pola */}
              {exp.particleNotes && (
                <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1">
                  <div className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                    <span>Peran & Bunyi Partikel:</span>
                  </div>
                  <p className="text-xs text-appText leading-relaxed">
                    {exp.particleNotes}
                  </p>
                </div>
              )}

              {/* Catatan Nuansa Tambahan */}
              {exp.nuanceNotes && (
                <p className="text-xs text-appText leading-relaxed px-1">
                  {exp.nuanceNotes}
                </p>
              )}

              {/* Variasi Bentuk (Positif, Negatif, Tanya) */}
              {exp.formVariations && exp.formVariations.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-accent/10">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-appText-muted">
                    Variasi Bentuk Kalimat:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {exp.formVariations.map((fv, fvIdx) => (
                      <div
                        key={fvIdx}
                        className="p-3 rounded-xl bg-surface-2 border border-accent/15 space-y-1"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">
                          {fv.label}
                        </span>
                        <div className="text-xs font-jp font-bold text-appText-bright break-words">
                          {fv.jp}
                        </div>
                        <div className="text-[11px] text-appText-muted">
                          {fv.idText}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contoh Kalimat Mandiri */}
              {exp.examples && exp.examples.length > 0 && (
                <div className="pt-2 border-t border-accent/10 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-appText-muted">
                    Contoh Penggunaan Alami:
                  </div>
                  <div className="space-y-2">
                    {exp.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="p-3 rounded-2xl bg-surface-2/60 border border-accent/10 flex items-start justify-between gap-2"
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
                          onClick={() => handlePlayAudio(ex.jp)}
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

              {/* Percakapan Tanya Jawab Berpasangan */}
              {exp.pairedExamples && exp.pairedExamples.length > 0 && (
                <div className="pt-2 border-t border-accent/10 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-appText-muted flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-accent" />
                    <span>Contoh Percakapan Berpasangan (Tanya & Jawab):</span>
                  </div>
                  <div className="space-y-2.5">
                    {exp.pairedExamples.map((pair, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-3.5 rounded-2xl bg-surface-2 border border-accent/15 space-y-2.5"
                      >
                        {/* Pembicara A (Pertanyaan) */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5 min-w-0">
                            <span className="text-[10px] font-bold text-accent">
                              {pair.speakerA}:
                            </span>
                            <div className="text-xs font-jp font-semibold text-appText-bright break-words">
                              {pair.jpA}
                            </div>
                            <div className="text-[11px] text-appText-muted">
                              {pair.idA}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handlePlayAudio(pair.jpA)}
                            className="min-h-[32px] min-w-[32px] p-1.5 rounded-lg bg-surface border border-accent/20 text-accent shrink-0 flex items-center justify-center active:scale-95"
                            title={`Dengarkan ${pair.speakerA}`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Pembicara B (Respons) */}
                        <div className="flex items-start justify-between gap-2 pt-2 border-t border-accent/10">
                          <div className="space-y-0.5 min-w-0">
                            <span className="text-[10px] font-bold text-emerald-400">
                              {pair.speakerB}:
                            </span>
                            <div className="text-xs font-jp font-semibold text-appText-bright break-words">
                              {pair.jpB}
                            </div>
                            <div className="text-[11px] text-appText-muted">
                              {pair.idB}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handlePlayAudio(pair.jpB)}
                            className="min-h-[32px] min-w-[32px] p-1.5 rounded-lg bg-surface border border-accent/20 text-emerald-400 shrink-0 flex items-center justify-center active:scale-95"
                            title={`Dengarkan ${pair.speakerB}`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Peringatan Trap Tersemat jika ada */}
              {exp.contrastiveTrap && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs space-y-1.5">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>{exp.contrastiveTrap.warningTitle}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px] py-1">
                    <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 flex items-start gap-1.5">
                      <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <span className="break-words">{exp.contrastiveTrap.wrongExample}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="break-words">{exp.contrastiveTrap.rightExample}</span>
                    </div>
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

      {/* ── PILAR 4: Waspada Kesalahan Umum Orang Indonesia ────────── */}
      {activePitfalls && activePitfalls.length > 0 && (
        <div className="space-y-3 pt-2">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span>Waspada Kesalahan Umum Orang Indonesia</span>
            </h4>
            <p className="text-[11px] text-appText-muted mt-0.5">
              Kebiasaan menerjemahkan kata demi kata dari bahasa Indonesia yang sering membuat bingung orang Jepang
            </p>
          </div>

          <div className="space-y-3">
            {activePitfalls.map((pf, pfIdx) => (
              <div
                key={pfIdx}
                className="p-4 sm:p-5 rounded-2xl bg-surface border border-red-500/20 space-y-2.5 shadow-sm"
              >
                <div className="font-bold text-xs sm:text-sm text-red-700 dark:text-red-300 flex items-center gap-1.5">
                  <span>⚡</span>
                  <span>{pf.title}</span>
                </div>

                {pf.caseScenario && (
                  <div className="text-[11px] text-appText-muted">
                    Situasi: {pf.caseScenario}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-800 dark:text-red-300 flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="break-words">{pf.pitfallWarning?.replace(/^[❌✅✔]\s*/, '')}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="break-words">{pf.rightSolution?.replace(/^[❌✅✔]\s*/, '')}</span>
                  </div>
                </div>

                <p className="text-xs text-appText leading-relaxed pt-1">
                  {pf.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Kanji Stroke Animator & Practice Modal */}
      <KanjiStrokeModal
        isOpen={isKanjiModalOpen}
        onClose={() => setIsKanjiModalOpen(false)}
        kanjiInfo={selectedKanji}
      />
    </div>
  );
};
