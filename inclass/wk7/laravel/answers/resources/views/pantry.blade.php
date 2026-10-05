{{-- Worked answer for drill 3. --}}
<x-layout title="Pantry">
    <h1>Pantry</h1>
    <ul>
        @foreach ($items as $item)
            <li>{{ $item }}</li>
        @endforeach
    </ul>
</x-layout>
