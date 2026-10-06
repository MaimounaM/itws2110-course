{{-- The shared layout -- supplied, leave it alone. A Blade component: a page uses it as
     <x-layout title="Notes"> ... </x-layout>, and whatever is between those tags arrives
     here as $slot. The same idea as React's children (week 6, drill 4). --}}
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
        <a href="/pantry">Pantry</a>
        <a href="/notes">Notes</a>
        <a href="/about">About</a>
    </nav>
    <main class="page">
        {{ $slot }}
    </main>
</body>
</html>
