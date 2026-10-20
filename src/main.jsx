import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// StrictMode is omitted on purpose: it double-invokes renders in development, which would
// double the console counts that Exam 5 uses as memoization evidence.
createRoot(document.getElementById('root')).render(<App />);
