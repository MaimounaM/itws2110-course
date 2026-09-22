# Micro-installation, expanded: build a tiny app yourself

[← Workshop](README.md)

This is an optional instructor demonstration or follow-along. The supplied workshop
already contains this setup. **Create the following app in a separate folder**; do
not run the generator over the workshop or your homework. Pause after each checkpoint.

## 1. React + Vite, before styling

Install Node LTS (22.12 or newer for this workshop). In a terminal, move to the
parent folder where you want this new practice app, then run:

```bash
npm create vite@latest react-micro -- --template react
cd react-micro
npm install
```

Choose JavaScript/React if the generator asks. Decline optional experimental features.
`npm` manages packages; `react-micro` is your new folder; `--template react` selects
React with JavaScript, not TypeScript. Generator defaults can change; the provided
workshop and its lockfile are the reproducible alternative.

Replace all of `src/App.jsx` with:

```jsx
export default function App() {
  return <h1>Hello, React!</h1>;
}
```

Empty `src/index.css` to remove the template's demo styling. Keep its import in
`src/main.jsx`. The default `App.css` can remain on disk; our new App no longer imports it.

```bash
npm run dev
```

**Checkpoint:** open the Local URL. One unstyled heading appears. Change Hello to
Welcome and save. It updates. Stop the server with Ctrl+C before the next install.

Read `index.html` and `src/main.jsx`: the root div and `createRoot(...).render(...)`
are the same connection as the first HTML micro-example. The template may wrap the
app in `StrictMode`, which runs extra development checks; it is not another page.

## 2. Add Tailwind, one visible class

```bash
npm install tailwindcss @tailwindcss/vite
```

Replace `vite.config.js` with:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Replace `src/index.css` with:

```css
@import "tailwindcss";
```

In `App.jsx`, change only the heading:

```jsx
<h1 className="p-6 text-3xl font-bold text-teal-800">Hello, React!</h1>
```

```bash
npm run dev
```

**Checkpoint:** the heading is large, bold, teal, and padded. If not, check the CSS
import and both Vite plugins. Stop the server again. This uses the Tailwind 4 Vite
plugin; do not add an older tutorial's `tailwindcss init -p` step or `@tailwind` directives.

## 3. Prepare a short path for component imports

The alias `@` will mean `src`. Vite needs it when building; the editor needs it for
navigation and completion. These are two configurations for the same path.

Replace `vite.config.js` with:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
});
```

Create `jsconfig.json` beside `package.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

**Checkpoint:** `npm run build` still succeeds. No component library yet; just an alias.

## 4. Add shadcn/ui, then inspect what arrived

These are the CLI version and options used to generate this workshop's components:

```bash
npx shadcn@4.21.0 init --template vite --preset nova --base radix --no-monorepo --yes
npx shadcn@4.21.0 add button card input --yes
```

Run them **inside `react-micro`**, where its `package.json` is. They require internet.
The CLI adds component source, dependencies, theme CSS, and `components.json`.
Check that `components.json` has `"tsx": false` for this JavaScript project.
The theme preset is recorded as `radix-nova`; the init flag uses `--preset nova`.
The initialization may already create Button; if asked about overwriting an existing
unchanged Button, keeping it is fine. The supplied workshop's generated files are
available if the registry cannot be reached in class.

**Checkpoint:** find `src/components/ui/button.jsx`, `card.jsx`, and `input.jsx`.
Do not replace the generated CSS with the one-line Tailwind import now: the new
components use the theme variables it added.

Replace `src/App.jsx` with this deliberately tiny integration:

```jsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function App() {
  const [count, setCount] = useState(0);
  return <main className="mx-auto max-w-sm p-6">
    <Card>
      <CardHeader><CardTitle>Apples</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <p>Quantity: {count}</p>
        <Button onClick={() => setCount(c => c + 1)}>Add one</Button>
      </CardContent>
    </Card>
  </main>;
}
```

```bash
npm run dev
```

**Checkpoint:** a styled card appears and Add one changes the quantity. The state
code did not become shadcn-specific. Stop the server and run `npm run build` to
check that the app also builds.

Return to the supplied workshop's drill 11 for the controlled Input and the
student-owned `PantryCard` component. Do not copy this whole new app into the workshop.

References: [Vite](https://vite.dev/guide/),
[Tailwind's Vite integration](https://tailwindcss.com/docs/installation/using-vite),
[shadcn/ui's Vite integration](https://ui.shadcn.com/docs/installation/vite), and
[JavaScript support](https://ui.shadcn.com/docs/javascript).
