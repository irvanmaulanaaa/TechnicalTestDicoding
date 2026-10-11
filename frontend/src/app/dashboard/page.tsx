'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useVacancies, useDeleteVacancy } from '@/hooks/useVacancies';
import { formatDateId } from '@/lib/utils';
import type { Vacancy } from '@/types/vacancy';

export default function DashboardPage() {
  const { data, isLoading, isError } = useVacancies();
  const deleteMutation = useDeleteVacancy();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const vacancies = data?.data ?? [];

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      await deleteMutation.mutateAsync(id);
      setDeleteConfirmId(null);
    } catch (err) {
      alert('Gagal menghapus lowongan. Silakan coba lagi.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h2 className="text-base font-bold text-gray-800">Jobs</h2>
            </div>

            <nav className="space-y-1">
              <button
                type="button"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#2D3E50] bg-gray-100 transition-colors text-left"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Lowongan Saya
              </button>
            </nav>
          </div>
        </aside>

        <section className="md:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Lowongan Saya</h1>
            <Link
              href="/create"
              data-testid="create-vacancy-button"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#001b38] rounded-lg hover:bg-[#1f2b38] transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Buat lowongan
            </Link>
          </div>

          <div className="space-y-4">
            {isLoading && (
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
                      <div className="w-12 h-12 bg-gray-200 rounded" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isError && (
              <div className="bg-white rounded-xl border border-red-200 p-8 text-center text-red-500 shadow-sm">
                <p className="font-medium">Gagal memuat daftar lowongan.</p>
                <p className="text-sm mt-1">Pastikan backend API sedang aktif di port 8000.</p>
              </div>
            )}

            {!isLoading && !isError && vacancies.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500 shadow-sm">
                <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-800">Belum ada lowongan dibuat</p>
                <p className="text-sm text-gray-500 mt-1 mb-5">
                  Klik tombol di bawah untuk membuat lowongan pertama Anda.
                </p>
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#2D3E50] rounded-lg hover:bg-[#1f2b38] transition-colors"
                >
                  Buat Lowongan Sekarang
                </Link>
              </div>
            )}

            {!isLoading &&
              !isError &&
              vacancies.map((vacancy: Vacancy) => (
                <div
                  key={vacancy.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gray-300 transition-all"
                  data-testid={`dashboard-vacancy-${vacancy.id}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 shadow-xs">
                      <Image
                        src="/dicoding.jpg"
                        alt="Dicoding"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <Link
                        href={`/vacancies/${vacancy.id}`}
                        className="text-base font-semibold text-gray-900 hover:text-[#2D3E50] transition-colors"
                      >
                        {vacancy.title}
                      </Link>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          Dibuat: {formatDateId(vacancy.created_at)}
                        </span>

                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Aktif hingga: {formatDateId(vacancy.active_until)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Link
                      href={`/vacancies/${vacancy.id}/edit`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(vacancy.id)}
                      disabled={deletingId === vacancy.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors disabled:opacity-50"
                      data-testid={`delete-vacancy-${vacancy.id}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>

      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl animate-in fade-in">
            <h3 className="text-lg font-bold text-gray-900">Konfirmasi Hapus</h3>
            <p className="text-sm text-gray-600 mt-2">
              Apakah Anda yakin ingin menghapus lowongan ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={deletingId === deleteConfirmId}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {deletingId === deleteConfirmId ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
