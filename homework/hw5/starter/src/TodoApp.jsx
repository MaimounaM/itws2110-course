// Homework 5 -- a to-do list. This is the file you build on.
// What's here already works: add a to-do, check it off, delete it. Run `npm run dev`
// and try it before you change anything. The four TODOs are the four graded features,
// and each one is an idea from this week's workshop drills (the README says which).
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Composition (workshop drill 4): Panel shows a title and whatever you put between
// its tags. It doesn't know what a to-do is. Use it for your Details panel.
function Panel({ title, children }) {
  return <section className="space-y-3 rounded-xl border bg-white p-4">
    <h2 className="text-lg font-bold">{title}</h2>
    {children}
  </section>;
}

function TodoItem({ todo, onToggle, onDelete }) {
  return <li className="flex items-center gap-3 rounded bg-slate-100 p-3">
    <label className="flex flex-1 items-center gap-2">
      <input type="checkbox" checked={todo.done} onChange={onToggle} />
      <span className={todo.done ? 'text-slate-500 line-through' : ''}>{todo.title}</span>
    </label>
    {/* TODO 3: a "Details" button that calls an onSelect prop */}
    <Button variant="outline" onClick={onDelete}>Delete</Button>
  </li>;
}

// TODO 4: a TitleEditor component. It gets the selected to-do and an onSave prop, and
// keeps its OWN draft of the title in state -- typing must not change the list until
// "Save" is pressed. A text field labelled "Title" and a "Save" button.

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 'r', title: 'Buy rice', done: false },
    { id: 'b', title: 'Soak beans', done: true },
    { id: 'a', title: 'Wash apples', done: false },
  ]);
  const [newTitle, setNewTitle] = useState('');

  function addTodo(event) {
    event.preventDefault();
    if (!newTitle.trim()) return;
    setTodos(prev => [...prev, { id: crypto.randomUUID(), title: newTitle.trim(), done: false }]);
    setNewTitle('');
  }
  function toggle(id) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }
  function remove(id) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  // TODO 1: remaining -- how many to-dos are not done. Computed here from todos. Not useState.

  // TODO 2: ONE piece of state, filter, that is 'all', 'active' or 'done' -- and the list
  //         to show, computed from todos and filter. Don't store the filtered list.

  // TODO 3: which to-do is selected. Store its id, not the to-do itself, and look the
  //         to-do up in todos on every render.

  // TODO 4: rename(id, title) -- same shape as toggle. Your TitleEditor calls it on Save.

  return <main className="mx-auto max-w-3xl space-y-6 p-4 sm:p-8">
    <h1 className="text-3xl font-bold">To-do list</h1>
    {/* TODO 1: <p>Remaining: N</p> */}

    <Panel title="Add a to-do">
      <form onSubmit={addTodo} className="flex items-end gap-2">
        <div className="flex-1 space-y-1">
          <label htmlFor="new-todo" className="block text-sm">New to-do</label>
          <Input id="new-todo" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
        </div>
        <Button type="submit">Add</Button>
      </form>
    </Panel>

    {/* TODO 2: three buttons -- All, Active, Done. The current one gets aria-pressed={true}. */}

    <ul className="space-y-2">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo}
          onToggle={() => toggle(todo.id)} onDelete={() => remove(todo.id)} />
      ))}
    </ul>

    {/* TODO 3 and 4: <Panel title="Details"> ... </Panel>
        Nothing selected:  <p>Nothing selected.</p>
        Something selected: <p>Selected: Buy rice</p> <p>Status: active</p> (or "done"),
                            and your TitleEditor. */}
  </main>;
}
