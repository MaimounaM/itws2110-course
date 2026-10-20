{{-- A list of products -- supplied, leave it alone. /products and /products/low both use it.
     It prints each product's category, which is what makes drill 8 interesting. --}}
<x-layout :title="$heading">
    <h1>{{ $heading }}</h1>

    <table class="products">
        <thead>
            <tr><th>Product</th><th>In stock</th><th>Category</th></tr>
        </thead>
        <tbody>
            @foreach ($products as $product)
                <tr>
                    <td>
                        @if ($product->id)
                            <a href="{{ route('products.show', ['id' => $product->id]) }}">{{ $product->name }}</a>
                        @else
                            {{ $product->name }}
                        @endif
                    </td>
                    <td>{{ $product->quantity }}</td>
                    <td>{{ $product->category?->name ?? '—' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <p class="file">{{ count($products) }} listed.</p>
</x-layout>
