# Teaching the week 9 Eloquent drills

[Student instructions](README.md)

| Part | Course session | Suggested allocation |
|---|---|---|
| Migrations and models (drills 1–5) | 15, Tue 10/20 | ~40 minutes of lecture — the mismatch between objects and tables, Active Record, migrations as versioned schema — then 25–30 minutes for drills 1–5 in pairs |
| Relationships (drills 6–9) | 16, Fri 10/23 | 10 minutes recap, 25 for drills 6–9, with drill 8 done together on the projector; then read one drill test as the bridge into database testing |
| Your own model (drills 10–12) | 10–11 Tue for pairs who finish 1–5, otherwise Fri; 12 Fri after 9 | 10 and 11 take about 10 minutes together. Drill 12 needs drill 6's belongsTo, about 8 minutes |

## Before class

- **Build on the teaching machine**: `docker compose watch` in `inclass/wk9/laravel`. It pulls
  the MySQL image as well as building the app. Ask students to do it before Tuesday.
- **Port 8000 is shared with the week 7 workshop.** Anyone who left that running gets
  `port is already allocated`. Say so at the start.
- Run both checks: `docker compose run --rm test` (twelve drills, fifteen failures, each a real
  assertion) and `docker compose run --rm answers` (fifteen passes).
- Teach from a copy of the folder if you will solve drills live, so the course copy stays a starter.

## The one thing to explain twice: two databases

The pages use MySQL. The checks use an in-memory SQLite database that every test builds from
the migrations and throws away. After drill 1 the check is green and the page is unchanged
until `migrate:fresh --seed` is run. That is confusing for about a minute and then it is the
best illustration of the day: the same migrations and the same model code ran against two
different database engines, and nobody wrote any SQL for either. Put the **Schema** page on
screen, run `migrate:fresh --seed`, reload.

It is also the honest moment for the ORM's limits: SQLite and MySQL are not the same, and a
test suite on one does not prove the app on the other. (Here the checks avoid anything where
they differ.)

## The thread through the two sessions

| Drill | By hand (week 3, Homework 1) | Eloquent |
|---|---|---|
| 1 | `init.sql`, run once on an empty volume | a migration: versioned, re-runnable, in git |
| 2 | `SELECT * FROM products ORDER BY name` and a loop over arrays | `Product::orderBy('name')->get()` |
| 3 | `if ($row === false) { http_response_code(404); ... }` | `findOrFail()` |
| 4 | a `WHERE` clause you concatenate, or bind by hand | `where('quantity', '<', 2)`, bound for you |
| 5 | `new DateTime($row['expires_on'])` everywhere | one line in `casts()` |
| 6–7 | a `JOIN`, and code to group the rows | `belongsTo` / `hasMany` |
| 8 | you would have written the join | the ORM hides the queries, so you must count them |
| 9 | a join through the pairing table | `belongsToMany` |

## Showing the SQL

Every drill on the drills page has an **In plain SQL** panel: the hand-written SQL for the
same job (an `ALTER TABLE`, a `SELECT ... WHERE`, a `JOIN`). Every pantry page's footer
lists the SQL Eloquent actually ran, with the value sent for each `?`. The useful moments
are where the two differ: drill 6, where by hand you would join and Eloquent runs a second
query instead, and drill 8, where the panel lists the ten queries before the fix. To run SQL
live: `docker compose exec db mysql -uroot -psecret pantry`.

The values are left out while the checks run: a test's query log also holds its own setup
inserts, and printing those would put test data on the page.

## The pauses that matter

- **After 2:** open `Product.php`. It is nearly empty. Ask where the table name and the
  columns are. This is Active Record: the class *is* the row, and it finds its table by its
  own name. The docs' introduction, the week's reading, describes it without the name:
  each table has a model, and the model inserts, updates and deletes its rows.
- **After 3:** read `CategoryController::show(Category $category)` together. Route model
  binding is `findOrFail()` plus drill 9 of week 7: the framework sees a type and supplies it.
- **During 4:** have someone solve it with `Product::all()` and an `@if`. The page is right
  and the check fails, with a message that says why. Open "Show them" on both versions.
- **After 6:** `$product->category()` versus `$product->category`. The method returns a
  relationship you can keep querying; the property runs it and gives you the result.
- **Drill 8, together:** before the fix, read the count aloud: 10. Ask what it would be with
  a thousand products. Then add `with('category')` and reload: 2. Open "Show them": the
  second query is `where id in (1, 2, 3)`. This is the N+1 problem, and it is the single
  most common performance bug in ORM code. The *Eager Loading* section of the Eloquent docs,
  Friday's reading, describes exactly this.
- **After 9:** nobody typed `product_tag`. Eloquent derived it: the two model names,
  singular, alphabetical, joined by an underscore. Convention over configuration, and a good
  example of the cost: when the guess is wrong you have to know the rule to find out why.

## Drills 10–12: a model from nothing

The first nine drills fill in models that already exist. These three are what students will
do on their own projects: generate a model, give it a table, connect it to another one.

- **The one setup trap:** generators must run through `docker compose run --rm test`, which
  bind-mounts the folder. `docker compose exec app php artisan make:model` reports success
  and writes the files inside the container, where nobody's editor can see them. Say this
  before anyone types the command.
- **After 10:** `migrate`, not `migrate:fresh`, then `migrate:status`. The new migration is
  in batch 2: Laravel's `migrations` table records what has run, and `migrate` runs only
  what hasn't. This is the versioned-schema slide made real. Ask how `Supplier` found the
  table `suppliers` (convention, the same as drill 2).
- **During 11:** let the first check fail on `$fillable`. The message is Laravel's own:
  *Add [name] to fillable property to allow mass assignment*. Ask why it refuses: a form
  posting `is_admin=1` is the classic answer, and it comes back in the security session.
- **Drill 12 is slide 11 of Tuesday's deck, live.** A new migration, not an edit, because
  the table has data in it. Then the demo: in tinker give Rice a supplier,
  `migrate:rollback --step=1`, `migrate`. The column comes back; Rice's supplier doesn't.
  `down()` reverses the schema, not the data.

Verified on a scratch copy, against MySQL with the seeded pantry: all three generate, migrate
and roll back cleanly, and each check fails with a message that says what to do next.

## Friday's bridge into database testing

Open `tests/Feature/Drills/Drill7Test.php`. Three things are new since week 7's tests:
`use RefreshDatabase` (an empty database, from the migrations, for every test);
`Category::factory()->create([...])` (rows made by a recipe, with only the interesting
values stated); and an assertion about the page *and* about the model. Each test makes its
own data, which is the same rule as week 3's `Apples ${Date.now()}`.

Drill 8's test is the one worth reading closely: it counts queries. A performance rule,
written as a test.

## How the checks work

The **Check result** button calls `WorkshopController::check()`, which runs
`vendor/bin/phpunit --filter DrillNTest` in a separate process with
`DB_CONNECTION=sqlite` and `DB_DATABASE=:memory:`. `phpunit.xml` forces the same two values,
so `docker compose run --rm test` behaves identically and needs no MySQL container.

## Exit prompt

"Name one thing Eloquent did for you today that you would otherwise have written in SQL,
and one thing it did that you could not see." The second half is the point: drill 8.
