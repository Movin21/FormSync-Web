import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Countdown", href: "#countdown" },
  { label: "Get Notified", href: "#signup" },
];

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-transform duration-300 will-change-transform",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_24px_rgba(168,85,247,0.10)]"
            : "bg-transparent",
          hidden ? "-translate-y-full" : "translate-y-0",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <motion.img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="FormSync"
              className="h-11 w-auto"
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-neutral-600 rounded-lg transition-colors hover:text-brand-700 hover:bg-brand-50"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#signup"
              className="relative overflow-hidden px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 shadow-glow hover:shadow-glow-lg transition-shadow"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="relative z-10">Get Early Access</span>
              {/* Shimmer */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                style={{ backgroundSize: "200% 100%" }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-brand-50 hover:text-brand-700 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-0.5 bg-current mb-1 transition-all"
              style={{
                transform: menuOpen ? "rotate(45deg) translate(2px, 6px)" : "",
              }}
            />
            <span
              className="block w-5 h-0.5 bg-current mb-1 transition-all"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-0.5 bg-current transition-all"
              style={{
                transform: menuOpen
                  ? "rotate(-45deg) translate(2px, -6px)"
                  : "",
              }}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur border-t border-brand-100"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2.5 rounded-lg text-sm font-medium text-neutral-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#signup"
                  className="mt-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Early Access
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
