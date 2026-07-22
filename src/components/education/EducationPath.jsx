import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// A winding "mountain road seen from above" path: curves left/right down
// the section. Kept to a modest number of curve points per the build
// instructions (simplify first if it stutters, before debugging timing).
// ViewBox is tall/narrow; coordinates chosen to weave across the width.
const PATH_D = `
  M 100 0
  C 180 60, 40 120, 100 190
  C 160 260, 30 320, 90 400
  C 150 480, 40 540, 100 620
  C 160 700, 40 760, 100 840
  C 150 900, 60 950, 100 1000
`;

function MarkerPin({ point, tValue, smoothProgress, reducedMotion }) {
  const opacity = useTransform(smoothProgress, [tValue - 0.05, tValue + 0.03], [0, 1]);
  const scale = useTransform(smoothProgress, [tValue - 0.05, tValue + 0.05], [0.4, 1]);

  return (
    <motion.g
      style={reducedMotion ? { opacity: 1, scale: 1 } : { opacity, scale }}
      transformBox="fill-box"
      transformOrigin="center"
    >
      <circle
        cx={point.x}
        cy={point.y}
        r="10"
        fill="var(--color-bg)"
        stroke="var(--road-line)"
        strokeWidth="3"
      />
      <circle cx={point.x} cy={point.y} r="4" fill="var(--road-line)" />
    </motion.g>
  );
}

/**
 * `markers`: array of { t: 0-1 progress along path, point: {x, y} in the
 * 200x1000 viewBox coordinate space } — one per education stage, evenly
 * spaced by the caller to roughly track where each stage's card sits.
 */
export function EducationPath({ children, markers = [] }) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.25'],
  });

  // Spring-smooth the raw scroll progress so the line draw feels fluid
  // rather than jittery on fast/trackpad scrolling, while still staying
  // directly tied to scroll position (scrubbed, not autoplaying).
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  const staticProps = useMemo(() => ({ pathLength: 1, opacity: 1 }), []);

  return (
    <div ref={containerRef} className="relative">
      {/* Background SVG road - absolutely positioned, spans the section height */}
      <div className="absolute inset-0 flex justify-center pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 200 1000"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full max-w-md opacity-90"
        >
          {/* Muted base track, always fully visible, for terrain context */}
          <path
            d={PATH_D}
            fill="none"
            stroke="var(--road-line-muted)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.35"
          />

          {/* Animated "traveled" portion, scrubbed to scroll */}
          <motion.path
            d={PATH_D}
            fill="none"
            stroke="var(--road-line)"
            strokeWidth="4"
            strokeLinecap="round"
            style={reducedMotion ? staticProps : { pathLength }}
            initial={false}
          />

          {markers.map((marker) => (
            <MarkerPin
              key={marker.t}
              point={marker.point}
              tValue={marker.t}
              smoothProgress={smoothProgress}
              reducedMotion={reducedMotion}
            />
          ))}
        </svg>
      </div>

      {/* Foreground content, laid over the road */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
