export default function TargetInput({ target, onChange }) {
  const handle = (e) => {
    const n = Number.parseInt(e.target.value, 10);
    if (Number.isNaN(n)) return; // ignore empty / invalid typing
    onChange(Math.min(99, Math.max(1, n)));
  };
  return (
    <div className="field-group" style={{ maxWidth: 220 }}>
      <label className="label" htmlFor="target">Target tasks (1-99)</label>
      <input id="target" className="field" type="number" min="1" max="99" value={target} onChange={handle} />
    </div>
  );
}
