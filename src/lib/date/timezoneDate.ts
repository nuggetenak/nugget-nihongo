// ══════════════════════════════════════════════════════════════════
//  timezoneDate.ts — Localized Timezone Date Utilities (WIB/WITA/WIT/JST)
//  Standardized date computation across Streak, Heatmap, and Anti-Cheat
// ══════════════════════════════════════════════════════════════════

/**
 * Returns YYYY-MM-DD in the learner's actual local timezone (WIB/WITA/WIT/JST)
 */
export function getLocalDateString(
  date: Date = new Date(),
  timeZone: string = (typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Asia/Jakarta')
): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

/**
 * Returns yesterday's YYYY-MM-DD in the learner's local timezone
 */
export function getLocalYesterdayString(
  date: Date = new Date(),
  timeZone?: string
): string {
  const yesterday = new Date(date.getTime() - 86400000);
  return getLocalDateString(yesterday, timeZone);
}
