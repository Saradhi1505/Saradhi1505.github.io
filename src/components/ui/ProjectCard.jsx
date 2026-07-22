import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.27 7.77 10.77.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5z" />
    </svg>
  );
}

export function ProjectCard({ project, index = 0 }) {
  const reducedMotion = useReducedMotion();

  const cardContent = (
    <motion.div
      className="h-full flex flex-col justify-between rounded-3xl border border-hairline bg-surface-elevated p-6 sm:p-7 shadow-[var(--shadow-soft)]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-xl font-semibold text-ink leading-snug">{project.title}</h3>
          {project.badge && (
            <span className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-clay-soft text-clay font-medium">
              {project.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-ink-faint mb-4">{project.period}</p>
        <p className="text-sm text-ink-muted leading-relaxed mb-5">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-lg bg-surface-soft text-ink-faint border border-hairline"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {project.links.map((link) => (
          <motion.a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-surface-soft text-ink hover:bg-clay hover:text-[var(--color-accent-text)] transition-colors duration-200"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <GithubIcon />
            {link.label}
          </motion.a>
        ))}
        {project.demoHref ? (
          <a
            href={project.demoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium px-4 py-2 rounded-xl border border-hairline text-ink-muted hover:text-ink"
          >
            Live Demo
          </a>
        ) : (
          <span
            className="inline-flex items-center text-sm font-medium px-4 py-2 rounded-xl border border-dashed border-hairline text-ink-faint cursor-not-allowed"
            title="Live demo coming soon"
          >
            Live Demo (soon)
          </span>
        )}
      </div>
    </motion.div>
  );

  // Skip the tilt wrapper entirely for reduced-motion users.
  if (reducedMotion) {
    return <div className="h-full">{cardContent}</div>;
  }

  return (
    <Tilt
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      perspective={1200}
      scale={1.015}
      transitionSpeed={1500}
      glareEnable={false}
      className="h-full"
    >
      {cardContent}
    </Tilt>
  );
}
