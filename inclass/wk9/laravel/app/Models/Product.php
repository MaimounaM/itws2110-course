<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// A row of the products table, as an object. Drills 5, 6, 9 and 12 are in this file.
//
// Look at how little is here. Nothing says which table this is, or which columns it has:
// a class called Product reads the table called products, and every column is a property
// ($product->name, $product->quantity). That is convention over configuration again.
class Product extends Model
{
    use HasFactory;

    // The columns that may be filled in one go: Product::create(['name' => 'Rice', ...]).
    protected $fillable = ['name', 'quantity', 'category_id', 'expires_on'];

    // TODO 5: tell Eloquent that expires_on is a date, so it hands you a date object
    //         instead of the string '2026-10-30'.
    //
    //         protected function casts(): array
    //         {
    //             return ['column_name' => 'date'];
    //         }

    // TODO 6: a product belongs to one category.
    //         public function category() { return $this->belongsTo(...); }

    // TODO 9: a product has many tags, and a tag is on many products.
    //         public function tags() { return $this->belongsToMany(...); }

    // TODO 12: once drills 10 and 11 have made the Supplier model, a product belongs to one
    //          supplier.  public function supplier() { return $this->belongsTo(...); }
}
