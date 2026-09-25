// Homework 4, Part 2 -- your pantry. This is the file you build.
// Open http://127.0.0.1:5173/ to see it. The five TODOs are the five graded requirements.
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

// TODO 1: a PantryCard. Start from your drill 11 PantryCard in capstone.jsx: it shows
// the name and "Quantity: N" and has an "Add one" button. Give it a second button,
// "Remove", that calls an onRemove prop.

export default function MyPantry() {
  const [products, setProducts] = useState([
    { id: 'a', name: 'Apples', quantity: 0 },
    { id: 'r', name: 'Rice', quantity: 0 },
    { id: 'b', name: 'Beans', quantity: 0 },
  ]);

  // TODO 2: addOne(id) -- add 1 to the quantity of the product with that id, and only that one.
  // TODO 3: removeProduct(id) -- take the product with that id out of the array.
  // TODO 4: a controlled input and an "Add product" button that appends a new product
  //         (a new, unique id; quantity 0) to the array.
  // TODO 5: total -- the sum of every quantity, computed here from products. Not useState.

  return <main className="mx-auto max-w-4xl space-y-6 p-4 sm:p-8">
    <h1 className="text-3xl font-bold">My Pantry</h1>
    <p>Total items: {/* TODO 5 */}</p>

    {/* TODO 4: the add-product form goes here */}

    <div className="grid gap-4 md:grid-cols-3">
      {/* TODO 1-3: one PantryCard per product, with products.map and key={product.id} */}
    </div>
  </main>;
}
