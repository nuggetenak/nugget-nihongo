# ADR-010: Warm Editorial Hybrid Design System & Nippon Colors Standard
> **Status:** APPROVED · **Tanggal:** 7 November 2026 · **Deciders:** Nugget Nihongo Core Team  
> **Kategori:** UI/UX Design System, Typography, Visual Accessibility & Brand Identity

---

## 1. Konteks & Permasalahan
Sebelum v22.0.0, antarmuka Nugget Nihongo mengalami disonansi estetika (*aesthetic dissonance*):
1. **Light Mode Kusam / Cokelat Mati:** Demi mengejar rasio kontras WCAG AAA, `--accent` tema terang disetel ke `#853704` (cokelat tua pekat), menghilangkan nuansa keemasan *"Crispy Nugget"* dan terkesan muram/sepia.
2. **Tabrakan Warna Tradisional vs Neon Digital:** Latar belakang mengusung tema kertas Washi dan tinta Sumi, tetapi elemen status menggunakan warna mentah standar Tailwind digital (`emerald-500`, `rose-500`, `cyan-500`) yang terasa seperti stiker neon di atas kaligrafi.
3. **Kartu Kurang Timbul (*Flat Card Contrast*):** Latar belakang (`#FDFBF7`) dan permukaan kartu (`#F5EFE6`) memiliki delta kontras sangat tipis sehingga kartu memudar di layar ponsel cerah.

---

## 2. Keputusan Arsitektur (*Decision*)
Berdasarkan wawancara desain konsensus (`/grill-me`), Nugget Nihongo mengadopsi **Warm Editorial Hybrid Design System**:

### A. Palet Kanvas Bertingkat
- **Light Mode:** Latar belakang kertas beras lembut *Washi Wash* (`#F7F4EE`) dengan kartu mengapung putih susu murni (*Pure Milk White* `#FFFFFF`), dibingkai garis *hairline* hangat `rgba(45, 35, 25, 0.08)` dan bayangan lembut mikro.
- **Dark Mode:** Latar arang pernis Jepang *Warm Sumi* (`#121110`) dengan kartu arang pekat (`#1A1816`), garis tepi emas pernis *Makie* `rgba(245, 158, 11, 0.14)`, dan tipografi gading lembut (`#F5EFE6`).

### B. Standarisasi 8 Warna Tradisi Jepang (*Nippon Colors*)
Mengganti warna Tailwind generik dengan palet harmonis:
1. **Brand Primary (Nugget Gold):** *Kohaku Amber* (`#D97706` Light / `#F59E0B` Dark)
2. **Success / Passed / Hanko:** *Tokiwa Pine Green* (`#059669`)
3. **Danger / Error / Streak Fire:** *Shu-iro Torii Red* (`#DC2626`)
4. **Listening / Audio / Water:** *Asagi Water Blue* (`#0284C7`)
5. **Keigo / Cultural / Grammar:** *Fuji Wisteria Purple* (`#7C3AED`)
6. **Surface Card (Light):** *Gofun Milk White* (`#FFFFFF`)
7. **Canvas Wash (Light):** *Washi Wash* (`#F7F4EE`)
8. **Canvas Deep (Dark):** *Sumi Ink* (`#121110`)

### C. Infusi Jiwa Brand & Slogan
- Menetapkan sub-tagline resmi: *"Bite-Sized Japanese for Indonesian Speakers · Teman Belajar Tanpa Rasa Bersalah"*.
- Komponen motivasi mikro: *"Senpai Daily Wisdom"* dari Sensei Nugget & Senpai Aoi.

---

## 3. Konsekuensi & Dampak
- **Positif:** Mengeliminasi kesan kusam di Light Mode, meningkatkan rasio kontras teks kanji ke tingkat optimal WCAG AAA ($> 14:1$), dan menciptakan harmoni visual sempurna dengan ilustrasi cat air Irasutoya.
- **Implementasi:** Token dipusatkan di `src/index.css` dan `tailwind.config.js` tanpa merusak 44 sprint test contracts.
