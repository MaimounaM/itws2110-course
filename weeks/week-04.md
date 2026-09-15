# Week 4 — September 15 and 18

[← Course home](../README.md)

| | |
|---|---|
| **Tue 9/15** | CSS frameworks. Why CSS is globally scoped and everything since has been a response to that: BEM, Bootstrap, Tailwind. [One page, five ways](../inclass/wk4/) — in-class exercise. Nothing to download if you did week 3. |
| **Fri 9/18** | Lab. **Homework 2 due; Homework 3 assigned — a responsive build on a CSS framework.** |

---

## Reading — due Tuesday

The question for the week: **should a class name describe what a thing is, or what it
looks like?** Two smart people disagree, and the disagreement is the whole
Bootstrap-versus-Tailwind argument. Read the mechanism first, then the argument.

### 1. Keith Grant, *CSS in Depth*, 2nd edition — chapter 9

[Read it through the RPI library](https://learning-oreilly-com.libproxy.rpi.edu/library/view/css-in-depth/9781633437555/)
— sign in with your RPI credentials when prompted, the same way as the Chojrin book.

| Chapter | | |
|---|---|---|
| 9 | Modular CSS and scope | why the cascade makes every rule global, and the lineage of answers: OOCSS, BEM, utility classes, scoping. Both sides of Tuesday's argument, in one chapter. |
| 1 | Cascade, specificity, and inheritance | *only if* you cannot say from memory why `.nav a` beats `a.link`. It is the problem chapter 9 is solving. |
| 8 | Cascade layers and nesting | optional. The 2024 answer that neither essay below knew about. |

### 2. Adam Wathan, *CSS Utility Classes and "Separation of Concerns"* — 20 minutes

[adamwathan.me/css-utility-classes-and-separation-of-concerns](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/) (2017)

The essay that became Tailwind. He starts as a believer in semantic class names and
argues himself out of it, one refactor at a time. Read it to disagree with it; that is
what Tuesday is for.

Optional
### 3. Nicolas Gallagher, *About HTML Semantics and Front-End Architecture* — 15 minutes

[nicolasgallagher.com/about-html-semantics-front-end-architecture](https://nicolasgallagher.com/about-html-semantics-front-end-architecture/) (2012)

The position Wathan is arguing against, from the person who made it best. Chapter 9
summarises it; this is the original.

### For Homework 3 — reference, not reading

Both on the RPI library's O'Reilly platform.

- Noel Rappin, [*Modern CSS with Tailwind*, 2nd ed.](https://learning-oreilly-com.libproxy.rpi.edu/library/view/modern-css-with/9781680509892/) — 102 pages. Chapters 1–2 for the utility idea, chapter 7 for breakpoints. It covers Tailwind 3; Tailwind 4 moved configuration into CSS, so the setup chapter is dated and the class names are not.
- Ben Frain, [*Responsive Web Design with HTML5 and CSS*, 5th ed.](https://learning-oreilly-com.libproxy.rpi.edu/library/view/responsive-web-design/9781837028238/) (2025) — chapters 3 (media and container queries), 4 (flexbox), 5 (grid). The responsive fundamentals under any framework.

---

## Due this week

| | Due |
|---|---|
| In-class exercise | Tue 9/15, before you leave class |
| **Homework 2** — testing Grocy | **Fri 9/18, 11:59 PM** |

Friday is a lab: bring your laptop with Docker Desktop running and Homework 2 in a state
you are willing to show someone. Homework 3 is assigned in the room.
