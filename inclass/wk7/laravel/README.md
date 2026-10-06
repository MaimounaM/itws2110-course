# Laravel, week 7 — what a framework buys you

[← Week 7](../../../weeks/week-07.md) · [Teaching guide](TEACHING.md) · [Worked answers](answers/README.md)

In week 3 you read a PHP app whose `public/index.php` did everything by hand: it looked at
the URL with a chain of `if`s and `preg_match`, escaped every value with `htmlspecialchars()`,
and set status codes with `http_response_code()`. This week the same jobs are done by a
framework. Nine drills, each one a thing you wrote yourself in week 3 and now get for free.

| Drills | Topic | You edit | Checked by |
|---|---|---|---|
| 1–5 | Routes and views | `routes/web.php`, `resources/views/` | the **Check result** button |
| 6–9 | Controllers and requests | `routes/web.php`, `app/Http/Controllers/ProductController.php` | the **Check result** button |

The loop is the same as the React drills: predict, change one thing, save, check, explain it
to a partner.

## Set up — once, before class

Everything runs in Docker, like week 3. You don't install PHP or Composer on your laptop.
From the course repository root:

```bash
cd inclass/wk7/laravel
docker compose watch
```

The first run builds the image: it downloads PHP and about a hundred Composer packages, so
give it two or three minutes. Do it **before class**. When the terminal says
`Watch enabled`, open **http://localhost:8000**. That's the drills page.

Leave that terminal running. Each time you save a file under `app/`, `routes/`, `resources/`
or `tests/`, it prints `Syncing` and the container has your change. Reload the page and you
see it — PHP reads your files again on every request. `Ctrl+C` stops watching;
`docker compose down` stops the container.

Port 8000 taken? `APP_PORT=8001 docker compose watch`, then use http://localhost:8001.

### Optional: Laravel Herd instead of Docker

