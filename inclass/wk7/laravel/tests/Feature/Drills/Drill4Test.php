<?php

namespace Tests\Feature\Drills;

use Tests\TestCase;

// Drill 4: Escaping is the default. Supplied -- leave it alone. The drills page's Check result button
// runs this file; so does `docker compose run --rm test`.
// $this->get('/url') sends a pretend request to the app, inside the framework: no browser,
// no server, no network. Then each assert... line checks one thing about the response.
class Drill4Test extends TestCase
{
    public function test_the_note_is_escaped_not_run(): void
    {
        $this->get('/notes')
            ->assertOk()
            ->assertDontSee('<script>', false)      // false: look at the raw HTML, unescaped
            ->assertSee('&lt;script&gt;', false);  // the tag arrives as text
    }
}
