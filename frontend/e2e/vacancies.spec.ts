import { test, expect } from '@playwright/test';

test.describe('Dicoding Jobs - Vacancy User Journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/vacancies**', async (route) => {
      const url = new URL(route.request().url());
      const search = url.searchParams.get('search');

      const mockVacancies = [
        {
          id: 1,
          title: 'Android Native Developer',
          division: 'Android Developer',
          job_type: 'Full-Time',
          candidates_needed: 2,
          active_until: '2026-12-31',
          location: 'Bandung',
          is_remote: true,
          description: 'Membangun aplikasi Android Dicoding menggunakan Kotlin dan Jetpack Compose.',
          min_salary: '8000000',
          max_salary: '12000000',
          is_salary_visible: true,
          min_experience: '1-3 tahun',
          created_at: '2026-10-10T00:00:00.000000Z',
          updated_at: '2026-10-10T00:00:00.000000Z',
        },
        {
          id: 2,
          title: 'Frontend Engineer (React / Next.js)',
          division: 'Frontend Developer',
          job_type: 'Full-Time',
          candidates_needed: 1,
          active_until: '2026-11-30',
          location: 'Jakarta',
          is_remote: false,
          description: 'Membangun antarmuka web modern dengan Next.js dan Tailwind CSS.',
          min_salary: '10000000',
          max_salary: '15000000',
          is_salary_visible: true,
          min_experience: '4-5 tahun',
          created_at: '2026-10-10T00:00:00.000000Z',
          updated_at: '2026-10-10T00:00:00.000000Z',
        },
      ];

      if (url.pathname.endsWith('/1')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ data: mockVacancies[0] }),
        });
      }

      if (search) {
        const filtered = mockVacancies.filter((v) =>
          v.title.toLowerCase().includes(search.toLowerCase())
        );
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ data: filtered }),
        });
      }

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: mockVacancies }),
      });
    });
  });

  test('Complete User Journey: List -> Search -> Detail', async ({ page }) => {
    // 1. User opens the vacancies list page
    await page.goto('/vacancies');

    // Verify page header and list title
    await expect(page.getByRole('heading', { name: 'Temukan lowongan yang' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Daftar Pekerjaan Terbaru' })).toBeVisible();

    // Verify job cards are loaded
    const jobCards = page.locator('[data-testid="job-card"]');
    await expect(jobCards).toHaveCount(2);
    await expect(page.getByText('Android Native Developer')).toBeVisible();
    await expect(page.getByText('Frontend Engineer (React / Next.js)')).toBeVisible();

    // 2. User searches a job by title using the search bar
    const searchInput = page.locator('#search-input');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('Android');

    // Debounced search triggers, header changes to "Hasil Pencarian"
    await expect(page.getByRole('heading', { name: 'Hasil Pencarian' })).toBeVisible();
    await expect(page.getByText('Android Native Developer')).toBeVisible();
    await expect(page.getByText('Frontend Engineer (React / Next.js)')).not.toBeVisible();

    // 3. User clicks on a Job Card and successfully views the vacancy details page
    await page.getByText('Android Native Developer').click();

    // Verify navigation to detail page
    await expect(page).toHaveURL(/\/vacancies\/1$/);
    await expect(page.locator('[data-testid="vacancy-detail-title"]')).toHaveText(
      'Android Native Developer'
    );
    await expect(page.getByText('Dicoding Indonesia')).toBeVisible();
    await expect(page.getByText('Bandung (Bisa Remote)')).toBeVisible();
    await expect(
      page.getByText('Membangun aplikasi Android Dicoding menggunakan Kotlin dan Jetpack Compose.')
    ).toBeVisible();
    await expect(page.getByText('1-3 tahun')).toBeVisible();
  });
});
