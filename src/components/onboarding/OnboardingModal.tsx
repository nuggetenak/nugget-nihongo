import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Sparkles, BookOpen, Brain, Flower2, Keyboard, Check, Compass } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface OnboardingSlide {
  badge: string;
  badgeIcon: string;
  title: string;
  tagline: string;
  icon: string;
  accentBg: string;
  points: Array<{
    title: string;
    desc: string;
    icon: string;
  }>;
}

const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    badge: 'Filosofi Belajar',
    badgeIcon: '🍙',
    title: 'Selamat Datang di Nugget Nihongo!',
    tagline: 'Sahabat belajar bahasa Jepang yang hangat, santai, dan bebas rasa bersalah.',
    icon: '🍙',
    accentBg: 'from-amber-500/20 to-amber-700/10',
    points: [
      {
        title: '100% Offline-First',
        desc: 'Seluruh materi, kamus, dan audio sintetis berjalan langsung di perangkatmu tanpa perlu kuota internet.',
        icon: '📴',
      },
      {
        title: 'Tanpa Iklan & Tanpa Paywall',
        desc: 'Tidak ada batasan "nyawa" (hearts) atau sistem langganan mahal. Semua materi gratis selamanya.',
        icon: '🆓',
      },
      {
        title: 'Dirancang untuk Semua Level',
        desc: 'Mulai dari nol (Tier 0 mengenal kana) hingga persiapan JLPT N1 tingkat profesional.',
        icon: '🎯',
      },
    ],
  },
  {
    badge: 'Dua Pilar Pembelajaran',
    badgeIcon: '🏛️',
    title: 'Materi Hub & Arena Kuis',
    tagline: 'Kombinasi teori berstruktur dan latihan aktif yang terbukti efektif.',
    icon: '📖',
    accentBg: 'from-orange-500/20 to-amber-600/10',
    points: [
      {
        title: 'Materi Hub (Kamus & Tata Bahasa)',
        desc: '4.800+ kosakata dan 850+ pola tata bahasa lengkap dengan furigana, romaji, audio, dan contoh kalimat nyata.',
        icon: '📚',
      },
      {
        title: 'Jalur Buku Populer',
        desc: 'Jelajahi materi berdasarkan bab Minna no Nihongo (Shokyu I & II) atau Irodori (A1, A2-1, A2-2).',
        icon: '🔖',
      },
      {
        title: 'Arena Kuis 8 Mode',
        desc: 'Flashcard FSRS, Pilihan Ganda, Latihan Audio Listening, Susun Kalimat, hingga Tebak Partikel.',
        icon: '⚔️',
      },
    ],
  },
  {
    badge: 'Sains Memori Modern',
    badgeIcon: '🧠',
    title: 'Algoritma Cerdas FSRS v4',
    tagline: 'Free Spaced Repetition Scheduler — belajar lebih cerdas, bukan lebih lama.',
    icon: '⚡',
    accentBg: 'from-yellow-500/20 to-amber-700/10',
    points: [
      {
        title: 'Prediksi Kurva Lupa Otak',
        desc: 'Berdasarkan riset Ye et al. (2022), sistem menghitung retrievability memori untuk tiap kata.',
        icon: '📈',
      },
      {
        title: 'Review Tepat Waktu',
        desc: 'Kartu hanya dimunculkan saat kamu hampir lupa, menghemat waktu belajar harian hingga 40%.',
        icon: '⏰',
      },
      {
        title: 'Latih Ulang Soal Keliru',
        desc: 'Setelah sesi kuis berakhir, kamu bisa langsung melatih ulang kartu yang salah dengan satu ketukan.',
        icon: '🔁',
      },
    ],
  },
  {
    badge: 'Visualisasi Kemajuan',
    badgeIcon: '🌸',
    title: 'Kebun Kata (Kanji Growth)',
    tagline: 'Rawat tanaman kanjimu setiap hari dan saksikan mereka mekar.',
    icon: '🌱',
    accentBg: 'from-emerald-500/20 to-amber-700/10',
    points: [
      {
        title: 'Kumpulkan Tetes Air',
        desc: 'Setiap menyelesaikan latihan kuis, kamu otomatis mendapatkan tetes air segar.',
        icon: '💧',
      },
      {
        title: '5 Fase Pertumbuhan Kanji',
        desc: 'Bibit tumbuh dari Tunas (Stage 0), Daun, Kuncup, hingga Mekar Penuh (Stage 4) seiring memori matang.',
        icon: '🌸',
      },
      {
        title: 'Lencana Kebun Semerbak',
        desc: 'Mekarkan bunga kanji pertamamu untuk membuka lencana khusus dan mengoleksi varian baru.',
        icon: '🏆',
      },
    ],
  },
  {
    badge: 'Pintasan & Navigasi',
    badgeIcon: '⚡',
    title: 'Akses Kilat & Navigasi Cepat',
    tagline: 'Navigasi efisien baik di smartphone maupun keyboard laptop.',
    icon: '⌨️',
    accentBg: 'from-sky-500/20 to-amber-700/10',
    points: [
      {
        title: 'Spotlight Search (⌘K / Ctrl+K)',
        desc: 'Cari kosakata atau tata bahasa apa saja dalam hitungan milidetik dari mana pun.',
        icon: '🔍',
      },
      {
        title: 'Pintasan Aksara (F & R)',
        desc: 'Tekan F untuk menyembunyikan/menampilkan Furigana, tekan R untuk Romaji.',
        icon: '文',
      },
      {
        title: 'Tombol Panduan & Menu Bantuan',
        desc: 'Klik ikon "Panduan 🧭" di header atas kapan saja untuk membuka direktori fitur lengkap.',
        icon: '🧭',
      },
    ],
  },
];

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, closeOnboarding, setActiveTab } = useAppStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Keyboard navigation inside modal (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isOnboardingOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeOnboarding();
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => Math.min(ONBOARDING_SLIDES.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOnboardingOpen, closeOnboarding]);

  if (!isOnboardingOpen) return null;

  const slide = ONBOARDING_SLIDES[currentSlide];
  const isLast = currentSlide === ONBOARDING_SLIDES.length - 1;

  const handleNext = () => {
    if (isLast) {
      closeOnboarding();
      setActiveTab('quiz');
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-xl bg-surface border border-accent/25 rounded-3xl shadow-glow overflow-hidden relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-accent/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-accent/20 text-accent font-bold text-xs">
            <span>{slide.badgeIcon}</span>
            <span>{slide.badge}</span>
            <span className="text-appText-muted font-mono font-normal">
              ({currentSlide + 1}/{ONBOARDING_SLIDES.length})
            </span>
          </div>

          <button
            onClick={closeOnboarding}
            className="p-1.5 rounded-xl text-appText-muted hover:text-appText-bright hover:bg-surface-2 transition-colors"
            aria-label="Tutup tur"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-6 py-5 space-y-5 scrollbar-thin">
          {/* Hero Banner */}
          <div className={`p-5 rounded-2xl bg-gradient-to-br ${slide.accentBg} border border-accent/20 relative overflow-hidden`}>
            <div className="flex items-start gap-4">
              {currentSlide === 0 ? (
                <img
                  src="/icons/logo.png"
                  alt="Nugget Nihongo"
                  className="w-14 h-14 rounded-2xl object-cover shadow-glow ring-1 ring-amber-500/40 shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-3xl shadow-md shrink-0">
                  {slide.icon}
                </div>
              )}
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-appText-bright tracking-tight leading-snug">
                  {slide.title}
                </h2>
                <p className="text-xs text-appText-muted leading-relaxed">
                  {slide.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* 3 Pillar / Feature Points */}
          <div className="space-y-3">
            {slide.points.map((pt, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-2/80 hover:bg-surface-2 border border-accent/15 transition-all shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-base shrink-0 mt-0.5">
                  {pt.icon}
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="text-xs font-bold text-appText-bright">
                    {pt.title}
                  </div>
                  <div className="text-[11px] sm:text-xs text-appText-muted leading-relaxed">
                    {pt.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="px-6 py-4 border-t border-accent/15 bg-surface-2/40 flex items-center justify-between gap-3">
          {/* Progress Dots */}
          <div className="flex items-center gap-1.5">
            {ONBOARDING_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Buka slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlide
                    ? 'w-6 bg-accent'
                    : 'w-2 bg-surface-3 hover:bg-accent/40'
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            {currentSlide > 0 && (
              <button
                onClick={handlePrev}
                className="px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-appText-bright text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sebelumnya</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-all active:scale-[0.98]"
            >
              <span>{isLast ? 'Mulai Belajar Sekarang 🍙' : 'Lanjut'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
