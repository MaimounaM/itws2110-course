// Worked answers for drills 12–15. Compare after you have your own version failing
// or passing — reading this first skips the part that teaches you something.
//
//     npm run test:unit:answers
//
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductHeading, Product, AddButton, ProductNameField } from '../pantry.jsx';

test('12. the heading says Pantry', () => {
  render(<ProductHeading />);
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Pantry');
});

test('13. a product shows its name and its freshness', () => {
  render(<Product name="Rice" expired={true} />);
  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Rice');
  expect(screen.getByText('Expired')).toBeInTheDocument();
});

test('14. clicking twice shows Added 2', async () => {
  const user = userEvent.setup();
  render(<AddButton />);
  await user.click(screen.getByRole('button'));
  await user.click(screen.getByRole('button'));
  expect(screen.getByRole('button')).toHaveTextContent('Added 2');
});

test('15. typing a new name updates the paragraph', async () => {
  const user = userEvent.setup();
  render(<ProductNameField />);
  const field = screen.getByLabelText('Product name');
  await user.clear(field);
  await user.type(field, 'Oats');
  expect(field).toHaveValue('Oats');
  expect(screen.getByText('Shopping for: Oats')).toBeInTheDocument();
});
