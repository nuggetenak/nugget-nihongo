// ══════════════════════════════════════════════════════════════════
//  ExplanationStage.tsx — Tahap 2: Bedah Materi & Pola Kalimat (3 Pilar)
//  Pilar 1: 📖 Pola Tata Bahasa & Logika Alur Berpikir (Grammar & Framework)
//  Pilar 2: 🗂️ Bedah Kosakata Inti, Pasangan Partikel & Pitch Accent
//  Pilar 3: ⚠️ Waspada Kesalahan Umum Orang Indonesia (❌ vs ✅) & Contextual Tools
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Layers,
  Sparkles,
  Check,
  X,
  MessageCircle,
  PenTool,
  Music,
} from 'lucide-react';
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
import { useModalStore } from '../../../store/useModalStore';
import { lookupPitch } from '../../../lib/data/pitchAccentManager';
import { calculatePitchContour, playPitchToneMelody } from '../../../lib/pitch/pitchEngine';
import { RubyText } from '../../ui/RubyText';

interface ExplanationStageProps {
  explanations?: LessonExplanationSection[];
  pedagogicalFramework?: LessonPedagogicalFramework;
  vocabBreakdown?: LessonVocabDetail[];
  commonPitfalls?: CommonPitfallItem[];
  trackId?: string;
  unitNumber?: number;
  onCompleteStage?: () => void;
}

