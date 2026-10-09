import React, { useState } from 'react';
import { BookOpen, Award, BookMarked, Search, Filter } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { JLPTLevel } from '../types/vocab';

export const MateriHubPage: React.FC = () => {
  const { selectedLevel, setSelectedLevel, searchQuery, setSearchQuery } = useAppStore();
  const [activeCategory, setActiveCategory] = useState<'all' | 'vocab' | 'grammar'>('all');
  const [activeTrack, setActiveTrack] = useState<'jlpt' | 'buku'>('jlpt');

  const jlptLevels: Array<{ id: JLPTLevel; label: string; desc: string; color: string; count: string }> = [
    { id: 'n5', label: 'JLPT N5', desc: 'Pemula Dasar', color: 'border-purple-500/40 text-purple-300 bg-purple-500/10', count: '991 Kata · 94 Pola' },
    { id: 'n4', label: 'JLPT N4', desc: 'Percakapan Harian', color: 'border-orange-500/40 text-orange-300 bg-orange-500/10', count: '946 Kata · 92 Pola' },
    { id: 'n3', label: 'JLPT N3', desc: 'Menengah', color: 'border-sky-500/40 text-sky-300 bg-sky-500/10', count: '2.368 Kata · 163 Pola' },
    { id: 'n2', label: 'JLPT N2', desc: 'Pra-Lanjutan', color: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10', count: '344 Kata · 310 Pola' },
    { id: 'n1', label: 'JLPT N1', desc: 'Mahir / Profesional', color: 'border-amber-500/40 text-amber-300 bg-amber-500/10', count: '190 Kata · 200 Pola' },
  ];

  const bookTracks = [
    { id: 'minna1', title: 'Minna no Nihongo I', desc: 'Bab 1 - 25 · Dasar Komprehensif', icon: '📘' },
    { id: 'minna2', title: 'Minna no Nihongo II', desc: 'Bab 26 - 50 · Lanjutan Dasar', icon: '📗' },
    { id: 'irodori-a1', title: 'Irodori A1', desc: 'Bahasa Jepang Praktis Kehidupan', icon: '📙' },
    { id: 'irodori-a2', title: 'Irodori A2', desc: 'Komunikasi Kerja & Keseharian', icon: '📕' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-extrabold text-appText-bright mb-1">Materi Hub · 学習ハブ</h1>
        <p className="text-xs text-appText-muted">Pilih jalur belajarmu: berdasarkan jenjang JLPT atau kurikulum buku pegangan.</p>
      </div>

      {/* The Two-Door Gateways (Side-by-side on desktop & tablet) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Door 1: Jalur JLPT */}
        <div
          onClick={() => setActiveTrack('jlpt')}
          className={`cursor-pointer rounded-3xl p-6 sm:p-7 border-2 transition-all duration-200 ${
            activeTrack === 'jlpt'
              ? 'bg-amber-950/30 border-amber-500/60 shadow-glow'
              : 'bg-surface border-accent/20 hover:border-accent/40'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-accent-hot flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent px-2.5 py-0.5 rounded-full bg-amber-500/15">
              Jalur Standar
            </span>
          </div>
          <h2 className="text-lg font-bold text-appText-bright">Jalur JLPT (N5 — N1)</h2>
          <p className="text-xs text-appText-muted mt-1 leading-relaxed">
            Terstruktur rapi sesuai standar resmi ujian kemampuan bahasa Jepang internasional.
          </p>
        </div>

        {/* Door 2: Jalur Buku */}
        <div
          onClick={() => setActiveTrack('buku')}
          className={`cursor-pointer rounded-3xl p-6 sm:p-7 border-2 transition-all duration-200 ${
            activeTrack === 'buku'
              ? 'bg-amber-950/30 border-amber-500/60 shadow-glow'
              : 'bg-surface border-accent/20 hover:border-accent/40'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-accent-hot flex items-center justify-center">
              <BookMarked className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent px-2.5 py-0.5 rounded-full bg-amber-500/15">
              Jalur Buku Pegangan
            </span>
          </div>
          <h2 className="text-lg font-bold text-appText-bright">Jalur Buku Teks</h2>
          <p className="text-xs text-appText-muted mt-1 leading-relaxed">
            Cocok bagi yang belajar dengan buku Minna no Nihongo atau materi praktis Irodori Japan Foundation.
          </p>
        </div>
      </div>

      {/* Content depending on selected track */}
      {activeTrack === 'jlpt' ? (
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-appText-bright">Pilih Jenjang JLPT:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jlptLevels.map((lvl) => {
              const isSelected = selectedLevel === lvl.id;
              return (
                <div
                  key={lvl.id}
                  onClick={() => setSelectedLevel(lvl.id)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all ${
                    isSelected
                      ? 'border-accent bg-amber-500/15 shadow-sm'
                      : 'bg-surface-2 border-accent/20 hover:border-accent/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${lvl.color}`}>
                      {lvl.label}
                    </span>
                    <span className="text-[11px] text-appText-muted">{lvl.desc}</span>
                  </div>
                  <div className="text-xs text-appText-bright font-medium mt-3">{lvl.count}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-appText-bright">Pilih Seri Buku Pegangan:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bookTracks.map((b) => (
              <div
                key={b.id}
                className="bg-surface-2 border border-accent/20 hover:border-accent/40 rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition-all"
              >
                <div className="text-3xl">{b.icon}</div>
                <div>
                  <h4 className="font-bold text-sm text-appText-bright">{b.title}</h4>
                  <p className="text-xs text-appText-muted mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
