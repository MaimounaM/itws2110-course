<?php

namespace App\Http\Controllers\Workshop;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Schema;

// The drills page -- supplied, leave this file alone.
//
// Each drill's Check result button runs that drill's test in tests/Feature/Drills/ --
// the same file `docker compose run --rm test` runs. Every test starts from an empty
// database held in memory (SQLite), runs YOUR migrations to build the tables, makes its
// own rows with the factories, and then asks your app for a page. So a check sees your
// latest migration the moment you save it, even before you have run it against MySQL.
class WorkshopController extends Controller
{
    public const DRILLS = [
        1 => [
            'group' => 'Migrations and models', 'title' => 'A migration is the schema, as code', 'open' => '/schema',
            'file' => 'database/migrations/2026_10_20_000002_create_products_table.php',
            'goal' => 'The products table has a date column called expires_on that is allowed to be empty.',
            'hint' => "\$table->date('expires_on')->nullable();\n\nThen, to see it in the browser:\ndocker compose exec app php artisan migrate:fresh --seed",
            'idea' => 'Nobody opens a database tool and adds a column by hand. The change is a file, in git, and everyone who runs the migrations gets the same table.',
            'sql' => "ALTER TABLE products\n  ADD COLUMN expires_on DATE NULL;\n\n-- The migration writes this for you, in MySQL's dialect for the pages\n-- and in SQLite's for the checks.",
        ],
        2 => [
            'group' => 'Migrations and models', 'title' => 'A model reads the table', 'open' => '/products', 'file' => 'app/Http/Controllers/ProductController.php',
            'goal' => '/products lists the rows of the products table, in name order, instead of three typed-in products.',
            'hint' => "\$products = Product::orderBy('name')->get();",
            'idea' => 'The Product class has almost no code in it, and it can already read its table. Each row comes back as an object whose properties are the columns.',
            'sql' => "SELECT * FROM products\nORDER BY name;",
        ],
        3 => [
            'group' => 'Migrations and models', 'title' => 'Find one, or 404', 'open' => '/products/9999', 'file' => 'app/Http/Controllers/ProductController.php',
            'goal' => '/products/1 shows that product, and an id with no row is a 404 instead of an error page.',
            'hint' => "\$product = Product::findOrFail(\$id);",
            'idea' => 'find() hands you null when there is no row, and it is your job to notice. findOrFail() turns "no such row" into the right HTTP answer.',
            'sql' => "SELECT * FROM products\nWHERE id = 9999\nLIMIT 1;\n\n-- No row comes back. SQL has no 404: findOrFail() is what turns\n-- an empty result into one.",
        ],
        4 => [
            'group' => 'Migrations and models', 'title' => 'Let the database do the filtering', 'open' => '/products/low', 'file' => 'app/Http/Controllers/ProductController.php',
            'goal' => '/products/low lists only the products with fewer than 2 in stock, in name order, and the filtering happens in SQL.',
            'hint' => "\$products = Product::where('quantity', '<', 2)->orderBy('name')->get();",
            'idea' => 'Product::all() fetches every row and leaves PHP to throw most of them away. where() becomes a WHERE clause, so the database sends only the rows you want. Open "Show them" at the foot of the page to read the SQL.',
            'sql' => "SELECT * FROM products\nWHERE quantity < 2\nORDER BY name;",
        ],
        5 => [
            'group' => 'Migrations and models', 'title' => 'Casts: a column becomes a date', 'open' => '/products/1', 'file' => 'app/Models/Product.php and resources/views/products/show.blade.php',
            'goal' => 'Do drill 1 first. A product page shows its date like "Oct 30, 2026", and a product with no date says "no date".',
            'hint' => "In Product:\nprotected function casts(): array\n{\n    return ['expires_on' => 'date'];\n}\n\nIn the view:\n{{ \$product->expires_on?->format('M j, Y') ?? 'no date' }}",
            'idea' => 'The database hands back the text 2026-10-30. A cast tells the model what that text is, so your code gets a date object it can format and compare.',
            'sql' => "SELECT name, expires_on FROM products WHERE id = 1;\n\n-- expires_on comes back as the text 2027-04-30.\n-- SQL could format it:  DATE_FORMAT(expires_on, '%b %e, %Y')\n-- The cast does it in PHP instead, and hands you a date object.",
        ],
        6 => [
            'group' => 'Relationships', 'title' => 'belongsTo', 'open' => '/products/1', 'file' => 'app/Models/Product.php and resources/views/products/show.blade.php',
            'goal' => 'A product page shows the name of its category.',
            'hint' => "In Product:\npublic function category()\n{\n    return \$this->belongsTo(Category::class);\n}\n\nIn the view:\n{{ \$product->category?->name ?? 'none' }}",
            'idea' => 'The products table only holds a number, category_id. The relationship turns that number into the Category object it points at.',
            'sql' => "SELECT products.name, categories.name AS category\nFROM products\nLEFT JOIN categories ON categories.id = products.category_id\nWHERE products.id = 1;\n\n-- By hand you would join. Eloquent doesn't: it runs a second query,\n-- select * from categories where categories.id = ? limit 1.\n-- Open Show them.",
        ],
        7 => [
            'group' => 'Relationships', 'title' => 'hasMany', 'open' => '/categories/1', 'file' => 'app/Models/Category.php and resources/views/categories/show.blade.php',
            'goal' => 'A category page lists the products in that category, and no others.',
            'hint' => "In Category:\npublic function products()\n{\n    return \$this->hasMany(Product::class);\n}\n\nIn the view:\n@foreach (\$category->products as \$product)\n    <li>{{ \$product->name }}</li>\n@endforeach",
            'idea' => 'The same foreign key, read from the other side. One column in the database gives you two relationships in the code.',
            'sql' => "SELECT * FROM products\nWHERE category_id = 1;\n\n-- The same column as drill 6, read from the other side.",
        ],
        8 => [
            'group' => 'Relationships', 'title' => 'The N+1 problem', 'open' => '/products', 'file' => 'app/Http/Controllers/ProductController.php',
            'goal' => 'Do drills 2 and 6 first. /products shows every product with its category, using 2 queries however many products there are.',
            'hint' => "\$products = Product::with('category')->orderBy('name')->get();",
            'idea' => 'Look at the query count at the foot of /products before you fix it: one query for the list, then one more for every row. with() fetches all the categories in a single second query.',
            'sql' => "-- Before: one query for the list, then one per product\nSELECT * FROM products ORDER BY name;\nSELECT * FROM categories WHERE id = 2 LIMIT 1;  -- Apples\nSELECT * FROM categories WHERE id = 3 LIMIT 1;  -- Beans\nSELECT * FROM categories WHERE id = 2 LIMIT 1;  -- Carrots\n-- ...one more for every product: 10 in all\n\n-- After with('category'): two, however many products\nSELECT * FROM products ORDER BY name;\nSELECT * FROM categories WHERE id IN (1, 2, 3);\n\n-- By hand you would have written one JOIN, as in drill 6.",
        ],
        9 => [
            'group' => 'Relationships', 'title' => 'belongsToMany', 'open' => '/products/1', 'file' => 'app/Models/Product.php and resources/views/products/show.blade.php',
            'goal' => 'A product page lists the names of its tags.',
            'hint' => "In Product:\npublic function tags()\n{\n    return \$this->belongsToMany(Tag::class);\n}\n\nIn the view:\n@foreach (\$product->tags as \$tag)\n    <span class=\"tag\">{{ \$tag->name }}</span>\n@endforeach",
            'idea' => 'Many-to-many needs a third table, product_tag, with one row per pairing. Eloquent finds it by its name: the two model names, in alphabetical order.',
            'sql' => "SELECT tags.name\nFROM tags\nJOIN product_tag ON product_tag.tag_id = tags.id\nWHERE product_tag.product_id = 1;\n\n-- product_tag is the table in between: one row per pairing.",
        ],
        10 => [
            'group' => 'Your own model', 'title' => 'A new model, from the command line', 'open' => '/schema',
            'file' => 'new files: app/Models/Supplier.php, database/factories/SupplierFactory.php, database/migrations/…_create_suppliers_table.php',
            'goal' => "Generate a Supplier model with its migration and factory, give the suppliers table a required name and an email that may be empty, and run the migration.",
            'hint' => "In a second terminal:\ndocker compose run --rm test php artisan make:model Supplier -mf\n\nIn the new create_suppliers_table migration:\n\$table->string('name');\n\$table->string('email')->nullable();\n\nThen build the table in MySQL:\ndocker compose exec app php artisan migrate",
            'idea' => "Run the generator through the test container: it writes into your folder, and docker compose watch syncs the new files to the app. (Run it with exec app and the files stay inside the container.) Then migrate, not migrate:fresh: it runs only the one migration that hasn't run yet.",
            'sql' => "CREATE TABLE suppliers (\n  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  email VARCHAR(255) NULL,\n  created_at TIMESTAMP NULL,\n  updated_at TIMESTAMP NULL\n);\n\n-- Your migration writes this, and the class name Supplier\n-- gives the table its name: suppliers.",
        ],
        11 => [
            'group' => 'Your own model', 'title' => 'Fill it in: $fillable and a factory', 'open' => '/schema',
            'file' => 'app/Models/Supplier.php and database/factories/SupplierFactory.php',
            'goal' => "Do drill 10 first. Supplier::create(['name' => ..., 'email' => ...]) saves both columns, and Supplier::factory()->create() makes a supplier with a believable name.",
            'hint' => "In Supplier:\nprotected \$fillable = ['name', 'email'];\n\nIn SupplierFactory's definition():\nreturn [\n    'name' => fake()->company(),\n    'email' => fake()->companyEmail(),\n];\n\nThen try it by hand:\ndocker compose exec app php artisan tinker\n> App\\Models\\Supplier::factory()->count(3)->create();",
            'idea' => "Laravel refuses create([...]) until the model lists the columns it may fill. Otherwise anyone who can post a form could set any column, including ones you never put on the form. The factory is the other way to make rows: the checks use one for every drill.",
            'sql' => "INSERT INTO suppliers (name, email, created_at, updated_at)\nVALUES ('Hudson Valley Grains', 'orders@hvgrains.test', NOW(), NOW());\n\n-- create() writes this. \$fillable decides which keys of your\n-- array are allowed to become columns in it.",
        ],
        12 => [
            'group' => 'Your own model', 'title' => 'Connect it: a new migration, two relationships', 'open' => '/schema',
            'file' => 'a new migration, app/Models/Supplier.php and app/Models/Product.php',
            'goal' => "Do drills 10 and 11 first. Products get a supplier_id that may be empty and points at suppliers, a supplier has many products, and a product belongs to one supplier.",
            'hint' => "In a second terminal:\ndocker compose run --rm test php artisan make:migration add_supplier_id_to_products_table\n\nIn its up():\nSchema::table('products', function (Blueprint \$table) {\n    \$table->foreignId('supplier_id')->nullable()->constrained()->nullOnDelete();\n});\n\nIn its down():\nSchema::table('products', function (Blueprint \$table) {\n    \$table->dropConstrainedForeignId('supplier_id');\n});\n\nIn Supplier:  public function products() { return \$this->hasMany(Product::class); }\nIn Product:   public function supplier() { return \$this->belongsTo(Supplier::class); }\n\nThen: docker compose exec app php artisan migrate",
            'idea' => "Drill 1 edited a migration that had already run, which only works because migrate:fresh throws the database away. A real team adds a new migration instead: Schema::table changes a table that already has data in it.",
            'sql' => "ALTER TABLE products\n  ADD COLUMN supplier_id BIGINT UNSIGNED NULL,\n  ADD CONSTRAINT products_supplier_id_foreign\n    FOREIGN KEY (supplier_id) REFERENCES suppliers (id)\n    ON DELETE SET NULL;\n\n-- And what hasMany runs:\nSELECT * FROM products WHERE supplier_id = 1;",
        ],
    ];

