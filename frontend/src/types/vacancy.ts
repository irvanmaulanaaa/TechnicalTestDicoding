export type JobType = 'Full-Time' | 'Part-Time' | 'Kontrak' | 'Intern';

export type ExperienceOption =
  | 'Kurang dari 1 tahun'
  | '1-3 tahun'
  | '4-5 tahun'
  | '6-10 tahun'
  | 'Lebih dari 10 tahun';

export interface Vacancy {
  id: number;
  title: string;
  division: string;
  job_type: JobType;
  candidates_needed: number;
  active_until: string; 
  location: string;
  is_remote: boolean;
  description: string;
  min_salary: string | null;
  max_salary: string | null;
  is_salary_visible: boolean;
  min_experience: ExperienceOption;
  created_at: string;
  updated_at: string;
}

export interface VacancyListResponse {
  data: Vacancy[];
}

export interface VacancyDetailResponse {
  data: Vacancy;
}

export interface CreateVacancyPayload {
  title: string;
  division: string;
  job_type: JobType;
  candidates_needed: number;
  active_until: string;
  location: string;
  is_remote: boolean;
  description: string;
  min_salary?: number | null;
  max_salary?: number | null;
  is_salary_visible: boolean;
  min_experience: ExperienceOption;
}

export type UpdateVacancyPayload = Partial<CreateVacancyPayload>;
