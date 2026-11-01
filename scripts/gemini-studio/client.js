/**
 * Gemini Design Studio Client Overlay (Isolated Shadow DOM Edition)
 * Dev-only interactive UI/UX harness, Alt+Click coordinate inspector, and AST surgical bridge.
 */

(function initGeminiStudioLoader() {
  function bootstrap() {
    if (window.__GEMINI_STUDIO_INITIALIZED__) return;
    window.__GEMINI_STUDIO_INITIALIZED__ = true;

    // 1. Bypass & Unregister PWA Service Worker in dev mode (Directive 2)
    if (typeof navigator !== 'undefined' && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
          registration.unregister();
          console.log('[Gemini Studio] Dev mode: uninstalled active Service Worker');
        }
      }).catch(() => {});
    }

    // 2. Local Studio State
    let isStudioOpen = false;
    let activeViewport = '100%';
    let isSafeAreaActive = false;
    let isTouchAuditActive = false;
    let isScenariosOpen = false;
    let selectedElement = null;
    let selectedLoc = null;
    let targetQueue = [];

    // 3. Inject global light-DOM styles for canvas borders & element outlines
    const lightDomStyle = document.createElement('style');
    lightDomStyle.id = 'gemini-studio-light-styles';
    lightDomStyle.textContent = `
      [data-ag-selected="true"] {
        outline: 2px solid #F59E0B !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 15px rgba(245, 158, 11, 0.5) !important;
      }
      [data-ag-touch-fail="true"] {
        outline: 2px dashed #EF4444 !important;
        outline-offset: 1px !important;
      }
      .gs-device-mode-active body {
        background-color: #080A0E !important;
        margin: 0 !important;
        padding: 58px 0 20px 0 !important;
        overflow-y: auto !important;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 100vh;
      }
      .gs-notch {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 140px;
        height: 26px;
        background: #282D3C;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
      .gs-camera-lens {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #0F1117;
        margin-left: 20px;
      }
      .gs-home-bar {
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 4px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.5);
        z-index: 9999;
        pointer-events: none;
      }
    `;
    document.head.appendChild(lightDomStyle);

    // 4. Create Host Element & Isolated Shadow DOM (Directive 1)
    const shadowHost = document.createElement('div');
    shadowHost.id = 'gemini-studio-root';
    shadowHost.style.cssText = 'position: fixed; inset: 0; pointer-events: none; z-index: 2147483647;';
    (document.documentElement || document.body).appendChild(shadowHost);

    const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

    // 5. Encapsulated Styles inside Shadow DOM
    const shadowStyle = document.createElement('style');
    shadowStyle.textContent = `
      :host {
        all: initial;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      * {
        box-sizing: border-box;
      }
      /* Floating Launcher Pill - Positioned above BottomNav (Directive 3) */
      #gemini-studio-launcher {
        position: fixed;
        bottom: 84px;
        right: 16px;
        z-index: 2147483647;
        pointer-events: auto !important;
        background: linear-gradient(135deg, #1E222D 0%, #161922 100%);
        color: #F8FAFC;
        border: 1.5px solid #F59E0B;
        border-radius: 9999px;
        padding: 10px 18px;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.02em;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(245, 158, 11, 0.4);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        user-select: none;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }
      #gemini-studio-launcher:hover {
        transform: translateY(-2px) scale(1.03);
        box-shadow: 0 14px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.6);
      }
      .pulse-dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background-color: #F59E0B;
        box-shadow: 0 0 10px #F59E0B;
        animation: gs-pulse 2s infinite;
      }
      @keyframes gs-pulse {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.8); }
        70% { transform: scale(1.15); box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
      }

      /* Top Master Studio Bar */
      #gemini-studio-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 48px;
        background: rgba(15, 17, 23, 0.96);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        z-index: 2147483647;
        pointer-events: auto !important;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        color: #F8FAFC;
        font-size: 12px;
        user-select: none;
      }
      .gs-cluster {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .gs-brand {
        font-weight: 700;
        font-size: 13px;
        color: #F59E0B;
        display: flex;
        align-items: center;
        gap: 6px;
        margin-right: 8px;
      }
      .gs-btn {
        background: #1E222D;
        color: #F8FAFC;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 6px;
        padding: 5px 10px;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        transition: all 0.15s ease;
      }
      .gs-btn:hover {
        background: #282D3C;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .gs-btn.active {
        background: rgba(245, 158, 11, 0.2);
        border-color: #F59E0B;
        color: #F59E0B;
      }

      /* Floating Inspector Drawer */
      #gemini-studio-inspector {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 440px;
        max-width: calc(100vw - 48px);
        max-height: 560px;
        background: #161922;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 14px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0,0,0,0.5);
        z-index: 2147483647;
        pointer-events: auto !important;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        color: #F8FAFC;
        animation: gs-slide-up 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @keyframes gs-slide-up {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .gs-drawer-header {
        padding: 12px 16px;
        background: #1E222D;
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .gs-loc-tag {
        font-family: monospace;
        font-size: 11px;
        color: #F59E0B;
        background: rgba(245, 158, 11, 0.12);
        padding: 2px 8px;
        border-radius: 4px;
        border: 1px solid rgba(245, 158, 11, 0.35);
      }
      .gs-drawer-body {
        padding: 16px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .gs-input-label {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: rgba(241, 245, 249, 0.65);
      }
      .gs-textarea, .gs-input {
        width: 100%;
        background: #0F1117;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 6px;
        padding: 8px 10px;
        color: #F8FAFC;
        font-family: monospace;
        font-size: 12px;
      }
      .gs-textarea:focus, .gs-input:focus {
        outline: none;
        border-color: #F59E0B;
      }

      /* Preset Scenarios Drawer */
      #gemini-studio-scenarios {
        position: fixed;
        top: 58px;
        left: 16px;
        width: 330px;
        background: #161922;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 12px;
        box-shadow: 0 15px 45px rgba(0, 0, 0, 0.7);
        z-index: 2147483647;
        pointer-events: auto !important;
        padding: 16px;
        color: #F8FAFC;
        font-size: 12px;
      }
      .gs-scenario-card {
        background: #1E222D;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 10px;
        margin-bottom: 8px;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .gs-scenario-card:hover {
        background: #282D3C;
        border-color: #F59E0B;
      }
      .gs-scenario-card h4 {
        margin: 0 0 4px 0;
        font-size: 12px;
        color: #F8FAFC;
      }
      .gs-scenario-card p {
        margin: 0;
        font-size: 11px;
        color: rgba(241, 245, 249, 0.65);
      }

      /* Config Modal */
      #gemini-studio-settings {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 390px;
        background: #161922;
        border: 1.5px solid #F59E0B;
        border-radius: 14px;
        box-shadow: 0 25px 75px rgba(0,0,0,0.9);
        z-index: 2147483647;
        pointer-events: auto !important;
        padding: 20px;
        color: #F8FAFC;
      }

      /* Toast */
      #gs-toast {
        position: fixed;
        top: 60px;
        right: 24px;
        z-index: 2147483647;
        pointer-events: auto !important;
        background: #1E222D;
        color: #F8FAFC;
        border: 1px solid #F59E0B;
        border-radius: 8px;
        padding: 10px 16px;
        font-size: 12px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        animation: gs-slide-up 0.15s ease;
      }
    `;
    shadowRoot.appendChild(shadowStyle);

    // Toast helper
    function showToast(message, isError = false) {
      const existing = shadowRoot.getElementById('gs-toast');
      if (existing) existing.remove();

      const toast = document.createElement('div');
      toast.id = 'gs-toast';
      if (isError) {
        toast.style.background = '#DC2626';
        toast.style.borderColor = '#EF4444';
      }
      toast.textContent = message;
      shadowRoot.appendChild(toast);
      setTimeout(() => { toast.remove(); }, 3500);
    }

    // 6. Build UI inside Shadow Root
    // Launcher Pill
    const launcher = document.createElement('div');
    launcher.id = 'gemini-studio-launcher';
    launcher.innerHTML = `
      <span class="pulse-dot"></span>
      <span>✨ Gemini Studio</span>
    `;
    shadowRoot.appendChild(launcher);

    // Master Studio Bar
    const studioBar = document.createElement('div');
    studioBar.id = 'gemini-studio-bar';
    studioBar.style.display = 'none';
    studioBar.innerHTML = `
      <div class="gs-cluster">
        <span class="gs-brand">✨ Gemini Studio</span>
        <div style="height: 16px; width: 1px; background: rgba(255,255,255,0.15); margin: 0 4px;"></div>
        <button class="gs-btn active" data-vp="100%">🖥️ Fluid Desktop</button>
        <button class="gs-btn" data-vp="768px">📱 Tablet (768px)</button>
        <button class="gs-btn" data-vp="390px">📱 Mobile (390px)</button>
        <button class="gs-btn" data-vp="375px">📱 SE (375px)</button>
      </div>

      <div class="gs-cluster">
        <button class="gs-btn" id="gs-btn-batch-queue" style="display:none; background: #F59E0B; color: #0F1117; font-weight: 700; border: none; padding: 5px 12px; border-radius: 6px; box-shadow: 0 0 12px rgba(245, 158, 11, 0.4);" title="Kirim semua antrean revisi ke Antigravity">
          🚀 Kirim Antrean (<span id="gs-queue-count">0</span>)
        </button>
        <button class="gs-btn" id="gs-btn-clear-queue" style="display:none; color: #94A3B8; font-size: 11px; padding: 5px 8px;" title="Kosongkan antrean revisi">
          🗑️ Reset
        </button>
        <span style="font-size: 11px; color: #10B981; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); padding: 3px 8px; border-radius: 9999px; font-weight: 600; display: inline-flex; align-items: center; gap: 5px;">
          <span style="width: 6px; height: 6px; border-radius: 50%; background: #10B981; box-shadow: 0 0 6px #10B981;"></span>
          Antigravity Pairing (0 API Key)
        </span>
        <div style="height: 16px; width: 1px; background: rgba(255,255,255,0.15); margin: 0 2px;"></div>
        <button class="gs-btn" id="gs-btn-safe-area" title="Toggle iOS Notch and Safe Area overlay">🛡️ Safe Area</button>
        <button class="gs-btn" id="gs-btn-touch-audit" title="Highlight touch targets smaller than 44x44px">🎯 Touch &lt;44px</button>
        <button class="gs-btn" id="gs-btn-theme" title="Toggle Dark/Light Mode">🌓 Theme</button>
        <button class="gs-btn" id="gs-btn-scenarios" title="Open Preset Scenarios Drawer">⚡ Scenarios</button>
        <button class="gs-btn" id="gs-btn-undo" title="Revert last code mutation">↩ Undo</button>
        <button class="gs-btn" id="gs-btn-close" style="color: #F87171;" title="Close Studio">✕</button>
      </div>
    `;
    shadowRoot.appendChild(studioBar);

    // Scenarios Drawer
    const scenariosDrawer = document.createElement('div');
    scenariosDrawer.id = 'gemini-studio-scenarios';
    scenariosDrawer.style.display = 'none';
    scenariosDrawer.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <strong style="color:#F59E0B;">⚡ Preset Learner Scenarios</strong>
        <button class="gs-btn" id="gs-close-scenarios" style="padding:2px 6px;">✕</button>
      </div>

      <div class="gs-scenario-card" data-scenario="new-learner">
        <h4>🌱 Scenario 1: New Learner</h4>
        <p>Day 1, 0 XP, 0 Streak, 0 Due Reviews, Empty Garden seedling.</p>
      </div>

      <div class="gs-scenario-card" data-scenario="active-learner">
        <h4>🔥 Scenario 2: Active Daily Learner</h4>
        <p>14-Day Streak, 450 XP, 18 Cards Due, 4 Water Drops, mature garden.</p>
      </div>

      <div class="gs-scenario-card" data-scenario="offline-sync">
        <h4>📡 Scenario 3: Offline Sync Pending</h4>
        <p>Network offline, 6 dirty reviews in queue, amber sync status pill.</p>
      </div>

      <div class="gs-scenario-card" data-scenario="all-clear">
        <h4>🎉 Scenario 4: All Clear / Zero State</h4>
        <p>0 cards due, 100% retrievability, all plants watered.</p>
      </div>

      <div style="margin-top:14px; border-top:1px solid rgba(255,255,255,0.12); padding-top:10px;">
        <span class="gs-input-label">Simulate XP: <span id="gs-xp-val" style="color:#F59E0B;">450</span></span>
        <input type="range" id="gs-slider-xp" min="0" max="2500" value="450" style="width:100%; margin:4px 0 8px 0;">
        
        <span class="gs-input-label">Simulate Streak: <span id="gs-streak-val" style="color:#F59E0B;">14</span> Hari</span>
        <input type="range" id="gs-slider-streak" min="0" max="100" value="14" style="width:100%; margin:4px 0;">
      </div>
    `;
    shadowRoot.appendChild(scenariosDrawer);

    // Inspector Drawer
    const inspector = document.createElement('div');
    inspector.id = 'gemini-studio-inspector';
    inspector.style.display = 'none';
    inspector.innerHTML = `
      <div class="gs-drawer-header">
        <div style="display:flex; align-items:center; gap:8px; overflow:hidden;">
          <span style="font-size:13px;">🔍</span>
          <span class="gs-loc-tag" id="gs-target-loc">src/App.tsx:1:1</span>
        </div>
        <button class="gs-btn" id="gs-close-inspector" style="padding:2px 6px;">✕</button>
      </div>
      <div class="gs-drawer-body">
        <!-- Direct Antigravity Bridge (No External API Key Required) -->
        <div style="background: rgba(245, 158, 11, 0.08); border: 1.5px solid #F59E0B; border-radius: 10px; padding: 12px; margin-bottom: 10px;">
          <label class="gs-input-label" style="color: #F59E0B; margin-bottom: 6px; display: block;">
            📝 Instruksi Perubahan UI / UX:
          </label>
          <textarea id="gs-user-instruction" class="gs-textarea" rows="2" placeholder="Ketik apa yang mau diubah (misal: ganti warna teks, ubah tombol jadi besar, perbaiki layout mobile...)" style="margin-bottom: 8px;"></textarea>
          
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <button class="gs-btn active" id="gs-btn-queue-target" style="flex: 1; justify-content: center; padding: 10px 8px; font-size: 12px; font-weight: 700; background: #3B82F6; color: #FFFFFF; border: none; border-radius: 6px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35); cursor: pointer;" title="Tambahkan titik ini ke antrean revisi agar bisa dikerjakan sekaligus">
              ➕ Tambah ke Antrean
            </button>
            <button class="gs-btn active" id="gs-btn-lock-target" style="flex: 1; justify-content: center; padding: 10px 8px; font-size: 12px; font-weight: 700; background: #F59E0B; color: #0F1117; border: none; border-radius: 6px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35); cursor: pointer;" title="Kunci titik ini sekarang juga (1 target langsung)">
              🎯 Kunci 1 Titik Ini
            </button>
          </div>
          
          <div style="font-size: 11px; color: rgba(241, 245, 249, 0.75); margin-top: 4px; line-height: 1.4;">
            💡 <strong>Multi-Titik Batch Mode:</strong> Klik <code>➕ Tambah ke Antrean</code> lalu surf ke komponen lain. Setelah selesai, klik <code>🚀 Kirim Antrean</code> di bar atas untuk memproses semuanya sekaligus dalam 1 turn hemat token!
          </div>
          <div id="gs-lock-feedback" style="display: none; margin-top: 8px; padding: 8px; border-radius: 6px; font-size: 11px;"></div>
        </div>

        <!-- 0ms In-Memory Tailwind Editor -->
        <div>
          <label class="gs-input-label">⚡ 0ms Live Tailwind Editor (In-Memory Preview):</label>
          <textarea id="gs-class-input" class="gs-textarea" rows="3" placeholder="p-4 bg-surface text-appText ..."></textarea>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
            <span style="font-size: 10px; color: rgba(241, 245, 249, 0.6);">Preview 60 FPS di memori</span>
            <button class="gs-btn active" id="gs-btn-save-class" style="font-size: 11px; font-weight: 600;">💾 Simpan ke Code (0 Token)</button>
          </div>
        </div>
      </div>
    `;
    shadowRoot.appendChild(inspector);

    // 7. Toggle Studio Master View
    function toggleStudio() {
      isStudioOpen = !isStudioOpen;
      studioBar.style.display = isStudioOpen ? 'flex' : 'none';
      launcher.style.display = isStudioOpen ? 'none' : 'flex';
      document.body.style.paddingTop = isStudioOpen ? '48px' : '0';

      if (isStudioOpen) {
        showToast('✨ Gemini Studio aktif! Tekan Alt+Click pada elemen apa saja.');
      } else {
        setViewport('100%');
        inspector.style.display = 'none';
        scenariosDrawer.style.display = 'none';
      }
    }

    launcher.addEventListener('click', toggleStudio);
    shadowRoot.getElementById('gs-btn-close').addEventListener('click', toggleStudio);

    // 8. Fail-Safe Keyboard Shortcut: Alt + S or Ctrl + Shift + G (Directive 3)
    window.addEventListener('keydown', (e) => {
      if ((e.altKey && e.key.toLowerCase() === 's') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'g')) {
        e.preventDefault();
        toggleStudio();
      }
    });

    // 9. Viewport Switcher
    function setViewport(width) {
      activeViewport = width;
      const rootEl = document.getElementById('root') || document.body;

      studioBar.querySelectorAll('[data-vp]').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-vp') === width);
      });

      if (width === '100%') {
        document.documentElement.classList.remove('gs-device-mode-active');
        rootEl.style.maxWidth = '';
        rootEl.style.margin = '';
        rootEl.style.borderRadius = '';
        rootEl.style.boxShadow = '';
        rootEl.style.border = '';
        removeOverlays();
      } else {
        document.documentElement.classList.add('gs-device-mode-active');
        rootEl.style.maxWidth = width;
        rootEl.style.margin = '20px auto';
        rootEl.style.borderRadius = '28px';
        rootEl.style.boxShadow = '0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)';
        rootEl.style.overflow = 'hidden';
        rootEl.style.transition = 'max-width 0.25s ease';
        if (isSafeAreaActive) renderSafeAreaNotch();
      }
    }

    studioBar.querySelectorAll('[data-vp]').forEach(btn => {
      btn.addEventListener('click', () => {
        setViewport(btn.getAttribute('data-vp'));
      });
    });

    // Safe Area Notch Overlay
    function renderSafeAreaNotch() {
      removeOverlays();
      if (activeViewport === '100%') return;

      const rootEl = document.getElementById('root') || document.body;
      rootEl.style.position = 'relative';

      const notch = document.createElement('div');
      notch.className = 'gs-notch';
      notch.id = 'gs-notch-el';
      notch.innerHTML = '<span class="gs-camera-lens"></span>';
      rootEl.prepend(notch);

      const homeBar = document.createElement('div');
      homeBar.className = 'gs-home-bar';
      homeBar.id = 'gs-home-bar-el';
      rootEl.appendChild(homeBar);
    }

    function removeOverlays() {
      const notch = document.getElementById('gs-notch-el');
      if (notch) notch.remove();
      const homeBar = document.getElementById('gs-home-bar-el');
      if (homeBar) homeBar.remove();
    }

    shadowRoot.getElementById('gs-btn-safe-area').addEventListener('click', (e) => {
      isSafeAreaActive = !isSafeAreaActive;
      e.currentTarget.classList.toggle('active', isSafeAreaActive);
      if (isSafeAreaActive) {
        renderSafeAreaNotch();
        showToast('🛡️ iOS Safe Area notch & bottom bar diaktifkan');
      } else {
        removeOverlays();
        showToast('Safe Area dinonaktifkan');
      }
    });

    // Touch Target Highlighter (<44px)
    shadowRoot.getElementById('gs-btn-touch-audit').addEventListener('click', (e) => {
      isTouchAuditActive = !isTouchAuditActive;
      e.currentTarget.classList.toggle('active', isTouchAuditActive);

      const interactiveSelectors = 'button, a, input, select, textarea, [role="button"]';
      const elements = document.querySelectorAll(interactiveSelectors);

      if (isTouchAuditActive) {
        let failCount = 0;
        elements.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
            el.setAttribute('data-ag-touch-fail', 'true');
            failCount++;
          }
        });
        showToast(`🎯 Ditemukan ${failCount} elemen interaktif < 44x44px`);
      } else {
        elements.forEach(el => el.removeAttribute('data-ag-touch-fail'));
      }
    });

    // Theme Switcher
    shadowRoot.getElementById('gs-btn-theme').addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light');
      showToast(`🌓 Mode tema: ${isLight ? 'Light (Ivory)' : 'Dark (Obsidian)'}`);
    });

    // Preset Scenarios
    const scenariosBtn = shadowRoot.getElementById('gs-btn-scenarios');
    scenariosBtn.addEventListener('click', () => {
      isScenariosOpen = !isScenariosOpen;
      scenariosDrawer.style.display = isScenariosOpen ? 'block' : 'none';
    });
    shadowRoot.getElementById('gs-close-scenarios').addEventListener('click', () => {
      isScenariosOpen = false;
      scenariosDrawer.style.display = 'none';
    });

    scenariosDrawer.querySelectorAll('[data-scenario]').forEach(card => {
      card.addEventListener('click', () => {
        const scenario = card.getAttribute('data-scenario');
        const xpSlider = shadowRoot.getElementById('gs-slider-xp');
        const streakSlider = shadowRoot.getElementById('gs-slider-streak');

        if (scenario === 'new-learner') {
          xpSlider.value = 0;
          streakSlider.value = 0;
          showToast('🌱 Scenario 1: New Learner (Day 1, 0 XP)');
        } else if (scenario === 'active-learner') {
          xpSlider.value = 450;
          streakSlider.value = 14;
          showToast('🔥 Scenario 2: Active Learner (14 Streak, 450 XP)');
        } else if (scenario === 'offline-sync') {
          window.dispatchEvent(new Event('offline'));
          showToast('📡 Scenario 3: Offline Mode & Pending Sync');
        } else if (scenario === 'all-clear') {
          xpSlider.value = 1200;
          streakSlider.value = 30;
          showToast('🎉 Scenario 4: All Clear & Garden Bloomed');
        }

        shadowRoot.getElementById('gs-xp-val').textContent = xpSlider.value;
        shadowRoot.getElementById('gs-streak-val').textContent = streakSlider.value;
      });
    });

    shadowRoot.getElementById('gs-slider-xp').addEventListener('input', (e) => {
      shadowRoot.getElementById('gs-xp-val').textContent = e.target.value;
    });
    shadowRoot.getElementById('gs-slider-streak').addEventListener('input', (e) => {
      shadowRoot.getElementById('gs-streak-val').textContent = e.target.value;
    });

    // Undo Handler
    shadowRoot.getElementById('gs-btn-undo').addEventListener('click', async () => {
      try {
        const res = await fetch('/__gemini_studio__/undo', { method: 'POST' });
        const data = await res.json();
        if (data.success) {
          showToast(`↩ Berhasil mengembalikan: ${data.restoredFile}`);
        } else {
          showToast(data.message || 'Undo stack kosong', true);
        }
      } catch (err) {
        showToast(`Undo error: ${err.message}`, true);
      }
    });

    // 10. Alt+Click Inspector Interceptor
    window.addEventListener('click', (e) => {
      // Check composedPath to ignore clicks originating inside our Shadow Host
      if (e.composedPath && e.composedPath().includes(shadowHost)) {
        return;
      }

      if (!isStudioOpen) return;

      if (e.altKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();

        const target = e.target.closest('[data-ag-loc]');
        if (!target) {
          showToast('⚠️ Elemen ini tidak memiliki koordinat data-ag-loc.', true);
          return;
        }

        if (selectedElement) {
          selectedElement.removeAttribute('data-ag-selected');
        }

        selectedElement = target;
        selectedLoc = target.getAttribute('data-ag-loc');
        selectedElement.setAttribute('data-ag-selected', 'true');

        shadowRoot.getElementById('gs-target-loc').textContent = selectedLoc;
        const classInput = shadowRoot.getElementById('gs-class-input');
        classInput.value = selectedElement.className || '';
        const instructionInput = shadowRoot.getElementById('gs-user-instruction');
        if (instructionInput) instructionInput.value = '';
        const feedback = shadowRoot.getElementById('gs-lock-feedback');
        if (feedback) feedback.style.display = 'none';

        inspector.style.display = 'flex';
      }
    }, true);

    shadowRoot.getElementById('gs-close-inspector').addEventListener('click', () => {
      if (selectedElement) selectedElement.removeAttribute('data-ag-selected');
      inspector.style.display = 'none';
    });

    // 📋 Batch Queue State Manager
    function updateQueueBadge() {
      const batchBtn = shadowRoot.getElementById('gs-btn-batch-queue');
      const clearBtn = shadowRoot.getElementById('gs-btn-clear-queue');
      const countEl = shadowRoot.getElementById('gs-queue-count');
      if (countEl) countEl.textContent = targetQueue.length;
      if (batchBtn && clearBtn) {
        if (targetQueue.length > 0) {
          batchBtn.style.display = 'inline-flex';
          clearBtn.style.display = 'inline-flex';
        } else {
          batchBtn.style.display = 'none';
          clearBtn.style.display = 'none';
        }
      }
    }

    // ➕ Add to Queue Handler
    const queueBtn = shadowRoot.getElementById('gs-btn-queue-target');
    if (queueBtn) {
      queueBtn.addEventListener('click', () => {
        if (!selectedLoc) return;

        const instructionInput = shadowRoot.getElementById('gs-user-instruction');
        const userInstruction = instructionInput ? instructionInput.value.trim() : '';

        const existingIdx = targetQueue.findIndex(item => item.loc === selectedLoc);
        if (existingIdx >= 0) {
          targetQueue[existingIdx] = {
            loc: selectedLoc,
            currentStyles: selectedElement?.className || '',
            userInstruction: userInstruction || 'Terapkan perbaikan sesuai instruksi.'
          };
        } else {
          targetQueue.push({
            loc: selectedLoc,
            currentStyles: selectedElement?.className || '',
            userInstruction: userInstruction || 'Terapkan perbaikan sesuai instruksi.'
          });
        }

        updateQueueBadge();
        showToast(`➕ Ditambahkan ke antrean! (Total: ${targetQueue.length} target). Surf ke titik lain atau klik '🚀 Kirim Antrean' di bar atas.`);

        if (selectedElement) {
          selectedElement.removeAttribute('data-ag-selected');
          selectedElement = null;
        }
        inspector.style.display = 'none';
      });
    }

    // 🚀 Send Batch Queue to Antigravity Handler
    const batchSendBtn = shadowRoot.getElementById('gs-btn-batch-queue');
    if (batchSendBtn) {
      batchSendBtn.addEventListener('click', async () => {
        if (targetQueue.length === 0) return;

        showToast(`⏳ Mengompilasi ${targetQueue.length} target ke .agents/active-ui-target.md...`);
        try {
          const res = await fetch('/__gemini_studio__/lock-target', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ batch: targetQueue })
          });

          const data = await res.json();
          if (data.success) {
            const trigger = data.triggerText || `Baca .agents/active-ui-target.md lalu kerjakan seluruh ${targetQueue.length} antrean revisi UI tersebut.`;

            try {
              if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(trigger);
              } else {
                const ta = document.createElement('textarea');
                ta.value = trigger;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                ta.remove();
              }
            } catch (clipErr) {
              console.warn('Clipboard write notice:', clipErr);
            }

            showToast(`🚀 ${targetQueue.length} target berhasil dikompilasi! Tekan Ctrl+V di chat Antigravity.`);
            targetQueue = [];
            updateQueueBadge();
          } else {
            showToast(`Gagal mengirim antrean: ${data.error}`, true);
          }
        } catch (err) {
          showToast(`Error: ${err.message}`, true);
        }
      });
    }

    // 🗑️ Clear Batch Queue Handler
    const clearBtn = shadowRoot.getElementById('gs-btn-clear-queue');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        targetQueue = [];
        updateQueueBadge();
        showToast('🗑️ Antrean revisi telah dikosongkan.');
      });
    }

    // 🎯 Antigravity Direct Target Lock Handler (No API Key Required)
    shadowRoot.getElementById('gs-btn-lock-target').addEventListener('click', async () => {
      if (!selectedLoc) return;

      const instructionInput = shadowRoot.getElementById('gs-user-instruction');
      const userInstruction = instructionInput ? instructionInput.value.trim() : '';

      const feedback = shadowRoot.getElementById('gs-lock-feedback');
      feedback.style.display = 'block';
      feedback.style.background = 'rgba(245, 158, 11, 0.15)';
      feedback.style.border = '1px solid #F59E0B';
      feedback.style.color = '#FBBF24';
      feedback.textContent = '⏳ Mengunci target & instruksi ke Antigravity...';

      try {
        const res = await fetch('/__gemini_studio__/lock-target', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            loc: selectedLoc,
            currentStyles: selectedElement?.className || '',
            userInstruction
          })
        });

        const data = await res.json();
        if (data.success) {
          const trigger = data.triggerText || (userInstruction
            ? `Baca .agents/active-ui-target.md lalu terapkan instruksi: "${userInstruction}"`
            : 'Baca .agents/active-ui-target.md lalu ');

          // Copy to clipboard
          try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              await navigator.clipboard.writeText(trigger);
            } else {
              const ta = document.createElement('textarea');
              ta.value = trigger;
              document.body.appendChild(ta);
              ta.select();
              document.execCommand('copy');
              ta.remove();
            }
          } catch (clipErr) {
            console.warn('Clipboard write notice:', clipErr);
          }

          feedback.style.background = 'rgba(16, 185, 129, 0.15)';
          feedback.style.border = '1px solid #10B981';
          feedback.style.color = '#34D399';
          feedback.innerHTML = `✅ <strong>Target & Instruksi Terkunci!</strong> Disalin ke clipboard:<br><code style="color:#FBBF24; font-size:11px; word-break:break-all;">${trigger}</code><br><span style="font-size:10px; color:rgba(241,245,249,0.7);">Buka chat Antigravity sekarang dan tekan <strong>Ctrl+V</strong> lalu Enter!</span>`;

          showToast('🎯 Target terkunci & prompt disalin! Tekan Ctrl+V di chat Antigravity.');
        } else {
          feedback.style.color = '#F87171';
          feedback.textContent = `❌ Gagal mengunci target: ${data.error}`;
        }
      } catch (err) {
        feedback.style.color = '#F87171';
        feedback.textContent = `❌ Error: ${err.message}`;
      }
    });

    // 0ms Optimistic Tailwind Class Mutator
    const classInput = shadowRoot.getElementById('gs-class-input');
    classInput.addEventListener('input', (e) => {
      if (selectedElement) {
        selectedElement.className = e.target.value;
      }
    });

    // Save Class directly to Disk (0 AI Tokens)
    shadowRoot.getElementById('gs-btn-save-class').addEventListener('click', async () => {
      if (!selectedLoc || !selectedElement) return;

      try {
        const res = await fetch('/__gemini_studio__/patch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: 'class',
            loc: selectedLoc,
            newClasses: classInput.value
          })
        });

        const data = await res.json();
        if (data.success) {
          showToast('💾 Class berhasil disimpan langsung ke disk! (0 AI token)');
        } else {
          showToast(`Gagal menyimpan: ${data.error}`, true);
        }
      } catch (err) {
        showToast(`Error: ${err.message}`, true);
      }
    });

    console.log('[Gemini Studio] Shadow DOM overlay successfully initialized.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
