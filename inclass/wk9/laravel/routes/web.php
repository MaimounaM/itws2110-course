<?php

// Week 9 -- the routes. Supplied; you won't need to edit this file. The drills are in
// the migration, the models, ProductController and two views.

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

require __DIR__.'/workshop.php';   // the drills page and the schema page

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/low', [ProductController::class, 'low'])->name('products.low');
Route::get('/products/{id}', [ProductController::class, 'show'])->whereNumber('id')->name('products.show');
Route::get('/categories/{category}', [CategoryController::class, 'show'])->name('categories.show');
