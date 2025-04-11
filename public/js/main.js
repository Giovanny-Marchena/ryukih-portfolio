import * as THREE from '/node_modules/three/build/three.module.js';
import { gsap } from '/node_modules/gsap/dist/gsap.js'; // Updated path
import { ScrollTrigger } from '/node_modules/gsap/dist/ScrollTrigger.js'; // Updated path

// Rest of your code remains the same

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

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
const velocities = new Float32Array(particleCount * 3); // For mouse interaction

for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;

    // Color gradient from Medium Slate Blue to Periwinkle
    const color = new THREE.Color('#8A4FFF').lerp(new THREE.Color('#C3BEF7'), Math.random());
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;

    // Initial velocities
    velocities[i] = 0;
    velocities[i + 1] = 0;
    velocities[i + 2] = 0;
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

// Use ShaderMaterial for glowing effect
const particleMaterial = new THREE.ShaderMaterial({
    uniforms: {},
    vertexShader: `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = 5.0;
        }
    `,
    fragmentShader: `
        varying vec2 vUv;

        void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float intensity = 1.0 - dist * 2.0;
            gl_FragColor = vec4(vec3(intensity), 1.0);
        }
    `,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
});

const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// Mouse Interactivity
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const intersection = new THREE.Vector3();

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, intersection);

    const positions = particles.attributes.position.array;
    const velocities = particles.attributes.velocity.array;

    for (let i = 0; i < particleCount * 3; i += 3) {
        const dx = intersection.x - positions[i];
        const dy = intersection.y - positions[i + 1];
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 1) {
            const force = (1 - distance) * 0.05;
            velocities[i] += dx * force;
            velocities[i + 1] += dy * force;
        }

        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        velocities[i] *= 0.95; // Damping
        velocities[i + 1] *= 0.95;
    }

    particles.attributes.position.needsUpdate = true;
    particles.attributes.velocity.needsUpdate = true;
});

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

// Scroll Animations
gsap.from('.projects h2', {
    scrollTrigger: {
        trigger: '.projects',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
});

gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.project-grid',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
});

gsap.from('.about h2', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
});

gsap.from('.about-content p', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out',
});

gsap.from('.contact h2', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
});

gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out',
});