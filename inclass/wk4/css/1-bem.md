# Part 1 — BEM: names that say what a thing *is*

Open <http://localhost:8080/1-bem/> and its `styles.css`. Same page. Same look. Different
rules.

## A — Read the class names

```html
<span class="shelf-label shelf-label--expired">expired</span>
<span class="shopping-list__count shopping-list__count--urgent">1</span>
```

`block__element--modifier`. The **block** is a standalone thing (`shopping-list`,
`stock-table`, `shelf-label`). An **element** is a part of it (`shopping-list__count`).
A **modifier** is a variation (`--urgent`, `--expired`). Every name says which component
it belongs to, so the shelf label and the shopping count *cannot* collide — they were
never the same class.

## B — Read the selectors

Every selector in the file is exactly one class. Specificity is `0,1,0` for every rule,
always. There are no ties to reason about, no descendant selectors, no escalation. Part 0's
bug is impossible by construction. That is the point of BEM, and it is a good point.

## C — Now pay for it

Add a "low stock" label to the Rice row: amber, next to the shelf label. In Part 0 you would
write `.badge.low { ... }`. Here you have to decide: is it a `shelf-label--low`? A new
block? You write the name, then the rule, then the HTML. Three places. Then look at
`index.html` again and count the characters in the table rows. The HTML is twice as long
as Part 0's, and every class name had to be invented and typed by a person.

This is Gallagher's position (2012): class names should describe *what a thing is*, so the
HTML carries meaning and the CSS stays clean. It works. The cost is naming, and naming is
the hard part of programming.

## Key learnings

- **BEM makes collisions impossible** by putting the component's name inside every class. One class per selector, so specificity never varies.
- **The cost moves to naming.** Every new visual variation needs a name, a rule, and a markup change, and the names must be invented.
- **HTML gets heavy and CSS gets long**, because nothing is shared: `shelf-label` and `shopping-list__count` have nearly identical rules that cannot be reused without breaking the isolation.
- This is one honest answer to Part 0. Part 3 is the other.
