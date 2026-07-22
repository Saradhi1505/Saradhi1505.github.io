import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../data/content';
import { Button } from '../ui/Button';
import { CosmicSceneBoundary } from '../3d/CosmicSceneBoundary';
import { ProfilePhoto } from '../ui/ProfilePhoto';

const CosmicScene = lazy(() =>
  import('../3d/CosmicScene').then((m) => ({ default: m.CosmicScene }))
);

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-16"
    >
      {/* Cosmic 3D backdrop - absolutely positioned behind content, lazy loaded,
          wrapped in an error boundary that falls back to a CSS gradient. */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <CosmicSceneBoundary>
          <Suspense fallback={<div className="w-full h-full cosmic-fallback" />}>
            <CosmicScene />
          </Suspense>
        </CosmicSceneBoundary>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-8 items-center">
          {/* Text column */}
          <div className="max-w-2xl order-2 lg:order-2">
            {/* <motion.p
              className="text-clay text-sm sm:text-base font-medium tracking-wide uppercase mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {profile.status}
            </motion.p> */}

            <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] mb-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-clay">Pardha Saradhi</span>{' '}
              <span className="text-ink">Alapati</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-ink-muted mb-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.44 }}
            >
              {profile.title}
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-ink-faint mb-9 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.54 }}
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.66 }}
            >
              <Button as="a" href="#projects" variant="primary" size="lg">
                View Projects
              </Button>
              <Button as="a" href={profile.resumeHref} download variant="secondary" size="lg">
                Download Resume
              </Button>
              <Button as="a" href="#contact" variant="ghost" size="lg">
                Contact Me
              </Button>
            </motion.div>
          </div>

          {/* Photo column */}
          <motion.div
            className="order-1 lg:order-1 flex justify-center lg:justify-start"
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProfilePhoto size="lg" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
