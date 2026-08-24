import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import LightboxButton from '../components/LightboxButton.jsx';

const AWARDS = [
  {
    id: 'champion-of-service',
    title: 'Oracle Champion of Service Award',
    meta: 'Mar 2025',
    cover: '/assets/champion-award-cert.svg',
    desc: 'Honored as a CSAT Hero for consistently delivering strong customer outcomes, driving exceptional satisfaction, and contributing to a best-in-class client experience.',
  },
  {
    id: 'spot-award-2025',
    title: 'Oracle Spot Award',
    meta: 'Jan 2025',
    cover: '/assets/spot-award-cert.svg',
    desc: 'Recognized for consistently going the extra mile on client deliverables, taking full ownership of complex requests, and achieving 145.83% productivity while maintaining strong month-on-month KPI performance.',
  },
  {
    id: 'round-of-applause',
    title: 'Round of Applause Award',
    meta: 'Nov 2024',
    cover: '/assets/round-of-applause-cert.svg',
    desc: 'Awarded for Champions of Service based on client satisfaction survey feedback, highlighting knowledge, ease of collaboration, and timely, precise support that enabled clients to meet their goals.',
  },
  {
    id: 'spot-award-2024',
    title: 'Oracle Spot Award',
    meta: 'Jul 2024',
    cover: '/assets/spot-award-2024-cert.svg',
    desc: 'Recognized for excelling in supporting client requests, closing 16 Tier 1 service requests with strong turnaround times, and building trusted relationships with counterparts while maintaining high productivity.',
  },
];

export default function Awards() {
  return (
    <>
      <Seo
        title="Awards | Roshan Dharan"
        description="Awards and recognition — with certificate previews."
        path="/awards"
      />

      <section className="section" style={{ paddingBottom: '20px', borderBottom: 'none' }}>
        <div className="container">
          <div className="section-head reveal">
            <div>
              <h2>Awards</h2>
              <p>Recognition for technical ownership, customer outcomes, and high-impact delivery in healthcare analytics environments.</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link className="btn" to="/experience">
                Experience
              </Link>
              <Link className="btn primary" to="/projects">
                Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section spotlight-section">
        <div className="container">
          <div className="spotlight-card reveal">
            <LightboxButton
              className="spotlight-media"
              title="FY25Q4 Oracle Pinnacle Award"
              desc="Jul 2025 • Roshan's diligence in resolving escalated technical issues, problem-solving skills, and dedication in addressing challenges promptly have had a positive impact on the team's efficiency."
              src="/assets/pinnacle-award.png"
              imgAlt="FY25Q4 Oracle Pinnacle Award certificate"
              ariaLabel="Open preview for FY25Q4 Oracle Pinnacle Award"
            />
            <div className="spotlight-content">
              <div className="tag-top">★ Top Award of the Year</div>
              <h3>FY25Q4 Oracle Pinnacle Award</h3>
              <div className="meta">Jul 2025 • Oracle Health</div>
              <p>
                Oracle&rsquo;s highest individual recognition, awarded for diligence in resolving escalated technical
                issues, proactive problem solving, and optimizing reporting logic to support dynamic memory
                allocation in complex healthcare data workflows — plus solving a complex, escalated analytics edge
                case that left the client highly satisfied.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid">
            {AWARDS.map((award) => (
              <article className="card reveal" key={award.id}>
                <LightboxButton
                  className="media award"
                  title={award.title}
                  desc={award.meta}
                  src={award.cover}
                  imgAlt={`${award.title} certificate`}
                  ariaLabel={`Open preview for ${award.title}`}
                />
                <h3>{award.title}</h3>
                <div className="meta">{award.meta}</div>
                <p>{award.desc}</p>
              </article>
            ))}
          </div>

          <hr className="sep" />

          <article className="card reveal">
            <h3>How I earned these</h3>
            <p>
              Across awards, the common theme is repeatable delivery under ambiguity: fast triage, clean root-cause
              isolation, and durable fixes.
            </p>
            <ul>
              <li>Own the end-to-end resolution path (stakeholders, data, tooling, handoffs).</li>
              <li>Instrument and validate to prevent regression (checks, monitoring, and clear runbooks).</li>
              <li>Scale impact by packaging learnings into reusable patterns.</li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
