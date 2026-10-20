{{-- One product. Drills 5, 6 and 9 each change one line here. --}}
<x-layout :title="$product->name">
    <h1>{{ $product->name }}</h1>

    <dl class="facts">
        <dt>In stock</dt>
        <dd>{{ $product->quantity }}</dd>

        {{-- TODO 5: once expires_on is cast to a date, print it like "Oct 30, 2026":
                     $product->expires_on?->format('M j, Y')
             The ?-> is for products with no date: it gives null instead of an error. --}}
        <dt>Expires</dt>
        <dd>{{ $product->expires_on ?? 'no date' }}</dd>

        {{-- TODO 6: the category's name, through the relationship: $product->category?->name --}}
        <dt>Category</dt>
        <dd>—</dd>

        {{-- TODO 9: loop over $product->tags and print each tag's name --}}
        <dt>Tags</dt>
        <dd>—</dd>
    </dl>

    <p><a href="{{ route('products.index') }}">Back to the products</a></p>
</x-layout>
