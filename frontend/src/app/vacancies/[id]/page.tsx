'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useVacancy } from '@/hooks/useVacancies';

const formatRupiah = (angka: number | string) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(angka));
};

export default function VacancyDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading, isError } = useVacancy(id);

  const vacancy = data?.data;

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            <div className="animate-pulse flex items-start gap-5">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-20" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !vacancy) {
    return (
      <div className="bg-white min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Lowongan Tidak Ditemukan</h1>
          <p className="text-gray-500 mb-6 text-sm">
            Lowongan yang Anda cari mungkin sudah dihapus atau tidak tersedia.
          </p>
          <Link
            href="/vacancies"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#001b38] rounded-lg hover:opacity-90 transition-opacity"
          >
            Kembali ke Lowongan Kerja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-8">
          <div className="mb-6">
            <Link
              href="/vacancies"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#001b38] transition-colors font-medium group"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali
            </Link>
          </div>

          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-lg bg-[#001b38] flex items-center justify-center p-2 flex-shrink-0 shadow-xs">
              <Image
                src="/dicodinglogo1.png"
                alt="Dicoding Indonesia"
                width={60}
                height={60}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            <div className="flex-1 min-w-0">
              <h1
                className="text-2xl font-bold text-gray-900 leading-tight"
                data-testid="vacancy-detail-title"
              >
                {vacancy.title}
              </h1>

              <p className="text-xs text-gray-500 mt-1">
                Sektor Bisnis: <span className="text-gray-600">{vacancy.division || 'Technology'}</span>
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-xs text-gray-600">
                <span className="flex items-center gap-1.5 text-blue-600 font-medium hover:underline cursor-pointer">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Dicoding Indonesia
                </span>

                <span className="flex items-center gap-1.5 text-gray-600">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {vacancy.location} {vacancy.is_remote && '(Bisa Remote)'}
                </span>

                <span className="flex items-center gap-1.5 text-gray-600">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  50-100 Karyawan
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-16 space-y-8">
        <div>
          <span className="inline-block px-4 py-1 text-xs bg-blue-50 font-medium text-blue-500 border border-blue-400 rounded-full">
            {vacancy.job_type}
          </span>
        </div>

        <section className="space-y-3">
          <div 
            className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_strong]:font-semibold [&_h1]:text-lg [&_h1]:font-bold [&_h2]:text-base [&_h2]:font-bold"
            dangerouslySetInnerHTML={{ __html: vacancy.description || '' }}
          />
        </section>

        <section className="pt-8 mt-8 border-t border-gray-100 space-y-4">
          <h2 className="text-base font-bold text-gray-900">Informasi Tambahan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="font-semibold text-gray-900">Pengalaman bekerja</p>
              <p className="text-gray-600 mt-1">{vacancy.min_experience}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Kandidat yang dibutuhkan</p>
              <p className="text-gray-600 mt-1">{vacancy.candidates_needed} kandidat</p>
            </div>

            {vacancy.is_salary_visible && vacancy.min_salary && (
              <div>
                <p className="font-semibold text-gray-900">Gaji per bulan</p>
                <p className="text-gray-600 mt-1 font-medium">
                  {formatRupiah(vacancy.min_salary)}
                  {vacancy.max_salary ? ` - ${formatRupiah(vacancy.max_salary)}` : ''}
                </p>
              </div>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}
