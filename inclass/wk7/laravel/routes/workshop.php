<?php

// The drills page and its Check result button -- supplied, leave this file alone.

use App\Http\Controllers\Workshop\WorkshopController;
use Illuminate\Support\Facades\Route;

Route::get('/', [WorkshopController::class, 'index']);
Route::get('/drills/{number}/check', [WorkshopController::class, 'check'])->whereNumber('number');
