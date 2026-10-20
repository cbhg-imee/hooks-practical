import { CATEGORIES } from '../data.js';

export default function Filters({ query, onQuery, category, onCategory, sortOrder, onSort }) {
  return (
    <div className="grid-2">
      <div className="field-group">
        <label className="label" htmlFor="q">Search</label>
        <input id="q" className="field" type="search" value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Try: relay" />
      </div>
      <div className="field-group">
        <label className="label" htmlFor="cat">Category</label>
        <select id="cat" className="field" value={category} onChange={(e) => onCategory(e.target.value)}>
          <option>All</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="field-group">
        <label className="label" htmlFor="sort">Price order</label>
        <select id="sort" className="field" value={sortOrder} onChange={(e) => onSort(e.target.value)}>
          <option value="none">Default</option>
          <option value="asc">Low to high</option>
          <option value="desc">High to low</option>
        </select>
      </div>
    </div>
  );
}
