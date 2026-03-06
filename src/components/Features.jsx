import { motion } from 'framer-motion';
import {
  Bot,
  Boxes,
  FlaskConical,
  Link2,
  Network,
  Rocket,
} from 'lucide-react';

const features = [
  {
    title: 'AI-Enhanced Schema Engine',
    description: 'Semantic validation and enrichment that transforms raw schemas into production-grade architecture.',
    icon: Bot,
    color: 'from-brand-500 to-brand-700',
    bg: 'bg-brand-50',
    border: 'border-brand-100',
  },
  {
    title: 'Full-Stack Code Generation',
    description: 'Create frontend forms, backend APIs, DTOs, and service layers from one source of truth.',
    icon: Boxes,
    color: 'from-indigo-500 to-indigo-700',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
  },
  {
    title: 'Auto Test Case Generation',
    description: 'Produce validation and integration test scaffolding automatically with schema-aware edge coverage.',
    icon: FlaskConical,
    color: 'from-violet-500 to-violet-700',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    title: 'Runtime Binding Engine',
    description: 'Bind schema contracts to runtime services with robust mapping and extensible processing hooks.',
    icon: Link2,
    color: 'from-purple-500 to-indigo-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
  {
    title: 'Microservices Ready',
    description: 'Designed for distributed systems with clean boundaries, reusable contracts, and scale-ready patterns.',
    icon: Network,
    color: 'from-brand-400 to-indigo-500',
    bg: 'bg-brand-50',
    border: 'border-brand-100',
  },
  {
    title: 'DevOps Friendly',
    description: 'Accelerate CI/CD with predictable outputs and project scaffolds optimized for deployment workflows.',
    icon: Rocket,
    color: 'from-indigo-400 to-brand-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { y: 22 },
  show:   { y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const Features = () => (
  <section id="features" className="relative py-24">
    {/* Stripe bg */}
    <div className="absolute inset-0 section-stripe pointer-events-none" />

    <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '200px' }}
        transition={{ duration: 0.55 }}
        className="mb-16 text-center"
      >
        <span className="inline-block rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700 shadow-sm mb-4">
          Features
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
          Built For Teams{' '}
          <span className="gradient-text">Shipping Fast</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-500">
          FormSync removes repetitive plumbing so your team can focus on product logic, not boilerplate.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '200px' }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <motion.article
              key={f.title}
              variants={item}
              whileHover={{ y: -8, boxShadow: '0 16px 48px rgba(168,85,247,0.15)' }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className={`group relative overflow-hidden rounded-2xl border ${f.border} bg-white p-6 shadow-card transition-shadow`}
            >
              {/* Top gradient bar on hover */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className={`mb-5 inline-flex rounded-xl ${f.bg} p-3`}>
                <div className={`bg-gradient-to-br ${f.color} bg-clip-text`}>
                  <Icon size={22} className="text-brand-600" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-neutral-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">{f.description}</p>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export default Features;