<?php

namespace Tests\Feature\Drills;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// Drill 3: Find one, or 404. Supplied -- leave it alone. The drills page's Check result button runs
// this file; so does `docker compose run --rm test`.
// RefreshDatabase gives each test an empty database built from YOUR migrations. The test
// makes the rows it needs with factories, asks the app for a page, and checks the answer.
class Drill3Test extends TestCase
{
    use RefreshDatabase;

    public function test_a_product_has_a_page_and_a_missing_one_is_a_404(): void
    {
        $product = Product::factory()->create(['name' => 'Millet']);

        $this->get('/products/'.$product->id)->assertOk()->assertSeeText('Millet');
        $this->get('/products/'.($product->id + 1000))->assertNotFound();
    }
}
