// Drill 14 -- custom hooks. Edit only this file.
// Reading: react.dev/learn/reusing-logic-with-custom-hooks
//   #custom-hooks-let-you-share-stateful-logic-not-state-itself
import { useState } from 'react';

// 14. A custom hook shares logic, not state.
// A teammate pulled drill 2's stepper logic into useQuantity(), a custom hook, then
// called it everywhere the number is needed: in each ShelfLabel AND in each CartLine.
// Every call to a hook gets its own useState, so the cart never hears about the shelf.
// Click + next to Apples twice: the shelf says 2, the cart still says 0.
//
// useQuantity itself is fine -- leave it alone. Call it in Drill14 instead, once per
// product, and pass what it returns down as props. When you're done, ShelfLabel and
// CartLine call no hooks at all.
function useQuantity() {
  const [quantity, setQuantity] = useState(0);
  const add = () => setQuantity(q => q + 1);
  const remove = () => setQuantity(q => Math.max(0, q - 1));
  return { quantity, add, remove };
}

function ShelfLabel({ name }) {
  const { quantity, add, remove } = useQuantity();
  return <div className="flex items-center gap-2">
    <span className="w-16 font-semibold">{name}</span>
    <button className="rounded border px-3 py-1" aria-label={`Remove one ${name}`} onClick={remove}>−</button>
    <span className="w-6 text-center">{quantity}</span>
    <button className="rounded border px-3 py-1" aria-label={`Add one ${name}`} onClick={add}>+</button>
  </div>;
}

function CartLine({ name }) {
  const { quantity } = useQuantity();
  return <p>{name} in cart: {quantity}</p>;
}

export function Drill14() {
  return <div className="space-y-4">
    <div className="space-y-2">
      <ShelfLabel name="Apples" />
      <ShelfLabel name="Rice" />
    </div>
    <div className="rounded bg-slate-50 p-3">
      <CartLine name="Apples" />
      <CartLine name="Rice" />
    </div>
  </div>;
}