Skip this unless you already use [Laravel Herd](https://herd.laravel.com) or want to try it.
Herd is a free Mac and Windows app that installs PHP and Composer on your laptop itself.
Docker is what the course supports, and what the homework instructions assume.

With Docker, Laravel's packages (`vendor/`) and the settings file (`.env`) are made inside the
image. With Herd nothing makes them for you, so you create them once, in this folder:

```bash
cd inclass/wk7/laravel
composer install
cp .env.example .env
php artisan key:generate
```

Then start the app and open **http://127.0.0.1:8000**:

```bash
php artisan serve
```

Skip a step and you'll see one of these:

| What you see | The step you skipped |
|---|---|
| `Failed to open stream … vendor/autoload.php` | `composer install` |
| A bare `500 Server Error` | `cp .env.example .env`, then `php artisan key:generate` |

Two differences from the Docker instructions:

- Commands run directly, with no `docker compose exec app` in front: `php artisan route:list`.
- **Check result** works as it does in Docker. To run the checks from the terminal instead:
  `php artisan test` for all nine, `php artisan test --filter Drill1Test` for one.

Herd can also serve the folder as a site of its own, instead of `php artisan serve`: **Add
Site** in the Herd app, or `herd link` in this folder, gives you http://laravel.test. The
drills page and **Check result** work the same there.

Both `vendor/` and `.env` are in `.gitignore`, so neither is committed. Don't run Docker and
`php artisan serve` on port 8000 at the same time.

## A five-minute tour

A Laravel app is a folder of conventions. You don't decide where things go; the framework
already did. That is half of what it buys you.

| Path | What lives there |
|---|---|
| `public/index.php` | The front controller. Every request enters here — open it, it's about twenty lines. Week 3's `index.php` did the same job, by hand. |
| `routes/web.php` | The routing table: which URL runs which code. **You edit this.** |
| `app/Http/Controllers/` | Controllers: classes whose methods answer requests. **You edit `ProductController.php`.** |
| `resources/views/` | Blade templates — HTML with `{{ }}` for values and `@foreach` for loops. **You edit these.** |
| `resources/views/components/` | Reusable pieces. `layout.blade.php` is the shared page shell. |
| `config/` and `.env` | Settings. `.env` holds the ones that change per machine, and is never committed. |
| `tests/` | Tests. The drill checks live in `tests/Feature/Drills/`. |
| `vendor/` | Laravel itself and its packages — inside the container only (in this folder if you use Herd). |
| `artisan` | Laravel's command-line tool. |

To see the routing table the framework built from `routes/web.php`, in a second terminal:

```bash
docker compose exec app php artisan route:list
```

## The files you touch

| File | Drills |
|---|---|
| `routes/web.php` | 1, 2, 3, 6, 7, 8 |
| `resources/views/pantry.blade.php` | 3 |
| `resources/views/notes.blade.php` | 4, 7 |
| `resources/views/about.blade.php` | 5 |
| `app/Http/Controllers/ProductController.php` | 6, 9 |

Leave everything else alone, including `routes/workshop.php`, `app/Http/Controllers/Workshop/`
and `tests/` — those run the drills page and the checks.

---

## Routes and views — drills 1–5

### 1. A route is one line · 4 minutes

Week 3 answered `/api/health` with `if ($method === 'GET' && $path === '/api/health')`. In
Laravel that `if` is one line in `routes/web.php`. Add a route: a GET request for `/hello`
answers with the text `Hello, Laravel!`.

**Done when:** `/hello` says Hello, Laravel! and the check passes.
**Explain:** who decides that `/hello` runs your function — you, or the framework?

### 2. Route parameters · 5 minutes

The starter route only answers `/products/rice`. Change the URL to `/products/{name}` and give
the function a `$name` parameter: whatever comes after the slash arrives in it.

**Done when:** `/products/Oats` says Product: Oats, and `/products/Rice` says Product: Rice.
**Explain:** week 3 needed `preg_match('#^/api/products/(\d+)$#', ...)` for this. What does
`{name}` save you?

### 3. Return a view · 6 minutes

The `/pantry` route builds HTML by gluing strings together. Move the markup into
`resources/views/pantry.blade.php`, using `@foreach` for the list and `{{ $item }}` for each
name, and have the route `return view('pantry', ['items' => $items]);`.

**Done when:** `/pantry` shows the heading and the three items, and the check passes — it
confirms the page came from the `pantry` view.
**Explain:** what does the route still decide, and what does the view decide now?

### 4. Escaping is the default · 4 minutes

Open `/notes` first. The alert is a `<script>` tag that a stranger typed into a note, running
in your page — the attack is called cross-site scripting (XSS). The view prints the note with
`{!! $note !!}`, which sends it exactly as it arrived. Change it to `{{ $note }}`.

**Done when:** `/notes` shows the `<script>` tag as text and nothing pops up.
**Explain:** week 3 wrapped every value in `htmlspecialchars()` by hand. What happens the day
someone forgets one? What does Blade change about that?

### 5. A layout · 5 minutes

`/about` has no nav bar and a bare tab title, because it isn't using the layout every other
page shares. Wrap the page in `<x-layout title="About"> … </x-layout>`.

**Done when:** `/about` has the nav bar and its tab title starts with About.
**Explain:** the layout prints whatever is between its tags as `{{ $slot }}`. Which React idea
from week 6 is that?

---

## Controllers and requests — drills 6–9

### 6. A controller · 6 minutes

Move the body of the `/pantry` route into `ProductController`'s `index()` method, then replace
the whole route with one line:

```php
Route::get('/pantry', [ProductController::class, 'index']);
```

**Done when:** `/pantry` looks exactly the same, and the check confirms `ProductController@index`
answered it.
**Explain:** `routes/web.php` is now a table of contents. Why is that worth an extra file?

### 7. Named routes · 4 minutes

Add `->name('pantry.index')` to the end of the `/pantry` route. Then, in `notes.blade.php`, change
the hard-coded `href="/pantry"` to `href="{{ route('pantry.index') }}"`.

**Done when:** the check passes.
**Explain:** change `/pantry` to `/my-pantry` in `routes/web.php` and click the link on `/notes`.
Then change it back. What would have happened to the hard-coded link?

### 8. A real 404 · 4 minutes

`/items/99` answers "Not found" — with status **200**, which tells browsers, search engines and
every API client that everything is fine. Make an unknown id stop with `abort(404)`.

**Done when:** `/items/2` says Rice, and `/items/99` shows Laravel's 404 page. In DevTools'
Network tab, its status is 404.
**Explain:** week 3 called `http_response_code(404)` and printed its own page. Where does
Laravel's 404 page come from?

### 9. The framework hands you the request · 6 minutes

Do drill 6 first. `/pantry?sort=az` should list the items A to Z. Add `Request $request` to
`index()`'s parameters and use `$request->query('sort')`; `sort($items)` sorts the array.

Don't read `$_GET['sort']`. It works in the browser but fails the check, because the check
builds its request inside the framework without touching `$_GET` — the same way Friday's
tests will.

**Done when:** `/pantry?sort=az` lists Apples, Beans, Rice, and plain `/pantry` still lists
Apples, Rice, Beans.
**Explain:** you never call `index()`, and you never build a `Request`. Who does both? This is
called inversion of control: the framework calls your code, not the other way round.

---

## Hand it in — end of class

**Hand-in: push your copy of the workshop to your own repository at the end of class** —
with whatever you got through. Unfinished drills are fine; it counts toward participation,
not correctness.

Copy the `laravel` folder from `inclass/wk7/` in the course repo and paste it into
`inclass/wk7/` in your own repository (Finder or Explorer is fine), then commit and push.
There is no `vendor/` folder to leave behind — it only exists inside the container (with Herd,
`.gitignore` keeps it and `.env` out of the commit). Kept going
after class? Copy, paste and push again — the latest push counts.

## When something breaks

Laravel shows its own error page when something goes wrong. Read the first line — it names
the problem and usually the file. The ones you're most likely to see:

| What you see | First thing to check |
|---|---|
| The first `docker compose watch` takes minutes | Normal, once: it is downloading PHP and the packages. Later starts take seconds |
| `port is already allocated` | Something else is on 8000 — stop it, or `APP_PORT=8001 docker compose watch` |
| Your edit doesn't show up | Is the watch terminal still running? Each save should print `Syncing` |
| `404 Not Found` for your new route | The URL in `Route::get('/...')` doesn't match what you typed — check spelling and the leading slash |
| `Undefined variable $items (View: …pantry.blade.php)` | The view uses `$items` but the route didn't pass it: `view('pantry', ['items' => $items])` |
| `syntax error, unexpected token "endif" (View: …)` | A Blade block isn't closed — here a missing `@endforeach`. The message names a different keyword than the one you forgot |
| `Call to undefined method App\Http\Controllers\ProductController::indx()` | The method name in the route doesn't match the method in the controller |
| The alert on `/notes` won't go away after drill 4 | Hard-refresh the page; check you changed `{!! !!}` to `{{ }}`, not just one side |
| Drill 9 works in the browser but the check fails | You read `$_GET`. Use `$request->query('sort')` |

Don't edit the tests to get a PASS. The checks look at what your app sends back; the
explanations are part of each drill.

## Verify the workshop

For instructors:

```bash
docker compose run --rm test       # the starter: all nine drills fail, each on its own assertion
docker compose run --rm answers    # the worked answers, on a throwaway copy: all nine pass
```

## Official references

- [Request lifecycle](https://laravel.com/docs/13.x/lifecycle) — what happens between `public/index.php` and your route.
- [Directory structure](https://laravel.com/docs/13.x/structure) · [Routing](https://laravel.com/docs/13.x/routing) · [Blade](https://laravel.com/docs/13.x/blade) · [Controllers](https://laravel.com/docs/13.x/controllers) · [Requests](https://laravel.com/docs/13.x/requests)
- [Service container](https://laravel.com/docs/13.x/container) — how drill 9's `Request` arrives.
- [HTTP tests](https://laravel.com/docs/13.x/http-tests) — what the drill checks are, and Friday's topic.
