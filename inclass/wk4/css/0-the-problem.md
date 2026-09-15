# Part 0 — The problem: every rule is global

Open <http://localhost:8080/0-plain/> and `public/0-plain/styles.css` side by side. Sixty
lines of ordinary CSS, written the way you wrote it in ITWS 1100. It looks fine.

## A — Find the bug

Look at the shopping list at the bottom. The counts — `2`, `1`, `1` — are green pills.
Nobody asked for green. Find out why: the counts use `class="badge"`, and `.badge` was
written for the *shelf labels* in the table, where green means *fresh*. The rule does not
know which badge it is styling. **A CSS rule applies to every element that matches it, on
the whole page, forever.** That is the entire problem this week is about.

## B — Fix it the obvious way

Add to the bottom of `styles.css`:

```css
.shopping-list .badge { background: #e5e5e5; color: #333; }
```

Save. Watch syncs it in; reload. The counts are grey. Now look at the Bread count, which
carries `class="badge expired"` because Bread is overdue and needs buying. It went grey
too — the red is gone. Why? Two selectors match it: `.badge.expired` (two classes) and
`.shopping-list .badge` (two classes). **A tie**, and a tie goes to whichever rule comes
later in the file. Yours is later. You just broke something you were not touching.

## C — Fix it the next obvious way

```css
.shopping-list .badge.expired { background: #fbd5d5; color: #7f1d1d; }
```

Three classes beats two. Red is back. Count what you have now: three rules for one small
pill, each one more specific than the last, and the next person to touch this file will
add a fourth. This is *specificity escalation*, and every CSS codebase over about a year
old has it. The final move in the escalation is `!important`; try it on the first rule
and watch what it does to the others.

## D — Read the selector that started it

```css
.badge { ... }                 /* 0,1,0 */
.badge.expired { ... }         /* 0,2,0 */
.shopping-list .badge { ... }  /* 0,2,0  <- tie with the line above */
```

Those numbers are specificity: (ids, classes, elements). The browser sorts matching rules
by that number first and by file order second. Every framework you will see from here on
is an answer to the question *how do we stop needing to think about this?* — and they
answer it differently.

## Key learnings

- **CSS is global.** A selector matches everything on the page that fits it, including things written next month by someone else.
- **Specificity decides ties, then source order.** Two classes beat one; equal specificity, later wins. Once you are counting, you are already losing.
- **Every fix raises the stakes.** More specific selectors beget more specific selectors. `!important` is the end of that road, not a way off it.
- The name `.badge` described what it *looks like*. The name `.shelf-label` would have described what it *is*. Part 1 takes that road; Part 3 takes the opposite one.
