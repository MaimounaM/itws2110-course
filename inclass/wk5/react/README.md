# React — one small change at a time

[← Week 5](../README.md) · [Teaching guide](TEACHING.md) · [Build the setup yourself](SETUP.md)

You already know how to put Tailwind classes on HTML. Here you will keep doing that,
but let JavaScript describe the page. Start with one heading. Finish by combining
components into a small, editable Pantry card.

**The loop:** predict what will happen, change one thing, save, try it, check it,
and explain it to a partner. Like Homework 3, the goal is small enough that you can
see whether it worked. There is no backend, database, router, or deployment in this lab.

## 0. Micro-installation — one file, five minutes

1. Open this `react` folder in VS Code.
2. Open [`00-micro.html`](00-micro.html) with **Live Server**, the extension used in HW3.
3. Find `// YOUR TURN`. Change `'Hello, HTML!'` to `'Hello, React!'`.
4. Save. The heading changes and the check says **PASS**.
5. Change `text-xl` to `text-3xl`. Same Tailwind, larger heading.

**No npm installation yet.** This file downloads React and Tailwind from the internet.
If it stays on “Loading React…”, check your connection and the browser console.
Use Live Server rather than opening a `file://` URL; module restrictions differ by browser.
The CDN setup is for this learning example, not a production build.

Read just these two statements:

```js
const heading = createElement('h2', { className: 'text-xl font-bold' }, 'Hello, React!');
createRoot(document.getElementById('root')).render(heading);
```

The first describes an element: tag, properties, content. The second tells React
where to render it. `root` is an ordinary div in the HTML. React owns its contents.
The import map above the script tells the browser where to find the imported packages.
You do not need to memorize the URLs or the checker.

**Say it back:** which argument changes the text, and which changes the styling?

## 0b. Install the local workshop — one step at a time

Now we want JSX: `<h2>Hello, React!</h2>` instead of `createElement(...)`.
Browsers do not directly execute JSX. Vite runs a development server and transforms
our source into browser JavaScript. React remains the library that renders the UI.

