# Dokumentasi Sistem Galeri Otomatis & Rekonstruksi Proyek

Dokumen ini menjelaskan arsitektur dan fungsionalitas sistem galeri gambar otomatis yang diimplementasikan pada seksi **Projects**.

## 1. Arsitektur Terpusat

Sistem ini dirancang agar sepenuhnya dinamis. Anda tidak perlu mendaftarkan setiap file gambar secara manual di dalam kode. Cukup kelola folder di direktori `public/`.

### Folder Utama: `public/project/`
Struktur folder yang digunakan adalah:
- `[ProjectName]/` : Berisi gambar cover utama (misal: `1.png` atau `hris.png`).
- `[ProjectName]/[GalleryFolder]/` : Berisi kumpulan gambar untuk galeri preview.

### API Route: `app/api/gallery/route.ts`
Berfungsi sebagai pendeteksi gambar otomatis. Saat kartu proyek diklik, API ini memindai folder yang ditentukan dan mengembalikan daftar path gambar ke frontend.

---

## 2. Komponen UI Gallery (GalleryModal.tsx)

Komponen ini adalah viewer fullscreen premium dengan fitur-fitur berikut:

### Fitur Zoom & Navigasi
- **Native Zoom (Desktop)**: Gunakan *Scroll Wheel* atau *Trackpad* untuk memperbesar/mengecilkan gambar secara alami.
- **Global Pinch-to-Zoom (Mobile/Tablet)**: Gunakan gesture cubit layar **di mana saja** (tidak harus tepat di atas gambar) untuk zoom yang intuitif. Sistem menggunakan `touch-action: none` untuk mencegah browser men-zoom halaman secara native.
- **Full Resolution Integrity**: Menggunakan prop `unoptimized` dan `sizes="100vw"` pada komponen Image untuk memastikan gambar yang ditampilkan adalah file asli tanpa kompresi, sehingga tetap tajam saat di-zoom maksimal.
- **Double-Click**: Klik ganda untuk zoom cepat (2x) atau reset ke ukuran normal.
- **Panning**: Saat di-zoom, gambar dapat digeser secara bebas untuk melihat detail di setiap sudut.

### Desain Responsif & Ergonomis
- **Desktop**: Tombol navigasi panah berada di sisi samping (kiri/kanan) untuk kenyamanan penggunaan mouse.
- **Mobile/Tablet**: Tombol navigasi panah dipindahkan ke area bawah gambar agar mudah dijangkau oleh jempol.
- **Badge Info**: Indikator "Full Preview Mode" diposisikan di paling bawah halaman untuk menjaga kebersihan visual.

### Integrasi Sistem
- **Scroll Lock**: Mengintegrasikan **Lenis (Smooth Scroll)** untuk membekukan scroll halaman latar belakang saat galeri terbuka.
- **Navbar Auto-Hide**: Secara otomatis menyembunyikan Navbar global agar tidak mengganggu visual galeri melalui trigger class `.gallery-open`.

---

## 3. Cara Menambahkan Proyek Baru

Untuk menambahkan proyek baru dengan fitur galeri, ikuti langkah berikut:

1. **Siapkan Asset**:
   - Taruh gambar cover di `public/project/PROYEK_BARU/cover.png`.
   - Taruh gambar galeri di `public/project/PROYEK_BARU/Card_PROYEK/`.

2. **Daftarkan di `components/sections/Projects.tsx`**:
   Tambahkan objek baru ke dalam array `projects`:
   ```javascript
   {
     title: "Nama Proyek Anda",
     role: "Peran Anda",
     impact: "Deskripsi singkat mengenai proyek.",
     image: "/project/PROYEK_BARU/cover.png",
     color: "#HEX_WARNA",
     galleryFolder: "PROYEK_BARU/Card_PROYEK" // Path relatif dari folder public/project/
   }
   ```

3. **Selesai**: Web akan secara otomatis mendeteksi jumlah gambar dan mengaktifkan fitur `zoom-in` pada kartu tersebut.

---

## 4. Teknologi yang Digunakan
- **Next.js 15 (App Router)**
- **Framer Motion**: Untuk animasi transisi, drag, dan state modal.
- **Lucide React**: Untuk ikonografi sistem.
- **Lenis**: Untuk manajemen scroll terintegrasi.
- **Tailwind CSS 4**: Untuk styling responsif tingkat lanjut.
