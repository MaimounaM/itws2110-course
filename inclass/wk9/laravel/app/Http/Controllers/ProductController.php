<?php

namespace App\Http\Controllers;

use App\Models\Product;

// Drills 2, 3, 4 and 8 are in this file.
class ProductController extends Controller
{
    // 2. Read from the database.
    // These three products are typed in. Replace them with the rows of the products
    // table, in name order:  Product::orderBy('name')->get()
    //
    // 8. One query, not one per row (do drills 2 and 6 first).
    // The page prints each product's category, so Eloquent goes back to the database
    // once for every row. Ask for the categories up front:  Product::with('category')
    public function index()
    {
        $products = [
            (object) ['id' => null, 'name' => 'Typed-in rice',   'quantity' => 2, 'category' => null],
            (object) ['id' => null, 'name' => 'Typed-in beans',  'quantity' => 5, 'category' => null],
            (object) ['id' => null, 'name' => 'Typed-in apples', 'quantity' => 6, 'category' => null],
        ];

        return view('products.index', ['heading' => 'Products', 'products' => $products]);
    }

    // 4. Let the database do the filtering.
    // This page should list only the products that are running low -- fewer than 2 in
    // stock -- in name order. Right now it fetches every row.
    //     Product::where('quantity', '<', 2)->orderBy('name')->get()
    public function low()
    {
        $products = Product::all();

        return view('products.index', ['heading' => 'Running low', 'products' => $products]);
    }

    // 3. Find one, or 404.
    // find() returns null when there is no such row, and the view then crashes.
    // findOrFail() stops with a 404 instead.
    public function show(int $id)
    {
        $product = Product::find($id);

        return view('products.show', ['product' => $product]);
    }
}
