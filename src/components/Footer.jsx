import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

const SOCIAL = [
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Github, label: "GitHub" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
];

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Get Access", href: "#signup" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-100 bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          {/* Brand */}
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <a href="#" className="flex items-center gap-2">
              <img src="/logo.png" alt="FormSync" className="h-7 w-auto" />
            </a>
            <p className="text-xs text-neutral-400 max-w-[200px] text-center sm:text-left">
              Schema-driven automation for modern applications.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-neutral-500 hover:text-brand-600 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-2">
            {SOCIAL.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
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

        <div className="mt-8 border-t border-neutral-100 pt-6 text-center text-xs text-neutral-400">
          &copy; {year} FormSync. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
