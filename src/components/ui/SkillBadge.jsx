import { motion } from 'framer-motion';

/**
 * A single skill tag. Hover/tap feedback uses a spring transition rather
 * than linear easing, plus a subtle background "fill" morph, echoing
 * Material You's state-layer + shape-shift interaction pattern.
 */
export function SkillBadge({ label, index = 0 }) {
  return (
    <motion.span
      className="relative inline-flex items-center px-4 py-2 rounded-xl border border-hairline bg-surface-elevated text-sm text-ink-muted cursor-default overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.5), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.06,
        borderRadius: '0.6rem',
        color: 'var(--color-accent-text)',
        borderColor: 'var(--color-accent)',
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Fill layer that expands from center on hover — Material You "state layer" feel */}
      <motion.span
        className="absolute inset-0 bg-clay -z-10"
        initial={{ scale: 0, borderRadius: '9999px' }}
        whileHover={{ scale: 1.5, borderRadius: '0.6rem' }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      {label}
    </motion.span>
  );
}
