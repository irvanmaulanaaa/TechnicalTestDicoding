'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-4 items-start">
          <div>
            <Image
              src="/dicodinglogo.png"
              alt="Dicoding Indonesia"
              width={140}
              height={36}
              className="h-8 w-auto object-contain"
            />
          </div>

          <div className="text-sm text-gray-500 leading-relaxed">
            <p className="font-semibold text-gray-700 mb-1">Dicoding Space</p>
            <p>Jl. Batik Kumeli No.50, Sukaluyu,</p>
            <p>Kec. Cibeunying Kaler, Kota Bandung,
            <br />
            Jawa Barat 40123</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          © 2026 Dicoding Indonesia. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
