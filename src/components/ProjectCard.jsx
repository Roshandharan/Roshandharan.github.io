import LightboxButton from './LightboxButton.jsx';

export default function ProjectCard({ project }) {
  const { title, meta, desc, bullets, cover, diagram, links, featured } = project;

  return (
    <article className={`card project-card reveal${featured ? ' project-card-featured' : ''}`}>
      <LightboxButton
        className="media project"
        title={title}
        desc={meta}
        src={cover}
        imgAlt={`${title} cover`}
        ariaLabel={`Open preview for ${title}`}
      />
      <div className="project-card-copy">
        {featured && <div className="tag-featured">Featured case study</div>}
        <h3>{title}</h3>
        <div className="meta">{meta}</div>
        <p>{desc}</p>
        <ul>
          {bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
        {links && links.length > 0 && (
          <div className="cta-row">
            {links.map((link) => <a key={link.href} className={link.label === 'Live demo' ? 'btn primary' : 'btn'} href={link.href} target="_blank" rel="noopener">{link.label}</a>)}
          </div>
        )}
      </div>
      {diagram && (
        <div className="diagram project-diagram">
          <img src={diagram.src} alt={diagram.alt} loading="lazy" />
        </div>
      )}
    </article>
  );
}