1. Install a current **Node.js LTS** release from [nodejs.org](https://nodejs.org/en/download).
   This workshop requires Node **22.12 or newer**. Restart your VS Code terminal after installing.
2. In VS Code, open **Terminal → New Terminal**. From the course repository root:

   ```bash
   cd inclass/wk5/react
   node --version
   npm --version
   ```

   **Checkpoint:** both print version numbers; Node meets the requirement.
3. Install the exact dependency versions recorded with this workshop:

   ```bash
   npm ci
   ```

   **Checkpoint:** it finishes without an error and creates `node_modules`.
   Initial installation needs internet. The shadcn/ui source is already included.
4. Start the server:

   ```bash
   npm run dev
   ```

   **Checkpoint:** open the **Local** URL printed in the terminal, normally
   `http://127.0.0.1:5173`. You see “One small change at a time.”
   Keep this terminal running. Use Ctrl+C when you are finished.
5. Open [`src/drills.jsx`](src/drills.jsx), change Drill1, and save.
   **Checkpoint:** the browser updates without a manual reload.

Use Vite for drills 1–11. Live Server was only for the first HTML file.
If you copied the workshop to your own repository, copy this whole folder, including
the lockfile and supplied components; do not copy `node_modules` or `dist`.

**Want to see each installation happen?** [SETUP.md](SETUP.md) walks through
creating a separate, tiny Vite app, adding Tailwind, then adding shadcn/ui. The supplied
workshop avoids making everyone finish that configuration before they can learn JSX.

## The files you touch

| File | Purpose |
|---|---|
| `00-micro.html` | First heading; no npm packages installed locally |
| `src/drills.jsx` | Your work for drills 1–10; each numbered function is independent |
| `src/capstone.jsx` | Your work for drill 11, using shadcn/ui |
| `src/solutions.jsx`, `src/capstone-solution.jsx` | Worked answers for comparison |
| `src/main.jsx` | Connect React to the root div; read once |
| `src/components/ui/` | shadcn/ui component source; inspect during drill 11 |
| `src/pantry.jsx` | Working components that drills 12–15 test; leave alone |
| `src/pantry.test.jsx` | Your work for drills 12–15; run it in a terminal |
| `src/answers/pantry.test.jsx` | Worked answers for drills 12–15 |
| `src/Workshop.jsx` | Supplied navigation and visible-result checks; leave alone |



After changing code, reset before following a click drill's instructions: Vite may
preserve state across edits. After resizing, click **Check result** again. A previous
PASS is a snapshot, not a live grade. The answer link shows a different component;
it does not fill in your file. A yellow banner tells you when you are viewing an answer.

## First session — markup, data, and components

### 1. JSX: change one heading · 3 minutes

In `Drill1`, change the heading to **Hello, React!**. Save and check.

JSX is markup inside JavaScript. Close every tag (`<input />`), and return one outer
parent or a fragment (`<>...</>`). A component name begins with a capital letter.

**Done when:** the preview says Hello, React! and the check passes.
**Explain:** how does this compare with the `createElement` call in drill 0?

### 2. Braces: show a variable · 3 minutes

`product` already contains `'Apples'`. Replace the literal word between the paragraph
tags with `{product}`. Then temporarily change the variable to `'Pears'` and observe
the preview; restore Apples before checking.

**Done when:** the paragraph displays Apples by reading the variable.
**Explain:** why does `<p>product</p>` display the word instead?

### 3. Tailwind: change only the classes · 4 minutes

Fill the empty `className` with a flex row, vertical centering, and space between.
These are the same three utilities used for the HW3 header. Add padding if you like.

**Done when:** Pantry is on the left, 3 items on the right, vertically centered.
**Explain:** why did `class` become `className`, but `justify-between` stayed the same?

### 4. Props: reuse one definition · 5 minutes

`Product` receives `{ name }`. Put that value inside its `<h3>`.
The two `<Product />` calls already pass different names.

```jsx
<Product name="Apples" />
<Product name="Rice" />
```

`{ name }` in the function parameter pulls `name` out of the props object.
Props are inputs: display them, rather than assigning new values to them.

**Done when:** one definition renders two different product names.
**Explain:** which line would you change to add a third product?

### 5. Lists: let the data repeat the markup · 6 minutes

Replace the placeholder `<li>` with a `products.map(...)` expression. Each product
becomes one list item; read `product.name` and use `key={product.id}`.
Keep the list's responsive grid classes and the list item's card classes.

The arrow function `product => ...` runs once per array item. A stable key helps
React associate a rendered item with its data when items move, appear, or disappear.
Use the data's ID, not a random number or the array position.

**Done when:** Apples, Rice, Beans appear in that order; the grid is one column below
768px and three above. Check at both sizes.
**Explain:** temporarily add a fourth data object. Why do you need no new JSX template?
Restore three items for the supplied check. Check the console for missing-key warnings.

### 6. Conditions: choose what to show · 4 minutes

In `Freshness`, replace Status with `{expired ? 'Expired' : 'Fresh'}`.
The two calls pass actual booleans, `true` and `false`, inside braces.
The string `"false"` would still be truthy, so do not put quotes around the booleans.

**Done when:** the first badge says Expired, the second Fresh.
**Explain:** which side of the `:` is used when `expired` is false?
Optional: choose between two complete Tailwind class strings to color the badges differently.

## Second session — interaction and composition

### 7. State: make a click matter · 6 minutes

`useState(0)` gives you the current `count` and a setter named `setCount`.
Complete `handleClick` with `setCount(c => c + 1)`.
The handler is already connected with `onClick={handleClick}`.

A setter requests another render. React calls the component again with the updated
state and updates the affected DOM. Changing an ordinary local variable does not
request that render. The updater's `c` is the pending previous count.
Keep hooks like `useState` at the top level of a component, outside loops and conditions.

**Done when:** reset, then click twice: Count: 2.
**Explain:** why would `onClick={handleClick()}` run at the wrong time?

### 8. Two instances: independent state · 4 minutes

The supplied `Counter` already works. Render it twice inside `Drill8`.

**Done when:** reset; click the first twice and the second once. They show 2 and 1.
**Explain:** the same function made both buttons. Why did they not both change?
Each rendered instance has its own state.

### 9. Two children: shared state · 6 minutes

The parent now owns `count` and passes the same `count` and `add` function to both
`SharedCounter` children. In the child, connect the native button to `onAdd`.
Do not put a second `useState` in the child.

```text
Drill9 (owns count)
  ├─ SharedCounter (reads count, calls onAdd)
  └─ SharedCounter (reads count, calls onAdd)
```

**Done when:** reset; click each button once. Both show Count: 2.
**Explain:** data travels down as props; a child asks for a change by calling a callback.
This is the reason to move state to the nearest shared parent.

### 10. Controlled input: typing is an event too · 6 minutes

Replace the empty `onChange` handler with `e => setName(e.target.value)`.
`e.target.value` is the text currently in the input. The label's `htmlFor` matches
its input's `id`; clicking the label focuses the field.

**Done when:** replace Apples with Rice; the paragraph immediately follows.
**Explain:** `value={name}` alone makes the input effectively read-only. What completes
its feedback loop? Try clearing the field too: the empty string is still valid state.

### 11. shadcn/ui: integrate the pieces · 10 minutes

Open [`src/capstone.jsx`](src/capstone.jsx). Two changes:

1. On `<Input>`, replace `defaultValue` with `value={name}` and
   `onChange={e => setName(e.target.value)}`.
2. On `<Button>`, add `onClick={onAdd}`.

The parent owns name and count. Your `PantryCard` receives them as props and combines
`Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`, and `Button`.
Tailwind still makes the outside layout: `grid gap-4 md:grid-cols-2`.

| Layer | What it does here |
|---|---|
| React | Data, props, events, state, rendering |
| Tailwind | Spacing, grid, responsive behavior, component styling |
| shadcn/ui | Component source added to your project, with styles and component APIs |
| Your `PantryCard` | Combines those pieces for this application's content and behavior |

`@/components/ui/button` means a local file beneath `src`, not a remote import.
Open that file: it accepts props and passes them to an underlying control. That is
why your event handler still works. `variant="secondary"` selects a supplied style;
`className` adds utilities. Try `variant="outline"` and `className="w-full"`.
A `Card` does not know what a pantry quantity is; your state and props provide that.

**Done when:** rename to Rice, click Add one twice: the card says Rice and Quantity: 2.
Try at phone and desktop widths. Use Tab to reach the input and button, then Enter
or Space to activate the focused button. The visible checker confirms content and
behavior; inspect the source to confirm you actually composed the supplied components.

**Explain:** identify one built-in HTML element, one shadcn/ui component, and one
component you own. Point to where state lives and follow one click all the way back
to the updated number. This is the endpoint of the workshop.

## Third session — describe it from the outside

Drills 1–11 asked *does the page look right?* and you answered by looking. Drills 12–15
ask the same questions in a form that answers itself, every time, without you. That is
the whole idea of a component test, and it is what Homework 5 asks you to write.

These four do not run in this page. **The terminal is the check.** In VS Code open a
second terminal — leave `npm run dev` in the first — and start the watcher:

```bash
npm run test:unit:watch
```

Open [`src/pantry.test.jsx`](src/pantry.test.jsx). All four drills start **red on
purpose**: a failing test names something that is not built yet, the same argument from
session 4. Read what Vitest prints — it shows what it got and what it wanted — before
you change a line. Save, and the watcher re-runs in under a second.

The components being tested are in [`src/pantry.jsx`](src/pantry.jsx) and already work.
**Do not edit them.** In drills 1–11 you changed the component until the page was right;
here the component is right and you write the description. Pick drills 12–15 in the
numbered nav above to see each one rendered while you test it.

### 12. Find it the way a person would · 5 minutes

`render()` puts the component in a DOM. `screen` queries that DOM the way someone
reading the page would: by role, by label, by visible text — never by class name and
never by looking at state. Replace `CHANGE ME` with what the heading actually says.

**Done when:** drill 12 is green.
**Explain:** the test never mentions `h2` or `text-xl`. Why is querying by role better
than querying by tag or by class? What could you change in `pantry.jsx` without
breaking this test?

### 13. Props in, assertions out · 6 minutes

The `render` call is written. Write both assertions: what do `name="Rice"` and
`expired={true}` produce? This is drill 4 and drill 6 read backwards.

**Done when:** drill 13 is green.
**Explain:** change the test to `expired={false}` and predict the failure before saving.
A test is a claim about a contract — which contract is this one describing?

### 14. Arrange, act, assert · 6 minutes

Now the other half. The assertion is already correct; nothing has happened yet. Add the
two clicks. `user.click()` is asynchronous, so every call needs `await` — without it the
assertion runs before React has re-rendered, and you get `Added 0`.

**Done when:** drill 14 is green.
**Explain:** delete one `await` and watch it fail. Why does the test see a stale number?

### 15. Typing is an action too · 6 minutes

`getByLabelText('Product name')` finds the input through its `<label>` — the
`htmlFor`/`id` pair from drill 10, which is also how a screen reader announces it.
Clear the field before typing; `user.type()` appends to what is there.

**Done when:** drill 15 is green, and so are all four.
**Explain:** remove the `clear` and read the value in the failure. Then change the label
text in `pantry.jsx` and watch the test fail — that coupling is the point, not a bug.

Compare with [`src/answers/pantry.test.jsx`](src/answers/pantry.test.jsx), or run
`npm run test:unit:answers`, once you have your own four green.

## When something breaks

| Symptom | First thing to check |
|---|---|
| npm is not found | Install Node LTS, restart the terminal, run `node --version` |
| npm cannot find package.json | Your terminal must be in this `react` folder |
| Browser shows source or a blank page | Use Vite's Local URL for JSX, not Live Server |
| Red error overlay | Read the first error and its line number; check closing tags and braces |
| Tailwind styles missing | `main.jsx` imports `index.css`; Vite config includes the Tailwind plugin |
| Counter starts at an unexpected number | Click Reset preview; saved edits can preserve state |
| Endless renders | Pass an event handler; don't call the setter during rendering |
| Input will not change | Connect `onChange` to the state setter |
| An answer works but your work does not | Return from solution mode; edit your starter file |
| Can't resolve `@/…` | Keep the supplied Vite alias and generated component files |
| `toHaveTextContent is not a function` | `src/setup-tests.js` must be present; it is what adds the DOM matchers |
| Drill 14 or 15 says `Added 0` / `Apples` | A missing `await`. Every `user.click` and `user.type` needs one |
| `document is not defined` in a unit test | Run it with `npm run test:unit`, not `node` |
| Unit tests pass but you changed nothing | You are looking at `src/answers/`, not `src/pantry.test.jsx` |

Do not edit the checker to get a PASS. Checks look at output, not whether your
implementation uses props, keys, or state correctly. The explanation and small
experiments are part of each drill.

## Verify the workshop

For instructors, or after comparing your answers:

```bash
npm run build
npx playwright install chromium
npm test
```

The automated suite checks the supplied worked solutions, the deliberately incomplete
starters, interactions, responsive layouts, and keyboard behavior. It also runs Vitest
twice — once on `src/answers/` (must pass) and once on the drill 12–15 starters (must
fail, and fail on an assertion rather than a crash), so a starter that is accidentally
already green does not reach a classroom. It does **not**
mark your edited starter answers; use the browser checks for those. Starter-baseline
tests are expected to fail after you solve those starters. The CDN micro-example is
separate and needs its own online browser check.

## Official references

- [React Quick Start](https://react.dev/learn) — JSX, props, events, state.
- [Vite setup](https://vite.dev/guide/) — development server and prerequisites.
- [Tailwind with Vite](https://tailwindcss.com/docs/installation/using-vite) — Tailwind 4 plugin.
- [Testing Library queries](https://testing-library.com/docs/queries/about/) — which query to reach for, and the priority order that puts roles first.
- [Vitest](https://vitest.dev/guide/) — the runner for drills 12–15; it reuses this project's Vite configuration.
- [shadcn/ui with Vite](https://ui.shadcn.com/docs/installation/vite) and
  [JavaScript configuration](https://ui.shadcn.com/docs/javascript) — the integration used here.

The companion setup follows these references; the workshop lockfile records the
package versions actually installed for this copy. Classroom examples stay in
JavaScript so TypeScript is not an extra prerequisite.
