import { useModal } from '../context/modalContext.js';

/**
 * A <button data-modal="image"> from the static site, reworked as a real
 * component. It's a native <button>, so Enter/Space activation is free —
 * no manual keydown handler needed like the vanilla-JS version had.
 */
export default function LightboxButton({
  className,
  style,
  ariaLabel,
  title,
  desc,
  src,
  imgAlt,
}) {
  const { openModal } = useModal();

  return (
    <button
      type="button"
      className={className}
      style={style}
      aria-label={ariaLabel}
      onClick={() => openModal({ title, desc, src })}
    >
      <img src={src} alt={imgAlt} loading="lazy" />
    </button>
  );
}
