<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Supplied -- read it, leave it alone. A migration is the schema, written as code:
// up() makes the change, down() undoes it. Laravel runs them in file-name order, once
// each, and remembers which have run in a table of its own called `migrations`.
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();                       // an auto-incrementing primary key called id
            $table->string('name')->unique();
            $table->timestamps();               // created_at and updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
