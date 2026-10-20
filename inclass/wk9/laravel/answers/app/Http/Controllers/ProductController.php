<?php

namespace App\Http\Controllers;

use App\Models\Product;

// Drills 2, 3, 4 and 8, solved.
class ProductController extends Controller
{
    // 2 and 8. The rows of the table, in name order -- and their categories fetched in
    // one extra query instead of one per row.
    public function index()
    {
        $products = Product::with('category')->orderBy('name')->get();

        return view('products.index', ['heading' => 'Products', 'products' => $products]);
    }

    // 4. where() becomes WHERE quantity < 2, so the database sends only these rows.
    // with('category') for the same reason as in index(): the view prints the category.
    public function low()
    {
        $products = Product::with('category')->where('quantity', '<', 2)->orderBy('name')->get();

        return view('products.index', ['heading' => 'Running low', 'products' => $products]);
    }

    // 3. No such row: stop with a 404.
    public function show(int $id)
    {
        $product = Product::findOrFail($id);

        return view('products.show', ['product' => $product]);
    }
}
