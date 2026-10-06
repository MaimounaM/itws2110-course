<x-layout title="Notes">
    <h1>Notes</h1>

    {{-- 4. {!! !!} prints the note exactly as it arrived -- including the <script> tag a
         stranger typed into it, which the browser then runs. Week 3 wrapped every value in
         htmlspecialchars() by hand. In Blade, {{ }} does that for you: change the line below
         to use double braces. --}}
    <p class="note">{!! $note !!}</p>

    {{-- 7. This link hard-codes the URL. If the pantry ever moves, every link like this
         breaks, silently. Once the route has a name (routes/web.php), ask for its URL by
         name instead:  href="{{ route('pantry.index') }}"  --}}
    <p><a href="/pantry">Back to the pantry</a></p>
</x-layout>