export const ExplanationStage: React.FC<ExplanationStageProps> = ({
  explanations = [],
  pedagogicalFramework,
  vocabBreakdown = [],
  commonPitfalls = [],
  trackId,
  unitNumber,
  onCompleteStage,
}) => {
  const { openSenseiSheet } = useAppStore();
  const { openModal } = useModalStore();

  // 3-Pillar Segmented View State for Clean, Non-Overwhelming Cognitive Flow
  const [activeSubTab, setActiveSubTab] = useState<'grammar' | 'vocab' | 'pitfalls'>('grammar');

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

  const isCountersRelevant =
    (trackId?.toLowerCase().includes('n5') && unitNumber === 4) ||
    pedagogicalFramework?.what?.summary?.toLowerCase().includes('hitung') ||
    pedagogicalFramework?.what?.summary?.toLowerCase().includes('bilangan');

  const isKeigoRelevant =
    (trackId?.toLowerCase().includes('n4') && (unitNumber === 14 || unitNumber === 15)) ||
    trackId?.toLowerCase().includes('n3') ||
    trackId?.toLowerCase().includes('ssw') ||
    pedagogicalFramework?.what?.summary?.toLowerCase().includes('keigo') ||
    pedagogicalFramework?.what?.summary?.toLowerCase().includes('hormat');

  return (
    <div className="space-y-6 min-w-0">
      {/* ── 1. SUB-VIEW SEGMENTED TAB SWITCHER (MINIMALIS & ERGONOMIS) ── */}
      <div
        role="tablist"
        aria-label="Pilar Pembelajaran Bedah Materi"
        className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-surface-2 border border-accent/20 overflow-x-auto scrollbar-none shrink-0"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeSubTab === 'grammar'}
          onClick={() => setActiveSubTab('grammar')}
          className={`flex-1 min-w-[120px] min-h-[42px] px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 ${
            activeSubTab === 'grammar'
              ? 'bg-accent text-bg shadow-sm font-extrabold'
              : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3'
          }`}
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          <span>Pola Tata Bahasa</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeSubTab === 'vocab'}
          onClick={() => setActiveSubTab('vocab')}
          className={`flex-1 min-w-[120px] min-h-[42px] px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 ${
            activeSubTab === 'vocab'
              ? 'bg-accent text-bg shadow-sm font-extrabold'
              : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3'
          }`}
        >
          <Layers className="w-4 h-4 shrink-0" />
          <span>Kosakata Inti ({vocabBreakdown.length})</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeSubTab === 'pitfalls'}
          onClick={() => setActiveSubTab('pitfalls')}
          className={`flex-1 min-w-[120px] min-h-[42px] px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 ${
            activeSubTab === 'pitfalls'
              ? 'bg-accent text-bg shadow-sm font-extrabold'
              : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3'
          }`}
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Jebakan & Tips ({activePitfalls.length})</span>
        </button>
      </div>

      {/* ── 2. KONTEN PILAR SESUAI TAB AKTIF ───────────────────────── */}
      <div className="animate-in fade-in duration-200 space-y-6">
        {/* ══════════════════════════════════════════════════════════ */}
        {/* PILAR 1: POLA TATA BAHASA & LOGIKA ALUR BERPIKIR           */}
        {/* ══════════════════════════════════════════════════════════ */}
        {activeSubTab === 'grammar' && (
          <div className="space-y-6">
            {/* Konteks Situasi Nyata & Logika Sensei (Pedagogical Framework) */}
            {pedagogicalFramework && (
              <PedagogicalFrameworkCard framework={pedagogicalFramework} />
            )}

            {/* Bedah Pola Tata Bahasa & Partikel Terurai */}
            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-accent" />
                    <span>Bedah Pola Tata Bahasa & Partikel ({explanations.length} Pola)</span>
                  </h4>
                  <p className="text-[11px] text-appText-muted mt-0.5">
                    Pahami logika urutan kata, fungsi partikel, dan variasi bentuk percakapan
                  </p>
                </div>
              </div>

              {(!explanations || explanations.length === 0) ? (
                <div className="py-8 text-center text-appText-muted text-xs bg-surface-2/40 rounded-2xl p-6 border border-accent/15">
                  Penjelasan umum termuat dalam kartu skenario di atas. Silakan lanjut ke kosakata atau latihan.
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
                        <h3 className="text-base sm:text-lg font-bold text-appText-bright pt-1 break-words">
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
                        className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shrink-0 shadow-xs"
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
                        <div className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
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
                        <div className="text-xs font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
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
                                <RubyText text={fv.jp} />
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
                                  <RubyText text={ex.jp} furigana={ex.furigana} />
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
                                    <RubyText text={pair.jpA} />
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
                                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                    {pair.speakerB} (Respons):
                                  </span>
                                  <div className="text-xs font-jp font-semibold text-appText-bright break-words">
                                    <RubyText text={pair.jpB} />
                                  </div>
                                  <div className="text-[11px] text-appText-muted">
                                    {pair.idB}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handlePlayAudio(pair.jpB)}
                                  className="min-h-[32px] min-w-[32px] p-1.5 rounded-lg bg-surface border border-accent/20 text-emerald-600 dark:text-emerald-400 shrink-0 flex items-center justify-center active:scale-95"
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
                        <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>{exp.contrastiveTrap.warningTitle}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px] py-1">
                          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 flex items-start gap-1.5">
                            <X className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                            <span className="break-words">{exp.contrastiveTrap.wrongExample}</span>
                          </div>
                          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
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

            {/* Guided Transition to Pillar 2 (Vocab) */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setActiveSubTab('vocab');
                  const studioContainer = document.getElementById('lesson-studio-top');
                  if (studioContainer) studioContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }}
                className="min-h-[46px] px-5 py-2.5 rounded-2xl bg-surface-2 hover:bg-surface-3 border border-accent/25 text-accent font-bold text-xs flex items-center gap-2 transition-all active:scale-95 shadow-sm"
              >
                <span>Lanjut: Kosakata Inti ({vocabBreakdown.length} Kata)</span>
                <ArrowRight className="w-4 h-4 text-accent" />
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════ */}
        {/* PILAR 2: BEDAH KOSAKATA INTI & PITCH ACCENT                */}
        {/* ══════════════════════════════════════════════════════════ */}
        {activeSubTab === 'vocab' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                  <Layers className="w-4 h-4 text-accent" />
                  <span>Bedah Kosakata Inti Pelajaran ({vocabBreakdown.length} Kata)</span>
                </h4>
                <p className="text-[11px] text-appText-muted mt-0.5">
                  Kuasai pelafalan alami, kontur nada (pitch accent), dan pasangan partikel
                </p>
              </div>
            </div>

            {(!vocabBreakdown || vocabBreakdown.length === 0) ? (
              <div className="py-8 text-center text-appText-muted text-xs bg-surface-2/40 rounded-2xl p-6 border border-accent/15">
                Kosakata pada pelajaran ini terintegrasi penuh dalam penjelasan tata bahasa.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
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
                              <RubyText text={vb.word} furigana={vb.reading} />
                            </div>
                            {/[一-龯]/.test(vb.word) && (
                              <button
                                type="button"
                                onClick={() => {
                                  const firstKanji = vb.word.match(/[一-龯]/)?.[0] || vb.word[0];
                                  handleOpenKanji(firstKanji, vb.meaning, vb.reading);
                                }}
                                className="min-h-[40px] px-2.5 py-1 rounded-lg bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-accent border border-accent/20 text-xs font-bold flex items-center gap-1 active:scale-95 transition-colors"
                                title="Latihan goresan kanji"
                              >
                                <PenTool className="w-3.5 h-3.5 text-accent" />
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

                          {(() => {
                            const pitch = vb.pitch || lookupPitch(vb.word, vb.reading);
                            if (!pitch) return null;
                            const contour = calculatePitchContour(vb.reading || vb.word, pitch.pattern);
                            return (
                              <button
                                type="button"
                                onClick={() => playPitchToneMelody(contour.moras, contour.particlePitch)}
                                className="min-h-[40px] min-w-[40px] p-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-700 dark:text-purple-300 transition-colors flex items-center justify-center active:scale-95"
                                title={`Dengarkan nada melodi pitch (${contour.categoryLabel})`}
                                aria-label={`Dengarkan nada melodi pitch`}
                              >
                                <Music className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                              </button>
                            );
                          })()}
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
                            className="text-accent hover:text-accent-hot text-xs flex items-center gap-1.5 min-h-[40px] px-2.5 py-1 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/15 active:scale-95 transition-all"
                            title="Dengarkan contoh kalimat"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Putar</span>
                          </button>
                        </div>
                        <div className="text-xs font-jp font-semibold text-appText-bright break-words">
                          <RubyText text={vb.exampleSentence.jp} furigana={vb.exampleSentence.furigana} />
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
            )}

            {/* Peralatan Belajar Terkait (Contextual Tools) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-accent/20 space-y-3 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">🧰</span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent">
                    Peralatan Belajar Terkait
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => openModal('toolbox')}
                  className="text-[11px] font-bold text-accent hover:underline flex items-center gap-1 active:scale-95"
                >
                  <span>Kotak Peralatan</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {isCountersRelevant && (
                  <button
                    type="button"
                    onClick={() => openModal('counters')}
                    className="min-h-[40px] px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-sm"
                    title="Buka Pelatih Kata Bantu Bilangan"
                  >
                    <span className="text-sm">🔢</span>
                    <span>Pelatih Hitungan (Counters)</span>
                  </button>
                )}

                {isKeigoRelevant && (
                  <button
                    type="button"
                    onClick={() => openModal('keigo')}
                    className="min-h-[40px] px-3.5 py-2 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-sm"
                    title="Buka Pelatih Keigo & Etiket Kerja"
                  >
                    <span className="text-sm">💼</span>
                    <span>Pelatih Keigo & Etiket Kerja</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => openModal('pitch')}
                  className="min-h-[40px] px-3.5 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-sm"
                  title="Buka Studio Pitch Accent"
                >
                  <span className="text-sm">🗣️</span>
                  <span>Studio Pitch Accent</span>
                </button>
              </div>
            </div>

            {/* Guided Navigation Footer */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveSubTab('grammar');
                  const studioContainer = document.getElementById('lesson-studio-top');
                  if (studioContainer) studioContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }}
                className="w-full sm:w-auto min-h-[44px] px-4 py-2 text-xs font-bold text-appText-muted hover:text-accent flex items-center justify-center gap-1.5 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Pola Tata Bahasa</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveSubTab('pitfalls');
                  const studioContainer = document.getElementById('lesson-studio-top');
                  if (studioContainer) studioContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }}
                className="w-full sm:w-auto min-h-[46px] px-5 py-2.5 rounded-2xl bg-surface-2 hover:bg-surface-3 border border-accent/25 text-accent font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
              >
                <span>Lanjut: Jebakan & Tips ({activePitfalls.length})</span>
                <ArrowRight className="w-4 h-4 text-accent" />
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════ */}
        {/* PILAR 3: WASPADA KESALAHAN UMUM & EVALUASI                 */}
        {/* ══════════════════════════════════════════════════════════ */}
        {activeSubTab === 'pitfalls' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>Waspada Kesalahan Umum Orang Indonesia ({activePitfalls.length} Tips)</span>
              </h4>
              <p className="text-[11px] text-appText-muted mt-0.5">
                Kebiasaan menerjemahkan kata demi kata dari bahasa Indonesia yang sering membuat bingung orang Jepang
              </p>
            </div>

            {(!activePitfalls || activePitfalls.length === 0) ? (
              <div className="py-8 text-center text-appText-muted text-xs bg-surface-2/40 rounded-2xl p-6 border border-accent/15">
                Tidak ada jebakan leksikal khusus pada pelajaran ini. Kamu siap melangkah ke latihan kuis!
              </div>
            ) : (
              <div className="space-y-3.5">
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
            )}

            {/* Final Milestone CTA to Stage 3 (Drills) */}
            {onCompleteStage && (
              <div className="pt-6 border-t border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-appText-muted">
                  Sudah memahami rumus, kosakata, dan jebakannya? Latih pemahamanmu dengan kuis interaktif.
                </div>
                <button
                  type="button"
                  onClick={onCompleteStage}
                  className="w-full sm:w-auto min-h-[46px] px-6 py-2.5 rounded-2xl bg-accent hover:bg-accent-hot text-bg font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Mulai Cek Pemahaman (Kuis)</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Kanji Stroke Animator & Practice Modal */}
      <KanjiStrokeModal
        isOpen={isKanjiModalOpen}
        onClose={() => setIsKanjiModalOpen(false)}
        kanjiInfo={selectedKanji}
      />
    </div>
  );
};
