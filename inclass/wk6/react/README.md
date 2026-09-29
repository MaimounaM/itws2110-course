# React, week 6 — where state lives, and how to prove it

[← Week 6](../../../weeks/week-06.md) · [Teaching guide](TEACHING.md) · [Docker alternative](DOCKER.md)

One folder, four parts:

| | Drills | You edit | Checked by |
|---|---|---|---|
| **Where should state live?** | 1–4 | `src/state.jsx` | the **Check result** button, same as last week |
| **Describe it from the outside** — component tests | 5–8 | `src/pantry.test.jsx` | the terminal (Vitest) |
| **From the readings** — one drill per idea | 9–13 | `src/readings.jsx` | the **Check result** button |
| **Hooks** — `useState` is one hook; what's a hook? | 14 | `src/hooks.jsx` | the **Check result** button |

The loop is last week's: predict, change one thing, save, check, explain it to a partner.

## Set up — once, before the first drill

This is a new folder, so it needs its own install. From the course repository root:

```bash
cd inclass/wk6/react
npm ci
npm run dev
```

Open the **Local** URL Vite prints (normally `http://127.0.0.1:5173`). Node 22.12 or newer,
same as last week. If `npm ci` or Vite won't cooperate on your machine, use the
[Docker alternative](DOCKER.md) instead.

Stop last week's `npm run dev` first if it's still running — both want port 5173.

## Hand it in — end of class

**Hand-in: push your copy of the workshop to your own repository at the end of class** —
with whatever you got through. Unfinished drills are fine; it counts toward participation,
not correctness.

Copy the `react` folder from `inclass/wk6/` in the course repo and paste it into
`inclass/wk6/` in your own repository (Finder or Explorer is fine), then commit and push.
Leave `node_modules` behind if you can — your `.gitignore` keeps it out of the push either
way. Kept going after class? Copy, paste and push again — the latest push counts.

## The files you touch

| File | Purpose |
|---|---|
| `src/state.jsx` | Your work for drills 1–4 |
| `src/state-solution.jsx` | Worked answers for drills 1–4 |
| `src/pantry.jsx` | Working components that drills 5–8 test; leave alone |
| `src/pantry.test.jsx` | Your work for drills 5–8; run it in a terminal |
| `src/answers/pantry.test.jsx` | Worked answers for drills 5–8 |
| `src/readings.jsx` | Your work for drills 9–13 |
| `src/readings-solution.jsx` | Worked answers for drills 9–13 |
| `src/hooks.jsx` | Your work for drill 14 |
| `src/hooks-solution.jsx` | Worked answer for drill 14 |
| `src/Workshop.jsx` | Supplied navigation and checks; leave alone |

After changing code, click **Reset preview** before repeating a click drill's actions —
Vite may keep state across edits.

---

## Drills 1–4 — where should this state live?

Four bugs that give no error message. Each one works until the data changes in a way the
code didn't plan for. Open [`src/state.jsx`](src/state.jsx).

### 1. Keys done properly · 5 minutes

Click **Move Rice to front**, then look at the note field next to Rice. It still says
Apples's note — the text stayed at *position* 0, not with the *product* that moved there.
`key={index}` tells React "the thing at position 0 is the same thing across renders,"
which stops being true the moment order changes. Change it to `key={item.id}`.

**Done when:** after moving Rice to front, its note field says "buy the 5lb bag."
**Explain:** the label already said "Rice" even with the bug — only the input's value
was stale. Why did one update correctly and not the other?

### 2. Lifting state up · 5 minutes

Two `Stepper`s show the same quantity in two places on the page. Each one calls its own
`useState`, so they can only agree by coincidence. Move `quantity` (and a setter) up into
`Drill2`, and pass `quantity` and an `onAdd` callback down as props.

**Done when:** clicking the first stepper twice, both read Qty: 2.
**Explain:** which component now owns the number? Point to the one `useState` left.

### 3. Derived vs. stored state · 5 minutes

`total` is its own state, kept in sync by hand: `add()` updates it, but `removeLast()`
forgets to. Don't patch `removeLast()` — delete `total` as state entirely and compute it
every render: `const total = items.length;`. A value with no state of its own can't drift
from the thing it describes.

**Done when:** add an item, then remove it — the count reads 1, not 2.
**Explain:** is stored state ever better than computing the value? When?

### 4. Composition over configuration · 6 minutes

`Card` takes `footerText` and `onFooterClick` — enough to describe *one* button. Rice's
card needs two: "Add one" and "Remove one." No new prop fixes this for good; the next
requirement would need another. Give `Card` a `children` prop, render `{children}` where
the footer goes, and pass both buttons as JSX between `<Card>` and `</Card>`.

