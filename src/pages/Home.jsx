import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import CopyEmailButton from '../components/CopyEmailButton.jsx';

const EMAIL = 'roshandharan.shashidharan@usc.edu';
const selectedWork = [
  { eyebrow: 'Agentic healthcare systems', title: 'Hospital AI Command Center', image: '/assets/hospital-command-project.svg', alt: 'Hospital AI Command Center interface and system overview', summary: 'A real-time multi-agent workflow that reacts to HL7 ADT events, scores clinical risk, retrieves guidelines, and produces attributable intervention plans.', metric: '5 models · 0.77–0.83 AUC', stack: 'LangGraph · XGBoost · Claude · FastAPI', href: 'https://github.com/Roshandharan/hospital-ai-command-center' },
  { eyebrow: 'Retrieval and developer tooling', title: 'RAG Codebase Q&A Agent', image: '/assets/rag-agent-project.svg', alt: 'RAG Codebase Q and A agent interface', summary: 'Ingests a public GitHub repository and answers natural-language questions with citations to the exact source chunks used for retrieval.', metric: '90% hit-rate@k', stack: 'LangChain · ChromaDB · Python', href: 'https://github.com/Roshandharan/rag-codebase-agent' },
];

export default function Home() {
  return (
    <>
      <Seo title="Roshan Dharan | Backend & AI Engineer" description="Backend and AI engineer building reliable healthcare systems. USC MS CS, Keck Medicine of USC, and former Oracle Health engineer." path="/" />

      <section className="hero hero-redesign">
        <div className="container hero-redesign-grid">
          <div className="hero-copy reveal">
            <div className="availability"><span aria-hidden="true" /> Los Angeles · Open to 2027 software engineering roles</div>
            <p className="hero-role">Backend &amp; AI Engineer</p>
            <h1>Building reliable software for <span className="accent">high-stakes systems.</span></h1>
            <p className="hero-deck">I build production backend and AI systems for healthcare—processing 600K records a day, improving clinical operations, and turning complex infrastructure into measurable outcomes.</p>
            <div className="cta-row hero-actions">
              <Link className="btn primary" to="/projects">View selected work <span aria-hidden="true">↗</span></Link>
              <a className="btn" href="/assets/Roshan_Dharan_Resume.pdf" target="_blank" rel="noopener">Download resume</a>
            </div>
            <div className="hero-links" aria-label="Contact links">
              <a href="https://github.com/Roshandharan" target="_blank" rel="noopener">GitHub</a>
              <a href="https://www.linkedin.com/in/roshan-dharan" target="_blank" rel="noopener">LinkedIn</a>
              <CopyEmailButton id="copyEmail" email={EMAIL}>Copy email</CopyEmailButton>
            </div>
          </div>
          <aside className="profile-panel reveal" aria-label="Roshan Dharan profile">
            <div className="portrait-wrap"><img src="/assets/profile.webp" alt="Roshan Dharan" width="900" height="872" decoding="async" fetchPriority="high" /></div>
            <div className="profile-panel-copy"><strong>Roshan Dharan</strong><span>MS Computer Science · USC</span><span>Software Engineer Intern · Keck Medicine</span></div>
          </aside>
        </div>
      </section>

      <section className="proof-strip" aria-label="Selected impact">
        <div className="container proof-grid">
          <div><strong>600K</strong><span>records processed daily</span></div>
          <div><strong>$200M</strong><span>in decisions informed</span></div>
          <div><strong>$12M</strong><span>operating cost reduction</span></div>
          <div><strong>$1M+</strong><span>projected annual savings</span></div>
        </div>
      </section>

      <section className="section selected-work"><div className="container">
        <div className="section-head reveal"><div><span className="section-index">01 · Selected work</span><h2>Systems, not demos.</h2><p>Projects built around retrieval quality, observable decisions, and production-minded safeguards.</p></div><Link className="text-link" to="/projects">Explore all projects <span aria-hidden="true">→</span></Link></div>
        <div className="case-study-list">
          {selectedWork.map((project) => <article className="case-study reveal" key={project.title}>
            <div className="case-study-media"><img src={project.image} alt={project.alt} loading="lazy" decoding="async" /></div>
            <div className="case-study-copy"><span className="eyebrow">{project.eyebrow}</span><h3>{project.title}</h3><p>{project.summary}</p>
              <div className="case-study-facts"><span><b>Result</b>{project.metric}</span><span><b>Stack</b>{project.stack}</span></div>
              <a className="text-link" href={project.href} target="_blank" rel="noopener">View repository <span aria-hidden="true">↗</span></a>
            </div>
          </article>)}
        </div>
      </div></section>

      <section className="section experience-snapshot"><div className="container">
        <div className="section-head reveal"><div><span className="section-index">02 · Experience</span><h2>Healthcare depth. Software discipline.</h2></div><Link className="text-link" to="/experience">Full experience <span aria-hidden="true">→</span></Link></div>
        <div className="role-list reveal">
          <article><div className="role-date">2025 — Present</div><div><h3>Keck Medicine of USC</h3><p>Software Engineer Intern · Clinical applications and healthcare AI</p></div><img src="/assets/keck.png" alt="" loading="lazy" /></article>
          <article><div className="role-date">2023 — 2025</div><div><h3>Oracle Health</h3><p>Associate Software Engineer · Backend reporting and data pipelines</p></div><img src="/assets/oracle.png" alt="" loading="lazy" /></article>
          <article><div className="role-date">2023</div><div><h3>Oracle Cerner</h3><p>Software Engineering Intern · Automation and cloud analytics</p></div><img src="/assets/cerner.png" alt="" loading="lazy" /></article>
        </div>
      </div></section>

      <section className="section focus-section"><div className="container focus-grid">
        <div className="reveal"><span className="section-index">03 · Right now</span><h2>Learning, experimenting, refining.</h2><p>At USC, I’m deepening the theory behind language systems and secure software while exploring the next generation of agentic pipelines with Google’s Agent Development Kit.</p></div>
        <div className="focus-list reveal">
          <div className="focus-item"><span>Build · 01</span><strong>CSCI 544</strong><p>Building a language model on USC AI GPU infrastructure.</p></div>
          <div className="focus-item"><span>Research · 02</span><strong>CSCI 530</strong><p>Writing a research paper in secure systems and applied security.</p></div>
          <div className="focus-item"><span>Explore · 03</span><strong>Google ADK</strong><p>Designing and evaluating tool-using multi-agent workflows with Google’s Agent Development Kit.</p></div>
        </div>
      </div></section>

      <section className="section toolkit-section"><div className="container toolkit-grid reveal"><div><span className="section-index">04 · Toolkit</span><h2>Built across the stack.</h2></div><div className="toolkit-groups"><p><b>Backend</b><span>Python · Java · FastAPI · Spring Boot · REST APIs</span></p><p><b>Data</b><span>PostgreSQL · Snowflake · Redis · MongoDB · CCL</span></p><p><b>AI / ML</b><span>PyTorch · LangGraph · LangChain · XGBoost · Transformers</span></p><p><b>Infrastructure</b><span>AWS · GCP · Docker · Kubernetes · GitHub Actions</span></p></div></div></section>

      <section className="section closing-cta"><div className="container"><div className="closing-cta-inner reveal"><div><span className="section-index">Let’s build something useful</span><h2>Looking for a backend or AI engineer?</h2><p>I’m interested in teams solving difficult infrastructure, healthcare, and applied AI problems.</p></div><div className="cta-row"><CopyEmailButton id="copyEmailFooter" className="btn primary" email={EMAIL}>Copy email</CopyEmailButton><Link className="btn" to="/resume">View resume</Link></div></div></div></section>
    </>
  );
}
