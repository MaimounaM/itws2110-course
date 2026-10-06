<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

// Worked answers for drills 6 and 9.
class ProductController extends Controller
{
    // Laravel calls this for GET /pantry, and builds the Request it asks for.
    public function index(Request $request)
    {
        $items = ['Apples', 'Rice', 'Beans'];

        if ($request->query('sort') === 'az') {
            sort($items);
        }

        return view('pantry', ['items' => $items]);
    }
}
