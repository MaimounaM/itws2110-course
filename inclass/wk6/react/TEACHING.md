# Teaching the week 6 React drills

[Student instructions](README.md)

| Session | Course session | Suggested allocation |
|---|---|---|
| Where state lives (drills 1–4) | 10 | Mostly lecture (lists and keys, lifting state, derived state, composition, the live-debug demo). 15–20 minutes at the end for drills 1–4 in pairs, if time allows |
| Component tests (drills 5–8) | 11 | 10 minutes why-test recap from session 4, 5 watcher setup, 25 drills 5–8, 10 discussion |
| Any time: the reading | — | Drills 9–13, self-paced, 25 minutes total; see below for using two of them as lecture demos |
| Any time: hooks | — | Drill 14, 6 minutes; pairs with the three hooks slides |

Session 10 is lecture-first by design. Drills 1–4 are reinforcement; if the room needs the
whole period for keys, lifting state, and the demo, let them become practice before
session 11 rather than cutting the discussion short. Session 11 is the lab to protect — it's
where students first see a machine check their work instead of their eyes.

Before class: run `npm ci`, `npm run build`, and `npm test` (described in the README). Before
session 11 also run `npm run test:unit` once and confirm it prints four failures — that red
output is the first thing students see, and it should be the expected red, not a setup
error. Use a clean copy if you've already solved the starters on the teaching machine.
This is a new folder, so students need `npm ci` here too — say so in session 10 before the
drills, not during them.

## Session 10's live-debug demo

The last lecture point is live debugging of a duplicated-state bug. Drill 3 (`total`
drifting from `items`) doubles as the demo: put the starter on screen, click Add, then
Remove, and ask what the room expects the count to say before you reveal it. Then fix it
live by deleting the state rather than patching the handler. Any duplicated-state example
works, but this one is already built.

## Drills 9–13: the reading, made runnable

One drill per section of this week's reading, each the exact bug that section warns about.
They're self-paced and don't depend on anything else, so they work three ways:

- **As a reading check before session 10.** Ask students to do 9–13 alongside the reading; the
  README links the section each one comes from.
- **As lecture demos.** Two cover reading ideas the lecture slides don't:
  - **Drill 12 (reset with a key)** is *Preserving and Resetting State*. Click Rice on the
    starter and let the room notice the label changed and the box didn't, then add the key.
  - **Drill 9 (one status)** is the fastest "impossible state" demo there is.
- **As the week's leftover practice**, for students who finish 1–4 early.

The pair worth ending on is **12 and 13**. Both are `useState(prop)` ignoring later
changes. 12 fixes it with a key because the user edits the value; 13 fixes it by deleting
the state because nobody does. A student who can say why the fixes differ has understood
the reading.

## Drill 14 and the hooks slides

Session 10's deck has three slides that use `useState` to introduce hooks in general: what a
hook is (slots filled in call order, per component, per position), `useEffect` as the
tempting wrong fix for derived state, and the rest of the family. Drill 14 is the
hands-on half of the last one.

- The trap it targets is the most common custom-hook misconception: that a hook *shares*
  state. Four calls to `useQuantity()` are four `useState`s. The fix is drill 2's fix —
  lift it — with the custom hook kept.
- A student who calls `useQuantity()` **once** and hands it to both products gets
  Apples and Rice moving together. The check fails (3 and 3). That's the other half of the
  lesson: one call per thing that should have its own number.
- The explain question about a loop is the rules-of-hooks slide, applied. Hooks in a loop
  change count when the list does, and React matches hooks by order.

Scope: name `useEffect`, `useRef`, `useContext`, `useReducer` and `useMemo` so the words
aren't new later, but teach only `useState` and custom hooks. `useEffect` is session 22,
when there's an API to fetch from; before then, every `useEffect` a student writes is
almost certainly syncing state that should be computed. For Quiz 1, the rule of hooks,
state vs. ref, and "don't sync derived state with an effect" are fair game; the rest is
preview.

## Demonstration rhythm

1. Show the goal and ask for a prediction before revealing code.
2. Make the smallest edit, save, and observe the preview together.
3. Undo that demonstration edit and give pairs two minutes to do it themselves.
4. Ask one student to explain the mechanism, then show the worked solution if needed.
5. Change an input or click again so students see a rule, rather than a memorized output.

Drills 1–4 and 9–14 have a "Compare the worked solution" link, like last week's; the
sources are `src/state-solution.jsx`, `src/readings-solution.jsx` and `src/hooks-solution.jsx`. Drills 5–8's answers
are `src/answers/pantry.test.jsx`.

## The pauses that matter

- **After 1:** ask what would have happened with three reorders instead of one, still on
  index keys. The bug doesn't get worse — it's just as wrong the first time. Keys are
  correct or not; there is no partial credit from luck.
- **After 2:** point back at last week's drill 9, already built with lifted state. The
  lesson here isn't the destination — it's noticing when two things that must agree don't
  share an ancestor yet, before that shows up as a bug report.
- **After 3:** ask "what's `total` for, if we could just say `items.length`?" Usually
  nothing — that's the point. A stored value earns its keep only when it can't be computed
  from something you already have.
- **After 4:** ask what `Card` would need to support a third footer variant under the old
  design, versus under `children`. The gap between those answers is the argument for
  composition.
- **Before 5:** open last week's drill 1 and this drill 5 side by side. Same kind of
  claim — once checked by a person looking, once by a test. Ask what the button costs that
  the test doesn't. Callback to session 4: the test is the specification, written down.
- **After 5:** the test names no tag and no class. Rename `text-xl` to `text-3xl` in
  `pantry.jsx` live; the test stays green. Then change `h2` to `h1` and it fails. Ask
  which of those edits *should* have broken it, and why.
- **After 7:** delete one `await` in front of the class and read `Added 1` together. It's
  the most common failure students will hit writing tests of their own.
- **After 8:** change the label text in `pantry.jsx`. The test breaks. Resist calling that
  brittleness — the label is the contract with the person using the page.

## Boundaries and assessment

Local state only. Name the other hooks (see above), but save effects, fetching, routing,
forms libraries, authentication, and global stores for later.

Drills 5–8 have no browser check by design: a green Vitest run is the check. Still not a
grade — `src/answers/pantry.test.jsx` is one page long and copying it is trivial — so
assess in the room.

Session 10 exit prompt: "Name one value in your own HW4 pantry you could compute instead of
store." Session 11 exit prompt: "Write one more test for a claim none of these four make."
Anything true and checkable counts — the Fresh badge, a third click, an emptied field.
