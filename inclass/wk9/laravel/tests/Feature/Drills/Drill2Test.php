<?php

namespace Tests\Feature\Drills;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// Drill 2: A model reads the table. Supplied -- leave it alone. The drills page's Check result button runs
// this file; so does `docker compose run --rm test`.
// RefreshDatabase gives each test an empty database built from YOUR migrations. The test
// makes the rows it needs with factories, asks the app for a page, and checks the answer.
class Drill2Test extends TestCase
{
    use RefreshDatabase;

    public function test_the_products_page_lists_the_table_in_name_order(): void
    {
        Product::factory()->create(['name' => 'Zucchini']);
        Product::factory()->create(['name' => 'Apricots']);
        Product::factory()->create(['name' => 'Millet']);

        $this->get('/products')
            ->assertOk()
            ->assertSeeTextInOrder(['Apricots', 'Millet', 'Zucchini'])
            ->assertDontSeeText('Typed-in');
    }
}
