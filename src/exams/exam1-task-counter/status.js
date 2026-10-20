// Pure function: status is computed from current state on every render.
export function getStatus(count, target) {
  if (count >= target) return { label: 'Target reached', tone: 'green' };
  if (count === 0) return { label: 'Not started', tone: 'off' };
  return { label: 'In progress', tone: 'amber' };
}
