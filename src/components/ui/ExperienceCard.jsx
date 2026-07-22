import { motion } from 'framer-motion';

function BriefcaseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function BadgeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
    </svg>
  );
}

/**
 * Standalone card for a single role or certification. No connecting line
 * or shared track — each entry stands on its own within a grid.
 */
export function ExperienceCard({ item, index = 0, featured = false }) {
  const isRole = item.type === 'role';

  return (
    <motion.div
      className={`rounded-3xl border border-hairline bg-surface-elevated p-6 sm:p-7 shadow-[var(--shadow-soft)]`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start gap-4">
        <motion.span
          className={`flex items-center justify-center w-11 h-11 rounded-2xl shrink-0 ${
            isRole
              ? 'bg-clay text-[var(--color-accent-text)]'
              : 'bg-clay-soft text-clay'
          }`}
          whileHover={{ scale: 1.08, rotate: 6 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        >
          {isRole ? <BriefcaseIcon /> : <BadgeIcon />}
        </motion.span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
            <h3 className="text-lg font-semibold text-ink leading-snug">{item.title}</h3>
            {!isRole && (
              <span className="shrink-0 text-xs px-2.5 py-0.5 rounded-full bg-clay-soft text-clay font-medium">
                Certification
              </span>
            )}
          </div>
          <p className="text-sm text-ink-muted mb-1">
            {item.org} {item.location ? `· ${item.location}` : ''}
          </p>
          <p className="text-xs text-ink-faint">{item.period}</p>
        </div>
      </div>

      {item.points && (
        <ul className="flex flex-col gap-2 mt-5">
          {item.points.map((point, pi) => (
            <li key={pi} className="text-sm text-ink-muted leading-relaxed flex gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-clay shrink-0" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
