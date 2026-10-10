import React, { useState } from 'react';
import { Sprout, Droplets, Sparkles, Award, Volume2, Info } from 'lucide-react';
import { useGardenStore, PlantItem } from '../lib/garden/gardenStore';
import { useAppStore } from '../store/useAppStore';
import { speakJapanese } from '../lib/audio/tts';
import { playWaterSfx } from '../lib/audio/sfx';

export const KebunPage: React.FC = () => {
  const { waterDrops, plants, waterPlant, waterAll } = useGardenStore();
  const { showToast, incrementXp, setActiveTab } = useAppStore();
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<'all' | 'n5' | 'n4' | 'n3' | 'n2'>('all');
  const [wateringId, setWateringId] = useState<string | null>(null);

  const STAGE_LABELS = [
    { label: 'Benih Ditabur', icon: '🌰', desc: 'Butuh air untuk berkecambah' },
    { label: 'Mulai Bertunas', icon: '🌱', desc: 'Tunas hijau muda mulai muncul' },
    { label: 'Tumbuh Batang', icon: '🌿', desc: 'Daun kanji semakin rimbun' },
    { label: 'Kuncup Bunga', icon: '🪴', desc: 'Hampir mekar sepenuhnya' },
    { label: 'Mekar Sempurna', icon: '🌸', desc: 'Kanji telah terpatri di memori' },
  ];

  const handleWaterSingle = (plant: PlantItem) => {
    if (plant.stage >= 4) {
      showToast(`Kanji ${plant.kanji} sudah mekar sempurna! 🌸`, '✨');
      return;
    }
    if (waterDrops <= 0) {
      showToast('Tetes air habis! Selesaikan latihan kuis untuk mendapatkan air 💧', '⚠️');
      return;
    }
    const success = waterPlant(plant.id);
    if (success) {
      playWaterSfx();
      setWateringId(plant.id);
      setTimeout(() => setWateringId(null), 500);
      incrementXp(5);
      showToast(`Menyiram kanji "${plant.kanji}" (+5 XP)! 💧`, '🌱');
    }
  };

  const handleWaterAll = () => {
    if (waterDrops <= 0) {
      showToast('Tetes air habis! Selesaikan latihan kuis untuk mendapatkan air 💧', '⚠️');
      return;
    }
    const count = waterAll();
    if (count > 0) {
      playWaterSfx();
      incrementXp(count * 5);
      showToast(`Menyiram ${count} tanaman di kebun (+${count * 5} XP)! 🌸`, '✨');
    } else {
      showToast('Semua tanaman yang bisa disiram sudah segar! 🌿', '✨');
    }
  };

  const filteredPlants = selectedLevelFilter === 'all'
    ? plants
    : plants.filter((p) => p.level === selectedLevelFilter);

  const bloomingCount = plants.filter((p) => p.stage === 4).length;

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-extrabold text-appText-bright mb-1">Kebun Kata · 単語の庭</h1>
        <p className="text-xs text-appText-muted">Rawat pohon kanjimu dengan latihan harian. Setiap ulasan memekarkan bunga pemahaman.</p>
      </div>

      {/* Garden Stats & Water Drops Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950/40 via-surface to-surface border-2 border-emerald-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl">
        {/* Subtle ambient Zen Garden art overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: `url('/images/zen-study.jpg')` }}
        />
        <div className="relative z-10 space-y-1.5 sm:space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>{bloomingCount} dari {plants.length} Kanji Telah Mekar</span>
          </div>

          <h2 className="text-lg sm:text-2xl font-bold text-appText-bright">
            Ekosistem Memori FSRS yang Hidup 🌸
          </h2>

          <p className="text-xs text-appText-muted max-w-md leading-relaxed hidden sm:block">
            Selesaikan review flashcard di Arena Kuis untuk mengumpulkan tetesan air dan menyiram kebunmu setiap hari.
          </p>
        </div>

        {/* Water Stock Card & Action */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2.5 sm:gap-3">
          <div className="flex-1 sm:flex-initial flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-surface-2 border border-emerald-500/30 shadow-sm">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Droplets className="w-4 h-4 sm:w-6 sm:h-6 fill-blue-400 text-blue-400" />
            </div>
            <div>
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-appText-muted">Air</div>
              <div className="text-base sm:text-xl font-bold font-mono text-blue-400">{waterDrops} Tetes</div>
            </div>
          </div>

          <button
            onClick={handleWaterAll}
            className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 min-h-[44px]"
          >
            <Droplets className="w-4 h-4 fill-white" />
            <span>Siram Semua</span>
          </button>
        </div>
      </div>

      {/* Empty Water Drops Guide Banner */}
      {waterDrops === 0 && (
        <div className="bg-surface-2 border border-amber-500/30 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 text-accent-hot border border-amber-500/30 flex items-center justify-center text-base sm:text-lg shrink-0">
              💧
            </div>
            <div>
              <div className="text-xs font-bold text-appText-bright">Persediaan Air Habis</div>
              <div className="text-[11px] text-appText-muted">Selesaikan 1 sesi latihan di Arena Kuis untuk mengumpulkan 2–5 tetes air segar.</div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('quiz')}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm shrink-0 active:scale-95"
          >
            <span>Latihan Kuis Sekarang →</span>
          </button>
        </div>
      )}

      {/* Level Filter Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(['all', 'n5', 'n4', 'n3', 'n2'] as const).map((lvl) => {
          const isSelected = selectedLevelFilter === lvl;
          return (
            <button
              key={lvl}
              onClick={() => setSelectedLevelFilter(lvl)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border uppercase whitespace-nowrap shrink-0 active:scale-95 ${
                isSelected
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                  : 'bg-surface-2 border-accent/15 text-appText-muted hover:text-appText-bright'
              }`}
            >
              {lvl === 'all' ? 'Semua Kanji' : `JLPT ${lvl}`}
            </button>
          );
        })}
      </div>

      {/* Responsive Plants Grid (2 columns on mobile, 3-4 on desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {filteredPlants.map((plant) => {
          const stageInfo = STAGE_LABELS[plant.stage];
          const isMaxBloom = plant.stage >= 4;

              return (
            <div
              key={plant.id}
              className={`rounded-2xl sm:rounded-3xl border-2 p-3 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-sm ${
                wateringId === plant.id ? 'animate-water-pulse' : ''
              } ${
                isMaxBloom
                  ? 'bg-amber-950/20 border-amber-500/35'
                  : 'bg-surface-2 border-accent/20 hover:border-accent/40'
              }`}
            >
              {/* Plant Card Header */}
              <div className="flex items-center justify-between text-xs mb-2 sm:mb-3">
                <span className="font-bold uppercase text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-surface border border-accent/15 text-accent">
                  {plant.level.toUpperCase()}
                </span>
                <span className="text-sm sm:text-base leading-none" title={stageInfo.label}>
                  {stageInfo.icon}
                </span>
              </div>

              {/* Kanji Display & Audio */}
              <div className="text-center py-1 sm:py-2 space-y-0.5 sm:space-y-1">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <div className="text-3xl sm:text-5xl font-jp font-bold text-appText-bright">
                    {plant.kanji}
                  </div>
                  <button
                    onClick={() => speakJapanese(plant.kanji)}
                    className="p-1 sm:p-1.5 rounded-xl bg-surface hover:bg-surface-3 text-appText-muted hover:text-accent transition-all active:scale-95"
                  >
                    <Volume2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                  </button>
                </div>

                <div className="text-[11px] sm:text-xs font-jp text-amber-300 truncate">
                  【{plant.reading}】
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-appText-bright truncate">
                  {plant.meaning}
                </div>
              </div>

              {/* Growth Progress Bar */}
              <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-accent/10 space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-appText-muted">
                  <span className="truncate">{stageInfo.label}</span>
                  <span className="font-mono tabular-nums shrink-0">{plant.waterCount}/{plant.maxWater}</span>
                </div>

                <div className="w-full bg-surface rounded-full h-1.5 sm:h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${(plant.waterCount / plant.maxWater) * 100}%` }}
                  />
                </div>

                {/* Single Water Button */}
                <button
                  onClick={() => handleWaterSingle(plant)}
                  disabled={isMaxBloom}
                  className={`w-full py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 sm:gap-1.5 transition-all mt-1.5 sm:mt-2 min-h-[40px] active:scale-95 ${
                    isMaxBloom
                      ? 'bg-surface text-amber-300/60 border border-amber-500/20 cursor-default'
                      : 'bg-emerald-600/80 hover:bg-emerald-600 text-white shadow-sm'
                  }`}
                >
                  <Droplets className="w-3.5 h-3.5" />
                  <span>{isMaxBloom ? 'Mekar' : 'Siram (+1)'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
