import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Dicoding Jobs - Temukan Karier Impianmu',
    template: '%s | Dicoding Jobs',
  },
  description:
    'Platform lowongan kerja teknologi terpercaya dari Dicoding Indonesia. Temukan pekerjaan impianmu hari ini.',
  keywords: ['lowongan kerja', 'jobs', 'teknologi', 'dicoding', 'karier'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col bg-white">
            <Suspense fallback={<div className="h-14 bg-white border-b border-gray-200" />}>
              <Navbar />
            </Suspense>
            <Suspense fallback={<div className="flex-1 p-8 text-center text-gray-400">Memuat...</div>}>
              <main className="flex-1">{children}</main>
            </Suspense>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
