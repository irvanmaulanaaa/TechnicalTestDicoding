import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { vacancyService } from '@/services/vacancyService';
import type { CreateVacancyPayload, UpdateVacancyPayload } from '@/types/vacancy';

export const VACANCY_QUERY_KEYS = {
  all: ['vacancies'] as const,
  list: (search?: string) => ['vacancies', 'list', search ?? ''] as const,
  detail: (id: number | string) => ['vacancies', 'detail', id] as const,
};

/**
 * Fetch all vacancies, optionally filtered by search term.
 */
export function useVacancies(search?: string) {
  return useQuery({
    queryKey: VACANCY_QUERY_KEYS.list(search),
    queryFn: () => vacancyService.getAll(search),
  });
}

/**
 * Fetch a single vacancy by ID.
 */
export function useVacancy(id: number | string) {
  return useQuery({
    queryKey: VACANCY_QUERY_KEYS.detail(id),
    queryFn: () => vacancyService.getById(id),
    enabled: !!id,
  });
}

/**
 * Mutation to create a new vacancy.
 */
export function useCreateVacancy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateVacancyPayload) => vacancyService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VACANCY_QUERY_KEYS.all });
    },
  });
}

/**
 * Mutation to update an existing vacancy.
 */
export function useUpdateVacancy(id: number | string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateVacancyPayload) => vacancyService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VACANCY_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: VACANCY_QUERY_KEYS.detail(id) });
    },
  });
}

/**
 * Mutation to delete a vacancy.
 */
export function useDeleteVacancy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => vacancyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VACANCY_QUERY_KEYS.all });
    },
  });
}
