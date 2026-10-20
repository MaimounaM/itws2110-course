<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Drill 7, solved.
class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    // 7. The same foreign key as Product::category(), read from the other side.
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
