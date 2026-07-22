import { useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Starfield } from './Starfield';
import { GlowOrb } from './GlowOrb';
import { Constellation } from './Constellation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

function SceneContents({ mouse, isMobile, reducedMotion }) {
  // Particle counts start low per build instructions; scaled down further
  // on mobile. These numbers stay comfortably under the "start under
  // 500-800" guidance even on desktop.
  const starCount = isMobile ? 260 : 520;

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 2, 4]} intensity={1.1} color="#e8a87c" />

      <Starfield
        count={starCount}
        radius={9}
        size={isMobile ? 0.05 : 0.045}
        driftSpeed={reducedMotion ? 0 : 0.015}
        parallaxStrength={isMobile ? 0.05 : 0.15}
        mouse={mouse}
      />

      {!isMobile && <Constellation count={18} radius={5} maxDistance={2.2} />}

      <GlowOrb position={isMobile ? [1.2, 0.2, -1.2] : [2.2, 0.3, -1.5]} />
    </>
  );
}

export function CosmicScene() {
  const mouse = useRef({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const handlePointerMove = useCallback(
    (e) => {
      if (reducedMotion) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current = { x, y };
    },
    [reducedMotion]
  );

  // Fully static: honor prefers-reduced-motion by skipping the animated
  // canvas altogether and showing the CSS gradient fallback instead.
  if (reducedMotion) {
    return <div className="w-full h-full cosmic-fallback" />;
  }

  return (
    <div className="w-full h-full" onPointerMove={handlePointerMove}>
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]} // cap devicePixelRatio for perf
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <SceneContents mouse={mouse} isMobile={isMobile} reducedMotion={reducedMotion} />

        {/* Drag-to-orbit only on desktop; disabled on mobile to keep touch
            scroll working normally and to limit interaction complexity. */}
        {!isMobile && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate
            autoRotate={false}
            rotateSpeed={0.25}
            minPolarAngle={Math.PI / 2 - 0.4}
            maxPolarAngle={Math.PI / 2 + 0.4}
            minAzimuthAngle={-0.5}
            maxAzimuthAngle={0.5}
          />
        )}
      </Canvas>
    </div>
  );
}
