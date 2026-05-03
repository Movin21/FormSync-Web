import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, ExternalLink, Globe, Link2 } from 'lucide-react';

const SOCIAL = [
  { href: 'https://github.com/YasasLakmina/FormSync', icon: Code2, label: 'GitHub' },
  { href: 'http://54.211.203.36:5173/', icon: Link2, label: 'FormSync.org' },
];

const LINKS = [
  { label: 'Domain',        to: '/domain' },
  { label: 'Milestones',    to: '/milestones' },
  { label: 'Documents',     to: '/documents' },
  { label: 'Presentations', to: '/presentations' },
  { label: 'About Us',      to: '/about' },
  { label: 'Contact Us',    to: '/contact' },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-neutral-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">

          {/* Brand */}
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="FormSync"
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-xs text-neutral-400 max-w-[220px] text-center sm:text-left">
              AI-Powered Cross-Platform Form Generator — Research Project.
            </p>
            <motion.a
              href="http://54.211.203.36:5173/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-700 hover:bg-brand-100 transition-colors"
            >
              <Globe size={10} />
              formsync.org
              <ExternalLink size={9} className="opacity-70" />
            </motion.a>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm text-neutral-500 hover:text-brand-600 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-2">
            {SOCIAL.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.93 }}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-2.5 text-neutral-500 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-400">
          <span>&copy; {year} FormSync Research Group. All rights reserved.</span>
          <a
            href="http://54.211.203.36:5173/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-brand-600 transition-colors"
          >
            <Globe size={11} />
            formsync.org
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
