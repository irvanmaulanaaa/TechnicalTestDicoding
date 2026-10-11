'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useCreateVacancy, useUpdateVacancy } from '@/hooks/useVacancies';
import type { JobType, ExperienceOption, Vacancy, CreateVacancyPayload } from '@/types/vacancy';

import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface VacancyFormProps {
  initialData?: Vacancy;
  mode?: 'create' | 'edit';
}

const JOB_TYPES: JobType[] = ['Full-Time', 'Part-Time', 'Kontrak', 'Intern'];

const EXPERIENCE_OPTIONS: ExperienceOption[] = [
  'Kurang dari 1 tahun',
  '1-3 tahun',
  '4-5 tahun',
  '6-10 tahun',
  'Lebih dari 10 tahun',
];

const SECTORS = [
  'Technology',
  'Product & Design',
  'Marketing & Sales',
  'Business Development',
  'Operations',
  'Human Resources',
  'Finance',
  'Lainnya'
];

const LOCATIONS = [
  'Bandung',
  'Jakarta',
  'Surabaya',
  'Yogyakarta',
  'Semarang',
  'Medan',
  'Bali',
  'Lainnya',
];

const DEFAULT_DESCRIPTION_TEMPLATE = `
<p>Deskripsi Pekerjaan<br>
Sebagai [Posisi Lowongan], Anda akan berpartisipasi dalam proses pembangunan aplikasi yang sedang dibangun dalam perusahaan [Nama Perusahaan]. Anda juga diharapkan mampu bekerja dalam tim.</p>
<p><br></p>
<p>Tanggung Jawab</p>
<ul>
  <li>Membuat atau memodifikasi program yang sudah ada.</li>
  <li>Bertanggung jawab dalam mengelola program.</li>
</ul>
<p><br></p>
<p>Kualifikasi</p>
<ul>
  <li>Memahami konsep dasar pemrograman dan arsitektur software.</li>
  <li>Berpengalaman dengan teknologi terkait.</li>
</ul>
`;

const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ list: 'bullet' }],
    ['link', 'image', 'code-block'],
  ],
};

