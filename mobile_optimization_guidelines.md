# Mobile Responsiveness & Desktop Preservation Guidelines

Dokumen ini adalah aturan baku yang **WAJIB** diikuti oleh AI Assistant (Antigravity) selama proses optimasi responsivitas mobile pada proyek portofolio InoHamsar.

## 1. Prinsip Utama
- **Desktop adalah Suci**: Desain asli desktop yang sudah megah tidak boleh berubah sedikit pun.
- **Mobile-First Tweak**: Semua perubahan ukuran (font, padding, gap, posisi) harus diisolasi hanya untuk tampilan mobile.

## 2. Aturan Teknis Penulisan Kode (Tailwind CSS)

### A. Penggunaan Prefix `md:` (MANDATORY)
Setiap kali melakukan penyesuaian pada properti visual, AI harus mengunci nilai Desktop aslinya.
- **Salah**: `px-6 py-2` (Ini akan merubah mobile DAN desktop).
- **Benar**: `px-4 py-2 md:px-10 md:py-4` (Mobile kecil, Desktop kembali ke ukuran aslinya).

### B. Properti yang Sering Berubah
| Properti | Aturan Mobile | Aturan Desktop (`md:`) |
| :--- | :--- | :--- |
| **Padding** | Lebih ramping/tipis | Harus kembali ke nilai awal (asimetris/megah) |
| **Text Size** | Lebih kecil (e.g. `text-3xl`) | Gunakan `md:text-7xl` atau sesuai aslinya |
| **Gap** | Lebih rapat (e.g. `gap-4`) | Gunakan `md:gap-12` |
| **Flex/Items** | Seringkali `items-start` | Kembalikan ke `md:items-end` jika aslinya begitu |
| **Z-index/Pos** | `absolute` (Latar Belakang) | **WAJIB** `md:relative/static` (Kembali ke Aliran Grid) |
| **Filter (Blur)** | Sesuai permintaan (e.g. `blur-8`) | **WAJIB** `md:blur-none` (Kembali Tajam Kristal) |
| **Opacity** | Sesuai permintaan (e.g. `opacity-40`) | **WAJIB** `md:opacity-100` (Kembali Terang) |

### C. Larangan Keras Perilaku (BEHAVIORAL PROHIBITION)
AI dilarang keras mengubah properti berikut di level Desktop (`md:`) kecuali diminta:
- **Animasi**: `delay`, `duration`, `ease`, `staggerChildren`. (JANGAN PERNAH DIUBAH).
- **Konten**: `src` gambar, `text` payload, atau `variants` animasi asli.
- **Z-Index**: Dilarang membuat konten menumpuk di desktop jika aslinya bersisian (Grid).

## 3. Protokol Verifikasi Sebelum Commit
1. **Identifikasi Properti**: Sebelum mengedit, baca nilai asli yang ada di file.
2. **Isolasi Perubahan**: Masukkan nilai asli tersebut ke dalam prefix `md:`.
3. **Optimasi Mobile**: Ganti nilai dasar (tanpa prefix) dengan ukuran yang diinginkan untuk mobile.
4. **Verifikasi Visual**: Pastikan tidak ada penghapusan kelas CSS desktop yang sudah ada.

## 4. Pelanggaran Berat
- Mengubah ukuran font desktop tanpa instruksi khusus.
- Menghapus padding/margin desktop yang sudah ada.
- Mengubah variabel global di `index.css` yang berdampak negatif pada layar lebar.
- **BARU**: Melakukan "Self-Correction" pada nilai desktop (e.g. mencoba menstandarisasi jarak antar seksi tanpa izin).
- **BARU**: Membiarkan efek visual mobile (blur/transparansi) bocor ke tampilan desktop.

---
**Status**: AKTIF & WAJIB DIIKUTI.
**Target Project**: f:/Project/Regular/web_porto/
