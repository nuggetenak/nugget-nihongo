// ══════════════════════════════════════════════════════════════════
//  useModalStore.ts — Centralized Modal & Dialog Stacking State
//  Research Basis: ADR-014, Elimination of Arbitrary z-9999 & Multi-Mounts
// ══════════════════════════════════════════════════════════════════

import { create } from 'zustand';
import { NormalizedVocab, NormalizedGrammar } from '../lib/data/dataManager';

export type ModalType =
  | 'detail'
  | 'kana'
  | 'conjugation'
  | 'nuance'
  | 'shortcuts'
  | 'patchNotes'
  | 'kotowaza'
  | 'toolbox'
  | 'catPlacement'
  | 'keigo'
  | 'counters'
  | 'pitch'
  | 'featureGuide'
  | 'reportIssue'
  | 'auth'
  | 'install'
  | 'streakBroken'
  | 'onboarding'
  | 'storageEviction'
  | 'community'
  | 'hvpt'
  | 'badges'
  | 'wordLookup';

export interface ModalPropsMap {
  detail: { item: NormalizedVocab | NormalizedGrammar; type: 'vocab' | 'grammar' };
  kana: Record<string, never>;
  conjugation: { initialVerb?: string };
  nuance: Record<string, never>;
  shortcuts: Record<string, never>;
  patchNotes: Record<string, never>;
  kotowaza: Record<string, never>;
  toolbox: Record<string, never>;
  catPlacement: Record<string, never>;
  keigo: Record<string, never>;
  counters: Record<string, never>;
  pitch: Record<string, never>;
  featureGuide: Record<string, never>;
  reportIssue: {
    itemId?: string;
    itemType?: 'vocab' | 'grammar' | 'quiz' | 'lesson';
    originalJapanese?: string;
    originalTranslation?: string;
  };
  auth: Record<string, never>;
  install: Record<string, never>;
  streakBroken: Record<string, never>;
  onboarding: Record<string, never>;
  storageEviction: { storageUsageMb?: number; storageQuotaMb?: number };
  community: Record<string, never>;
  hvpt: Record<string, never>;
  badges: Record<string, never>;
  wordLookup: { word: string };
}

interface ModalState {
  modalStack: Array<{ type: ModalType; props?: any }>;
  openModal: <T extends ModalType>(type: T, props?: ModalPropsMap[T]) => void;
  closeModal: (type?: ModalType) => void;
  closeAllModals: () => void;
  getActiveModal: () => { type: ModalType; props?: any } | null;
  isModalOpen: (type: ModalType) => boolean;
  getStackDepth: () => number;
}

export const useModalStore = create<ModalState>((set, get) => ({
  modalStack: [],

  openModal: (type, props) => {
    set((state) => {
      const top = state.modalStack[state.modalStack.length - 1];
      if (top && top.type === type) {
        return {
          modalStack: [...state.modalStack.slice(0, -1), { type, props }],
        };
      }
      // Safety cap at 10 to prevent runaway circular stacking
      const nextStack = [...state.modalStack, { type, props }];
      return {
        modalStack: nextStack.length > 10 ? nextStack.slice(-10) : nextStack,
      };
    });
  },

  closeModal: (type?: ModalType) => {
    set((state) => {
      if (!type) {
        return { modalStack: state.modalStack.slice(0, -1) };
      }
      const lastIndex = state.modalStack.map((m) => m.type).lastIndexOf(type);
      if (lastIndex === -1) return state;
      return {
        modalStack: state.modalStack.filter((_, idx) => idx !== lastIndex),
      };
    });
  },

  closeAllModals: () => {
    set({ modalStack: [] });
  },

  getActiveModal: () => {
    const stack = get().modalStack;
    return stack.length > 0 ? stack[stack.length - 1] : null;
  },

  isModalOpen: (type: ModalType) => {
    return get().modalStack.some((m) => m.type === type);
  },

  getStackDepth: () => {
    return get().modalStack.length;
  },
}));
