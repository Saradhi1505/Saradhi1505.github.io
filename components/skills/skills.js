
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

export function initSkills(activeScenes, sharedContext) {
    const skillsCanvas = document.getElementById('skills-canvas');
    if (!skillsCanvas) return;
    const skillsSection = document.getElementById('skills');
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, skillsSection.clientWidth / skillsSection.clientHeight, 1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: skillsCanvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(skillsSection.clientWidth, skillsSection.clientHeight);
    camera.position.set(0, 50, 150);
    camera.lookAt(0, 0, 0);

    const ribbonGeo = new THREE.PlaneGeometry(300, 150, 40, 20);
    const ribbonMat = new THREE.MeshBasicMaterial({
      color: 0xFF6B2B,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbon.rotation.x = -Math.PI / 2;
    scene.add(ribbon);

    sharedContext.skillsRender = function(elapsedTime) {
        const vertices = ribbon.geometry.attributes.position.array;
        for (let i = 0; i < vertices.length; i += 3) {
          const x = vertices[i];
          const y = vertices[i+1];
          vertices[i+2] = Math.sin(x * 0.05 + elapsedTime) * 15 + Math.cos(y * 0.05 + elapsedTime) * 15;
        }
        ribbon.geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
    };

    sharedContext.skillsResize = function() {
      const skillsW = skillsSection.clientWidth;
      const skillsH = skillsSection.clientHeight;
      if(skillsW > 0 && skillsH > 0) {
        camera.aspect = skillsW / skillsH;
        camera.updateProjectionMatrix();
        renderer.setSize(skillsW, skillsH);
      }
    };
}
