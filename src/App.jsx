import BackgroundEffects from './components/BackgroundEffects';
import EmailSignup from './components/EmailSignup';
import Features from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Navbar from './components/Navbar';

const App = () => {
  const launchDate = '2026-08-15T09:00:00Z';

  return (
    <div className="relative min-h-screen bg-white text-neutral-900">
      <BackgroundEffects />
      <Navbar />

      <div className="relative z-10">
        <Hero launchDate={launchDate} />
        <Features />
        <HowItWorks />
        <EmailSignup />
        <Footer />
      </div>
    </div>
  );
};

export default App;