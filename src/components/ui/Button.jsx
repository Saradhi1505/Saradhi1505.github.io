import { motion } from 'framer-motion';

const base =
  'inline-flex items-center justify-center gap-2 font-medium select-none transition-colors duration-200 focus-visible:outline-none';

const variants = {
  primary: 'bg-clay text-[var(--color-accent-text)] hover:bg-clay-hover',
  secondary: 'bg-transparent text-ink border border-hairline hover:bg-surface-soft',
  ghost: 'bg-transparent text-ink-muted hover:text-ink hover:bg-surface-soft',
};

const sizes = {
  md: 'px-5 py-2.5 text-sm rounded-2xl',
  lg: 'px-7 py-3.5 text-base rounded-2xl',
};

/**
 * Button with a Material-You-flavored spring press: scales down on tap,
 * corner radius softens slightly on press to suggest a squish/morph rather
 * than a flat linear click.
 */
export function Button({
  as = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const Component = motion[as] ?? motion.button;

  return (
    <Component
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96, borderRadius: '1.4rem' }}
      transition={{ type: 'spring', stiffness: 420, damping: 22 }}
      {...props}
    >
      {children}
    </Component>
  );
}
