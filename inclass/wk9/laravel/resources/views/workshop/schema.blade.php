{{-- What the database holds right now -- supplied, leave it alone. --}}
<x-layout title="Schema">
    <p class="kicker">The database, as it is right now</p>
    <h1>Schema</h1>
    <p>These are the tables your app is connected to ({{ $connection }}), read from the database
       itself. Change a migration and nothing here moves until you run it:</p>
    <pre>docker compose exec app php artisan migrate:fresh --seed</pre>

    @foreach ($tables as $table => $columns)
        <h2>{{ $table }} <span class="file">· {{ $counts[$table] }} rows</span></h2>
        <table class="products">
            <thead><tr><th>Column</th><th>Type</th><th>Can be empty</th></tr></thead>
            <tbody>
                @foreach ($columns as $column)
                    <tr><td><code>{{ $column['name'] }}</code></td><td>{{ $column['type'] }}</td><td>{{ $column['nullable'] ? 'yes' : 'no' }}</td></tr>
                @endforeach
            </tbody>
        </table>
    @endforeach
</x-layout>
