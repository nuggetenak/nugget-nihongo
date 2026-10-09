export type JLPTLevel = 'n5' | 'n4' | 'n3' | 'n2' | 'n1';

export type WordCategory = 'verb' | 'adjective' | 'noun' | 'adverb' | 'expression' | 'particle';

export interface VocabEntry {
  id: string;
  word: string;
  reading: string;
  romaji?: string;
  meaning: string;
  english?: string;
  level: JLPTLevel;
  type: WordCategory;
  category?: string;
  exampleJp?: string;
  exampleId?: string;
  furigana?: string;
  kanji?: string;
  tags?: string[];
  audio?: string;
  lesson?: number;
  book?: string;
}

export interface VocabFilter {
  level?: JLPTLevel | 'all';
  category?: WordCategory | 'all';
  searchQuery?: string;
  book?: string | 'all';
}
