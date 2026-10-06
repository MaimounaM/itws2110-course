<?php

namespace Tests\Feature\Drills;

use Tests\TestCase;

// Drill 3: Return a view. Supplied -- leave it alone. The drills page's Check result button
// runs this file; so does `docker compose run --rm test`.
// $this->get('/url') sends a pretend request to the app, inside the framework: no browser,
// no server, no network. Then each assert... line checks one thing about the response.
class Drill3Test extends TestCase
{
    public function test_the_pantry_is_rendered_by_a_view(): void
    {
        $this->get('/pantry')
            ->assertOk()
            ->assertViewIs('pantry')                                  // view('pantry', ...) made this page
            ->assertViewHas('items', ['Apples', 'Rice', 'Beans'])     // ...and was handed the items
            ->assertSee('<h1', false)                                // a heading...
            ->assertSee('<li', false)                                // ...a list...
            ->assertSeeInOrder(['Apples', 'Rice', 'Beans']);          // ...in this order
    }
}
