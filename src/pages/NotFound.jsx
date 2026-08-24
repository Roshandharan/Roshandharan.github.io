import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';

export default function NotFound() {
  return (
    <>
      <Seo title="404 | Roshan Dharan" description="Page not found." path="/404" />

      <section className="section">
        <div className="container">
          <article className="card reveal">
            <h2>Page not found</h2>
            <p>The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.</p>
            <div className="cta-row">
              <Link className="btn primary" to="/">
                Go to home
              </Link>
              <Link className="btn" to="/projects">
                Projects
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
