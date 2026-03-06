import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Rocket } from 'lucide-react';

const calculateRemainingTime = (targetDate) => {
  const now = Date.now();
  const end = new Date(targetDate).getTime();
  const gap = Math.max(end - now, 0);
  return {
    days:    Math.floor(gap / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((gap / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((gap / (1000 * 60)) % 60),
    seconds: Math.floor((gap / 1000) % 60),
  };
};

const CountCell = ({ label, value }) => {
  const display = String(value).padStart(2, '0');

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(168,85,247,0.20)' }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="relative overflow-hidden rounded-2xl border border-brand-100 bg-white p-5 text-center shadow-card"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-400 to-indigo-400 rounded-t-2xl" />
      <p className="text-4xl font-extrabold text-neutral-900 sm:text-5xl tabular-nums tracking-tight">
        {display}
      </p>
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-brand-500">
        {label}
      </p>
    </motion.div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateRemainingTime(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateRemainingTime(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const values = useMemo(() => [
    { label: 'Days',    value: timeLeft.days    },
    { label: 'Hours',   value: timeLeft.hours   },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ], [timeLeft]);

  return (
    <section id="countdown" className="relative py-20">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <motion.div
          initial={{ y: 28 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '200px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 to-indigo-50 p-8 shadow-card sm:p-12"
        >
          {/* Large background brand glyph */}
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-100/60 blur-3xl pointer-events-none" />
          <div className="absolute -left-8 -bottom-8 h-48 w-48 rounded-full bg-indigo-100/50 blur-2xl pointer-events-none" />

          <div className="relative mb-10 text-center">
            <div className="mb-4 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700 shadow-sm">
                <Rocket size={13} className="text-brand-500" />
                Countdown To Launch
              </span>
            </div>
            <h3 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
              We Go{' '}
              <span className="gradient-text">Live Soon</span>
            </h3>
            <p className="mt-3 text-sm text-neutral-500">
              Mark your calendar — something big is coming.
            </p>
          </div>

          <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-4">
            {values.map((item) => (
              <CountCell key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CountdownTimer;