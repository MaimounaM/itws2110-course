# Week 6 — September 29 and October 2

[← Course home](../README.md)

| | |
|---|---|
| **Tue 9/29** | React III: state structure and composition — lists and keys, lifting state up, derived vs. stored state, composition over configuration. Mostly lecture and live debugging; drills 1–4 of the [week 6 workshop](../inclass/wk6/react/) for the last part of class, or as practice before Friday. **In-class: push your copy of the workshop to your repo at the end of class**, with whatever you finished ([how](../inclass/wk6/README.md)). [Slides](../slides/10-11_react_state_and_tests_v4.pdf) |
| **Fri 10/2** | Lab; drills 5–8 of the same [week 6 workshop](../inclass/wk6/react/) — writing component tests with Vitest and Testing Library. **Homework 4 due. [Homework 5](../homework/hw5/) assigned** — a to-do list: four small features from Tuesday's ideas, and two tests you write yourself. Due Fri 10/9. [Slides](../slides/10-11_react_state_and_tests_v4.pdf) |

Both days use one new folder, [`inclass/wk6/react/`](../inclass/wk6/react/). It needs its
own install — run `npm ci` there **before Tuesday**:

```bash
cd inclass/wk6/react
npm ci
npm run dev
```

## Tuesday's four drills

Same numbered nav and Check result button as last week, in
[`src/state.jsx`](../inclass/wk6/react/src/state.jsx).

- **1. Keys done properly** — a list where `key={index}` makes a note field follow the
  wrong product after a reorder. Fix the key.
- **2. Lifting state up** — two steppers that should show one number, and don't, until
  the state moves to their shared parent.
- **3. Derived vs. stored state** — a `total` that drifts from `items` because it's
  tracked by hand instead of computed from what's actually there.
- **4. Composition over configuration** — a `Card` that only knows how to take one
  footer button, refactored to accept `children` instead.

## Drills 9–13 — the reading, one bug at a time

Five more in the same folder, in [`src/readings.jsx`](../inclass/wk6/react/src/readings.jsx), any time this week.
Each one is the bug a section of the reading warns about, and the README links that section:

- **9. One status, not two booleans** — an order that says "Sending…" and "Sent!" at once.
- **10. Store the id, not a copy** — rename the product you picked, and "You picked" goes stale.
- **11. Only one panel open** — the reading's accordion: two panels that should take turns.
- **12. Reset with a key** — switch products and the note box keeps the old product's note.
- **13. Read the prop, don't copy it** — the price changes but the tag doesn't.

## Drill 14 — `useState` is a hook; what's a hook?

One more, in [`src/hooks.jsx`](../inclass/wk6/react/src/hooks.jsx). A custom hook, `useQuantity()`,
is called in every component that needs the number — and the cart never hears about the
shelf. A custom hook shares *logic*, not *state*. Optional reading:
[Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks).

---

## Reading — due Tuesday

Last week's question was *how* to describe a UI. This week's is **where a piece of state
should live, and who owns it** — the question behind every "why did my other component not
update" bug you're about to have.

### 1. React docs — *Sharing State Between Components*, *Choosing the State Structure*, *Preserving and Resetting State*

[react.dev/learn](https://react.dev/learn) — free, no login, same textbook as last week.

- **[Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)** — lifting state up. When two components need to agree, the state moves to their lowest common ancestor. *Practice: drills 2 and 11.*
- **[Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)** — derived vs. stored. If you can compute it from something you already have, don't give it its own `useState`. Most state bugs are two copies of one fact disagreeing. *Practice: drills 3, 9, 10 and 13.*
- **[Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)** — why the same component in the same position keeps its state across renders, and what actually resets it. This is the mechanism under Tuesday's live-debugging demo. *Practice: drills 1 and 12.*

### 2. Dan Abramov, *Writing Resilient Components* (Optional)

[overreacted.io/writing-resilient-components](https://overreacted.io/writing-resilient-components/)

Five habits for components that don't break when the data they're given changes shape —
written by someone who spent years watching how components actually fail in practice. Pairs
with the derived-state reading above; read it if that one left you wanting the "so what do I
actually do differently" version.

---

## Due this week

| | Due |
|---|---|
| **In-class** — your copy of `inclass/wk6/react/`, pushed with whatever you finished | **Tue 9/29, end of class** |
| **Homework 4** — React components | **Fri 10/2, 11:59 PM** |

The in-class push counts toward participation, not correctness: finished or not, push what
you have before you leave. The drills themselves are practice — nothing in `inclass/` is
graded for right answers.

Friday is hands-on again: same laptop, same Node 22.12+, same `inclass/wk6/react/` folder.
Friday starts at drill 5, with a second terminal running `npm run test:unit:watch`.
