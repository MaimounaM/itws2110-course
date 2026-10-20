# Eloquent, week 9 — models, migrations, relationships

[← Week 9](../../../weeks/week-09.md) · [Teaching guide](TEACHING.md) · [Worked answers](answers/README.md)

In Homework 6 the to-dos were an array typed into a PHP class. Real applications keep their
data in a database. This week the pantry gets one, and you meet the two tools Laravel gives
you for it: **migrations**, which describe the tables as code, and **Eloquent**, which turns
each row into an object. Twelve drills: in the first nine the models are written for you,
and in the last three you make one yourself.

| Drills | Topic | You edit | Checked by |
|---|---|---|---|
| 1–5 | Migrations and models | a migration, `ProductController.php`, `Product.php`, one view | the **Check result** button |
| 6–9 | Relationships | `Product.php`, `Category.php`, `ProductController.php`, two views | the **Check result** button |
| 10–12 | Your own model | files you generate with `php artisan make:...`, then `Product.php` | the **Check result** button |

The loop is the same as week 7: predict, change one thing, save, check, explain it to a partner.

## Set up — once, before class

Everything runs in Docker. From the course repository root:

```bash
cd inclass/wk9/laravel
docker compose watch
```

The first run builds the image and downloads MySQL, so give it a few minutes; do it **before
class**. If the week 7 workshop is still running, stop it first (`docker compose down` in its
folder): both use port 8000. When the terminal says `Watch enabled`, open
**http://localhost:8000**. That's the drills page.

Two containers start this time: `app`, the Laravel app, and `db`, MySQL. The app waits for
the database to be ready, builds the tables from the migrations, fills them from the seeder,
and then serves.

Leave that terminal running. Each save prints `Syncing`, and the next page load has your change.

Port 8000 taken? `APP_PORT=8001 docker compose watch`, then use http://localhost:8001.

## Two databases, and why

This is the one new idea in the setup, and it explains the most common confusion.

| | Uses | Changes when |
|---|---|---|
| **The pages you open** in the browser | the MySQL database in the `db` container | you run the migrations |
| **The Check result button** | a fresh, empty database in memory, built from your migrations every time | you save a file |

So after drill 1 the check passes the moment you save the migration, but the page still
shows the old table. To rebuild the MySQL tables from your migrations and seed them again:

```bash
docker compose exec app php artisan migrate:fresh --seed
```

Run that in a second terminal whenever you change a migration. The **Schema** page in the
nav bar shows what MySQL holds right now.

## A five-minute tour

| Path | What lives there |
|---|---|
| `database/migrations/` | The tables, as code. One file per change, run in file-name order. **Drill 1.** |
| `database/seeders/DatabaseSeeder.php` | The starting data: three categories, nine products, three tags. |
| `database/factories/` | Recipes for making test rows. The checks use them. |
| `app/Models/` | One class per table: `Product`, `Category`, `Tag`. **Drills 5, 6, 7, 9.** |
| `app/Http/Controllers/ProductController.php` | The queries. **Drills 2, 3, 4, 8.** |
| `resources/views/products/` and `categories/` | The pages. **Drills 5, 6, 7, 9.** |
| `routes/web.php` | The routes. Supplied; nothing to change. |
| `tests/Feature/Drills/` | The checks. Each one builds its own rows with factories. |

The tables:

```
categories              products                     tags
  id                      id                           id
  name                    name                         name
                          quantity
                          category_id  → categories.id       product_tag
                          (expires_on: drill 1)                product_id → products.id
                                                               tag_id     → tags.id
```

At the foot of every pantry page is **Queries this page ran**, with the SQL behind
"Show them" and the value sent for each `?`. Look at it after each drill: it is what your
PHP turned into. On the drills page, each drill also has **In plain SQL**: the SQL you
would have written by hand for the same job. Compare the two.

Useful in a second terminal:

```bash
docker compose exec app php artisan migrate:status     # which migrations have run
docker compose exec app php artisan tinker             # try Eloquent by hand: Product::count()
docker compose exec db mysql -uroot -psecret pantry    # the database itself: SHOW TABLES;
```

---

## Migrations and models — drills 1–5

### 1. A migration is the schema, as code · 5 minutes

The products table has no expiry date. In
`database/migrations/2026_10_20_000002_create_products_table.php`, add a date column called
`expires_on`. Some products never expire, so it has to be allowed to be empty.

**Done when:** the check passes — and, after `migrate:fresh --seed`, the **Schema** page lists
`expires_on` under products.
**Explain:** in Homework 1 you changed the schema by editing `init.sql`, and it only took
effect on an empty volume. What does a migration change about that?

### 2. A model reads the table · 4 minutes

`/products` shows three typed-in products. In `ProductController::index()`, replace them with
the rows of the table, in name order: `Product::orderBy('name')->get()`.

