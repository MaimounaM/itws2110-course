{{-- One category. Drill 7, solved. --}}
<x-layout :title="$category->name">
    <p class="kicker">Category</p>
    <h1>{{ $category->name }}</h1>

    <ul class="in-category">
        @foreach ($category->products as $product)
            <li><a href="{{ route('products.show', ['id' => $product->id]) }}">{{ $product->name }}</a> · {{ $product->quantity }} in stock</li>
        @endforeach
    </ul>

    <p><a href="{{ route('products.index') }}">Back to the products</a></p>
</x-layout>
