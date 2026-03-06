import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Send, CheckCircle2, Sparkles } from 'lucide-react';

const PERKS = [
  'Early access before public launch',
  'Roadmap updates & release notes',
  'Exclusive founder pricing',
];

const EmailSignup = () => {
  const [email,   setEmail]   = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEmail('');
    }, 600);
  };

  return (
    <section id="signup" className="relative py-24">
      <div className="absolute inset-0 section-stripe pointer-events-none" />
      <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8">
        <motion.div
          initial={{ y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '200px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-brand-100 bg-white p-8 shadow-card-hover sm:p-12"
        >
          {/* BG glow blobs */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-100/70 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-indigo-100/60 blur-3xl pointer-events-none" />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Left copy */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700 shadow-sm mb-5">
                <Sparkles size={12} className="text-brand-500" />
                Early Access
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                Be First to{' '}
                <span className="gradient-text">Access FormSync</span>
              </h2>
              <p className="mt-4 text-base text-neutral-500 leading-relaxed">
                Join the launch list for early access, roadmap updates, and exclusive founder pricing.
              </p>
              <ul className="mt-6 space-y-3">
                {PERKS.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-neutral-600">
                    <CheckCircle2 size={16} className="text-brand-500 flex-shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right form */}
            <div>
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 320, delay: 0.1 }}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100"
                    >
                      <CheckCircle2 size={28} className="text-emerald-600" />
                    </motion.div>
                    <p className="text-lg font-semibold text-emerald-800">You are on the list!</p>
                    <p className="text-sm text-emerald-600">We will reach out the moment we launch.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6 shadow-card"
                  >
                    <label className="mb-4 block">
                      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Work Email
                      </span>
                      <div className="relative">
                        <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-10 pr-4 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 shadow-sm"
                        />
                      </div>
                    </label>

                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: '0 0 32px rgba(168,85,247,0.35)' }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={loading}
                      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-70 transition-opacity"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            className="inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                          />
                        ) : (
                          <Send size={15} />
                        )}
                        {loading ? 'Joining...' : 'Notify Me at Launch'}
                      </span>
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        style={{ backgroundSize: '200% 100%' }}
                        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                    </motion.button>

                    <p className="mt-3 text-center text-xs text-neutral-400">No spam, ever. Unsubscribe anytime.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailSignup;