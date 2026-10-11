<?php

namespace Database\Seeders;

use App\Models\Vacancy;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $vacancies = [
            [
                'title'             => 'Product Engineer',
                'division'          => 'Technology',
                'job_type'          => 'Full-Time',
                'candidates_needed' => 1,
                'active_until'      => '2026-12-30',
                'location'          => 'Bandung',
                'is_remote'         => false,
                'description'       => "Sebagai Product Engineer, Anda akan berpartisipasi dalam proses pembangunan aplikasi dan platform pembelajaran yang sedang dibangun di Dicoding Indonesia. Anda diharapkan mampu bekerja mandiri maupun kolaboratif dalam tim produk dan engineering.\n\nResponsibilities\n• Berkolaborasi dengan product manager dan desainer UI/UX dalam menganalisis kebutuhan fitur.\n• Mengembangkan dan mengelola platform dicoding.com menggunakan arsitektur modern.\n• Memastikan performa, keandalan, dan skalabilitas seluruh layanan sistem.\n• Menulis kode yang bersih, terdokumentasi dengan baik, dan mudah diuji (Clean Code & TDD).\n\nRequirements\n• Memiliki pengalaman membangun aplikasi web modern (Next.js / React / Laravel).\n• Memahami prinsip arsitektur RESTful API, database relational, dan CI/CD.\n• Terbiasa menggunakan Git version control dan sistem operasi berbasis Unix/Linux.\n• Memiliki mindset berkembang (growth mindset) dan antusiasme belajar hal baru.",
                'min_salary'        => 8000000,
                'max_salary'        => 14000000,
                'is_salary_visible' => true,
                'min_experience'    => '1-3 tahun',
            ],
            [
                'title'             => 'Android Developer',
                'division'          => 'Mobile Development',
                'job_type'          => 'Full-Time',
                'candidates_needed' => 2,
                'active_until'      => '2026-12-30',
                'location'          => 'Bandung',
                'is_remote'         => true,
                'description'       => "Kami mencari Android Developer berpengalaman untuk mengembangkan dan memelihara aplikasi mobile Dicoding agar memberikan pengalaman belajar terbaik bagi ratusan ribu developer di Indonesia.\n\nResponsibilities\n• Merancang, membangun, dan memelihara aplikasi Android Dicoding native menggunakan Kotlin.\n• Menerapkan best practice arsitektur Android modern (MVVM, Clean Architecture, Jetpack Compose).\n• Mengintegrasikan aplikasi dengan RESTful API backend.\n• Melakukan profiling performa, unit testing, dan fixing bug secara berkala.\n\nRequirements\n• Pengalaman minimal 3-5 tahun dalam pengembangan aplikasi native Android (Kotlin).\n• Menguasai Jetpack Compose, Coroutines, Flow, dan Dependency Injection (Hilt/Koin).\n• Memahami unit test & UI test di ekosistem Android.\n• Portofolio aplikasi yang telah dipublikasikan di Google Play Store menjadi nilai tambah.",
                'min_salary'        => 10000000,
                'max_salary'        => 18000000,
                'is_salary_visible' => true,
                'min_experience'    => '4-5 tahun',
            ],
            [
                'title'             => 'iOS Developer',
                'division'          => 'Mobile Development',
                'job_type'          => 'Full-Time',
                'candidates_needed' => 1,
                'active_until'      => '2026-12-30',
                'location'          => 'Bandung',
                'is_remote'         => true,
                'description'       => "Bergabunglah dengan tim Mobile Dicoding untuk membangun aplikasi iOS native yang intuitif, cepat, dan elegan bagi seluruh pengguna ekosistem Dicoding di platform Apple.\n\nResponsibilities\n• Mengembangkan fitur baru pada aplikasi iOS Dicoding menggunakan Swift dan SwiftUI.\n• Berkolaborasi dengan tim backend dalam mendesain endpoint API yang efisien.\n• Menjaga konsistensi antarmuka pengguna sesuai Apple Human Interface Guidelines.\n• Memastikan kualitas aplikasi melalui automated testing dan code review rutin.\n\nRequirements\n• Pengalaman 1-3 tahun mengembangkan aplikasi iOS dengan Swift.\n• Memahami framework SwiftUI / UIKit dan prinsip pemrograman reaktif (Combine).\n• Berpengalaman dengan App Store deployment process & TestFlight.\n• Memiliki ketelitian tinggi terhadap detail UI dan animasi mikro.",
                'min_salary'        => 9000000,
                'max_salary'        => 15000000,
                'is_salary_visible' => true,
                'min_experience'    => '1-3 tahun',
            ],
            [
                'title'             => 'Code Reviewer',
                'division'          => 'Academy & Learning',
                'job_type'          => 'Full-Time',
                'candidates_needed' => 3,
                'active_until'      => '2026-12-30',
                'location'          => 'Bandung',
                'is_remote'         => true,
                'description'       => "Sebagai Code Reviewer, Anda memegang peranan krusial dalam memeriksa submission proyek siswa di Dicoding Academy, memberikan feedback teknis konstruktif, dan membimbing calon talenta digital Indonesia.\n\nResponsibilities\n• Meninjau submission kode siswa Dicoding Academy secara teliti sesuai rubrik penilaian kelas.\n• Memberikan ulasan kode yang mendidik, konstruktif, serta memberikan saran perbaikan arsitektur.\n• Berkolaborasi dengan tim kurikulum untuk mengidentifikasi materi yang sering menjadi kendala siswa.\n• Menjaga target SLA (Service Level Agreement) review tetap prima.\n\nRequirements\n• Telah lulus kelas peminatan terkait di Dicoding (Web / Android / iOS / Cloud / ML).\n• Menguasai fundamental pemrograman, struktur data, dan clean code principles.\n• Memiliki kemampuan komunikasi tertulis yang empati, jelas, dan edukatif.\n• Terbuka untuk fresh graduate atau developer pemula dengan portofolio yang baik.",
                'min_salary'        => 5000000,
                'max_salary'        => 7500000,
                'is_salary_visible' => true,
                'min_experience'    => 'Kurang dari 1 tahun',
            ],
            [
                'title'             => 'Frontend Engineer (React / Next.js)',
                'division'          => 'Technology',
                'job_type'          => 'Full-Time',
                'candidates_needed' => 2,
                'active_until'      => '2026-11-30',
                'location'          => 'Jakarta',
                'is_remote'         => false,
                'description'       => "Bertanggung jawab untuk merancang dan mengimplementasikan antarmuka web modern yang responsif, aksesibel, dan cepat menggunakan Next.js App Router dan Tailwind CSS.\n\nResponsibilities\n• Mengembangkan modul frontend modern yang responsif di berbagai perangkat.\n• Mengoptimalkan Core Web Vitals, waktu rendering, dan SEO teknis platform.\n• Menerapkan state management yang efisien dan integrasi data fetching (TanStack Query).\n\nRequirements\n• Kemampuan mendalam pada TypeScript, React, Next.js, dan Tailwind CSS.\n• Pemahaman solid mengenai Server Components, Client Components, dan Caching.\n• Pengalaman menulis pengujian unit/E2E (Jest / Vitest / Playwright).",
                'min_salary'        => 9000000,
                'max_salary'        => 16000000,
                'is_salary_visible' => true,
                'min_experience'    => '1-3 tahun',
            ],
            [
                'title'             => 'Backend Engineer (Laravel)',
                'division'          => 'Technology',
                'job_type'          => 'Full-Time',
                'candidates_needed' => 1,
                'active_until'      => '2026-12-15',
                'location'          => 'Bandung',
                'is_remote'         => false,
                'description'       => "Membangun dan merawat RESTful API yang aman, berkinerja tinggi, dan scalable menggunakan ekosistem Laravel 11 dan database MySQL.\n\nResponsibilities\n• Mendesain skema database relasional yang teroptimasi dan efisien.\n• Mengembangkan RESTful API dengan standardisasi Laravel API Resources dan FormRequests.\n• Melakukan profiling query Eloquent dan caching menggunakan Redis.\n\nRequirements\n• Menguasai PHP 8.2+, Laravel 10/11, dan MySQL.\n• Berpengalaman dengan unit/feature testing menggunakan PHPUnit atau Pest.\n• Pemahaman mengenai queue, background jobs, dan microservices adalah nilai tambah.",
                'min_salary'        => 9500000,
                'max_salary'        => 16500000,
                'is_salary_visible' => true,
                'min_experience'    => '1-3 tahun',
            ],
        ];

        foreach ($vacancies as $data) {
            Vacancy::create($data);
        }
    }
}
