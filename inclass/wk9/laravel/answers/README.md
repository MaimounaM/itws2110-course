# Worked answers — week 9 Eloquent drills

[← The workshop](../README.md)

Full solved copies of the files the drills change or create, at the same paths. Try each
drill before you look. Drills 10–12 make new files; their migrations' timestamps here are
made up, and yours will be whenever you ran the generator.

| File | Drills |
|---|---|
| `database/migrations/2026_10_20_000002_create_products_table.php` | 1 |
| `app/Http/Controllers/ProductController.php` | 2, 3, 4, 8 |
| `app/Models/Product.php` | 5, 6, 9, 12 |
| `app/Models/Category.php` | 7 |
| `resources/views/products/show.blade.php` | 5, 6, 9 |
| `resources/views/categories/show.blade.php` | 7 |
| `app/Models/Supplier.php` (new) | 10, 11, 12 |
| `database/factories/SupplierFactory.php` (new) | 11 |
| `database/migrations/2026_10_20_120000_create_suppliers_table.php` (new) | 10 |
| `database/migrations/2026_10_23_120000_add_supplier_id_to_products_table.php` (new) | 12 |

| # | The answer in one line |
|---|---|
| 1 | `$table->date('expires_on')->nullable();` |
| 2 | `Product::orderBy('name')->get()` |
| 3 | `Product::findOrFail($id)` |
| 4 | `Product::where('quantity', '<', 2)->orderBy('name')->get()` |
| 5 | `casts()` returns `['expires_on' => 'date']`; the view prints `$product->expires_on?->format('M j, Y') ?? 'no date'` |
| 6 | `category()` returns `$this->belongsTo(Category::class)`; the view prints `$product->category?->name` |
| 7 | `products()` returns `$this->hasMany(Product::class)`; the view loops over `$category->products` |
| 8 | `Product::with('category')->orderBy('name')->get()` |
| 9 | `tags()` returns `$this->belongsToMany(Tag::class)`; the view loops over `$product->tags` |
| 10 | `make:model Supplier -mf`; in the migration, `$table->string('name');` and `$table->string('email')->nullable();`; then `migrate` |
| 11 | `protected $fillable = ['name', 'email'];`; the factory returns `['name' => fake()->company(), 'email' => fake()->companyEmail()]` |
| 12 | a new migration with `foreignId('supplier_id')->nullable()->constrained()->nullOnDelete()`, and `dropConstrainedForeignId('supplier_id')` in `down()`; `products()` is `hasMany`, `supplier()` is `belongsTo` |

To check them all without touching your own files: `docker compose run --rm answers`.
