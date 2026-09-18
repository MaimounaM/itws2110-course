# Homework 3 — Flexbox, Grid, and Breakpoints

**Assigned:** Fri 9/18 · **Due:** Fri 9/25, 11:59 PM · **Individual**

Three things do most of the layout work on the modern web: **flexbox** puts things in a
row, **grid** puts things in a grid, and **breakpoints** change your mind about both when
the screen gets wider. This assignment is one page that uses all three. No Docker, no
build step — a browser tab and one HTML file, plus a set of tests you can run on
yourself when you want to know if you are done.

You will write it in Tailwind, because Tailwind's class names are the CSS property names.
`flex` is `display: flex`. `justify-between` is `justify-content: space-between`.
`md:grid-cols-3` is a media query. Learning the classes and learning the underlying CSS
is the same activity, which is the point.

---

## Part 0 — Sixteen drills (40 minutes)

Before you write anything, work through the two drill files. Each is a set of small
containers with an empty `class=""` you have to fill so the boxes land where the goal
says, and each checks itself: reload the page and a drill turns green or stays red.

| | | |
|---|---|---|
| 1 | [`drills-flex.html`](starter/drills-flex.html) | nine drills — rows, alignment, `gap`, columns. Everything Task 1 needs. |
| 2 | [`drills-grid.html`](starter/drills-grid.html) | seven drills — columns, spans, and the responsive layouts from Tasks 2 and 3. |

Do them in that order; the grid file assumes you have done the flexbox one.

