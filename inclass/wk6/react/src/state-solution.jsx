// Worked answers for drills 1-4. Compare after attempting each one.
import { useState } from 'react';

// 1. key={item.id} instead of key={index}.
function Row({ item }) {
  return <li className="flex items-center gap-3 rounded bg-slate-100 p-3">
    <strong className="w-16">{item.name}</strong>
    <input defaultValue={item.note} className="flex-1 rounded border p-1" />
  </li>;
}
export function Drill1() {
  const [items, setItems] = useState([
    { id: 'a', name: 'Apples', note: 'check for bruises' },
    { id: 'r', name: 'Rice', note: 'buy the 5lb bag' },
    { id: 'b', name: 'Beans', note: 'black, not pinto' },
  ]);
  function moveRiceToFront() {
    setItems(prev => {
      const rice = prev.find(i => i.id === 'r');
      return [rice, ...prev.filter(i => i.id !== 'r')];
    });
  }
  return <div className="space-y-3">
    <button className="rounded bg-teal-800 px-4 py-2 text-white" onClick={moveRiceToFront}>Move Rice to front</button>
    <ul className="space-y-2">
      {items.map(item => <Row key={item.id} item={item} />)}
    </ul>
  </div>;
}

// 2. quantity lives in Drill2 now; Stepper is purely a display + a callback.
function Stepper({ quantity, onAdd }) {
  return <button className="rounded border px-4 py-2" onClick={onAdd}>Qty: {quantity}</button>;
}
export function Drill2() {
  const [quantity, setQuantity] = useState(0);
  function add() { setQuantity(q => q + 1); }
  return <div className="flex flex-wrap items-center gap-3">
    <span>Apples, on the shelf label —</span>
    <Stepper quantity={quantity} onAdd={add} />
    <span>and the same product, in the cart summary —</span>
    <Stepper quantity={quantity} onAdd={add} />
  </div>;
}

// 3. No total state at all -- it is derived from items on every render.
export function Drill3() {
  const [items, setItems] = useState(['Apples']);
  const total = items.length;
  function add() {
    setItems(list => [...list, 'Item']);
  }
  function removeLast() {
    setItems(list => list.slice(0, -1));
  }
  return <div className="space-y-3">
    <div className="flex gap-3">
      <button className="rounded bg-teal-800 px-4 py-2 text-white" onClick={add}>Add item</button>
      <button className="rounded border px-4 py-2" onClick={removeLast}>Remove last</button>
    </div>
    <p>Items in cart: {total}</p>
  </div>;
}

// 4. Card takes children instead of footerText/onFooterClick.
function Card({ title, children }) {
  return <div className="rounded border p-4">
    <h3 className="font-bold">{title}</h3>
    <div className="mt-2 flex gap-2 border-t pt-2">{children}</div>
  </div>;
}
export function Drill4() {
  return <Card title="Rice">
    <button className="rounded border px-3 py-1">Add one</button>
    <button className="rounded border px-3 py-1">Remove one</button>
  </Card>;
}
