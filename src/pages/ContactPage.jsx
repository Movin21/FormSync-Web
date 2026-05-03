import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, MapPin, Send, CheckCircle2, AlertCircle, Github, Loader2, Phone,
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID         = 'service_h3n5fkq';
const EMAILJS_TEMPLATE_NOTIFY    = 'template_38mfjzt';          // → sliitformgen@gmail.com
const EMAILJS_TEMPLATE_AUTOREPLY = 'template_m35d68o'; // → sender's email
const EMAILJS_PUBLIC_KEY         = '16jXY_I-ZrhtIEj0-';

/* ─── Phone numbers ─────────────────────────────────────────────── */
const PHONES = [
  '+94 (70) 208 1860',
  '+94 (71) 467 1906',
  '+94 (71) 350 5391',
  '+94 (72) 699 8321',
];

/* ─── Contact info ──────────────────────────────────────────────── */
const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sliitformgen@gmail.com',
    href: 'mailto:sliitformgen@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Institution',
    value: 'SLIIT, Malabe, Sri Lanka',
    href: 'https://maps.google.com/?q=SLIIT+Malabe',
  },
  {
    icon: Github,
    label: 'GitHub Repository',
    value: 'github.com/YasasLakmina/FormSync',
    href: 'https://github.com/YasasLakmina/FormSync',
  },
];

/* ─── Form field ────────────────────────────────────────────────── */
const Field = ({ label, id, error, children }) => (
  <div>
    <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
      {label}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          key={error}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-1 text-xs text-red-600 flex items-center gap-1"
        >
          <AlertCircle size={11} />{error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const inputCls = (err) =>
  `w-full px-4 py-3 rounded-xl border text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 transition ${
    err
      ? 'border-red-300 bg-red-50/30 focus:ring-red-200 focus:border-red-400'
      : 'border-neutral-200 bg-white focus:ring-brand-200 focus:border-brand-400'
  }`;

/* ─── Page ──────────────────────────────────────────────────────── */
const ContactPage = () => {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState('idle'); // idle | sending | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim())                        e.name    = 'Name is required.';
    if (!form.email.trim())                       e.email   = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.subject.trim())                     e.subject = 'Subject is required.';
    if (!form.message.trim())                     e.message = 'Message is required.';
    else if (form.message.trim().length < 20)     e.message = 'Message must be at least 20 characters.';
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
    if (errors[e.target.id]) setErrors((er) => ({ ...er, [e.target.id]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('sending');
    const common = {
      from_name:  form.name,
      from_email: form.email,
      subject:    form.subject,
      message:    form.message,
    };
    Promise.all([
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_NOTIFY,    { ...common, to_email: 'sliitformgen@gmail.com' }, EMAILJS_PUBLIC_KEY),
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_AUTOREPLY, { ...common, to_email: form.email },               EMAILJS_PUBLIC_KEY),
    ]).then(() => {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }).catch(() => {
      setStatus('error');
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-stripe py-16 border-b border-brand-100/60">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-block rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700 shadow-sm mb-4">
              Get In Touch
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-500">
              Have a question about the research? Want to collaborate or provide feedback? Reach out to us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 grid lg:grid-cols-5 gap-10">

          {/* Left — contact info */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
            >
              <h2 className="text-xl font-bold text-neutral-900 mb-2">Contact Information</h2>
              <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                We're a research group at SLIIT. Feel free to reach out for academic enquiries, 
                collaboration opportunities, or feedback on our work.
              </p>
            </motion.div>

            {CONTACT_INFO.map(({ icon: Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.08, duration: 0.45 }}
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 p-4 rounded-xl border border-neutral-200 bg-white hover:border-brand-200 hover:bg-brand-50/40 transition-colors group shadow-card"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-100 transition-colors">
                  <Icon size={16} className="text-brand-600" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">{label}</p>
                  <p className="text-sm font-medium text-neutral-800 mt-0.5">{value}</p>
                </div>
              </motion.a>
            ))}

            {/* Phone numbers */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + CONTACT_INFO.length * 0.08, duration: 0.45 }}
              className="flex items-start gap-3 p-4 rounded-xl border border-neutral-200 bg-white shadow-card"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
                <Phone size={16} className="text-brand-600" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Phone</p>
                <div className="space-y-1">
                  {PHONES.map((num) => (
                    <a
                      key={num}
                      href={`tel:${num.replace(/\s|\(|\)|-/g, '')}`}
                      className="block text-sm font-medium text-neutral-800 hover:text-brand-600 transition-colors"
                    >
                      {num}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-card overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-brand-500 to-indigo-600" />
              <div className="p-6 sm:p-8">
                <h2 className="text-lg font-bold text-neutral-900 mb-6">Send a Message</h2>

                {/* Success state */}
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center"
                      >
                        <CheckCircle2 size={28} className="text-emerald-500" />
                      </motion.div>
                      <div>
                        <h3 className="text-base font-bold text-neutral-900">Message Sent!</h3>
                        <p className="text-sm text-neutral-500 mt-1">Thank you for reaching out. We'll get back to you soon.</p>
                      </div>
                      <button
                        onClick={() => setStatus('idle')}
                        className="mt-2 px-5 py-2 rounded-full border border-brand-200 bg-brand-50 text-brand-700 text-sm font-semibold hover:bg-brand-100 transition-colors"
                      >
                        Send Another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Field label="Full Name" id="name" error={errors.name}>
                          <input
                            id="name"
                            type="text"
                            placeholder="Yasas Rajapakshe"
                            value={form.name}
                            onChange={handleChange}
                            className={inputCls(errors.name)}
                          />
                        </Field>
                        <Field label="Email Address" id="email" error={errors.email}>
                          <input
                            id="email"
                            type="email"
                            placeholder="yasas@example.com"
                            value={form.email}
                            onChange={handleChange}
                            className={inputCls(errors.email)}
                          />
                        </Field>
                      </div>
                      <Field label="Subject" id="subject" error={errors.subject}>
                        <input
                          id="subject"
                          type="text"
                          placeholder="Research enquiry / Collaboration"
                          value={form.subject}
                          onChange={handleChange}
                          className={inputCls(errors.subject)}
                        />
                      </Field>
                      <Field label="Message" id="message" error={errors.message}>
                        <textarea
                          id="message"
                          rows={5}
                          placeholder="Write your message here (minimum 20 characters)…"
                          value={form.message}
                          onChange={handleChange}
                          className={`${inputCls(errors.message)} resize-none`}
                        />
                      </Field>
                      {status === 'error' && (
                        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                          <AlertCircle size={15} />
                          Failed to send. Please try again or email us directly.
                        </div>
                      )}
                      <motion.button
                        type="submit"
                        disabled={status === 'sending'}
                        whileHover={status !== 'sending' ? { scale: 1.02, boxShadow: '0 0 32px rgba(168,85,247,0.35)' } : {}}
                        whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {status === 'sending' ? (
                          <><Loader2 size={15} className="animate-spin" />Sending…</>
                        ) : (
                          <>
                            <Send size={15} className="transition-transform group-hover:translate-x-0.5" />
                            Send Message
                            <motion.span
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              style={{ backgroundSize: '200% 100%' }}
                              animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                            />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
