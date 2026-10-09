import { JLPTLevel } from './vocab';

export type GrammarCategory = 
  | 'tense-aspect'
  | 'verb-forms'
  | 'conditionals'
  | 'modality'
  | 'negation-extent'
  | 'connectives'
  | 'nouns-predicates'
  | 'desire-social'
  | 'particles'
  | 'adverbs'
  | 'expressions';

export interface GrammarExample {
  jp: string;
  id: string;
  romaji?: string;
  notes?: string;
}

export interface GrammarEntry {
  id: string;
  title: string;
  pattern: string;
  meaning: string;
  level: JLPTLevel;
  category: GrammarCategory;
  explanation: string;
  formation: string;
  examples: GrammarExample[];
  nuance?: string;
  caution?: string;
  related?: string[];
  book?: string;
  lesson?: number;
}
