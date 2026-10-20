import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm.jsx';
import SubmissionLog from './components/SubmissionLog.jsx';

export default function App() {
  const [submission, setSubmission] = useState(null);
  const [count, setCount] = useState(0);

  const handleSuccess = (data) => {
    setSubmission(data);
    setCount((c) => c + 1);
  };

  return (
    <main className="shell">
      <header className="plate">
        <div>
          <h1>Accessible Form Toolkit</h1>
          <small>Exam 3 / useRef + useState</small>
        </div>
        <span className="status">
          <span className={`led ${count ? 'led--green' : 'led--off'}`} aria-hidden="true" />
          {count} registered
        </span>
      </header>
      <div className="grid-2">
        <RegistrationForm onSuccess={handleSuccess} />
        <div className="stack">
          <SubmissionLog submission={submission} count={count} />
        </div>
      </div>
    </main>
  );
}
