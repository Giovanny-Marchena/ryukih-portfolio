import * as THREE from 'three';
import { gsap } from 'gsap';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Particle System
const particleCount = window.innerWidth < 768 ? 500 : 1000; // Fewer particles on mobile
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;

    // Color gradient from Medium Slate Blue to Periwinkle
    const color = new THREE.Color('#8A4FFF').lerp(new THREE.Color('#C3BEF7'), Math.random());
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particleMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
});

const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate particles for a dynamic effect
    particleSystem.rotation.y += 0.001;

    renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// GSAP Animations
gsap.from('.navbar', { y: -100, duration: 1, ease: 'power2.out' });
gsap.from('.hero-content h1', { y: 50, opacity: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 });
gsap.from('.hero-content p', { y: 50, opacity: 0, duration: 1.5, ease: 'power3.out', delay: 0.8 });
gsap.from('.cta-button', { scale: 0, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 1 });