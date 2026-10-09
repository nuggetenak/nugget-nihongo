// ══════════════════════════════════════════════════════════════════
//  NuanceCompareModal.tsx — Side-by-Side Grammar Nuance Comparison
//  Contrasting tricky grammar pairs with semantic distinction & exam traps
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { X, Volume2, Sparkles, Scale, AlertTriangle, ArrowRight } from 'lucide-react';
import { speakJapanese } from '../../lib/audio/tts';

interface NuancePair {
  id: string;
  title: string;
  level: string;
  patternA: {
    pattern: string;
    reading: string;
    meaning: string;
    nuance: string;
    example: { jp: string; id: string };
  };
  patternB: {
    pattern: string;
    reading: string;
    meaning: string;
    nuance: string;
    example: { jp: string; id: string };
  };
  keyDifference: string;
  trapWarning: string;
}

const NUANCE_COMPARISON_PAIRS: NuancePair[] = [
  {
    id: 'wake-vs-kagiranai',
    title: 'わけではない vs とは限らない',
    level: 'N3 / N2',
    patternA: {
      pattern: 'わけではない',
      reading: 'わけではない',
      meaning: 'Bukan berarti / Bukan bermaksud sepenuhnya...',
      nuance: 'Digunakan untuk menyangkal kesimpulan wajar orang lain. Bersifat subjektif dan membela diri dari asumsi lawan bicara.',
      example: {
        jp: '嫌いなわけではないが、今は食べたくない。',
        id: 'Bukan berarti saya membencinya, hanya saja sekarang lagi tidak ingin makan.',
      },
    },
    patternB: {
      pattern: 'とは限らない',
      reading: 'とはかぎらない',
      meaning: 'Belum tentu / Tidak selalu...',
      nuance: 'Menyatakan probabilitas objektif atau kebenaran umum bahwa sesuatu yang lazim tidak 100% berlaku di setiap situasi.',
      example: {
        jp: '高いものが必ずしも良いとは限らない。',
        id: 'Barang yang mahal belum tentu selalu berkualitas bagus.',
      },
    },
    keyDifference: 'わけではない menyangkal praduga khusus ("bukan begitu maksud saya"), sedangkan とは限らない menyatakan kemungkinan objektif ("ada perkecualian secara logika").',
    trapWarning: 'Soal JLPT sering memunculkan kata 必ずしも (kanarazushimo = belum tentu). Pasangan alaminya adalah とは限らない!',
  },
  {
    id: 'monodakara-vs-seide',
    title: 'ものだから vs せいで',
    level: 'N3 / N2',
    patternA: {
      pattern: 'ものだから',
      reading: 'ものだから / もんだから',
      meaning: 'Karena / Maklum saja soalnya...',
      nuance: 'Alasan pribadi yang bersifat membela diri secara halus untuk memohon permakluman dari pendengar. Tidak boleh digunakan untuk menyalahkan orang lain.',
      example: {
        jp: '道が混んでいたものだから、遅れてしまいました。',
        id: 'Karena jalanan macet parah (harap maklum), saya jadi terlambat.',
      },
    },
    patternB: {
      pattern: 'せいで',
      reading: 'せいで',
      meaning: 'Gara-gara / Akibat buruk dari...',
      nuance: 'Menyalahkan faktor eksternal atau seseorang atas hasil yang buruk atau kegagalan yang merugikan.',
      example: {
        jp: '雨が降ったせいで、試合が中止になった。',
        id: 'Gara-gara hujan turun, pertandingannya jadi dibatalkan.',
      },
    },
    keyDifference: 'ものだから bernada sopan memohon pengertian atas kekurangan diri sendiri, sedangkan せいで bernada menyalahkan pihak lain atau keadaan atas kesialan.',
    trapWarning: 'Jangan pernah gunakan せいで saat berbicara dengan atasan untuk membela diri atas kesalahan sendiri, karena terkesan lempar tanggung jawab!',
  },
  {
    id: 'warini-vs-nishiteha',
    title: 'わりに(は) vs にしては',
    level: 'N3 / N2',
    patternA: {
      pattern: 'わりに(は)',
      reading: 'わりには',
      meaning: 'Untuk ukuran / Mengingat bahwa...',
      nuance: 'Membandingkan standar umum yang bisa diukur (harga, usia, porsi). Rentang kategori umum (misal: untuk ukuran harga murah).',
      example: {
        jp: 'この料理は値段のわりに量が多い。',
        id: 'Masakan ini untuk ukuran harganya, porsinya tergolong sangat banyak.',
      },
    },
    patternB: {
      pattern: 'にしては',
      reading: 'にしては',
      meaning: 'Mengingat faktanya... (tidak terduga)',
      nuance: 'Kenyataan spesifik bertentangan dengan ekspektasi normal yang dipicu oleh fakta tersebut. Terkesan ada rasa heran atau kejutan.',
      example: {
        jp: '彼は日本に10年も住んでいるにしては、日本語が下手だ。',
        id: 'Mengingat dia sudah tinggal 10 tahun di Jepang, bahasa Jepangnya tergolong kurang lancar.',
      },
    },
    keyDifference: 'わりに membandingkan kategori umum skala (harga vs kualitas), sedangkan にしては menekankan keganjilan atau kejutan atas fakta konkret tertentu.',
    trapWarning: 'にしては tidak bisa diawali kata sifat umum tanpa kata benda spesifik (contoh salah: 安いにしては). Harus menggunakan わりに (安いのわりに)!',
  },
  {
    id: 'wa-vs-ga',
    title: 'は (wa) vs が (ga)',
    level: 'N5 / N4',
    patternA: {
      pattern: 'は (Partikel Topik)',
      reading: 'わ (wa)',
      meaning: 'Adapun mengenai X... (Topik)',
      nuance: 'Menentukan topik pembicaraan yang sudah diketahui kedua pihak. Fokus perhatian ada pada predikat di belakang は.',
      example: {
        jp: '私は田中です。',
        id: 'Adapun mengenai saya, saya adalah Tanaka (fokus: Tanaka).',
      },
    },
    patternB: {
      pattern: 'が (Partikel Subjek)',
      reading: 'が (ga)',
      meaning: 'Justru X inilah yang... (Fokus Subjek)',
      nuance: 'Menunjuk subjek informasi baru atau penegas identitas. Fokus perhatian ada pada kata di depan が.',
      example: {
        jp: 'だれが来ましたか？ — 田中さんが来ました。',
        id: 'Siapa yang datang? — Tanaka-lah yang datang (fokus: Tanaka).',
      },
    },
    keyDifference: 'A は B (fokus informasi ada pada B). A が B (fokus informasi ada pada A).',
    trapWarning: 'Dalam anak kalimat (subordinate clause) seperti "waktu saya tiba...", subjek selalu memakai が, tidak boleh memakai は!',
  },
  {
    id: 'ni-vs-de',
    title: 'に (ni) vs で (de)',
    level: 'N5 / N4',
    patternA: {
      pattern: 'に (Titik Keberadaan)',
      reading: 'に',
      meaning: 'Di / Ke (Lokasi statis atau titik tujuan)',
      nuance: 'Menunjukkan lokasi keberadaan benda/orang tanpa aksi dinamis (arimasu/imasu), atau titik akhir tujuan perpindahan (ikimasu).',
      example: {
        jp: '公園に犬がいます。',
        id: 'Di taman ada anjing (keberadaan statis).',
      },
    },
    patternB: {
      pattern: 'で (Lokasi Aksi/Aktivitas)',
      reading: 'で',
      meaning: 'Di (Tempat berlangsungnya kegiatan aktif)',
      nuance: 'Menunjukkan tempat terjadinya kegiatan dinamis (belajar, makan, bermain, bekerja).',
      example: {
        jp: '公園でサッカーをします。',
        id: 'Bermain sepak bola di taman (kegiatan aktif).',
      },
    },
    keyDifference: 'Ada di sana? Gunakan に (います/あります). Melakukan sesuatu di sana? Gunakan で (たべます/はたらきます).',
    trapWarning: 'Khusus kata "tinggal" (sumimasu), orang Jepang menganggapnya sebagai lokasi keberadaan statis sehingga memakai に (東京に住んでいます)!',
  },
];