Everything you need is in the table below and in Friday's slides. The other place to look
is the Tailwind documentation, which has a page per property showing every class and the
CSS it compiles to — start at
[justify-content](https://tailwindcss.com/docs/justify-content) and use the sidebar for
`display`, `align-items`, `flex-direction` and `gap`. The same link is at the top of
`drills-flex.html`.

Get into the habit of reading these pages. They are the reference you will actually use
once the course is over, and they are more reliable than asking an AI, which will happily
give you a class name from an older version of Tailwind that no longer exists.

### Do the drills in VS Code, not in Tailwind Play

Tailwind Play is for the assignment page later on. It will not work for the drills: Play
takes a snippet of markup for one page, and each drill file is a whole HTML document with
a checking script in it, so the green counter never runs. Open the files as files.

1. **Open the `homework/hw3/` folder in VS Code** — *File → Open Folder*, not *Open File*.
   Opening the folder is what makes the extensions and the file sidebar work properly.
2. **Install two extensions** from the Extensions panel (the blocks icon in the left bar),
   searching by name:
   - **Tailwind CSS IntelliSense** (Tailwind Labs) — autocompletes class names inside
     `class=""`, and hovering a class shows the CSS it compiles to. Start typing `just`
     inside the quotes and it offers the rest.
   - **Live Server** (Ritwick Dey) — reloads the browser every time you save.
3. **Right-click `drills-flex.html` in the sidebar → *Open with Live Server*.** It opens in
   your browser at an address like `http://127.0.0.1:5500/drills-flex.html`.
4. **Put the two windows side by side**, VS Code on one half of the screen and the browser
   on the other. You want to see both at once.
5. **Type classes into the empty `class=""` and save.** The page reloads itself and the
   counter at the top moves. That is the whole loop.

Without Live Server it still works — open the file in your browser directly and press
reload after every save. Live Server just removes the reloading.

Finish both files before starting Task 1. The last drill in each one is the task it is
preparing you for: drill 9 of the flexbox file is the Task 1 header, and drills 6 and 7 of
the grid file are Tasks 2 and 3.

**The last two grid drills change their answer with the window width** — one column on a
phone, three on a laptop. Resize the window past 768 px and they should stay green on both
sides of it. That is mobile-first, and it is the whole idea behind Task 2.

**The checks look at what the browser computed, not at what you typed.** Any classes that
produce the right layout pass — the same idea as the tests you wrote in week 3. That is
also why an inline `style=""` is rejected rather than counted: this assignment is about
the classes.

These are all real CSS properties. Tailwind just gives them shorter names:

| The property | Tailwind calls it |
|---|---|
| `display: flex` | `flex` |
| `justify-content: space-between` | `justify-between` |
| `justify-content: space-around` | `justify-around` |
| `align-items: center` | `items-center` |
| `flex-direction: column` | `flex-col` |
| `gap: 1rem` | `gap-4` |

### If a change does not seem to do anything

Hard reload. Your browser caches the file, and a normal reload can hand you the old
version — `Cmd+Shift+R` on a Mac, `Ctrl+Shift+R` on Windows. This bites everybody at
least once, and it looks exactly like broken code. Live Server mostly avoids it.

The other cause is a typo in the class attribute. Class names are separated by **spaces**,
not commas or semicolons: `class="flex justify-between"`, never
`class="flex; justify-between;"`. A stray semicolon makes the whole token invalid, the
browser silently ignores it, and the layout does not move. IntelliSense helps here — a
class it does not recognise does not get its little colour swatch and does not autocomplete.

### If you want the game as well

[Flexbox Froggy](https://flexboxfroggy.com/) is genuinely good and covers the same ground
in 24 levels, and [Grid Garden](https://cssgridgarden.com/) does it for grid. Both are
optional. One thing to know: Froggy is from 2015 and predates `gap`, so it solves spacing
with margins — flexbox drill 6 covers what it leaves out.

---

## Set up

### 1. VS Code — where you will actually work

Everything in this assignment is an HTML file you edit and reload, so VS Code plus a
browser is the whole setup. If you did Part 0 you already have it: the folder open,
**Tailwind CSS IntelliSense** and **Live Server** installed, editor and browser side by
side.

| Which file | Where to work on it |
|---|---|
| `drills-flex.html`, `drills-grid.html` | **VS Code only.** They are self-checking documents; Tailwind Play cannot run them. |
| `index.html` | VS Code, the same way. Tailwind Play is optional — see below. |

### 2. Tailwind Play — optional, for experimenting

**[play.tailwindcss.com](https://play.tailwindcss.com)** gives you HTML on the left, a
live page on the right, and no files at all. It is a good scratchpad when you want to try
three versions of a card quickly, and dragging the divider between the panes is a fast way
to check a narrow layout.

Two things to know before you rely on it:

- **It only takes the markup**, not a whole HTML document. Paste in the *contents* of your
  `<body>`, not the file. This is why the drills do not work there.
- **Your file is the thing that gets graded**, so whatever you build in Play has to come
  back into `index.html` in your repository. It is easy to do good work in Play and forget
  to move it.

If you use Play, click **Share** and put the URL at the top of your write-up. If you work
only in VS Code, write "worked locally" there instead — that is a perfectly good answer.

### 3. The starter

Copy the **contents** of [`starter/`](starter/) into `homework/hw3/` in your own
repository:

```bash
cp -R ../itws2110-course/homework/hw3/starter/. homework/hw3/
```

The two `drills-*.html` files are Part 0, above. `index.html` is the assignment: the page
with the content already written and **every `class=""` empty** — that is what you fill
in, in VS Code, exactly as you did the drills. `WRITEUP.md` is Part 4.

The starter loads Tailwind from a CDN, so the file works when you open it directly in a
browser — no server, no build:

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

That line is for learning and prototyping, not for a production site. Leave it in.

---

## Task 1 — A header row, with flexbox

The page title on the left, the three nav links grouped together on the right, everything
vertically centred, with space around it so it does not touch the edges.

You need three ideas, all of them from flexbox drills 1, 3 and 5:

- `flex` on the container to make its children sit in a row
- `justify-between` to push the first child left and the last child right
- `items-center` so the title and the links line up on the same invisible middle line

The three links also need to sit in a row with space between them — which means the
`<nav>` is *also* a flex container. Nesting flex inside flex is normal and you will do it
constantly.

Add padding, a background colour, and enough font weight that it reads as a header.

**Done when** the title is hard left, the links are hard right, they are level with each
other, and nothing is jammed against the window edge.

---

## Task 2 — A card grid, with grid

Six cards. One column on a phone, two side by side on a tablet, three across on a laptop.

```
grid              →  display: grid
grid-cols-1       →  one column
gap-4             →  space between cards, both directions
md:grid-cols-2    →  two columns from 768px up
lg:grid-cols-3    →  three columns from 1024px up
```

That is the whole mechanism. `grid-cols-1` with no prefix is the phone; the prefixed
versions take over as the screen gets wider.

Then make the cards look like cards: white background, padding, rounded corners, a
shadow. `bg-white p-6 rounded-lg shadow` is a perfectly good answer.

**Done when** narrowing the preview pane moves the cards from three across, to two, to
one stacked column, and the gaps stay even the whole way.

---

## Task 3 — An article and a sidebar, at a breakpoint

The last section is an article and a narrow sidebar. On a phone they stack, article on
top. From `md` up they sit side by side, and the sidebar is about a third the width.

Two ways to do this, and either earns full marks:

| | |
|---|---|
| **Grid** | `grid grid-cols-1 md:grid-cols-3`, then `md:col-span-2` on the article so it takes two of the three columns |
| **Flex** | `flex flex-col md:flex-row`, then width classes like `md:w-2/3` and `md:w-1/3` |

Try it at 375 px wide and at full width. If your sidebar is still hugging the article on
a phone, you have put a class where the prefix should be.

**The rule underneath this task:** an unprefixed Tailwind class applies at *every* width.
A prefix like `md:` only adds behaviour **from that width up** — it is literally compiled
into `@media (min-width: 768px)`. So you describe the phone with no prefixes, then add
what a bigger screen affords. This is mobile-first, and it is why you never write
"shrink this back down for phones."

The breakpoints you have:

| Prefix | From | Roughly |
|---|---|---|
| *(none)* | 0px | phone |
| `sm:` | 640px | large phone |
| `md:` | 768px | tablet |
| `lg:` | 1024px | laptop |
| `xl:` | 1280px | desktop |

**Done when** the two sections stack on a phone and sit side by side on a laptop, and you
can point at the one class that makes the switch happen.

---

## Task 4 — Teach yourself one more thing

Everything up to here you were shown, in the drills or on Friday. This one you go and find
out on your own, because that is the actual job: most of what you will use in this field
has to be learned from a documentation page rather than from a lecture.

The drills covered how flexbox **aligns** things — `justify-*` and `items-*`. They never
touched how flex items **size** themselves, which is the other half of flexbox and the
more useful half once a layout gets real. Pick **one** of these, or anything else from the
[Flexbox & Grid](https://tailwindcss.com/docs/flex-basis) section of the docs that we did
not cover:

| Pick one | What it is about |
|---|---|
| [`flex-1`, `grow`, `shrink`](https://tailwindcss.com/docs/flex) | how items divide up the leftover space in a row. Why a nav bar can have one item that stretches and two that do not. |
| [`flex-wrap`](https://tailwindcss.com/docs/flex-wrap) | what a row does when it runs out of room — wrap onto a second line, or squash. |
| [`order`](https://tailwindcss.com/docs/order) | showing items in a different order than the HTML. Read the accessibility warning: Tab order follows the HTML, not the screen. |
| [`self-center`, `self-end`](https://tailwindcss.com/docs/align-self) | one item opting out of the alignment its container set for everything else. |

Then:

1. **Read its documentation page** — the class table, the CSS each one compiles to, and
   the example.
2. **Use it in your `index.html`** somewhere it genuinely helps. The header, a card, or the
   sidebar are the obvious places to look. One well-chosen use is worth more than five
   sprinkled around.
3. **Answer write-up question 5** about it: what it does, the CSS it compiles to, why you
   put it where you put it, and anything you tried first that did not work.

**Done when** the class is doing real work in your page — remove it and something should
visibly get worse — and question 5 explains it in your own words.

A note on how this is marked: picking something simple and understanding it completely
beats picking something clever and describing it vaguely. "I used `flex-1` on the article
so it takes whatever width the sidebar does not" is a full-marks answer.

---

## Check your own work

You learned Playwright in week 3 and pointed it at somebody else's app in Homework 2.
This time you point it at your own page. **These are the same tests I run when I mark
this** — if they pass for you, the mechanical part of your grade is already settled.

Once, to set up:

```bash
npm install
npx playwright install chromium
```

Then, as often as you like:

```bash
npm test
```

Ten tests. They open your `index.html` in a real browser at 375, 800 and 1280 pixels and
measure what the browser actually laid out — not which classes you typed, so any answer
that produces the right layout passes. Exactly how the drills work, on the real page.

| | |
|---|---|
| Task 1 | 2 tests — the header is a flex row, the nav is its own flex container with a gap |
| Task 2 | 4 tests — one column at 375, two at 800, three at 1280, and a gap |
| Task 3 | 2 tests — stacked on a phone, side by side with the article wider on a laptop |
| Task 4 | 1 test — a self-taught class is present **and removing it changes the page** |
| The rules | 1 test — no stylesheet, no inline `style=""`, no arbitrary values |

Read the failures rather than guessing: each one says what it wanted and what it got.

**What the tests cannot check** is whether write-up question 5 explains your Task 4 class
properly, or whether your screenshots are really of your page. Ten green tests is most of
the grade, not all of it.

Two things not to do: do not edit `tests/layout.spec.js` to make it pass, and keep the
`<header>`, `<main>`, `<section id="cards">`, `<section id="layout">`, `<article>` and
`<aside>` tags where they are — that is how the tests find things. Everything inside them
is yours.

`node_modules/` is gitignored; do not commit it.

---

## Part 5 — Screenshots and the write-up

**Two screenshots**, committed to `homework/hw3/`:

| File | |
|---|---|
| `phone.png` | the whole page at 375 px wide |
| `desktop.png` | the whole page at 1280 px wide |

Take them with the DevTools device toolbar from Tuesday's lecture — `Cmd+Shift+M` on a
Mac, `Ctrl+Shift+M` on Windows — set the width, then screenshot.

Then fill in [`WRITEUP.md`](starter/WRITEUP.md): six short answers, including your
Tailwind Play link at the top (or "worked locally") and the **AI Use Statement, required
from this assignment on**.

---

## Grading

| | |
|---|---|
| Task 1 — flexbox header, spaced and aligned | 20% |
| Task 2 — card grid, 1 → 2 → 3 columns | 20% |
| Task 3 — article and sidebar, stacking at a breakpoint | 15% |
| Task 4 — one thing you taught yourself, used and explained | 15% |
| Two screenshots at the right widths | 10% |
| Write-up and AI statement | 20% |

Expect this to take **about two hours**: forty minutes on the drills, forty on Tasks 1–3,
and the rest on Task 4 and the write-up. If Tasks 1–3 are taking you much longer than
that, you skipped the drills — go back and do them, they are faster than guessing.

**No stylesheet of your own.** No `<style>` block with a selector, no inline `style=""`,
no `.css` file. Everything is a Tailwind class in a `class=""` attribute. If you cannot
make Tailwind do something, say so in write-up question 5 — that is a finding, not a
failure.

**Minus 5 minimum** for files outside `homework/hw3/`, or a `starter/` folder left sitting
inside it.

*Autochecked:* `npm test` — the ten tests in `tests/layout.spec.js`, which you can run
yourself. Tasks 1–3 and the rules are decided by those. Task 4's mark is half the test
(the class is there and load-bearing) and half write-up question 5, which I read. The
screenshots and the rest of the write-up I read.

---

## Submission

Everything in `homework/hw3/` in your own repository:

```
homework/hw3/
├── index.html          the assignment (Tasks 1–4)
├── drills-flex.html    Part 0, with your answers filled in
├── drills-grid.html    Part 0, with your answers filled in
├── tests/              the tests — leave them as they are
├── package.json        }  the Playwright setup
├── playwright.config.js }
├── WRITEUP.md
├── phone.png
└── desktop.png
```

Commit both drill files with your answers in them. They are not marked — I look at them
only if something in the tasks suggests the drills would help you.

If you worked in VS Code the whole way, there is nothing to move — the file in your
repository is already the file you built.

**If you used Tailwind Play**, get your work back out: select everything in the left pane,
copy it, and in your local `index.html` **paste it between `<body>` and `</body>`**,
replacing what is there. Leave the `<head>` alone — Play never shows you the `<script>`
CDN line, but your local file needs it to render outside of Play.

Either way, open the file in a browser before you commit. If it comes up as unstyled black
text on white, the CDN line is missing — that is the one mistake everybody makes here.

```bash
git add homework/hw3/
git commit -m "HW3: flexbox, grid, and breakpoints"
git push
```

**Done when** someone can clone your repository, double-click `homework/hw3/index.html`,
resize the window, and watch the layout respond.
