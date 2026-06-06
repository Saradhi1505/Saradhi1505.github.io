
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

// Dynamically load HTML components
async function loadComponent(id, path) {
  const hostEl = document.getElementById(id);
  if (!hostEl) {
    throw new Error(`Placeholder element not found: #${id}`);
  }

  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path} (${response.status} ${response.statusText})`);
  }

  const html = await response.text();
  hostEl.innerHTML = html;
}

const activeScenes = { hero: true, about: false, skills: false };
const sharedContext = {
    mouseX: 0, mouseY: 0,
    targetX: 0, targetY: 0,
    heroRender: null, aboutRender: null, skillsRender: null,
    heroResize: null, aboutResize: null, skillsResize: null
};

async function init() {
  try {
    // Load HTML
    await loadComponent('navbar-placeholder', 'components/navbar/navbar.html');
    await loadComponent('hero-placeholder', 'components/hero/hero.html');
    await loadComponent('about-placeholder', 'components/about/about.html');
    await loadComponent('skills-placeholder', 'components/skills/skills.html');
    await loadComponent('projects-placeholder', 'components/projects/projects.html');
    await loadComponent('certifications-placeholder', 'components/certifications/certifications.html');
    await loadComponent('contact-placeholder', 'components/contact/contact.html');
    await loadComponent('footer-placeholder', 'components/footer/footer.html');

    // Load JS logic
    const { initNavbar } = await import('../components/navbar/navbar.js');
    const { initHero } = await import('../components/hero/hero.js');
    const { initAbout } = await import('../components/about/about.js');
    const { initSkills } = await import('../components/skills/skills.js');
    const { initMagneticButtons } = await import('../components/contact/contact.js');

    initNavbar();
    initMagneticButtons();

    const isMobile = window.innerWidth <= 768;
    initHero(activeScenes, isMobile, sharedContext);
    initAbout(activeScenes, sharedContext);
    initSkills(activeScenes, sharedContext);
  } catch (err) {
    console.error('Portfolio init failed:', err);
    return;
  }

    // Fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, appearOptions);
    fadeElements.forEach(el => appearOnScroll.observe(el));

    // Three.js Intersection Observer
    const sceneObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.target.id === 'hero') activeScenes.hero = entry.isIntersecting;
        if(entry.target.id === 'about') activeScenes.about = entry.isIntersecting;
        if(entry.target.id === 'skills') activeScenes.skills = entry.isIntersecting;
      });
    }, { threshold: 0.1 });
    
    if(document.getElementById('hero')) sceneObserver.observe(document.getElementById('hero'));
    if(document.getElementById('about')) sceneObserver.observe(document.getElementById('about'));
    if(document.getElementById('skills')) sceneObserver.observe(document.getElementById('skills'));

    // Mouse Tracking
    document.addEventListener('mousemove', (e) => {
      sharedContext.mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      sharedContext.mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
      
      if(activeScenes.about) {
        const aboutCanvas = document.getElementById('about-canvas');
        if(aboutCanvas) {
            const rect = aboutCanvas.getBoundingClientRect();
            const relX = (e.clientX - rect.left - rect.width/2) / rect.width;
            const relY = (e.clientY - rect.top - rect.height/2) / rect.height;
            sharedContext.targetX = relX * Math.PI * 0.5;
            sharedContext.targetY = relY * Math.PI * 0.5;
        }
      }
    });

    // Resize tracking
    window.addEventListener('resize', () => {
        if (sharedContext.heroResize) sharedContext.heroResize();
        if (sharedContext.aboutResize) sharedContext.aboutResize();
        if (sharedContext.skillsResize) sharedContext.skillsResize();
    });

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (activeScenes.hero && sharedContext.heroRender) {
          sharedContext.heroRender();
      }
      if (activeScenes.about && sharedContext.aboutRender) {
          sharedContext.aboutRender(elapsedTime);
      }
      if (activeScenes.skills && sharedContext.skillsRender) {
          sharedContext.skillsRender(elapsedTime);
      }
    }

    animate();
}

init();
