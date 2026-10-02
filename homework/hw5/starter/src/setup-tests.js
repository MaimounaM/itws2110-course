// Leave this file alone. It runs before your tests.
import '@testing-library/jest-dom/vitest';   // adds toBeInTheDocument, toHaveValue, toBeChecked, ...
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Every test renders its own TodoApp. Without this, the last test's page would still
// be there, and a query like getByText('Buy rice') would find two of them.
afterEach(cleanup);
