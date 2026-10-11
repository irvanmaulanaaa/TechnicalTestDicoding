<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vacancy extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'division',
        'job_type',
        'candidates_needed',
        'active_until',
        'location',
        'is_remote',
        'description',
        'min_salary',
        'max_salary',
        'is_salary_visible',
        'min_experience',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'active_until'      => 'date',
        'is_remote'         => 'boolean',
        'is_salary_visible' => 'boolean',
        'min_salary'        => 'decimal:2',
        'max_salary'        => 'decimal:2',
        'candidates_needed' => 'integer',
    ];

    /**
     * Valid job type values.
     */
    public const JOB_TYPES = ['Full-Time', 'Part-Time', 'Kontrak', 'Intern'];

    /**
     * Valid minimum experience values.
     */
    public const EXPERIENCE_OPTIONS = [
        'Kurang dari 1 tahun',
        '1-3 tahun',
        '4-5 tahun',
        '6-10 tahun',
        'Lebih dari 10 tahun',
    ];
}
