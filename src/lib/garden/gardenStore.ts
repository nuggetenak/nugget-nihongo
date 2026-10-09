// ══════════════════════════════════════════════════════════════════
//  gardenStore.ts — Kebun Kata (Kanji Growth Garden State)
//  Persisted in localStorage with growth mechanics & daily watering
// ══════════════════════════════════════════════════════════════════

import { create } from 'zustand';
import { useGamificationStore } from '../gamification/gamificationStore';

export interface PlantItem {
  id: string;
  kanji: string;
  reading: string;
  meaning: string;
  level: 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
  stage: number;      // 0 to 4
  waterCount: number; // how many times watered
  maxWater: number;   // water needed for full bloom (e.g. 5)
  lastWatered?: string;
}

const DEFAULT_PLANTS: PlantItem[] = [
  { id: 'p-hi', kanji: '日', reading: 'ひ / にち', meaning: 'Matahari / Hari', level: 'n5', stage: 4, waterCount: 5, maxWater: 5 },
  { id: 'p-hon', kanji: '本', reading: 'ほん', meaning: 'Buku / Asal', level: 'n5', stage: 3, waterCount: 3, maxWater: 5 },
  { id: 'p-go', kanji: '語', reading: 'ご', meaning: 'Bahasa / Kata', level: 'n5', stage: 2, waterCount: 2, maxWater: 5 },
  { id: 'p-ben', kanji: '勉', reading: 'べん', meaning: 'Berusaha / Giat', level: 'n5', stage: 1, waterCount: 1, maxWater: 5 },
  { id: 'p-kyou', kanji: '強', reading: 'きょう / つよい', meaning: 'Kuat / Belajar', level: 'n5', stage: 0, waterCount: 0, maxWater: 5 },
  { id: 'p-tomo', kanji: '友', reading: 'とも', meaning: 'Sahabat / Teman', level: 'n4', stage: 2, waterCount: 2, maxWater: 5 },
  { id: 'p-kokoro', kanji: '心', reading: 'こころ / しん', meaning: 'Hati / Jiwa', level: 'n3', stage: 1, waterCount: 1, maxWater: 5 },
  { id: 'p-ai', kanji: '愛', reading: 'あい', meaning: 'Kasih Sayang / Cinta', level: 'n2', stage: 0, waterCount: 0, maxWater: 5 },
];

export interface GardenStoreState {
  waterDrops: number;
  plants: PlantItem[];
  addWaterDrop: (count?: number) => void;
  waterPlant: (plantId: string) => boolean;
  waterAll: () => number;
  seedPlant: (kanji: string, reading: string, meaning: string, level: 'n5' | 'n4' | 'n3' | 'n2' | 'n1') => boolean;
}

function loadSavedPlants(): PlantItem[] {
  if (typeof window === 'undefined') return DEFAULT_PLANTS;
  try {
    const raw = localStorage.getItem('nn_garden_plants');
    return raw ? JSON.parse(raw) : DEFAULT_PLANTS;
  } catch {
    return DEFAULT_PLANTS;
  }
}

function loadSavedDrops(): number {
  if (typeof window === 'undefined') return 3;
  try {
    const raw = localStorage.getItem('nn_garden_drops');
    return raw !== null ? parseInt(raw, 10) : 3;
  } catch {
    return 3;
  }
}

export const useGardenStore = create<GardenStoreState>((set, get) => ({
  waterDrops: loadSavedDrops(),
  plants: loadSavedPlants(),

  addWaterDrop: (count = 1) => {
    const updated = get().waterDrops + count;
    set({ waterDrops: updated });
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('nn_garden_drops', updated.toString()); } catch {}
    }
  },

  waterPlant: (plantId: string) => {
    const { waterDrops, plants } = get();
    if (waterDrops <= 0) return false;

    const plantIndex = plants.findIndex((p) => p.id === plantId);
    if (plantIndex === -1) return false;

    const plant = plants[plantIndex];
    if (plant.stage >= 4) return false; // already max bloom

    const newWaterCount = plant.waterCount + 1;
    const newStage = Math.min(4, Math.floor((newWaterCount / plant.maxWater) * 4));

    const updatedPlants = [...plants];
    updatedPlants[plantIndex] = {
      ...plant,
      waterCount: newWaterCount,
      stage: newStage,
      lastWatered: new Date().toISOString(),
    };

    const newDrops = waterDrops - 1;
    set({ waterDrops: newDrops, plants: updatedPlants });

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('nn_garden_plants', JSON.stringify(updatedPlants));
        localStorage.setItem('nn_garden_drops', newDrops.toString());
      } catch {}
    }

    if (newStage >= 4) {
      useGamificationStore.getState().checkAndAwardBadges({ gardenBloomed: true });
    }

    return true;
  },

  waterAll: () => {
    const { waterDrops, plants } = get();
    if (waterDrops <= 0) return 0;

    let dropsUsed = 0;
    const updatedPlants = plants.map((p) => {
      if (p.stage < 4 && dropsUsed < waterDrops) {
        dropsUsed++;
        const newWater = p.waterCount + 1;
        return {
          ...p,
          waterCount: newWater,
          stage: Math.min(4, Math.floor((newWater / p.maxWater) * 4)),
          lastWatered: new Date().toISOString(),
        };
      }
      return p;
    });

    const newDrops = waterDrops - dropsUsed;
    set({ waterDrops: newDrops, plants: updatedPlants });

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('nn_garden_plants', JSON.stringify(updatedPlants));
        localStorage.setItem('nn_garden_drops', newDrops.toString());
      } catch {}
    }

    if (updatedPlants.some((p) => p.stage >= 4)) {
      useGamificationStore.getState().checkAndAwardBadges({ gardenBloomed: true });
    }

    return dropsUsed;
  },

  seedPlant: (kanji, reading, meaning, level) => {
    const { plants } = get();
    if (plants.some((p) => p.kanji === kanji)) return false;

    const newPlant: PlantItem = {
      id: `p-${Date.now()}-${kanji}`,
      kanji,
      reading,
      meaning,
      level,
      stage: 0,
      waterCount: 0,
      maxWater: 5,
    };

    const updated = [newPlant, ...plants];
    set({ plants: updated });

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('nn_garden_plants', JSON.stringify(updated));
      } catch {}
    }
    return true;
  },
}));