    // Laravel's dev tools print test results as JSON when they think an AI coding agent is
    // running them (they look for these variables). A person is reading this page, so the
    // check always asks for the ordinary output. false removes a variable for that one run.
    private const NO_AGENT = [
        'AI_AGENT' => false, 'CLAUDECODE' => false, 'CLAUDE_CODE' => false, 'CLAUDE_CODE_IS_COWORK' => false,
        'CURSOR_AGENT' => false, 'CODEX_CI' => false, 'CODEX_SANDBOX' => false, 'CODEX_THREAD_ID' => false,
        'ANTIGRAVITY_AGENT' => false, 'AUGMENT_AGENT' => false, 'KIRO_AGENT_PATH' => false, 'PI_CODING_AGENT' => false,
    ];

    public function index()
    {
        return view('workshop.index', ['drills' => self::DRILLS]);
    }

    // What the connected database holds right now: every table the migrations made.
    public function schema()
    {
        $tables = $counts = [];
        foreach (['categories', 'products', 'tags', 'product_tag', 'suppliers'] as $table) {
            if (Schema::hasTable($table)) {
                $tables[$table] = Schema::getColumns($table);
                $counts[$table] = DB::table($table)->count();
            }
        }

        return view('workshop.schema', ['tables' => $tables, 'counts' => $counts, 'connection' => DB::connection()->getDriverName()]);
    }

