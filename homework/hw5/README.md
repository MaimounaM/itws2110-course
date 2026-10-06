# Homework 5 — A to-do list, and where its state lives

**Assigned Friday 10/2 · due Friday 10/9, 11:59 PM**

A light one. The starter is a to-do list that already works: add a to-do, check it off,
delete it. You add four small features to it — each one is an idea from this week's
[workshop drills](../../inclass/wk6/react/README.md) — and then write two tests of your
own, the way you did in drills 5–8.

Expect **about two hours**. No Docker, no database — a terminal running Vite and a browser.

---

## Set up

Copy the starter into your repository, install, and start it:

```bash
cp -R ../itws2110-course/homework/hw5/starter/. homework/hw5/
cd homework/hw5
npm ci
npx playwright install chromium     # once, so you can run the checks
npm run dev
```

Open the address Vite prints (normally `http://127.0.0.1:5173/`). Add a to-do, check one
off, delete one — that part is done for you. Read `src/TodoApp.jsx` top to bottom before
you change it; it's short.

| | You edit |
|---|---|
| Part 1 — four features | `src/TodoApp.jsx` |
| Part 2 — two tests | `src/TodoApp.test.jsx` |
| Part 3 — write-up | `WRITEUP.md` |

Leave everything else alone — `main.jsx`, `setup-tests.js`, `components/`, and `tests/`.

---

## Part 1 — four features · 60%

When you're done, the page should look something like this, after clicking **Details** on
the first to-do:

![The finished to-do list: the heading "To-do list", "Remaining: 2", an "Add a to-do" panel with a "New to-do" field and an "Add" button, three filter buttons — All, Active, Done — three to-dos each with a checkbox, a "Details" button and a "Delete" button, and a "Details" panel showing "Selected: Buy rice", "Status: active", a "Title" field containing "Buy rice" and a "Save" button.](todo-example.png)

Your styling doesn't have to match; the words on screen do. `src/TodoApp.jsx` has four
numbered TODOs, one per feature. Stuck on one? Do the drill named next to it first — it is
the same idea in a dozen lines, with a worked answer.

The [walkthrough slides](../../slides/11b_hw5_walkthrough.pdf) from class go through
features 1 and 2 one step at a time.

| # | Feature | The idea, and the workshop drill that practices it | Points |
|---|---|---|---|
| 1 | **Remaining: N** — how many to-dos aren't done | Derived state: compute it, don't store it (drill 3) | 12 |
| 2 | **All / Active / Done** buttons that filter the list | One status, not two booleans (drill 9); the visible list is derived (drill 3) | 16 |
| 3 | A **Details** button on each to-do, and a Details panel that shows the selected one | Store the id, not a copy (drill 10) | 16 |
| 4 | A **Title** field and **Save** button in the panel, to rename the selected to-do | Reset with a key (drill 12) | 16 |

### 1. Remaining: N

Show `Remaining: 2` under the heading: the number of to-dos that aren't done. Compute it
from `todos` in the component body. It is not its own `useState` — a count kept by hand
goes wrong the first time someone deletes a to-do.

### 2. All / Active / Done

Three buttons named exactly **All**, **Active** and **Done**, between the add form and the
list. **Active** shows only the to-dos that aren't done, **Done** only the ones that are.

- Keep **one** piece of state: `filter`, which is `'all'`, `'active'` or `'done'`, and
  starts at `'all'`. Not `showActive` and `showDone` — two booleans can contradict each other.
- The list you render is computed from `todos` and `filter`, every render. Don't keep a
  second array of "the filtered to-dos" in state: check one off while **Active** is on, and
  it should leave the list by itself.
- The current button gets `aria-pressed={true}`, so a screen reader — and a test — can tell
  which filter is on. `Remaining` ignores the filter: it counts the to-dos that aren't done
  in the whole list, whichever button is on.

### 3. The Details panel

Give each to-do a **Details** button. Below the list, add `<Panel title="Details">` — `Panel`
is already in the file, and shows whatever you put between its tags.

- Nothing selected yet: `Nothing selected.`
- After clicking **Details** on a to-do: `Selected: Buy rice` and `Status: active`
  (or `Status: done`).

Store **the id** of the selected to-do, not the to-do, and look it up in `todos` on every
render — `todos.find(t => t.id === selectedId)`. Then the panel can't fall behind: check
the to-do off after selecting it and the status changes with it; delete it and `find`
comes back empty, so the panel says `Nothing selected.` again.

### 4. Rename it

Inside the panel, add a small `TitleEditor` component: a text field labelled **Title**,
filled in with the selected to-do's title, and a **Save** button.

- The editor keeps its **own draft** in state. Typing changes the draft only; the list and
  the `Selected:` line don't change until **Save**.
