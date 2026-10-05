<?php

namespace Tests\Feature\Drills;

use Tests\TestCase;

// Drill 5: A layout. Supplied -- leave it alone. The drills page's Check result button
// runs this file; so does `docker compose run --rm test`.
// $this->get('/url') sends a pretend request to the app, inside the framework: no browser,
// no server, no network. Then each assert... line checks one thing about the response.
class Drill5Test extends TestCase
{
    public function test_the_about_page_uses_the_layout(): void
    {
        $this->get('/about')
            ->assertOk()
            ->assertSee('<nav class="site-nav">', false)   // only the layout has this
            ->assertSee('<title>About', false)
            ->assertSeeText('About this pantry');
    }
}
