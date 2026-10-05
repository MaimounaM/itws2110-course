<?php

namespace Tests\Feature\Drills;

use Tests\TestCase;

// Drill 8: A real 404. Supplied -- leave it alone. The drills page's Check result button
// runs this file; so does `docker compose run --rm test`.
// $this->get('/url') sends a pretend request to the app, inside the framework: no browser,
// no server, no network. Then each assert... line checks one thing about the response.
class Drill8Test extends TestCase
{
    public function test_known_items_show_and_unknown_items_are_404(): void
    {
        $this->get('/items/2')->assertOk()->assertSeeText('Rice');
        $this->get('/items/99')->assertNotFound();   // status 404
    }
}
