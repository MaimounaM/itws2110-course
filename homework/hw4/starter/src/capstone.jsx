// Drill 11 -- put the pieces together.
//
// Nothing here is new. You've done every part of it separately:
//   props (drill 4), state (drill 7), a parent that owns state and passes a
//   callback down (drill 9), and a controlled input (drill 10).
// This drill combines them, using ready-made components instead of plain
// <div>, <input> and <button>.
//
// WHAT THE IMPORTS ARE
// shadcn/ui isn't a library you call from the internet. Its source files were
// copied into this project: open src/components/ui/card.jsx and look. `@/` is
// a shortcut for `src/` (set up in vite.config.js), so
//   '@/components/ui/card'  is the file  src/components/ui/card.jsx
// Card, CardHeader, CardTitle, CardContent and CardFooter are each just a <div>
// with Tailwind classes already on it. They show whatever you put between their
// tags -- a Card doesn't know what a pantry is. Button and Input wrap a real
// <button> and <input> and pass your props straight through, so onClick,
// value and onChange work exactly as they did in drills 7-10.
//
// HOW THIS FILE FITS TOGETHER
//   Drill11          owns the state: name and count
//   ├── <Input>      shows name; typing should change it          (TODO 2)
//   └── PantryCard   receives name, count and onAdd as props
//       └── Card
//           ├── CardHeader > CardTitle   the product name
//           ├── CardContent              Quantity: {count}
//           └── CardFooter > Button      "Add one" -- should call onAdd   (TODO 1)
//
// Done when: change Apples to Rice, click Add one twice, and the card says
// Rice and Quantity: 2.
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

// Your component combines shadcn/ui components with ordinary React props.
function PantryCard({ name, count, onAdd }) {
  return <Card>
    <CardHeader><CardTitle>{name}</CardTitle></CardHeader>
    <CardContent><p>Quantity: {count}</p></CardContent>
    <CardFooter>
      {/* YOUR TURN (TODO 1): pass onAdd as this Button's onClick prop -- drill 9's idea. */}
      <Button variant="secondary">Add one</Button>
    </CardFooter>
  </Card>;
}

export function Drill11() {
  const [name, setName] = useState('Apples');
  const [count, setCount] = useState(0);
  return <div className="grid gap-4 md:grid-cols-2">
    <div className="space-y-2">
      <label htmlFor="pantry-name">Product name</label>
      {/* YOUR TURN (TODO 2): connect value and onChange just like drill 10,
          and remove defaultValue -- an input takes one or the other, not both. */}
      <Input id="pantry-name" defaultValue="Apples" />
    </div>
    <PantryCard name={name} count={count} onAdd={() => setCount(c => c + 1)} />
  </div>;
}
