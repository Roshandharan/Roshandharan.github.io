import { createContext, useContext } from 'react';

// Shape: { title, desc, src } | null when closed.
export const ModalContext = createContext(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within a ModalProvider');
  return ctx;
}
