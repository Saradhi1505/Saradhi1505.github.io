import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * A single layer of drifting star points. Multiple layers at different
 * depths/sizes create cheap parallax without extra geometry complexity.
 *
 * Particle count starts intentionally low (see `count` default) per the
 * build instructions — increase only after confirming smooth performance.
 */
export function Starfield({
  count = 600,
  radius = 9,
  size = 0.045,
  color = '#f3ede6',
  driftSpeed = 0.015,
  parallaxStrength = 0.15,
  mouse,
}) {
  const pointsRef = useRef(null);
  const { viewport } = useThree();

  // Generate positions once; memoized so we never re-allocate on re-render.
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute inside a sphere shell for a natural starfield spread.
      const r = radius * (0.4 + Math.random() * 0.6);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color,
        size,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      }),
    [color, size]
  );

  // Dispose GPU resources on unmount to avoid memory leaks across re-renders.
  useMemo(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    // Slow ambient rotation — the "drift".
    pointsRef.current.rotation.y += driftSpeed * delta;
    pointsRef.current.rotation.x += driftSpeed * 0.3 * delta;

    // Gentle parallax toward mouse position, eased rather than snapping.
    if (mouse) {
      const targetX = (mouse.current.x * viewport.width) / 2 * parallaxStrength;
      const targetY = (mouse.current.y * viewport.height) / 2 * parallaxStrength;
      pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.02;
      pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.02;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
