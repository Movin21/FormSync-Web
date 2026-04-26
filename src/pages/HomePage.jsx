import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Bell, BookOpen, CheckCircle, FileText,
  Presentation, Rocket, Shield, Sparkles, Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';

/* ─── Countdown helpers ─────────────────────────────────────────── */
const calcTime = (target) => {
  const gap = Math.max(new Date(target).getTime() - Date.now(), 0);
  return {
    days:    Math.floor(gap / 86400000),
    hours:   Math.floor((gap / 3600000) % 24),
    minutes: Math.floor((gap / 60000) % 60),
    seconds: Math.floor((gap / 1000) % 60),
  };
};

const HeroCountCell = ({ value, label }) => {
  const display = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className="relative flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-md shadow-[0_8px_32px_rgba(168,85,247,0.18)] overflow-hidden"
        style={{ width: '80px', height: '88px', border: '1.5px solid rgba(168,85,247,0.25)' }}
        whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(168,85,247,0.30)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-400 via-indigo-400 to-brand-400" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/60 to-transparent" />
        <motion.span
          key={display}
          initial={{ opacity: 0, y: 14, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-4xl font-extrabold tabular-nums tracking-tight text-neutral-900"
        >
          {display}
        </motion.span>
      </motion.div>
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-500">{label}</span>
    </div>
  );
};

/* ─── Animation variants ────────────────────────────────────────── */
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp  = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const CELLS = [
  { key: 'days',    label: 'Days' },
  { key: 'hours',   label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

const TRUST_PILLS = [
  { icon: CheckCircle, text: 'AI-Enhanced' },
  { icon: Zap,         text: 'Cross-Platform' },
  { icon: Shield,      text: 'Production-Ready' },
];

const LAUNCH_DATE = '2026-05-10T09:00:00Z';

/* ─── Page ──────────────────────────────────────────────────────── */
const HomePage = () => {
  const [timeLeft, setTimeLeft] = useState(() => calcTime(LAUNCH_DATE));

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(calcTime(LAUNCH_DATE)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <header id="hero" className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-4xl text-center">
            {/* Logo */}
            <motion.div variants={fadeUp} className="mb-4 flex justify-center">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="FormSync" className="h-10 w-auto" />
            </motion.div>

            {/* Badge */}
            <motion.div variants={fadeUp} className="mb-6 flex justify-center">
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-5 py-2 backdrop-blur-sm shadow-sm"
                animate={{ boxShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 18px rgba(168,85,247,0.22)', '0 0 0px rgba(168,85,247,0)'] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles size={14} className="text-brand-600 animate-pulseSoft" />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-700">Research Project 2024/25</span>
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl"
            >
              <span className="gradient-text">AI-Powered</span> Cross-Platform{' '}
              <span className="text-neutral-900">Form Generator</span>
            </motion.h1>

            {/* Abstract */}
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-base text-neutral-500 sm:text-lg leading-relaxed"
            >
              A research initiative exploring how large language models and schema-driven automation can 
              generate production-ready, cross-platform form components, APIs, and test suites from a single 
              source of truth — accelerating full-stack development with AI.
            </motion.p>

            {/* Countdown */}
            <motion.div variants={fadeUp} className="mt-10">
              <div className="inline-block rounded-3xl border border-brand-100/80 bg-white/50 backdrop-blur-sm px-6 py-6 shadow-[0_8px_48px_rgba(168,85,247,0.12)]">
                <div className="flex items-center justify-center gap-2 mb-5">
                  <Rocket size={13} className="text-brand-500" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
                    Project Completion In
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  {CELLS.map((cell, i) => (
                    <div key={cell.key} className="flex items-center gap-2 sm:gap-3">
                      <HeroCountCell value={timeLeft[cell.key]} label={cell.label} />
                      {i < CELLS.length - 1 && (
                        <div className="flex flex-col gap-1.5 mb-5">
                          <motion.span className="block w-1.5 h-1.5 rounded-full bg-brand-300" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                          <motion.span className="block w-1.5 h-1.5 rounded-full bg-brand-300" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/documents">
                <motion.span
                  whileHover={{ scale: 1.04, boxShadow: '0 0 44px rgba(168,85,247,0.42)' }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-glow transition-all cursor-pointer"
                >
                  <FileText size={16} />
                  View Documents
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    style={{ backgroundSize: '200% 100%' }}
                    animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.span>
              </Link>
              <Link to="/presentations">
                <motion.span
                  whileHover={{ scale: 1.04, borderColor: '#a855f7' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-neutral-200 bg-white/70 px-8 py-3.5 text-sm font-semibold text-neutral-700 backdrop-blur-sm shadow-card transition-all hover:bg-brand-50 hover:text-brand-700 cursor-pointer"
                >
                  <Presentation size={16} />
                  View Presentations
                </motion.span>
              </Link>
            </motion.div>

            {/* Trust pills */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
              {TRUST_PILLS.map(({ icon: Icon, text }, i) => (
                <motion.span
                  key={text}
                  className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white/80 px-4 py-1.5 text-xs font-medium text-neutral-600 shadow-sm"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                >
                  <Icon size={12} className="text-brand-500" />
                  {text}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white/60 pointer-events-none" />
      </header>

      {/* ── Features & How It Works ── */}
      <Features />
      <HowItWorks />
    </>
  );
};

export default HomePage;
