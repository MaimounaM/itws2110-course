<?php

namespace Tests\Feature\Drills;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// Drill 7: hasMany. Supplied -- leave it alone. The drills page's Check result button runs
// this file; so does `docker compose run --rm test`.
// RefreshDatabase gives each test an empty database built from YOUR migrations. The test
// makes the rows it needs with factories, asks the app for a page, and checks the answer.
class Drill7Test extends TestCase
{
    use RefreshDatabase;

    public function test_a_category_lists_its_own_products(): void
    {
        $grains = Category::factory()->create(['name' => 'Wholegrains']);
        $other = Category::factory()->create(['name' => 'Preserves']);
        Product::factory()->create(['name' => 'Millet', 'category_id' => $grains->id]);
        Product::factory()->create(['name' => 'Barley', 'category_id' => $grains->id]);
        Product::factory()->create(['name' => 'Chutney', 'category_id' => $other->id]);

        $this->assertInstanceOf(Collection::class, $grains->fresh()->products,
            '$category->products is not a collection yet. Add a products() method to Category that returns $this->hasMany(Product::class).');
        $this->assertCount(2, $grains->fresh()->products);

        $this->get('/categories/'.$grains->id)
            ->assertOk()
            ->assertSeeText('Millet')
            ->assertSeeText('Barley')
            ->assertDontSeeText('Chutney');
    }
}
