<?php

namespace Tests\Feature\Drills;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

// Drill 10: A new model, from the command line. Supplied -- leave it alone. The drills page's
// Check result button runs this file; so does `docker compose run --rm test`.
// It looks for a class you generated and a table your migration makes. The class and the
// migration's file name are yours; the checks only care that they exist and what they hold.
class Drill10Test extends TestCase
{
    use RefreshDatabase;

    public function test_there_is_a_supplier_model_and_a_suppliers_table(): void
    {
        $this->assertTrue(class_exists('App\Models\Supplier'),
            'There is no App\Models\Supplier class yet. Generate it, in a second terminal: docker compose run --rm test php artisan make:model Supplier -mf');
        $this->assertTrue(is_subclass_of('App\Models\Supplier', Model::class),
            'Supplier should extend Illuminate\Database\Eloquent\Model, the way make:model writes it.');
        $this->assertTrue(Schema::hasTable('suppliers'),
            'There is no suppliers table. make:model -m writes a create_suppliers_table migration in database/migrations/. Is it there?');
        foreach (['name', 'email'] as $column) {
            $this->assertTrue(Schema::hasColumn('suppliers', $column),
                "The suppliers table has no column called $column. Add it in the create_suppliers_table migration.");
        }
    }

    public function test_a_supplier_needs_a_name_but_not_an_email(): void
    {
        if (! Schema::hasColumn('suppliers', 'name') || ! Schema::hasColumn('suppliers', 'email')) {
            $this->fail('Do the first part of this drill first: the suppliers table needs name and email columns.');
        }

        try {
            DB::table('suppliers')->insert(['name' => 'Hudson Valley Grains']);
        } catch (QueryException $e) {
            $this->fail('A supplier with no email could not be saved. Make email ->nullable(). The database said: '.$e->getMessage());
        }

        try {
            DB::table('suppliers')->insert(['email' => 'orders@nameless.test']);
            $refused = false;
        } catch (QueryException $e) {
            $refused = true;
        }
        $this->assertTrue($refused, "A supplier with no name was saved. name is required: \$table->string('name'), without ->nullable().");
    }
}
