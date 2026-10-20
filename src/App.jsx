import { useState } from 'react';
import Exam1 from './exams/exam1-task-counter/App.jsx';
import Exam2 from './exams/exam2-live-search/App.jsx';
import Exam3 from './exams/exam3-accessible-form/App.jsx';
import Exam4 from './exams/exam4-preferences/App.jsx';
import Exam5 from './exams/exam5-product-explorer/App.jsx';
import Exam6 from './exams/exam6-issue-tracker/App.jsx';

const EXAMS = [
  { id: 1, label: 'Task Counter', hook: 'useState', Component: Exam1 },
  { id: 2, label: 'Live Search', hook: 'useEffect', Component: Exam2 },
  { id: 3, label: 'Form Toolkit', hook: 'useRef', Component: Exam3 },
  { id: 4, label: 'Preferences', hook: 'useContext', Component: Exam4 },
  { id: 5, label: 'Product Explorer', hook: 'useMemo', Component: Exam5 },
  { id: 6, label: 'Issue Tracker', hook: 'useReducer', Component: Exam6 },
];

export default function App() {
  const [active, setActive] = useState(1);
  const current = EXAMS.find((e) => e.id === active);
  const Active = current.Component;

  return (
    <>
      <nav className="shell" style={{ paddingBottom: 0 }} aria-label="Exams">
        <div className="plate" style={{ marginBottom: 0 }}>
          <div>
            <h1>Hooks Practical</h1>
            <small>Six exams / one control panel</small>
          </div>
          <div className="row" role="tablist" aria-label="Select exam">
            {EXAMS.map((e) => (
              <button
                key={e.id}
                role="tab"
                aria-selected={active === e.id}
                aria-pressed={active === e.id}
                className="btn btn--small btn--blue"
                onClick={() => setActive(e.id)}
                title={e.hook}
              >
                {e.id}. {e.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      {/* Only the selected exam is mounted, so leaving a tab unmounts it (timers and effects clean up). */}
      <Active key={active} />
    </>
  );
}
