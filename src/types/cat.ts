// ══════════════════════════════════════════════════════════════════
//  cat.ts — Official Computer Adaptive Testing (CAT) IRT Contract
//  Research Basis: Reckase (2009), Lord (1980), Fisher Information, SEM <= 0.35
// ══════════════════════════════════════════════════════════════════

export interface CATQuestionItem {
  id: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'jft-a1' | 'jft-a2';
  pt_stage: 1 | 2 | 3 | 4 | 5 | 6;
  a_discrimination: number; // Parameter daya pembeda a_i (0.8 - 2.5)
  b_difficulty: number;     // Parameter kesulitan b_i (-2.5 - +2.5)
  c_guessing?: number;      // Parameter tebakan semu c_i (default: 0.25)
  target_grammar_id?: string;
  contrastive_tag?: string;
  prompt_jp: string;
  options: {
    text: string;
    is_correct: boolean;
    misconception_tag?: string;
  }[];
}

export interface CATSessionState {
  current_theta: number;    // Kemahiran laten saat ini (-3.0 s.d. +3.0)
  current_se: number;       // Standard error saat ini
  administered_items: {
    item_id: string;
    user_response_correct: boolean;
    theta_after: number;
    se_after: number;
  }[];
  is_terminated: boolean;
  recommended_level?: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'pre-n5';
}
