import { useMemo } from 'react';
import { stats } from '../stats.js';

// The expensive calculation. It reruns ONLY when one of its true inputs changes.
export function useVisibleProducts(products, query, category, sortOrder) {
  return useMemo(() => {
    stats.filterRuns += 1;
    console.log(`[useMemo] filtering ${products.length} products (run #${stats.filterRuns})`);

    const q = query.trim().toLowerCase();
    const filtered = products.filter(
      (p) => (category === 'All' || p.category === category) && (!q || p.name.toLowerCase().includes(q))
    );
    if (sortOrder === 'asc') return [...filtered].sort((a, b) => a.price - b.price);
    if (sortOrder === 'desc') return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [products, query, category, sortOrder]); // complete: every value read inside is listed
}
