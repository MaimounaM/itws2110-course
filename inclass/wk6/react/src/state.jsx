// Drills 1-4: where state should live. Edit only this file.
import { useState } from 'react';

// 1. Keys tell React which DOM node belongs to which item across a re-render.
// Click "Move Rice to front" in the preview, then look at the note fields --
// the text follows the position, not the product. Change key={index} to
// key={item.id} below and try again.
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
      {items.map((item, index) => <Row key={index} item={item} />)}
    </ul>
  </div>;
}

// 2. These two steppers show the same quantity, in two places on the page.
// Right now each owns its own useState, so they disagree the moment you click
// one. Move quantity (and the setter) up into Drill2, pass quantity and an
// onAdd callback down as props, and delete Stepper's own useState entirely.
function Stepper() {
  const [quantity, setQuantity] = useState(0);
  return <button className="rounded border px-4 py-2" onClick={() => setQuantity(q => q + 1)}>Qty: {quantity}</button>;
}
export function Drill2() {
  return <div className="flex flex-wrap items-center gap-3">
    <span>Apples, on the shelf label —</span>
    <Stepper />
    <span>and the same product, in the cart summary —</span>
    <Stepper />
  </div>;
}

// 3. total is its own useState, updated by hand in add() but forgotten in
// removeLast() -- so it drifts from what items actually holds. Delete the
// total state completely. Compute it fresh during render instead:
// const total = items.length;
export function Drill3() {
  const [items, setItems] = useState(['Apples']);
  const [total, setTotal] = useState(1);
  function add() {
    setItems(list => [...list, 'Item']);
    setTotal(t => t + 1);
  }
  function removeLast() {
    setItems(list => list.slice(0, -1));
    // Nothing here updates total -- that's the bug. The fix is deleting the
    // total state entirely, not adding a setTotal line here.
  }
  return <div className="space-y-3">
    <div className="flex gap-3">
      <button className="rounded bg-teal-800 px-4 py-2 text-white" onClick={add}>Add item</button>
      <button className="rounded border px-4 py-2" onClick={removeLast}>Remove last</button>
    </div>
    <p>Items in cart: {total}</p>
  </div>;
}

// 4. Card's footer can only hold one button, because that's all footerText
// and onFooterClick can describe. Rice's card needs two: "Add one" and
// "Remove one". Card doesn't need to know what a footer contains -- give it
// a children prop, render {children} where the footer slot is, and pass both
// buttons as JSX between <Card> and </Card> in Drill4.
function Card({ title, footerText, onFooterClick }) {
  return <div className="rounded border p-4">
    <h3 className="font-bold">{title}</h3>
    <div className="mt-2 flex gap-2 border-t pt-2">
      <button className="rounded border px-3 py-1" onClick={onFooterClick}>{footerText}</button>
    </div>
  </div>;
}
export function Drill4() {
  return <Card title="Rice" footerText="Add one" onFooterClick={() => {}} />;
}
