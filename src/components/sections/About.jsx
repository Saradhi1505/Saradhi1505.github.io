import { motion } from 'framer-motion';
import { profile, stats } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { StatCounter } from '../ui/StatCounter';
import { ProfilePhoto } from '../ui/ProfilePhoto';

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="About" title="A little about my work" />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 sm:gap-10 items-start">
          <motion.div
            className="flex justify-center sm:justify-start"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProfilePhoto size="md" src={profile.aboutImage} />
          </motion.div>

          <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-3xl">
            {profile.bio}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
