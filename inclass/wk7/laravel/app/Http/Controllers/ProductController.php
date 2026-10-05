<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

// Drills 6 and 9. A controller is a class that groups the code for one kind of thing --
// here, products. Its methods are what routes point at.
class ProductController extends Controller
{
    // 6. Move the body of the /pantry route from routes/web.php in here, then point the
    //    route at this method. It should still return view('pantry', ['items' => $items]).
    //
    // 9. Sorting. /pantry?sort=az should list the items A to Z; plain /pantry keeps them in
    //    the order they're written. Week 3 would read $_GET['sort']. Don't: add
    //    Request $request  to this method's parameters, and use  $request->query('sort').
    //    Laravel sees the type, builds the Request, and passes it in -- you never call
    //    index() yourself. (The check builds a request without touching $_GET, the same
    //    way Friday's tests will, so $_GET won't pass it.)  sort($items) sorts A to Z.
    public function index()
    {
        // TODO 6, then TODO 9
    }
}
