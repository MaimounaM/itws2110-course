<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

// Supplied -- read it, leave it alone. A seeder fills the tables with starting data, as
// code, so everyone's database holds the same pantry:
//
//     docker compose exec app php artisan migrate:fresh --seed
//
// drops every table, runs every migration again, then runs this.
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $grains = Category::create(['name' => 'Grains']);
        $produce = Category::create(['name' => 'Produce']);
        $tinned = Category::create(['name' => 'Tinned']);

        $staple = Tag::create(['name' => 'staple']);
        $organic = Tag::create(['name' => 'organic']);
        $gift = Tag::create(['name' => 'gift']);

        // name, quantity, category, days until it expires (null: never), tags
        $rows = [
            ['Rice',         2, $grains,  200,  [$staple]],
            ['Oats',         1, $grains,  90,   [$staple, $organic]],
            ['Pasta',        4, $grains,  365,  []],
            ['Apples',       6, $produce, -1,   [$organic]],
            ['Carrots',      0, $produce, 5,    [$organic]],
            ['Onions',       3, $produce, 20,   [$staple]],
            ['Beans',        5, $tinned,  null, [$staple]],
            ['Tomatoes',     1, $tinned,  null, []],
            ['Coconut milk', 2, $tinned,  null, [$gift]],
        ];

        // Before drill 1 the products table has no expires_on column, so leave it out.
        $hasDate = Schema::hasColumn('products', 'expires_on');

        foreach ($rows as [$name, $quantity, $category, $days, $tags]) {
            $values = ['name' => $name, 'quantity' => $quantity, 'category_id' => $category->id];
            if ($hasDate && $days !== null) {
                $values['expires_on'] = now()->addDays($days)->toDateString();
            }
            $product = Product::create($values);

            foreach ($tags as $tag) {
                DB::table('product_tag')->insert(['product_id' => $product->id, 'tag_id' => $tag->id]);
            }
        }
    }
}
