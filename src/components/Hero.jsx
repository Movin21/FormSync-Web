import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  BookOpen,
  CheckCircle,
  Rocket,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const calcTime = (target) => {
  const gap = Math.max(new Date(target).getTime() - Date.now(), 0);
  return {
    days: Math.floor(gap / 86400000),
    hours: Math.floor((gap / 3600000) % 24),
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
        style={{
          width: '88px',
          height: '96px',
          border: '1.5px solid rgba(168,85,247,0.25)',
        }}
        whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(168,85,247,0.30)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-400 via-indigo-400 to-brand-400" />
        {/* inner glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/60 to-transparent" />
        <motion.span
          key={display}
          initial={{ opacity: 0, y: 14, scale: 0.85 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-5xl font-extrabold tabular-nums tracking-tight text-neutral-900"
        >
          {display}
        </motion.span>
      </motion.div>
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-500">{label}</span>
    </div>
  );
};

const TRUST_PILLS = [
  { icon: CheckCircle, text: "AI-Enhanced" },
  { icon: Zap, text: "Multi-Format" },
  { icon: Shield, text: "Production-Ready" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const CELLS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

const Hero = ({ launchDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => calcTime(launchDate));

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(calcTime(launchDate)), 1000);
    return () => clearInterval(t);
  }, [launchDate]);

  return (
    <header
      id="hero"
      className="relative pt-28 pb-20 sm:pt-20 sm:pb-28 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Logo above badge */}
          <motion.div variants={fadeUp} className="mb-4 flex justify-center">
            <img src="/logo.png" alt="FormSync" className="h-8 w-auto" />
          </motion.div>

          {/* Launching badge */}
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-5 py-2 backdrop-blur-sm shadow-sm"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(168,85,247,0)",
                  "0 0 18px rgba(168,85,247,0.22)",
                  "0 0 0px rgba(168,85,247,0)",
                ],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles
                size={14}
                className="text-brand-600 animate-pulseSoft"
              />
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-700">
                Launching Soon
              </span>
            </motion.div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            className="text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl"
          >
            Transform <span className="gradient-text">Schemas</span> into{" "}
            <span className="text-neutral-900">Production Code</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base text-neutral-500 sm:text-xl leading-relaxed"
          >
            Validate, enhance, and generate full-stack applications from JSON
            Schema. Create forms, APIs, DTOs, and tests all powered by AI.
          </motion.p>

          {/* Full countdown block */}
          <motion.div variants={fadeUp} className="mt-10">
            <div className="inline-block rounded-3xl border border-brand-100/80 bg-white/50 backdrop-blur-sm px-8 py-7 shadow-[0_8px_48px_rgba(168,85,247,0.12)]">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Rocket size={13} className="text-brand-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
                  Launching In
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                {CELLS.map((cell, i) => (
                  <div key={cell.key} className="flex items-center gap-3 sm:gap-4">
                    <HeroCountCell value={timeLeft[cell.key]} label={cell.label} />
                    {i < CELLS.length - 1 && (
                      <div className="flex flex-col gap-2 mb-5">
                        <motion.span
                          className="block w-1.5 h-1.5 rounded-full bg-brand-300"
                          animate={{ opacity: [1, 0.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <motion.span
                          className="block w-1.5 h-1.5 rounded-full bg-brand-300"
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <motion.a
              href="#signup"
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 44px rgba(168,85,247,0.42)",
              }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-glow transition-all"
            >
              <Bell size={16} />
              Get Early Access
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                style={{ backgroundSize: "200% 100%" }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              />
            </motion.a>
            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.04, borderColor: "#a855f7" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-neutral-200 bg-white/70 px-8 py-3.5 text-sm font-semibold text-neutral-700 backdrop-blur-sm shadow-card transition-all hover:bg-brand-50 hover:text-brand-700"
            >
              <BookOpen size={16} />
              Learn How It Works
            </motion.a>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
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
  );
};

export default Hero;