**Done when:** `/products` lists nine products, Apples first, and each name is a link.
**Explain:** open `app/Models/Product.php`. Nothing in it names a table or a column. How does
it know where to look?

### 3. Find one, or 404 · 3 minutes

Open `/products/9999`. It is an error page, because `find()` returned `null` and the view
tried to read a name from it. Change it to `findOrFail()`.

**Done when:** `/products/1` shows Rice and `/products/9999` is a 404.
**Explain:** `CategoryController::show()` gets the same result without calling either. Read
it. What is doing the lookup there?

### 4. Let the database do the filtering · 5 minutes

`/products/low` should list only products with fewer than 2 in stock, in name order. It
lists all nine. Use `where('quantity', '<', 2)`.

**Done when:** it lists Carrots, Oats and Tomatoes. Open **Show them** at the foot of the
page: the SQL has a `where` in it.
**Explain:** you could get the same page with `Product::all()` and an `@if` in the view. The
check would reject it. With nine products nobody could tell the difference; with nine million?

### 5. Casts: a column becomes a date · 5 minutes

Do drill 1 first, and run `migrate:fresh --seed`. `/products/1` shows the date as the
database stores it: `2027-04-30`, or similar. In `Product`, cast `expires_on` to a date; in
`products/show.blade.php`, print it with `->format('M j, Y')`.

**Done when:** `/products/1` shows a date like Apr 30, 2027, and `/products/7` (Beans, which
never expires) says no date.
**Explain:** why `?->format(...)` and not `->format(...)`? Take the `?` out and open
`/products/7`.

---

## Relationships — drills 6–9

### 6. belongsTo · 5 minutes

Every product row has a `category_id`: a number. Give `Product` a `category()` method that
returns `$this->belongsTo(Category::class)`, and print the category's name on the product page.

**Done when:** `/products/1` says Category: Grains.
**Explain:** you wrote a method, `category()`, and then used it without the brackets:
`$product->category`. What is the difference between the two?

### 7. hasMany · 5 minutes

The same link, from the other side. Give `Category` a `products()` method that returns
`$this->hasMany(Product::class)`, and list the products on the category page.

**Done when:** `/categories/1` lists Oats, Pasta and Rice, and nothing from the other categories.
**Explain:** how many columns in the database make these two relationships work?

### 8. The N+1 problem · 6 minutes

Do drills 2 and 6 first. Open `/products` and read the query count at the foot of the page:
**10**. One query for the list, and then one more for each product, to fetch its category.
Add `with('category')` to the query in `index()`.

**Done when:** `/products` runs **2** queries.
**Explain:** open **Show them** before and after. What is the second query after the fix,
and why does it stay one query however many products there are?

### 9. belongsToMany · 6 minutes

A product can have several tags, and a tag can be on several products. That takes a third
table, `product_tag`, with one row per pairing — it is already there. Give `Product` a
`tags()` method that returns `$this->belongsToMany(Tag::class)`, and list the tags on the
product page.

**Done when:** `/products/2` (Oats) lists staple and organic.
**Explain:** you never mentioned `product_tag`. How did Eloquent find it?

---

## Your own model — drills 10–12

Every model so far was written for you. Here you make one from nothing: a **Supplier**, the
company a product comes from. It's the *Generating Model Classes* section of the Eloquent
docs, done for real.

**Run the generators through the `test` container.** It shares your folder, so the files it
writes land on your laptop where your editor can see them, and `docker compose watch` syncs
them into the app. Run them with `docker compose exec app` instead and the files are made
inside the container, where you can't edit them.

```bash
docker compose run --rm test php artisan make:model Supplier -mf
```

### 10. A new model, from the command line · 5 minutes

Run the command above. `-m` also makes a migration and `-f` a factory, so three new files
appear: `app/Models/Supplier.php`, `database/factories/SupplierFactory.php`, and
`database/migrations/<today's date and time>_create_suppliers_table.php`. In the migration,
add a `name` that is required and an `email` that may be empty. Then build the table in MySQL:

```bash
docker compose exec app php artisan migrate
```

**Done when:** the check passes, and the **Schema** page lists `suppliers` with its columns.
**Explain:** run `docker compose exec app php artisan migrate:status`. Your migration is in
batch 2 and the others in batch 1. Why did `migrate` run only yours? And how did a class
called `Supplier` end up with a table called `suppliers`?

### 11. Fill it in: `$fillable` and a factory · 5 minutes

Two ways to make a supplier. Give `Supplier` a `$fillable` list with `name` and `email`, so
that `Supplier::create([...])` is allowed. Then fill in `definition()` in `SupplierFactory`,
for example `'name' => fake()->company()` and `'email' => fake()->companyEmail()`. Make three,
by hand:

```bash
docker compose exec app php artisan tinker
> App\Models\Supplier::factory()->count(3)->create();
```

**Done when:** the check passes, and the **Schema** page says `suppliers · 3 rows`.
**Explain:** before you add `$fillable`, the check says `create()` was refused. Why would a
framework refuse to save the columns you asked it to?

