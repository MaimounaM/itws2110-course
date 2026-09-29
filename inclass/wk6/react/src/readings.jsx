// Drills 9-13 -- one per idea in this week's reading. Edit only this file.
// Each drill names the section of the React docs it comes from; read that section
// first, then fix the bug it describes.
import { useState } from 'react';

// 9. "Choosing the State Structure" -- avoid contradictions in state.
// Two booleans can say two things at once. Click Send order, then Mark delivered:
// the page claims it is still sending AND already sent. Replace isSending and isSent
// with ONE piece of state, status, that is 'typing', 'sending' or 'sent'.
export function Drill9() {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  return <div className="space-y-3">
    <div className="flex gap-3">
      <button className="rounded bg-teal-800 px-4 py-2 text-white" onClick={() => setIsSending(true)}>Send order</button>
      <button className="rounded border px-4 py-2" onClick={() => setIsSent(true)}>Mark delivered</button>
    </div>
    {isSending && <p>Sending…</p>}
    {isSent && <p>Sent!</p>}
  </div>;
}

// 10. "Choosing the State Structure" -- avoid duplication in state.
// selected holds a COPY of a product. Rice starts out picked. Change its box to Brown
// rice: the list updates and the row still says "picked", but "You picked" stays stuck
// on Rice -- two copies of one fact. Keep only the id in state, and look the product up
// from items every render.
const pantry = [{ id: 'a', name: 'Apples' }, { id: 'r', name: 'Rice' }, { id: 'b', name: 'Beans' }];
export function Drill10() {
  const [items, setItems] = useState(pantry);
  const [selected, setSelected] = useState(pantry[1]);
  function rename(id, name) {
    setItems(list => list.map(item => item.id === id ? { ...item, name } : item));
  }
  return <div className="space-y-3">
    <ul className="space-y-2">
      {items.map(item => <li key={item.id} className="flex items-center gap-2">
        <input aria-label={`Name of product ${item.id}`} className="rounded border p-1"
          value={item.name} onChange={e => rename(item.id, e.target.value)} />
        <button className="rounded border px-3 py-1" onClick={() => setSelected(item)}>Choose</button>
        {item.id === selected.id && <span className="text-sm font-semibold text-teal-800">picked</span>}
      </li>)}
    </ul>
    <p>You picked: {selected.name}</p>
  </div>;
}

// 11. "Sharing State Between Components" -- the accordion.
// Only one panel should be open at a time, but each Panel owns its own isActive, so
// they can't know about each other. Lift it: Drill11 keeps activeIndex; each Panel
// receives isActive and an onShow callback and has no useState of its own.
function Panel({ title, children }) {
  const [isActive, setIsActive] = useState(false);
  return <section className="rounded border p-3">
    <h3 className="font-bold">{title}</h3>
    {isActive ? <p>{children}</p> : <button className="mt-1 rounded border px-3 py-1" onClick={() => setIsActive(true)}>Show</button>}
  </section>;
}
export function Drill11() {
  return <div className="space-y-2">
    <Panel title="Storage">Keep rice in a sealed container.</Panel>
    <Panel title="Shelf life">Dry beans keep for about a year.</Panel>
  </div>;
}

// 12. "Preserving and Resetting State" -- reset with a key.
// NoteEditor stays at the same place in the tree when you switch products, so React
// keeps its state, and useState(product.note) only runs the first time. Switch to Rice
// and you're still looking at the Apples note. Give <NoteEditor> a key={selected.id},
// so a different product means a different editor.
const notes = [
  { id: 'a', name: 'Apples', note: 'check for bruises' },
  { id: 'r', name: 'Rice', note: 'buy the 5lb bag' },
  { id: 'b', name: 'Beans', note: 'black, not pinto' },
];
function NoteEditor({ product }) {
  const [text, setText] = useState(product.note);
  return <div className="space-y-1">
    <label htmlFor="note" className="block">Note for {product.name}</label>
    <input id="note" className="rounded border p-2" value={text} onChange={e => setText(e.target.value)} />
  </div>;
}
export function Drill12() {
  const [selectedId, setSelectedId] = useState('a');
  const selected = notes.find(p => p.id === selectedId);
  return <div className="space-y-3">
    <div className="flex gap-2">
      {notes.map(p => <button key={p.id} className="rounded border px-3 py-1" onClick={() => setSelectedId(p.id)}>{p.name}</button>)}
    </div>
    <NoteEditor product={selected} />
  </div>;
}

// 13. "Choosing the State Structure" -- don't mirror props in state.
// PriceTag copies its price prop into state once, then never looks at the prop again,
// so when the parent changes the price, the tag doesn't. It only displays the price --
// it doesn't edit it -- so it needs no state at all. Read the prop directly.
function PriceTag({ price }) {
  const [shown] = useState(price);
  return <p className="text-2xl font-bold">${shown}</p>;
}
export function Drill13() {
  const [price, setPrice] = useState(4);
  return <div className="space-y-3">
    <button className="rounded bg-teal-800 px-4 py-2 text-white" onClick={() => setPrice(3)}>Start the sale</button>
    <PriceTag price={price} />
  </div>;
}
