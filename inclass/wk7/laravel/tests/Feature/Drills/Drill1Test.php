<?php

namespace Tests\Feature\Drills;

use Tests\TestCase;

// Drill 1: A route is one line. Supplied -- leave it alone. The drills page's Check result button
// runs this file; so does `docker compose run --rm test`.
// $this->get('/url') sends a pretend request to the app, inside the framework: no browser,
// no server, no network. Then each assert... line checks one thing about the response.
class Drill1Test extends TestCase
{
    public function test_hello_answers_with_the_greeting(): void
    {
        $this->get('/hello')
            ->assertOk()                       // status 200
            ->assertSeeText('Hello, Laravel!'); // the text on the page
    }
}
