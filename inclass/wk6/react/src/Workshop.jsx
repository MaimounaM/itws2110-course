// Workshop navigation and checks are supplied; students edit state.jsx (1-4),
// pantry.test.jsx (5-8), readings.jsx (9-13) and hooks.jsx (14).
import { useState } from 'react';
import * as starters from './state.jsx';
import * as answers from './state-solution.jsx';
import * as readingStarters from './readings.jsx';
import * as readingAnswers from './readings-solution.jsx';
import * as hookStarters from './hooks.jsx';
import * as hookAnswers from './hooks-solution.jsx';
import { ProductHeading, Product, AddButton, ProductNameField } from './pantry.jsx';

const groups = [['Where state lives', 1, 4], ['Component tests', 5, 8], ['From the readings', 9, 13], ['Hooks', 14, 14]];

// Drills 5-8 are written and checked in a terminal. The preview still renders the
// component under test, because it is easier to describe something you can see.
const unitDrills = {
  5: () => <ProductHeading />,
  6: () => <Product name="Rice" expired={true} />,
  7: () => <AddButton />,
  8: () => <ProductNameField />,
};

// Step 3 of the on-page instructions for the terminal drills: what to change in the test.
const unitSteps = {
  5: 'Replace CHANGE ME with the text the heading above really shows.',
  6: 'Replace both CHANGE ME strings: the name in the h3, and the word on the badge above.',
  7: 'Under YOUR TURN, add two lines, one per click: await user.click(screen.getByRole("button"));',
  8: 'Under YOUR TURN, add two lines: await user.clear(field); then await user.type(field, "Oats");',
};

const lessons = [
  ['Keys done properly', 'Move Rice to front, then check that its note field still says "buy the 5lb bag."', 'key={item.id} instead of key={index} -- the note follows the product, not the position.'],
  ['Lifting state up', 'Click the first stepper twice; both should read Qty: 2.', 'One quantity in Drill2, passed to both Steppers as quantity + onAdd. Delete Stepper’s own useState.'],
  ['Derived vs. stored state', 'Add an item, then remove it; the count should read 1, not 2.', 'Delete the total state. const total = items.length; computed fresh every render.'],
  ['Composition over configuration', 'The footer needs two buttons: Add one and Remove one.', 'Card takes children now, not footerText/onFooterClick. Pass both buttons as JSX inside <Card>.'],
  ['Test: find it by role', 'Assert that the heading above says Pantry.', 'getByRole("heading", { level: 2 }) returns the h2; toHaveTextContent checks what it says.'],
  ['Test: props in, assertions out', 'Assert the name and the freshness these props produce.', 'getByRole("heading", { level: 3 }) for the name; screen.getByText("Expired") for the badge.'],
  ['Test: act, then assert', 'Make the button read Added 2 before the assertion runs.', 'await user.click(screen.getByRole("button")) — once per click, and await every one.'],
  ['Test: typing is an action too', 'Clear the field, type Oats, and the assertions pass.', 'getByLabelText finds the input through its label. user.type appends, so clear first.'],
  ['One status, not two booleans', 'Click Send order, then Mark delivered. The page should say only Sent!', 'const [status, setStatus] = useState("typing") — then "sending", then "sent". One value can’t contradict itself.'],
  ['Store the id, not a copy', 'Rice is already picked. Change its box to Brown rice (no need to click Choose): "You picked" stays stuck on Rice. Make it follow the rename.', 'Keep selectedId in state (start it at "r"); const selected = items.find(item => item.id === selectedId).'],
  ['Only one panel open', 'Show Storage, then show Shelf life. Only Shelf life should be open.', 'activeIndex in Drill11; each Panel gets isActive={activeIndex === 0} and onShow={() => setActiveIndex(0)}.'],
  ['Reset with a key', 'Click Rice. Its note box should say "buy the 5lb bag", not the Apples note.', '<NoteEditor key={selected.id} … /> — a new key means a new editor, with fresh state.'],
  ['Read the prop, don’t copy it', 'Click Start the sale. The tag should say $3.', 'PriceTag needs no useState at all: show {price} straight from its props.'],
  ['A custom hook shares logic, not state', 'Click + next to Apples twice and next to Rice once. The cart should say Apples 2, Rice 1.', 'Call useQuantity() in Drill14, once per product. Pass quantity, onAdd and onRemove down; ShelfLabel and CartLine call no hooks.'],
];

function checkDrill(number, root) {
  const texts = selector => [...root.querySelectorAll(selector)].map(el => el.textContent.trim());
  const same = (actual, expected) => JSON.stringify(actual) === JSON.stringify(expected);
  switch (number) {
    case 1: {
      const li = root.querySelector('li');
      return li?.querySelector('strong')?.textContent === 'Rice' && li?.querySelector('input')?.value === 'buy the 5lb bag';
    }
    case 2: {
      const values = texts('button');
      return values.length === 2 && values[0] === values[1];
    }
    case 3: return same(texts('p'), ['Items in cart: 1']);
    case 4: return same(texts('h3'), ['Rice']) && same(texts('button'), ['Add one', 'Remove one']);
    case 9: return same(texts('p'), ['Sent!']);
    case 10: return same(texts('p'), ['You picked: Brown rice']);
    case 11: return same(texts('p'), ['Dry beans keep for about a year.']);
    case 12: return root.querySelector('label')?.textContent === 'Note for Rice' && root.querySelector('input')?.value === 'buy the 5lb bag';
    case 13: return same(texts('p'), ['$3']);
    case 14: return same(texts('p'), ['Apples in cart: 2', 'Rice in cart: 1']);
    default: return false;
  }
}

