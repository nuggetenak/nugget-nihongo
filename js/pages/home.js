// ══════════════════════════════════════════════════════════════════
//  pages/home.js — Action-First Dashboard & Gamified Home View
//  Duolingo-style playful gamification + daily action stream
//  Exports: window.initHomePage(), window.renderHome()
// ══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  function getTimeGreeting() {
    var h = new Date().getHours();
    if (h >= 4 && h < 11)  return { jp: 'おはようございます', id: 'Selamat Pagi', emoji: '🌅' };
    if (h >= 11 && h < 18) return { jp: 'こんにちは', id: 'Selamat Siang', emoji: '☀️' };
    return { jp: 'こんばんは', id: 'Selamat Malam', emoji: '🌙' };
  }

  function getDisplayName() {
    try {
      var user = window.sbClient && window.sbClient.auth ? null : null;
      var stored = localStorage.getItem('nn_user_profile');
      if (stored) {
        var p = JSON.parse(stored);
        if (p.name) return p.name;
      }
    } catch (e) {}
    return 'Nugget-san';
  }

  function getDailyWord() {
    var db = window.vocabDB;
    if (!db || !db.length) return null;
    var pool = db.filter(function (e) {
      return e.examples && e.examples.length > 0 && e.meaning_id;
    });
    if (!pool.length) pool = db;
    var dayIdx = Math.floor(Date.now() / 86400000);
    return pool[dayIdx % pool.length];
  }

  function renderHome() {
    var container = document.getElementById('homePage');
    if (!container) return;

    var greeting = getTimeGreeting();
    var name = getDisplayName();
    var dueCount = (typeof window.srsDueCount === 'function') ? window.srsDueCount() : 0;
    var streakData = { current: 0 };
    try {
      var s = JSON.parse(localStorage.getItem('nn_streak') || '{}');
      if (s.current) streakData = s;
    } catch(e) {}

    var xpData = { xp: 0 };
    try {
      var x = JSON.parse(localStorage.getItem('nn_xp') || '{}');
      if (x.xp) xpData = x;
    } catch(e) {}

    var dailyWord = getDailyWord();

    // Stats counts
    var srsMap = {};
    try {
      srsMap = JSON.parse(localStorage.getItem('nn_fsrs_cards') || '{}');
    } catch(e) {}
    var totalCardsReviewed = Object.keys(srsMap).length;
    var matureCount = 0;
    Object.values(srsMap).forEach(function(c) {
      if (c && c.card && c.card.state === 2 && (c.card.stability || 0) >= 21) matureCount++;
    });

    var html = '';

    // Outer Dual-Column Wrapper
    html += '<div class="home-layout">';

    // ── MAIN COLUMN (Left / Center on Desktop) ───────────────────
    html += '<div class="home-main-col">';

    // 1. GREETING HERO CARD
    html += '<div class="home-hero-card">'
      + '<div class="home-hero-bg-blobs"></div>'
      + '<div class="home-hero-content">'
      + '  <div class="home-hero-badge">'
      + '    <span class="home-mascot-emoji">🍙</span>'
      + '    <span class="home-hero-greeting-jp">' + greeting.jp + '</span>'
      + '    <span class="home-hero-greeting-time">' + greeting.emoji + ' ' + greeting.id + '</span>'
      + '  </div>'
      + '  <h1 class="home-hero-title">Semangat, ' + name + '!</h1>'
      + '  <p class="home-hero-sub">Langkah kecil setiap hari adalah kunci mahir bahasa Jepang.</p>'
      + '</div>'
      + '</div>';

    // 2. DAILY SRS MISSION CARD (Duolingo-style action card)
    html += '<div class="home-mission-card ' + (dueCount > 0 ? 'is-due' : 'is-clean') + '">'
      + '<div class="home-mission-icon-wrap">'
      + (dueCount > 0
          ? '<div class="home-mission-pulse-icon">🔥</div>'
          : '<div class="home-mission-pulse-icon clean">🌱</div>')
      + '</div>'
      + '<div class="home-mission-body">'
      + '  <div class="home-mission-tag">' + (dueCount > 0 ? 'TARGET HARI INI' : 'SEMUA SELESAI') + '</div>'
      + '  <h2 class="home-mission-headline">'
      + (dueCount > 0
          ? dueCount + ' Kartu Siap di-Review!'
          : 'Taman Hafalanmu Subur!')
      + '  </h2>'
      + '  <p class="home-mission-desc">'
      + (dueCount > 0
          ? 'Review kartu jatuh tempo agar hafalan berpindah ke memori jangka panjang (FSRS).'
          : 'Semua kartu sudah beres di-review hari ini. Waktunya pelajari materi baru!')
      + '  </p>'
      + '</div>'
      + '<div class="home-mission-action">'
      + (dueCount > 0
          ? '<button class="btn-3d btn-3d--primary home-mission-btn" onclick="window.switchTab(\'quiz\')">'
          + '   <span>Mulai Review Sekarang</span>'
          + '   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>'
          + '</button>'
          : '<button class="btn-3d btn-3d--accent home-mission-btn" onclick="window.switchTab(\'browse\')">'
          + '   <span>Pelajari Materi Baru</span>'
          + '   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>'
          + '</button>')
      + '</div>'
      + '</div>';

    // 3. QUICK ACTIONS GRID (4 Playful Cards)
    html += '<div class="home-section-title-wrap">'
      + '  <h3 class="home-section-title">Menu Utama</h3>'
      + '  <span class="home-section-sub">Pilih jalur belajarmu</span>'
      + '</div>';

    html += '<div class="home-quick-grid">'
      // Card 1: Materi
      + '<div class="home-nav-card card-materi" onclick="window.switchTab(\'browse\')">'
      + '  <div class="hnc-icon-wrap" style="background: rgba(59,130,246,0.15); color: #3B82F6;">📖</div>'
      + '  <div class="hnc-info">'
      + '    <div class="hnc-title">Jelajah Materi</div>'
      + '    <div class="hnc-desc">Buku Minna, Irodori, Soumatome & JLPT N5–N1</div>'
      + '  </div>'
      + '  <div class="hnc-arrow">→</div>'
      + '</div>'
      // Card 2: Latihan
      + '<div class="home-nav-card card-quiz" onclick="window.switchTab(\'quiz\')">'
      + '  <div class="hnc-icon-wrap" style="background: rgba(245,158,11,0.15); color: #F59E0B;">🎯</div>'
      + '  <div class="hnc-info">'
      + '    <div class="hnc-title">Latihan Kuis</div>'
      + '    <div class="hnc-desc">9 mode interaktif: Susun kata, Konjugasi, Pilihan ganda</div>'
      + '  </div>'
      + '  <div class="hnc-arrow">→</div>'
      + '</div>'
      // Card 3: Kebun Mastery
      + '<div class="home-nav-card card-kebun" onclick="window.switchTab(\'stats\')">'
      + '  <div class="hnc-icon-wrap" style="background: rgba(34,197,94,0.15); color: #22C55E;">🪴</div>'
      + '  <div class="hnc-info">'
      + '    <div class="hnc-title">Kebun Mastery</div>'
      + '    <div class="hnc-desc">Visualisasi tanaman hafalan dari benih sampai pohon</div>'
      + '  </div>'
      + '  <div class="hnc-arrow">→</div>'
      + '</div>'
      // Card 4: Sensei AI
      + '<div class="home-nav-card card-sensei" onclick="window.switchTab(\'sensei\')">'
      + '  <div class="hnc-icon-wrap" style="background: rgba(236,72,153,0.15); color: #EC4899;">🍵</div>'
      + '  <div class="hnc-info">'
      + '    <div class="hnc-title">Tanya Sensei</div>'
      + '    <div class="hnc-desc">AI Tutor ramah untuk tanya tata bahasa & ngobrol</div>'
      + '  </div>'
      + '  <div class="hnc-arrow">→</div>'
      + '</div>'
      + '</div>';

    // 4. CURRICULUM HIGHLIGHT / CONTINUE LEARNING
    html += '<div class="home-section-title-wrap">'
      + '  <h3 class="home-section-title">Kurikulum Populer</h3>'
      + '  <span class="home-section-sub">Akses langsung textbook</span>'
      + '</div>';

    html += '<div class="home-book-strip">'
      + '<div class="home-book-pill" onclick="window.switchTab(\'browse\'); setTimeout(function(){ if(window.showBukuChapters) window.showBukuChapters(\'minna-1\'); }, 100);">'
      + '  <span class="hbp-icon">📕</span>'
      + '  <div class="hbp-text"><div class="hbp-name">Minna no Nihongo 1</div><div class="hbp-meta">25 Bab · Dasar N5</div></div>'
      + '</div>'
      + '<div class="home-book-pill" onclick="window.switchTab(\'browse\'); setTimeout(function(){ if(window.showBukuChapters) window.showBukuChapters(\'minna-2\'); }, 100);">'
      + '  <span class="hbp-icon">📗</span>'
      + '  <div class="hbp-text"><div class="hbp-name">Minna no Nihongo 2</div><div class="hbp-meta">25 Bab · Lanjutan N4</div></div>'
      + '</div>'
      + '<div class="home-book-pill" onclick="window.switchTab(\'browse\'); setTimeout(function(){ if(window.showBukuChapters) window.showBukuChapters(\'irodori-a1\'); }, 100);">'
      + '  <span class="hbp-icon">🌸</span>'
      + '  <div class="hbp-text"><div class="hbp-name">Irodori A1</div><div class="hbp-meta">18 Unit · Kerja & Hidup</div></div>'
      + '</div>'
      + '<div class="home-book-pill" onclick="window.switchTab(\'browse\'); setTimeout(function(){ if(window.showBukuChapters) window.showBukuChapters(\'soumatome-n3\'); }, 100);">'
      + '  <span class="hbp-icon">📘</span>'
      + '  <div class="hbp-text"><div class="hbp-name">Sou Matome N3</div><div class="hbp-meta">6 Minggu · Tata Bahasa</div></div>'
      + '</div>'
      + '</div>';

    html += '</div>'; // End home-main-col

    // ── SIDEBAR WIDGET COLUMN (Right Column on Desktop) ──────────
    html += '<div class="home-side-col">';

    // Widget 1: Streak & XP Badge
    html += '<div class="home-side-widget home-streak-widget">'
      + '  <div class="hsw-header">'
      + '    <div class="hsw-title">🔥 Rutinitas Belajar</div>'
      + '    <span class="hsw-badge">' + (streakData.current || 0) + ' Hari</span>'
      + '  </div>'
      + '  <div class="home-streak-display">'
      + '    <div class="hsd-flame-wrap">'
      + '      <span class="hsd-flame">🔥</span>'
      + '      <div class="hsd-num">' + (streakData.current || 0) + '</div>'
      + '    </div>'
      + '    <div class="hsd-meta">'
      + '      <div class="hsd-text">' + ((streakData.current || 0) > 0 ? 'Streak Aktif!' : 'Mulai streak pertamamu!') + '</div>'
      + '      <div class="hsd-sub">' + (xpData.xp || 0) + ' Total XP terkumpul</div>'
      + '    </div>'
      + '  </div>'
      + '</div>';

    // Widget 2: Kotoba Hari Ini (Interactive Daily Word)
    if (dailyWord) {
      html += '<div class="home-side-widget home-word-widget">'
        + '  <div class="hsw-header">'
        + '    <div class="hsw-title">✨ Kata Hari Ini</div>'
        + '    <span class="hsw-badge hsw-badge--jlpt">' + (dailyWord.jlpt ? dailyWord.jlpt.toUpperCase() : 'N5') + '</span>'
        + '  </div>'
        + '  <div class="hww-card">'
        + '    <div class="hww-word">' + (dailyWord.word || '') + '</div>'
        + (dailyWord.reading ? '<div class="hww-reading">' + dailyWord.reading + '</div>' : '')
        + '    <div class="hww-meaning">' + (dailyWord.meaning_id || '') + '</div>'
        + (dailyWord.examples && dailyWord.examples[0]
            ? '<div class="hww-example">'
            + '   <div class="hww-ex-jp">' + dailyWord.examples[0].jp + '</div>'
            + '   <div class="hww-ex-id">' + dailyWord.examples[0].id + '</div>'
            + ' </div>'
            : '')
        + '  </div>'
        + '</div>';
    }

    // Widget 3: Kebun Mini Status
    html += '<div class="home-side-widget home-kebun-mini-widget">'
      + '  <div class="hsw-header">'
      + '    <div class="hsw-title">🪴 Status Kebun</div>'
      + '    <span class="hsw-link" onclick="window.switchTab(\'stats\')">Buka Kebun →</span>'
      + '  </div>'
      + '  <div class="hkm-stats-row">'
      + '    <div class="hkm-stat-box">'
      + '      <div class="hkm-stat-num">' + totalCardsReviewed + '</div>'
      + '      <div class="hkm-stat-label">Total Ditanam</div>'
      + '    </div>'
      + '    <div class="hkm-stat-box">'
      + '      <div class="hkm-stat-num">' + matureCount + '</div>'
      + '      <div class="hkm-stat-label">Pohon Rindang</div>'
      + '    </div>'
      + '  </div>'
      + '  <div class="hkm-garden-preview">'
      + '    <span title="Benih Baru">🌱</span>'
      + '    <span title="Kecambah">🌿</span>'
      + '    <span title="Bunga Berkembang">🌻</span>'
      + '    <span title="Pohon Rindang">🌳</span>'
      + '    <span title="Perlu Disiram">🥀</span>'
      + '  </div>'
      + '</div>';

    html += '</div>'; // End home-side-col
    html += '</div>'; // End home-layout

    container.innerHTML = html;
  }

  window.initHomePage = function () {
    renderHome();
  };
  window.renderHome = renderHome;

})();
