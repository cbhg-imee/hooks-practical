# Exam 5 - Product Explorer Performance Repair (useMemo + useCallback)

## Run
```bash
npm install
npm run dev
```
Open the browser console to see the evidence.

## Completed requirements
| Requirement | Status | Where |
|---|---|---|
| 600 generated products, text search, category, price sorting | Done | `data.js`, `Filters.jsx` |
| Memoized filtered and sorted list | Done | `hooks/useVisibleProducts.js` |
| Memoized selection callback | Done | `handleSelect` in `App.jsx` |
| `ProductList` wrapped in `React.memo` | Done | `components/ProductList.jsx` |
| Unrelated counter does not rerender the list | Done | `StatsPanel.jsx` |
| Complete dependency arrays | Done | see hook, callback and effect |
| Memoization-unnecessary example | Below | |

## Debugging cases
**12. Missing query dependency in useMemo.** A memo with `[products, category, sortOrder]` but reading `query` keeps showing the previous results. Fix: `[products, query, category, sortOrder]`.

**13. Missing value in useCallback.** `handleSelect` reads `products` to find the selected item. With `[]` it would use the first-render array forever if `products` ever changed. Fix: list `products` (stable here, so the callback is stable too).

**14. Analytics inside useMemo.** useMemo must be a pure calculation; React may rerun or discard it. The analytics call now lives in `useEffect` with dependencies `[query, category, sortOrder, visible.length]`.

## How to verify memoization
1. Open the console. Type a search: you see one `[useMemo]` line and one `[ProductList] render`.
2. Press "Bump counter" ten times: the counter changes, but the console prints nothing.
3. Press "Read counters": filter runs and list renders are unchanged.
4. Select a product: ProductList renders once (selected state is a real prop change).

## When memoization is unnecessary
Filtering a list of five items, or computing `count * 2` for display, is cheaper than the work of comparing dependencies and storing the cached value. Memoizing there adds code and memory with no measurable gain. Memoize when the calculation is clearly expensive or when a stable reference is needed by a memoized child or another hook dependency.

## Known limitations
- All filtered products render in one scrollable list (no virtualization).
- StrictMode is removed on purpose in `main.jsx`; it double-invokes renders in development and would double the console counts.
