export default function SubmissionLog({ submission, count }) {
  return (
    <section className="panel panel--recessed" aria-labelledby="log-h" aria-live="polite">
      <h2 id="log-h"><span className={`led ${submission ? 'led--green' : 'led--off'}`} aria-hidden="true" /> Submission log</h2>
      <div className="lcd-caption">Successful submissions</div>
      <div className="lcd lcd--sm">{String(count).padStart(2, '0')}</div>
      {submission ? (
        <div className="stack" style={{ marginTop: 14 }}>
          <div>
            <div className="label">Last submitted</div>
            <div className="item-title">{submission.name} / {submission.email}</div>
          </div>
          <div>
            <div className="label">Previous submitted email</div>
            <div className="item-title">{submission.previousEmail || 'None yet'}</div>
          </div>
        </div>
      ) : (
        <p className="empty">No submissions yet</p>
      )}
    </section>
  );
}
