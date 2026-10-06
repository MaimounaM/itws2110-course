<?php

namespace Tests\Feature\Drills;

use Illuminate\Support\Facades\Route;
use Tests\TestCase;

// Drill 7: Named routes. Supplied -- leave it alone. The drills page's Check result button
// runs this file; so does `docker compose run --rm test`.
// $this->get('/url') sends a pretend request to the app, inside the framework: no browser,
// no server, no network. Then each assert... line checks one thing about the response.
class Drill7Test extends TestCase
{
    public function test_the_pantry_has_a_name_and_notes_links_by_it(): void
    {
        $this->assertTrue(Route::has('pantry.index'), 'No route is named pantry.index yet.');
        $this->assertSame(url('/pantry'), route('pantry.index'));

        // route() writes out the full address; a hand-typed "/pantry" won't match it.
        $this->get('/notes')->assertSee('href="'.route('pantry.index').'"', false);
    }
}
