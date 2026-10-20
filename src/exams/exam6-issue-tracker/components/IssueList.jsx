export default function IssueList({ issues, filter, dispatch }) {
  if (issues.length === 0) {
    return <p className="empty">{filter === 'all' ? 'No issues yet. Add one above.' : `No ${filter} issues`}</p>;
  }
  return (
    <ul className="list">
      {issues.map((issue) => (
        <li key={issue.id} className={`list-item ${issue.done ? 'is-done' : ''}`}>
          <div className="row">
            <span className={`led ${issue.done ? 'led--green' : 'led--amber'}`} aria-hidden="true" />
            <div>
              <div className="item-title">{issue.title}</div>
              <div className="item-meta">#{issue.id} / {issue.done ? 'done' : 'open'}</div>
            </div>
          </div>
          <div className="row">
            <button className="btn btn--green btn--small" onClick={() => dispatch({ type: 'TOGGLE_ISSUE', payload: { id: issue.id } })}>
              {issue.done ? 'Reopen' : 'Done'}
            </button>
            <button className="btn btn--red btn--small" onClick={() => dispatch({ type: 'DELETE_ISSUE', payload: { id: issue.id } })}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
