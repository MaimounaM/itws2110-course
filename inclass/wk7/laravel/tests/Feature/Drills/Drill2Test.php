<?php

namespace Tests\Feature\Drills;

use Tests\TestCase;

// Drill 2: Route parameters. Supplied -- leave it alone. The drills page's Check result button
// runs this file; so does `docker compose run --rm test`.
// $this->get('/url') sends a pretend request to the app, inside the framework: no browser,
// no server, no network. Then each assert... line checks one thing about the response.
class Drill2Test extends TestCase
{
    public function test_any_product_name_is_echoed_back(): void
    {
        $this->get('/products/Oats')->assertOk()->assertSeeText('Product: Oats');
        $this->get('/products/Rice')->assertOk()->assertSeeText('Product: Rice');
    }
}
