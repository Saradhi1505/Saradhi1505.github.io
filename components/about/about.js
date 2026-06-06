
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

export function initAbout(activeScenes, sharedContext) {
    const aboutCanvas = document.getElementById('about-canvas');
    if (!aboutCanvas) return;
    const aboutContainer = document.querySelector('.about-canvas-container');
  if (!aboutContainer) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, aboutContainer.clientWidth / aboutContainer.clientHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas: aboutCanvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(aboutContainer.clientWidth, aboutContainer.clientHeight);
    camera.position.z = 5;

    const coreGeometry = new THREE.IcosahedronGeometry(1.5, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      wireframe: true,
      emissive: 0xFF6B2B,
      emissiveIntensity: 0.2,
    });
    const coreObject = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreObject);

    const innerGeometry = new THREE.IcosahedronGeometry(0.8, 0);
    const innerMaterial = new THREE.MeshPhongMaterial({
      color: 0xFF6B2B,
      shininess: 100,
    });
    const innerObject = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerObject);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    sharedContext.aboutRender = function(elapsedTime) {
        coreObject.rotation.y += 0.005;
        coreObject.rotation.x += 0.002;
        innerObject.rotation.y -= 0.01;
        
        coreObject.rotation.x += (sharedContext.targetY - coreObject.rotation.x) * 0.05;
        coreObject.rotation.y += (sharedContext.targetX - coreObject.rotation.y) * 0.05;
        
        const scale = 1 + Math.sin(elapsedTime * 2) * 0.05;
        innerObject.scale.set(scale, scale, scale);
        coreMaterial.emissiveIntensity = 0.2 + Math.sin(elapsedTime * 3) * 0.1;
        
        renderer.render(scene, camera);
    };

    sharedContext.aboutResize = function() {
      const aboutW = aboutContainer.clientWidth;
      const aboutH = aboutContainer.clientHeight;
      if(aboutW > 0 && aboutH > 0) {
        camera.aspect = aboutW / aboutH;
        camera.updateProjectionMatrix();
        renderer.setSize(aboutW, aboutH);
      }
    };
}
