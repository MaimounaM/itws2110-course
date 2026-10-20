<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Drills 5, 6, 9 and 12, solved.
class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'quantity', 'category_id', 'expires_on'];

    // 5. expires_on comes out of the database as text. The cast makes it a date object.
    protected function casts(): array
    {
        return ['expires_on' => 'date'];
    }

    // 6. products.category_id points at one row of categories.
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // 9. Many-to-many, through the product_tag table.
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    // 12. products.supplier_id points at one row of suppliers.
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}
