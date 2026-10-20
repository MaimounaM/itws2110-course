<?php

namespace App\Http\Controllers;

use App\Models\Category;

// Supplied -- read it, leave it alone.
//
// show() asks for a Category, not an id. Laravel sees the {category} in the route, looks
// the row up, and answers 404 by itself when there isn't one. It is findOrFail(), done
// for you; the name for it is route model binding.
class CategoryController extends Controller
{
    public function show(Category $category)
    {
        return view('categories.show', ['category' => $category]);
    }
}
