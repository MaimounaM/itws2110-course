# Week 5 — September 22 and 25

[← Course home](../README.md)

| | |
|---|---|
| **Tue 9/22** | React. Why a library would redraw the whole page on every change, and why that turns out to be fast. In class, the first six drills — [React workshop](../inclass/wk5/react/). [Slides](../slides/8_react.pdf) |
| **Fri 9/25** | Lab; drills 7–11. **Homework 3 due; [Homework 4](../homework/hw4/) assigned — React components. Project proposal due.** |

The workshop runs past this week: drills 12–15 write component tests with Vitest and
Testing Library, and belong to session 11 on Fri 10/2. Same folder, same `npm run dev` —
nothing extra to install.

---

## Reading — due Tuesday

The question for the week: **what if you threw away the entire interface and rebuilt
it every time something changed?** That sounds absurd, and it is what React does. The
reading is in two parts — how to write it, then why it is not absurd.

### 1. React docs — *Thinking in React*, *Describing the UI*, *Render and Commit*

[react.dev/learn](https://react.dev/learn) — free, no login.

This is the required reading, and it is the textbook for this unit. The React docs are
written by the team that maintains React, updated with it, and runnable in the page. No
book beats them for learning to write React; assigning one alongside would only tell you
things that stopped being true. Do the examples in the browser rather than reading past them.

- **Thinking in React** — how to get from a picture of a page to a tree of components.
- **Describing the UI** — JSX, props, lists, conditions. Drills 1–6 on Tuesday are these pages.
- **Render and Commit** — the two phases. Read this one twice; it is Tuesday's lecture.

### 2. Tejas Kumar, *Fluent React* — chapter 3 (Optional)

[Read it through the RPI library](https://learning-oreilly-com.libproxy.rpi.edu/library/view/fluent-react/9781098138707/)
— sign in with your RPI credentials when prompted, the same way as the CSS in Depth book.

The docs tell you *what* to write. This is the mechanism underneath, and it is the only
React book worth your time for that reason.

| Chapter | | |
|---|---|---|
| 3 | The Virtual DOM | why touching the real DOM is expensive, what a React element actually is, and how "redraw everything" becomes a small number of real updates. This is the answer to the week's question. |
| 4 | Inside Reconciliation | depth. Fibers, double buffering, and why React can pause work halfway through. Read it if chapter 3 leaves you wanting the next level down. |
| 1 | The Entry-Level Stuff | background. jQuery, Backbone, Angular, and what React was reacting *to*. Useful if "why does this exist" is bothering you. |

Chapters 6–9 are about server-side React, concurrent features, and Server Components.
Out of scope here — we run React in the browser on local state until session 22 — but
that is where to look next semester.

### 3. Pete Hunt, *React: Rethinking Best Practices* — 30 minutes (Optional)

[JSConf EU 2013](https://www.youtube.com/watch?v=x7cQ3mrcKaY)

The talk where this argument was first made in public, to a room that mostly did not buy
it. Templates, separation of concerns, and re-rendering everything. Thirteen years old and
still the clearest framing of the trade; watch it for the argument, not the API.

Optional
### 4. Dan Abramov, *React as a UI Runtime* (Optional)

[overreacted.io/react-as-a-ui-runtime](https://overreacted.io/react-as-a-ui-runtime/)

React described as a programming language runtime rather than a UI library, by someone
who worked on it. The advanced version of everything above. Long, and worth it.

---

## Due this week

| | Due |
|---|---|
| **Homework 3** — flexbox, grid, and breakpoints in Tailwind | **Fri 9/25, 11:59 PM** |
| **Project proposal** | **Fri 9/25, 11:59 PM** |

The workshop drills are practice, not a submission. Nothing in `inclass/wk5/` is graded.

Both days are hands-on: bring your laptop with Node 22.12 or newer installed. Step 0b of
the [workshop README](../inclass/wk5/react/README.md) walks through the install — do it
**before** Tuesday if you can, so class time goes to React rather than to npm.
