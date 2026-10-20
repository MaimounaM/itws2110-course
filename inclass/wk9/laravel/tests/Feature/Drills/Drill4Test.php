<?php

namespace Tests\Feature\Drills;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// Drill 4: Let the database do the filtering. Supplied -- leave it alone. The drills page's Check result button runs
// this file; so does `docker compose run --rm test`.
// RefreshDatabase gives each test an empty database built from YOUR migrations. The test
// makes the rows it needs with factories, asks the app for a page, and checks the answer.
class Drill4Test extends TestCase
{
    use RefreshDatabase;

    public function test_running_low_lists_only_low_stock_and_filters_in_sql(): void
    {
        Product::factory()->create(['name' => 'Walnuts', 'quantity' => 1]);
        Product::factory()->create(['name' => 'Barley', 'quantity' => 0]);
        Product::factory()->create(['name' => 'Millet', 'quantity' => 2]);
        Product::factory()->create(['name' => 'Quinoa', 'quantity' => 7]);

        DB::flushQueryLog();
        $this->get('/products/low')
            ->assertOk()
            ->assertDontSeeText('Quinoa')      // 7 in stock: not running low
            ->assertDontSeeText('Millet')      // 2 in stock: not fewer than 2
            ->assertSeeTextInOrder(['Barley', 'Walnuts']);

        // The page is right. Was the filtering done by the database, or by PHP afterwards?
        $sql = implode("\n", array_column(DB::getQueryLog(), 'query'));
        $this->assertMatchesRegularExpression('/where\s+.?quantity.?\s*</i', $sql,
            'The page is right, but every row was fetched and filtered in PHP. Use where(\'quantity\', \'<\', 2) so the database does it.');
    }
}
