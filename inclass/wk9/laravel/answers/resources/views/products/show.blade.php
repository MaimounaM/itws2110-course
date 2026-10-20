{{-- One product. Drills 5, 6 and 9, solved. --}}
<x-layout :title="$product->name">
    <h1>{{ $product->name }}</h1>

    <dl class="facts">
        <dt>In stock</dt>
        <dd>{{ $product->quantity }}</dd>

        {{-- 5. A date object can format itself. ?-> gives null when there is no date. --}}
        <dt>Expires</dt>
        <dd>{{ $product->expires_on?->format('M j, Y') ?? 'no date' }}</dd>

        {{-- 6. Through the relationship. A product may have no category. --}}
        <dt>Category</dt>
        <dd>{{ $product->category?->name ?? 'none' }}</dd>

        {{-- 9. --}}
        <dt>Tags</dt>
        <dd>
            @forelse ($product->tags as $tag)
                <span class="tag">{{ $tag->name }}</span>
            @empty
                none
            @endforelse
        </dd>
    </dl>

    <p><a href="{{ route('products.index') }}">Back to the products</a></p>
</x-layout>
