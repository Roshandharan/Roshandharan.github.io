import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import LightboxButton from '../components/LightboxButton.jsx';

export default function Publications() {
  return (
    <>
      <Seo
        title="Publications | Roshan Dharan"
        description="Publications and peer-reviewed work."
        path="/publications"
      />

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <h2>Publications</h2>
              <p>
                Peer-reviewed work and public write-ups. For each, you can highlight methodology, results, and
                reproducibility artifacts.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link className="btn" to="/projects">
                Projects
              </Link>
              <a
                className="btn primary"
                href="https://milestoneresearch.in/JOURNALS/index.php/IJCLI/article/view/82"
                target="_blank"
                rel="noopener"
              >
                Open publication
              </a>
            </div>
          </div>

          <div className="grid grid-2">
            <article className="card reveal" style={{ gridColumn: '1 / -1' }}>
              <LightboxButton
                className="media project"
                title="AI-Powered Battery Management System"
                desc="International Journal of Computational Learning & Intelligence • 2023"
                src="/assets/publication.png"
                imgAlt="AI-Powered Battery Management System cover"
                ariaLabel="Open preview for AI-Powered Battery Management System"
              />
              <h3>AI-Powered Battery Management System</h3>
              <div className="meta">International Journal of Computational Learning &amp; Intelligence • 2023</div>
              <p>
                Peer-reviewed publication on deep learning models for EV battery State of Charge (SoC) and State of
                Health (SoH) prediction across 5,000+ charging cycles, enabling adaptive eco-charging strategies.
              </p>
              <div className="cta-row" style={{ marginTop: '12px' }}>
                <a
                  className="btn primary"
                  href="https://milestoneresearch.in/JOURNALS/index.php/IJCLI/article/view/82"
                  target="_blank"
                  rel="noopener"
                >
                  View Publication
                </a>
              </div>
            </article>
          </div>

          <hr className="sep" />

          <article className="card reveal">
            <h3>Suggested additions</h3>
            <ul>
              <li>Add a short abstract and key metrics (dataset size, evaluation protocol, and headline results).</li>
              <li>Link a reproducibility repo (code, environment, checkpoints) if publicly shareable.</li>
              <li>Include a one-slide visual summary for faster scanning.</li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
