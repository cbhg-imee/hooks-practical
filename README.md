# React Hooks Practical Exam - Single Project

One Vite + React project containing all six practical exams. Use the tab bar at the top to switch exams.

## Run
```bash
npm install
npm run dev      # open http://localhost:5173
npm test         # Exam 6 reducer tests
```
Rules met: no state management library (React Hooks only), runs with `npm install` then `npm run dev`, submit without `node_modules` (see `.gitignore`).

Debugging explanations for every required case are in each exam's README (`src/exams/<exam>/README.md`), not in the app UI.

## Structure
```
src/
  main.jsx, App.jsx        tab shell that mounts one exam at a time
  styles.css               shared Tactile Neomorphic Industrial UI
  exams/
    exam1-task-counter/        useState
    exam2-live-search/         useEffect
    exam3-accessible-form/     useRef + useState
    exam4-preferences/         useContext
    exam5-product-explorer/    useMemo + useCallback
    exam6-issue-tracker/       useReducer + custom Hook (+ tests)
```
Each exam folder has its own `README.md` with completed requirements, limitations, test steps and the debugging explanations required by the rubric.

## Completed requirements
All requirements for Exams 1-6 are implemented. See the per-exam READMEs for the table of requirements and where each lives in the code.

## Known limitations
- Only the selected exam is mounted. Switching tabs resets that exam's state (Exam 6 keeps its issues through localStorage).
- StrictMode is off so Exam 5's console render counts are accurate.
- Fonts load from Google Fonts. Offline, a system monospace font is used.

## Test steps
1. `npm install`, `npm run dev`, open the app.
2. Visit each tab and follow the test steps in `src/exams/<exam>/README.md`.
3. `npm test` runs 4 reducer tests.

## Git
```bash
git init
git add .
git commit -m "React hooks practical exam"
git remote add origin <your-repo-url>
git push -u origin main
```
