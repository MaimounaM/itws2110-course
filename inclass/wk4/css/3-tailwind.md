# Part 3 — Tailwind: names that say what a thing *looks like*

Open <http://localhost:8080/3-tailwind/>. Again no stylesheet of ours: one `<script>` loads
Tailwind, which reads the class names on the page and generates exactly the CSS they need.

## A — Read a badge

```html
<span class="inline-block rounded-full px-2 py-0.5 text-xs bg-red-100 text-red-900">expired</span>
```

Seven classes, and each one is one CSS declaration: `rounded-full` is `border-radius:
9999px`, `px-2` is horizontal padding of `0.5rem`, `text-xs` is `font-size: 0.75rem`.
These are **utilities**. There is no `.badge`. There is no name for the thing at all;
there is only what it looks like, written on it.

This is Wathan's position (2017), and it is the exact opposite of Part 1. He started as a
believer in semantic names and argued himself out of it one refactor at a time: the names
never matched anything real, the "reuse" never happened, and every new variation was a
new class anyway. So: stop naming. Style the element where it stands.

## B — Why the numbers are what they are

Change `px-2` to `px-3`. Then try `px-2.5`. Then try `px-7`. You are choosing from a
**scale** — 0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12… — not typing pixel values, and
the scale is the same for padding, margin, gap and width. That constraint is a feature: two
people working on two pages end up with spacing that matches, because neither of them could
type `13px`. The same is true of the colours: `red-100` through `red-900` are a designed
ramp, not whatever hex someone had in the clipboard. These are **design tokens**, and every
serious design system has them; Tailwind just puts them in the class names.

## C — Now pay for it

The badge appears in **ten places** on this page, seven classes each. Change the radius on
all of them. In Part 1 that was one line in one file. Here it is ten edits — or a
find-and-replace, which is how Tailwind projects actually do it, and it is not as bad as it
sounds.

But look at where the repetition really lives. Open the week-3 Pantry's `index.php`: the
badge is written **once**, inside a `foreach` loop. Seven rows, one template. Tailwind's
real answer to "where is the component?" is *in the template, not in the CSS*: a PHP loop,
a Blade partial, a React component. This page has none of those, which is why it hurts.
The moment you have a templating layer, the pain mostly goes away — and in this course you
will always have one.

## Key learnings

- **Utilities are one declaration each**, named for what they do. The element's look is written on the element; nothing is named, so nothing can collide.
- **A scale, not free values.** Spacing and colour come from a fixed set, so a whole site stays consistent without anyone enforcing it. Those sets are design tokens.
- **Reuse moves to the template.** A component in a utility world is a loop, a partial, or a React component that emits the classes — not a CSS class. Without a templating layer, utilities repeat; with one, they do not.
- **You get your own look**, because there are no finished parts to inherit. That is the trade against Part 2.
