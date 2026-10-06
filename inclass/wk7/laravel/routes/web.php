<?php

// Drills 1-9: the routes. The drills page at http://localhost:8000/ says what each
// one asks; each drill below says which lines are yours. Save, then press Check result.
//
// Week 3's public/index.php decided what to do with a URL by hand, one if at a time:
//     if ($method === 'GET' && $path === '/api/products') { ... }
// In Laravel every one of those ifs becomes a line in this table.

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

require __DIR__.'/workshop.php';   // the drills page itself -- leave this line alone

// ---------------------------------------------------------------- routes and views

// 1. A route is one line.
// Add a route: a GET request for /hello answers with the text  Hello, Laravel!
//     Route::get('/the-url', function () { return 'what to send back'; });
// TODO 1


// 2. Route parameters.
// This route only answers /products/rice. Make it answer /products/ANYTHING, and say
// "Product: " followed by whatever came after the slash: /products/Oats -> Product: Oats
Route::get('/products/rice', function () {
    return 'Product: rice';
});


// 3. Return a view. (Drill 6 moves this route into a controller.)
// This builds HTML by gluing strings together, like week 3 did. Move the markup into
// resources/views/pantry.blade.php and return view('pantry', ['items' => $items]).
Route::get('/pantry', function () {
    $items = ['Apples', 'Rice', 'Beans'];
    $html = '<h1>Pantry</h1><ul>';
    foreach ($items as $item) {
        $html .= '<li>'.$item.'</li>';
    }
    return $html.'</ul>';
});


// 4. Escaping is the default. Nothing to change here -- the fix is in
// resources/views/notes.blade.php. Pretend this note came from a form a stranger filled in.
Route::get('/notes', function () {
    return view('notes', [
        'note' => "<script>alert('A stranger\\'s code is running on your page')</script> Buy rice.",
    ]);
});


// 5. A layout. Nothing to change here -- the fix is in resources/views/about.blade.php.
Route::get('/about', function () {
    return view('about');
});

// ---------------------------------------------------------------- controllers and requests

// 6. A controller. Move the body of the /pantry route above into
// app/Http/Controllers/ProductController.php (its index method), then replace the
// whole route with one line that points at it:
//     Route::get('/pantry', [ProductController::class, 'index']);

// 7. Named routes. Give that /pantry route a name, by adding  ->name('pantry.index')
// to the end of the line. The other half of this drill is in resources/views/notes.blade.php.

// 8. A real 404.
// Ask for /items/99 and this answers "Not found" -- with status 200, which tells the
// browser (and Google, and every API client) that everything is fine. Make an unknown id
// a real 404: abort(404) stops right there and Laravel sends its "Not Found" page.
Route::get('/items/{id}', function ($id) {
    $items = [1 => 'Apples', 2 => 'Rice', 3 => 'Beans'];
    return $items[$id] ?? 'Not found';
});

// 9. The framework hands you the request -- see ProductController.php.
