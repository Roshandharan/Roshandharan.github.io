import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { PROJECTS, TAG_PILLS } from '../data/projects.js';

export default function Projects() {
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [sortMode, setSortMode] = useState('recent');
  const searchRef = useRef(null);

  // Keyboard shortcut: "/" focuses the search box, same as the static site.
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === '/' && document.activeElement !== searchRef.current) {
        e.preventDefault();
        if (searchRef.current) searchRef.current.focus();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  const toggleTag = (tag) => {
    setActiveTags((tags) => (tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]));
  };

  const visibleProjects = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = PROJECTS.filter((project) => {
      const blob = `${project.title} ${project.meta} ${project.desc} ${project.bullets.join(' ')}`.toLowerCase();
      const okQuery = !q || blob.includes(q);
      const okTags = !activeTags.length || activeTags.every((t) => project.tags.includes(t));
      return okQuery && okTags;
    });

    return filtered.slice().sort((a, b) => {
      if (sortMode === 'recent') return b.order - a.order;
      if (sortMode === 'oldest') return a.order - b.order;
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    });
  }, [query, activeTags, sortMode]);

  return (
    <>
      <Seo
        title="Projects | Roshan Dharan"
        description="Backend, agentic AI, healthcare, and machine-learning case studies by Roshan Dharan."
        path="/projects"
        ogImage="/assets/og-projects.png"
      />

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <span className="section-index">Engineering portfolio</span>
              <h2>Projects built to answer hard questions.</h2>
              <p>Agentic systems, clinical machine learning, and enterprise healthcare infrastructure—with architecture, decisions, and measurable outcomes.</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="meta" id="projectCount" aria-live="polite">
                {visibleProjects.length} shown
              </span>
              <Link className="btn" to="/experience">
                Experience
              </Link>
              <Link className="btn primary" to="/resume">
                Resume
              </Link>
            </div>
          </div>

          <div className="toolbar reveal" role="search">
            <input
              ref={searchRef}
              className="input"
              id="projectSearch"
              type="search"
              placeholder="Search projects (press / to focus)..."
              aria-label="Search projects"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="select"
              id="projectSort"
              aria-label="Sort projects"
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value)}
            >
              <option value="recent">Sort: most recent</option>
              <option value="oldest">Sort: oldest</option>
              <option value="name">Sort: name</option>
            </select>
          </div>

          <div id="tagPills" className="pills reveal" aria-label="Filter projects by tags">
            {TAG_PILLS.map((tag) => (
              <button
                key={tag}
                className="pill"
                type="button"
                aria-pressed={activeTags.includes(tag)}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="grid" id="projectsRoot" aria-label="Project cards">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
