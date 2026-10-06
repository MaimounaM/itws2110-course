{{-- The drills page -- supplied, leave it alone. --}}
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Week 7 drills · Laravel</title>
    <link rel="stylesheet" href="/workshop.css">
</head>
<body>
<main class="page workshop">
    <p class="kicker">ITWS 2110 · Laravel lab · week 7</p>
    <h1>What a framework buys you</h1>
    <p>Nine drills. Each one names the file to edit. Save, then press <strong>Check result</strong> —
        it runs that drill's test against your files as they are right now.
        <strong>Open</strong> shows the page in a new tab.</p>

    @foreach (collect($drills)->groupBy('group', true) as $group => $items)
        <h2>{{ $group }}</h2>
        @foreach ($items as $number => $drill)
            <section class="drill" id="drill-{{ $number }}">
                <h3>{{ $number }}. {{ $drill['title'] }}</h3>
                <p><strong>Goal:</strong> {{ $drill['goal'] }}</p>
                <p class="file">Edit <code>{{ $drill['file'] }}</code></p>
                <div class="actions">
                    <button type="button" class="check" data-drill="{{ $number }}">Check result</button>
                    <a class="open" href="{{ $drill['open'] }}" target="_blank">Open {{ $drill['open'] }}</a>
                </div>
                <p class="status" role="status" id="status-{{ $number }}">Not checked yet.</p>
                <pre class="saw" id="saw-{{ $number }}" hidden></pre>
                <details><summary>Why it matters</summary><p>{{ $drill['idea'] }}</p></details>
                <details><summary>Small hint</summary><pre>{{ $drill['hint'] }}</pre></details>
            </section>
        @endforeach
    @endforeach

    <p class="foot">All nine at once, in a terminal: <code>docker compose run --rm test</code>.
        Worked answers: the <code>answers/</code> folder.</p>
</main>
<script>
document.querySelectorAll('button.check').forEach(button => {
    button.addEventListener('click', async () => {
        const n = button.dataset.drill;
        const status = document.getElementById('status-' + n);
        const saw = document.getElementById('saw-' + n);
        status.textContent = 'Checking…';
        status.className = 'status';
        saw.hidden = true;
        try {
            const response = await fetch('/drills/' + n + '/check');
            const result = await response.json();
            status.textContent = result.passed ? 'PASS — goal reached.' : 'TRY AGAIN — the check says:';
            status.className = 'status ' + (result.passed ? 'pass' : 'fail');
            if (!result.passed) { saw.textContent = result.saw; saw.hidden = false; }
        } catch (error) {
            status.textContent = 'The check itself failed to run: ' + error.message;
            status.className = 'status fail';
        }
    });
});
</script>
</body>
</html>
