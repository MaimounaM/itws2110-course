{{-- Worked answers for drills 4 and 7. --}}
<x-layout title="Notes">
    <h1>Notes</h1>

    {{-- 4. Double braces: the note is escaped, so its <script> tag shows as text. --}}
    <p class="note">{{ $note }}</p>

    {{-- 7. The link asks for the route by name. Move the route and this follows. --}}
    <p><a href="{{ route('pantry.index') }}">Back to the pantry</a></p>
</x-layout>
