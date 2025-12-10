# Frontend Developer Intern 2025 — Suitmedia Ideas Showcase

Next.js | SEO | Proxy API | Zustand | TailwindCSS | Blur Lazy Load

Proyek ini merupakan implementasi halaman listing dan detail artikel (Ideas) yang terintegrasi dengan API Suitmedia. Proyek ini menampilkan client-side yang cepat, responsif, mendukung internationalization, serta memanfaatkan teknik optimalisasi gambar seperti blur generation dan caching.

# Pembuat Proyek

Dikembangkan oleh:

**Rizal Sujana**  
Fullstack Developer ( Next.js, React)

Posisi Lamaran: Software Engineer Apprentice Specialization Track: Frontend / Backend / Mobile Developer

Kontak:  
- Email: zalsujana07@gmail.com (opsional jika ingin ditampilkan)  
- LinkedIn: [https://www.linkedin.com/in/rizal-sujana/](https://www.linkedin.com/in/rizal-sujana/) 
- GitHub: [https://github.com/lucifrrdev](https://github.com/lucifrrdev) 
- Portofolio [https://lucifrrdev.vercel.app/id](ttps://lucifrrdev.vercel.app/id)

## Fitur Utama

1. **Halaman Ideas (List)**
   - Pagination dinamis (4, 8, 10, 20, 30)
   - Sorting (Newest / Oldest)
   - Skeleton loading & error retry handler
   - Cache React Query + fallback ke dummy data jika API gagal
   - Klik artikel menyimpan detail di Zustand (tanpa refetch API)

2. **Detail Artikel**
   - Data diterima melalui Zustand (persist setelah navigasi)
   - Hero Banner dengan efek overlay
   - Typography content menggunakan Tailwind Prose
   - Back button dan navigasi artikel (Next / Prev template)
   - Tersedia fallback bila halaman di-refresh

3. **Blur Image Placeholder**
   - Blur base64 auto-generate via `/api/blur`
   - Caching di memory + localStorage untuk performa
   - Optimasi penuh pada `<Image>` Next.js
   - Mendukung proxy CDN & remotePatterns

4. **Proxy API Layer**
   - Seluruh komunikasi API melalui middleware proxy untuk:
     - Menghindari CORS
     - Menyembunyikan endpoint asli
     - Bisa manipulasi headers
     - Bisa kendalikan security
     - Bisa logging & re-route CDN

   Endpoint proxy:
   - `/api/proxy/ideas`
   - `/api/proxy/image`
   - `/api/blur`

5. **Multibahasa (EN / ID)**
   - Routing berdasarkan locale: `/en`, `/id`
   - Navigasi tetap mengikuti locale
   - Teks menu & label menggunakan `t()`

6. **Responsive Navigation**
   - Desktop navigation
   - Mobile navigation menggunakan Sheet UI (ShadCN)
   - State menu tersinkron dan transisi halus

## Teknologi yang Digunakan

| Teknologi              | Peran                                     |
|-----------------------|-------------------------------------------|
| Next.js 15           | App Router, Metadata, Routing             |
| React Query           | Data fetching & caching                   |
| Zustand               | Global persisted state                     |
| next-intl            | i18n multi-bahasa                         |
| TailwindCSS v4       | Styling + Typography                       |
| ShadCN UI            | Sheet, Button, Select                     |
| LocalStorage          | Image blur caching                        |
| Next Image Optimizer  | Proxy + Remote CDN                        |

## Struktur Folder

```
src/
 ├ app/
 │  ├ [locale]/
 │  │   ├ ideas/
 │  │   │   ├ page.jsx
 │  │   │   ├ [slug]/page.jsx
 │  │   ├ layout.jsx
 │  │   └ page.jsx
 │  ├ api/
 │  │   ├ proxy/ideas/route.js
 │  │   ├ proxy/image/route.js
 │  │   ├ blur/route.js
 ├ components/ui/*
 ├ store/useIdeasStore.js
 ├ lib/generateBlur.js
 ├ lib/tanstack.config.js
 ├ i18n/
 └ styles/globals.css
```

## Instalasi & Menjalankan

- Clone & Install dependencies
  ```
  npm install
  npm run dev
  ```

- Buka:
  - `http://localhost:3000/en`
  - `http://localhost:3000/id`

## Environment Variables

Buat file:

`.env.development`

```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=https://suitmedia-backend.suitdev.com/api
NEXT_PUBLIC_IMG_CDN=https://assets.suitdev.com/storage/files
```

## Keterbatasan (Known Limitations)

| Keterbatasan                                           | Alasan                                             |
|-------------------------------------------------------|---------------------------------------------------|
| Refresh detail page menghapus state                   | Mengikuti requirement test (Zustand Client Persist) |
| Beberapa gambar 403                                   | CDN punya proteksi akses                           |

## Lisensi

Proyek ini dibuat sebagai Project Test / Assessment.