- **Save** calls a `rename(id, title)` you write in `TodoApp` — the same shape as `toggle`.
- Select a different to-do and the field must show *that* to-do's title, not what you were
  typing. `useState(todo.title)` only reads its argument the first time, so tell React it's
  a different editor: `<TitleEditor key={selected.id} ... />`.

No `useEffect` anywhere in this assignment. We haven't used it, nothing here needs it, and
copying one value into another with an effect is the pattern this week's reading warns about.

### What the checks look for

The checks read your page the way a person would, so name things on screen like this:

- each to-do is an `<li>` with its checkbox and title (already there), plus buttons **Details** and **Delete**
- **Remaining:** followed by the number
- three buttons named **All**, **Active** and **Done**; the current one has `aria-pressed="true"`
- the panel says **Nothing selected.**, or **Selected:** the title and **Status:** `active` or `done`
- in the panel, a text field with the label **Title** and a button **Save**

---

## Part 2 — two tests of your own · 25%

Open `src/TodoApp.test.jsx`. It has one example test, already passing, and room for two of
yours. Leave the example as it is — it doesn't count as one of your two. Run them in a
second terminal:

```bash
npm run test:unit:watch
```

Each of your two tests:

1. renders `<TodoApp />`,
2. **does something** — `await user.click(...)` or `await user.type(...)`. Every action needs its `await`,
3. then **asserts** what a person would see afterwards.

Test features **you** built in Part 1. A test that would also pass on the untouched starter
— "the list has three items" — says nothing about your work; at least one of your two has
to be a test the starter would fail. Two that would do:

- checking a to-do off lowers `Remaining`
- after clicking **Active**, a to-do that's done is no longer in the list

Find things the way drills 5–8 did — by role, label or text, never by class name. Each
to-do's checkbox is named by its title: `screen.getByRole('checkbox', { name: 'Buy rice' })`.
To click a button inside one particular to-do, find its row first; the comment in the test
file shows how. If something isn't there any more, `screen.queryByText('Soak beans')`
returns `null` instead of throwing, so you can `expect(...).not.toBeInTheDocument()`.

---

## Part 3 — write-up · 15%

Answer the two questions in the `WRITEUP.md` that came with the starter — a short paragraph
each — then the AI Use Statement at the bottom. Keep the numbered headings.

---

## Check your work

```bash
npm test             # the feature checks -- the same ones the grader runs
npm run test:unit    # your own tests
```

`npm test` needs port 5179 free; your own `npm run dev` on 5173 can stay open. It runs
twelve checks: one that the starter's behavior still works, and eleven for your four
features. A red line says which check failed and what it expected.

Three things can't be seen on the page, so the grader reads them from `TodoApp.jsx`: that
`Remaining` isn't its own `useState`, that there's one `filter` state starting at `'all'`
and no stored filtered list, and that nothing uses `useEffect`.

---

## Grading

| | |
|---|---|
| Part 1 — the four features: 12 + 16 + 16 + 16 | 60% |
| Part 2 — your tests exist and pass (8), each has an awaited action and an assertion after it (5 + 5), one fails on the untouched starter (7) | 25% |
| Part 3 — write-up and AI Use Statement | 15% |

---

## Submission

Commit and push `homework/hw5/`:

```
homework/hw5/
├── src/
│   ├── TodoApp.jsx        Part 1
│   ├── TodoApp.test.jsx   Part 2
│   └── ...                everything else from the starter, unchanged
├── tests/                 unchanged
├── package.json
├── package-lock.json
└── WRITEUP.md             Part 3
```

Commit the lockfile. Don't commit `node_modules/` or `dist/` — the starter's `.gitignore`
already leaves them out.

---

## When something breaks

| Symptom | First thing to check |
|---|---|
| `npm ci` fails | Node 22.12 or newer, and you are in `homework/hw5/` |
| The page is blank | Read the first red error in the terminal or the browser console — usually a missing `}` or `)` |
| The page goes blank when you delete the selected to-do | You're reading `selected.title` when nothing is selected. Check `selected` first |
| The panel's status doesn't change when you check the to-do off | You stored the to-do itself. Store its id and look it up |
| The Title field keeps the old text when you pick another to-do | The editor needs `key={selected.id}` |
| Typing in Title renames the to-do before Save | The field is reading the to-do's title directly. It needs its own draft state |
| A to-do you checked off stays in the Active list | The filtered list is stored in state. Compute it from `todos` and `filter` |
| A test sees the old value right after a click | A missing `await` in front of `user.click` or `user.type` |
| `Found multiple elements` in a test | Every to-do has a **Details** and a **Delete** button, so `getByRole('button', { name: 'Details' })` finds three. Find the row first, then look `within(row)` |
| `npm test` says port 5179 is in use | Another `npm test` is still running; close that terminal |
