<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

// Supplied. A factory makes believable rows for tests: Category::factory()->create().
class CategoryFactory extends Factory
{
    public function definition(): array
    {
        return ['name' => ucfirst(fake()->unique()->word()).' '.fake()->unique()->numberBetween(100, 999)];
    }
}
