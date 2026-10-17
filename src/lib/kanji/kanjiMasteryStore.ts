// ══════════════════════════════════════════════════════════════════
//  kanjiMasteryStore.ts — Persistent Kanji Touch-Writing Mastery Tracker
//  Maintains practice history, stroke accuracy & mastery milestones
// ══════════════════════════════════════════════════════════════════

export type KanjiMasteryLevel = 'learning' | 'practiced' | 'mastered';

export interface KanjiMasteryRecord {
  character: string;
  totalAttempts: number;
  successfulWrites: number;
  averageScore: number;
  lastPracticed: number;
  masteryLevel: KanjiMasteryLevel;
}

const STORAGE_KEY = 'nn_kanji_mastery_records';

class KanjiMasteryManager {
  private records: Map<string, KanjiMasteryRecord> = new Map();

  constructor() {
    this.loadRecords();
  }

  private loadRecords(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed === 'object' && parsed !== null) {
          Object.entries(parsed).forEach(([char, record]) => {
            this.records.set(char, record as KanjiMasteryRecord);
          });
        }
      }
    } catch {
      this.records.clear();
    }
  }

  private persistRecords(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const obj: Record<string, KanjiMasteryRecord> = {};
      this.records.forEach((val, key) => {
        obj[key] = val;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    } catch (err) {
      console.warn('[kanjiMasteryStore] Failed to persist records:', err);
    }
  }

  /**
   * Records a practice session for a Kanji character
   */
  public recordPractice(
    character: string,
    score: number,
    isComplete: boolean
  ): KanjiMasteryRecord {
    const existing = this.records.get(character) || {
      character,
      totalAttempts: 0,
      successfulWrites: 0,
      averageScore: 0,
      lastPracticed: 0,
      masteryLevel: 'learning' as KanjiMasteryLevel,
    };

    const newAttempts = existing.totalAttempts + 1;
    const newSuccesses = isComplete ? existing.successfulWrites + 1 : existing.successfulWrites;
    const newAvgScore = Math.round(
      (existing.averageScore * existing.totalAttempts + score) / newAttempts
    );

    let level: KanjiMasteryLevel = 'learning';
    if (newSuccesses >= 3 && newAvgScore >= 80) {
      level = 'mastered';
    } else if (newSuccesses >= 1) {
      level = 'practiced';
    }

    const updated: KanjiMasteryRecord = {
      character,
      totalAttempts: newAttempts,
      successfulWrites: newSuccesses,
      averageScore: newAvgScore,
      lastPracticed: Date.now(),
      masteryLevel: level,
    };

    this.records.set(character, updated);
    this.persistRecords();

    return updated;
  }

  public getMastery(character: string): KanjiMasteryRecord | null {
    return this.records.get(character) || null;
  }

  public getMasteryStats(): {
    totalPracticed: number;
    masteredCount: number;
    averageAccuracy: number;
  } {
    if (this.records.size === 0) {
      return { totalPracticed: 0, masteredCount: 0, averageAccuracy: 0 };
    }

    let mastered = 0;
    let totalScore = 0;

    this.records.forEach((r) => {
      if (r.masteryLevel === 'mastered') mastered++;
      totalScore += r.averageScore;
    });

    return {
      totalPracticed: this.records.size,
      masteredCount: mastered,
      averageAccuracy: Math.round(totalScore / this.records.size),
    };
  }

  public clearRecords(): void {
    this.records.clear();
    this.persistRecords();
  }
}

export const kanjiMasteryStore = new KanjiMasteryManager();
