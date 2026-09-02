import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';

const Experience = lazy(() => import('./pages/Experience.jsx'));
const Projects = lazy(() => import('./pages/Projects.jsx'));
const Publications = lazy(() => import('./pages/Publications.jsx'));
const Certifications = lazy(() => import('./pages/Certifications.jsx'));
const Awards = lazy(() => import('./pages/Awards.jsx'));
const Resume = lazy(() => import('./pages/Resume.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="experience" element={<Suspense fallback={null}><Experience /></Suspense>} />
        <Route path="projects" element={<Suspense fallback={null}><Projects /></Suspense>} />
        <Route path="publications" element={<Suspense fallback={null}><Publications /></Suspense>} />
        <Route path="certifications" element={<Suspense fallback={null}><Certifications /></Suspense>} />
        <Route path="awards" element={<Suspense fallback={null}><Awards /></Suspense>} />
        <Route path="resume" element={<Suspense fallback={null}><Resume /></Suspense>} />
        <Route path="*" element={<Suspense fallback={null}><NotFound /></Suspense>} />
      </Route>
    </Routes>
  );
}
