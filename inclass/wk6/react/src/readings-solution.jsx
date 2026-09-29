// Worked answers for drills 9-13. Compare after attempting each one.
import { useState } from 'react';

// 9. One status instead of two booleans that can contradict each other.
export function Drill9() {
  const [status, setStatus] = useState('typing');
  return <div className="space-y-3">
    <div className="flex gap-3">
      <button className="rounded bg-teal-800 px-4 py-2 text-white" onClick={() => setStatus('sending')}>Send order</button>
      <button className="rounded border px-4 py-2" onClick={() => setStatus('sent')}>Mark delivered</button>
    </div>
    {status === 'sending' && <p>Sending…</p>}
    {status === 'sent' && <p>Sent!</p>}
  </div>;
}

// 10. Store the id; derive the selected product from items.
const pantry = [{ id: 'a', name: 'Apples' }, { id: 'r', name: 'Rice' }, { id: 'b', name: 'Beans' }];
export function Drill10() {
  const [items, setItems] = useState(pantry);
  const [selectedId, setSelectedId] = useState('r');
  const selected = items.find(item => item.id === selectedId);
  function rename(id, name) {
    setItems(list => list.map(item => item.id === id ? { ...item, name } : item));
  }
  return <div className="space-y-3">
    <ul className="space-y-2">
      {items.map(item => <li key={item.id} className="flex items-center gap-2">
        <input aria-label={`Name of product ${item.id}`} className="rounded border p-1"
          value={item.name} onChange={e => rename(item.id, e.target.value)} />
        <button className="rounded border px-3 py-1" onClick={() => setSelectedId(item.id)}>Choose</button>
        {item.id === selectedId && <span className="text-sm font-semibold text-teal-800">picked</span>}
      </li>)}
    </ul>
    <p>You picked: {selected.name}</p>
  </div>;
}

// 11. activeIndex lives in the parent; each Panel is controlled by its props.
function Panel({ title, isActive, onShow, children }) {
  return <section className="rounded border p-3">
    <h3 className="font-bold">{title}</h3>
    {isActive ? <p>{children}</p> : <button className="mt-1 rounded border px-3 py-1" onClick={onShow}>Show</button>}
  </section>;
}
export function Drill11() {
  const [activeIndex, setActiveIndex] = useState(null);
  return <div className="space-y-2">
    <Panel title="Storage" isActive={activeIndex === 0} onShow={() => setActiveIndex(0)}>Keep rice in a sealed container.</Panel>
    <Panel title="Shelf life" isActive={activeIndex === 1} onShow={() => setActiveIndex(1)}>Dry beans keep for about a year.</Panel>
  </div>;
}

// 12. key={selected.id}: a different product is a different editor, with fresh state.
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
    <NoteEditor key={selected.id} product={selected} />
  </div>;
}

// 13. No state: the tag shows whatever price it's given, every render.
function PriceTag({ price }) {
  return <p className="text-2xl font-bold">${price}</p>;
}
export function Drill13() {
  const [price, setPrice] = useState(4);
  return <div className="space-y-3">
    <button className="rounded bg-teal-800 px-4 py-2 text-white" onClick={() => setPrice(3)}>Start the sale</button>
    <PriceTag price={price} />
  </div>;
}
