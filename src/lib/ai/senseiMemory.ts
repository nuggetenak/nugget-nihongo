// ══════════════════════════════════════════════════════════════════
//  senseiMemory.ts — Long-Term Learner Memory Layer (Mem0 Architecture)
//  Research Basis: Mem0 AI memory layer, personalized SLA tutoring
//  Persists student goals, recurring L1 trap errors, and conversation context
// ══════════════════════════════════════════════════════════════════

export type MemoryCategory = 'goal' | 'weak_point' | 'preference' | 'mastered_concept';

export interface SenseiMemoryItem {
  id: string;
  category: MemoryCategory;
  content: string;
  relevanceScore: number; // 0.0 - 1.0
  createdAt: number;      // Unix timestamp
  metadata?: Record<string, any>;
}

class SenseiMemoryService {
  private static STORAGE_KEY = 'nugget_sensei_mem0_memory_v1';
  private memories: SenseiMemoryItem[] = [];

  constructor() {
    this.hydrate();
  }

  private hydrate(): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      const stored = window.localStorage.getItem(SenseiMemoryService.STORAGE_KEY);
      if (stored) {
        this.memories = JSON.parse(stored);
      }
    } catch {
      this.memories = [];
    }
  }

  private persist(): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      window.localStorage.setItem(SenseiMemoryService.STORAGE_KEY, JSON.stringify(this.memories));
    } catch (e) {
      console.warn('[senseiMemory] Failed to persist memories:', e);
    }
  }

  public addMemory(category: MemoryCategory, content: string, metadata?: Record<string, any>): SenseiMemoryItem {
    const item: SenseiMemoryItem = {
      id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      category,
      content: content.trim(),
      relevanceScore: 1.0,
      createdAt: Date.now(),
      metadata,
    };

    // Prevent duplicate exact memory content
    const existingIdx = this.memories.findIndex(m => m.content.toLowerCase() === item.content.toLowerCase());
    if (existingIdx !== -1) {
      this.memories[existingIdx].relevanceScore = Math.min(1.0, this.memories[existingIdx].relevanceScore + 0.1);
      this.memories[existingIdx].createdAt = Date.now();
      this.persist();
      return this.memories[existingIdx];
    }

    this.memories.push(item);
    this.persist();
    return item;
  }

  public getMemories(category?: MemoryCategory): SenseiMemoryItem[] {
    if (!category) return [...this.memories];
    return this.memories.filter(m => m.category === category);
  }

  public retrieveRelevantMemories(query: string, limit = 5): SenseiMemoryItem[] {
    if (!query.trim()) {
      return this.memories.slice(-limit);
    }

    const qWords = query.toLowerCase().split(/\s+/).filter(Boolean);

    // Score based on token overlap & category priority
    const scored = this.memories.map(m => {
      let score = m.relevanceScore;
      const contentLower = m.content.toLowerCase();
      qWords.forEach(w => {
        if (contentLower.includes(w)) {
          score += 0.5;
        }
      });
      return { item: m, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map(s => s.item);
  }

  /**
   * Formats retrieved memories into a structured markdown block for Sensei's system prompt.
   */
  public formatMemoriesForPrompt(): string {
    if (this.memories.length === 0) return '';

    const lines: string[] = ['### Memori Pembelajar (Personalized Memory Context):'];
    this.memories.slice(-6).forEach(m => {
      const badge =
        m.category === 'goal'
          ? '🎯 Target'
          : m.category === 'weak_point'
          ? '⚠️ Titik Lemah'
          : m.category === 'preference'
          ? '⚙️ Preferensi'
          : '✅ Dikuasai';
      lines.push(`- [${badge}]: ${m.content}`);
    });

    return lines.join('\n');
  }

  public clearAll(): void {
    this.memories = [];
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(SenseiMemoryService.STORAGE_KEY);
    }
  }
}

export const senseiMemory = new SenseiMemoryService();
