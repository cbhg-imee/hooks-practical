# Exam 6 - Issue Tracker State Engine (useReducer + custom Hook)

## Run
```bash
npm install
npm run dev
npm test      # reducer tests
```

## Completed requirements
| Requirement | Status | Where |
|---|---|---|
| State shape `{ issues, filter, nextId }` | Done | `src/reducer.js` |
| ADD_ISSUE, TOGGLE_ISSUE, DELETE_ISSUE, SET_FILTER, CLEAR_DONE | Done | `issueReducer` |
| Pure, immutable reducer | Done | spread and map/filter only |
| Unknown action returns existing state | Done | `default` branch |
| `usePersistentReducer` with localStorage | Done | `hooks/usePersistentReducer.js` |
| All / Open / Done views with accurate counts | Done | `FilterBar.jsx`, `getCounts` |
| Three reducer tests (add, toggle, clear done) plus unknown action | Done | `reducer.test.js` |

## Debugging cases
**15. Direct mutation.** `issue.done = !issue.done; return state;` keeps the same references, so React may skip the render and previous state is corrupted. Fix: return a new state object and new issue objects where changes occur.

**16. Mismatched action shape.** The reducer reads `action.payload.id` but `dispatch({ type, id })` sends `action.id`, giving `undefined`. Fix: dispatch `{ type: 'TOGGLE_ISSUE', payload: { id } }`.

**17. Default returns undefined.** A `default: break;` makes the reducer return `undefined`, so state vanishes and the next read throws. Fix: `default: return state;`.

## Test steps
1. Add three issues. IDs are 1, 2, 3 and the open count is 3.
2. Mark one Done: counts update to Open 2 / Done 1. Use the All / Open / Done buttons to confirm the views.
3. Click "Clear done": the completed issue disappears.
4. Reload the page: the issues and filter are restored from localStorage.
5. Run `npm test`: 4 tests pass.

## Known limitations
- Empty titles are ignored by the reducer (state unchanged).
- Corrupted or blocked localStorage falls back to an empty tracker.