**Done when:** the footer shows both "Add one" and "Remove one."
**Explain:** what did `Card` stop being responsible for?

---

## Drills 5–8 — describe it from the outside

In drills 1–4 you checked your work by looking. Drills 5–8 ask the same kind of question
in a form that answers itself, every time, without you: a component test.

These four don't use the Check result button. **The terminal is the check.** Leave
`npm run dev` running in one terminal, open a second, and start the watcher:

```bash
npm run test:unit:watch
```

Open [`src/pantry.test.jsx`](src/pantry.test.jsx). All four start **red on purpose** — a
failing test names something that isn't true yet. Read what Vitest prints (what it got,
what it wanted) before you change a line. Save, and it re-runs in under a second.

The components being tested are in [`src/pantry.jsx`](src/pantry.jsx) and already work.
**Don't edit them** — here the component is right and you write the description. Pick
drills 5–8 in the page's numbered nav to see each component rendered while you test it.

### 5. Find it the way a person would · 5 minutes

`render()` puts the component in a DOM. `screen` queries that DOM the way someone reading
the page would: by role, by label, by visible text — never by class name. Replace
`CHANGE ME` with what the heading actually says.

**Done when:** drill 5 is green.
**Explain:** the test never mentions `h2` or `text-xl`. What could you change in
`pantry.jsx` without breaking it?

### 6. Props in, assertions out · 6 minutes

The `render` call is written. Write both assertions: what do `name="Rice"` and
`expired={true}` produce?

**Done when:** drill 6 is green.
**Explain:** change the test to `expired={false}` and predict the failure before saving.

### 7. Arrange, act, assert · 6 minutes

The assertion is already correct; nothing has happened yet. Add the two clicks.
`user.click()` is asynchronous, so every call needs `await` — without it the assertion
runs before React re-renders, and you get `Added 0`.

**Done when:** drill 7 is green.
**Explain:** delete one `await` and watch it fail. Why does the test see a stale number?

### 8. Typing is an action too · 6 minutes

`getByLabelText('Product name')` finds the input through its `<label>` — the same
`htmlFor`/`id` pair that makes clicking the label focus the field. Clear the field before
typing; `user.type()` adds to what's there.

**Done when:** drill 8 is green, and so are all four.
**Explain:** change the label text in `pantry.jsx` and watch the test fail. Is that a
brittle test, or the point?

Compare with [`src/answers/pantry.test.jsx`](src/answers/pantry.test.jsx), or run
`npm run test:unit:answers`, once your own four are green.

---

## From the readings — drills 9–13, any time this week

One drill per idea in this week's reading, each the bug that section of the React docs
warns about. Same **Check result** button as drills 1–4; edit
[`src/readings.jsx`](src/readings.jsx). Read the linked section first — each one is a
few minutes — then fix the drill. They don't depend on each other or on drills 5–8.

### 9. One status, not two booleans · 5 minutes

