// Leave this file alone. It puts your TodoApp on the page.
import { createRoot } from 'react-dom/client';
import TodoApp from './TodoApp.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(<TodoApp />);
