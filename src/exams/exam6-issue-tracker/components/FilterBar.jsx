import { FILTERS } from '../reducer.js';

export default function FilterBar({ filter, counts, dispatch }) {
  return (
    <div className="row" role="group" aria-label="Filter issues">
      {FILTERS.map((f) => (
        <button
          key={f}
          className="btn btn--blue"
          aria-pressed={filter === f}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: f } })}
        >
          {f} ({counts[f]})
        </button>
      ))}
      <button className="btn btn--red" onClick={() => dispatch({ type: 'CLEAR_DONE' })} disabled={counts.done === 0}>
        Clear done
      </button>
    </div>
  );
}
