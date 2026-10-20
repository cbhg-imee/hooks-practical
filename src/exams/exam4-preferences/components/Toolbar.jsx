import { usePreferences } from '../context/usePreferences.js';

export default function Toolbar() {
  const { theme, toggleTheme } = usePreferences();
  return (
    <div className="row row--between">
      <span className="status">
        <span className={`led ${theme === 'dark' ? 'led--blue' : 'led--amber'}`} aria-hidden="true" />
        Theme: {theme}
      </span>
      <button className="btn btn--blue" onClick={toggleTheme} aria-pressed={theme === 'dark'}>
        {theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
      </button>
    </div>
  );
}
