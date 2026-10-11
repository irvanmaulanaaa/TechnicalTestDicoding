<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vacancies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('division');
            $table->enum('job_type', ['Full-Time', 'Part-Time', 'Kontrak', 'Intern']);
            $table->unsignedInteger('candidates_needed');
            $table->date('active_until');
            $table->string('location');
            $table->boolean('is_remote')->default(false);
            $table->longText('description');
            $table->decimal('min_salary', 15, 2)->nullable();
            $table->decimal('max_salary', 15, 2)->nullable();
            $table->boolean('is_salary_visible')->default(true);
            $table->string('min_experience');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacancies');
    }
};
