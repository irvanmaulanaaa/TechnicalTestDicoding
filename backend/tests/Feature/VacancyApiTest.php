<?php

namespace Tests\Feature;

use App\Models\Vacancy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VacancyApiTest extends TestCase
{
    use RefreshDatabase;

    // ─────────────────────────────────────────────────────────────────────────
    // Helper
    // ─────────────────────────────────────────────────────────────────────────

    private function validPayload(array $overrides = []): array
    {
        return array_merge([
            'title'             => 'Backend Engineer',
            'division'          => 'Technology',
            'job_type'          => 'Full-Time',
            'candidates_needed' => 3,
            'active_until'      => now()->addMonths(2)->format('Y-m-d'),
            'location'          => 'Bandung, Indonesia',
            'is_remote'         => false,
            'description'       => 'We are looking for a backend engineer.',
            'min_salary'        => 5000000,
            'max_salary'        => 10000000,
            'is_salary_visible' => true,
            'min_experience'    => '1-3 tahun',
        ], $overrides);
    }


    /** @test */
    public function it_can_create_a_vacancy(): void
    {
        $payload = $this->validPayload();

        $response = $this->postJson('/api/vacancies', $payload);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'id', 'title', 'division', 'job_type', 'candidates_needed',
                    'active_until', 'location', 'is_remote', 'description',
                    'min_salary', 'max_salary', 'is_salary_visible',
                    'min_experience', 'created_at', 'updated_at',
                ],
            ])
            ->assertJsonPath('data.title', 'Backend Engineer')
            ->assertJsonPath('data.job_type', 'Full-Time');

        $this->assertDatabaseHas('vacancies', ['title' => 'Backend Engineer']);
    }

    /** @test */
    public function it_validates_required_fields_on_create(): void
    {
        $response = $this->postJson('/api/vacancies', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'title', 'division', 'job_type', 'candidates_needed',
                'active_until', 'location', 'description', 'min_experience',
            ]);
    }

    /** @test */
    public function it_validates_job_type_enum_on_create(): void
    {
        $payload = $this->validPayload(['job_type' => 'InvalidType']);

        $response = $this->postJson('/api/vacancies', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['job_type']);
    }

    /** @test */
    public function it_validates_active_until_must_be_future_date(): void
    {
        $payload = $this->validPayload(['active_until' => now()->subDay()->format('Y-m-d')]);

        $response = $this->postJson('/api/vacancies', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['active_until']);
    }

    /** @test */
    public function it_validates_max_salary_must_be_gte_min_salary(): void
    {
        $payload = $this->validPayload(['min_salary' => 10000000, 'max_salary' => 5000000]);

        $response = $this->postJson('/api/vacancies', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['max_salary']);
    }

    /** @test */
    public function it_accepts_nullable_salary_fields(): void
    {
        $payload = $this->validPayload(['min_salary' => null, 'max_salary' => null]);

        $response = $this->postJson('/api/vacancies', $payload);

        $response->assertStatus(201);
    }


    /** @test */
    public function it_can_list_all_vacancies(): void
    {
        Vacancy::factory()->count(3)->create();

        $response = $this->getJson('/api/vacancies');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id', 'title', 'division', 'job_type', 'candidates_needed',
                        'active_until', 'location', 'is_remote', 'description',
                        'min_salary', 'max_salary', 'is_salary_visible',
                        'min_experience', 'created_at', 'updated_at',
                    ],
                ],
            ]);

        $this->assertCount(3, $response->json('data'));
    }

    /** @test */
    public function it_returns_empty_array_when_no_vacancies_exist(): void
    {
        $response = $this->getJson('/api/vacancies');

        $response->assertStatus(200)
            ->assertJsonCount(0, 'data');
    }

    /** @test */
    public function it_can_search_vacancies_by_title(): void
    {
        Vacancy::factory()->create(['title' => 'Android Developer']);
        Vacancy::factory()->create(['title' => 'iOS Developer']);
        Vacancy::factory()->create(['title' => 'Backend Engineer']);

        $response = $this->getJson('/api/vacancies?search=Developer');

        $response->assertStatus(200);
        $this->assertCount(2, $response->json('data'));
    }

    /** @test */
    public function it_returns_empty_when_search_finds_no_results(): void
    {
        Vacancy::factory()->create(['title' => 'Android Developer']);

        $response = $this->getJson('/api/vacancies?search=NonExistentTitle12345');

        $response->assertStatus(200)
            ->assertJsonCount(0, 'data');
    }

    /** @test */
    public function it_can_show_a_single_vacancy(): void
    {
        $vacancy = Vacancy::factory()->create(['title' => 'Product Engineer']);

        $response = $this->getJson("/api/vacancies/{$vacancy->id}");

        $response->assertStatus(200)
            ->assertJsonPath('data.id', $vacancy->id)
            ->assertJsonPath('data.title', 'Product Engineer');
    }

    /** @test */
    public function it_returns_404_for_non_existent_vacancy(): void
    {
        $response = $this->getJson('/api/vacancies/99999');

        $response->assertStatus(404);
    }

    /** @test */
    public function it_can_update_a_vacancy(): void
    {
        $vacancy = Vacancy::factory()->create(['title' => 'Old Title']);

        $response = $this->putJson("/api/vacancies/{$vacancy->id}", ['title' => 'New Title']);

        $response->assertStatus(200)
            ->assertJsonPath('data.title', 'New Title');

        $this->assertDatabaseHas('vacancies', [
            'id'    => $vacancy->id,
            'title' => 'New Title',
        ]);
    }

    /** @test */
    public function it_validates_invalid_job_type_on_update(): void
    {
        $vacancy = Vacancy::factory()->create();

        $response = $this->putJson("/api/vacancies/{$vacancy->id}", ['job_type' => 'BadType']);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['job_type']);
    }


    /** @test */
    public function it_can_delete_a_vacancy(): void
    {
        $vacancy = Vacancy::factory()->create();

        $response = $this->deleteJson("/api/vacancies/{$vacancy->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['message' => 'Lowongan berhasil dihapus.']);

        $this->assertDatabaseMissing('vacancies', ['id' => $vacancy->id]);
    }

    /** @test */
    public function it_returns_404_when_deleting_non_existent_vacancy(): void
    {
        $response = $this->deleteJson('/api/vacancies/99999');

        $response->assertStatus(404);
    }
}
