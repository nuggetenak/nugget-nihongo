import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { storageBridge } from './lib/persistence/storageBridge';
import { errorReporter } from './lib/telemetry/errorReporter';
import { webVitals } from './lib/telemetry/webVitals';
import { syncDaemon } from './lib/sync/syncDaemon';
import { migrationRunner } from './lib/persistence/migrationRunner';
import { broadcastSync } from './lib/sync/broadcastSync';
import { diagnostics } from './lib/diagnostics/diagnostics';
import './index.css';

// Initialize Client-Side Telemetry, Web Vitals, Diagnostics & Sync Daemon (Tickets T-97, T-101, T-105, T-215)
diagnostics.init();
errorReporter.init();
webVitals.init();
syncDaemon.start();
broadcastSync.init();

// Disaster Recovery: Schema Migrations (Ticket T-109)
migrationRunner.runMigrations().catch((e) => {
  console.warn('[main] Migration runner notice:', e);
});

// Local-First IndexedDB Migration (Ticket T-66)
storageBridge.migrateFromLocalStorage().catch((e) => {
  console.warn('[main] Background IndexedDB sync notice:', e);
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
