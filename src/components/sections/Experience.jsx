import { timeline } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { ExperienceCard } from '../ui/ExperienceCard';

export function Experience() {
  const role = timeline.filter((item) => item.type === 'role');
  const certifications = timeline.filter((item) => item.type === 'certification');

  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-surface-soft/40">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experience & Certifications"
          title="Where I've built and learned"
          description="My internship and professional certifications, presented as standalone cards."
        />

        <div className="mt-14 flex flex-col gap-5">
          {/* Role card(s) - full width */}
          {role.map((item, i) => (
            <ExperienceCard key={item.id} item={item} index={i} featured />
          ))}

          {/* Certification cards - grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {certifications.map((item, i) => (
              <ExperienceCard key={item.id} item={item} index={i + role.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
