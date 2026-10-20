<?php

namespace Tests\Feature\Drills;

use App\Models\Supplier;
use Illuminate\Database\Eloquent\MassAssignmentException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

// Drill 11: Fill it in. Supplied -- leave it alone. The drills page's Check result button runs
// this file; so does `docker compose run --rm test`.
// Two ways to make a row: create() with an array, which $fillable has to allow, and the
// factory, whose definition() has to say what a believable supplier looks like.
class Drill11Test extends TestCase
{
    use RefreshDatabase;

    private function drill10(): void
    {
        if (! class_exists('App\Models\Supplier') || ! Schema::hasColumn('suppliers', 'name') || ! Schema::hasColumn('suppliers', 'email')) {
            $this->fail('Do drill 10 first: a Supplier model, and a suppliers table with name and email.');
        }
    }

    public function test_a_supplier_can_be_created_in_one_go(): void
    {
        $this->drill10();

        try {
            $supplier = Supplier::create(['name' => 'Hudson Valley Grains', 'email' => 'orders@hvgrains.test']);
        } catch (MassAssignmentException $e) {
            $this->fail('Supplier::create([...]) was refused: '.rtrim($e->getMessage(), '.').'. List the columns that may be filled in one go: protected $fillable = [...] in Supplier.');
        }

        $saved = $supplier->fresh();
        $this->assertSame('Hudson Valley Grains', $saved->name, 'The name was not saved. Is name in $fillable?');
        $this->assertSame('orders@hvgrains.test', $saved->email, 'The email was not saved. Is email in $fillable?');
    }

    public function test_the_factory_makes_believable_suppliers(): void
    {
        $this->drill10();
        $this->assertTrue(class_exists('Database\Factories\SupplierFactory'),
            'There is no SupplierFactory. The f in make:model Supplier -mf makes one; or: docker compose run --rm test php artisan make:factory SupplierFactory --model=Supplier');

        try {
            $suppliers = Supplier::factory()->count(3)->create();
        } catch (QueryException $e) {
            $this->fail("Supplier::factory()->create() failed. The factory's definition() has to fill in name, for example 'name' => fake()->company(). The database said: ".$e->getMessage());
        }

        $this->assertSame(3, DB::table('suppliers')->count());
        foreach ($suppliers as $supplier) {
            $this->assertNotEmpty($supplier->name, "The factory made a supplier with no name. Fill in 'name' in definition().");
        }
    }
}
