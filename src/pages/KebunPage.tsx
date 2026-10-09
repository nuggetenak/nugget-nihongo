import React from 'react';
import { Sprout, Droplets, Sparkles, Award } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const KebunPage: React.FC = () => {
  const { streak, showToast } = useAppStore();

  const plants = [
    { id: 'p1', kanji: '日', name: 'Matahari / Hari', stage: 4, label: 'Mekar Sempurna 🌸' },
    { id: 'p2', kanji: '本', name: 'Buku / Asal', stage: 3, label: 'Tumbuh Subur 🌿' },
    { id: 'p3', kanji: '語', name: 'Bahasa / Kata', stage: 2, label: 'Mulai Bertunas 🌱' },
    { id: 'p4', kanji: '勉', name: 'Berusaha / Giat', stage: 1, label: 'Benih Baru Ditabur 🌰' },
  ];

  const handleWaterGarden = () => {
    showToast('Kebun disiram! Tanaman kanji semakin subur 💧', '🌱');
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-extrabold text-appText-bright mb-1">Kebun Kata · 単語の庭</h1>
        <p className="text-xs text-appText-muted">Setiap kata yang kamu review secara konsisten akan tumbuh menjadi tanaman yang mekar.</p>
      </div>

      {/* Garden Overview Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-surface to-surface border border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>Ekosistem Belajar Alami</span>
          </div>
          <h2 className="text-xl font-bold text-appText-bright">Rawat Kebunmu Setiap Hari</h2>
          <p className="text-xs text-appText-muted max-w-md leading-relaxed">
            Menjaga streak review harian memberi nutrisi pada tanaman kata-katamu agar tidak layu atau terlupakan.
          </p>
        </div>

        <button
          onClick={handleWaterGarden}
          className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
        >
          <Droplets className="w-4 h-4 fill-white" />
          <span>Siram Tanaman (+5 XP)</span>
        </button>
      </div>

      {/* Plants Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plants.map((plant) => (
          <div
            key={plant.id}
            className="bg-surface-2 border border-accent/20 rounded-2xl p-6 flex flex-col items-center text-center space-y-3"
          >
            <div className="w-16 h-16 rounded-2xl bg-surface border border-accent/25 flex items-center justify-center text-3xl font-jp font-bold text-appText-bright shadow-sm">
              {plant.kanji}
            </div>
            <div>
              <div className="font-bold text-sm text-appText-bright">{plant.name}</div>
              <div className="text-[11px] text-accent mt-0.5">{plant.label}</div>
            </div>
            <div className="w-full bg-surface rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full rounded-full"
                style={{ width: `${(plant.stage / 4) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
