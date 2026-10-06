<?php

namespace App\Http\Controllers\Workshop;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Process;

// The drills page -- supplied, leave this file alone.
//
// Each drill's Check result button runs that drill's test in tests/Feature/Drills/ --
// the same file `docker compose run --rm test` runs. A test makes a pretend request to
// your app inside the framework (no browser, no network) and checks what comes back.
// Friday is about writing tests like these yourself.
class WorkshopController extends Controller
{
    public const DRILLS = [
        1 => [
            'group' => 'Routes and views', 'title' => 'A route is one line', 'open' => '/hello', 'file' => 'routes/web.php',
            'goal' => 'A GET request for /hello answers with the text "Hello, Laravel!".',
            'hint' => "Route::get('/hello', function () { return 'Hello, Laravel!'; });",
            'idea' => "Week 3 checked every URL with an if. Here each URL is one line in a table, and the framework does the matching.",
        ],
        2 => [
            'group' => 'Routes and views', 'title' => 'Route parameters', 'open' => '/products/Oats', 'file' => 'routes/web.php',
            'goal' => '/products/Oats says "Product: Oats", and /products/Rice says "Product: Rice" — any name after the slash.',
            'hint' => "Route::get('/products/{name}', function (string \$name) { return \"Product: \$name\"; });",
            'idea' => "{name} in the URL becomes \$name in the function. Week 3 needed preg_match and a capture group for this.",
        ],
        3 => [
            'group' => 'Routes and views', 'title' => 'Return a view', 'open' => '/pantry', 'file' => 'routes/web.php and resources/views/pantry.blade.php',
            'goal' => '/pantry is rendered by the pantry view: an h1 "Pantry" and one list item each for Apples, Rice and Beans.',
            'hint' => "In the route: return view('pantry', ['items' => \$items]);  In the view: <h1>Pantry</h1> <ul> @foreach (\$items as \$item) <li>{{ \$item }}</li> @endforeach </ul>",
            'idea' => "The route decides what to show; the view decides how it looks. That split is the V in MVC.",
        ],
        4 => [
            'group' => 'Routes and views', 'title' => 'Escaping is the default', 'open' => '/notes', 'file' => 'resources/views/notes.blade.php',
            'goal' => 'The note on /notes shows the <script> tag as text instead of running it.',
            'hint' => 'Change {!! $note !!} to {{ $note }}.',
            'idea' => "Open /notes before you fix it: the alert is someone else's code running on your page. {{ }} runs every value through htmlspecialchars() for you.",
        ],
        5 => [
            'group' => 'Routes and views', 'title' => 'A layout', 'open' => '/about', 'file' => 'resources/views/about.blade.php',
            'goal' => '/about has the same nav bar as every other page, and its tab title starts with "About".',
            'hint' => 'Wrap the page in <x-layout title="About"> … </x-layout>.',
            'idea' => 'The layout shows whatever is between its tags as $slot — the same idea as React\'s children.',
        ],
        6 => [
            'group' => 'Controllers and requests', 'title' => 'A controller', 'open' => '/pantry', 'file' => 'routes/web.php and app/Http/Controllers/ProductController.php',
            'goal' => '/pantry is handled by ProductController\'s index method, and still shows the pantry view.',
            'hint' => "Move the route's body into index(). Then: Route::get('/pantry', [ProductController::class, 'index']);",
            'idea' => 'routes/web.php becomes a table of contents: which URL goes to which method. The C in MVC.',
        ],
        7 => [
            'group' => 'Controllers and requests', 'title' => 'Named routes', 'open' => '/notes', 'file' => 'routes/web.php and resources/views/notes.blade.php',
            'goal' => "The /pantry route is named pantry.index, and the notes page links to it by name.",
            'hint' => "Add ->name('pantry.index') to the /pantry route. In notes.blade.php: href=\"{{ route('pantry.index') }}\"",
            'idea' => 'Change the URL in one place and every link that asked for it by name follows.',
        ],
        8 => [
            'group' => 'Controllers and requests', 'title' => 'A real 404', 'open' => '/items/99', 'file' => 'routes/web.php',
            'goal' => '/items/2 says Rice. /items/99 answers with status 404, not a 200 that says "Not found".',
            'hint' => 'if (! isset($items[$id])) { abort(404); }  — or in one line: abort_unless(isset($items[$id]), 404);',
            'idea' => 'Week 3 called http_response_code(404) and printed a page by hand. abort(404) stops the request and Laravel sends a proper Not Found page.',
        ],
        9 => [
            'group' => 'Controllers and requests', 'title' => 'The framework hands you the request', 'open' => '/pantry?sort=az', 'file' => 'app/Http/Controllers/ProductController.php',
            'goal' => '/pantry?sort=az lists Apples, Beans, Rice. Plain /pantry still lists Apples, Rice, Beans. Do drill 6 first.',
            'hint' => "public function index(Request \$request) { … if (\$request->query('sort') === 'az') { sort(\$items); } … }",
            'idea' => 'You never call index(). Laravel reads the type Request, builds one, and passes it in. That is called dependency injection.',
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

    // Run one drill's test and report back. PHPUnit runs in its own process, against
    // whatever is in your files right now.
    public function check(int $number)
    {
        abort_unless(isset(self::DRILLS[$number]), 404);

        $result = Process::path(base_path())
            ->env(['APP_ENV' => 'testing', 'SESSION_DRIVER' => 'array', 'CACHE_STORE' => 'array'] + self::NO_AGENT)
            ->timeout(60)
            ->run(['php', 'vendor/bin/phpunit', '--colors=never', '--filter', "Drill{$number}Test"]);

        return response()->json([
            'passed' => $result->successful(),
            'saw' => $result->successful() ? '' : $this->firstFailure($result->output().$result->errorOutput()),
        ]);
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
