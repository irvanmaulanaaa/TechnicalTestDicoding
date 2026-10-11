<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVacancyRequest;
use App\Http\Requests\UpdateVacancyRequest;
use App\Http\Resources\VacancyCollection;
use App\Http\Resources\VacancyResource;
use App\Models\Vacancy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VacancyController extends Controller
{
    /**
     * Display a listing of vacancies.
     * Supports ?search= query parameter to filter by title.
     */
    public function index(Request $request): VacancyCollection
    {
        $query = Vacancy::query()->latest();

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        return new VacancyCollection($query->get());
    }

    /**
     * Store a newly created vacancy in storage.
     */
    public function store(StoreVacancyRequest $request): JsonResponse
    {
        $vacancy = Vacancy::create($request->validated());

        return (new VacancyResource($vacancy))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified vacancy.
     */
    public function show(Vacancy $vacancy): VacancyResource
    {
        return new VacancyResource($vacancy);
    }

    /**
     * Update the specified vacancy in storage.
     */
    public function update(UpdateVacancyRequest $request, Vacancy $vacancy): VacancyResource
    {
        $vacancy->update($request->validated());

        return new VacancyResource($vacancy->fresh());
    }

    /**
     * Remove the specified vacancy from storage.
     */
    public function destroy(Vacancy $vacancy): JsonResponse
    {
        $vacancy->delete();

        return response()->json([
            'message' => 'Lowongan berhasil dihapus.',
        ], 200);
    }
}
