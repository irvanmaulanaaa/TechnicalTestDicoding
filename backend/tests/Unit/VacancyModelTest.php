<?php

namespace Tests\Unit;

use App\Models\Vacancy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VacancyModelTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_a_vacancy_with_valid_data(): void
    {
        $vacancy = Vacancy::factory()->create([
            'title'    => 'Android Developer',
            'job_type' => 'Full-Time',
        ]);

        $this->assertInstanceOf(Vacancy::class, $vacancy);
        $this->assertDatabaseHas('vacancies', [
            'title'    => 'Android Developer',
            'job_type' => 'Full-Time',
        ]);
    }

    /** @test */
    public function it_casts_boolean_fields_correctly(): void
    {
        $vacancy = Vacancy::factory()->create([
            'is_remote'         => true,
            'is_salary_visible' => false,
        ]);

        $this->assertTrue($vacancy->is_remote);
        $this->assertFalse($vacancy->is_salary_visible);
        $this->assertIsBool($vacancy->is_remote);
        $this->assertIsBool($vacancy->is_salary_visible);
    }

    /** @test */
    public function it_casts_active_until_as_date(): void
    {
        $vacancy = Vacancy::factory()->create([
            'active_until' => '2025-12-31',
        ]);

        $this->assertInstanceOf(\Illuminate\Support\Carbon::class, $vacancy->active_until);
        $this->assertEquals('2025-12-31', $vacancy->active_until->format('Y-m-d'));
    }

    /** @test */
    public function it_casts_candidates_needed_as_integer(): void
    {
        $vacancy = Vacancy::factory()->create(['candidates_needed' => 5]);

        $this->assertIsInt($vacancy->candidates_needed);
        $this->assertEquals(5, $vacancy->candidates_needed);
    }

    /** @test */
    public function it_has_fillable_fields_defined(): void
    {
        $fillable = [
            'title', 'division', 'job_type', 'candidates_needed', 'active_until',
            'location', 'is_remote', 'description', 'min_salary', 'max_salary',
            'is_salary_visible', 'min_experience',
        ];

        $vacancy = new Vacancy();
        $this->assertEquals($fillable, $vacancy->getFillable());
    }

    /** @test */
    public function it_allows_nullable_salary_fields(): void
    {
        $vacancy = Vacancy::factory()->create([
            'min_salary' => null,
            'max_salary' => null,
        ]);

        $this->assertNull($vacancy->min_salary);
        $this->assertNull($vacancy->max_salary);
        $this->assertDatabaseHas('vacancies', [
            'id'         => $vacancy->id,
            'min_salary' => null,
            'max_salary' => null,
        ]);
    }

    /** @test */
    public function it_has_correct_job_type_constants(): void
    {
        $this->assertEquals(['Full-Time', 'Part-Time', 'Kontrak', 'Intern'], Vacancy::JOB_TYPES);
    }

    /** @test */
    public function it_has_correct_experience_option_constants(): void
    {
        $expected = [
            'Kurang dari 1 tahun',
            '1-3 tahun',
            '4-5 tahun',
            '6-10 tahun',
            'Lebih dari 10 tahun',
        ];

        $this->assertEquals($expected, Vacancy::EXPERIENCE_OPTIONS);
    }
}
