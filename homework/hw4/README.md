# Homework 4 — Pantry, for real

**Assigned Friday 9/25 · due Friday 10/2, 11:59 PM**

Two parts. First, finish the in-class drills 1–11. Then build past drill 11: drill 11 made
one `PantryCard` with one product and one quantity. Here you turn it into a real pantry —
several products, added and removed while the page is open, with a running total.

Expect **two to three hours**. No Docker, no database — a terminal running Vite and a
browser, like the in-class workshop.

---

## Set up

Copy the starter into your repository, install, and start it:

```bash
cp -R ../itws2110-course/homework/hw4/starter/. homework/hw4/
cd homework/hw4
npm ci
npx playwright install chromium     # once, so you can run the checks
npm run dev
```

Open the address Vite prints (normally `http://127.0.0.1:5173/`). You'll see your pantry,
empty for now. The bar across the top switches between your pantry and the drills — it's
always there, whatever you put in `MyPantry.jsx`.

| | Tab at the top | You edit |
|---|---|---|
| Part 1 | **Drills 1–11** | `src/drills.jsx` (1–10), `src/capstone.jsx` (11) |
| Part 2 | **My Pantry** | `src/MyPantry.jsx` |
| Part 3 | — | `WRITEUP.md` |

Leave everything else alone — `main.jsx`, `Workshop.jsx`, `components/`, and `tests/`.

**Did the drills in class?** Copy your `src/drills.jsx` and `src/capstone.jsx` from
`inclass/wk5/react/` over the starter's, and Part 1 is done.

---

## Part 1 — drills 1–11 · 25%

The same eleven drills as class. Click **Drills 1–11** at the top of the page, pick a drill by
its number, make the change it asks for, and press **Check result** until it says **PASS**.

Drill 11 is the one that puts everything together — props, state, a callback, a controlled
input — using ready-made shadcn/ui components. The comment at the top of `src/capstone.jsx`
explains what those imports are and how the pieces fit; read it before you start.

---

## Part 2 — the pantry · 55%

When you're done, `/` should look something like this — before anything has been clicked:

![A finished pantry: a top bar with "My Pantry" and "Drills 1–11" tabs, the heading "My Pantry", "Total items: 0", a "New product" field with an "Add product" button, and three cards — Apples, Rice and Beans — each showing "Quantity: 0" with "Add one" and "Remove" buttons.](pantry-example.png)

Click **Add one** on a card and its quantity and the total both go up. Type a name and press
**Add product** and a new card appears. **Remove** takes that card away and the total drops
by its quantity. Your styling doesn't have to match; the names on screen do.

Everything is in `src/MyPantry.jsx`. It starts with three products in state and five
numbered TODOs:

```jsx
const [products, setProducts] = useState([
  { id: 'a', name: 'Apples', quantity: 0 },
  { id: 'r', name: 'Rice',   quantity: 0 },
  { id: 'b', name: 'Beans',  quantity: 0 },
]);
```

| Requirement | Points |
|---|---|
| Every product rendered from the array with `.map`, one card each | 8 |
| Each card keyed by `product.id`, not by its index | 8 |
| **Add one** changes that product's quantity, and no other | 10 |
| A text field and an **Add product** button add a new product | 10 |
| A **Remove** button on each card takes out just that product | 9 |
| **Total items: N** — the sum of every quantity, computed, not its own `useState` | 10 |

For the card, start from your drill 11 `PantryCard` in `capstone.jsx` and give it a
second button, **Remove**.

### The one new pattern: changing one item inside an array

In drill 9 the number that changed lived in one `useState`. Here each quantity lives
*inside* one object in an array. You can't change it in place — `products[0].quantity++`
changes the object but React never re-renders, and there's no error to tell you. Instead,
build a new array where only the matching product is replaced:

```jsx
function addOne(id) {
  setProducts(prev => prev.map(p =>
    p.id === id ? { ...p, quantity: p.quantity + 1 } : p
  ));
}
```

`{ ...p, quantity: p.quantity + 1 }` copies every field of `p`, then overwrites `quantity`.
Every other product comes back unchanged. Each card gets its own version of the callback:
`onAdd={() => addOne(product.id)}`. Removing is the same shape, with `.filter` instead of
`.map`. A new product needs an id no other product has — `crypto.randomUUID()` gives you one.

### The total

```jsx
const total = products.reduce((sum, p) => sum + p.quantity, 0);
```

Compute it on every render, in the component body. If you keep the total in its own
`useState` instead, you have two copies of the same fact, and one of them goes stale the
first time a product is removed.

### What the checks look for

The checks read your page the way a person would, so name things on screen like this:

- each card shows the product's name and **Quantity: N**, with buttons **Add one** and **Remove**
- the form has a text field (give it a `<label>`) and a button **Add product**
- the page shows **Total items:** followed by the number

Styling is up to you and isn't graded.

---

## Part 3 — write-up · 20%

Answer the four questions in the `WRITEUP.md` that came with the starter — a short paragraph
each — then the AI Use Statement at the bottom. Keep the numbered headings.

---

## Check your work

With nothing else running on port 5177:

```bash
npm test
```

This runs the checks the grader runs: one per drill (11) and seven for the pantry. A red
line says which check failed and what it expected.

Two things can't be seen on the page, so the grader reads them from `MyPantry.jsx` instead:
that each card's `key` is the product's id, and that the total isn't its own `useState`.
All green plus those two is full marks for Parts 1 and 2. The write-up is read separately.

---

## Grading

| | |
|---|---|
| Part 1 — drills 1–11, one check each | 25% |
| Part 2 — the pantry, the six requirements above | 55% |
| Part 3 — write-up and AI Use Statement | 20% |

---

## Submission

Commit and push `homework/hw4/`:

```
homework/hw4/
├── src/
│   ├── drills.jsx       Part 1, drills 1–10
│   ├── capstone.jsx     Part 1, drill 11
│   ├── MyPantry.jsx     Part 2
│   └── ...              everything else from the starter, unchanged
├── tests/               unchanged
├── package.json
├── package-lock.json
└── WRITEUP.md           Part 3
```

Commit the lockfile. Don't commit `node_modules/` or `dist/` — the starter's `.gitignore`
already leaves them out.

---

## When something breaks

| Symptom | First thing to check |
|---|---|
| `npm ci` fails | Node 22.12 or newer, and you are in `homework/hw4/` |
| The page is blank | Read the first red error in the terminal or the browser console — usually a missing `}` or `)` in `MyPantry.jsx` |
| An edit doesn't show up in a drill | Click **Reset preview** — Vite keeps state across saves |
| "Add one" adds to the wrong card, or to every card | `addOne` must compare `p.id === id`, and each card must pass its own `product.id` |
| The total is wrong after removing a product | The total is still its own `useState`. Delete it; compute it from `products` |
| Two new products change together | They got the same `id`. Use `crypto.randomUUID()` |
| `npm test` says port 5177 is in use | Another `npm test` is still running; close that terminal. Your own `npm run dev` (port 5173) is fine to leave open |
