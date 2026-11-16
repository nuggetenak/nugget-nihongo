# 🛡️ Regression Prevention Policy — Nugget Nihongo

Kebijakan ini mengikat secara mutlak bagi seluruh kontributor dan tim pengembang platform Nugget Nihongo.

---

## 1. Zero Disabling Rule (Dilarang Menonaktifkan Test)
- Tidak ada test yang boleh dikomentari, dilewati (`test.skip`), atau dinonaktifkan hanya untuk meloloskan pull request atau rilis baru.
- Jika sebuah test gagal akibat refaktorisasi arsitektur yang valid, test tersebut harus **dimodernisasi** agar mencerminkan kontrak perilaku baru tanpa mengurangi ketatnya asersi.

---

## 2. Cumulative Continuous Green Invariant
- Setiap siklus dan sprint baru wajib menambahkan suite uji baru secara aditif ($1 \dots N$).
- Seluruh suite historis ($1 \dots N-1$) wajib tetap **100% HIJAU (GREEN)** setiap kali master orchestrator dijalankan.
- Tidak ada kompromi toleransi kegagalan: orchestrator wajib mengembalikan exit code `0`.

---

## 3. Behavioral Contracts Over Literal String Matchers
- Hindari asersi rapuh yang mencari substring harfiah dalam file konfigurasi atau komponen UI jika perubahan whitespace atau tanda kutip dapat memicunya gagal.
- Utamakan pengujian perilaku runtime: panggil fungsi yang diekspor, verifikasi hasil komputasi matematika, evaluasi properti AST, atau validasi skema JSON data.

---

## 4. Multi-Device Viewport Invariant
- Setiap komponen atau halaman baru wajib lolos uji ergonomi:
  - Tidak ada overflow horizontal (`overflow-x-hidden`, `min-w-0`).
  - Target sentuh interaktif berukuran minimal `40px × 40px`.
  - Bantalan bawah (*safe-area cushion*) `pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12` agar tidak tertutup `BottomNav`.
  - Tidak ada bilah navigasi lengket bertumpuk (*no stacked sticky bars*) di layar mobile.
