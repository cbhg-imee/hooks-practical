import { useState } from 'react';
import { stats } from '../stats.js';

// Reads the counters inside an event handler (never during render).
export default function StatsPanel({ unrelated, onBump }) {
  const [snapshot, setSnapshot] = useState({ filterRuns: 0, listRenders: 0 });
  return (
    <section className="panel panel--recessed" aria-labelledby="stats-h">
      <h2 id="stats-h"><span className="led led--blue" aria-hidden="true" /> Memoization evidence</h2>
      <div className="grid-2">
        <div>
          <div className="lcd-caption">Unrelated counter</div>
          <div className="lcd lcd--sm lcd--amber">{unrelated}</div>
          <button className="btn btn--amber btn--small" style={{ marginTop: 10 }} onClick={onBump}>Bump counter</button>
        </div>
        <div>
          <div className="lcd-caption">filter runs / list renders</div>
          <div className="lcd lcd--sm">{snapshot.filterRuns} / {snapshot.listRenders}</div>
          <button className="btn btn--small" style={{ marginTop: 10 }} onClick={() => setSnapshot({ ...stats })}>Read counters</button>
        </div>
      </div>
      <p className="note" style={{ marginTop: 12 }}>
        Bump the counter several times, then read the counters. They do not change, and the console stays quiet.
      </p>
    </section>
  );
}
