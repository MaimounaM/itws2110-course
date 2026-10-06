<?php

namespace Tests\Feature\Drills;

use Tests\TestCase;

// Drill 9: The framework hands you the request. Supplied -- leave it alone. The drills page's Check result button
// runs this file; so does `docker compose run --rm test`.
// $this->get('/url') sends a pretend request to the app, inside the framework: no browser,
// no server, no network. Then each assert... line checks one thing about the response.
class Drill9Test extends TestCase
{
    public function test_sort_az_comes_from_the_request(): void
    {
        $this->get('/pantry?sort=az')->assertOk()->assertSeeInOrder(['Apples', 'Beans', 'Rice']);
        $this->get('/pantry')->assertOk()->assertSeeInOrder(['Apples', 'Rice', 'Beans']);
    }
}
