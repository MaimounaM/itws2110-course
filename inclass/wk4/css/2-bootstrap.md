# Part 2 — Bootstrap: components someone else designed

Open <http://localhost:8080/2-bootstrap/>. There is no `styles.css`. One `<link>` at the top
pulls in Bootstrap, and every class on the page is one Bootstrap already defines.

## A — Read what you did not write

```html
<span class="badge rounded-pill text-bg-danger">expired</span>
<button class="btn btn-outline-secondary">Buy</button>
<div class="alert alert-danger" role="alert">Not enough in stock.</div>
```

`badge`, `btn`, `alert`, `table`, `form-control`, `card`, `list-group`: these are
**components**. Someone designed a badge — its padding, its radius, its font size, its
colours for eight moods — and you are picking one off the shelf. The page took twenty
minutes and looks like it was designed, because it was, by somebody else.

Notice the shopping-list counts: `text-bg-secondary`, grey. Same `badge` class as the
shelf labels, no collision — because the *colour* is a separate modifier class, and the
base `badge` is neutral. Bootstrap made Part 0's mistake impossible by never putting a
colour on the base class.

## B — Now make it yours

Try three changes, in order, and notice what each one costs:

1. **Make the "expired" badge a softer red.** `text-bg-danger` is Bootstrap's red. You
   can override it in a stylesheet of your own — and now you are back in Part 0, writing
   a selector more specific than Bootstrap's. Or you set the CSS variable
   `--bs-danger-rgb` on `:root`, which is the door Bootstrap left open. Find that door.
2. **Make the table denser.** `table-sm` exists. So does `align-middle`. For every knob
   you want, check whether Bootstrap already has a class; usually it does, and that is
   the pleasure of it.
3. **Make it not look like Bootstrap.** You will find you cannot, not cheaply. The
   defaults — that blue, that radius, that font stack — are the framework's identity, and
   every Bootstrap site shares it. That is the cost, and for an internal tool nobody
   minds.

## Key learnings

- **A component framework sells finished parts**: badge, button, alert, card. You compose a page from them and inherit their design decisions.
- **Collisions are avoided by discipline inside the framework** — neutral base classes, colour as a separate modifier. You are trusting their CSS to be well behaved, and it is.
- **Customising means fighting the cascade again**, unless you go through the doors the framework provides (CSS variables, Sass variables). Learn the doors.
- **You get their look.** Good for admin panels and prototypes, a problem when the brand is yours.
