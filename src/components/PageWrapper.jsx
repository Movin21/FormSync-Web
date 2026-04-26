import BackgroundEffects from './BackgroundEffects';
import Navbar from './Navbar';
import Footer from './Footer';

const PageWrapper = ({ children }) => (
  <div className="relative min-h-screen bg-white text-neutral-900">
    <BackgroundEffects />
    <Navbar />
    <div className="relative z-10 pt-16">
      {children}
    </div>
    <Footer />
  </div>
);

export default PageWrapper;
