import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';

export default function Experience() {
  return (
    <>
      <Seo
        title="Experience | Roshan Dharan"
        description="Professional experience of Roshan Dharan Shashidharan across healthcare software engineering and analytics."
        path="/experience"
      />

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <h2>Experience</h2>
              <p>
                Impact-focused roles across healthcare technology, analytics, and enterprise reporting — with
                measurable outcomes.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link className="btn" to="/projects">
                Projects
              </Link>
              <Link className="btn primary" to="/resume">
                Resume
              </Link>
            </div>
          </div>

          <div className="timeline" aria-label="Work experience timeline">
            <article className="card reveal">
              <div className="timeline-head">
                <div className="media logo">
                  <img src="/assets/keck.svg" alt="Keck School of Medicine of USC logo" loading="lazy" />
                </div>
                <div>
                  <h3>Keck School of Medicine of USC</h3>
                  <div className="meta">Software Engineer Intern • Los Angeles, CA • Nov 2025 – Present</div>
                </div>
              </div>
              <ul>
                <li>
                  Serve as Technical Lead for a 6-person Tiger Team, architecting a multi-layer predictive no-show
                  system — a Snowflake data platform, two versioned XGBoost models, and a Keck Care API integration —
                  surfacing real-time risk scores across tens of thousands of monthly appointments in Cerner
                  RevCycle.
                </li>
                <li>
                  Fine-tuned a transformer-based summarization model (LoRA on a T5/BART backbone) in Keck&rsquo;s AI
                  sandbox to auto-generate discharge summaries, then engineered a Python/LaTeX QA pipeline catching
                  errors across 2,000+ responses, cutting clinician correction time by an estimated 30%.
                </li>
                <li>
                  Shipped a backend service ingesting Cerner ADT data to track real-time bed capacity across units,
                  layering a lightweight predictive classifier to flag capacity strain hours in advance, presented as
                  a technical workshop at a Spring 2026 hackathon.
                </li>
              </ul>
            </article>

            <article className="card reveal">
              <div className="timeline-head">
                <div className="media logo">
                  <img src="/assets/oracle.svg" alt="Oracle Health logo" loading="lazy" />
                </div>
                <div>
                  <h3>Oracle Health</h3>
                  <div className="meta">Associate Software Engineer • Oct 2023 – Jul 2025</div>
                </div>
              </div>
              <ul>
                <li>
                  Architected scalable, concurrent backend pipelines (CCL, PL/SQL) on Oracle Health&rsquo;s Cerner
                  Millennium platform, processing 600,000+ patient records daily to deliver financial reporting
                  infrastructure informing $200M in revenue decisions across 17 departments.
                </li>
                <li>
                  Developed a 340B Extract service using CCL, PL/SQL, and MoveIT integration with Pharmacy Med
                  Manager, reducing pharmacy drug spend by $12M while reclaiming 114 hours of manual effort annually.
                </li>
                <li>
                  Implemented a CLABSI Audit backend service integrating PowerChart and Mobile Vitals Collection APIs
                  via CCL, automating real-time monitoring for 500 patients weekly and eliminating 15 hours of manual
                  nursing checks weekly.
                </li>
                <li>
                  Optimized MedeAnalytics reporting infrastructure across 17 hospital departments using
                  HealtheIntent and PL/SQL, engineering backend ETL workflows that cut report generation time by 40%
                  and improved system reliability.
                </li>
              </ul>
            </article>

            <article className="card reveal">
              <div className="timeline-head">
                <div className="media logo">
                  <img src="/assets/cerner.svg" alt="Oracle Cerner logo" loading="lazy" />
                </div>
                <div>
                  <h3>Oracle Cerner</h3>
                  <div className="meta">Software Engineering Intern • Jan 2023 – Jul 2023</div>
                </div>
              </div>
              <ul>
                <li>
                  Modernized 5 on-premise Power BI systems to Snowflake Cloud, rebuilding SQL data models into a
                  unified schema and automating data entry via a concurrent 8-thread Python/Selenium engine,
                  reducing dashboard load time by 35% and manual effort from 44 hours to under 3 minutes.
                </li>
              </ul>
            </article>
          </div>

          <hr className="sep" />

          <article className="card reveal">
            <h3>What I optimize for</h3>
            <p>
              Delivery in complex data environments depends on clarity, performance, and resilience. My default
              approach is to:
            </p>
            <ul>
              <li>Start from an explicit stakeholder outcome and define a measurable success metric.</li>
              <li>Engineer for reliability (guardrails, validations, and predictable runtime behavior).</li>
              <li>Design for maintainability (modularity, readable logic, and clean handoffs).</li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
