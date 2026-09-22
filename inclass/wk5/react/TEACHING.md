# Teaching the React drills

[Student instructions](README.md)

Plan for three short sessions, about 150–165 minutes total including discussion and
setup. Avoid trying to race through state immediately after a first JSX encounter.

| Session | Course session | Suggested allocation |
|---|---|---|
| A: rendered output | 8 · Tue 9/22 | 5 minutes micro-installation, 10 local setup, 25 drills 1–6, 10 discussion |
| B: interaction | 9 · Fri 9/25 | 5 minutes recap, 22 drills 7–10, 10 shadcn/ui inspection and setup explanation, 10 drill 11, 10 discussion |
| C: component tests | 11 · Fri 10/2 | 10 minutes why-test recap from session 4, 5 watcher setup, 25 drills 12–15, 10 discussion |

Session C is the lab that feeds **Homework 5**, which asks students to write their own
component tests and is graded by a human as well as a runner. It is the only session
here with a downstream grade attached, so do not let it get squeezed. Sessions A and B
are light on purpose — session 10 (React III) has no drills of its own and is the
natural place to slow down on lists and lifting state if the room needs it.

Before class, run `npm ci`, `npm run build`, and the browser tests described in the
README. For session C also run `npm run test:unit` once and confirm it prints four
failures — that red output is the first thing students see, and it should be the
expected red, not a setup error. Open the micro-example with internet access. Use a clean workshop copy if
students have already edited the starter functions. Verify Node on classroom machines
before spending class time on it. All drills can be demonstrated from one instructor
machine while students pair up.

## Demonstration rhythm

1. Show the goal and ask for a prediction before revealing code.
2. Make the smallest edit, save, and observe the preview together.
3. Undo that demonstration edit and give pairs two minutes to do it themselves.
4. Ask one student to explain the mechanism, then show the worked solution if needed.
5. Change an input or click again so students see a rule, rather than a memorized output.

The page's “Compare the worked solution” link keeps the same drill selected. Its
yellow banner is intentional: students should not mistake an answer preview for
their own work. Source answers are `src/solutions.jsx` and `src/capstone-solution.jsx`.
The solution to drill 0 is only the third `createElement` argument: `'Hello, React!'`.

## The pauses that matter

- **After 0:** React can render one element inside an existing page. npm and JSX are
  not the definition of React. Do not teach the import-map plumbing in depth.
- **After 3:** students already know most of the styling. The change is `className`.
- **After 4:** a function definition is not a rendered instance. Give the same
  definition different props and ask students to predict the two outputs.
- **After 5:** add an object to the array. Do not add a copied card. Ask why the key
  should come from the data. The visible checker cannot verify key quality.
- **After 7:** trace event → setter → component runs again → updated DOM. Do not
  describe state as an ordinary variable that React continuously watches.
- **After 8/9:** put the two previews side by side in separate browser tabs. Both
  show two buttons, but state lives in different places. Ask students to point to it.
- **After 10:** trace input event → new string → state → input and paragraph.
- **After 11:** inspect `components/ui/button.jsx`, then return to `PantryCard`.
  The library component does not contain pantry business logic. Your parent does.
- **Before 12:** open drill 1 and drill 12 side by side. Same component, same claim —
  once checked by a person looking, once by a test. Ask what the button costs that the
  test does not. Callback to session 4: the test is the specification, written down.
- **After 12:** the test names no tag and no class. Rename `text-xl` to `text-3xl` in
  `pantry.jsx` live; the test stays green. Then change `h2` to `h1` and it fails. Ask
  which of those two edits *should* have broken it, and why the query picked that line.
- **After 14:** delete one `await` in front of the class and read `Added 1` together.
  This is the single most common failure they will hit in Homework 5.
- **After 15:** change the label text in `pantry.jsx`. The test breaks. Resist calling
  that brittleness — the label is the contract with the person using the page, and a
  test that survives changing it would not be testing anything a user can see.

## Keep the installation small

Use the prepared folder for the drills. Use [SETUP.md](SETUP.md) as a separate,
optional live demonstration, pausing at each checkpoint. In particular, get one
unstyled JSX heading working before adding Tailwind; get one Tailwind style working
before adding shadcn/ui. Do not start class with a framework generator's feature menu.

The app includes the official generated shadcn/ui source so the final drill works
even if the component registry is unavailable during class. Local npm installation
still needs network access or a prepared cache. No online CDN is required by the
main Vite app once its dependencies are installed.

## Boundaries and assessment

Keep the endpoint at composing Card, Button, Input, and a student-owned component.
Save effects, fetching, routing, forms libraries, authentication, and global stores
for later. Avoid adding a dialog just to increase the component count.

Drills 12–15 have no browser check by design; a green Vitest run is the check, and it
is the same mechanism that will grade Homework 5. Students who have only ever watched a
page to know whether their code works should leave session C having seen a machine do
it instead. Still not a grade: `src/answers/pantry.test.jsx` is one page long and
copying it is trivial, so assess in the room by asking for a *fifth* test of their own.

The browser check records a visible result when clicked. It does not verify every
concept, and it is not a grade. Ask students to change the prop, data, or action and
predict the result. A hardcoded answer can pass a content check without demonstrating
understanding. Do not make new homework deadlines or grading policies from this lab.

Session C exit prompt: “Write one more test for a claim none of these four make.”
Anything true and checkable counts — the Fresh badge, a third click, an emptied field.
A student who can invent the assertion has the skill Homework 5 marks.

Exit prompt: “Where does the final card's quantity live? Which component receives
it? Which callback changes it? Which library controls the spacing?” A student who
can trace those four answers is ready to build with components.
