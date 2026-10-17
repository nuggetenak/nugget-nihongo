// ══════════════════════════════════════════════════════════════════
//  announcer.ts — Accessible Live Region Screen Reader Announcer
//  Dispatches polite and assertive announcements for non-visual learners
//  Complies with WCAG 2.1 Success Criterion 4.1.3 (Status Messages)
// ══════════════════════════════════════════════════════════════════

export type AnnouncementMode = 'polite' | 'assertive';

export interface Announcement {
  id: string;
  message: string;
  mode: AnnouncementMode;
  timestamp: number;
}

type AnnounceListener = (announcement: Announcement) => void;

class ScreenReaderAnnouncer {
  private listeners: Set<AnnounceListener> = new Set();
  private lastMessage: string = '';
  private lastMode: AnnouncementMode = 'polite';
  private counter: number = 0;

  /**
   * Dispatches an audible announcement to screen reader users
   * @param message Text to be spoken
   * @param mode 'polite' (default) queues until idle, 'assertive' interrupts immediately
   */
  public announce(message: string, mode: AnnouncementMode = 'polite'): void {
    if (!message || typeof message !== 'string') return;
    const cleanMessage = message.trim();
    if (!cleanMessage) return;

    this.counter++;
    const announcement: Announcement = {
      id: `a11y-msg-${Date.now()}-${this.counter}`,
      message: cleanMessage,
      mode,
      timestamp: Date.now(),
    };

    this.lastMessage = cleanMessage;
    this.lastMode = mode;

    this.listeners.forEach((listener) => {
      try {
        listener(announcement);
      } catch (err) {
        console.error('[A11yAnnouncer] Listener error:', err);
      }
    });
  }

  /**
   * Subscribe to live announcements
   */
  public subscribe(listener: AnnounceListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getLastMessage(): { message: string; mode: AnnouncementMode } {
    return { message: this.lastMessage, mode: this.lastMode };
  }

  public clear(): void {
    this.lastMessage = '';
    this.listeners.forEach((listener) => {
      listener({
        id: `a11y-clear-${Date.now()}`,
        message: '',
        mode: 'polite',
        timestamp: Date.now(),
      });
    });
  }
}

export const announcer = new ScreenReaderAnnouncer();
