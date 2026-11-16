// ══════════════════════════════════════════════════════════════════
//  CbtSimulatorPillar.tsx — Pilar 4: Simulator CBT Resmi
//  JLPT N5–N1, JFT-Basic, Prometric SSW 19 Sektor & Choukai CBT
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { ExamLmsHub } from '../../../components/exercise/ExamLmsHub';

export interface CbtSimulatorPillarProps {
  onOpenTool: (toolId: string) => void;
  onStartExerciseSet: (setId: string, mode: 'guided' | 'strict') => void;
  onStartQuizSession: (mode: any) => void;
}

export const CbtSimulatorPillar: React.FC<CbtSimulatorPillarProps> = ({
  onOpenTool,
  onStartExerciseSet,
  onStartQuizSession,
}) => {
  const scrollToLmsDoors = () => {
    if (typeof document !== 'undefined') {
      const targetEl = document.getElementById('exam-lms-doors');
      if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-accent/15 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 font-extrabold text-xs mb-1">
              <span>🎯 CBT Ujian Resmi</span>
              <span className="text-appText-muted font-normal">· 公式CBT試験シミュレーター</span>
            </div>
            <h2 className="text-base sm:text-xl font-extrabold text-appText-bright tracking-tight">
              Simulator Ujian CBT Resmi & Standar Internasional
            </h2>
            <p className="text-xs text-appText-muted mt-0.5">
              Simulasi ujian berbasis komputer dengan antarmuka otentik, timer batas waktu resmi, lembar jawaban interaktif, dan kalkulasi skor kelulusan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-accent bg-surface-2 px-3 py-1.5 rounded-full border border-accent/20">
              5 Simulator Standar
            </span>
          </div>
        </div>

        {/* 5 Official Exam Simulator Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {/* Card 1: Simulasi Lengkap JLPT CBT (N5 - N1) */}
          <div
            role="button"
            tabIndex={0}
            onClick={scrollToLmsDoors}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToLmsDoors();
              }
            }}
            aria-label="Simulasi Lengkap JLPT CBT (N5–N1): 14 Set Ujian Lengkap"
            className="bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-amber-500/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group active:scale-95 min-h-[220px]"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-surface/90 border border-accent/25 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 group-hover:border-amber-500/40 transition-all shrink-0">
                  🏛️
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-amber-500/15 text-accent font-semibold border-amber-500/30 shrink-0">
                  14 Set · N5–N1
                </span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-amber-400 transition-colors leading-snug">
                  Simulasi Lengkap JLPT CBT (N5–N1)
                </h3>
                <p className="text-xs sm:text-sm font-mono text-appText-muted mt-0.5" lang="ja">
                  JLPT模擬試験CBT
                </p>
              </div>
              <p className="text-sm text-appText-muted leading-relaxed">
                14 set ujian lengkap berstandar resmi JLPT: Moji/Goi, Bunpou, Dokkai, dan Choukai dengan timer countdown dan lembar jawaban otentik.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between text-xs">
              <span className="text-xs text-appText-muted font-medium">Batas Waktu Standar</span>
              <span className="text-xs sm:text-sm text-amber-400 font-extrabold group-hover:translate-x-1 transition-transform shrink-0">
                Pilih Set Ujian →
              </span>
            </div>
          </div>

          {/* Card 2: Simulasi JFT-Basic CBT (A1 / A2) */}
          <div
            role="button"
            tabIndex={0}
            onClick={scrollToLmsDoors}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToLmsDoors();
              }
            }}
            aria-label="Simulasi JFT-Basic CBT (A1/A2): 60 Butir Soal"
            className="bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-blue-500/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group active:scale-95 min-h-[220px]"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-surface/90 border border-accent/25 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 group-hover:border-blue-500/40 transition-all shrink-0">
                  🌏
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-blue-500/15 text-blue-400 font-semibold border-blue-500/30 shrink-0">
                  Standar A1/A2 · 60 Menit
                </span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-blue-400 transition-colors leading-snug">
                  Simulasi JFT-Basic CBT (A1/A2)
                </h3>
                <p className="text-xs sm:text-sm font-mono text-appText-muted mt-0.5" lang="ja">
                  国際交流基金 JFT-Basic
                </p>
              </div>
              <p className="text-sm text-appText-muted leading-relaxed">
                Simulasi ujian Japan Foundation Test for Basic Japanese: 60 butir soal percakapan nyata dan kemampuan komunikasi kerja di Jepang.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between text-xs">
              <span className="text-xs text-appText-muted font-medium">Syarat Kerja SSW</span>
              <span className="text-xs sm:text-sm text-blue-400 font-extrabold group-hover:translate-x-1 transition-transform shrink-0">
                Buka Ujian JFT →
              </span>
            </div>
          </div>

          {/* Card 3: Simulasi Prometric Tokutei Ginou SSW CBT (19 Sektor) */}
          <div
            role="button"
            tabIndex={0}
            onClick={scrollToLmsDoors}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToLmsDoors();
              }
            }}
            aria-label="Simulasi Prometric Tokutei Ginou (SSW): 19 Sektor Prometric"
            className="bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-emerald-500/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group active:scale-95 min-h-[220px]"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-surface/90 border border-accent/25 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 group-hover:border-emerald-500/40 transition-all shrink-0">
                  🏭
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-emerald-500/15 text-emerald-400 font-semibold border-emerald-500/30 shrink-0">
                  19 Sektor Prometric
                </span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-emerald-400 transition-colors leading-snug">
                  Simulasi Prometric Tokutei Ginou (SSW)
                </h3>
                <p className="text-xs sm:text-sm font-mono text-appText-muted mt-0.5" lang="ja">
                  特定技能評価試験
                </p>
              </div>
              <p className="text-sm text-appText-muted leading-relaxed">
                Latihan ujian keahlian khusus SSW: Kaigo (perawat lansia), pengolahan makanan, restoran, pertanian, konstruksi, dan manufaktur.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between text-xs">
              <span className="text-xs text-appText-muted font-medium">Standar Prometric</span>
              <span className="text-xs sm:text-sm text-emerald-400 font-extrabold group-hover:translate-x-1 transition-transform shrink-0">
                Buka Sektor SSW →
              </span>
            </div>
          </div>

          {/* Card 4: Simulator Menyimak Choukai (CBT Resmi) */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onOpenTool('choukai')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenTool('choukai');
              }
            }}
            aria-label="Simulator Menyimak Choukai (CBT Resmi): 163 Soal Audio Resmi"
            className="bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-purple-500/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group active:scale-95 min-h-[220px]"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-surface/90 border border-accent/25 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 group-hover:border-purple-500/40 transition-all shrink-0">
                  🎧
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-purple-500/15 text-purple-400 font-semibold border-purple-500/30 shrink-0">
                  163 Soal Audio Resmi
                </span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-purple-400 transition-colors leading-snug">
                  Simulator Menyimak Choukai (CBT Resmi)
                </h3>
                <p className="text-xs sm:text-sm font-mono text-appText-muted mt-0.5" lang="ja">
                  聴解CBTシミュレーター
                </p>
              </div>
              <p className="text-sm text-appText-muted leading-relaxed">
                Official listening tracks & audio drills otentik dengan 163 soal simulasi ujian Choukai berstandar JLPT dan JFT-Basic CBT lengkap naskah transkrip.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between text-xs">
              <span className="text-xs text-appText-muted font-medium">Player Audio Imersif</span>
              <span className="text-xs sm:text-sm text-purple-400 font-extrabold group-hover:translate-x-1 transition-transform shrink-0">
                Mulai Choukai →
              </span>
            </div>
          </div>

          {/* Card 5: Tes Penempatan Adaptif CAT (IRT 3PL) */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onOpenTool('cat')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenTool('cat');
              }
            }}
            aria-label="Tes Penempatan Adaptif CAT: 10-12 Soal IRT Presisi"
            className="bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-amber-500/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group active:scale-95 min-h-[220px]"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-surface/90 border border-accent/25 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 group-hover:border-amber-500/40 transition-all shrink-0">
                  🎯
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-amber-500/15 text-accent font-semibold border-amber-500/30 shrink-0">
                  10–12 Soal IRT Presisi
                </span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-accent transition-colors leading-snug">
                  Tes Penempatan Adaptif CAT
                </h3>
                <p className="text-xs sm:text-sm font-mono text-appText-muted mt-0.5" lang="ja">
                  適応型プレースメントテスト
                </p>
              </div>
              <p className="text-sm text-appText-muted leading-relaxed">
                Diagnosa kemampuan bahasa Jepang (JLPT N5–N1) secara presisi dalam 10–12 soal adaptif berbasis Item Response Theory (IRT 3PL).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between text-xs">
              <span className="text-xs text-appText-muted font-medium">Diagnosa Instan</span>
              <span className="text-xs sm:text-sm text-accent font-extrabold group-hover:translate-x-1 transition-transform shrink-0">
                Mulai Tes Diagnosa →
              </span>
            </div>
          </div>
        </div>

        {/* Embedded Exam LMS Hub (The 3 Clean Doors) */}
        <div id="exam-lms-doors" className="pt-8 border-t border-accent/20">
          <div className="mb-4">
            <h3 className="text-sm sm:text-base font-extrabold text-appText-bright tracking-tight flex items-center gap-2">
              <span>🏛️</span>
              <span>Gerbang Set Latihan CBT Lengkap</span>
            </h3>
            <p className="text-xs text-appText-muted mt-0.5">
              Pilih paket soal ujian resmi di bawah ini untuk memulai sesi ujian CBT interaktif.
            </p>
          </div>
          <ExamLmsHub
            onStartExerciseSet={onStartExerciseSet}
            onStartFSRSDue={() => onStartQuizSession('flashcard')}
            onStartMistakeReview={() => onStartQuizSession('multiple-choice')}
            onStartDynamicDrill={(count) => {
              onStartQuizSession('multiple-choice');
            }}
            dueCount={0}
            mistakesCount={0}
          />
        </div>
      </section>
    </div>
  );
};
