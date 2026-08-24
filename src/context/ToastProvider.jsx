import { useCallback, useMemo, useRef, useState } from 'react';
import { ToastContext } from './toastContext.js';

const TOAST_DURATION = 1600;

export default function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  const showToast = useCallback((msg) => {
    setMessage(msg);
    setVisible(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), TOAST_DURATION);
  }, []);

  const value = useMemo(() => ({ message, visible, showToast }), [message, visible, showToast]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