export default function Workshop() {
  const params = new URLSearchParams(location.search);
  const requested = Number(params.get('drill') || 1);
  const number = Number.isInteger(requested) && requested >= 1 && requested <= lessons.length ? requested : 1;
  const solution = params.get('mode') === 'solution';
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState('Not checked yet.');
  const [title, goal, hint] = lessons[number - 1];
  const unit = number >= 5 && number <= 8;
  const reading = number >= 9 && number <= 13;
  const hook = number === 14;
  const file = unit ? 'src/pantry.test.jsx' : reading ? 'src/readings.jsx' : hook ? 'src/hooks.jsx' : 'src/state.jsx';
  const Component = unit ? unitDrills[number]
    : reading ? (solution ? readingAnswers : readingStarters)[`Drill${number}`]
    : hook ? (solution ? hookAnswers : hookStarters)[`Drill${number}`]
    : (solution ? answers : starters)[`Drill${number}`];
  return <main className="mx-auto max-w-4xl space-y-6 p-4 text-slate-900 sm:p-8">
    <header className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-widest text-teal-800">ITWS 2110 · React lab · week 6</p>
      <h1 className="text-3xl font-bold">Where state lives, and how to prove it</h1>
      <p>Drills 1–4: where state lives. Drills 5–8: component tests. Drills 9–13: one per idea in the reading. Drill 14: custom hooks. Edit <code>{file}</code> in VS Code.</p>
    </header>
    <nav aria-label="Drills" className="flex flex-wrap gap-x-6 gap-y-3">
      {groups.map(([name, from, to]) => <div key={name} className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{name}</p>
        <div className="flex flex-wrap gap-2">
          {lessons.slice(from - 1, to).map(([label], i) => {
            const n = from + i;
            return <a key={label} aria-current={number === n ? 'page' : undefined}
              className={`rounded border px-3 py-2 text-sm ${number === n ? 'bg-teal-800 text-white' : 'bg-white'}`}
              href={`?drill=${n}${solution ? '&mode=solution' : ''}`}>{n}</a>;
          })}
        </div>
      </div>)}
    </nav>
    {solution && !unit && <p className="rounded border border-amber-600 bg-amber-50 p-3 font-semibold">Worked solution — your starter file is not being shown.</p>}
    <section className="space-y-4" aria-labelledby="lesson-title">
      <h2 id="lesson-title" className="text-xl font-bold">{number}. {title}</h2>
      <p><strong>Goal:</strong> {goal}</p>
      <div id="exercise" key={attempt} className="rounded-xl border-2 border-dashed border-slate-400 bg-white p-6"><Component /></div>
      {unit ? <>
        <p>The component above already works. You are writing the test that says so.
          There is no Check result button here — <strong>the terminal is the check.</strong></p>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Leave <code>npm run dev</code> running. Open a <strong>second terminal</strong> in this folder and run:
            <pre className="mt-1 overflow-x-auto rounded bg-slate-900 p-3 text-sm text-white"><code>npm run test:unit:watch</code></pre></li>
          <li>It lists four red tests — that is the starting point, not a mistake. Find the one whose name starts
            with <strong>{number}.</strong> and read its <em>Expected</em> and <em>Received</em> lines.</li>
          <li>Open <code>src/pantry.test.jsx</code> and find the same test. {unitSteps[number]}</li>
          <li>Save. The terminal re-runs by itself. You're done when test {number} is gone from the red list
            and the summary counts one more <em>passed</em>. Then pick the next number above.</li>
        </ol>
        <p className="text-sm text-slate-600">Change only the test file — <code>src/pantry.jsx</code> is already right.
          Compare with the answers when yours is green: <code>npm run test:unit:answers</code>.</p>
      </> : <>
        <div className="flex flex-wrap gap-3">
          <button className="rounded bg-teal-800 px-4 py-2 text-white" onClick={() => setStatus(checkDrill(number, document.getElementById('exercise')) ? 'PASS — goal reached.' : 'TRY AGAIN — compare the preview with the goal.')}>Check result</button>
          <button className="rounded border px-4 py-2" onClick={() => { setAttempt(n => n + 1); setStatus('Not checked yet.'); }}>Reset preview</button>
        </div>
        <p role="status" className="font-semibold">{status}</p>
        <p className="text-sm text-slate-600">For click drills, reset first and repeat the stated actions. Checks inspect the visible result; explain your code to a partner too.</p>
      </>}
      <details className="rounded border p-3"><summary className="cursor-pointer font-semibold">Small hint</summary><p className="mt-2">{hint}</p></details>
    </section>
    <footer className="border-t pt-4 text-sm">
      {unit
        ? <span>Worked answers live in <code>src/answers/pantry.test.jsx</code>.</span>
        : <a className="underline" href={`?drill=${number}${solution ? '' : '&mode=solution'}`}>{solution ? 'Return to your starter' : 'Compare the worked solution'}</a>}
      <span> · </span><a className="underline" href="https://react.dev/learn">React reference</a>
    </footer>
  </main>;
}
