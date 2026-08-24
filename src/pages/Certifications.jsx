import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';

export default function Certifications() {
  return (
    <>
      <Seo
        title="Certifications | Roshan Dharan"
        description="Certifications for Roshan Dharan Shashidharan."
        path="/certifications"
      />

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <h2>Certifications</h2>
              <p>Formal credentials supporting service management fundamentals, clinical systems, and operational excellence.</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link className="btn" to="/experience">
                Experience
              </Link>
              <Link className="btn primary" to="/resume">
                Resume
              </Link>
            </div>
          </div>

          <div className="grid grid-2">
            <article className="card reveal">
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div className="media logo">
                  <img src="/assets/itil.png" alt="ITIL® Foundation logo" loading="lazy" />
                </div>
                <div>
                  <h3>ITIL® Foundation</h3>
                  <div className="meta">IT Service Management Fundamentals</div>
                </div>
              </div>
              <p>
                Credential covering core ITIL concepts, the service value system, and best practices for designing,
                operating, and continually improving IT services.
              </p>
            </article>

            <article className="card reveal">
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div className="media logo">
                  <img src="/assets/cerner.png" alt="Cerner Learning Services logo" loading="lazy" />
                </div>
                <div>
                  <h3>Cerner Millennium: Fundamentals</h3>
                  <div className="meta">Cerner Learning Services • Jan 2026</div>
                </div>
              </div>
              <p>
                Credential covering foundational concepts of the Oracle Cerner Millennium EHR platform, supporting
                clinical application development and healthcare data workflows.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
