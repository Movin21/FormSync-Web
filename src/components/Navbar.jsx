import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home',          to: '/' },
  { label: 'Domain',        to: '/domain' },
  { label: 'Milestones',    to: '/milestones' },
  { label: 'Documents',     to: '/documents' },
  { label: 'Presentations', to: '/presentations' },
  { label: 'About Us',      to: '/about' },
  { label: 'Contact Us',    to: '/contact' },
];

const Navbar = () => {
  const [hidden, setHidden]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const prevYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > prevYRef.current && y > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      prevYRef.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    [
      'relative px-3 py-2 text-sm font-medium rounded-lg transition-colors',
      isActive
        ? 'text-brand-700 bg-brand-50'
        : 'text-neutral-600 hover:text-brand-700 hover:bg-brand-50',
    ].join(' ');

  const mobileLinkClass = ({ isActive }) =>
    [
      'px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
      isActive
        ? 'bg-brand-50 text-brand-700'
        : 'text-neutral-700 hover:bg-brand-50 hover:text-brand-700',
    ].join(' ');

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-transform duration-300 will-change-transform',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_24px_rgba(168,85,247,0.10)]'
            : 'bg-transparent',
          hidden ? '-translate-y-full' : 'translate-y-0',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <motion.img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="FormSync"
              className="h-9 w-auto"
              whileHover={{ scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 400 }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <motion.div key={link.label} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <NavLink to={link.to} className={linkClass} end={link.to === '/'}>
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-neutral-600 hover:bg-brand-50 hover:text-brand-700 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden bg-white/95 backdrop-blur border-t border-brand-100"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className={mobileLinkClass}
                    end={link.to === '/'}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
