<?php

namespace Tests\Feature\Drills;

use App\Models\Product;
use App\Models\Tag;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// Drill 9: belongsToMany. Supplied -- leave it alone. The drills page's Check result button runs
// this file; so does `docker compose run --rm test`.
// RefreshDatabase gives each test an empty database built from YOUR migrations. The test
// makes the rows it needs with factories, asks the app for a page, and checks the answer.
class Drill9Test extends TestCase
{
    use RefreshDatabase;

    public function test_a_product_page_lists_its_tags(): void
    {
        $product = Product::factory()->create(['name' => 'Millet']);
        $plain = Product::factory()->create(['name' => 'Barley']);
        $mine = [Tag::factory()->create(['name' => 'wholefood']), Tag::factory()->create(['name' => 'bulk-buy'])];
        Tag::factory()->create(['name' => 'seasonal']);   // a tag this product does not have

        foreach ($mine as $tag) {
            DB::table('product_tag')->insert(['product_id' => $product->id, 'tag_id' => $tag->id]);
        }

        $this->assertTrue(method_exists($product, 'tags'),
            'Product has no tags() method yet. It should return $this->belongsToMany(Tag::class).');
        $this->assertCount(2, $product->fresh()->tags);

        $this->get('/products/'.$product->id)
            ->assertOk()
            ->assertSeeText('wholefood')
            ->assertSeeText('bulk-buy')
            ->assertDontSeeText('seasonal');
        $this->get('/products/'.$plain->id)->assertOk();   // a product with no tags must not crash
    }
}