### 12. Connect it: a new migration, two relationships · 8 minutes

Do drills 10 and 11 first, and drill 6 if you haven't. Each product should know its
supplier. That's a new column on a table that already has rows in it, so it gets a **new**
migration. Don't edit `create_products_table` the way drill 1 did.

```bash
docker compose run --rm test php artisan make:migration add_supplier_id_to_products_table
```

In its `up()`, add `foreignId('supplier_id')`, `->nullable()` (the nine products already
there have no supplier) and `->constrained()`. In its `down()`, undo it:
`dropConstrainedForeignId('supplier_id')`. Then give `Supplier` a `products()` method
(`hasMany`) and `Product` a `supplier()` method (`belongsTo`), and run `migrate` again.

**Done when:** the check passes, and the **Schema** page lists `supplier_id` under products.
**Explain:** in tinker, give Rice a supplier, then run `php artisan migrate:rollback --step=1`
and `migrate` again. Rice's supplier is gone. What did `down()` undo, and what couldn't it?

---

## Hand it in — end of class

**Hand-in: push your copy of the workshop to your own repository at the end of class** —
with whatever you got through. Unfinished drills are fine; it counts toward participation,
not correctness.

Copy the `laravel` folder from `inclass/wk9/` in the course repo and paste it into
`inclass/wk9/` in your own repository (Finder or Explorer is fine), then commit and push.
Kept going after class? Copy, paste and push again — the latest push counts.

## When something breaks

| What you see | First thing to check |
|---|---|
| The first `docker compose watch` takes minutes | Normal, once: it is downloading PHP, MySQL and the packages |
| `port is already allocated` | The week 7 workshop, or something else, is on 8000. Stop it, or `APP_PORT=8001 docker compose watch` |
| The check passes but the page hasn't changed | You changed a migration. Run `docker compose exec app php artisan migrate:fresh --seed` |
| `Unknown column 'expires_on'` on a page | The same: MySQL still has the old table |
| `Attempt to read property "name" on null` | You have `null` where you expected a row or a related row. `findOrFail()` in drill 3; `?->` in drills 5 and 6 |
| `Call to a member function format() on string` | `expires_on` isn't cast to a date yet (drill 5) |
| `Call to undefined method App\Models\Product::tags()` | The relationship method isn't there yet, or is misspelled |
| `Class "App\Models\Categroy" not found` | A typo in the class name inside `belongsTo(...)` or `hasMany(...)` |
| `foreach() argument must be of type array\|object, null given` | You are looping over a relationship that doesn't exist yet |
| The query count didn't drop in drill 8 | `with('category')` goes before `->get()`, and the name is the method's name: `category` |
| `Connection refused` when the app starts | MySQL wasn't ready. `docker compose down`, then `docker compose watch` again |
| `make:model` said it worked, but there's no new file in your editor | You ran it with `docker compose exec app`, so the files were made inside the container. Run it again with `docker compose run --rm test php artisan ...` |
| `Table 'suppliers' already exists` | You generated the model twice, so there are two `create_suppliers_table` migrations. Delete one |
| `Add [name] to fillable property to allow mass assignment` | `$fillable` is missing from `Supplier`, or leaves out that column (drill 11) |
| `NOT NULL constraint failed: suppliers.name` in drill 11's check | The factory's `definition()` is still empty |
| On Linux, the generated files can't be saved | The container made them as root: `sudo chown -R $USER app database` |

Don't edit the tests to get a PASS.

## Verify the workshop

For instructors:

```bash
docker compose run --rm test       # the starter: all twelve drills fail, each on its own assertion
docker compose run --rm answers    # the worked answers, on a throwaway copy: all twelve pass
```

## Official references

- [Migrations](https://laravel.com/docs/13.x/migrations) — [the column types](https://laravel.com/docs/13.x/migrations#columns) for drill 1.
- [Eloquent: getting started](https://laravel.com/docs/13.x/eloquent) — models, conventions, [finding one row](https://laravel.com/docs/13.x/eloquent#retrieving-single-models).
- [Query builder: where clauses](https://laravel.com/docs/13.x/queries#where-clauses) — drill 4.
- [Attribute casting](https://laravel.com/docs/13.x/eloquent-mutators#attribute-casting) — drill 5.
- [Relationships](https://laravel.com/docs/13.x/eloquent-relationships) — [one to many](https://laravel.com/docs/13.x/eloquent-relationships#one-to-many), [many to many](https://laravel.com/docs/13.x/eloquent-relationships#many-to-many), and [eager loading](https://laravel.com/docs/13.x/eloquent-relationships#eager-loading) for drill 8.
- [Seeding](https://laravel.com/docs/13.x/seeding) · [Factories](https://laravel.com/docs/13.x/eloquent-factories) · [Database testing](https://laravel.com/docs/13.x/database-testing) — what the checks are made of.
