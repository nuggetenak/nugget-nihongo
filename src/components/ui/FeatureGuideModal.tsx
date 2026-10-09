import React, { useState, useEffect } from 'react';
import {
  X,
  Compass,
  BookOpen,
  Sword,
  Sprout,
  Bot,
  Settings,
  Info,
  Layers,
  ArrowRight,
  ExternalLink,
  Volume2,
  Sparkles,
  RotateCcw,
  Scale,
  Grid3X3,
  Lightbulb,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface FeatureGuideModalProps {
  onOpenKana?: () => void;
  onOpenConjugation?: () => void;
  onOpenNuance?: () => void;
  onOpenShortcuts?: () => void;
}

export const FeatureGuideModal: React.FC<FeatureGuideModalProps> = ({
  onOpenKana,
  onOpenConjugation,
  onOpenNuance,
  onOpenShortcuts,
}) => {
  const { isFeatureGuideOpen, closeFeatureGuide, setActiveTab, openOnboarding } = useAppStore();
  const [activeSection, setActiveSection] = useState<'modules' | 'tools' | 'tips'>('modules');

  useEffect(() => {
    if (!isFeatureGuideOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFeatureGuide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFeatureGuideOpen, closeFeatureGuide]);

  if (!isFeatureGuideOpen) return null;

  const navigateTo = (tab: Parameters<typeof setActiveTab>[0]) => {
    closeFeatureGuide();
    setActiveTab(tab);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-2xl bg-surface border border-accent/25 rounded-3xl shadow-glow overflow-hidden relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-accent/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-accent text-lg">
              🧭
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-appText-bright">
                Panduan Fitur & Navigasi
              </h2>
              <p className="text-[11px] text-appText-muted">
                Peta jalan lengkap fitur Nugget Nihongo untuk pemula hingga mahir
              </p>
            </div>
          </div>

          <button
            onClick={closeFeatureGuide}
            className="p-1.5 rounded-xl text-appText-muted hover:text-appText-bright hover:bg-surface-2 transition-colors"
            aria-label="Tutup panduan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-accent/10 bg-surface-2/30">
          <button
            onClick={() => setActiveSection('modules')}
            className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeSection === 'modules'
                ? 'border-accent text-accent'
                : 'border-transparent text-appText-muted hover:text-appText-bright'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Menu & Modul</span>
          </button>

          <button
            onClick={() => setActiveSection('tools')}
            className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeSection === 'tools'
                ? 'border-accent text-accent'
                : 'border-transparent text-appText-muted hover:text-appText-bright'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Peralatan Cerdas</span>
          </button>

          <button
            onClick={() => setActiveSection('tips')}
            className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeSection === 'tips'
                ? 'border-accent text-accent'
                : 'border-transparent text-appText-muted hover:text-appText-bright'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Tips Belajar</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto px-6 py-5 space-y-4 scrollbar-thin">
          {/* Section 1: Modules */}
          {activeSection === 'modules' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-surface-2/70 border border-accent/15 flex items-start justify-between gap-3 hover:border-accent/30 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-xl shrink-0 mt-0.5">
                    🏠
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-appText-bright">
                      Beranda (Home Dashboard)
                    </h3>
                    <p className="text-[11px] text-appText-muted leading-relaxed">
                      Statistik streak harian, total XP, rekomendasi "Kotoba Hari Ini" otomatis, kalender heatmap kebiasaan belajar, dan akses kilat ke materi.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('home')}
                  className="px-3 py-1.5 rounded-lg bg-surface-3 hover:bg-accent hover:text-bg text-appText-bright text-[11px] font-bold shrink-0 transition-all flex items-center gap-1"
                >
                  <span>Buka</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-surface-2/70 border border-accent/15 flex items-start justify-between gap-3 hover:border-accent/30 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center text-xl shrink-0 mt-0.5">
                    📖
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-appText-bright">
                      Materi Hub (Kamus Kosakata & Pola Tata Bahasa)
                    </h3>
                    <p className="text-[11px] text-appText-muted leading-relaxed">
                      Jelajahi 4.800+ kosakata dan 850+ pola kalimat N5–N1. Dilengkapi filter tingkat JLPT, jalur buku Minna no Nihongo & Irodori, audio penutur asli, dan contoh kalimat.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('materi')}
                  className="px-3 py-1.5 rounded-lg bg-surface-3 hover:bg-accent hover:text-bg text-appText-bright text-[11px] font-bold shrink-0 transition-all flex items-center gap-1"
                >
                  <span>Buka</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-surface-2/70 border border-accent/15 flex items-start justify-between gap-3 hover:border-accent/30 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center text-xl shrink-0 mt-0.5">
                    ⚔️
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-appText-bright">
                      Arena Kuis (Drill Interaktif 8 Mode)
                    </h3>
                    <p className="text-[11px] text-appText-muted leading-relaxed">
                      Dasbor latihan interaktif dengan FSRS Due Today. Latih kemampuanmu lewat Flashcard FSRS, Pilihan Ganda, Audio Listening, Susun Kalimat, Konjugasi, Tebak Partikel, dan Mode Review Kesalahan.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('quiz')}
                  className="px-3 py-1.5 rounded-lg bg-surface-3 hover:bg-accent hover:text-bg text-appText-bright text-[11px] font-bold shrink-0 transition-all flex items-center gap-1"
                >
                  <span>Buka</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-surface-2/70 border border-accent/15 flex items-start justify-between gap-3 hover:border-accent/30 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-xl shrink-0 mt-0.5">
                    🌸
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-appText-bright">
                      Kebun Kata (Kanji Growth Garden)
                    </h3>
                    <p className="text-[11px] text-appText-muted leading-relaxed">
                      Taman visual kanji. Gunakan tetes air yang didapat dari kuis untuk merawat bibit kanjimu dari tunas hingga mekar penuh (Stage 4).
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('kebun')}
                  className="px-3 py-1.5 rounded-lg bg-surface-3 hover:bg-accent hover:text-bg text-appText-bright text-[11px] font-bold shrink-0 transition-all flex items-center gap-1"
                >
                  <span>Buka</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-surface-2/70 border border-accent/15 flex items-start justify-between gap-3 hover:border-accent/30 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-xl shrink-0 mt-0.5">
                    🍵
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-appText-bright">
                      Sensei AI (Tutor Virtual Cerdas)
                    </h3>
                    <p className="text-[11px] text-appText-muted leading-relaxed">
                      Teman diskusi tata bahasa dan latihan percakapan interaktif (Status: Segera Hadir / Coming Soon 🍵).
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('sensei')}
                  className="px-3 py-1.5 rounded-lg bg-surface-3 hover:bg-accent hover:text-bg text-appText-bright text-[11px] font-bold shrink-0 transition-all flex items-center gap-1"
                >
                  <span>Buka</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-surface-2/70 border border-accent/15 flex items-start justify-between gap-3 hover:border-accent/30 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-500/15 border border-stone-500/25 flex items-center justify-center text-xl shrink-0 mt-0.5">
                    ⚙️
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-appText-bright">
                      Pengaturan & Akun Cloud
                    </h3>
                    <p className="text-[11px] text-appText-muted leading-relaxed">
                      Atur visibilitas Furigana & Romaji, kecepatan audio penutur asli, ekspor/impor file cadangan JSON, serta konfigurasi cloud Supabase.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('settings')}
                  className="px-3 py-1.5 rounded-lg bg-surface-3 hover:bg-accent hover:text-bg text-appText-bright text-[11px] font-bold shrink-0 transition-all flex items-center gap-1"
                >
                  <span>Buka</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Section 2: Interactive Tools */}
          {activeSection === 'tools' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-surface-2/70 border border-accent/15 flex items-start justify-between gap-3 hover:border-accent/30 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-xl shrink-0 mt-0.5">
                    🔤
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-appText-bright">
                      Bagan Kana Lengkap (Hiragana & Katakana)
                    </h3>
                    <p className="text-[11px] text-appText-muted leading-relaxed">
                      Tabel interaktif 46 karakter dasar, dakuten, handakuten, dan yoon. Dilengkapi audio pelafalan asli per huruf.
                    </p>
                  </div>
                </div>
                {onOpenKana && (
                  <button
                    onClick={() => {
                      closeFeatureGuide();
                      onOpenKana();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-accent text-bg text-[11px] font-bold shrink-0 hover:bg-accent-hot transition-all flex items-center gap-1 shadow-sm"
                  >
                    <span>Buka Bagan</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-surface-2/70 border border-accent/15 flex items-start justify-between gap-3 hover:border-accent/30 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center text-xl shrink-0 mt-0.5">
                    🔄
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-appText-bright">
                      Matriks Konjugasi Verba & Adjektiva
                    </h3>
                    <p className="text-[11px] text-appText-muted leading-relaxed">
                      Simulator perubahan bentuk kata kerja bahasa Jepang (Bentuk Kamus, Masu, Te, Nai, Ta, Ba, Potensial, Pasif, Kausatif, dsb).
                    </p>
                  </div>
                </div>
                {onOpenConjugation && (
                  <button
                    onClick={() => {
                      closeFeatureGuide();
                      onOpenConjugation();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-accent text-bg text-[11px] font-bold shrink-0 hover:bg-accent-hot transition-all flex items-center gap-1 shadow-sm"
                  >
                    <span>Buka Matriks</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-surface-2/70 border border-accent/15 flex items-start justify-between gap-3 hover:border-accent/30 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center text-xl shrink-0 mt-0.5">
                    ⚖️
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-appText-bright">
                      Komparator Nuansa Tata Bahasa
                    </h3>
                    <p className="text-[11px] text-appText-muted leading-relaxed">
                      Bandingkan pola kalimat yang membingungkan berdampingan (contoh: ~te kara vs ~ato de, partikel は vs が, ~sou da vs ~you da).
                    </p>
                  </div>
                </div>
                {onOpenNuance && (
                  <button
                    onClick={() => {
                      closeFeatureGuide();
                      onOpenNuance();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-accent text-bg text-[11px] font-bold shrink-0 hover:bg-accent-hot transition-all flex items-center gap-1 shadow-sm"
                  >
                    <span>Buka Nuansa</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-surface-2/70 border border-accent/15 flex items-start justify-between gap-3 hover:border-accent/30 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center text-xl shrink-0 mt-0.5">
                    ⌨️
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-appText-bright">
                      Daftar Pintasan Keyboard
                    </h3>
                    <p className="text-[11px] text-appText-muted leading-relaxed">
                      Pelajari tombol pintasan untuk membalik kartu (Space), memilih opsi (1-4), toggle furigana (F), dan pencarian instan (⌘K).
                    </p>
                  </div>
                </div>
                {onOpenShortcuts && (
                  <button
                    onClick={() => {
                      closeFeatureGuide();
                      onOpenShortcuts();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-accent text-bg text-[11px] font-bold shrink-0 hover:bg-accent-hot transition-all flex items-center gap-1 shadow-sm"
                  >
                    <span>Pintasan</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Section 3: Learning Tips */}
          {activeSection === 'tips' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-surface-2/70 border border-accent/15 space-y-2">
                <div className="flex items-center gap-2 text-accent font-bold text-xs">
                  <span>⏱️</span>
                  <span>Prinsip Belajar Mikro: 5-10 Menit Setiap Hari</span>
                </div>
                <p className="text-[11px] text-appText-muted leading-relaxed">
                  Konsistensi harian jauh lebih efektif membangun jalur sinapsis otak daripada belajar 3 jam maraton sekali seminggu. Jaga streak-mu tetap menyala setiap hari.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-2/70 border border-accent/15 space-y-2">
                <div className="flex items-center gap-2 text-accent font-bold text-xs">
                  <span>👂</span>
                  <span>Dengarkan Audio Sebelum Membaca Romaji</span>
                </div>
                <p className="text-[11px] text-appText-muted leading-relaxed">
                  Aksen intonasi bahasa Jepang (*pitch accent*) terbentuk dari telinga. Tekan tombol audio di kartu kosakata dan ulangi pelafalannya dengan lantang.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-2/70 border border-accent/15 space-y-2">
                <div className="flex items-center gap-2 text-accent font-bold text-xs">
                  <span>🔁</span>
                  <span>Gunakan Fitur "Latih Ulang Soal Salah"</span>
                </div>
                <p className="text-[11px] text-appText-muted leading-relaxed">
                  Saat kuis berakhir, jangan lewatkan tombol review kesalahan. Memperbaiki kekeliruan tepat saat memori masih segar terbukti mengunci ingatan 2x lebih kuat.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-2/70 border border-accent/15 space-y-2">
                <div className="flex items-center gap-2 text-accent font-bold text-xs">
                  <span>🌱</span>
                  <span>Jadikan Kebun Kata Motivasi Visualmu</span>
                </div>
                <p className="text-[11px] text-appText-muted leading-relaxed">
                  Melihat tanaman kanji mekar memberikan kepuasan nyata atas usaha belajarmu. Siram tanaman yang mendekati mekar penuh setiap hari.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-accent/15 bg-surface-2/40 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              closeFeatureGuide();
              openOnboarding();
            }}
            className="px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-accent text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span>🍙</span>
            <span>Mulai Ulang Tur Aplikasi</span>
          </button>

          <button
            onClick={closeFeatureGuide}
            className="px-5 py-2.5 rounded-xl bg-accent text-bg hover:bg-accent-hot text-xs font-bold transition-all shadow-md"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