export default function VacancyForm({ initialData, mode = 'create' }: VacancyFormProps) {
  const router = useRouter();
  const createMutation = useCreateVacancy();
  const updateMutation = useUpdateVacancy(initialData?.id ?? 0);

  const [title, setTitle] = useState(initialData?.title ?? '');
  const [division, setDivision] = useState(initialData?.division ?? '');
  const [jobType, setJobType] = useState<JobType>(initialData?.job_type ?? 'Full-Time');
  const [candidatesNeeded, setCandidatesNeeded] = useState<number | ''>(
    initialData?.candidates_needed ?? 1
  );
  const [activeUntil, setActiveUntil] = useState(
    initialData?.active_until ? initialData.active_until.substring(0, 10) : ''
  );
  const [location, setLocation] = useState(initialData?.location ?? '');
  const [isRemote, setIsRemote] = useState(initialData?.is_remote ?? false);
  
  const [description, setDescription] = useState(
    initialData?.description ?? DEFAULT_DESCRIPTION_TEMPLATE
  );
  
  const [minSalary, setMinSalary] = useState<string>(
    initialData?.min_salary ? String(initialData.min_salary) : ''
  );
  const [maxSalary, setMaxSalary] = useState<string>(
    initialData?.max_salary ? String(initialData.max_salary) : ''
  );
  const [isSalaryVisible, setIsSalaryVisible] = useState(
    initialData?.is_salary_visible ?? false
  );
  const [minExperience, setMinExperience] = useState<ExperienceOption>(
    initialData?.min_experience ?? '1-3 tahun'
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Judul lowongan wajib diisi';
    if (!division.trim()) errs.division = 'Divisi wajib dipilih';
    if (!jobType) errs.job_type = 'Tipe pekerjaan wajib dipilih';
    if (!candidatesNeeded || Number(candidatesNeeded) < 1)
      errs.candidates_needed = 'Jumlah kandidat minimal 1';
    if (!activeUntil) errs.active_until = 'Batas aktif wajib diisi';
    if (!location.trim()) errs.location = 'Lokasi wajib dipilih';
    
    if (!description || description === '<p><br></p>') {
      errs.description = 'Deskripsi pekerjaan wajib diisi';
    }
    
    if (!minExperience) errs.min_experience = 'Pengalaman kerja wajib dipilih';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const payload: CreateVacancyPayload = {
      title,
      division,
      job_type: jobType,
      candidates_needed: Number(candidatesNeeded),
      active_until: activeUntil,
      location,
      is_remote: isRemote,
      description,
      min_salary: minSalary ? Number(minSalary) : null,
      max_salary: maxSalary ? Number(maxSalary) : null,
      is_salary_visible: isSalaryVisible,
      min_experience: minExperience,
    };

    try {
      if (mode === 'edit' && initialData) {
        await updateMutation.mutateAsync(payload);
      } else {
        await createMutation.mutateAsync(payload);
      }
      router.push('/dashboard');
    } catch (err: any) {
      const responseErrors = err?.response?.data?.errors;
      if (responseErrors) {
        const formatted: Record<string, string> = {};
        Object.keys(responseErrors).forEach((key) => {
          formatted[key] = responseErrors[key][0];
        });
        setErrors(formatted);
      } else {
        alert('Terjadi kesalahan saat menyimpan lowongan. Silakan coba lagi.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-[#1a1a1a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
              {mode === 'edit' ? 'Ubah lowongan pekerjaan' : 'Buat lowongan pekerjaan'}
            </h1>
            <p className="text-sm text-gray-300 mt-2 max-w-xl">
              Dicoding Jobs menghubungkan industri dengan talenta yang tepat. Mencari tim baru tidak harus melelahkan dan boros biaya.
            </p>
          </div>
        </div>
      </section>

      <main suppressHydrationWarning className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <form suppressHydrationWarning onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-8">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-1">
              Judul lowongan <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              placeholder="Masukkan judul lowongan"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">Contoh: Android Native Developer</p>
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="division" className="block text-sm font-semibold text-gray-900 mb-1">
              Sektor Bisnis <span className="text-red-500">*</span>
            </label>
            <select
              id="division"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent outline-none bg-white"
            >
              <option value="">Pilih sektor bisnis</option>
              {SECTORS.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
            {errors.position && <p className="text-xs text-red-500 mt-1">{errors.position}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Tipe pekerjaan <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {JOB_TYPES.map((type) => (
                <label key={type} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="job_type"
                    value={type}
                    checked={jobType === type}
                    onChange={() => setJobType(type)}
                    className="w-4 h-4 text-[#2D3E50] focus:ring-[#2D3E50] border-gray-300"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
            {errors.job_type && <p className="text-xs text-red-500 mt-1">{errors.job_type}</p>}
          </div>

          <div>
            <label htmlFor="candidates_needed" className="block text-sm font-semibold text-gray-900 mb-1">
              Kandidat yang dibutuhkan <span className="text-red-500">*</span>
            </label>
            <input
              id="candidates_needed"
              type="number"
              min="1"
              placeholder="Masukkan jumlah kandidat yang dibutuhkan"
              value={candidatesNeeded}
              onChange={(e) => setCandidatesNeeded(e.target.value ? Number(e.target.value) : '')}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent outline-none"
            />
            {errors.candidates_needed && (
              <p className="text-xs text-red-500 mt-1">{errors.candidates_needed}</p>
            )}
          </div>

          <div>
            <label htmlFor="active_until" className="block text-sm font-semibold text-gray-900 mb-1">
              Aktif hingga <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="active_until"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={activeUntil}
                onChange={(e) => setActiveUntil(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent outline-none bg-white"
              />
            </div>
            {errors.active_until && <p className="text-xs text-red-500 mt-1">{errors.active_until}</p>}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-900 mb-1">
              Lokasi <span className="text-red-500">*</span>
            </label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent outline-none bg-white mb-2"
            >
              <option value="">Pilih lokasi</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isRemote}
                onChange={(e) => setIsRemote(e.target.checked)}
                className="w-4 h-4 rounded text-[#2D3E50] focus:ring-[#2D3E50] border-gray-300"
              />
              <span>Bisa remote</span>
            </label>
            {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <div className="bg-white [&_.ql-toolbar]:rounded-t-lg [&_.ql-container]:rounded-b-lg [&_.ql-toolbar]:border-gray-300 [&_.ql-container]:border-gray-300 [&_.ql-editor]:min-h-[200px] [&_.ql-editor]:text-sm [&_.ql-editor]:font-sans">
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                modules={quillModules}
                placeholder="Tuliskan deskripsi pekerjaan di sini..."
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Anda bisa mengubah templat yang telah disediakan di atas.
            </p>
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Rentang gaji per bulan
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center flex-1 w-full border border-gray-300 rounded-lg overflow-hidden">
                <span className="px-3.5 py-2.5 bg-gray-50 text-gray-500 text-sm border-r border-gray-300">
                  Rp
                </span>
                <input
                  type="number"
                  placeholder="Minimum"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  className="w-full px-3 py-2 text-sm outline-none"
                />
              </div>

              <span className="text-gray-400 font-bold">-</span>

              <div className="flex items-center flex-1 w-full border border-gray-300 rounded-lg overflow-hidden">
                <span className="px-3.5 py-2.5 bg-gray-50 text-gray-500 text-sm border-r border-gray-300">
                  Rp
                </span>
                <input
                  type="number"
                  placeholder="Maksimum (opsional)"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  className="w-full px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Anda tidak perlu mengisi kolom "Maksimum" jika yang dimasukkan adalah gaji pokok.
            </p>

            <div className="mt-3 flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSalaryVisible}
                  onChange={(e) => setIsSalaryVisible(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D3E50]"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">Tampilkan gaji</span>
              </label>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Gaji akan ditampilkan di lowongan pekerjaan dan dapat dilihat oleh kandidat.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Minimum pengalaman bekerja <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {EXPERIENCE_OPTIONS.map((exp) => (
                <label key={exp} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="min_experience"
                    value={exp}
                    checked={minExperience === exp}
                    onChange={() => setMinExperience(exp)}
                    className="w-4 h-4 text-[#2D3E50] focus:ring-[#2D3E50] border-gray-300"
                  />
                  <span>{exp}</span>
                </label>
              ))}
            </div>
            {errors.min_experience && (
              <p className="text-xs text-red-500 mt-1">{errors.min_experience}</p>
            )}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSubmitting}
              data-testid="submit-vacancy-button"
              className="px-6 py-2.5 text-sm font-medium text-white bg-[#2D3E50] hover:bg-[#1f2b38] rounded-lg transition-colors shadow-sm disabled:opacity-50"
            >
              {isSubmitting
                ? 'Menyimpan...'
                : mode === 'edit'
                ? 'Simpan Perubahan'
                : 'Buat lowongan'}
            </button>
            <Link
              href="/dashboard"
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Batal
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}
