<?php

namespace Tests\Feature\Drills;

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

// Drill 6: A controller. Supplied -- leave it alone. The drills page's Check result button
// runs this file; so does `docker compose run --rm test`.
// $this->get('/url') sends a pretend request to the app, inside the framework: no browser,
// no server, no network. Then each assert... line checks one thing about the response.
class Drill6Test extends TestCase
{
    public function test_the_pantry_route_points_at_the_controller(): void
    {
        // Ask the router which code would answer GET /pantry.
        $route = Route::getRoutes()->match(Request::create('/pantry'));
        $this->assertSame(ProductController::class.'@index', $route->getActionName());

        $this->get('/pantry')->assertOk()->assertViewIs('pantry');
    }
}