*Reading:* [Choosing the State Structure — avoid contradictions](https://react.dev/learn/choosing-the-state-structure#avoid-contradictions-in-state)

`isSending` and `isSent` are two booleans, so there are four combinations — and one of
them, both true, is impossible in real life. Click **Send order**, then **Mark delivered**,
and the page claims both. Replace them with one `status` that is `'typing'`, `'sending'`
or `'sent'`.

**Done when:** after both clicks, the page says only "Sent!".
**Explain:** you could also fix it by adding `setIsSending(false)` to the second button.
Why is one `status` still the better fix?

### 10. Store the id, not a copy · 5 minutes

*Reading:* [Choosing the State Structure — avoid duplication](https://react.dev/learn/choosing-the-state-structure#avoid-duplication-in-state)

`selected` holds a copy of a product object. Rice starts out picked. Change its box to
Brown rice — no need to click Choose: the list changes and the row still says *picked*,
but "You picked" stays stuck on Rice. The copy went stale. Keep `selectedId` in state and
look the product up from `items` on every render.

**Done when:** rename Rice to "Brown rice", and "You picked: Brown rice" follows.
**Explain:** this is drill 3's lesson from a different direction. What's the one fact here,
and where was the second copy?

### 11. Only one panel open · 6 minutes

*Reading:* [Sharing State Between Components — lifting state up by example](https://react.dev/learn/sharing-state-between-components#lifting-state-up-by-example)

The reading's own example, in pantry form. Each `Panel` owns its `isActive`, so opening one
can't close the other. Lift it: `Drill11` keeps `activeIndex`, and each `Panel` gets
`isActive` and an `onShow` callback — and no `useState` of its own.

**Done when:** show Storage, then Shelf life — only Shelf life is open.
**Explain:** the reading calls the new `Panel` "controlled". Controlled by what?

### 12. Reset with a key · 5 minutes

*Reading:* [Preserving and Resetting State — resetting a form with a key](https://react.dev/learn/preserving-and-resetting-state#resetting-a-form-with-a-key)

`NoteEditor` stays in the same place when you switch products, so React keeps its state —
and `useState(product.note)` only uses its argument the first time. Click **Rice**: the label
says Rice, the box still holds the Apples note. Give `<NoteEditor>` a `key={selected.id}`.

**Done when:** after clicking Rice, the box says "buy the 5lb bag".
**Explain:** drill 1 used a key to *keep* the right state with the right item. What is this
key doing instead?

### 13. Read the prop, don't copy it · 4 minutes

*Reading:* [Choosing the State Structure — don't mirror props in state](https://react.dev/learn/choosing-the-state-structure#don-t-mirror-props-in-state)

`PriceTag` copies its `price` prop into state once and never looks at the prop again.
It only *shows* the price, so it needs no state at all — read `price` directly.

**Done when:** click **Start the sale** and the tag says $3.
**Explain:** 12 and 13 are the same trap — `useState(prop)` ignores later changes. Why is
the fix a key in one and "no state" in the other? *(Hint: which one does the user edit?)*

## Hooks — drill 14, any time this week

`useState` is a **hook**: a function whose name starts with `use` that asks React to keep
something for this component between renders. React matches hooks by the *order* you call
them, which is why they go at the top level of a component — never inside an `if`, a loop,
or after an early `return`. A **custom hook** is your own `use…` function built from other
hooks. It lets two components reuse the same *logic*.

### 14. A custom hook shares logic, not state · 6 minutes

*Reading:* [Reusing Logic with Custom Hooks — share stateful logic, not state itself](https://react.dev/learn/reusing-logic-with-custom-hooks#custom-hooks-let-you-share-stateful-logic-not-state-itself)

Open [`src/hooks.jsx`](src/hooks.jsx). Someone pulled drill 2's stepper logic into
`useQuantity()` and called it in every component that needs the number — each `ShelfLabel`
*and* each `CartLine`. Click **+** next to Apples twice: the shelf says 2, the cart says 0.
Every call to a hook gets its own `useState`, so four calls make four separate numbers.

Leave `useQuantity` alone. Call it in `Drill14` instead — once per product — and pass
`quantity`, `onAdd` and `onRemove` down as props. `ShelfLabel` and `CartLine` end up with
no hooks at all.

**Done when:** after + on Apples twice and Rice once, the cart says Apples 2 and Rice 1.
**Explain:** you now call `useQuantity()` twice in `Drill14`, and *want* the two numbers to
be separate. What decides whether two things should share one call? And why couldn't
`CartLine` take a list of names and call `useQuantity()` once per name in a loop?

## When something breaks

| Symptom | First thing to check |
|---|---|
| npm is not found | Install Node LTS, restart the terminal, run `node --version` |
| npm cannot find package.json | Your terminal must be in `inclass/wk6/react` |
| Port 5173 is in use | Last week's `npm run dev` is still running — stop it |
| Red error overlay | Read the first error and its line number; check closing tags and braces |
| Drill 1's note field won't update | That's the bug to fix, not a setup problem — change the key |
| Drill 3's count is off by one after removing | You're still updating `total` by hand; delete the state, don't patch it |
| `toHaveTextContent is not a function` | `src/setup-tests.js` must be present; it adds the DOM matchers |
| Drill 7 or 8 says `Added 0` / `Apples` | A missing `await`. Every `user.click` and `user.type` needs one |
| `document is not defined` in a test | Run it with `npm run test:unit`, not `node` |
| Tests pass but you changed nothing | You're looking at `src/answers/`, not `src/pantry.test.jsx` |
| Drill 9 passes but you still have two booleans | It passes because the page looks right; the drill is the one `status` |
| Drill 12's label changes but the box doesn't | That's the bug — the key goes on `<NoteEditor>`, not on the buttons |
| Drill 14: Apples and Rice move together | You called `useQuantity()` once and gave it to both products — call it once *per product* |
| `Rendered fewer hooks than expected` | A hook is inside an `if`, a loop, or after an early `return` — move it to the top of the component |

Don't edit the checker to get a PASS. The checks look at output; the explanations are
part of each drill.



## Official references

- [React — Managing State](https://react.dev/learn/managing-state) — this week's reading.
- [React — Built-in Hooks](https://react.dev/reference/react/hooks) — the whole family; drill 14 and this week's slides name the ones you'll meet.
- [Testing Library queries](https://testing-library.com/docs/queries/about/) — which query to reach for, roles first.
- [Vitest](https://vitest.dev/guide/) — the runner for drills 5–8; it reuses this project's Vite configuration.
