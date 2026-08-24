import { useToast } from '../context/toastContext.js';

export default function CopyEmailButton({ id, className, email, children }) {
  const { showToast } = useToast();

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      showToast('Email copied');
    } catch {
      showToast('Copy failed');
    }
  };

  return (
    <button id={id} className={className} type="button" data-email={email} onClick={handleClick}>
      {children}
    </button>
  );
}
