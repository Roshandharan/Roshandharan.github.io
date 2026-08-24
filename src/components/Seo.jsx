import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://roshandharan.github.io';

/**
 * Per-route SEO: title, meta description, canonical URL, OG tags, Twitter
 * card, and a Person JSON-LD block whose `url` tracks the current page —
 * matching the pattern each static HTML page had baked into its <head>.
 */
export default function Seo({ title, description, path, ogImage = '/assets/og-image.png' }) {
  const canonical = `${SITE_URL}${path}`;

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Roshan Dharan Shashidharan',
    url: canonical,
    sameAs: ['https://www.linkedin.com/in/roshan-dharan', 'https://github.com/Roshandharan'],
    jobTitle: 'Healthcare Software Engineer',
    affiliation: [{ '@type': 'Organization', name: 'University of Southern California' }],
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(personLd)}</script>
    </Helmet>
  );
}
