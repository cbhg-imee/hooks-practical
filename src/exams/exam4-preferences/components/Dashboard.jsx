import { useEffect } from 'react';
import { usePreferences } from '../context/usePreferences.js';
import Toolbar from './Toolbar.jsx';
import PreferencesPanel from './PreferencesPanel.jsx';
import ArticlePreview from './ArticlePreview.jsx';

// Dashboard receives NO preference props. It reads the theme from context itself.
export default function Dashboard() {
  const { theme } = usePreferences();

  // Sync the theme to the document so the whole panel restyles together.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Leaving this exam restores the default theme for the other exams.
  useEffect(() => () => { delete document.documentElement.dataset.theme; }, []);

  return (
    <div className="stack">
      <section className="panel">
        <Toolbar />
      </section>
      <div className="grid-2">
        <PreferencesPanel />
        <ArticlePreview />
      </div>
    </div>
  );
}
