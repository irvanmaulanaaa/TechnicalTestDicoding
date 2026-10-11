<?php

namespace Database\Factories;

use App\Models\Vacancy;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Vacancy>
 */
class VacancyFactory extends Factory
{
    protected $model = Vacancy::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $minSalary = $this->faker->numberBetween(500000, 100000000);

        return [
            'title'             => $this->faker->randomElement([
                'Product Engineer',
                'Android Developer',
                'iOS Developer',
                'Code Reviewer',
                'Frontend Engineer',
                'Backend Engineer',
                'Full Stack Developer',
                'DevOps Engineer',
                'UI/UX Designer',
                'Quality Assurance Engineer',
            ]),
            'division'          => $this->faker->randomElement([
                'Technology',
                'Mobile Development',
                'Academy & Learning',
                'Product Management',
                'Infrastructure',
            ]),
            'job_type'          => $this->faker->randomElement(Vacancy::JOB_TYPES),
            'candidates_needed' => $this->faker->numberBetween(1, 5),
            'active_until'      => $this->faker->dateTimeBetween('+1 month', '+3 months')->format('Y-m-d'),
            'location'          => $this->faker->randomElement(['Bandung', 'Jakarta', 'Surabaya', 'Yogyakarta', 'Bali']),
            'is_remote'         => $this->faker->boolean(40),
            'description'       => "Bertanggung jawab untuk membangun dan memelihara sistem aplikasi yang handal serta berpartisipasi dalam pengembangan platform Dicoding.\n\nResponsibilities\n• Mengembangkan fitur aplikasi baru dan memelihara modul yang sudah ada.\n• Berkolaborasi dengan tim produk dan engineering.\n• Menjaga kualitas kode melalui testing dan review berkala.\n\nRequirements\n• Memiliki pengalaman teknis yang relevan dengan posisi.\n• Memahami best practice software engineering dan Git.\n• Mampu berkomunikasi dan bekerja dalam tim dengan baik.",
            'min_salary'        => $minSalary,
            'max_salary'        => $minSalary + $this->faker->numberBetween(2000000, 8000000),
            'is_salary_visible' => $this->faker->boolean(70),
            'min_experience'    => $this->faker->randomElement(Vacancy::EXPERIENCE_OPTIONS),
        ];
    }
}
