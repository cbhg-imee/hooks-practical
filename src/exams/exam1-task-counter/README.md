# Exam 1 - Smart Task Counter (useState)

## Run
```bash
npm install
npm run dev
```

## Completed requirements
| Requirement | Status | Where |
|---|---|---|
| `count` and `target` state with valid initial values (0 and 5) | Done | `src/App.jsx` |
| Increment, Decrement, Reset; count never negative; reset returns to 0 | Done | `App.jsx`, `Controls.jsx` |
| Plus two using two queued functional updates | Done | `addTwo` in `App.jsx` |
| Not started / In progress / Target reached derived from state | Done | `src/status.js`, no status state |
| Increment and plus two disabled at target | Done | `Controls.jsx` |
| Debugging case: `addTwo` repaired with functional updates | Done | `addTwo` in `App.jsx` (explanation below) |

## How it works
- Only `count` and `target` are state. `getStatus(count, target)` runs on every render, so status can never go out of sync.
- Decrement is clamped with `Math.max(c - 1, 0)` so count never goes negative.
- Plus two always adds exactly two, as the rubric states. Increment and Plus two disable once `count >= target`.

## Required debugging case
```js
// Broken
const addTwo = () => { setCount(count + 1); setCount(count + 1); };
// Fixed
const addTwo = () => { setCount(c => c + 1); setCount(c => c + 1); };
```
Each render has its own snapshot of state. During one click handler `count` is a constant (for example 0), so `count + 1` evaluates to 1 both times and React queues "set to 1" twice. A functional updater is not a value but a function; React runs the queued updaters in order and passes each the latest result (0 -> 1 -> 2).

## Test steps (validation cases)
1. Target 5, count 0: LCD shows 000 / 005, status "Not started", Decrement disabled.
2. Press Plus two three times: 2, 4, 6. Status becomes "Target reached" and Increment and Plus two disable.
3. Count 4 then Plus two: count becomes exactly 6 (+2), status "Target reached", both buttons disabled.
4. Count 0 then Decrement: nothing happens (button disabled, count stays 0).
5. Reach the target, press Reset: count 0, status "Not started", buttons enabled again.

## Known limitations
- Target is limited to 1-99. Typing an empty value is ignored instead of clearing the box.
- Plus two can pass the target (4 -> 6) because the rubric requires exactly +2 per click. The meter caps at 100%.
