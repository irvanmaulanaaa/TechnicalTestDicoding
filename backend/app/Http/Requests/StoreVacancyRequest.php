<?php

namespace App\Http\Requests;

use App\Models\Vacancy;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreVacancyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'             => ['required', 'string', 'max:255'],
            'position'          => ['required', 'string', 'max:255'],
            'job_type'          => ['required', Rule::in(Vacancy::JOB_TYPES)],
            'candidates_needed' => ['required', 'integer', 'min:1'],
            'active_until'      => ['required', 'date', 'after:today'],
            'location'          => ['required', 'string', 'max:255'],
            'is_remote'         => ['sometimes', 'boolean'],
            'description'       => ['required', 'string'],
            'min_salary'        => ['nullable', 'numeric', 'min:0'],
            'max_salary'        => ['nullable', 'numeric', 'min:0', 'gte:min_salary'],
            'is_salary_visible' => ['sometimes', 'boolean'],
            'min_experience'    => ['required', Rule::in(Vacancy::EXPERIENCE_OPTIONS)],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required'             => 'Judul lowongan wajib diisi.',
            'position.required'          => 'Posisi wajib diisi.',
            'job_type.required'          => 'Tipe pekerjaan wajib dipilih.',
            'job_type.in'                => 'Tipe pekerjaan tidak valid.',
            'candidates_needed.required' => 'Jumlah kandidat wajib diisi.',
            'candidates_needed.min'      => 'Jumlah kandidat minimal 1.',
            'active_until.required'      => 'Aktif hingga wajib diisi.',
            'active_until.date'          => 'Aktif hingga harus berupa tanggal yang valid.',
            'active_until.after'         => 'Aktif hingga harus setelah hari ini.',
            'location.required'          => 'Lokasi wajib diisi.',
            'description.required'       => 'Deskripsi wajib diisi.',
            'max_salary.gte'             => 'Gaji maksimal harus lebih besar atau sama dengan gaji minimal.',
            'min_experience.required'    => 'Pengalaman minimal wajib dipilih.',
            'min_experience.in'          => 'Pilihan pengalaman tidak valid.',
        ];
    }
}
