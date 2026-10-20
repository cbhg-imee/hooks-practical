# Exam 4 - Application Preferences (useContext)

## Run
```bash
npm install
npm run dev
```

## Completed requirements
| Requirement | Status | Where |
|---|---|---|
| One context and a provider component | Done | `context/PreferencesContext.js`, `PreferencesProvider.jsx` |
| Share theme, fontSize and update functions | Done | provider `value` |
| Toggle light/dark, Dashboard and ArticlePreview update together | Done | `Toolbar.jsx`, `Dashboard.jsx` |
| Font size 14, 16, 18 px without prop drilling | Done | `PreferencesPanel.jsx`, `ArticlePreview.jsx` |
| `usePreferences` throws outside provider | Done | `context/usePreferences.js` |

Component tree: `App > PreferencesProvider > Dashboard > (Toolbar, PreferencesPanel, ArticlePreview)`. No component passes preference props.

## Debugging cases
**9. Consumer receives only the default.** With `createContext(defaultValue)` and no provider, consumers silently get the default. Here the default is `null` and `usePreferences` throws a clear error. Fix: wrap the tree in `<PreferencesProvider>`.

**10. Two context objects.** Every `createContext()` call creates a new object. A Provider only reaches consumers using the same object. Fix: create it once and import that one export in provider and hook.

**11. Why intermediate props disappear.** State lives in the provider. Any descendant reads it directly with `useContext`, so parents in between no longer carry it.

## Test steps
1. Click "Switch to dark": the whole panel and the article preview change together.
2. Click 14px / 16px / 18px: the preview text size and the LCD readout change.
3. To see case 9, temporarily render `<Dashboard />` outside `<PreferencesProvider>` in `App.jsx`: the app throws the clear `usePreferences must be used inside <PreferencesProvider>` error. Undo afterwards.

## Known limitations
- Preferences reset on reload (no persistence was required).
- The provider's value is memoized, so consumers re-render only when a preference actually changes.
