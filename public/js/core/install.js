// ══════════════════════════════════════
//  core/install.js — PWA install modal, SW registration, offline badge
//
//  Exports (window.*):
//    showInstallModal()
//    hideInstallModal()
//    switchOS(os, btn)
//    triggerInstall()
// ══════════════════════════════════════

let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  const note = document.getElementById('directInstallNote');
  if (note) note.textContent = 'Browser kamu mendukung install langsung!';
});

window.showInstallModal = function() {
  document.getElementById('installOverlay').style.display = 'flex';
};
window.hideInstallModal = function() {
  document.getElementById('installOverlay').style.display = 'none';
};
window.switchOS = function(os, btn) {
  document.querySelectorAll('.os-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.install-steps').forEach(s => s.classList.remove('active'));
  document.getElementById('steps-' + os).classList.add('active');
};
window.triggerInstall = async function() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;
  deferredPrompt = null;
};

function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('./sw.js').then(reg => {
    // Check for updates periodically
    reg.addEventListener('updatefound', () => {
      const newWorker = reg.installing;
      if (!newWorker) return;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'activated' && navigator.serviceWorker.controller) {
          showUpdateBanner();
        }
      });
    });
  }).catch(() => {});
}

function showUpdateBanner() {
  // Don't show if already visible
  if (document.getElementById('updateBanner')) return;
  const banner = document.createElement('div');
  banner.id = 'updateBanner';
  banner.innerHTML = '<span>Versi baru tersedia!</span><button onclick="location.reload()">Refresh</button><button onclick="this.parentElement.remove()" style="background:none;color:inherit;border:none;font-size:1.2em;cursor:pointer">&times;</button>';
  banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#2563eb;color:#fff;padding:12px 16px;display:flex;align-items:center;gap:12px;z-index:9999;font-size:14px;box-shadow:0 -2px 8px rgba(0,0,0,.15)';
  banner.querySelector('button').style.cssText = 'background:#fff;color:#2563eb;border:none;padding:6px 16px;border-radius:6px;font-weight:600;cursor:pointer';
  document.body.appendChild(banner);
}

// ── Offline badge ──
window.addEventListener('online',  () => document.getElementById('offlineBadge')?.classList.remove('show'));
window.addEventListener('offline', () => document.getElementById('offlineBadge')?.classList.add('show'));
