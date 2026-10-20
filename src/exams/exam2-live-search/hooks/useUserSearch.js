import { useEffect, useState } from 'react';
import { USERS } from '../data.js';

const DELAY_MS = 400;

function filterUsers(query) {
  const q = query.trim().toLowerCase();
  if (!q) return USERS;
  return USERS.filter((u) => u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q));
}

// Simulates a search request with a delay. Each new query cancels the previous one.
export function useUserSearch(query) {
  const [results, setResults] = useState(USERS);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setSearching(true);
    const id = setTimeout(() => {
      setResults(filterUsers(query));
      setSearching(false);
    }, DELAY_MS);

    // cleanup: runs before the next effect and on unmount, cancelling the outdated request
    return () => clearTimeout(id);
  }, [query]); // depends only on the input, NOT on results/searching, so there is no loop

  return { results, searching };
}
