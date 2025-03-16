// background-sphere.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function initBackgroundSphere(pageClass) {
    const backgroundContainer = document.querySelector('.background-container');
    if (!backgroundContainer) {
        console.error(`[BackgroundSphere.js] Background container not found on ${pageClass}`);
        return;
    }

    let canvas = document.getElementById('backgroundSphereCanvas');
    if (canvas) canvas.remove();

    canvas = document.createElement('canvas');
    canvas.id = 'backgroundSphereCanvas';
    canvas.className = 'background-sphere';
    backgroundContainer.appendChild(canvas);
    console.log(`[BackgroundSphere.js] Canvas created for background sphere on ${pageClass}`);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    // Check WebGL2 support manually
    const gl = renderer.getContext();
    if (!gl.getParameter(gl.VERSION).includes('WebGL 2.0')) {
        console.error(`[BackgroundSphere.js] WebGL2 not supported on ${pageClass}`);
        return;
    }
    function updateRendererSize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    updateRendererSize();
    console.log(`[BackgroundSphere.js] Renderer initialized with size ${window.innerWidth}x${window.innerHeight} on ${pageClass}`);

    const baseRadius = 3;
    const radius = baseRadius * Math.min(1, window.innerWidth / 1920);
    const particleCount = Math.floor(500 * Math.min(1, window.innerWidth / 1920));
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const phis = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const index = i * 3;
        positions[index] = radius * Math.sin(phi) * Math.cos(theta);
        positions[index + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[index + 2] = radius * Math.cos(phi);
        colors[index] = Math.random();
        colors[index + 1] = 0.35;
        colors[index + 2] = 0.15 + Math.random() * 0.5;
        speeds[i] = Math.random() * 0.01 + 0.005;
        phis[i] = phi;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
        size: 0.025 * Math.min(1, window.innerWidth / 1920),
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        sizeAttenuation: true
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    console.log(`[BackgroundSphere.js] Particles added to scene with ${particleCount} particles on ${pageClass}`);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            const index = i * 3;
            const theta = (i / particleCount) * Math.PI * 2 + speeds[i] * Date.now() * 0.001;
            positions[index] = radius * Math.sin(phis[i]) * Math.cos(theta);
            positions[index + 1] = radius * Math.sin(phis[i]) * Math.sin(theta);
            positions[index + 2] = radius * Math.cos(phis[i]);
        }
        particles.geometry.attributes.position.needsUpdate = true;
        particles.rotation.y += (mouseX * 0.5 - particles.rotation.y) * 0.05 + 0.001;
        particles.rotation.x += (mouseY * 0.5 - particles.rotation.x) * 0.05 + 0.005;
        controls.update();
        renderer.render(scene, camera);
    }

    console.log(`[BackgroundSphere.js] Starting animation immediately on ${pageClass}`);
    animate();

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateRendererSize, 100);
    });
}