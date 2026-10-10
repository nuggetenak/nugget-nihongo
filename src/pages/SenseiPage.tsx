import React from 'react';
import { Sparkles, MessageSquare, Compass, ArrowRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const SenseiPage: React.FC = () => {
  const { setActiveTab } = useAppStore();

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8 animate-in fade-in duration-300">
      {/* Warm Amber Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/40 via-amber-900/20 to-surface border-2 border-amber-500/30 p-8 sm:p-12 text-center shadow-xl">
        {/* Pulsing Orb Glow */}
        <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-radial from-amber-400/30 to-amber-600/10 border-2 border-amber-500/40 flex items-center justify-center text-4xl shadow-glow animate-pulse">
          🍵
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22C55E] animate-ping" />
          Sedang Dalam Peracikan · Coming Soon
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-appText-bright tracking-tight mb-3">
          Sensei AI Sedang Bersiap! 🍵
        </h1>

        <p className="text-sm sm:text-base text-appText-muted max-w-xl mx-auto leading-relaxed">
          Fitur bimbingan personal cerdas sedang dirancang dengan cermat untuk menemani perjalanan belajarmu secara mendalam dan ramah tanpa tekanan.
        </p>
      </div>

      {/* Feature Sneak Peek Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-surface-2 border border-accent/20 hover:border-accent/40 rounded-2xl p-6 flex flex-col gap-3 transition-all">
          <div className="text-3xl mb-1">📖</div>
          <h3 className="font-bold text-base text-appText-bright">Nuansa Tata Bahasa</h3>
          <p className="text-xs text-appText-muted leading-relaxed flex-1">
            Penjelasan perbedaan halus pola mirip (seperti 〜わけではない vs 〜とは限らない) dalam konteks bahasa Indonesia yang santai.
          </p>
          <span className="self-start text-[11px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full">
            Under Construction
          </span>
        </div>

        <div className="bg-surface-2 border border-accent/20 hover:border-accent/40 rounded-2xl p-6 flex flex-col gap-3 transition-all">
          <div className="text-3xl mb-1">🎯</div>
          <h3 className="font-bold text-base text-appText-bright">Latihan Adaptif</h3>
          <p className="text-xs text-appText-muted leading-relaxed flex-1">
            Soal-soal latihan dinamis yang dibuat khusus berdasarkan kosakata dan kanji yang paling sering kamu lupakan.
          </p>
          <span className="self-start text-[11px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full">
            Under Construction
          </span>
        </div>

        <div className="bg-surface-2 border border-accent/20 hover:border-accent/40 rounded-2xl p-6 flex flex-col gap-3 transition-all">
          <div className="text-3xl mb-1">💬</div>
          <h3 className="font-bold text-base text-appText-bright">Percakapan Situasional</h3>
          <p className="text-xs text-appText-muted leading-relaxed flex-1">
            Simulasi dialog kehidupan nyata di Jepang: pesan ramen di kedai, tanya arah di stasiun, hingga percakapan santai.
          </p>
          <span className="self-start text-[11px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full">
            Under Construction
          </span>
        </div>
      </div>

      {/* Action Box to Redirect */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="font-bold text-appText-bright text-sm sm:text-base">Sambil menunggu Sensei siap...</h4>
          <p className="text-xs text-appText-muted">Kamu tetap bisa memperkuat hafalan dengan ribuan materi di Hub & Arena Kuis!</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('materi')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
          >
            <span>Buka Materi Hub</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-bright font-bold text-xs border border-accent/25 transition-all active:scale-95"
          >
            Mulai Kuis
          </button>
        </div>
      </div>
    </div>
  );
};
