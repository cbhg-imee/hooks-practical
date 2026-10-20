import { useContext } from 'react';
import { PreferencesContext } from './PreferencesContext.js';

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (ctx === null) {
    throw new Error('usePreferences must be used inside <PreferencesProvider>. Wrap the component tree with it.');
  }
  return ctx;
}
