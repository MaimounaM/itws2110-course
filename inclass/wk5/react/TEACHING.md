# Teaching the React drills

[Student instructions](README.md)

Plan for two short sessions, about 100–110 minutes total including discussion and
setup. Avoid trying to race through state immediately after a first JSX encounter.

| Session | Course session | Suggested allocation |
|---|---|---|
| A: rendered output | 8 · Tue 9/22 | 5 minutes micro-installation, 10 local setup, 25 drills 1–6, 10 discussion |
| B: interaction | 9 · Fri 9/25 | 5 minutes recap, 22 drills 7–10, 10 shadcn/ui inspection and setup explanation, 10 drill 11, 10 discussion |

Before class, run `npm ci`, `npm run build`, and the browser tests described in the
README. Open the micro-example with internet access. Use a clean workshop copy if
students have already edited the starter functions. Verify Node on classroom machines
before spending class time on it. All drills can be demonstrated from one instructor
machine while students pair up.

Week 6 (sessions 10 and 11) has its own workshop and teaching guide in
[`inclass/wk6/react/`](../../wk6/react/TEACHING.md).

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

The browser check records a visible result when clicked. It does not verify every
concept, and it is not a grade. Ask students to change the prop, data, or action and
predict the result. A hardcoded answer can pass a content check without demonstrating
understanding. Do not make new homework deadlines or grading policies from this lab.

Exit prompt: “Where does the final card's quantity live? Which component receives
it? Which callback changes it? Which library controls the spacing?” A student who
can trace those four answers is ready to build with components.
