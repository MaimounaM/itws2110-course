// Edit only this file for drills 1–10. Every starter runs before you fix it.
import { useState } from 'react';

// 1. JSX: change the heading's text to Hello, React!
export function Drill1() {
  return <h2>Hello, HTML!</h2>;
}

// 2. JavaScript in braces: display the value of product, not the word "product".
export function Drill2() {
  const product = 'Apples';
  return <p>product</p>;
}

// 3. Same Tailwind as HW3; React spells the attribute className.
// Make this a flex row, vertically centered, with space between the two items.
export function Drill3() {
  return <div className=""><strong>Pantry</strong><span>3 items</span></div>;
}

// 4. Props are inputs. Change the h3 to display name. Leave the two calls alone.
function Product({ name }) {
  return <h3>Product name</h3>;
}
export function Drill4() {
  return <div><Product name="Apples" /><Product name="Rice" /></div>;
}

// 5. An array becomes elements. Replace the placeholder li using products.map.
// Each li needs key={product.id}. Keep the ul and its Tailwind classes.
export function Drill5() {
  const products = [{ id: 'a', name: 'Apples' }, { id: 'r', name: 'Rice' }, { id: 'b', name: 'Beans' }];
  return <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
    <li className="rounded bg-slate-100 p-4">Replace me</li>
  </ul>;
}

// 6. A condition chooses text. Use expired ? 'Expired' : 'Fresh'.
function Freshness({ expired }) {
  return <span className="rounded bg-amber-100 px-2 py-1">Status</span>;
}
export function Drill6() {
  return <div className="flex gap-4"><Freshness expired={true} /><Freshness expired={false} /></div>;
}

// 7. A click updates state. Put setCount(c => c + 1) inside handleClick.
// Pass the handler with onClick={handleClick}; do not call it during rendering.
export function Drill7() {
  const [count, setCount] = useState(0);
  function handleClick() {
    // YOUR TURN
  }
  return <button className="rounded bg-teal-800 px-4 py-2 text-white" onClick={handleClick}>Count: {count}</button>;
}

// 8. A component definition can make two instances, each with its own state.
// Add a second <Counter />. Click the first twice, the second once.
function Counter() {
  const [count, setCount] = useState(0);
  return <button className="rounded border px-4 py-2" onClick={() => setCount(c => c + 1)}>Count: {count}</button>;
}
export function Drill8() {
  return <div className="flex gap-4"><Counter /></div>;
}

// 9. Shared state lives in the parent. Both children receive the same value + callback.
// Connect onClick to onAdd in the child. No new useState in SharedCounter.
function SharedCounter({ count, onAdd }) {
  return <button className="rounded border px-4 py-2">Count: {count}</button>;
}
export function Drill9() {
  const [count, setCount] = useState(0);
  function add() { setCount(c => c + 1); }
  return <div className="flex gap-4">
    <SharedCounter count={count} onAdd={add} />
    <SharedCounter count={count} onAdd={add} />
  </div>;
}

// 10. A controlled input: value comes from state; onChange writes the next value.
// Replace the empty handler with e => setName(e.target.value).
export function Drill10() {
  const [name, setName] = useState('Apples');
  return <div className="space-y-3">
    <label className="block" htmlFor="product-name">Product name</label>
    <input id="product-name" className="rounded border p-2" value={name} onChange={() => {}} />
    <p>Shopping for: {name}</p>
  </div>;
}
