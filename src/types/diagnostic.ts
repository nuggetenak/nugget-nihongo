// ══════════════════════════════════════════════════════════════════
//  diagnostic.ts — Indonesian L1 Diagnostic & Remediation Contract
//  Research Basis: Prihantoro et al. (2024), Husna & Febriyanti (2022)
// ══════════════════════════════════════════════════════════════════

export type L1InterferenceDomain =
  | 'particles'
  | 'aspect_tense'
  | 'benefactives'
  | 'modality_conditionals'
  | 'ruigigo_negation'
  | 'sociopragmatics';

export interface L1DiagnosticItem {
  diagnostic_id: string;    // Misal: 'L1D-001' s.d. 'L1D-150'
  domain: L1InterferenceDomain;
  japanese_pattern: string;
  l1_interference_mechanism: string; // Analisis mengapa orang Indonesia otomatis salah
  incorrect_transfer_example: string;
  canonical_correct_sentence: string;
  remediation_drill: {
    question: string;
    correct_token: string;
    distractors: string[];
  };
  contrastive_rule_card?: {
    title: string;
    explanation_id: string;
    trap_warning: string;
  };
}
