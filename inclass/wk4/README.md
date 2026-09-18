# Week 4 — CSS frameworks

| | |
|---|---|
| **Tue 9/15** | Business relevance of CSS, DevTools, the cascade and three answers to it, AI and design work. [Slides](../../slides/6_css_frameworks_v3.pdf) |
| **Fri 9/18** | Lab. **Homework 2 due. Homework 3 assigned — CSS in the wild, then Bootstrap and Tailwind.** |

**One hand-in for the week: a short group presentation on a CSS framework, uploaded to
`inclass/wk4/` in your repository before you leave class on Tuesday.** It counts toward
participation. There is no answer sheet this week.

---

## Tuesday — the framework presentation

Bootstrap and Tailwind are two answers out of many. In your project team, take one of the
others and find out what it is actually for.

### 1. Pick one framework

One framework per team, no repeats within a section: claim yours with the instructor
before you start. Bootstrap and Tailwind are covered in class and in Homework 3, so pick
from the rest.

| | | |
|---|---|---|
| shadcn/ui | Material UI | Ant Design |
| Bulma | Pico.css | Open Props |
| Materialize CSS | Mantine | Foundation |
| UnoCSS | Semantic UI / Fomantic | daisyUI |
| Chakra UI | Vuetify | |

### 2. Research its value proposition

What problem does it say it solves, and for whom? Put it in the terms from today's
slides: does it give you finished components, utilities, tokens, or a mix? Where does
reuse live? Who owns the look? What does it cost you?

### 3. Generate an example

Build one small thing with it: a card, a form, or the "expired" badge from the exercise
below. Use an AI assistant if you like, then **render it and take a screenshot**; code
you have not seen running does not count.

### 4. Make the presentation

A few slides, as a `.pptx`:

- the framework and its value proposition, in one sentence
- where it sits among the approaches from class, and why
- your example: the code and the screenshot
- one thing it does well and one thing it does badly

### 5. Upload it

**Every team member** puts the same file in their own repository, named for the
framework, for example `inclass/wk4/pico-css.pptx`. Commit to `main` and push before you
leave. No branch, no pull request.

```bash
git add inclass/wk4/
git commit -m "In-class week 4: framework presentation"
git push
```

---

## The exercise — [`css/`](css/)

One page, five ways. It is the material behind today's slides and a good place to try
your framework's example next to Bootstrap and Tailwind. Nothing to hand in from it.

Nothing to download if you did week 3; the image is the same:

```bash
cd itws2110-course/inclass/wk4/css
docker compose watch
```

| | | |
|---|---|---|
| 0 | [The problem: every rule is global](css/0-the-problem.md) | plain CSS · find the leak · specificity · escalation |
| 1 | [BEM: names that say what a thing is](css/1-bem.md) | no collisions · the naming tax |
| 2 | [Bootstrap: components someone else designed](css/2-bootstrap.md) | finished parts · their look |
| 3 | [Tailwind: names that say what it looks like](css/3-tailwind.md) | utilities · scales · reuse moves to the template |
| 4 | [Responsive: the same page on a phone](css/4-responsive.md) | mobile-first · prefixes · screenshots at three widths |

Start with [`css/README.md`](css/README.md).
