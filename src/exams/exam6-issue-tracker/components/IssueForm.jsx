import { useState } from 'react';

export default function IssueForm({ dispatch }) {
  const [title, setTitle] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch({ type: 'ADD_ISSUE', payload: { title } });
    setTitle('');
  };
  return (
    <form className="row" onSubmit={submit} style={{ alignItems: 'flex-end' }}>
      <div style={{ flex: '1 1 220px' }}>
        <label className="label" htmlFor="title">New issue</label>
        <input id="title" className="field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Describe the issue" />
      </div>
      <button className="btn btn--green" type="submit" disabled={!title.trim()}>Add issue</button>
    </form>
  );
}
