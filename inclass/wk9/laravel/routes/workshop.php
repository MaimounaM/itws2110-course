<?php

// The drills page, its Check result button, and the schema page -- supplied, leave this
// file alone.

use App\Http\Controllers\Workshop\WorkshopController;
use Illuminate\Support\Facades\Route;

Route::get('/', [WorkshopController::class, 'index']);
Route::get('/schema', [WorkshopController::class, 'schema']);
Route::get('/drills/{number}/check', [WorkshopController::class, 'check'])->whereNumber('number');
