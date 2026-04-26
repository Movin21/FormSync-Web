import { Routes, Route } from 'react-router-dom';
import PageWrapper from './components/PageWrapper';
import HomePage from './pages/HomePage';
import DomainPage from './pages/DomainPage';
import MilestonesPage from './pages/MilestonesPage';
import DocumentsPage from './pages/DocumentsPage';
import PresentationsPage from './pages/PresentationsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const App = () => {
  return (
    <PageWrapper>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/domain" element={<DomainPage />} />
        <Route path="/milestones" element={<MilestonesPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/presentations" element={<PresentationsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </PageWrapper>
  );
};

export default App;
