'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useVacancy } from '@/hooks/useVacancies';
import VacancyForm from '@/components/VacancyForm';

export default function EditVacancyPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading, isError } = useVacancy(id);

  const vacancy = data?.data;

  if (isLoading) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
          <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="h-10 bg-gray-200 rounded w-full" />
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="h-10 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !vacancy) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="bg-white rounded-xl border border-gray-200 p-12">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Lowongan Tidak Ditemukan</h1>
          <p className="text-gray-500 mb-6 text-sm">
            Lowongan yang ingin Anda ubah tidak ditemukan.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#2D3E50] rounded-lg hover:bg-[#1f2b38] transition-colors"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return <VacancyForm mode="edit" initialData={vacancy} />;
}
