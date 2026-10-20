<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

// Supplied. Product::factory()->create(['name' => 'Rice']) makes a product, filling in
// whatever you didn't say. The drill checks build their data this way.
class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => ucfirst(fake()->unique()->word()).' '.fake()->unique()->numberBetween(100, 999),
            'quantity' => fake()->numberBetween(2, 9),
            'category_id' => null,
        ];
    }
}
