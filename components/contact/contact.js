import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/OrbitControls.js';

export function initMagneticButtons() {
    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
      });
    });
}

export function initContactGlobe(activeScenes, sharedContext) {
    const canvas = document.getElementById('contact-globe-canvas');
    if (!canvas) return;
    const container = document.querySelector('.contact-globe-container');
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Add OrbitControls for interactive rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // Prevent scrolling from zooming the globe
    controls.enablePan = false;  // Prevent dragging the globe off-center
    controls.enableRotate = true; // Allow free rotation
    controls.enableDamping = true; // Smooth inertia
    controls.dampingFactor = 0.05;

    // Create nested groups to perfectly handle Earth's axial tilt
    const globeTiltGroup = new THREE.Group();
    const globeSpinGroup = new THREE.Group();
    globeTiltGroup.add(globeSpinGroup);
    scene.add(globeTiltGroup);

    const globeRadius = 8; // Made slightly smaller

    // 2. The Continents (Custom Shader using Specular Map)
    const earthGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    
    const earthMat = new THREE.ShaderMaterial({
        uniforms: {
            map: { value: null },
            landColor: { value: new THREE.Color(0x00aaff) }, // Bright Cyan/Blue Continents
            oceanColor: { value: new THREE.Color(0x001133) } // Deep blue transparent oceans
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D map;
            uniform vec3 landColor;
            uniform vec3 oceanColor;
            varying vec2 vUv;
            
            void main() {
                vec4 texColor = texture2D(map, vUv);
                float isOcean = texColor.r; 
                if (isOcean > 0.1) {
                    gl_FragColor = vec4(oceanColor, 0.15); 
                } else {
                    gl_FragColor = vec4(landColor, 0.95);
                }
            }
        `,
        transparent: true
    });
    
    const earthSphere = new THREE.Mesh(earthGeo, earthMat);
    globeSpinGroup.add(earthSphere);

    // Load specular map
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg', (texture) => {
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        earthMat.uniforms.map.value = texture;
    });

    // 3. Vijayawada Pin
    function getCoordinates(lat, lon, radius) {
        const u = (lon + 180) / 360;
        const v = (90 - lat) / 180;
        const phi = u * 2 * Math.PI;
        const theta = v * Math.PI;

        const x = - radius * Math.cos(phi) * Math.sin(theta);
        const y = radius * Math.cos(theta);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        return new THREE.Vector3(x, y, z);
    }

    const vjaCoords = getCoordinates(16.5062, 80.6480, globeRadius * 1.02);

    const pinGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const pin = new THREE.Mesh(pinGeo, pinMat);
    pin.position.copy(vjaCoords);
    globeSpinGroup.add(pin);

    const haloGeo = new THREE.RingGeometry(0.4, 0.7, 32);
    const haloMat = new THREE.MeshBasicMaterial({ 
        color: 0xFF6B2B,
        side: THREE.DoubleSide, 
        transparent: true, 
        opacity: 0.9 
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.copy(vjaCoords);
    halo.lookAt(new THREE.Vector3(0,0,0)); 
    globeSpinGroup.add(halo);

    // Tilt the globe downwards slightly to perfectly center the location vertically
    globeTiltGroup.rotation.z = 0;
    globeTiltGroup.rotation.x = 10 * (Math.PI / 180);

    // Exact starting rotation to center on India
    // Camera is naturally facing Longitude -90. We want it to face Longitude 80.6480 (India).
    // Difference is -170.6480 degrees.
    globeSpinGroup.rotation.y = -170.6480 * (Math.PI / 180);

    const targetCameraPos = new THREE.Vector3(0, 0, 25);
    let isReturning = false;
    let interactionTimeout;

    controls.addEventListener('start', () => {
        clearTimeout(interactionTimeout);
        isReturning = false;
    });

    controls.addEventListener('end', () => {
        // Wait 2 seconds after the user stops dragging before returning
        interactionTimeout = setTimeout(() => {
            isReturning = true;
        }, 2000);
    });

    sharedContext.contactRender = function(elapsedTime) {
        
        // Return to India smoothly if user is idle
        if (isReturning) {
            // Lerp the position
            camera.position.lerp(targetCameraPos, 0.015);
            // Normalize to keep it perfectly on the sphere's surface (no zoom-in effect)
            camera.position.normalize().multiplyScalar(25);
            
            // Stop returning if we are very close to the target
            if (camera.position.distanceTo(targetCameraPos) < 0.1) {
                camera.position.copy(targetCameraPos);
                isReturning = false;
            }
        }
        
        // Pulse the halo
        const scale = 1 + Math.sin(elapsedTime * 4) * 0.5;
        halo.scale.set(scale, scale, 1);
        haloMat.opacity = 1 - (scale - 1) * 2;

        controls.update(); // Required for damping/inertia

        renderer.render(scene, camera);
    };

    sharedContext.contactResize = function() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w > 0 && h > 0) {
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }
    };
}
