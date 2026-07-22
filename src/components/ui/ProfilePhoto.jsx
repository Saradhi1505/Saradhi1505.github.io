import { useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../data/content';

const sizes = {
  md: 'w-40 h-40 sm:w-48 sm:h-48',
  lg: 'w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80',
};

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

/**
 * Circular profile photo with a soft warm glow ring, matching the cosmic/
 * clay palette. If `profile.profileImage` fails to load (e.g. the file
 * hasn't been added to /public yet), falls back to an initials monogram
 * on a gradient background rather than a broken image icon.
 */
export function ProfilePhoto({ size = 'md', className = '', src = profile.profileImage }) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = getInitials(profile.name);

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      {/* Soft ambient glow behind the photo, echoing the cosmic orb color */}
      <div
        className="absolute -inset-4 rounded-full blur-2xl opacity-40 -z-10"
        style={{
          background: 'radial-gradient(circle, var(--cosmic-orb-a) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden border-4 border-[var(--color-bg-elevated)] shadow-[var(--shadow-elevated)]"
        style={{ outline: '2px solid var(--color-accent)', outlineOffset: '6px' }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        {!imgFailed ? (
          <img
            src={src}
            alt={`Portrait of ${profile.name}`}
            className="w-full h-full object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl font-semibold font-[var(--font-display)]"
            style={{
              background: 'linear-gradient(135deg, var(--cosmic-orb-a), var(--cosmic-orb-b))',
              color: 'var(--color-accent-text)',
            }}
            role="img"
            aria-label={`Portrait placeholder for ${profile.name}`}
          >
            {initials}
          </div>
        )}
      </motion.div>
    </div>
  );
}
