# Roshan Dharan — Portfolio (React + Vite)

React/Vite rebuild of the original static portfolio (plain HTML/CSS/JS). Same design, same copy,
same assets — ported to React Router + component state instead of hand-rolled DOM scripting, so
it's easier to extend later.

## Stack

- **Vite** + **React 19**
- **React Router** (`react-router-dom`) — client-side routing, extensionless routes
- **react-helmet-async** — per-route `<title>`, meta description, canonical URL, OG/Twitter tags, JSON-LD
- **oxlint** — linting (`npm run lint`)
- Plain CSS, ported from `css/style.css` nearly verbatim (`src/index.css`)

## Structure

```
src/
  components/   Layout (nav/footer/modal/toast), LightboxButton, ProjectCard, StatCounter, CopyEmailButton, Seo
  context/      Modal + Toast context/providers (lightbox and toast are app-wide, not per-page)
  hooks/        useTheme, useRevealOnScroll
  pages/        One component per route
  data/         Project list, nav links, footer labels
public/
  assets/       Images, SVGs, resume PDF, favicon — copied as-is from the static site
  404.html      GitHub Pages SPA fallback (see below)
```

## Routes

`/`, `/experience`, `/projects`, `/publications`, `/certifications`, `/awards`, `/resume`, plus a
catch-all 404. No `.html` extensions.

## GitHub Pages SPA fallback

GitHub Pages has no server-side rewrite rules, so a hard refresh on `/projects` would 404 by
default. This uses the standard [rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages)
trick: `public/404.html` redirects any unmatched path to `/` with the original path encoded in a
query string, and a small inline script in `index.html` decodes it back via
`history.replaceState` before the router mounts. Since this deploys to the repo root as a
user/organization page (`Roshandharan.github.io`), `pathSegmentsToKeep` is `0` — no base path
needed.

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run lint      # oxlint
npm run preview   # serve the production build locally
```

## Deployment

`.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages on every push to `main`
via `actions/deploy-pages`, running from the repo root.

## SEO note

Titles, descriptions, canonical/OG/Twitter tags, and JSON-LD are set per-route via
`react-helmet-async`, matching what each static HTML page had in `<head>`. Since this is a
client-rendered SPA (no SSR/prerendering), a crawler that doesn't execute JavaScript will only see
the fallback tags baked into `index.html`; one that does (as Googlebot does today) will see the
per-route tags after render.
