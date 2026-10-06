<?php

// Worked answers for drills 1-9 (routes). Compare after you've tried each one.

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

require __DIR__.'/workshop.php';

// 1. One line in the table. (fn () => ... is a short way to write function () { return ...; })
Route::get('/hello', fn () => 'Hello, Laravel!');

// 2. {name} in the URL arrives as $name.
Route::get('/products/{name}', fn (string $name) => "Product: $name");

// 3, 6, 7. The route is now one line: which URL, which controller method, what it's called.
Route::get('/pantry', [ProductController::class, 'index'])->name('pantry.index');

// 4. Unchanged -- the fix was in the view.
Route::get('/notes', function () {
    return view('notes', [
        'note' => "<script>alert('A stranger\\'s code is running on your page')</script> Buy rice.",
    ]);
});

// 5. Unchanged -- the fix was in the view.
Route::get('/about', function () {
    return view('about');
});

// 8. An unknown id stops here with a real 404.
Route::get('/items/{id}', function ($id) {
    $items = [1 => 'Apples', 2 => 'Rice', 3 => 'Beans'];
    abort_unless(isset($items[$id]), 404);
    return $items[$id];
});
