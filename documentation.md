# Agrilink Frontend Documentation

Selamat datang di dokumentasi teknis sistem frontend **Agrilink**. Repositori ini dibangun menggunakan framework Next.js dengan arsitektur modern untuk mendukung sistem monitoring dan analitik pertanian multi-peran.

---

## 🚀 Teknologi Utama (Tech Stack)

Sistem ini didesain dan diimplementasikan dengan komponen teknologi sebagai berikut:

1. **Framework Utama**: [Next.js (App Router)](https://nextjs.org/) versi `13.5.1` dengan React `18.2.0`.
2. **Bahasa Pemrograman**: [TypeScript](https://www.typescriptlang.org/) untuk *type-safety* dan struktur kode yang kokoh.
3. **Desain & Styling**: [Tailwind CSS](https://tailwindcss.com/) bersama dengan [Radix UI](https://www.radix-ui.com/) (komponen primitif tanpa gaya) dan [lucide-react](https://lucide.dev/) untuk ikonografi.
4. **Grafik & Visualisasi**: [Recharts](https://recharts.org/) untuk visualisasi grafik analitik.
5. **Autentikasi & Database**: Disediakan integrasi awal dengan [@supabase/supabase-js](https://supabase.com/). Saat ini autentikasi berjalan secara lokal menggunakan dummy data terenkapsulasi.
6. **Deployment**: Konfigurasi otomatis untuk [Netlify](https://www.netlify.com/) menggunakan `@netlify/plugin-nextjs`.

---

## 📁 Struktur Direktori

Struktur folder proyek di dalam [frontend-al](file:///d:/PENNTING%20DEHH/agrilink/frontend-al) dirancang sebagai berikut:

```text
frontend-al/
├── app/                  # Next.js App Router (Halaman & Layout)
│   ├── admin/            # Dashboard untuk Administrator
│   ├── dinas/            # Dashboard untuk Dinas Pertanian
│   ├── farmer/           # Dashboard untuk Konsultan Tani / Petani
│   ├── officer/          # Dashboard untuk Petugas Lapangan / Penyuluh
│   ├── login/            # Halaman Autentikasi Pengguna
│   ├── globals.css       # File stylesheet global utama
│   ├── layout.tsx        # Root layout HTML & Font Provider
│   └── page.tsx          # Landing page utama sistem
├── components/           # Komponen UI Reusable
│   ├── dashboard/        # Layout spesifik dashboard, sidebar, navbar, dll.
│   ├── ui/               # Komponen atomik / primitif UI (shadcn style)
│   └── theme-provider.tsx# Context provider untuk tema (Light/Dark Mode)
├── hooks/                # Custom React Hooks
├── lib/                  # Fungsi utilitas, autentikasi, & data mock
│   ├── auth/             # Context dan konfigurasi autentikasi
│   ├── data/             # Dummy data dan konfigurasi sidebar per role
│   └── utils.ts          # Utilitas umum (cn helper untuk Tailwind)
├── types/                # Definisi Type & Interface TypeScript
└── config files          # File konfigurasi (tailwind, next.config, tsconfig, etc.)
```

---

## 👥 Sistem Autentikasi & Manajemen Peran (Roles)

Agrilink mengimplementasikan sistem multi-peran dengan empat peran utama:
1. **Farmer (Petani / Konsultan Tani)**: Berfokus pada pengelolaan lahan, tanaman, aktivitas harian, deteksi penyakit AI, dan asisten AI.
2. **Officer (Penyuluh Lapangan)**: Memantau daftar petani dan lahan binaan, verifikasi tanda peringatan penyakit, serta memberikan rekomendasi langsung.
3. **Dinas (Dinas Pertanian)**: Analisis agregat tingkat regional, statistik peta wilayah, kinerja penyuluh, serta insight AI tingkat kebijakan.
4. **Admin (Sistem Administrator)**: Manajemen pengguna, konfigurasi data master, monitoring logs, dan setelan sistem global.

### Alur Autentikasi (`AuthContext.tsx`)
Autentikasi dikendalikan oleh [AuthContext.tsx](file:///d:/PENNTING%20DEHH/agrilink/frontend-al/lib/auth/AuthContext.tsx). State pengguna disimpan di `localStorage` dengan kunci `'harvestsun_user'`. Akun demo berikut dapat digunakan untuk pengujian:

| Email | Peran (Role) | Nama |
| :--- | :--- | :--- |
| `farmer@demo.id` | `farmer` (Petani) | Budi Santoso |
| `officer@demo.id` | `officer` (Penyuluh) | Dr. Rina Susanti |
| `dinas@demo.id` | `dinas` (Dinas Pertanian) | Kepala Dinas |
| `admin@demo.id` | `admin` (Administrator) | Admin Utama |

---

## 📊 Modul Fitur Dashboard

### 1. Dashboard Petani (`/farmer`)
* **Lahan Saya** (`/farms`): Monitoring status lahan aktif, kesehatan tanah, dan lokasi lahan.
* **Tanaman Saya** (`/crops`): Pelacakan fase pertumbuhan tanaman, hari estimasi panen, dan indeks kesehatan.
* **Aktivitas** (`/activities`): Catatan irigasi, pemupukan, penyemprotan hama, dan estimasi biaya operasional.
* **AI Assistant & Deteksi Penyakit** (`/ai-assistant`, `/disease-detection`): Analisis foto tanaman terserang hama/penyakit secara *real-time* berbasis kecerdasan buatan.

### 2. Dashboard Penyuluh (`/officer`)
* **Petani & Lahan Binaan** (`/farmers`, `/farms`): Database detail petani dalam wilayah kerja penyuluh.
* **Monitoring & Alert** (`/monitoring`, `/disease-alerts`): Daftar notifikasi ancaman hama/penyakit yang dilaporkan petani untuk segera diverifikasi di lapangan.
* **Rekomendasi** (`/recommendations`): Pengiriman saran praktis langsung ke aplikasi petani.

### 3. Dashboard Dinas (`/dinas`)
* **Peta Regional & Produksi** (`/regional-map`, `/production-analytics`): Informasi grafis spasial sebaran lahan subur, tingkat produktivitas panen per daerah, dan deteksi dini penyebaran wabah tanaman (*Disease Intelligence*).
* **Kinerja Penyuluh** (`/officer-monitoring`): Laporan kunjungan dan skor kepuasan petani terhadap penyuluh lapangan.

### 4. Dashboard Admin (`/admin`)
* **Pengaturan & Users** (`/users`, `/roles`): Kontrol penuh atas penambahan akun baru dan modifikasi hak akses.
* **Master Data & Logs** (`/master-data`, `/system-monitoring`): Konfigurasi variabel agrikultur dasar (jenis pupuk, tipe tanaman) dan audit log server.
