<?php

namespace Tests\Feature\Drills;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// Drill 8: The N+1 problem. Supplied -- leave it alone. The drills page's Check result button runs
// this file; so does `docker compose run --rm test`.
// RefreshDatabase gives each test an empty database built from YOUR migrations. The test
// makes the rows it needs with factories, asks the app for a page, and checks the answer.
class Drill8Test extends TestCase
{
    use RefreshDatabase;

    public function test_the_products_page_runs_two_queries_however_many_rows(): void
    {
        $names = ['Wholegrains', 'Preserves', 'Roots', 'Pulses'];
        foreach ($names as $i => $name) {
            $category = Category::factory()->create(['name' => $name]);
            Product::factory()->count(3)->create(['category_id' => $category->id]);
        }

        DB::flushQueryLog();
        $page = $this->get('/products')->assertOk();
        $queries = count(DB::getQueryLog());

        // First, the page has to show each product's category (drills 2 and 6).
        foreach ($names as $name) {
            $page->assertSeeText($name);
        }

        $this->assertLessThanOrEqual(2, $queries,
            "The products page ran $queries queries for 12 products: one for the list and one more per row. Load the categories up front with Product::with('category').");
    }
}
