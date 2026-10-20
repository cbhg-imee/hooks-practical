import { memo } from 'react';
import { stats } from '../stats.js';

// React.memo: re-renders only when items, selectedId or onSelect change by reference.
const ProductList = memo(function ProductList({ items, selectedId, onSelect }) {
  stats.listRenders += 1;
  console.log(`[ProductList] render #${stats.listRenders} (${items.length} items)`);

  if (items.length === 0) return <p className="empty">No products match these filters</p>;

  return (
    <ul className="list" style={{ maxHeight: 420, overflow: 'auto', padding: 6 }}>
      {items.map((p) => (
        <li key={p.id} className={`list-item ${selectedId === p.id ? 'is-active' : ''}`}>
          <div>
            <div className="item-title">{p.name}</div>
            <div className="item-meta">{p.category}</div>
          </div>
          <div className="row">
            <span className="code-chip">${p.price.toFixed(2)}</span>
            <button
              className={`btn btn--small ${selectedId === p.id ? 'btn--green' : 'btn--blue'}`}
              onClick={() => onSelect(p.id)}
              aria-pressed={selectedId === p.id}
            >
              {selectedId === p.id ? 'Selected' : 'Select'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
});

export default ProductList;
