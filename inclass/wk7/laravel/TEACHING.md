# Teaching the week 7 Laravel drills

[Student instructions](README.md)

| Part | Course session | Suggested allocation |
|---|---|---|
| Routes and views (drills 1–5) | 12 | ~45 minutes of lecture — what a framework buys you, pattern by pattern — then 25 minutes for drills 1–5 in pairs |
| Controllers and requests (drills 6–9) | 13 | 10 minutes recap, 20 for drills 6–9, then read one drill test together as the bridge into HTTP tests; Quiz 1 review takes the rest |

The deck is `itws2110-instructor/powerpoint/12_laravel_framework.pptx`, built by
`scripts/laravel-deck.js`. Its pattern slides line up with the drills: each pattern is
something week 3's `public/index.php` did by hand.

## Before class

- **Build the image on the teaching machine** — `docker compose watch` in `inclass/wk7/laravel`.
  The first build downloads PHP and about a hundred packages (two to three minutes). Tell
  students on Friday or by announcement to do the same before Tuesday; on conference wifi,
  thirty simultaneous first builds are the main risk to the session.
- Run both checks: `docker compose run --rm test` (nine failures, each a real assertion) and
  `docker compose run --rm answers` (nine passes).
- Teach from a copy of the folder if you're going to solve drills live, so the course copy
  stays a starter.

## The thread through the session

Week 3's `inclass/wk3/pantry/public/index.php` is the "before" picture. It has a comment saying
frameworks do the same thing "with a lot more machinery; this is the idea with the machinery
removed." Put it on screen next to Laravel's `public/index.php` (20 lines, ending in
`$app->handleRequest(Request::capture())`) and the session's argument is visible: same front
controller, but the routing, escaping, status codes and request parsing moved into the framework.

| Drill | What week 3 did by hand | What Laravel gives you |
|---|---|---|
| 1 | `if ($method === 'GET' && $path === …)` | `Route::get('/hello', …)` |
| 2 | `preg_match('#^/api/products/(\d+)$#', $path, $m)` | `/products/{name}` |
| 3 | `echo` with HTML in strings | a view, `@foreach` |
| 4 | `htmlspecialchars()` on every value | `{{ }}` escapes by default |
| 5 | a header and footer pasted into every page | a layout component, `$slot` |
| 6 | one 246-line file | controllers, one class per kind of thing |
| 7 | URLs typed into links | named routes |
| 8 | `http_response_code(404)` and a hand-made page | `abort(404)` |
| 9 | `$_SERVER`, `$_GET`, `$_POST` | a `Request`, handed to you |

## The pauses that matter

- **Before 1:** ask who calls the function they're about to write. Nobody in their code does.
  That is inversion of control in its smallest form: a framework calls you.
- **During 4:** have everyone open `/notes` *before* fixing it. The alert is the lesson. Then
  ask what week 3 would have needed to stop it, and how many places that is in a real app.
  Worth naming: a route that returns a plain string (drill 2) is *not* escaped — `{{ }}` only
  protects what goes through Blade.
- **After 5:** "the layout shows whatever is between its tags as `$slot`" — let someone say
  "that's `children`" before you do.
- **After 6:** run `docker compose exec app php artisan route:list` before and after the drill.
  The closure becomes `ProductController@index`; the routing table is now readable.
- **After 7:** do the explain step live — rename the URL to `/my-pantry`, click the link on
  `/notes`, rename it back.
- **After 8:** open DevTools' Network tab on `/items/99` before and after. Same words on the
  page, different status; only one is true.
- **During 9:** someone will use `$_GET`, see it work in the browser, and fail the check.
  That is the best moment of the day for the Request object: the test built a request
  without a browser, and code that reads superglobals can't be tested that way.

## Friday's bridge into HTTP tests

Every **Check result** runs a file in `tests/Feature/Drills/`. Open `Drill8Test.php`:

```php
$this->get('/items/2')->assertOk()->assertSeeText('Rice');
$this->get('/items/99')->assertNotFound();
```

It is three lines, and it is Friday's whole topic: a request made inside the framework, then
assertions about the response. Ask the room to write the test for drill 1 on the board before
opening `Drill1Test.php`.

## How the checks work

The drills page's **Check result** calls `WorkshopController::check()`, which runs
`vendor/bin/phpunit --filter DrillNTest` in a separate process inside the container and
shows the first failed assertion, condensed. Same tests as `docker compose run --rm test`.
Students can read the tests; the checks only look at what the app sends back, so a drill
can't be passed by editing anything but the drill's own files — short of editing the tests,
which the README asks them not to do.

## Exit prompt

"Name one thing week 3's `index.php` did by hand that Laravel now does for you, and one thing
you gave up to get it." Anything true counts: the routing table for the `if` chain, `{{ }}` for
`htmlspecialchars()`; and on the other side — control over the request lifecycle, a hundred
packages you didn't write, conventions you have to learn before you can move.
