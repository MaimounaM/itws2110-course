<?php

namespace Tests\Feature\Drills;

use App\Models\Product;
use Illuminate\Support\Facades\Schema;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// Drill 1: A migration is the schema, as code. Supplied -- leave it alone. The drills page's Check result button runs
// this file; so does `docker compose run --rm test`.
// RefreshDatabase gives each test an empty database built from YOUR migrations. The test
// makes the rows it needs with factories, asks the app for a page, and checks the answer.
class Drill1Test extends TestCase
{
    use RefreshDatabase;

    public function test_products_have_a_nullable_expires_on_date(): void
    {
        $this->assertTrue(Schema::hasColumn('products', 'expires_on'),
            'The products table has no expires_on column yet. Add it in the create_products_table migration.');
        $this->assertSame('date', Schema::getColumnType('products', 'expires_on'),
            'expires_on should be a date column: $table->date(...)');

        // A product with a date, and one without: both must save.
        $dated = Product::factory()->create(['expires_on' => '2026-10-30']);
        $undated = Product::factory()->create(['expires_on' => null]);

        $this->assertStringStartsWith('2026-10-30', (string) $dated->fresh()->getRawOriginal('expires_on'));
        $this->assertNull($undated->fresh()->getRawOriginal('expires_on'));
    }
}
