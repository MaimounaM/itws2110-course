// Worked answer for drill 14. Compare after you've tried it.
import { useState } from 'react';

// Unchanged. The hook was never the problem -- where it was called was.
function useQuantity() {
  const [quantity, setQuantity] = useState(0);
  const add = () => setQuantity(q => q + 1);
  const remove = () => setQuantity(q => Math.max(0, q - 1));
  return { quantity, add, remove };
}

// No hooks here any more: the number comes in as a prop, changes go out as calls.
function ShelfLabel({ name, quantity, onAdd, onRemove }) {
  return <div className="flex items-center gap-2">
    <span className="w-16 font-semibold">{name}</span>
    <button className="rounded border px-3 py-1" aria-label={`Remove one ${name}`} onClick={onRemove}>−</button>
    <span className="w-6 text-center">{quantity}</span>
    <button className="rounded border px-3 py-1" aria-label={`Add one ${name}`} onClick={onAdd}>+</button>
  </div>;
}

function CartLine({ name, quantity }) {
  return <p>{name} in cart: {quantity}</p>;
}

// Two calls, two independent quantities -- which is what two products should have.
// Sharing happens by passing one call's result to everyone who reads it.
export function Drill14() {
  const apples = useQuantity();
  const rice = useQuantity();
  return <div className="space-y-4">
    <div className="space-y-2">
      <ShelfLabel name="Apples" quantity={apples.quantity} onAdd={apples.add} onRemove={apples.remove} />
      <ShelfLabel name="Rice" quantity={rice.quantity} onAdd={rice.add} onRemove={rice.remove} />
    </div>
    <div className="rounded bg-slate-50 p-3">
      <CartLine name="Apples" quantity={apples.quantity} />
      <CartLine name="Rice" quantity={rice.quantity} />
    </div>
  </div>;
}
