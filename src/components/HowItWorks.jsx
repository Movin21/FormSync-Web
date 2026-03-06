import { motion } from 'framer-motion';
import { ArrowRight, Code2, Cpu, UploadCloud } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Define Your Schema',
    description: 'Describe entities, validation constraints, and business contracts in one structured JSON schema.',
    icon: Code2,
    color: 'from-brand-500 to-indigo-500',
    bg: 'bg-brand-50',
  },
  {
    step: '02',
    title: 'Generate Full-Stack Code',
    description: 'FormSync converts your schema into frontend forms, backend APIs, DTOs, and test-ready code artifacts.',
    icon: Cpu,
    color: 'from-indigo-500 to-violet-500',
    bg: 'bg-indigo-50',
  },
  {
    step: '03',
    title: 'Deploy Instantly',
    description: 'Push production-ready outputs into your pipeline and launch with complete confidence.',
    icon: UploadCloud,
    color: 'from-violet-500 to-brand-500',
    bg: 'bg-violet-50',
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="relative py-24 bg-white">
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '200px' }}
        transition={{ duration: 0.55 }}
        className="mb-16 text-center"
      >
        <span className="inline-block rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700 shadow-sm mb-4">
          How It Works
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
          From Schema to{' '}
          <span className="gradient-text">Shipped Software</span>
        </h2>
        <p className="mt-4 text-base text-neutral-500">
          Three clean steps to go from an idea to production-ready code.
        </p>
      </motion.div>

      {/* Steps — flex row with arrow connectors between cards */}
      <div className="flex flex-col md:flex-row items-stretch gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.step} className="flex flex-col md:flex-row items-stretch flex-1 gap-4">
              {/* Arrow connector between steps (desktop only) */}
              {index > 0 && (
                <div className="hidden md:flex items-center justify-center flex-none w-8 self-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-px w-6 bg-gradient-to-r from-brand-200 to-indigo-300" />
                    <ArrowRight size={14} className="text-brand-300 -mt-0.5" />
                  </div>
                </div>
              )}

              {/* Mobile connector (vertical) */}
              {index > 0 && (
                <div className="md:hidden flex justify-center -my-1">
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="w-px h-4 bg-gradient-to-b from-brand-200 to-indigo-300" />
                    <ArrowRight size={12} className="text-brand-300 rotate-90" />
                  </div>
                </div>
              )}

              {/* Card */}
              <motion.div
                className="flex-1"
                initial={{ y: 24 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '200px' }}
                transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="group relative h-full rounded-2xl border border-neutral-100 bg-white p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200">
                  {/* Top gradient bar on hover */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Step number + icon row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-200 bg-white shadow-sm">
                      <span className="text-xs font-extrabold text-brand-600">{step.step}</span>
                    </div>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.bg}`}>
                      <Icon size={20} className="text-brand-600" />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-neutral-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">{step.description}</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default HowItWorks;
