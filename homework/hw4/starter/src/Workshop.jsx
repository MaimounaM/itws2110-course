// The drills page for Part 1. Supplied -- leave this file alone. You edit drills.jsx
// (drills 1-10) and capstone.jsx (drill 11).
import { useState } from 'react';
import * as drills from './drills.jsx';
import { Drill11 } from './capstone.jsx';

const lessons = [
  ['JSX: one heading', 'Change the h2 text to Hello, React!', 'A component is a function returning UI. JSX looks like HTML inside JavaScript.'],
  ['Braces: show a value', 'Display Apples by reading the product variable.', 'Text between tags is literal. {product} evaluates JavaScript.'],
  ['Tailwind: same classes', 'Make a flex row with centered items and space between them.', 'Use className="flex items-center justify-between".'],
  ['Props: one definition, two products', 'Show Apples and Rice using the name prop.', 'Props are read-only inputs. { name } extracts a field from the props object.'],
  ['Lists: data into elements', 'Render Apples, Rice, and Beans from the array. Resize: one column below 768px; three above.', 'products.map(product => <li key={product.id}>{product.name}</li>). Keep the card classes too.'],
  ['Conditions: choose text', 'Show Expired for true and Fresh for false.', 'expired ? "Expired" : "Fresh" chooses one of two values.'],
  ['State: respond to a click', 'Click the counter twice; it should show Count: 2.', 'setCount(c => c + 1) computes the next count from the previous count.'],
  ['Independent state', 'Render two Counter instances. Click the first twice, the second once.', 'Two instances of one definition have separate state.'],
  ['Shared state', 'Click each button once. Both should show Count: 2.', 'The parent owns count. Each child calls the callback it received as onAdd.'],
  ['Controlled input', 'Replace Apples with Rice; the paragraph should immediately say Shopping for: Rice.', 'value={name} reads state; onChange={e => setName(e.target.value)} updates it.'],
  ['Compose with shadcn/ui', 'Rename Apples to Rice, then click Add one twice. The card should show Rice and Quantity: 2.', 'Connect Input to name state and Button to onAdd. Their React props work like the native controls.'],
];

function checkDrill(number, root) {
  const texts = selector => [...root.querySelectorAll(selector)].map(el => el.textContent.trim());
  const same = (actual, expected) => JSON.stringify(actual) === JSON.stringify(expected);
  switch (number) {
    case 1: return same(texts('h2'), ['Hello, React!']);
    case 2: return same(texts('p'), ['Apples']);
    case 3: {
      const css = getComputedStyle(root.firstElementChild);
      return css.display === 'flex' && css.flexDirection === 'row' && css.alignItems === 'center' && css.justifyContent === 'space-between';
    }
    case 4: return same(texts('h3'), ['Apples', 'Rice']);
    case 5: {
      const css = getComputedStyle(root.querySelector('ul'));
      const columns = css.gridTemplateColumns.split(' ').length;
      return same(texts('li'), ['Apples', 'Rice', 'Beans']) && css.display === 'grid' && columns === (innerWidth >= 768 ? 3 : 1);
    }
    case 6: return same(texts('span'), ['Expired', 'Fresh']);
    case 7: return same(texts('button'), ['Count: 2']);
    case 8: return same(texts('button'), ['Count: 2', 'Count: 1']);
    case 9: return same(texts('button'), ['Count: 2', 'Count: 2']);
    case 10: return root.querySelector('input')?.value === 'Rice' && same(texts('p'), ['Shopping for: Rice']);
    case 11: return root.querySelector('input')?.value === 'Rice' && root.querySelector('[data-slot="card-title"]')?.textContent === 'Rice' && same(texts('p'), ['Quantity: 2']);
    default: return false;
  }
}

export default function Workshop() {
  const requested = Number(new URLSearchParams(location.search).get('drill') || 1);
  const number = Number.isInteger(requested) && requested >= 1 && requested <= 11 ? requested : 1;
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState('Not checked yet.');
  const [title, goal, hint] = lessons[number - 1];
  const file = number === 11 ? 'src/capstone.jsx' : 'src/drills.jsx';
  const Component = number === 11 ? Drill11 : drills[`Drill${number}`];
  return <main className="mx-auto max-w-4xl space-y-6 p-4 text-slate-900 sm:p-8">
    <header className="space-y-2">
      <h1 className="text-3xl font-bold">Drills 1–11</h1>
      <p>Each one needs to say <strong>PASS</strong>. Edit <code>{file}</code> in VS Code, save, then check.</p>
    </header>
    <nav aria-label="Drills" className="flex flex-wrap gap-2">
      {lessons.map(([label], index) => <a key={label} aria-current={number === index + 1 ? 'page' : undefined}
        className={`rounded border px-3 py-2 text-sm ${number === index + 1 ? 'bg-teal-800 text-white' : 'bg-white'}`}
        href={`?drill=${index + 1}`}>{index + 1}</a>)}
    </nav>
    <section className="space-y-4" aria-labelledby="lesson-title">
      <h2 id="lesson-title" className="text-xl font-bold">{number}. {title}</h2>
      <p><strong>Goal:</strong> {goal}</p>
      <div id="exercise" key={attempt} className="rounded-xl border-2 border-dashed border-slate-400 bg-white p-6"><Component /></div>
      <div className="flex flex-wrap gap-3">
        <button className="rounded bg-teal-800 px-4 py-2 text-white" onClick={() => setStatus(checkDrill(number, document.getElementById('exercise')) ? 'PASS — goal reached.' : 'TRY AGAIN — compare the preview with the goal.')}>Check result</button>
        <button className="rounded border px-4 py-2" onClick={() => { setAttempt(n => n + 1); setStatus('Not checked yet.'); }}>Reset preview</button>
      </div>
      <p role="status" className="font-semibold">{status}</p>
      <p className="text-sm text-slate-600">For click drills, reset first and repeat the stated actions. For drill 5, check at your normal window width.</p>
      <details className="rounded border p-3"><summary className="cursor-pointer font-semibold">Small hint</summary><p className="mt-2">{hint}</p></details>
    </section>
  </main>;
}
