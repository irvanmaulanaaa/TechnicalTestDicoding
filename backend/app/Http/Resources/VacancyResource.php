<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VacancyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->id,
            'title'             => $this->title,
            'position'          => $this->position,
            'job_type'          => $this->job_type,
            'candidates_needed' => $this->candidates_needed,
            'active_until'      => $this->active_until?->format('Y-m-d'),
            'location'          => $this->location,
            'is_remote'         => $this->is_remote,
            'description'       => $this->description,
            'min_salary'        => $this->min_salary,
            'max_salary'        => $this->max_salary,
            'is_salary_visible' => $this->is_salary_visible,
            'min_experience'    => $this->min_experience,
            'created_at'        => $this->created_at?->toISOString(),
            'updated_at'        => $this->updated_at?->toISOString(),
        ];
    }
}
