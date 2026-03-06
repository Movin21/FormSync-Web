import { motion } from 'framer-motion';

const SectionWrapper = ({ id, title, subtitle, children, stripe = false }) => {
  return (
    <section id={id} className={`relative py-20 sm:py-24 ${stripe ? 'section-stripe' : 'bg-white'}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-12 text-center"
          >
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-500 sm:text-base">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;