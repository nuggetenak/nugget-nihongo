import React from 'react';
import { ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-extrabold text-appText-bright mb-1">Tentang Nugget Nihongo</h1>
        <p className="text-xs text-appText-muted">Aplikasi teman belajar bahasa Jepang yang hangat, ramah, dan bebas tekanan.</p>
      </div>

      {/* Philosophy Card */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-6 space-y-4">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-accent-hot flex items-center justify-center">
          <Heart className="w-5 h-5 fill-amber-500" />
        </div>
        <h2 className="font-bold text-base text-appText-bright">Filosofi "Teman Belajar"</h2>
        <p className="text-xs text-appText-muted leading-relaxed">
          Nugget Nihongo dirancang bukan sebagai ruang kompetisi yang intimidatif atau papan peringkat publik yang membuat cemas. Kami hadir sebagai kawan belajar yang sabar, membimbingmu dari nol hingga mahir dengan kurikulum JLPT terstandar (N5 sampai N1) serta jalur buku populer (Minna no Nihongo, Irodori, Soumatome).
        </p>
      </div>

      {/* Core Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-surface-2 border border-accent/20 rounded-2xl p-5 space-y-2">
          <ShieldCheck className="w-5 h-5 text-green-400" />
          <h3 className="font-bold text-sm text-appText-bright">Privasi & Offline Penuh</h3>
          <p className="text-xs text-appText-muted leading-relaxed">
            Semua data tersimpan langsung di ponsel atau laptopmu. Kamu bisa belajar lancar saat naik kereta atau berada di daerah tanpa sinyal.
          </p>
        </div>

        <div className="bg-surface-2 border border-accent/20 rounded-2xl p-5 space-y-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm text-appText-bright">Algoritma FSRS v4</h3>
          <p className="text-xs text-appText-muted leading-relaxed">
            Menggunakan riset memori modern (*Free Spaced Repetition Scheduler*) untuk menjadwalkan ulasan kata secara optimal tanpa membuatmu kelelahan.
          </p>
        </div>
      </div>

      {/* Level Summary */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-sm text-appText-bright flex items-center gap-2 border-b border-accent/15 pb-3">
          <BookOpen className="w-4 h-4 text-accent" />
          <span>Cakupan Kurikulum</span>
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-appText-bright">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <b>JLPT N5</b> · Dasar Pemula
            </span>
            <span className="text-appText-muted font-mono">991 Kosakata · 94 Tata Bahasa</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-appText-bright">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
              <b>JLPT N4</b> · Percakapan Sehari-hari
            </span>
            <span className="text-appText-muted font-mono">946 Kosakata · 92 Tata Bahasa</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-appText-bright">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <b>JLPT N3</b> · Menengah (Intermediate)
            </span>
            <span className="text-appText-muted font-mono">2.368 Kosakata · 163 Tata Bahasa</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-appText-bright">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <b>JLPT N2 & N1</b> · Lanjutan & Profesional
            </span>
            <span className="text-appText-muted font-mono">534 Kosakata · 510 Tata Bahasa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
