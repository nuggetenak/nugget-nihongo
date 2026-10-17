// ══════════════════════════════════════════════════════════════════
//  A11yAnnouncer.tsx — Accessible Live Region Screen Reader Container
//  Renders dual polite & assertive aria-live regions
// ══════════════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react';
import { announcer, Announcement } from '../../lib/a11y/announcer';

export const A11yAnnouncer: React.FC = () => {
  const [politeMessage, setPoliteMessage] = useState<string>('');
  const [assertiveMessage, setAssertiveMessage] = useState<string>('');

  useEffect(() => {
    const unsubscribe = announcer.subscribe((announcement: Announcement) => {
      if (announcement.mode === 'assertive') {
        // Clear briefly then set to force screen reader re-announcement
        setAssertiveMessage('');
        setTimeout(() => setAssertiveMessage(announcement.message), 50);
      } else {
        setPoliteMessage('');
        setTimeout(() => setPoliteMessage(announcement.message), 50);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      id="a11y-announcer-portal"
      className="sr-only"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}
    >
      {/* Polite announcements: non-interrupting status updates (e.g., page navigation, filter changes) */}
      <div
        id="a11y-polite-region"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {politeMessage}
      </div>

      {/* Assertive announcements: urgent alerts (e.g., quiz evaluation, timer warnings) */}
      <div
        id="a11y-assertive-region"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        {assertiveMessage}
      </div>
    </div>
  );
};
