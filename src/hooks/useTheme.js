import { useCallback, useEffect, useState } from 'react';

const readStoredTheme = () => {
  try {
    return localStorage.getItem('theme');
  } catch {
    return null;
  }
};

const writeStoredTheme = (t) => {
  try {
    localStorage.setItem('theme', t);
  } catch {
    // localStorage unavailable (private mode, disabled storage, etc.) — no-op.
  }
};

const getPreferredTheme = () => {
  const saved = readStoredTheme();
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

/** Dark/light theme, persisted to localStorage and falling back to prefers-color-scheme. */
export default function useTheme() {
  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    writeStoredTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme };
}
