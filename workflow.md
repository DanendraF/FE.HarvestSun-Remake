# Agrilink Development Workflow

Dokumen ini menjelaskan alur kerja (*workflow*) pengembangan untuk kontributor frontend **Agrilink**.

---

## 🛠️ Persiapan Awal (Prerequisites & Setup)

Sebelum memulai pengembangan, pastikan perangkat Anda telah terpasang:
* **Node.js** (Rekomendasi versi LTS 18.x atau yang lebih baru)
* **NPM** (Bawaan Node.js) atau **Yarn**

### Langkah Instalisasi:
1. Masuk ke direktori proyek frontend:
   ```bash
   cd "d:\PENNTING DEHH\agrilink\frontend-al"
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000).

---

## 💻 Alur Pengembangan Fitur (Development Flow)

### 1. Menambahkan Halaman Baru
Sistem ini menggunakan **Next.js App Router**. Untuk menambahkan halaman baru:
1. Tentukan peran (*role*) yang ditargetkan (`admin`, `dinas`, `farmer`, `officer`).
2. Buat folder baru di bawah `app/[role]/[nama-halaman]`.
3. Buat file `page.tsx` di dalam folder tersebut:
   ```tsx
   // Contoh: app/farmer/my-feature/page.tsx
   import React from 'react';

   export default function MyFeaturePage() {
     return (
       <div className="space-y-6">
         <h1 className="text-3xl font-bold">Fitur Baru Saya</h1>
         <p>Konten fitur baru di sini...</p>
       </div>
     );
   }
   ```
4. Daftarkan halaman tersebut pada menu sidebar di [sidebarConfig.ts](file:///d:/PENNTING%20DEHH/agrilink/frontend-al/lib/data/sidebarConfig.ts).

### 2. Menggunakan Sidebar & Navbar Dinamis
Halaman dashboard secara otomatis dibungkus oleh layout yang memuat [RoleSidebar](file:///d:/PENNTING%20DEHH/agrilink/frontend-al/components/dashboard/RoleSidebar.tsx) dan [TopNavbar](file:///d:/PENNTING%20DEHH/agrilink/frontend-al/components/dashboard/TopNavbar.tsx).
* Ketika pengguna masuk, sistem mendeteksi role melalui `useAuth()`.
* Menu sidebar akan dirender secara dinamis berdasarkan konfigurasi di `sidebarConfig.ts`.

### 3. Menggunakan Komponen UI (Atomic Design)
Gunakan komponen atomik yang siap pakai di folder `components/ui/` (seperti tombol, dialog, input, card, dropdown, dll.) untuk menjaga konsistensi visual:
```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
```

---

## 🔧 Standar Penulisan Kode (Coding Standards)

1. **TypeScript**: Selalu deklarasikan type data atau gunakan interface yang sesuai dari [index.ts](file:///d:/PENNTING%20DEHH/agrilink/frontend-al/types/index.ts). Hindari penggunaan tipe data `any`.
2. **Tailwind CSS**: 
   * Gunakan helper `cn(...)` dari [utils.ts](file:///d:/PENNTING%20DEHH/agrilink/frontend-al/lib/utils.ts) jika ingin menggabungkan kelas Tailwind secara kondisional.
   * Ikuti sistem responsif Tailwind (`sm:`, `md:`, `lg:`) untuk memastikan aplikasi ramah di perangkat mobile (terutama untuk dashboard petani/penyuluh).
3. **Linting**: Jalankan linter sebelum melakukan komit kode untuk mendeteksi kesalahan sintaksis:
   ```bash
   npm run lint
   ```

---

## 🚀 Build & Deployment

### Build untuk Produksi
Untuk memastikan tidak ada error kompilasi dan tipe data sebelum rilis:
```bash
npm run build
```

### Deployment (Netlify)
Proyek ini dikonfigurasi untuk Netlify dengan [netlify.toml](file:///d:/PENNTING%20DEHH/agrilink/frontend-al/netlify.toml). Setiap kali Anda melakukan push ke branch utama repositori Git yang terhubung, Netlify akan mendeteksi dan melakukan build otomatis menggunakan Next.js Runtime Plugin.
