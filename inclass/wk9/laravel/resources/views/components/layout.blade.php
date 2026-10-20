{{-- The shared layout -- supplied, leave it alone.
     The footer counts the SQL queries this page ran, and lists them with the values sent for
     each ? -- sent separately from the SQL, which is why they can't inject. Watch it in drill 8. --}}
@props(['title' => 'Pantry'])
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title }} · {{ config('app.name') }}</title>
    <link rel="stylesheet" href="/workshop.css">
</head>
<body>
    <nav class="site-nav">
        <a href="/">Drills</a>
        <a href="{{ route('products.index') }}">Products</a>
        <a href="{{ route('products.low') }}">Running low</a>
        <a href="/schema">Schema</a>
    </nav>
    <main class="page">
        {{ $slot }}
    </main>
    <footer class="queries">
        Queries this page ran: <strong id="query-count">{{ count(DB::getQueryLog()) }}</strong>
        <details><summary>Show them</summary>
            <ol>
                @foreach (DB::getQueryLog() as $query)
                    <li><code>{{ $query['query'] }}</code>
                        {{-- Not under the checks: their log also holds the test's own setup inserts,
                             and printing those values would put test data on the page. --}}
                        @if ($query['bindings'] && ! app()->runningUnitTests())
                            <span class="bindings">? = {{ collect($query['bindings'])->map(fn ($v) => is_null($v) ? 'NULL' : (is_string($v) ? "'$v'" : (is_bool($v) ? (int) $v : (string) $v)))->implode(', ') }}</span>
                        @endif
                    </li>
                @endforeach
            </ol>
        </details>
    </footer>
</body>
</html>
