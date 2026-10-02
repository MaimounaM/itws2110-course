// Homework 5, Part 2 -- your own tests. Run them in a terminal:
//
//     npm run test:unit          once
//     npm run test:unit:watch    re-runs on every save
//
// Same tools as workshop drills 5-8: render() puts your component in a DOM, screen
// finds things the way a person would, user.click / user.type act, expect asserts.
import { test, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoApp from './TodoApp.jsx';

// An example, already passing. Leave it here; yours go below it.
// Each to-do's checkbox is named by its title, because the title is inside its <label>.
test('example: the three starting to-dos are listed', () => {
  render(<TodoApp />);
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
  expect(screen.getByRole('checkbox', { name: 'Soak beans' })).toBeChecked();
  expect(screen.getByRole('checkbox', { name: 'Buy rice' })).not.toBeChecked();
});

// Handy: to click a button inside one particular to-do, find its row first.
//
//     const row = screen.getByText('Buy rice').closest('li');
//     await user.click(within(row).getByRole('button', { name: 'Details' }));

// YOUR TEST 1 -- a feature you built in Part 1. Render, act (await!), assert.
// test('...', async () => {
//   const user = userEvent.setup();
//   render(<TodoApp />);
//   ...
// });

// YOUR TEST 2 -- a different feature.
