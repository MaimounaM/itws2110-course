<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Drills 10, 11 and 12, solved. make:model Supplier -mf wrote the first eleven lines of this
// class; $fillable and products() are the two things added by hand.
class Supplier extends Model
{
    /** @use HasFactory<\Database\Factories\SupplierFactory> */
    use HasFactory;

    // 11. The columns create() may fill in one go. Without this, Supplier::create([...]) is refused.
    protected $fillable = ['name', 'email'];

    // 12. products.supplier_id points at one row of suppliers, read from this side.
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
