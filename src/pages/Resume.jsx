import Seo from '../components/Seo.jsx';

export default function Resume() {
  return (
    <>
      <Seo title="Resume | Roshan Dharan" description="Resume PDF embed and download." path="/resume" />

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <h2>Resume</h2>
            </div>
            <div className="cta-row">
              <a className="btn primary" href="/assets/Roshan_Dharan_Resume.pdf" target="_blank" rel="noopener">
                Open PDF
              </a>
              <a className="btn" href="https://www.linkedin.com/in/roshan-dharan" target="_blank" rel="noopener">
                LinkedIn
              </a>
            </div>
          </div>

          <article className="card reveal">
            <h3>Embedded view</h3>
            <p style={{ marginTop: '6px' }}>
              If the embed does not load in your browser, use the &ldquo;Open PDF&rdquo; button above.
            </p>
            <iframe
              src="/assets/Roshan_Dharan_Resume.pdf"
              title="Roshan Dharan Resume"
              style={{
                width: '100%',
                minHeight: '720px',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                background: 'var(--surface)',
              }}
            />
          </article>

          <hr className="sep" />
        </div>
      </section>
    </>
  );
}
