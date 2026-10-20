import { createContext } from 'react';

// ONE context object, created in ONE module. Every consumer imports this same export.
// Default is null so that using the context without a provider is detectable.
export const PreferencesContext = createContext(null);
