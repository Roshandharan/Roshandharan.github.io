import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import useTheme from '../hooks/useTheme.js';
import useRevealOnScroll from '../hooks/useRevealOnScroll.js';
import { useModal } from '../context/modalContext.js';
import { useToast } from '../context/toastContext.js';
import { NAV_LINKS, FOOTER_LABELS } from '../data/nav.js';

export default function Layout() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { modal, isOpen, closeModal } = useModal();
  const { message, visible } = useToast();

  const [navOpen, setNavOpen] = useState(false);
  const navLinksRef = useRef(null);
  const navToggleRef = useRef(null);
  const mainRef = useRef(null);
  const modalCloseRef = useRef(null);
  const lastFocusedRef = useRef(null);

  useRevealOnScroll(mainRef, location.pathname);

  // Reset scroll position on route change — the static site always started
  // a new page at the top since it was a real page load; client-side
  // routing needs to do that explicitly. (The mobile menu is closed
  // directly from the nav link's click handler, not reactively here.)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Click-outside-to-close and Escape-to-close for the mobile nav.
  useEffect(() => {
    const handleClick = (e) => {
      const withinNav = navLinksRef.current && navLinksRef.current.contains(e.target);
      const withinToggle = navToggleRef.current && navToggleRef.current.contains(e.target);
      if (!withinNav && !withinToggle) setNavOpen(false);
    };
    const handleKeydown = (e) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  // Escape-to-close for the lightbox modal (backdrop click is handled inline below).
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [closeModal]);

  // Focus management: move focus into the modal on open, and back to
  // whatever triggered it on close.
  useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement;
      if (modalCloseRef.current) modalCloseRef.current.focus();
    } else if (lastFocusedRef.current) {
      lastFocusedRef.current.focus();
      lastFocusedRef.current = null;
    }
  }, [isOpen]);

  const themeLabel = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';

  const footerLabel = FOOTER_LABELS[location.pathname] || '404';

  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <nav aria-label="Primary navigation">
        <div className="container nav-inner">
          <Link className="brand" to="/" aria-label="Roshan Dharan home">
            <span className="brand-dot" aria-hidden="true"></span>
            <strong>Roshan Dharan</strong>
          </Link>

          <div className="nav-actions">
            <button
              ref={navToggleRef}
              className="icon-btn hamburger"
              id="navToggle"
              type="button"
              aria-label="Open menu"
              aria-controls="navLinks"
              aria-expanded={navOpen}
              onClick={() => setNavOpen((open) => !open)}
            >
              ☰
            </button>

            <div className={`nav-links${navOpen ? ' open' : ''}`} id="navLinks" ref={navLinksRef}>
              {NAV_LINKS.map((link) => (
                <NavLink key={link.to} to={link.to} end onClick={() => setNavOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
            </div>

            <button
              className="icon-btn"
              id="themeToggle"
              type="button"
              aria-label={themeLabel}
              title={themeLabel}
              onClick={toggleTheme}
            >
              ◐
            </button>
          </div>
        </div>
      </nav>

      <main id="content" ref={mainRef}>
        <Outlet />
      </main>

      <div
        className={`modal-backdrop${isOpen ? ' open' : ''}`}
        id="modalBackdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="modal">
          <header>
            <strong id="modalTitle">{modal?.title || 'Preview'}</strong>
            <button
              ref={modalCloseRef}
              className="icon-btn"
              id="modalClose"
              type="button"
              aria-label="Close preview"
              onClick={closeModal}
            >
              ✕
            </button>
          </header>
          <div className="body">
            <img id="modalImg" src={modal?.src || ''} alt={modal?.title || ''} />
            <p id="modalDesc" style={{ marginTop: '10px' }}>
              {modal?.desc || ''}
            </p>
          </div>
        </div>
      </div>
      <div className={`toast${visible ? ' show' : ''}`} id="toast" role="status" aria-live="polite">
        {message}
      </div>

      <footer>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>© 2026 Roshan Dharan. {footerLabel}.</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/publications">Publications</Link>
              <Link to="/certifications">Certifications</Link>
              <Link to="/awards">Awards</Link>
              <a className="btn" href="https://www.linkedin.com/in/roshan-dharan" target="_blank" rel="noopener">
                LinkedIn
              </a>
              <a className="btn" href="https://github.com/Roshandharan" target="_blank" rel="noopener">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
