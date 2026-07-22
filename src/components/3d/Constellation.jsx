import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Draws a handful of faint lines between nearby points in a small,
 * separate star subset — deliberately sparse (not a dense graph) so it
 * reads as a constellation / star-map, not a literal "neural network"
 * visualization (explicitly avoided per design spec).
 */
export function Constellation({ count = 22, radius = 5, color = '#d97757', maxDistance = 2.4 }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < count; i++) {
      const r = radius * (0.5 + Math.random() * 0.5);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pts.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }
    return pts;
  }, [count, radius]);

  const { lineGeometry, dotGeometry } = useMemo(() => {
    const linePositions = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < maxDistance) {
          linePositions.push(
            points[i].x, points[i].y, points[i].z,
            points[j].x, points[j].y, points[j].z
          );
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

    const dotPositions = new Float32Array(points.length * 3);
    points.forEach((p, i) => {
      dotPositions[i * 3] = p.x;
      dotPositions[i * 3 + 1] = p.y;
      dotPositions[i * 3 + 2] = p.z;
    });
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));

    return { lineGeometry: lineGeo, dotGeometry: dotGeo };
  }, [points, maxDistance]);

  const lineMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.15 }),
    [color]
  );
  const dotMaterial = useMemo(
    () => new THREE.PointsMaterial({ color, size: 0.06, transparent: true, opacity: 0.6 }),
    [color]
  );

  useMemo(() => {
    return () => {
      lineGeometry.dispose();
      dotGeometry.dispose();
      lineMaterial.dispose();
      dotMaterial.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <group>
      <lineSegments geometry={lineGeometry} material={lineMaterial} />
      <points geometry={dotGeometry} material={dotMaterial} />
    </group>
  );
}
