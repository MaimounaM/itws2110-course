<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Drill 1, solved.
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedInteger('quantity')->default(0);

            // Each product belongs to one category, or to none. This column holds that
            // category's id; drill 6 teaches the model what it means.
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();

            // 1. Some products never expire, so the date is allowed to be empty.
            $table->date('expires_on')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
