# Exam 2 - Live Search and Timer (useEffect)

## Run
```bash
npm install
npm run dev
```

## Completed requirements
| Requirement | Status | Where |
|---|---|---|
| Filter users after query changes with a short effect delay (400 ms) | Done | `hooks/useUserSearch.js` |
| Cancel the previous delayed search | Done | `clearTimeout` cleanup |
| One second session timer | Done | `hooks/useSessionTimer.js` |
| Clean up timer on unmount | Done | `clearInterval` cleanup, Mount/Unmount button to prove it |
| Document title shows visible result count | Done | effect in `App.jsx` |
| Three debugging cases | Done | repaired in `hooks/`, explained below |

## Debugging cases
**6. Effect depends on state it updates.** `useEffect(() => setResults(filter(query)), [query, results])` sets `results`, which changes `results`, which reruns the effect. Fix: depend only on true inputs (`[query]`). Derived data that needs no delay can be computed during render instead.

**7. Timer stuck at one.** `setInterval(() => setSeconds(seconds + 1), 1000)` inside an effect with `[]` captures `seconds = 0` from the first render, so it always sets 1. Fix: `setSeconds(s => s + 1)`.

**8. Cleanup functions.** `return () => clearTimeout(id)` runs before the next search effect and on unmount, so an outdated request can never overwrite a newer result. `return () => clearInterval(id)` stops the interval on unmount, so remounting never produces two timers.

## Test steps
1. Type "dev" quickly: LED turns amber while searching, then two developers show. The title updates to "2 results".
2. Type "zzz": empty state appears and the title reads "0 results".
3. Type and delete quickly several times: only the final query's result is displayed.
4. Watch the timer count 1 per second. Press "Unmount timer", then "Mount timer": it restarts at 00:00 and still advances once per second (not twice).

## Known limitations
- The search delay is simulated with `setTimeout`; there is no real network request.
- StrictMode double-runs effects in development only. Cleanup makes this harmless.
