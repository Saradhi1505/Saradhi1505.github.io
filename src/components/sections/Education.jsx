import { motion } from 'framer-motion';
import { educationHistory } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { EducationPath } from '../education/EducationPath';

// Evenly space 4 stages down the path (t = progress 0-1) and pick
// approximate (x, y) points along the PATH_D curve in EducationPath for
// the marker pins. Values eyeballed against the curve's control points.
const STAGE_MARKERS = [
  { t: 0.18, point: { x: 100, y: 190 } }, // M.Tech (upcoming) - top
  { t: 0.4, point: { x: 90, y: 400 } }, // B.Tech
  { t: 0.62, point: { x: 100, y: 620 } }, // Intermediate
  { t: 0.84, point: { x: 100, y: 840 } }, // 10th class - bottom
];

function EducationCard({ item, align = 'left' }) {
  const alignClass = align === 'right' ? 'sm:ml-auto sm:text-right' : 'sm:mr-auto';

  return (
    <motion.div
      className={`w-full max-w-md p-6 sm:p-7 rounded-3xl border border-hairline bg-surface-elevated shadow-[var(--shadow-elevated)] ${alignClass}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`flex flex-wrap items-center gap-3 mb-3 ${
          align === 'right' ? 'sm:justify-end' : 'justify-between'
        }`}
      >
        <h3 className="text-lg sm:text-xl font-semibold text-ink">{item.degree}</h3>
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium shrink-0 ${
            item.status === 'Upcoming'
              ? 'bg-surface-soft text-ink-muted border border-hairline'
              : 'bg-clay-soft text-clay'
          }`}
        >
          {item.status}
        </span>
      </div>
      <p className="text-ink-muted mb-1">{item.school}</p>
      <p className="text-sm text-ink-faint mb-1">
        {item.period}
        {item.cgpa ? ` · ${item.cgpa}` : ''}
      </p>
      {item.board && <p className="text-xs text-ink-faint mb-4">{item.board}</p>}
      {item.coursework && (
        <div className={`flex flex-wrap gap-2 ${align === 'right' ? 'sm:justify-end' : ''}`}>
          {item.coursework.map((c) => (
            <span
              key={c}
              className="text-xs px-2.5 py-1 rounded-lg bg-surface-soft text-ink-faint border border-hairline"
            >
              {c}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function Education() {
  return (
    <section
      id="education"
      className="relative py-24 sm:py-32 bg-surface-soft/40 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8 mb-4">
        <SectionHeading
          eyebrow="Education"
          title="Where it started — and where it's headed"
          description="A grounded, earthy contrast to the cosmic sections above — scroll to trace the path, from 10th class through my upcoming M.Tech."
        />
      </div>

      {/* Tall wrapper gives the scroll-scrub room to breathe; the SVG road
          spans this full height and "draws" as the user scrolls through it.
          Cards alternate left/right down the page, roughly tracking the
          road's curve and the marker positions passed to EducationPath. */}
      <EducationPath markers={STAGE_MARKERS}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 flex flex-col gap-24 sm:gap-32 py-8">
          <EducationCard item={educationHistory[0]} align="left" />
          <EducationCard item={educationHistory[1]} align="right" />
          <EducationCard item={educationHistory[2]} align="left" />
          <EducationCard item={educationHistory[3]} align="right" />
        </div>
      </EducationPath>
    </section>
  );
}
