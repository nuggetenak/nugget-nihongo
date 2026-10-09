export interface UserStreak {
  count: number;
  lastDate: string; // YYYY-MM-DD
  bestStreak: number;
  freezeCount: number;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  showFurigana: boolean;
  showRomaji: boolean;
  audioAutoPlay: boolean;
  hapticFeedback: boolean;
  dailyGoal: number; // minutes or cards
}

export interface GardenItem {
  id: string;
  name: string;
  stage: number; // 0 to 4 (seed to blossoming)
  waterCount: number;
  lastWatered: string;
}

export interface UserProfile {
  xp: number;
  level: number;
  streak: UserStreak;
  preferences: UserPreferences;
  garden: GardenItem[];
}
