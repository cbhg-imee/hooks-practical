import { useEffect, useState } from 'react';
import SearchPanel from './components/SearchPanel.jsx';
import SessionTimer from './components/SessionTimer.jsx';
import { useUserSearch } from './hooks/useUserSearch.js';

export default function App() {
  const [query, setQuery] = useState('');
  const [timerVisible, setTimerVisible] = useState(true);
  const { results, searching } = useUserSearch(query);

  // Synchronize the document title with the visible result count.
  useEffect(() => {
    const original = 'React Hooks Practical Exam';
    document.title = `${results.length} ${results.length === 1 ? 'result' : 'results'} - Live Search`;
    return () => { document.title = original; };
  }, [results.length]);

  return (
    <main className="shell">
      <header className="plate">
        <div>
          <h1>Live Search and Timer</h1>
          <small>Exam 2 / useEffect + useState</small>
        </div>
        <span className="status">
          <span className="led led--blue" aria-hidden="true" />
          {results.length} visible
        </span>
      </header>

      <div className="grid-2">
        <SearchPanel query={query} onQueryChange={setQuery} results={results} searching={searching} />
        <section className="panel" aria-labelledby="timer-h">
          <h2 id="timer-h">Session timer</h2>
          {timerVisible ? <SessionTimer /> : <p className="empty">Timer unmounted</p>}
          <div className="row" style={{ marginTop: 18 }}>
            <button className="btn btn--blue" onClick={() => setTimerVisible((v) => !v)} aria-pressed={!timerVisible}>
              {timerVisible ? 'Unmount timer' : 'Mount timer'}
            </button>
          </div>
          <p className="note" style={{ marginTop: 12 }}>
            Mounting again starts a fresh timer at zero. Only one interval ever runs.
          </p>
        </section>
      </div>

    </main>
  );
}
