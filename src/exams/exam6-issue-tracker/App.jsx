import { usePersistentReducer } from './hooks/usePersistentReducer.js';
import { issueReducer, initialState, getVisibleIssues, getCounts } from './reducer.js';
import IssueForm from './components/IssueForm.jsx';
import FilterBar from './components/FilterBar.jsx';
import IssueList from './components/IssueList.jsx';

export default function App() {
  const [state, dispatch] = usePersistentReducer(issueReducer, initialState, 'exam6-issue-tracker');
  const counts = getCounts(state);
  const visible = getVisibleIssues(state);

  return (
    <main className="shell">
      <header className="plate">
        <div>
          <h1>Issue Tracker</h1>
          <small>Exam 6 / useReducer + custom hook</small>
        </div>
        <span className="status">
          <span className={`led ${counts.open ? 'led--amber' : 'led--green'}`} aria-hidden="true" />
          {counts.open} open
        </span>
      </header>

      <div className="stack">
        <section className="panel" aria-labelledby="add-h">
          <h2 id="add-h">Report</h2>
          <IssueForm dispatch={dispatch} />
        </section>

        <section className="panel" aria-labelledby="list-h">
          <h2 id="list-h">Issues</h2>
          <div className="grid-2" style={{ marginBottom: 16 }}>
            <div><div className="lcd-caption">Open</div><div className="lcd lcd--sm lcd--amber">{counts.open}</div></div>
            <div><div className="lcd-caption">Done</div><div className="lcd lcd--sm">{counts.done}</div></div>
          </div>
          <FilterBar filter={state.filter} counts={counts} dispatch={dispatch} />
          <div style={{ marginTop: 16 }}>
            <IssueList issues={visible} filter={state.filter} dispatch={dispatch} />
          </div>
        </section>

      </div>
    </main>
  );
}
