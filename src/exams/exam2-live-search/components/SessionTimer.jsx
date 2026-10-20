import { useSessionTimer } from '../hooks/useSessionTimer.js';

function format(total) {
  const m = String(Math.floor(total / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export default function SessionTimer() {
  const seconds = useSessionTimer();
  return (
    <div>
      <div className="lcd-caption">Elapsed seconds: {seconds}</div>
      <div className="lcd lcd--blue" aria-label={`Elapsed time ${format(seconds)}`}>{format(seconds)}</div>
    </div>
  );
}
