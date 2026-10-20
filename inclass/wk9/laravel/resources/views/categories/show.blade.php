{{-- One category. Drill 7 is here. --}}
<x-layout :title="$category->name">
    <p class="kicker">Category</p>
    <h1>{{ $category->name }}</h1>

    {{-- TODO 7: list this category's products, one <li> each, through the relationship:
             @foreach ($category->products as $product) ... @endforeach --}}
    <ul class="in-category">
    </ul>

    <p><a href="{{ route('products.index') }}">Back to the products</a></p>
</x-layout>
