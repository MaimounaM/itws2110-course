# Part 4 — Responsive: the same page on a phone

Photograph everything first:

```
docker compose run --rm shots
```

Fifteen PNGs land in `shots/`: each of the five versions at phone (375 px), tablet (768 px)
and desktop (1280 px) widths, taken by Chromium inside the container. Open
`shots/3-tailwind-phone.png` next to `shots/4-responsive-phone.png`.

## A — What went wrong on the phone

In `3-tailwind-phone.png` the dates wrap onto two lines, the "Add product" button has
broken into two words, and six columns are fighting over 375 pixels. Nothing is *broken*;
it is just designed for a desk and squeezed. That is what every page does by default.

## B — What `4-responsive` did about it

Open `public/4-responsive/index.html` and diff it in your head against `3-tailwind`. The
page is the same; some classes grew a prefix:

```html
<form class="my-4 flex flex-col gap-3 md:flex-row md:items-end">
<th  class="hidden px-3 py-2 md:table-cell">Best before</th>
```

A class with no prefix applies at every width. `md:` applies from 768 px up; `sm:` from
640 px up. So `flex-col md:flex-row` means *stack the form fields — and from tablet width
on, put them in a row*. `hidden md:table-cell` means *drop the best-before column — and
bring it back when there is room*. The date did not disappear on the phone: look at the
product cell, where a `block md:hidden` span shows it under the name instead.

This is **mobile-first**: the unprefixed classes are the phone design, and each prefix
says what changes when there is more space. Bootstrap has the same idea with different
spelling — `col-md-6`, `d-none d-md-table-cell` — and `2-bootstrap` already uses
`table-responsive`, which is why its phone screenshot scrolls sideways instead of wrapping.

## C — Do one yourself

At phone width the **Use** column is hidden (`hidden sm:table-cell`). Decide that is wrong —
using something up is the most common action — and swap it: hide **Buy** on phones, show
**Use**. Two prefixes to move. Then:

```
docker compose run --rm shots node shots/screenshot.js 4-responsive
```

Look at the new `4-responsive-phone.png`. Then ask the question the course keeps asking:
how would you *test* that, so that nobody can quietly bring the column back? The
screenshot script is one `expect` away from being a Playwright test. Homework 3 is that.

## Key learnings

- **Design for the phone first**; add what the wider screen affords with prefixes (`sm:`, `md:`) or grid classes (`col-md-6`). Not the other way round.
- **Breakpoints are a scale too** — 640, 768, 1024, 1280 — chosen once, used everywhere, so that two pages break at the same widths.
- **Hiding is not the only move.** The date moved under the product name; it was not removed.
- **You can see a phone without owning one.** A headless browser at 375 px is a screenshot away, and a screenshot is one assertion away from a test.
