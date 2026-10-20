<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

// Supplied.
class TagFactory extends Factory
{
    public function definition(): array
    {
        return ['name' => fake()->unique()->word().'-'.fake()->unique()->numberBetween(100, 999)];
    }
}
