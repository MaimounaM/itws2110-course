// Drill 11. These are real shadcn/ui files, already included in this project.
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
      {/* YOUR TURN: pass onAdd as this Button's onClick prop. */}
      <Button variant="secondary" onClick={onAdd}>Add one</Button>
    </CardFooter>
  </Card>;
}

export function Drill11() {
  const [name, setName] = useState('Apples');
  const [count, setCount] = useState(0);
  return <div className="grid gap-4 md:grid-cols-2">
    <div className="space-y-2">
      <label htmlFor="pantry-name">Product name</label>
      {/* YOUR TURN: connect value and onChange just like drill 10. */}
      <Input id="pantry-name" value={name} onChange={e => setName(e.target.value)} />
    </div>
    <PantryCard name={name} count={count} onAdd={() => setCount(c => c + 1)} />
  </div>;
}
