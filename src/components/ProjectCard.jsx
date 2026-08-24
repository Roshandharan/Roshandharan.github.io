import LightboxButton from './LightboxButton.jsx';

export default function ProjectCard({ project }) {
  const { title, meta, desc, bullets, cover, diagram, links, featured } = project;

  return (
    <article
      className={`card reveal${featured ? ' card-glow' : ''}`}
      style={featured ? { gridColumn: '1 / -1' } : undefined}
    >
      <LightboxButton
        className="media project"
        style={featured ? { maxWidth: '400px', float: 'left', margin: '0 24px 16px 0' } : undefined}
        title={title}
        desc={meta}
        src={cover}
        imgAlt={`${title} cover`}
        ariaLabel={`Open preview for ${title}`}
      />
      {featured && <div className="tag-featured">Featured</div>}
      <h3>{title}</h3>
      <div className="meta">{meta}</div>
      <p style={{ marginTop: '10px' }}>{desc}</p>
      <ul>
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      {diagram && (
        <div className="diagram">
          <img src={diagram.src} alt={diagram.alt} loading="lazy" />
        </div>
      )}
      {links && links.length > 0 && (
        <div className="cta-row" style={{ marginTop: '12px' }}>
          {links.map((link) => (
            <a key={link.href} className="btn" href={link.href} target="_blank" rel="noopener">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
