<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// A row of the categories table. Drill 7 is in this file.
class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    // TODO 7: a category has many products.
    //         public function products() { return $this->hasMany(...); }
}
