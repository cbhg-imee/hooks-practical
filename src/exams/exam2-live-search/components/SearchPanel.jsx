export default function SearchPanel({ query, onQueryChange, results, searching }) {
  return (
    <section className="panel" aria-labelledby="search-h">
      <h2 id="search-h">
        <span className={`led ${searching ? 'led--amber' : 'led--green'}`} aria-hidden="true" />
        User search / {searching ? 'searching' : 'ready'}
      </h2>
      <div className="field-group">
        <label className="label" htmlFor="q">Name or role</label>
        <input
          id="q"
          className="field"
          type="search"
          placeholder="Try: dev"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      {results.length === 0 && !searching ? (
        <p className="empty">No users match "{query}"</p>
      ) : (
        <ul className="list" aria-busy={searching}>
          {results.map((u) => (
            <li key={u.id} className="list-item">
              <span className="item-title">{u.name}</span>
              <span className="item-meta">{u.role}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
