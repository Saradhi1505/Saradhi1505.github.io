import { motion } from 'framer-motion';
import { skillGroups } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { SkillBadge } from '../ui/SkillBadge';

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-surface-soft/40">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I build with"
          description="A working toolkit spanning core languages, computer vision & ML frameworks, AI-assisted development, and engineering practices."
        />

        <div className="mt-12 flex flex-col gap-10">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: gi * 0.05 }}
            >
              <h3 className="text-sm font-medium tracking-wide uppercase text-ink-faint mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, si) => (
                  <SkillBadge key={skill} label={skill} index={si} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
