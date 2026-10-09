import React, { useState, useEffect } from 'react';
import { BookOpen, Layers, Flame, Sprout, ArrowRight, Sparkles, Award, Volume2, Info } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { HeatmapCalendar } from '../components/gamification/HeatmapCalendar';
import { BadgesModal } from '../components/gamification/BadgesModal';
import { DetailModal } from '../components/ui/DetailModal';
import { KanaChartModal } from '../components/kana/KanaChartModal';
import { loadVocab, NormalizedVocab } from '../lib/data/dataManager';
import { speakJapanese } from '../lib/audio/tts';

export const HomePage: React.FC = () => {
  const { streak, xp, setActiveTab } = useAppStore();
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [isKanaOpen, setIsKanaOpen] = useState(false);
  const [dailyWord, setDailyWord] = useState<NormalizedVocab | null>(null);
  const [selectedWordForModal, setSelectedWordForModal] = useState<NormalizedVocab | null>(null);

  useEffect(() => {
    let isMounted = true;
    loadVocab('n5').then((vocabList) => {
      if (!isMounted || !vocabList || vocabList.length === 0) return;
      const dayIndex = Math.floor(Date.now() / 86400000);
      const chosen = vocabList[dayIndex % vocabList.length];
      setDailyWord(chosen);
    }).catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8 animate-in fade-in duration-300">
      {/* Hero Greeting Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/60 via-amber-900/30 to-surface border border-accent/25 p-6 sm:p-10 shadow-lg">
        <div className="max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent-hot text-xs font-bold">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Streak {streak} Hari Aktif · Pertahankan!</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-appText-bright tracking-tight">
            Selamat Belajar! 今日も頑張ろう 🍙
          </h1>

          <p className="text-xs sm:text-sm text-appText-muted leading-relaxed">
            Luangkan waktu 5 menit hari ini untuk mereview kosakata dan pola tata bahasa barumu.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs flex items-center gap-2 transition-all shadow-glow"
            >
              <span>Mulai Latihan Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('materi')}
              className="px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-bright border border-accent/20 font-bold text-xs transition-all"
            >
              Eksplor Materi
            </button>
          </div>
        </div>
      </div>

      {/* Tier 0 Beginner Onboarding Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-surface-2 to-surface-2 border border-amber-500/35 rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shrink-0 shadow-sm">
            🌱
          </div>
          <div>
            <div className="font-extrabold text-sm sm:text-base text-appText-bright flex items-center gap-2">
              <span>Baru Mulai Belajar dari Nol? (0 Pengetahuan)</span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-accent text-bg">Pemula</span>
            </div>
            <p className="text-xs text-appText-muted mt-1 leading-relaxed">
              Kuasai huruf Hiragana & Katakana dengan audio pelafalan asli, atau coba 21 pola percakapan survival Freeway.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
          <button
            onClick={() => setIsKanaOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hot text-bg text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            <span>Tabel Kana (あ/ア)</span>
            <span className="text-sm">🗣️</span>
          </button>
          <button
            onClick={() => setActiveTab('materi')}
            className="px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/25 text-appText-bright text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <span>Jalur Freeway</span>
            <span>🛣️</span>
          </button>
        </div>
      </div>

      {/* Two Pillars Grid: Materi Hub & Arena Kuis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          onClick={() => setActiveTab('materi')}
          className="group cursor-pointer bg-surface border border-accent/20 hover:border-accent/40 rounded-3xl p-6 sm:p-8 space-y-4 transition-all duration-200 hover:-translate-y-1 shadow-sm"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-accent-hot">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-appText-bright group-hover:text-accent transition-colors flex items-center justify-between">
              <span>Materi Hub</span>
              <ArrowRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h2>
            <p className="text-xs text-appText-muted mt-1 leading-relaxed">
              Jelajahi 4.800+ kosakata dan 850+ tata bahasa lewat Jalur JLPT (N5–N1) atau Jalur Buku (Minna, Irodori, Soumatome).
            </p>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('quiz')}
          className="group cursor-pointer bg-surface border border-accent/20 hover:border-accent/40 rounded-3xl p-6 sm:p-8 space-y-4 transition-all duration-200 hover:-translate-y-1 shadow-sm"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-accent-hot">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-appText-bright group-hover:text-accent transition-colors flex items-center justify-between">
              <span>Arena Kuis</span>
              <ArrowRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h2>
            <p className="text-xs text-appText-muted mt-1 leading-relaxed">
              Uji pemahamanmu dengan 7 mode latihan: Flashcard, Pilihan Ganda, Isian Kosong, Susun Kalimat, hingga Konjugasi Verba.
            </p>
          </div>
        </div>
      </div>

      {/* Kotoba Hari Ini & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Kotoba Hari Ini */}
        <div className="md:col-span-2 bg-surface-2 border border-accent/20 rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent">Kotoba Hari Ini · 言葉</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                {dailyWord ? `JLPT ${dailyWord.level.toUpperCase()}` : 'JLPT N5'}
              </span>
              {dailyWord && (
                <button
                  onClick={() => setSelectedWordForModal(dailyWord)}
                  className="p-1 rounded-lg bg-surface hover:bg-surface-3 text-appText-muted hover:text-accent transition-colors"
                  title="Lihat Detail & Contoh"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-1.5 my-2">
            <div className="flex items-center gap-3">
              <div className="text-2xl sm:text-3xl font-jp font-bold text-appText-bright">
                {dailyWord ? dailyWord.word : '頑張る'}
                <span className="text-sm font-normal text-appText-muted font-ui ml-2">
                  【{dailyWord ? dailyWord.reading : 'がんばる'}】
                </span>
              </div>
              <button
                onClick={() => speakJapanese(dailyWord ? dailyWord.word : '頑張る')}
                className="w-8 h-8 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-accent flex items-center justify-center transition-all"
                title="Dengarkan pelafalan"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-sm font-semibold text-accent-hot">
              {dailyWord ? dailyWord.meaning : 'Berusaha keras / Bersemangat'}
            </div>

            {dailyWord?.examples?.[0] ? (
              <div className="text-xs text-appText-muted italic">
                "{dailyWord.examples[0].jp}" ({dailyWord.examples[0].id})
              </div>
            ) : (
              <div className="text-xs text-appText-muted italic">
                "諦めずに最後まで頑張りましょう。" (Mari berusaha keras sampai akhir tanpa menyerah.)
              </div>
            )}
          </div>

          <div className="text-[11px] text-appText-muted/70 mt-3 pt-3 border-t border-accent/10 flex items-center justify-between">
            <span className="capitalize">{dailyWord?.pos || 'Kata kerja · Bentuk kamus'}</span>
            {dailyWord && (
              <button
                onClick={() => setSelectedWordForModal(dailyWord)}
                className="text-accent hover:underline font-semibold text-[11px]"
              >
                Pelajari Selengkapnya →
              </button>
            )}
          </div>
        </div>

        {/* Daily Streak Routine & Badges Link */}
        <div className="bg-surface-2 border border-accent/20 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent">Statistik Kamu</span>
              <button
                onClick={() => setIsBadgesOpen(true)}
                className="text-[11px] font-bold text-accent-hot hover:underline flex items-center gap-1"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Lencana</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-appText-muted">Total XP</span>
                <span className="text-sm font-bold font-mono text-appText-bright">{xp} XP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-appText-muted">Streak Rutin</span>
                <span className="text-sm font-bold font-mono text-accent-hot">{streak} Hari</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-appText-muted">Target Harian</span>
                <span className="text-xs font-bold text-green-400">Tercapai 🎯</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-accent/10 flex items-center justify-between text-xs text-appText-muted">
            <span className="flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-green-400" />
              <span>Kebun Kata</span>
            </span>
            <button onClick={() => setActiveTab('kebun')} className="text-accent hover:underline font-semibold">
              Lihat Kebun →
            </button>
          </div>
        </div>
      </div>

      {/* Activity Heatmap Calendar */}
      <HeatmapCalendar days={49} />

      {/* Badges Modal */}
      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
      />

      {/* Word Detail Modal */}
      <DetailModal
        item={selectedWordForModal}
        type="vocab"
        onClose={() => setSelectedWordForModal(null)}
      />

      {/* Kana Chart Modal (Hiragana & Katakana) */}
      <KanaChartModal
        isOpen={isKanaOpen}
        onClose={() => setIsKanaOpen(false)}
      />
    </div>
  );
};
