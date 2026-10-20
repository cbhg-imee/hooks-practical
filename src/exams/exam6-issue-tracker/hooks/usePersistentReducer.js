import { useEffect, useReducer } from 'react';

function load(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    // Light shape check so corrupted storage cannot crash the app.
    if (parsed && Array.isArray(parsed.issues) && typeof parsed.nextId === 'number') return parsed;
  } catch {
    /* ignore and fall back */
  }
  return fallback;
}

// useReducer + localStorage. State loads ONCE (lazy initializer) and saves after every change.
export function usePersistentReducer(reducer, initialState, storageKey) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => load(storageKey, initial));

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* storage may be full or blocked; the app still works in memory */
    }
  }, [state, storageKey]);

  return [state, dispatch];
}