    // Run one drill's test and report back. PHPUnit runs in its own process, against
    // whatever is in your files right now.
    public function check(int $number)
    {
        abort_unless(isset(self::DRILLS[$number]), 404);

        $result = Process::path(base_path())
            ->env(['APP_ENV' => 'testing', 'SESSION_DRIVER' => 'array', 'CACHE_STORE' => 'array',
                   'DB_CONNECTION' => 'sqlite', 'DB_DATABASE' => ':memory:'] + self::NO_AGENT)
            ->timeout(60)
            ->run([$this->php(), 'vendor/bin/phpunit', '--colors=never', '--filter', "Drill{$number}Test"]);

        return response()->json([
            'passed' => $result->successful(),
            'saw' => $result->successful() ? '' : $this->firstFailure($result->output().$result->errorOutput()),
        ]);
    }

    // Which php to run the test with. In Docker and under `php artisan serve` it is plain
    // "php". A Herd .test site is served by PHP-FPM, which has no "php" on its PATH, so
    // look beside the PHP that is answering this request.
    private function php(): string
    {
        $found = \Illuminate\Support\php_binary();
        if ($found !== 'php') {
            return $found;
        }
        $beside = dirname(PHP_BINARY).DIRECTORY_SEPARATOR.'php';

        return PHP_BINARY !== '' && is_executable($beside) ? $beside : 'php';
    }

    // PHPUnit's output is long. Keep the part a person needs: the failed assertion.
    private function firstFailure(string $output): string
    {
        // The first failure runs from "1) Test::name" to the first line that is a path inside
        // this project (the stack trace). base_path() is /app in Docker, and wherever the
        // folder lives when PHP runs on the laptop itself (Herd, for example).
        $root = preg_quote(base_path().DIRECTORY_SEPARATOR, '/');
        $text = preg_match('/^1\) .+?\R(.+?)\R'.$root.'/ms', $output, $m) ? $m[1] : substr($output, -800);
        // "Failed asserting that '<!doctype html>...the whole page...' contains ..." -> "...that the page contains ..."
        $text = preg_replace("/that '.{20,}?'(?: \\[[^\\]]*\\]\\(length: \\d+\\))? ((?:does not )?contain)/s", 'that the page $1', $text);
        $text = preg_replace('/ \[[A-Z0-9-]+\]\(length: \d+\)/', '', $text);
        return trim(mb_strimwidth(trim($text), 0, 600, '…'));
    }
}
