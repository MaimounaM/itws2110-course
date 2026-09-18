# Week 4 — one page, five ways

The week-3 Pantry page, frozen as HTML with seven products in it, styled five different
ways. The content never changes; only the class names and the stylesheet do. That is the
whole experiment: the same page, and five answers to the question *should a class name say
what a thing is, or what it looks like?*

| | | |
|---|---|---|
| 0 | [The problem: every rule is global](0-the-problem.md) | plain CSS · find the leak · specificity · escalation |
| 1 | [BEM: names that say what a thing is](1-bem.md) | block__element--modifier · no collisions · the naming tax |
| 2 | [Bootstrap: components someone else designed](2-bootstrap.md) | finished parts · customising through the doors · their look |
| 3 | [Tailwind: names that say what it looks like](3-tailwind.md) | utilities · scales and tokens · reuse moves to the template |
| 4 | [Responsive: the same page on a phone](4-responsive.md) | mobile-first · `md:` prefixes · screenshots at three widths |

## Commands

```
docker compose watch              the pages at http://localhost:8080 -- edits sync in as you save
docker compose run --rm shots     photograph every version at phone, tablet, desktop -> shots/
docker compose down               stop
```

Same image as week 3 (Apache + Playwright), so nothing new downloads. Start `watch` once
before Tuesday if you have not built the week-3 image; otherwise it is instant.

```
css/
├── public/
│   ├── index.html          links to the five versions
│   ├── 0-plain/            index.html + styles.css   written by hand
│   ├── 1-bem/              index.html + styles.css   same look, BEM names
│   ├── 2-bootstrap/        index.html                one <link>, Bootstrap 5.3
│   ├── 3-tailwind/         index.html                one <script>, Tailwind 4
│   └── 4-responsive/       index.html                3-tailwind with breakpoint prefixes
├── shots/screenshot.js     Playwright: every version x three widths
├── Dockerfile              the week-3 image lines, again
└── docker-compose.yml      web (watch) · shots (run --rm)
```

Two of the five load their CSS from a CDN (`2-bootstrap`, `3-tailwind`, `4-responsive`),
so those need the network the first time. The other two are self-contained.
