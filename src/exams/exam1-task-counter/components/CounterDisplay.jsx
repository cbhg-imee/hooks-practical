export default function CounterDisplay({ caption, value, tone = 'green' }) {
  const lcdTone = tone === 'off' ? '' : `lcd--${tone}`;
  return (
    <div>
      <div className="lcd-caption">{caption}</div>
      <div className={`lcd ${lcdTone}`} aria-label={`${caption}: ${value}`}>
        {String(value).padStart(3, '0')}
      </div>
    </div>
  );
}
