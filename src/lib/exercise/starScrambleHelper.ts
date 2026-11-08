// ══════════════════════════════════════════════════════════════════
//  starScrambleHelper.ts — Pure State Transformation Engine
//  for JLPT Mondai 2 Star Scramble (文の組み立て / Susun Kalimat)
// ══════════════════════════════════════════════════════════════════

export interface StarScrambleState {
  availableTokens: string[];
  slottedTokens: (string | null)[];
  starPosition: number; // 1-based (1..4)
  selectedOptionIndex?: number;
}

/**
 * Finds the index of the multiple-choice option matching the token placed at the star slot
 */
export function findMatchingOptionIndex(starToken: string | null | undefined, options: string[]): number {
  if (!starToken || !Array.isArray(options) || options.length === 0) return -1;
  const cleanStar = starToken.trim();

  // 1. Exact match
  const exactIdx = options.findIndex((opt) => opt && opt.trim() === cleanStar);
  if (exactIdx !== -1) return exactIdx;

  // 2. Substring containment match (e.g. furigana or punctuation variance)
  return options.findIndex(
    (opt) => opt && (cleanStar.includes(opt.trim()) || opt.trim().includes(cleanStar))
  );
}

/**
 * Taps an available token to place it into the first empty slot
 */
export function slotAvailableToken(
  availableTokens: string[],
  slottedTokens: (string | null)[],
  tokenIdx: number
): {
  availableTokens: string[];
  slottedTokens: (string | null)[];
  slottedIndex: number;
} {
  if (!Array.isArray(availableTokens) || tokenIdx < 0 || tokenIdx >= availableTokens.length) {
    return { availableTokens: availableTokens || [], slottedTokens: slottedTokens || [null, null, null, null], slottedIndex: -1 };
  }

  const slots = Array.isArray(slottedTokens) ? [...slottedTokens] : [null, null, null, null];
  const firstEmptyIdx = slots.findIndex((s) => s === null);
  if (firstEmptyIdx === -1) {
    return { availableTokens, slottedTokens: slots, slottedIndex: -1 };
  }

  const token = availableTokens[tokenIdx];
  slots[firstEmptyIdx] = token;
  const newAvailable = availableTokens.filter((_, idx) => idx !== tokenIdx);

  return {
    availableTokens: newAvailable,
    slottedTokens: slots,
    slottedIndex: firstEmptyIdx,
  };
}

/**
 * Taps a filled slot to unslot it and return the token to the available bank
 */
export function unslotToken(
  availableTokens: string[],
  slottedTokens: (string | null)[],
  slotIdx: number
): {
  availableTokens: string[];
  slottedTokens: (string | null)[];
  returnedToken: string | null;
} {
  const slots = Array.isArray(slottedTokens) ? [...slottedTokens] : [null, null, null, null];
  if (slotIdx < 0 || slotIdx >= slots.length || slots[slotIdx] === null) {
    return { availableTokens: availableTokens || [], slottedTokens: slots, returnedToken: null };
  }

  const token = slots[slotIdx]!;
  slots[slotIdx] = null;
  const newAvailable = Array.isArray(availableTokens) ? [...availableTokens, token] : [token];

  return {
    availableTokens: newAvailable,
    slottedTokens: slots,
    returnedToken: token,
  };
}

/**
 * Resets all 4 slots back to available bank
 */
export function resetScrambleState(originalTokens: string[]): {
  availableTokens: string[];
  slottedTokens: (string | null)[];
} {
  return {
    availableTokens: Array.isArray(originalTokens) ? [...originalTokens] : [],
    slottedTokens: [null, null, null, null],
  };
}
