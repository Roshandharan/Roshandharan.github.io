import { useCallback, useMemo, useState } from 'react';
import { ModalContext } from './modalContext.js';

export default function ModalProvider({ children }) {
  const [modal, setModal] = useState(null); // { title, desc, src } | null

  const openModal = useCallback(({ title, desc, src }) => {
    if (!src) return;
    setModal({ title: title || 'Preview', desc: desc || '', src });
  }, []);

  const closeModal = useCallback(() => setModal(null), []);

  const value = useMemo(
    () => ({ modal, isOpen: Boolean(modal), openModal, closeModal }),
    [modal, openModal, closeModal],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
