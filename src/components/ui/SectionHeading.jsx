import { motion } from 'framer-motion';

export function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <motion.div
      className={`flex flex-col gap-3 max-w-2xl ${alignClass}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && (
        <span className="text-sm font-medium tracking-wide uppercase text-clay">{eyebrow}</span>
      )}
      <h2 className="text-3xl sm:text-4xl font-semibold text-ink">{title}</h2>
      {description && <p className="text-ink-muted text-base sm:text-lg leading-relaxed">{description}</p>}
    </motion.div>
  );
}
