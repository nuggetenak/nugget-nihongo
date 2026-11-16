// ══════════════════════════════════════════════════════════════════
//  ReflexDrillsPillar.tsx — Pilar 1: Sasana Drill Refleks
//  6 Format Latihan Mandiri & Advanced Reflex Workouts
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { Sparkles, ArrowRight, Flame, Zap } from 'lucide-react';
import { JLPTLevel } from '../../../types/curriculum';

export type DrillMode =
  | 'flashcard'
  | 'multiple-choice'
  | 'rearrange'
  | 'fill-in'
  | 'cloze'
  | 'listening'
  | 'panic-recall'
  | 'mora-pacing';

export interface ReflexDrillsPillarProps {
  selectedLevel: JLPTLevel | 'all';
  onSelectLevel: (level: JLPTLevel) => void;
  onOpenTool: (tool: string) => void;
  onStartQuizSession: (mode: any) => void;
}

export const ReflexDrillsPillar: React.FC<ReflexDrillsPillarProps> = ({
  selectedLevel,
  onSelectLevel,
  onOpenTool,
  onStartQuizSession,
}) => {
  const currentLvl = selectedLevel === 'all' ? 'n5' : selectedLevel;

  return (
    <section className="space-y-4 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-accent/15 pb-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent font-extrabold text-xs mb-1">
            <span>🥋 Sasana Praktik Mandiri</span>
            <span className="text-appText-muted font-normal">· 自主練習道場</span>
          </div>
          <h2 className="text-base sm:text-xl font-extrabold text-appText-bright tracking-tight">
            Pusat Latihan & Drill Refleks ({currentLvl.toUpperCase()})
          </h2>
          <p className="text-xs text-appText-muted mt-0.5">
            Latih daya ingat, reflek membaca, dan kepekaan telingamu dengan 6 format latihan interaktif.
          </p>
        </div>

        {/* Quick Level Selector for Drills */}
        <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-xl border border-accent/20 shrink-0 self-start sm:self-auto">
          {(['n5', 'n4', 'n3', 'n2', 'n1'] as JLPTLevel[]).map((lvl) => {
            const isCurrent = currentLvl === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => onSelectLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all min-h-[40px] active:scale-95 cursor-pointer flex items-center justify-center ${
                  isCurrent
                    ? 'bg-amber-500 text-stone-950 font-black shadow-xs'
                    : 'text-appText-muted hover:text-appText-bright'
                }`}
                aria-label={`Pilih Level ${lvl.toUpperCase()}`}
              >
                {lvl}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6 Workout Gym Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {/* Card 1: Kanji Dojo & Goresan */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onOpenTool('kanji')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenTool('kanji');
            }
          }}
          className="bg-surface-2 hover:bg-surface-3 border border-amber-500/30 hover:border-amber-500/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group active:scale-95 min-h-[220px]"
        >
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2.5">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/35 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-all shrink-0 font-japanese font-black text-amber-400">
                漢
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-amber-500/20 text-accent font-semibold border-amber-500/30 shrink-0">
                Kanji Canvas & SVG
              </span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-amber-400 transition-colors leading-snug">
                Kanji Dojo & Goresan
              </h3>
              <p className="text-xs sm:text-sm font-mono text-appText-muted mt-0.5" lang="ja">
                漢字道場・筆順練習
              </p>
            </div>
            <p className="text-sm text-appText-muted leading-relaxed">
              Latihan menulis kanji langsung di layar ponsel dengan animasi goresan SVG, deteksi urutan guratan jari, dan radikal.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between text-xs">
            <span className="text-xs text-appText-muted font-medium">6.000+ Kanji Jouyou & Kanken</span>
            <span className="text-xs sm:text-sm text-amber-400 font-extrabold group-hover:translate-x-1 transition-transform shrink-0">
              Buka Kanvas →
            </span>
          </div>
        </div>

        {/* Card 2: Flashcard 3D Refleks */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onStartQuizSession('flashcard')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onStartQuizSession('flashcard');
            }
          }}
          className="bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-amber-500/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group active:scale-95 min-h-[220px]"
        >
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2.5">
              <div className="w-12 h-12 rounded-xl bg-surface/90 border border-accent/25 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 group-hover:border-amber-500/40 transition-all shrink-0">
                🃏
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-surface-3/90 text-accent font-semibold border-accent/25 shrink-0">
                3D Flip · FSRS
              </span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-amber-400 transition-colors leading-snug">
                Flashcard 3D Refleks
              </h3>
              <p className="text-xs sm:text-sm font-mono text-appText-muted mt-0.5" lang="ja">
                3D フラッシュカード
              </p>
            </div>
            <p className="text-sm text-appText-muted leading-relaxed">
              Kartu balik 3D interaktif dengan gestur usap layar, audio pelafalan asli, dan 4 tombol pemeringkatan memori FSRS.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between text-xs">
            <span className="text-xs text-appText-muted font-medium">Bebas Akses Kapan Saja</span>
            <span className="text-xs sm:text-sm text-amber-400 font-extrabold group-hover:translate-x-1 transition-transform shrink-0">
              Mulai Flashcard →
            </span>
          </div>
        </div>

        {/* Card 3: Kuis Pilihan Ganda */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onStartQuizSession('multiple-choice')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onStartQuizSession('multiple-choice');
            }
          }}
          className="bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-amber-500/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group active:scale-95 min-h-[220px]"
        >
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2.5">
              <div className="w-12 h-12 rounded-xl bg-surface/90 border border-accent/25 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 group-hover:border-amber-500/40 transition-all shrink-0">
                🎯
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-surface-3/90 text-accent font-semibold border-accent/25 shrink-0">
                Refleks Cepat
              </span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-amber-400 transition-colors leading-snug">
                Kuis Pilihan Ganda
              </h3>
              <p className="text-xs sm:text-sm font-mono text-appText-muted mt-0.5" lang="ja">
                四択クイズ・瞬発力
              </p>
            </div>
            <p className="text-sm text-appText-muted leading-relaxed">
              Drill 4 pilihan jawaban cerdas dengan pengecoh gramatikal alami (anti-slash & anti-kurung) untuk melatih kecepatan respons.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between text-xs">
            <span className="text-xs text-appText-muted font-medium">10 Butir per Sesi</span>
            <span className="text-xs sm:text-sm text-amber-400 font-extrabold group-hover:translate-x-1 transition-transform shrink-0">
              Latihan PG →
            </span>
          </div>
        </div>

        {/* Card 4: Susun Kalimat (Bunsetsu) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onStartQuizSession('rearrange')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onStartQuizSession('rearrange');
            }
          }}
          className="bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-amber-500/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group active:scale-95 min-h-[220px]"
        >
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2.5">
              <div className="w-12 h-12 rounded-xl bg-surface/90 border border-accent/25 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 group-hover:border-amber-500/40 transition-all shrink-0">
                ⭐
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-surface-3/90 text-accent font-semibold border-accent/25 shrink-0">
                Pola Bintang JLPT
              </span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-amber-400 transition-colors leading-snug">
                Susun Kalimat (Bunsetsu)
              </h3>
              <p className="text-xs sm:text-sm font-mono text-appText-muted mt-0.5" lang="ja">
                文の組み立て・星問題
              </p>
            </div>
            <p className="text-sm text-appText-muted leading-relaxed">
              Format khas JLPT Bun no Kumitate: susun kata acak ke posisi bintang (★) untuk membedah struktur SOV dan ikatan partikel.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between text-xs">
            <span className="text-xs text-appText-muted font-medium">Proses Sintaksis</span>
            <span className="text-xs sm:text-sm text-amber-400 font-extrabold group-hover:translate-x-1 transition-transform shrink-0">
              Susun Kalimat →
            </span>
          </div>
        </div>

        {/* Card 5: Isian Rumpang (Cloze) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onStartQuizSession('fill-in')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onStartQuizSession('fill-in');
            }
          }}
          className="bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-amber-500/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group active:scale-95 min-h-[220px]"
        >
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2.5">
              <div className="w-12 h-12 rounded-xl bg-surface/90 border border-accent/25 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 group-hover:border-amber-500/40 transition-all shrink-0">
                📝
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-surface-3/90 text-accent font-semibold border-accent/25 shrink-0">
                Konjugasi & Partikel
              </span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-amber-400 transition-colors leading-snug">
                Isian Rumpang (Cloze)
              </h3>
              <p className="text-xs sm:text-sm font-mono text-appText-muted mt-0.5" lang="ja">
                空欄補充・活用テスト
              </p>
            </div>
            <p className="text-sm text-appText-muted leading-relaxed">
              Lengkapi celah kosong kalimat rumpang dengan partikel tepat atau bentuk konjugasi verba yang cocok secara kontekstual.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between text-xs">
            <span className="text-xs text-appText-muted font-medium">Sensitivitas Konteks</span>
            <span className="text-xs sm:text-sm text-amber-400 font-extrabold group-hover:translate-x-1 transition-transform shrink-0">
              Isi Celah →
            </span>
          </div>
        </div>

        {/* Card 6: Menyimak Kilat (Audio Drill) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onStartQuizSession('listening')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onStartQuizSession('listening');
            }
          }}
          className="bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-amber-500/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group active:scale-95 min-h-[220px]"
        >
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2.5">
              <div className="w-12 h-12 rounded-xl bg-surface/90 border border-accent/25 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 group-hover:border-amber-500/40 transition-all shrink-0">
                🎧
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-surface-3/90 text-accent font-semibold border-accent/25 shrink-0">
                Akustik & Nada
              </span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-amber-400 transition-colors leading-snug">
                Menyimak Kilat (Audio Drill)
              </h3>
              <p className="text-xs sm:text-sm font-mono text-appText-muted mt-0.5" lang="ja">
                速聴・聴解ミニドリル
              </p>
            </div>
            <p className="text-sm text-appText-muted leading-relaxed">
              Drill audio pendek 3–5 detik untuk melatih refleks membedakan bunyi sengau, vokal panjang, dan intonasi pitch accent kata.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between text-xs">
            <span className="text-xs text-appText-muted font-medium">Audio Asli Kyutai Labs</span>
            <span className="text-xs sm:text-sm text-amber-400 font-extrabold group-hover:translate-x-1 transition-transform shrink-0">
              Latihan Menyimak →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
