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

          <section className="education-section" aria-labelledby="education-heading">
            <div className="subsection-heading reveal">
              <span className="section-index">Education</span>
              <h3 id="education-heading">Academic foundation</h3>
            </div>
            <div className="education-grid">
              <article className="card education-card reveal">
                <div className="logo-heading">
                  <div className="media logo logo-usc">
                    <img src="/assets/usc.png" alt="University of Southern California logo" />
                  </div>
                  <div>
                    <h3>University of Southern California</h3>
                    <div className="meta">Los Angeles, CA • Aug 2025 – May 2027</div>
                  </div>
                </div>
                <p><strong>Master of Science in Computer Science</strong></p>
                <p className="education-gpa">GPA: 3.67/4</p>
                <p className="education-coursework"><span>Coursework</span> CSCI 570 · CSCI 572 · DSCI 552 · CSCI 576</p>
              </article>

              <article className="card education-card reveal">
                <div className="logo-heading">
                  <div className="media logo">
                    <img src="/assets/reva.png" alt="REVA University logo" />
                  </div>
                  <div>
                    <h3>REVA University</h3>
                    <div className="meta">Bengaluru, India • Jul 2019 – Jul 2023</div>
                  </div>
                </div>
                <p><strong>Bachelor of Technology in Computer Science and Engineering</strong></p>
                <p className="education-gpa">GPA: 3.97/4</p>
                <p className="education-coursework"><span>Coursework</span> Data Structures &amp; Algorithms · Object-Oriented Programming · Advanced DBMS · Operating Systems · Machine Learning · Artificial Intelligence · Cloud Computing · Big Data · Data Science with R</p>
              </article>
            </div>
          </section>

          <div className="subsection-heading work-heading reveal">
            <span className="section-index">Professional experience</span>
            <h3>Work history</h3>
          </div>
          <div className="timeline" aria-label="Work experience timeline">
            <article className="card reveal">
              <div className="timeline-head">
                <div className="media logo">
                  <img src="/assets/keck.png" alt="Keck School of Medicine of USC logo" loading="lazy" />
                </div>
                <div>
                  <h3>Keck School of Medicine of USC</h3>
                  <div className="meta">Software Engineer Intern • Los Angeles, CA • Nov 2025 – Present</div>
                </div>
              </div>
              <ul>
                <li>
                  Contribute to a Tiger Team developing a predictive no-show workflow spanning Snowflake data,
                  versioned XGBoost models, and Keck Care API integration for Cerner RevCycle.
                </li>
                <li>
                  Evaluated transformer-based summarization approaches in Keck&rsquo;s AI sandbox and engineered a
                  Python/LaTeX quality-assurance pipeline to identify errors across 2,000+ generated responses.
                </li>
                <li>
                  Developed and presented a Cerner-focused capacity-management prototype for a Spring 2026
                  hackathon workshop, exploring bed availability, discharge flow, and staffing constraints.
                </li>
              </ul>
            </article>

            <article className="card reveal">
              <div className="timeline-head">
                <div className="media logo">
                  <img src="/assets/oracle.png" alt="Oracle Health logo" loading="lazy" />
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
                  <img src="/assets/cerner.png" alt="Oracle Cerner logo" loading="lazy" />
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
