# Week 4 — CSS frameworks

| | |
|---|---|
| **Tue 9/15** | One page, five ways. Why CSS is global and what that costs; BEM, Bootstrap and Tailwind as three answers; then the same page on a phone. |
| **Fri 9/18** | Lab. **Homework 2 due. Homework 3 assigned — a responsive build on a CSS framework.** |

**One hand-in for the week: `ANSWERS.md`, two short questions, filled in and pushed
before you leave class on Tuesday.** It counts toward participation.

## Get the answer sheet

Copy [`starter/ANSWERS.md`](starter/) into `inclass/wk4/` in **your own private repository**:

```bash
cp -R ../itws2110-course/inclass/wk4/starter/. inclass/wk4/
```

Copying the file across in Finder or Explorer works just as well.

## Before class

Nothing to download if you did week 3 — the image is the same. If you skipped it, start
the pages once so the build happens at home:

```bash
cd itws2110-course/inclass/wk4/css
docker compose watch
```

---

## Tuesday — [`css/`](css/)

Five parts, one page. Do them in order.

| | | |
|---|---|---|
| 0 | [The problem: every rule is global](css/0-the-problem.md) | plain CSS · find the leak · specificity · escalation |
| 1 | [BEM: names that say what a thing is](css/1-bem.md) | no collisions · the naming tax |
| 2 | [Bootstrap: components someone else designed](css/2-bootstrap.md) | finished parts · their look |
| 3 | [Tailwind: names that say what it looks like](css/3-tailwind.md) | utilities · scales · reuse moves to the template |
| 4 | [Responsive: the same page on a phone](css/4-responsive.md) | mobile-first · prefixes · screenshots at three widths |

Start with [`css/README.md`](css/README.md).

## Submit

Commit to `main` and push. No branch, no pull request.

```bash
git add inclass/wk4/
git commit -m "In-class week 4"
git push
```

Your answers go in `inclass/wk4/ANSWERS.md` **in your repository**, pushed before you leave.
Question 1 is written during Part 0; question 2 after Part 3. Keep the file open.
