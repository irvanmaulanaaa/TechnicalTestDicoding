'use client';

import { useState } from 'react';
import Image from 'next/image';
import JobCard from '@/components/JobCard';
import { useVacancies } from '@/hooks/useVacancies';
import { useDebounce } from '@/hooks/useDebounce';

export default function VacanciesPage() {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 400);
  const { data, isLoading, isError } = useVacancies(debouncedSearch || undefined);

  const vacancies = data?.data ?? [];
  const isSearching = !!debouncedSearch;

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-[#1a1a1a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex items-center justify-between gap-8">
          <div>
            <p className="text-blue-400 text-sm font-semibold mb-2 tracking-wide">
              Dicoding Jobs
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              Temukan lowongan yang
              <br />
              cocok untuk kamu
            </h1>
          </div>

          <div className="hidden md:flex items-center flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border border-gray-700/60">
              <Image
                src="/dicoding.jpg"
                alt="Dicoding Jobs"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {isSearching ? 'Hasil Pencarian' : 'Daftar Pekerjaan Terbaru'}
          </h2>

          {/* Search Box */}
          <div className="relative w-full sm:w-[340px] md:w-[380px] flex-shrink-0">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="search-input"
              type="text"
              placeholder="Pekerjaan apa yang sedang kamu cari?"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent bg-white shadow-xs placeholder:text-gray-400"
              aria-label="Cari lowongan kerja"
            />
          </div>
        </div>

        {/* Job Cards List (Separate Cards) */}
        <div className="space-y-4">
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg border border-gray-200 p-5 animate-pulse flex items-center gap-4"
                >
                  <div className="w-14 h-14 bg-gray-200 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="bg-white rounded-lg border border-red-200 p-8 text-center text-red-500 shadow-xs">
              <p className="font-medium">Gagal memuat lowongan.</p>
              <p className="text-sm mt-1">Pastikan backend Laravel sudah berjalan di port 8000.</p>
            </div>
          )}

          {!isLoading && !isError && vacancies.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-400 shadow-xs">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-medium">
                {isSearching ? `Tidak ada lowongan untuk "${debouncedSearch}"` : 'Belum ada lowongan tersedia.'}
              </p>
            </div>
          )}

          {!isLoading &&
            !isError &&
            vacancies.map((vacancy) => (
              <JobCard key={vacancy.id} vacancy={vacancy} />
            ))}
        </div>
      </section>
    </>
  );
}
