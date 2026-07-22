import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Displays a stat value with a count-up animation when scrolled into view.
 * Parses a leading numeric portion out of `value` (handles commas) so it can
 * animate "1,000" -> shows "0" -> "1,000" while keeping any suffix ("+", "%")
 * static and appended.
 */
export function StatCounter({ value, suffix = '', label, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();

  const numericTarget = Number(String(value).replace(/[^0-9.]/g, '')) || 0;
  const isNumeric = /^[0-9,.]+$/.test(value);

  const count = useMotionValue(reducedMotion ? numericTarget : 0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString('en-US'));

  useEffect(() => {
    if (!isInView || !isNumeric || reducedMotion) return;
    const controls = animate(count, numericTarget, {
      duration: 1.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [isInView, numericTarget, isNumeric, reducedMotion, count, delay]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-1 px-6 py-5 rounded-2xl bg-surface-elevated border border-hairline"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-3xl sm:text-4xl font-semibold text-clay font-[var(--font-display)]">
        {isNumeric ? <motion.span>{rounded}</motion.span> : value}
        {suffix}
      </span>
      <span className="text-sm text-ink-muted">{label}</span>
    </motion.div>
  );
}
