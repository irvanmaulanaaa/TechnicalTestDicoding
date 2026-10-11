'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/vacancies', label: 'Lowongan Kerja' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center h-14 gap-8" role="navigation" aria-label="Main navigation">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-[#001b38] hover:opacity-80 transition-opacity"
            aria-label="Dicoding Jobs home"
          >
            <Image
              src="/dicoding.jpg"
              alt="Dicoding Jobs"
              width={32}
              height={32}
              className="w-8 h-8 rounded object-cover shadow-xs"
              priority
            />
            <span className="text-[#001b38]">Jobs</span>
          </Link>

          <ul className="flex items-center gap-6 list-none m-0 p-0">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      'text-sm font-medium transition-colors pb-1',
                      isActive
                        ? 'text-[#2D3E50] border-b-2 border-[#2D3E50]'
                        : 'text-gray-500 hover:text-[#2D3E50]',
                    ].join(' ')}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
