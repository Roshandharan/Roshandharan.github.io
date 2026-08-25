import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import StatCounter from '../components/StatCounter.jsx';
import CopyEmailButton from '../components/CopyEmailButton.jsx';
import FlowLines from '../components/FlowLines.jsx';

const EMAIL = 'roshandharan.shashidharan@usc.edu';

export default function Home() {
  return (
    <>
      <Seo
        title="Roshan Dharan | Portfolio"
        description="Portfolio of Roshan Dharan Shashidharan — experience, projects, publications, certifications, awards, and resume."
        path="/"
      />

      <section className="hero">
        <FlowLines className="hero-flow" />
        <div className="container hero-grid">
          <div className="reveal">
            <div className="kicker">
              <span className="dot" aria-hidden="true"></span> Healthcare Software Engineer • MS CS @
              USC
            </div>
            <h1 style={{ marginTop: '18px' }}>
              Roshan Dharan <span className="accent">Shashidharan</span>
            </h1>
            <p className="lead">I build backend systems and multi-agent AI pipelines.</p>
            <div className="hero-meta">
              <span className="status-dot" aria-hidden="true"></span>Los Angeles, CA — Technical Lead, Keck Medicine
              of USC
            </div>

            <p className="hero-summary">
              Currently pursuing my MS in Computer Science at USC while interning at Keck Medicine of USC, building
              CCL/Java clinical workflows on Cerner Millennium EHR. Previously spent 2+ years at Oracle Health,
              engineering data pipelines that processed 600,000+ patient records daily across 17 hospital
              departments.
            </p>

            <div className="building-list" aria-label="What I'm building right now">
              <div className="building-label">What I&rsquo;m building right now</div>
              <ul>
                <li>
                  <b>Multi-agent clinical workflow system</b> <span className="stack">(LangGraph + FastAPI)</span> —
                  three specialized agents coordinating triage, discharge, and escalation via stateful graph
                  execution.
                </li>
                <li>
                  <b>RAG codebase Q&amp;A agent</b> <span className="stack">(LangChain + ChromaDB)</span> — ingest any
                  GitHub repo, ask natural-language questions, get cited answers.
                </li>
                <li>
                  <b>Distributed task queue from primitives</b>{' '}
                  <span className="stack">(Redis + PostgreSQL + Kubernetes)</span> — priority queues, exponential
                  backoff, dead-letter queue, no Celery.
                </li>
              </ul>
            </div>

            <div className="cta-row">
              <Link className="btn primary" to="/resume">
                View Resume
              </Link>
            </div>
            <div className="link-row">
              <a href="https://www.linkedin.com/in/roshan-dharan" target="_blank" rel="noopener">
                LinkedIn
              </a>
              <a href="https://github.com/Roshandharan" target="_blank" rel="noopener">
                GitHub
              </a>
              <CopyEmailButton id="copyEmail" email={EMAIL}>
                Copy Email
              </CopyEmailButton>
            </div>
          </div>

          <aside className="hero-card reveal" aria-label="Profile summary">
            <div className="profile">
              <div className="profile-img">
                <img src="/assets/profile.webp" alt="Profile photo placeholder" loading="lazy" />
              </div>
              <div className="profile-stats">
                <StatCounter target={3} label="Industry roles" />
                <StatCounter target={12} label="Projects & builds" />
                <StatCounter target={5} label="Awards" />
                <StatCounter target={2} label="Certifications" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="highlights-band" aria-label="Highlights">
        <div className="container">
          <div className="highlights-row">
            <span className="pill">Healthcare AI</span>
            <span className="pill">Oracle Health</span>
            <span className="pill">USC MS CS</span>
            <span className="pill">
              <img className="pill-icon" src="/assets/skills/python.svg" alt="" loading="lazy" />
              Python
            </span>
            <span className="pill">
              <img className="pill-icon" src="/assets/skills/java.svg" alt="" loading="lazy" />
              Java
            </span>
            <span className="pill">
              <img className="pill-icon" src="/assets/skills/postgresql.svg" alt="" loading="lazy" />
              SQL
            </span>
            <span className="pill">
              <img className="pill-icon" src="/assets/skills/aws.svg" alt="" loading="lazy" />
              AWS
            </span>
            <span className="pill">Databricks</span>
            <span className="pill">
              <img className="pill-icon" src="/assets/skills/fastapi.svg" alt="" loading="lazy" />
              FastAPI
            </span>
            <span className="pill">
              <img className="pill-icon" src="/assets/skills/langgraph.svg" alt="" loading="lazy" />
              LangGraph
            </span>
            <span className="pill">LangChain</span>
            <span className="pill">Claude / LLMs</span>
            <span className="pill">Redis</span>
            <span className="pill">
              <img className="pill-icon" src="/assets/skills/kubernetes.svg" alt="" loading="lazy" />
              Kubernetes
            </span>
            <span className="pill">
              <img className="pill-icon" src="/assets/skills/docker.svg" alt="" loading="lazy" />
              Docker
            </span>
            <span className="pill">12 Projects</span>
            <span className="pill">5 Awards</span>
            <span className="pill">3.67 GPA</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <h2>Education</h2>
              <p>Academic background with a focus on data science, large-scale systems, and applied engineering.</p>
            </div>
            <Link className="btn" to="/resume">
              Open Resume PDF
            </Link>
          </div>

          <div className="grid grid-2">
            <article className="card reveal">
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div className="media logo">
                  <img src="/assets/usc.svg" alt="University of Southern California logo" loading="lazy" />
                </div>
                <div>
                  <h3>University of Southern California</h3>
                  <div className="meta">
                    Master of Science in Computer Science • GPA: 3.67/4 • Aug 2025 – May 2027 • Los
                    Angeles, CA
                  </div>
                </div>
              </div>
              <p>
                Graduate study in data science, large-scale data systems, and applied machine learning with a focus
                on healthcare technology and cloud-native analytics.
              </p>
            </article>

            <article className="card reveal">
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div className="media logo">
                  <img src="/assets/reva.svg" alt="REVA University logo" loading="lazy" />
                </div>
                <div>
                  <h3>REVA University</h3>
                  <div className="meta">Bachelor of Technology in Computer Science and Engineering • Jul 2019 – Jul 2023</div>
                </div>
              </div>
              <p>
                GPA: 3.97/4. Coursework: Data Structures and Algorithms, Object-Oriented Programming
                (Python/Java/C++), Advanced DBMS, Operating Systems, Machine Learning, Artificial Intelligence, Cloud
                Computing, Big Data, and Data Science with R.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <h2>Technical Skills</h2>
              <p>Languages, frameworks, and infrastructure across backend systems, cloud platforms, and applied ML.</p>
            </div>
          </div>

          <div className="skills-list reveal">
            <div className="skills-row">
              <div className="skills-label">Languages</div>
              <div className="skills-tags">
                <span className="tag">Python</span>
                <span className="tag">Java</span>
                <span className="tag">C++</span>
                <span className="tag">JavaScript</span>
                <span className="tag">TypeScript</span>
                <span className="tag">SQL (PostgreSQL, CCL)</span>
                <span className="tag">HTML/CSS</span>
                <span className="tag">MATLAB</span>
              </div>
            </div>
            <div className="skills-row">
              <div className="skills-label">Backend &amp; Frameworks</div>
              <div className="skills-tags">
                <span className="tag">Spring Boot</span>
                <span className="tag">FastAPI</span>
                <span className="tag">REST API Design</span>
                <span className="tag">Node.js</span>
                <span className="tag">Distributed Systems</span>
                <span className="tag">Mockito</span>
              </div>
            </div>
            <div className="skills-row">
              <div className="skills-label">DevOps &amp; Tools</div>
              <div className="skills-tags">
                <span className="tag">Docker</span>
                <span className="tag">Kubernetes</span>
                <span className="tag">CI/CD (GitHub Actions)</span>
                <span className="tag">Git</span>
                <span className="tag">Version Control</span>
                <span className="tag">Linux</span>
                <span className="tag">Agile/Scrum</span>
                <span className="tag">JIRA</span>
              </div>
            </div>
            <div className="skills-row">
              <div className="skills-label">Cloud &amp; Databases</div>
              <div className="skills-tags">
                <span className="tag">AWS (S3, EC2, Lambda)</span>
                <span className="tag">GCP</span>
                <span className="tag">OCI</span>
                <span className="tag">Snowflake</span>
                <span className="tag">PostgreSQL</span>
                <span className="tag">MongoDB</span>
                <span className="tag">Redis</span>
              </div>
            </div>
            <div className="skills-row">
              <div className="skills-label">ML &amp; AI</div>
              <div className="skills-tags">
                <span className="tag">TensorFlow</span>
                <span className="tag">Keras</span>
                <span className="tag">PyTorch</span>
                <span className="tag">Sklearn</span>
                <span className="tag">XGBoost</span>
                <span className="tag">LangGraph</span>
                <span className="tag">LSTM</span>
                <span className="tag">Transformers (BioClinicalBERT)</span>
                <span className="tag">NLP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <h2>Highlights</h2>
              <p>Representative work spanning healthcare analytics, enterprise reporting, and applied machine learning.</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link className="btn" to="/projects">
                Browse projects
              </Link>
              <Link className="btn" to="/publications">
                Publications
              </Link>
            </div>
          </div>

          <div className="grid">
            <article className="card reveal">
              <h3>AI Agents &amp; Automation</h3>
              <p>
                End-to-end agentic systems built from scratch — retrieval, orchestration, and LLM synthesis, not
                wrappers around a hosted product.
              </p>
              <ul>
                <li>
                  RAG-powered codebase Q&amp;A agent with language-aware chunking, MMR retrieval, and
                  citation-grounded answers over any public GitHub repo.
                </li>
                <li>
                  Hospital AI Command Center: an 8-node LangGraph pipeline that scores clinical risk and drafts
                  intervention plans in real time on every ADT event.
                </li>
              </ul>
              <div className="cta-row" style={{ marginTop: '12px' }}>
                <Link className="btn primary" to="/projects">
                  See both projects
                </Link>
              </div>
            </article>

            <article className="card reveal">
              <h3>Healthcare Software - Engineering Impact</h3>
              <p>
                Delivered measurable improvements to reporting performance and operational efficiency in enterprise
                healthcare environments.
              </p>
              <ul>
                <li>
                  Led advanced analytics initiatives at Children&rsquo;s National Hospital across 17+ departments,
                  cutting report runtimes by 30–40%.
                </li>
                <li>
                  Designed SQL and ETL pipelines processing 600,000+ patient records/day, shaping $200M+
                  revenue-impacting decisions.
                </li>
                <li>
                  Built compliant 340B, HIDI, and CLABSI audit solutions, reclaiming 114+ hours/year and reducing
                  pharmacy drug spend by over $12M annually.
                </li>
              </ul>
            </article>

            <article className="card reveal">
              <h3>Others</h3>
              <p>Built and deployed end-to-end ML workflows for clinical and engineering use cases.</p>
              <ul>
                <li>
                  Multimodal ICU outcome prediction using LSTM vitals and BioClinicalBERT embeddings with 6–8% AUROC
                  lift over NLP-only baselines.
                </li>
                <li>
                  EV battery SoC/SoH prediction over 5,000+ charging cycles using deep learning, with a peer-reviewed
                  journal publication.
                </li>
                <li>Deployed models as REST services with CI/CD integration for reproducibility and experimentation.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <h2>Quick links</h2>
              <p>Jump directly into the most relevant artifacts: experience narrative, project case studies, and awards.</p>
            </div>
          </div>

          <div className="grid">
            <article className="card reveal">
              <h3>Experience</h3>
              <p>Role-by-role impact with quantified outcomes in enterprise healthcare environments.</p>
              <div className="cta-row">
                <Link className="btn primary" to="/experience">
                  View experience
                </Link>
                <Link className="btn" to="/awards">
                  Awards
                </Link>
              </div>
            </article>

            <article className="card reveal">
              <h3>Projects</h3>
              <p>Filter and search across personal work, healthcare reporting builds, and analytics initiatives.</p>
              <div className="cta-row">
                <Link className="btn primary" to="/projects">
                  Explore projects
                </Link>
                <Link className="btn" to="/publications">
                  Publication
                </Link>
              </div>
            </article>

            <article className="card reveal">
              <h3>Resume</h3>
              <p>Embedded PDF view for quick review and easy download.</p>
              <div className="cta-row">
                <Link className="btn primary" to="/resume">
                  Open resume
                </Link>
                <a className="btn" href="https://www.linkedin.com/in/roshan-dharan" target="_blank" rel="noopener">
                  Contact
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section closing-cta">
        <div className="container">
          <div className="closing-cta-inner reveal">
            <div>
              <h2>Open to Software Engineering roles</h2>
              <p>
                Healthcare AI, backend systems, and agentic infrastructure. If any of that overlaps with what
                you&rsquo;re building, I&rsquo;d like to hear about it.
              </p>
            </div>
            <div className="cta-row">
              <Link className="btn primary" to="/resume">
                View Resume
              </Link>
              <a className="btn" href="https://www.linkedin.com/in/roshan-dharan" target="_blank" rel="noopener">
                LinkedIn
              </a>
              <CopyEmailButton id="copyEmailFooter" className="btn" email={EMAIL}>
                Copy Email
              </CopyEmailButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
