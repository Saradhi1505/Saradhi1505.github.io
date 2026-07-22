import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * A soft glowing orb — the hero's focal point. Built from two low-poly
 * icosahedrons: a solid warm-colored core and a slightly larger, more
 * transparent "glow" shell around it (cheap fake-bloom without needing
 * postprocessing passes, which keeps the perf budget low).
 */
export function GlowOrb({ position = [2.2, 0.3, -1.5], colorA = '#d97757', colorB = '#e8a87c' }) {
  const coreRef = useRef(null);
  const glowRef = useRef(null);

  const coreGeometry = useMemo(() => new THREE.IcosahedronGeometry(0.55, 2), []);
  const glowGeometry = useMemo(() => new THREE.IcosahedronGeometry(0.72, 1), []);

  const coreMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: colorA,
        emissive: colorA,
        emissiveIntensity: 0.6,
        roughness: 0.4,
        metalness: 0.1,
      }),
    [colorA]
  );

  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: colorB,
        transparent: true,
        opacity: 0.18,
        side: THREE.BackSide,
      }),
    [colorB]
  );

  // Dispose on unmount.
  useMemo(() => {
    return () => {
      coreGeometry.dispose();
      glowGeometry.dispose();
      coreMaterial.dispose();
      glowMaterial.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.08;
      coreRef.current.rotation.x += delta * 0.03;
    }
    if (glowRef.current) {
      // Very subtle pulse.
      const t = state.clock.elapsedTime;
      const pulse = 1 + Math.sin(t * 0.6) * 0.03;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={position}>
      <mesh ref={coreRef} geometry={coreGeometry} material={coreMaterial} />
      <mesh ref={glowRef} geometry={glowGeometry} material={glowMaterial} />
    </group>
  );
}
