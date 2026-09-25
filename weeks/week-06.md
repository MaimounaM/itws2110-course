# Week 6 — September 29 and October 2

[← Course home](../README.md)

| | |
|---|---|
| **Tue 9/29** | React III: state structure and composition — lists and keys, lifting state up, derived vs. stored state, composition over configuration. Mostly lecture and live debugging; drills 1–4 of the [week 6 workshop](../inclass/wk6/react/) for the last part of class, or as practice before Friday. **PHP refresher assigned** — self-paced, due before Session 12. [Slides](../slides/9_react_state_and_tests.pdf) |
| **Fri 10/2** | Lab; drills 5–8 of the same [week 6 workshop](../inclass/wk6/react/) — writing component tests with Vitest and Testing Library. **Homework 4 due. Homework 5 assigned** — React with tests you write yourself. |

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

---

## Reading — due Tuesday

Last week's question was *how* to describe a UI. This week's is **where a piece of state
should live, and who owns it** — the question behind every "why did my other component not
update" bug you're about to have.

### 1. React docs — *Sharing State Between Components*, *Choosing the State Structure*, *Preserving and Resetting State*

[react.dev/learn](https://react.dev/learn) — free, no login, same textbook as last week.

- **[Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)** — lifting state up. When two components need to agree, the state moves to their lowest common ancestor.
- **[Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)** — derived vs. stored. If you can compute it from something you already have, don't give it its own `useState`. Most state bugs are two copies of one fact disagreeing.
- **[Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)** — why the same component in the same position keeps its state across renders, and what actually resets it. This is the mechanism under Tuesday's live-debugging demo.

### 2. Dan Abramov, *Writing Resilient Components* (Optional)

[overreacted.io/writing-resilient-components](https://overreacted.io/writing-resilient-components/)

Five habits for components that don't break when the data they're given changes shape —
written by someone who spent years watching how components actually fail in practice. Pairs
with the derived-state reading above; read it if that one left you wanting the "so what do I
actually do differently" version.

---

## Also assigned this week — PHP refresher (self-paced)

**Due before Session 12** (Tue 10/6), not this week — but assigned today because most of it
is recognition, not new material, and you have more slack now than you will next week.

The question: **you know JavaScript — what actually differs in PHP, and what has no
JavaScript equivalent at all?**

- **[PHP: The Right Way](https://phptherightway.com/)** — the standard orientation to *modern*
  PHP. Skim the whole thing; read "Language Highlights" and "Dependency Management" properly.
- **PHP Manual** — [Language Reference](https://www.php.net/manual/en/langref.php), especially
  [types](https://www.php.net/manual/en/language.types.php) and arrays. A PHP array is an
  ordered map, which is not what a JavaScript array is, and this trips everyone at least once.
- **The PHP 8 features Laravel assumes:** typed properties, constructor promotion, `match`,
  enums, named arguments, nullsafe `?->`. If your PHP is from ITWS 1100, it likely predates
  most of these, and Laravel's own code is full of them.
- **The one idea with no JavaScript equivalent, and the one to actually retain:** *the script
  dies at the end of every request.* No module-level state survives a request, no long-lived
  connections, nothing sitting in memory for the next person who hits the page. This is why
  Laravel needs sessions (Session 17), and it's the reason the spring course reaches for Node
  when that stops being good enough.

---

## Due this week

| | Due |
|---|---|
| **Homework 4** — React components | **Fri 10/2, 11:59 PM** |

The workshop drills are practice, not a submission. Nothing in `inclass/` is graded.

Friday is hands-on again: same laptop, same Node 22.12+, same `inclass/wk6/react/` folder.
Friday starts at drill 5, with a second terminal running `npm run test:unit:watch`.
