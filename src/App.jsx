import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Experience from './pages/Experience.jsx';
import Projects from './pages/Projects.jsx';
import Publications from './pages/Publications.jsx';
import Certifications from './pages/Certifications.jsx';
import Awards from './pages/Awards.jsx';
import Resume from './pages/Resume.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="experience" element={<Experience />} />
        <Route path="projects" element={<Projects />} />
        <Route path="publications" element={<Publications />} />
        <Route path="certifications" element={<Certifications />} />
        <Route path="awards" element={<Awards />} />
        <Route path="resume" element={<Resume />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
