# Dicoding Jobs — Platform Lowongan Kerja

Proyek teknikal asesmen full-stack untuk **Dicoding Jobs**, menghubungkan industri teknologi dengan talenta digital. Dibangun dengan backend RESTful API menggunakan **Laravel 12** dan antarmuka frontend modern menggunakan **Next.js (App Router)** serta **Tailwind CSS**.

---

## Tech Stack

### Backend
- **Framework:** Laravel 12 (PHP 8.2+)
- **Database:** MySQL
- **Architecture:** Controller tipis (Thin Controllers), FormRequest validation, Eloquent ORM, API Resources (`JsonResource`)
- **Testing:** PHPUnit (Unit & Feature / Integration Tests)

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (mengikuti referensi desain UI Dicoding)
- **Data Fetching & Cache:** TanStack Query (React Query) & Axios
- **E2E Testing:** Playwright

---

## Struktur Direktori

```
TestDicoding/
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/VacancyController.php  # Thin RESTful controller
│   │   │   ├── Requests/
│   │   │   │   ├── StoreVacancyRequest.php           # Validasi pembuatan lowongan
│   │   │   │   └── UpdateVacancyRequest.php          # Validasi pembaruan lowongan
│   │   │   └── Resources/
│   │   │       └── VacancyResource.php               # Standarisasi JSON API response
│   │   └── Models/
│   │       └── Vacancy.php                           # Eloquent Model dengan cast & scope
│   ├── database/
│   │   ├── factories/VacancyFactory.php              # Factory untuk mock data & testing
│   │   ├── migrations/2026_10_10_101107_create_vacancies_table.php
│   │   └── seeders/VacancySeeder.php                 # Seeder data awal lowongan
│   ├── routes/api.php                                # Route apiResource('vacancies', ...)
│   └── tests/
│       ├── Feature/VacancyApiTest.php                # 11 integration tests (CRUD & edge cases)
│       └── Unit/VacancyModelTest.php                 # Unit tests model & casts
│
└── frontend/
    ├── e2e/
    │   └── vacancies.spec.ts                         # Playwright E2E User Journey tests
    ├── playwright.config.ts                          # Konfigurasi Playwright
    └── src/
        ├── app/
        │   ├── layout.tsx                            # Root layout dengan Font & Providers
        │   ├── page.tsx                              # Redirect ke /vacancies
        │   ├── vacancies/
        │   │   ├── page.tsx                          # Halaman List Lowongan + Debounced Search
        │   │   ├── [id]/
        │   │   │   ├── page.tsx                      # Halaman Detail Lowongan
        │   │   │   └── edit/page.tsx                 # Halaman Edit Lowongan
        │   │   └── create/page.tsx                   # Halaman Buat Lowongan
        │   ├── create/page.tsx                       # Alias route /create
        │   └── dashboard/page.tsx                    # Halaman Dashboard Lowongan Saya (CRUD)
        ├── components/
        │   ├── Navbar.tsx                            # Header navigasi sticky
        │   ├── Footer.tsx                            # Footer informasi Dicoding
        │   ├── JobCard.tsx                           # Reusable kartu lowongan
        │   ├── VacancyForm.tsx                       # Reusable form (Create & Edit)
        │   └── Providers.tsx                         # QueryClientProvider wrapper
        ├── hooks/
        │   ├── useVacancies.ts                       # React Query hooks (CRUD)
        │   └── useDebounce.ts                        # Debounce hook untuk pencarian
        ├── services/
        │   └── vacancyService.ts                     # Axios API client layer
        └── types/
            └── vacancy.ts                            # TypeScript interfaces & types
```

---

## Panduan Instalasi & Menjalankan Proyek

### 1. Prasyarat
- PHP >= 8.2 & Composer
- Node.js >= 18.x & npm
- MySQL Server

---

### 2. Setup Backend (Laravel)

1. Masuk ke direktori `backend`:
   ```bash
   cd backend
   ```

2. Salin environment file dan instal dependencies:
   ```bash
   cp .env.example .env
   composer install
   ```

3. Generate application key:
   ```bash
   php artisan key:generate
   ```

4. Konfigurasi kredensial database di `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=dicoding_jobs
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. Jalankan migrasi dan seeder:
   ```bash
   php artisan migrate --seed
   ```

6. Jalankan development server:
   ```bash
   php artisan serve
   ```
   *API backend akan berjalan di `http://localhost:8000`.*

---

### 3. Setup Frontend (Next.js)

1. Masuk ke direktori `frontend`:
   ```bash
   cd frontend
   ```

2. Instal dependencies:
   ```bash
   npm install
   ```

3. Periksa file `.env.local`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   ```

4. Jalankan server Next.js:
   ```bash
   npm run dev
   ```
   *Frontend akan berjalan di `http://localhost:3000`.*

---

## Menjalankan Pengujian (Testing)

### Backend Tests (PHPUnit)
Untuk menjalankan seluruh unit dan feature tests pada backend:
```bash
cd backend
php artisan test
```

Cakupan pengujian:
- **Unit Tests (`VacancyModelTest`):** Menguji casting tipe data, default value, dan business logic model.
- **Integration Tests (`VacancyApiTest`):**
  - `GET /api/vacancies` (Daftar lowongan & pencarian berdasarkan judul `?search=`)
  - `POST /api/vacancies` (Validasi store data, edge case missing fields & invalid enums)
  - `GET /api/vacancies/{id}` (Detail lowongan sukses & 404 Not Found)
  - `PUT /api/vacancies/{id}` (Pembaruan data lowongan)
  - `DELETE /api/vacancies/{id}` (Penghapusan lowongan)

---

### Frontend E2E Tests (Playwright)
Untuk menjalankan End-to-End user journey test:
```bash
cd frontend
npm run test:e2e
```
Atau dalam UI mode:
```bash
npx playwright test --ui
```

Cakupan skenario E2E (`e2e/vacancies.spec.ts`):
1. **User membuka halaman list lowongan** (`/vacancies`).
2. **User mencari lowongan pekerjaan** melalui input pencarian dengan auto-debounce.
3. **User mengklik Job Card** dan berhasil diarahkan ke halaman detail lowongan (`/vacancies/[id]`).

---

## Dokumentasi Endpoint RESTful API

| Method | Endpoint | Deskripsi | Query / Body Params |
|---|---|---|---|
| `GET` | `/api/vacancies` | Ambil semua daftar lowongan | `?search={keyword}` (opsional) |
| `POST` | `/api/vacancies` | Tambah lowongan baru | Request JSON (lihat skema) |
| `GET` | `/api/vacancies/{id}` | Ambil detail 1 lowongan | - |
| `PUT` | `/api/vacancies/{id}` | Perbarui data lowongan | Request JSON (sebagian / penuh) |
| `DELETE` | `/api/vacancies/{id}` | Hapus lowongan | - |

### Skema Data Vacancy (`POST /api/vacancies`)
```json
{
  "title": "Android Native Developer",
  "division": "Android Developer",
  "job_type": "Full-Time",
  "candidates_needed": 2,
  "active_until": "2026-12-31",
  "location": "Bandung",
  "is_remote": true,
  "description": "Membangun aplikasi mobile...",
  "min_salary": 8000000,
  "max_salary": 12000000,
  "is_salary_visible": true,
  "min_experience": "1-3 tahun"
}
```
