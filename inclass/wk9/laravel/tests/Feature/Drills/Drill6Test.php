<?php

namespace Tests\Feature\Drills;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// Drill 6: belongsTo. Supplied -- leave it alone. The drills page's Check result button runs
// this file; so does `docker compose run --rm test`.
// RefreshDatabase gives each test an empty database built from YOUR migrations. The test
// makes the rows it needs with factories, asks the app for a page, and checks the answer.
class Drill6Test extends TestCase
{
    use RefreshDatabase;

    public function test_a_product_knows_its_category_and_its_page_shows_it(): void
    {
        $category = Category::factory()->create(['name' => 'Wholegrains']);
        $product = Product::factory()->create(['name' => 'Millet', 'category_id' => $category->id]);
        $loose = Product::factory()->create(['name' => 'Barley', 'category_id' => null]);

        $this->assertInstanceOf(Category::class, $product->fresh()->category,
            '$product->category is not a Category yet. Add a category() method to Product that returns $this->belongsTo(Category::class).');
        $this->assertTrue($product->fresh()->category->is($category));

        $this->get('/products/'.$product->id)->assertOk()->assertSeeText('Wholegrains');
        $this->get('/products/'.$loose->id)->assertOk();   // a product with no category must not crash
    }
}
