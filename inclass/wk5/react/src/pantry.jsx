// Supplied and already working. Drills 12–15 write tests *for* this file.
// Do not edit it: in drills 1–11 you changed the component until the page was
// right; here the component is right and you describe it from the outside.
import { useState } from 'react';

// Drill 1 again, from the outside.
export function ProductHeading() {
  return <h2 className="text-xl font-bold">Pantry</h2>;
}

// Drills 4 and 6 again: props in, markup out. No state, so nothing to click.
export function Product({ name, expired }) {
  return <article className="rounded bg-slate-100 p-4">
    <h3 className="font-bold">{name}</h3>
    <span className="rounded bg-amber-100 px-2 py-1">{expired ? 'Expired' : 'Fresh'}</span>
  </article>;
}

// Drill 7 again. The count only moves when someone clicks.
export function AddButton() {
  const [count, setCount] = useState(0);
  return <button className="rounded bg-teal-800 px-4 py-2 text-white"
    onClick={() => setCount(c => c + 1)}>Added {count}</button>;
}

// Drill 10 again. The label's htmlFor matches the input's id, which is how
// getByLabelText finds the field — the same connection that lets a screen
// reader announce it.
export function ProductNameField() {
  const [name, setName] = useState('Apples');
  return <div className="space-y-3">
    <label className="block" htmlFor="product-name">Product name</label>
    <input id="product-name" className="rounded border p-2" value={name}
      onChange={e => setName(e.target.value)} />
    <p>Shopping for: {name}</p>
  </div>;
}
