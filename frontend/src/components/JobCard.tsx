import Image from 'next/image';
import Link from 'next/link';
import type { Vacancy } from '@/types/vacancy';
import { formatDateId } from '@/lib/utils';

interface JobCardProps {
  vacancy: Vacancy;
}

export default function JobCard({ vacancy }: JobCardProps) {
  return (
    <Link
      href={`/vacancies/${vacancy.id}`}
      className="block group"
      data-testid="job-card"
    >
      <article className="bg-white rounded-lg border border-gray-200 p-5 hover:border-gray-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div
            className="flex-shrink-0 w-14 h-14 rounded-md border border-gray-100 bg-[#001b38] flex items-center justify-center p-1.5 select-none shadow-xs"
            aria-label="Company logo"
          >
            <Image
              src="/dicodinglogo1.png"
              alt="Dicoding logo"
              width={56}
              height={56}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#2D3E50] transition-colors leading-snug">
              {vacancy.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-gray-500">
              <span className="flex items-center gap-1 font-medium text-gray-600">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Dicoding Indonesia
              </span>

              <span className="text-gray-500">{vacancy.job_type}</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {vacancy.location}
              </span>

              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {vacancy.min_experience}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 text-left sm:text-right text-xs text-gray-400 space-y-1">
          <p>Dibuat pada {formatDateId(vacancy.created_at)}</p>
          <p className="text-red-500">
            Lamar sebelum {formatDateId(vacancy.active_until)}
          </p>
        </div>
      </article>
    </Link>
  );
}
