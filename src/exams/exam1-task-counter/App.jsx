import { useState } from 'react';
import CounterDisplay from './components/CounterDisplay.jsx';
import Controls from './components/Controls.jsx';
import TargetInput from './components/TargetInput.jsx';
import { getStatus } from './status.js';

const INITIAL_COUNT = 0;
const INITIAL_TARGET = 5;

export default function App() {
  // The only two pieces of state. Status is DERIVED below, never stored.
  const [count, setCount] = useState(INITIAL_COUNT);
  const [target, setTarget] = useState(INITIAL_TARGET);

  const status = getStatus(count, target);
  const atTarget = count >= target;

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => Math.max(c - 1, 0));
  const reset = () => setCount(0);

  // Two queued functional updates: each receives the result of the previous one.
  const addTwo = () => {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  };

  const changeTarget = (next) => setTarget(next);

  return (
    <main className="shell shell--narrow">
      <header className="plate">
        <div>
          <h1>Task Counter</h1>
          <small>Study session / Exam 1 / useState</small>
        </div>
        <span className="status" role="status" aria-live="polite">
          <span className={`led led--${status.tone}`} aria-hidden="true" />
          {status.label}
        </span>
      </header>

      <div className="stack">
        <section className="panel" aria-labelledby="readout">
          <h2 id="readout">Session readout</h2>
          <div className="grid-2">
            <CounterDisplay caption="Completed" value={count} tone={status.tone} />
            <CounterDisplay caption="Target" value={target} tone="blue" />
          </div>
          <div className="meter" style={{ marginTop: 18 }} aria-hidden="true">
            <span className={atTarget ? 'done' : ''} style={{ width: `${Math.min(100, (count / target) * 100)}%` }} />
          </div>
        </section>

        <section className="panel" aria-labelledby="controls">
          <h2 id="controls">Controls</h2>
          <Controls
            onIncrement={increment}
            onDecrement={decrement}
            onAddTwo={addTwo}
            onReset={reset}
            incrementDisabled={atTarget}
            decrementDisabled={count === 0}
          />
          <div style={{ marginTop: 20 }}>
            <TargetInput target={target} onChange={changeTarget} />
          </div>
        </section>

      </div>
    </main>
  );
}
