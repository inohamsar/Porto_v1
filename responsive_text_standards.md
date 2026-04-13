# Typography Optimization & Fluid Design Report

Dokumen ini berfungsi sebagai referensi teknis untuk metode responsivitas teks dan spesifikasi ukuran (Fluid Typography) yang diterapkan pada **InoHamsar Portfolio**.

## 📏 1. Metode Responsivitas: Fluid Typography
Kami menggunakan fungsi CSS `clamp(minimum, preferred, maximum)` untuk menggantikan ukuran statis. Hal ini memungkinkan teks membesar dan mengecil secara halus (*seamless*) mengikuti lebar viewport tanpa harus selalu bergantung pada breakpoint.

### Formula Umum:
`text-[clamp(min_size, fluid_value, max_size)]`

---

## 🏗️ 2. Spesifikasi Komponen

### A. Hero Section - Layout 1 (SequenceScroll.tsx)
Berfokus pada dampak visual *cinematic* tanpa menutupi komposisi latar belakang.

| Elemen | Mobile (Base) | Tablet (md) | Desktop (lg) | Metrik Lain |
| :--- | :--- | :--- | :--- | :--- |
| **Nama (H2)** | `1.5rem - 2.2rem` | `2.5rem - 3.5rem` | **3.5rem - 5.5rem** | `leading-[0.95]`, `break-words` |
| **Sub-Header (H3)** | `1.1rem - 1.5rem` | `1.8rem - 2.4rem` | **2.2rem - 3.0rem** | `leading-[0.85]` |
| **Keahlian (P)** | `0.7rem - 0.9rem` | `0.9rem - 1.3rem` | **1.1rem - 1.5rem** | `tracking-[0.4em]` |

### B. Hero Section - Layout 2 & 3 (Taglines & Philosophy)
Menjamin kutipan dan pesan filosofis tetap seimbang di berbagai rasio layar.

- **Layout 2 (Taglines)**: `text-[clamp(1rem,5vw,1.2rem)] md:text-[clamp(1.2rem,3vw,1.6rem)] lg:text-[clamp(1.5rem,2.5vw,2.2rem)]`
- **Layout 3 (Philosophy)**: `text-[clamp(1.1rem,6vw,1.3rem)] md:text-[clamp(1.4rem,4vw,1.8rem)] lg:text-[clamp(1.8rem,3vw,2.5rem)]`

### C. Section Headers (Projects Header)
Menghormati hierarki visual global dengan menempatkan judul bagian di bawah skala judul Hero.

- **Judul Projek**: `text-[clamp(1.5rem,12vw,2.2rem)] md:text-[clamp(2.2rem,8vw,3.5rem)] lg:text-[clamp(3.5rem,5vw,5.5rem)]`
- **Deskripsi Projek**: `text-[clamp(1rem,4vw,1.2rem)] md:text-[clamp(1.1rem,3vw,1.3rem)] lg:text-[clamp(1.2rem,2vw,1.4rem)]`

### D. Project Showcase Cards (Projects.tsx)
Memastikan judul projek yang panjang (seperti *Asset Management*) tetap rapi dan deskripsi tetap halus tanpa mendominasi hierarki.

- **Metode**: `break-words`, `whitespace-normal`.
- **Ukuran Judul (H3)**:
  - **Mobile**: `clamp(1.4rem, 7vw, 2.0rem)`
  - **Tablet**: `clamp(1.7rem, 5vw, 2.8rem)`
  - **Desktop**: `clamp(1.5rem, 2.7vw, 3.5rem)`
- **Ukuran Deskripsi (P)**:
  - **Mobile**: `clamp(0.7rem, 2vw, 0.8rem)`
  - **Tablet**: `clamp(0.75rem, 1.5vw, 0.85rem)`
  - **Desktop**: `clamp(0.8rem, 1vw, 0.95rem)`

### E. Site Footer (Footer.tsx)
Optimasi untuk kesan editorial yang minimalis.

- **Ukuran Teks**:
  - **Mobile**: `9px`
  - **Tablet**: `9px` (Disesuaikan agar lebih ramping)
  - **Desktop**: `10px` (Sacred Desktop Anchor)

---

## 🛠️ 3. Aturan Editorial (Golden Rules)

1. **Zero-Point Interpolation**: Jangan pernah mencampur CSS `transition-all` dengan properti `transform` milik Framer Motion pada elemen yang sama.
2. **Text Wrapping**: Selalu gunakan `break-words` dan `whitespace-normal` pada judul besar agar tidak "meluap" (overflow) saat layar menyempit.
3. **Leading (Line-Height)**:
   - Untuk gaya cinematis yang rapat: Gunakan `leading-[0.8]` hingga `leading-[0.95]`.
   - Untuk keterbacaan standar: Gunakan `leading-tight` atau `leading-relaxed`.
4. **Padding Consistency**: 
   - Mobile: `px-6`.
   - Tablet: `px-6` (Menghilangkan loncatan ke dalam agar tetap seimbang dengan Mobile).
   - Desktop Standard: `lg:px-container` (32px).

---
*Dokokumentasi ini diperbarui pada 9 April 2026 sebagai standar responsivitas portofolio.*
