// Edit only this file for drills 12–15. Run it in a terminal, not the browser:
//
//     npm run test:unit          once
//     npm run test:unit:watch    re-runs on every save — use this one in class
//
// Every drill starts RED on purpose. That is the point: a failing test names what
// you have not built yet, which is the same argument from session 4. Read the diff
// Vitest prints — it tells you what it got and what it wanted.
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductHeading, Product, AddButton, ProductNameField } from './pantry.jsx';

// render() puts the component into a real DOM. screen queries that DOM the way a
// person finds things on a page: by role, by label, by visible text. It never looks
// at your class names or your state — only at what came out.

// 12. Ask for the element by role, then assert its text.
// getByRole('heading', { level: 2 }) is the <h2>. Replace CHANGE ME with what the
// heading actually says. Run the drill first and read the failure before you fix it.
test('12. the heading says Pantry', () => {
  render(<ProductHeading />);
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('CHANGE ME');
});

// 13. One component, two different props, two different results. The render call is
// done; write the two assertions. Grab the h3 with getByRole('heading', { level: 3 })
// and the badge with screen.getByText(...). Say what Rice + expired={true} produces.
test('13. a product shows its name and its freshness', () => {
  render(<Product name="Rice" expired={true} />);
  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('CHANGE ME');
  expect(screen.getByText('CHANGE ME')).toBeInTheDocument();
});

// 14. Now the other half: the assertion is written and correct, but nothing has
// happened yet. Add the missing action. user.click() is asynchronous — every call
// needs await, or the assertion runs before React has re-rendered.
//
//     await user.click(screen.getByRole('button'));
//
test('14. clicking twice shows Added 2', async () => {
  const user = userEvent.setup();
  render(<AddButton />);
  // YOUR TURN: click the button twice.
  expect(screen.getByRole('button')).toHaveTextContent('Added 2');
});

// 15. Same shape, with typing. getByLabelText('Product name') finds the input through
// its <label> — the htmlFor/id pair from drill 10. Clear the field first, because
// user.type() appends to whatever is already there.
//
//     await user.clear(field);
//     await user.type(field, 'Oats');
//
test('15. typing a new name updates the paragraph', async () => {
  const user = userEvent.setup();
  render(<ProductNameField />);
  const field = screen.getByLabelText('Product name');
  // YOUR TURN: clear the field, then type Oats.
  expect(field).toHaveValue('Oats');
  expect(screen.getByText('Shopping for: Oats')).toBeInTheDocument();
});
