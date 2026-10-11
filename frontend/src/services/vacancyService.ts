import axios from 'axios';
import type {
  CreateVacancyPayload,
  UpdateVacancyPayload,
  VacancyDetailResponse,
  VacancyListResponse,
} from '@/types/vacancy';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const vacancyService = {
  /**
   * Fetch all vacancies with optional title search.
   */
  getAll: async (search?: string): Promise<VacancyListResponse> => {
    const params = search ? { search } : {};
    const { data } = await api.get<VacancyListResponse>('/vacancies', { params });
    return data;
  },

  /**
   * Fetch a single vacancy by ID.
   */
  getById: async (id: number | string): Promise<VacancyDetailResponse> => {
    const { data } = await api.get<VacancyDetailResponse>(`/vacancies/${id}`);
    return data;
  },

  /**
   * Create a new vacancy.
   */
  create: async (payload: CreateVacancyPayload): Promise<VacancyDetailResponse> => {
    const { data } = await api.post<VacancyDetailResponse>('/vacancies', payload);
    return data;
  },

  /**
   * Update an existing vacancy by ID.
   */
  update: async (id: number | string, payload: UpdateVacancyPayload): Promise<VacancyDetailResponse> => {
    const { data } = await api.put<VacancyDetailResponse>(`/vacancies/${id}`, payload);
    return data;
  },

  /**
   * Delete a vacancy by ID.
   */
  delete: async (id: number | string): Promise<void> => {
    await api.delete(`/vacancies/${id}`);
  },
};
