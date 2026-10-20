<?php

namespace Tests\Feature\Drills;

use App\Models\Product;
use DateTimeInterface;
use Illuminate\Support\Facades\Schema;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// Drill 5: Casts: a column becomes a date. Supplied -- leave it alone. The drills page's Check result button runs
// this file; so does `docker compose run --rm test`.
// RefreshDatabase gives each test an empty database built from YOUR migrations. The test
// makes the rows it needs with factories, asks the app for a page, and checks the answer.
class Drill5Test extends TestCase
{
    use RefreshDatabase;

    public function test_expires_on_is_a_date_object_and_the_page_formats_it(): void
    {
        $this->assertTrue(Schema::hasColumn('products', 'expires_on'), 'Do drill 1 first: there is no expires_on column yet.');

        $dated = Product::factory()->create(['name' => 'Millet', 'expires_on' => '2026-10-30']);
        $undated = Product::factory()->create(['name' => 'Barley', 'expires_on' => null]);

        $this->assertInstanceOf(DateTimeInterface::class, $dated->fresh()->expires_on,
            'expires_on is still a string. Add it to casts() in the Product model.');

        $this->get('/products/'.$dated->id)->assertOk()->assertSeeText('Oct 30, 2026');
        $this->get('/products/'.$undated->id)->assertOk()->assertSeeText('no date');
    }
}