interface NuanceCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NuanceCompareModal: React.FC<NuanceCompareModalProps> = ({ isOpen, onClose }) => {
  const [selectedPairId, setSelectedPairId] = useState<string>('wake-vs-kagiranai');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentPair = NUANCE_COMPARISON_PAIRS.find((p) => p.id === selectedPairId) || NUANCE_COMPARISON_PAIRS[0];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-5 animate-in fade-in duration-200"
      role="dialog"
      aria-label="Inspektor Perbandingan Nuansa Tata Bahasa"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90dvh] sm:max-h-[92vh] overflow-y-auto bg-surface border-t-2 sm:border-2 border-accent/30 rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl relative animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 scrollbar-none"
      >
        {/* Mobile Drag Handle Pill */}
        <div className="w-12 h-1.5 rounded-full bg-accent/25 mx-auto -mt-1 mb-2 sm:hidden shrink-0" />
        {/* Header */}
        <div className="flex items-center justify-between border-b border-accent/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-accent shadow-glow">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-appText-bright flex items-center gap-2">
                <span>Inspektor Nuansa Tata Bahasa</span>
                <span className="text-xs font-mono text-accent">ニュアンス比較</span>
              </h2>
              <p className="text-xs text-appText-muted">
                Bedah perbedaan pola serupa yang sering menjebak peserta ujian JLPT.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-2 hover:bg-surface-3 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pair Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {NUANCE_COMPARISON_PAIRS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPairId(p.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                selectedPairId === p.id
                  ? 'bg-accent text-bg border-accent shadow-sm'
                  : 'bg-surface-2 border-accent/20 text-appText-muted hover:text-appText-bright'
              }`}
            >
              <span>{p.title}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedPairId === p.id ? 'bg-black/20 text-bg' : 'bg-amber-500/15 text-accent'
              }`}>
                {p.level}
              </span>
            </button>
          ))}
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pattern A Box */}
          <div className="bg-surface-2 border border-accent/25 rounded-2xl p-5 space-y-3">
            <div className="flex items-start justify-between gap-2 border-b border-accent/15 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Pola A
                </span>
                <h3 className="text-xl font-jp font-bold text-appText-bright mt-1.5">
                  {currentPair.patternA.pattern}
                </h3>
                <div className="text-xs text-accent font-semibold mt-0.5">
                  {currentPair.patternA.meaning}
                </div>
              </div>

              <button
                onClick={() => speakJapanese(currentPair.patternA.pattern)}
                className="p-2 rounded-xl bg-surface hover:bg-amber-500/20 text-accent transition-all shrink-0"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-appText-muted leading-relaxed">
              <span className="font-bold text-appText-bright block mb-1">Karakter & Nuansa:</span>
              {currentPair.patternA.nuance}
            </div>

            <div className="bg-surface/70 rounded-xl p-3 border border-accent/10 space-y-1">
              <div className="flex items-center justify-between text-xs font-jp text-appText-bright font-semibold">
                <span>{currentPair.patternA.example.jp}</span>
                <button
                  onClick={() => speakJapanese(currentPair.patternA.example.jp)}
                  className="p-1 text-appText-muted hover:text-accent transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-[11px] text-appText-muted italic">
                {currentPair.patternA.example.id}
              </div>
            </div>
          </div>

          {/* Pattern B Box */}
          <div className="bg-surface-2 border border-accent/25 rounded-2xl p-5 space-y-3">
            <div className="flex items-start justify-between gap-2 border-b border-accent/15 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Pola B
                </span>
                <h3 className="text-xl font-jp font-bold text-appText-bright mt-1.5">
                  {currentPair.patternB.pattern}
                </h3>
                <div className="text-xs text-accent font-semibold mt-0.5">
                  {currentPair.patternB.meaning}
                </div>
              </div>

              <button
                onClick={() => speakJapanese(currentPair.patternB.pattern)}
                className="p-2 rounded-xl bg-surface hover:bg-amber-500/20 text-accent transition-all shrink-0"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-appText-muted leading-relaxed">
              <span className="font-bold text-appText-bright block mb-1">Karakter & Nuansa:</span>
              {currentPair.patternB.nuance}
            </div>

            <div className="bg-surface/70 rounded-xl p-3 border border-accent/10 space-y-1">
              <div className="flex items-center justify-between text-xs font-jp text-appText-bright font-semibold">
                <span>{currentPair.patternB.example.jp}</span>
                <button
                  onClick={() => speakJapanese(currentPair.patternB.example.jp)}
                  className="p-1 text-appText-muted hover:text-accent transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-[11px] text-appText-muted italic">
                {currentPair.patternB.example.id}
              </div>
            </div>
          </div>
        </div>

        {/* Core Distinction & Trap Warning Summary */}
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-amber-500/15 via-surface-2 to-surface-2 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-accent-hot shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-accent uppercase tracking-wider">
                Perbedaan Inti:
              </div>
              <p className="text-xs text-appText-bright mt-1 leading-relaxed">
                {currentPair.keyDifference}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 via-surface-2 to-surface-2 border border-red-500/30 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center text-red-300 shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-red-300 uppercase tracking-wider">
                Jebakan Soal Ujian (JLPT Trap Warning):
              </div>
              <p className="text-xs text-appText-muted mt-1 leading-relaxed">
                {currentPair.trapWarning}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
