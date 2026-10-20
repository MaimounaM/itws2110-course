<?php

namespace Tests\Feature\Drills;

use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

// Drill 12: Connect it. Supplied -- leave it alone. The drills page's Check result button runs
// this file; so does `docker compose run --rm test`.
// A new column on an old table, in a new migration, and the two relationships that read it.
class Drill12Test extends TestCase
{
    use RefreshDatabase;

    private function drill11(): void
    {
        if (! class_exists('App\Models\Supplier') || ! Schema::hasTable('suppliers') || ! class_exists('Database\Factories\SupplierFactory')) {
            $this->fail('Do drills 10 and 11 first: a Supplier model, its suppliers table, and its factory.');
        }
    }

    public function test_products_have_a_supplier_id_that_points_at_suppliers(): void
    {
        $this->drill11();
        $this->assertTrue(Schema::hasColumn('products', 'supplier_id'),
            'The products table has no supplier_id column. Make a NEW migration for it -- docker compose run --rm test php artisan make:migration add_supplier_id_to_products_table -- rather than editing create_products_table.');

        $keys = collect(Schema::getForeignKeys('products'))
            ->filter(fn ($key) => $key['columns'] === ['supplier_id'] && $key['foreign_table'] === 'suppliers');
        $this->assertCount(1, $keys, "products.supplier_id should be a foreign key to suppliers: foreignId('supplier_id')->...->constrained().");

        try {
            Product::factory()->create(['name' => 'Rye flour']);
        } catch (QueryException $e) {
            $this->fail('A product with no supplier could not be saved. The nine products already in the table have none, so supplier_id must be ->nullable(). The database said: '.$e->getMessage());
        }
    }

    public function test_the_relationship_works_from_both_sides(): void
    {
        $this->drill11();
        if (! Schema::hasColumn('products', 'supplier_id')) {
            $this->fail('Do the first part of this drill first: products needs a supplier_id column.');
        }
        $this->assertTrue(method_exists(Supplier::class, 'products'),
            'Supplier has no products() method. A supplier has many products: return $this->hasMany(Product::class);');
        $this->assertTrue(method_exists(Product::class, 'supplier'),
            'Product has no supplier() method. A product belongs to one supplier: return $this->belongsTo(Supplier::class);');

        $mill = Supplier::factory()->create(['name' => 'Hudson Valley Grains']);
        $other = Supplier::factory()->create(['name' => 'Cannery Row']);
        $rye = Product::factory()->create(['name' => 'Rye flour', 'supplier_id' => $mill->id]);
        Product::factory()->create(['name' => 'Spelt', 'supplier_id' => $mill->id]);
        Product::factory()->create(['name' => 'Chutney', 'supplier_id' => $other->id]);

        $products = $mill->fresh()->products;
        $this->assertInstanceOf(Collection::class, $products, 'products() should return $this->hasMany(Product::class).');
        $this->assertEqualsCanonicalizing(['Rye flour', 'Spelt'], $products->pluck('name')->all(),
            "A supplier's products should be its own and nobody else's.");

        $this->assertTrue($mill->is($rye->fresh()->supplier), 'supplier() should return $this->belongsTo(Supplier::class).');
    }
}
