
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

export function initHero(activeScenes, isMobile, sharedContext) {
    const heroCanvas = document.getElementById('hero-canvas');
    if (!heroCanvas) return;
    
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0d0d0d, 0.001);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: !isMobile });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 400;

    const particleCount = isMobile ? 80 : 250;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
      velocities.push({
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.5
      });
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xFF6B2B,
      size: 3,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x444444,
      transparent: true,
      opacity: 0.2
    });
    const linesMesh = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial);
    scene.add(linesMesh);

    sharedContext.heroRender = function() {
        if (!isMobile) {
          camera.position.x += (sharedContext.mouseX - camera.position.x) * 0.02;
          camera.position.y += (-sharedContext.mouseY - camera.position.y) * 0.02;
        }
        camera.lookAt(scene.position);
        
        const posAttr = particles.geometry.attributes.position.array;
        let linePositions = [];
        for (let i = 0; i < particleCount; i++) {
          posAttr[i*3] += velocities[i].x;
          posAttr[i*3+1] += velocities[i].y;
          posAttr[i*3+2] += velocities[i].z;
          
          if(posAttr[i*3] < -500 || posAttr[i*3] > 500) velocities[i].x *= -1;
          if(posAttr[i*3+1] < -500 || posAttr[i*3+1] > 500) velocities[i].y *= -1;
          if(posAttr[i*3+2] < -500 || posAttr[i*3+2] > 500) velocities[i].z *= -1;
          
          if (!isMobile) {
            for (let j = i + 1; j < particleCount; j++) {
              const dx = posAttr[i*3] - posAttr[j*3];
              const dy = posAttr[i*3+1] - posAttr[j*3+1];
              const dz = posAttr[i*3+2] - posAttr[j*3+2];
              const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
              if (dist < 120) {
                linePositions.push(
                  posAttr[i*3], posAttr[i*3+1], posAttr[i*3+2],
                  posAttr[j*3], posAttr[j*3+1], posAttr[j*3+2]
                );
              }
            }
          }
        }
        particles.geometry.attributes.position.needsUpdate = true;
        
        if (!isMobile) {
          linesMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        }
        renderer.render(scene, camera);
    };

    sharedContext.heroResize = function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
}
