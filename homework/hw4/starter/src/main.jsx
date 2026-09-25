// Leave this file alone. / is your pantry (Part 2); /?drill=1 is the drills (Part 1).
import { createRoot } from 'react-dom/client';
import Workshop from './Workshop.jsx';
import MyPantry from './MyPantry.jsx';
import './index.css';

const drills = new URLSearchParams(location.search).has('drill');
const tab = active => `rounded px-3 py-1 ${active ? 'bg-teal-800 text-white' : 'underline'}`;

createRoot(document.getElementById('root')).render(<>
  <nav aria-label="Homework 4" className="flex flex-wrap items-center gap-2 border-b px-4 py-2 text-sm sm:px-8">
    <span className="font-semibold text-teal-800">Homework 4</span>
    <a className={tab(!drills)} href="/" aria-current={drills ? undefined : 'page'}>My Pantry</a>
    <a className={tab(drills)} href="/?drill=1" aria-current={drills ? 'page' : undefined}>Drills 1–11</a>
  </nav>
  {drills ? <Workshop /> : <MyPantry />}
</>);
