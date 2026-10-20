import { useCallback, useEffect, useMemo, useState } from 'react';
import { generateProducts } from './data.js';
import { useVisibleProducts } from './hooks/useVisibleProducts.js';
import ProductList from './components/ProductList.jsx';
import Filters from './components/Filters.jsx';
import StatsPanel from './components/StatsPanel.jsx';

export default function App() {
  const products = useMemo(() => generateProducts(600), []);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('none');
  const [selectedId, setSelectedId] = useState(null);
  const [unrelated, setUnrelated] = useState(0);

  const visible = useVisibleProducts(products, query, category, sortOrder);

  // Stable callback: depends on `products` (read inside) which itself never changes.
  const handleSelect = useCallback(
    (id) => {
      const product = products.find((p) => p.id === id);
      console.log(`[select] ${product ? product.name : id}`);
      setSelectedId((current) => (current === id ? null : id));
    },
    [products]
  );

  // Side effect (analytics) lives in useEffect, NOT inside useMemo.
  useEffect(() => {
    console.info('[analytics] filters changed', { query, category, sortOrder, results: visible.length });
  }, [query, category, sortOrder, visible.length]);

  const selected = selectedId ? products.find((p) => p.id === selectedId) : null;

  return (
    <main className="shell">
      <header className="plate">
        <div>
          <h1>Product Explorer</h1>
          <small>Exam 5 / useMemo + useCallback</small>
        </div>
        <span className="status">
          <span className="led led--green" aria-hidden="true" />
          {visible.length} of {products.length}
        </span>
      </header>

      <div className="stack">
        <section className="panel" aria-labelledby="f-h">
          <h2 id="f-h">Filters</h2>
          <Filters
            query={query} onQuery={setQuery}
            category={category} onCategory={setCategory}
            sortOrder={sortOrder} onSort={setSortOrder}
          />
        </section>

        <section className="panel" aria-labelledby="l-h">
          <h2 id="l-h">Products</h2>
          <div className="lcd-caption">Selected</div>
          <div className="lcd lcd--sm lcd--blue" style={{ marginBottom: 14, fontSize: '0.95rem' }}>
            {selected ? `${selected.name} / $${selected.price.toFixed(2)}` : 'NONE'}
          </div>
          <ProductList items={visible} selectedId={selectedId} onSelect={handleSelect} />
        </section>

        <StatsPanel unrelated={unrelated} onBump={() => setUnrelated((n) => n + 1)} />
      </div>
    </main>
  );
}
