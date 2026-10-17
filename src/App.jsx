import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CaseStudy from './pages/CaseStudy.jsx';
import TypeRamp from './pages/TypeRamp.jsx';
import ScrollManager from './components/ScrollManager.jsx';

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/type" element={<TypeRamp />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
