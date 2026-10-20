import { useEffect, useState } from 'react';

// Counts elapsed seconds. The interval is created on mount and cleared on unmount.
export function useSessionTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // Functional update: never reads the stale `seconds` captured at mount.
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(id); // cleanup: no duplicate timers after unmount/remount
  }, []);

  return seconds;
}
