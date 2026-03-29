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
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

// ── Offline badge ──
window.addEventListener('online',  () => document.getElementById('offlineBadge')?.classList.remove('show'));
window.addEventListener('offline', () => document.getElementById('offlineBadge')?.classList.add('show'));
